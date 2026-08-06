#!/usr/bin/env node
// design-sync.mjs: build | bundle | check, each with --json.
//
// Ported from cao-scan-site and adapted for a Vite/React storefront whose
// prerendered pages reference hashed /assets bundles, /fonts woff2 files and
// large product imagery. This script never talks to the DesignSync tool itself;
// the /design-sync skill runs it and does the tool calls. bundle prepares,
// check gates: a page that passes check is safe to push, a failing page is not.

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function resolveRepoRoot(cwd) {
  const git = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' });
  if (git.status === 0 && git.stdout.trim()) return git.stdout.trim();
  let dir = resolve(cwd);
  for (;;) {
    if (existsSync(join(dir, 'design-sync.config.json'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) throw new Error(`no git repo and no design-sync.config.json found from ${cwd}`);
    dir = parent;
  }
}

export function loadConfig(root) {
  const cfg = JSON.parse(readFileSync(join(root, 'design-sync.config.json'), 'utf8'));
  // An empty pages[] is an error, not an empty sync: otherwise check reports
  // "0 errors" while nothing was checked, which is exactly the gap you push through.
  if (!Array.isArray(cfg.pages) || cfg.pages.length === 0) {
    throw new Error('design-sync.config.json: pages[] missing or empty');
  }
  return cfg;
}

export function build(root) {
  const r = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
  return r.status ?? 1;
}

const MIME = {
  svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', gif: 'image/gif',
  jpg: 'image/jpeg', jpeg: 'image/jpeg', avif: 'image/avif', woff2: 'font/woff2',
};
const mimeOf = (p) => MIME[p.split('.').pop().toLowerCase()] ?? 'application/octet-stream';

// Inline every url(/fonts/*.woff2) and url(/assets/*.woff2) under the cap.
// Decide per src declaration, not per url: a half-inlined declaration leaves a
// dead root-relative reference behind and that fails later in check 4b.
function inlineFontUrls(css, root, capBytes, warnings, pageOut) {
  return css.replace(/src:[^;]*;/g, (decl) => {
    let overCap = false, missing = false;
    const inlined = decl.replace(/url\(\s*["']?(\/(?:fonts|assets)\/[^)"']+\.woff2)["']?\s*\)/g, (m, u) => {
      const file = join(root, 'dist', u.slice(1));
      if (!existsSync(file)) { missing = true; return m; }
      const buf = readFileSync(file);
      if (buf.length > capBytes) { overCap = true; return m; }
      return `url(data:font/woff2;base64,${buf.toString('base64')})`;
    });
    if (overCap || missing) {
      warnings.push(`${pageOut}: woff2 ${missing ? 'missing' : 'over fontInlineCapKB'}, src declaration dropped, fallback stack takes over`);
      return '';
    }
    return inlined;
  });
}

// Non-font url(/...) inside CSS (background images etc): rewrite to the live
// site so check 4b passes and the canvas can still try to load them.
function rewriteCssAssetUrls(css, liveOrigin) {
  return css.replace(/url\(\s*["']?(\/(?:assets|images|img)\/[^)"']+?)(?<!\.woff2)["']?\s*\)/g,
    (m, u) => `url(${liveOrigin}${u})`);
}

// Images: inline small ones as data URIs (self-contained, survives any CSP);
// rewrite big ones to the live site and warn — if the canvas blocks external
// hosts they degrade to alt text instead of exploding every page past the cap.
function rewriteImages(html, root, imgCapBytes, liveOrigin, warnings, pageOut) {
  const fixUrl = (u) => {
    const file = join(root, 'dist', u.slice(1));
    if (!existsSync(file)) {
      warnings.push(`${pageOut}: ${u} not in dist, rewritten to live site`);
      return `${liveOrigin}${u}`;
    }
    const buf = readFileSync(file);
    if (buf.length <= imgCapBytes) return `data:${mimeOf(u)};base64,${buf.toString('base64')}`;
    return `${liveOrigin}${u}`;
  };
  // src / poster attributes on img, source, video — rewritten per tag so a
  // <video> carrying both src AND poster gets both fixed, not just the first.
  html = html.replace(/<(?:img|source|video)\b[^>]*>/gi, (tag) =>
    tag.replace(/\b(src|poster)="(\/[^"]+)"/gi, (m, attr, u) => `${attr}="${fixUrl(u)}"`));
  // srcset: every candidate URL
  html = html.replace(/\bsrcset="([^"]+)"/gi, (m, val) => {
    const out = val.split(',').map((c) => {
      const [u, d] = c.trim().split(/\s+/);
      return `${u.startsWith('/') ? fixUrl(u) : u}${d ? ` ${d}` : ''}`;
    }).join(', ');
    return `srcset="${out}"`;
  });
  return html;
}

export function bundle(root, cfg) {
  const warnings = [];
  const pages = [];
  const fontCap = (cfg.fontInlineCapKB ?? 60) * 1024;
  const imgCap = (cfg.imgInlineCapKB ?? 48) * 1024;
  const liveOrigin = cfg.liveOrigin ?? 'https://zentialpure.com';
  for (const page of cfg.pages) {
    const distFile = join(root, 'dist', page.dist);
    if (!existsSync(distFile)) {
      warnings.push(`${page.out}: dist file missing (${page.dist}) — route not prerendered, page skipped`);
      continue;
    }
    let html = readFileSync(distFile, 'utf8');

    // Hydration JS is meaningless in the Design canvas: the module graph is not
    // shipped. Strip module scripts and preload hints before anything else.
    html = html.replace(/<script[^>]*\bsrc="\/assets\/[^"]*"[^>]*>\s*<\/script>\s*/gi, '');
    html = html.replace(/<link[^>]*rel="(?:modulepreload|preload|prefetch)"[^>]*>\s*/gi, '');

    // Stylesheets inline: the Design project does not know our dist hashes.
    html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g, (m, href) => {
      let css = readFileSync(join(root, 'dist', href.slice(1)), 'utf8');
      css = inlineFontUrls(css, root, fontCap, warnings, page.out);
      css = rewriteCssAssetUrls(css, liveOrigin);
      return `<style>\n${css}\n</style>`;
    });

    // @font-face lives in an inline <style> in the template — run the same
    // font inlining over every inline style block.
    html = html.replace(/<style[\s\S]*?<\/style>/gi, (block) =>
      rewriteCssAssetUrls(inlineFontUrls(block, root, fontCap, warnings, page.out), liveOrigin));

    // Every remaining <link> except canonical renders nothing the canvas needs
    // (favicon, manifest, apple-touch-icon, sitemap) and would fail check 4a.
    html = html.replace(/<link\b(?![^>]*rel="canonical")[^>]*>\s*/gi, '');

    html = rewriteImages(html, root, imgCap, liveOrigin, warnings, page.out);

    // Disarm internal links: /reveal does not exist inside the Design canvas,
    // but data-route preserves the intent for whoever reads the bundle.
    html = html.replace(/<a\b[^>]*>/g, (tag) =>
      tag.replace(/href="(\/[^"]*)"/, (m, val) => `href="#" data-route="${val}"`));

    // Card comment as the very first line: check 5 leans on this and the skill
    // uses it to hang the page in the right group.
    const c = page.card ?? {};
    html = `<!-- @dsCard group="${c.group ?? ''}" name="${c.name ?? ''}" subtitle="${c.subtitle ?? ''}" -->\n${html}`;
    const outFile = join(root, '.design-sync', 'out', cfg.prefix, page.out);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
    pages.push({ route: page.route, out: outFile });
  }
  return { ok: true, pages, warnings };
}

export function check(root, cfg) {
  const errors = [];
  let bad = 0, thin = 0;
  const maxBytes = (cfg.pageMaxKB ?? 450) * 1024;
  for (const page of cfg.pages) {
    const file = join(root, '.design-sync', 'out', cfg.prefix, page.out);
    const pageErrors = [];
    if (!existsSync(file)) {
      errors.push(`${page.route}: bundled file missing (${file})`);
      bad++;
      continue;
    }
    const html = readFileSync(file, 'utf8');
    // Helmet emits <title data-rh="true">, so the tag may carry attributes.
    const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
    if (!title || !title[1].trim()) pageErrors.push(`${page.out}: empty or missing <title>`);
    const minText = cfg.minTextChars ?? 400;
    const text = html.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < minText) { pageErrors.push(`${page.out}: body text too thin (${text.length} chars, minimum ${minText})`); thin++; }
    // 4a: leftover root-relative src/href. Only <meta> and <link rel="canonical">
    // may keep them, since they render nothing and thus cannot break the canvas.
    for (const m of html.matchAll(/(?:src|href|poster)="(\/[^"]*)"/g)) {
      const tag = html.slice(html.lastIndexOf('<', m.index), html.indexOf('>', m.index) + 1);
      if (/^<meta\b/i.test(tag)) continue;
      if (/^<link\b/i.test(tag) && /rel="canonical"/i.test(tag)) continue;
      pageErrors.push(`${page.out}: root-relative reference left behind: ${m[0]}`);
    }
    // 4b: url(/...) inside <style>. This is what an ="/..." scan misses and what
    // remains when font inlining failed. Scanned separately on purpose.
    for (const block of html.matchAll(/<style[\s\S]*?<\/style>/gi)) {
      for (const u of block[0].matchAll(/url\(\s*["']?\/[^)]*\)/g)) {
        pageErrors.push(`${page.out}: root-relative url() left in <style>: ${u[0]}`);
      }
    }
    if (!html.startsWith('<!-- @dsCard ')) pageErrors.push(`${page.out}: dsCard comment not on line 1`);
    const size = statSync(file).size;
    if (size > maxBytes) pageErrors.push(`${page.out}: ${Math.round(size / 1024)} KB, over pageMaxKB (${cfg.pageMaxKB})`);
    if (pageErrors.length) bad++;
    errors.push(...pageErrors);
  }
  return { ok: errors.length === 0, errors, counts: { total: cfg.pages.length, bad, thin, variantsIdentical: 0, iterations: 1 } };
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const cmd = args.find((a) => !a.startsWith('--'));
  try {
    const root = resolveRepoRoot(process.cwd());
    const cfg = loadConfig(root);
    if (cmd === 'build') {
      const code = build(root);
      if (asJson) console.log(JSON.stringify({ ok: code === 0, exitCode: code }));
      process.exit(code);
    }
    if (cmd === 'bundle') {
      const res = bundle(root, cfg);
      if (asJson) console.log(JSON.stringify({ ok: res.ok, pageCount: res.pages.length, warnings: res.warnings }, null, 2));
      else { res.pages.forEach((p) => console.log(`bundled: ${p.route} -> ${p.out}`)); res.warnings.forEach((w) => console.warn(`warning: ${w}`)); }
      process.exit(0);
    }
    if (cmd === 'check') {
      const res = check(root, cfg);
      if (asJson) console.log(JSON.stringify(res, null, 2));
      else { res.errors.forEach((e) => console.error(`error: ${e}`)); console.log(`check: ${JSON.stringify(res.counts)}`); }
      process.exit(res.ok ? 0 : 1);
    }
    console.error('usage: design-sync.mjs <build|bundle|check> [--json]');
    process.exit(2);
  } catch (err) {
    if (asJson) console.log(JSON.stringify({ ok: false, error: String(err.message ?? err) }));
    else console.error(`error: ${err.message ?? err}`);
    process.exit(1);
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main();
