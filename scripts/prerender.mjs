/**
 * prerender.mjs
 *
 * Post-build script that server-renders every known route into a static
 * HTML file inside dist/.  Vercel's filesystem handler serves these files
 * directly to bots; users still get the normal React SPA via createRoot.
 *
 * Build order (see package.json "build" script):
 *   1. vite build            → dist/          (client bundle)
 *   2. vite build --ssr …    → .ssr/          (server bundle)
 *   3. node scripts/prerender.mjs             (this script)
 *
 * BUG-FIX (2026-05-26):
 *   - Snapshot the template BEFORE writing the homepage file, so subsequent
 *     route writes start from a clean shell (not the homepage-with-helmet).
 *   - Add every Helmet-using route to ROUTES so each gets its own per-route
 *     title/OG output instead of falling through to the homepage shell on Vercel.
 *   - removeStaticTags now also strips the trailing newline/indent left
 *     behind, so the final <head> contains no empty <title>-shaped gap.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = join(__dirname, '..');
const dist      = join(root, 'dist');
const ssrDir    = join(root, '.ssr');

// ─── All routes to prerender ──────────────────────────────────────────────────
const ROUTES = [
  '/',
  '/movement',
  '/origin',
  '/journal',
  '/journal/frequency-shift',
  '/journal/microcurrent-collagen',
  '/journal/evening-protocol',
  '/journal/red-light-clinical',
  '/journal/lymphatic-drainage',
  '/journal/ems-vs-microcurrent',
  '/journal/ritual-that-lasts',
  '/journal/the-stack-audit',
  '/journal/kill-list',
  '/journal/grade-our-honesty',
  '/support',
  '/shipping',
  '/returns',
  '/faq',
  '/privacy',
  '/terms',
  '/technology/red-light',
  '/technology/microcurrent',
  '/technology/ems',
  '/technology/thermal',
  '/technology/electroporation',
  '/technology/iontophoresis',
  '/body-lift',
  '/science',
  // Product pages — SSR renders the static config shell; Shopify data loads
  // client-side as normal. Bots get the correct <title> + meta immediately.
  '/product/lifting-and-tightening-face-introducer',
  '/product/facial-beauty-tools-and-ems-beauty-equipment',
  '/product/eye-massage',
  '/product/electric-guasha-massager',
  '/product/electric-micro-current',
  '/product/color-light-import-micro-current-vibration-massager',
  '/product/red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening',
  '/product/3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool',
  '/product/portable-ems-microcurrent-facial-beauty-device',
  '/product/white-noise-sleep-aid-machine',
  // Comparison pages
  '/compare/nuface-vs-zential-pure',
  '/compare/foreo-bear-vs-zential-pure',
  // Long-tail SEO landing pages
  '/clinic-vs-home-facial-device',
  '/facial-muscle-training',
  // Funnel pages
  '/reveal',
  '/pick',
  '/one-shelf',
  // Restoration Wrap waitlist test (Gate 1 — proposed product, zero inventory)
  '/wrap',
  '/f/face-introducer',
  '/f/restoration-belt',
  '/f/restoration-mat',
  // Editorial (Pinterest destinations)
  '/editorial/the-ritual',
  '/editorial/the-science',
  '/editorial/the-diagnosis',
  // Editorial hub — 1a index + 1b clinical issue (Journal.dc handoff)
  '/editorial',
  '/editorial/clinical-issue',
  // Breath — interactive breathwork app (port of Claude Design)
  '/breath',
  '/quiz',
  '/quiz/result',
  '/thank-you',
  '/founding-terms',
  // Ritual guides
  '/ritual-guide',
  '/collection',
  // Protocols
  '/instruments',
  '/instruments/the-system',
  '/instruments/face-introducer',
  '/instruments/restoration-belt',
  '/instruments/restoration-mat',
  '/protocols',
  '/protocols/01-face',
  '/protocols/02-body',
  '/protocols/03-recovery',
  '/protocol/face-introducer',
];

// ─── Inject helmet head tags into the HTML template ───────────────────────────
function buildHead(helmet) {
  if (!helmet) return '';
  return [
    helmet.title?.toString()    || '',
    helmet.priority?.toString() || '',
    helmet.meta?.toString()     || '',
    helmet.link?.toString()     || '',
    helmet.script?.toString()   || '',
  ]
    .map(s => s.trim())
    .filter(Boolean)
    .join('\n    ');
}

// Remove duplicate static head tags that index.html carries as homepage defaults.
// The helmet-injected versions (which are per-page correct) will be the only ones.
//
// Each pattern also captures any trailing newline + leading whitespace on the
// next line, so we don't leave an empty blank line where the title used to be
// (some naive HTML scrapers grep the first hundred head bytes for <title> and
// see "nothing" if it's been left as just whitespace).
const STATIC_TAG_PATTERNS = [
  /<title>[^<]*<\/title>\s*/,
  /<meta name="description"[^>]*>\s*/,
  /<meta property="og:title"[^>]*>\s*/,
  /<meta property="og:description"[^>]*>\s*/,
  /<meta property="og:url"[^>]*>\s*/,
  /<meta property="og:type"[^>]*>\s*/,
  /<meta name="twitter:title"[^>]*>\s*/,
  /<meta name="twitter:description"[^>]*>\s*/,
  /<link rel="canonical"[^>]*>\s*/,
];

// Image tags are stripped ONLY when the page's helmet output carries its own
// og:image — otherwise the template's generic 1200x630 stays as the fallback.
// Scrapers take the FIRST og:image, so leaving the generic one in front of a
// page-specific one (e.g. the editorial 1000x1500 pin cards) ships wrong pins.
const STATIC_IMAGE_TAG_PATTERNS = [
  /<meta property="og:image"[^>]*>\s*/,
  /<meta property="og:image:width"[^>]*>\s*/,
  /<meta property="og:image:height"[^>]*>\s*/,
  /<meta property="og:image:alt"[^>]*>\s*/,
  /<meta name="twitter:image"[^>]*>\s*/,
  /<meta name="twitter:image:alt"[^>]*>\s*/,
];

function removeStaticTags(html, { stripImages = false } = {}) {
  let out = html;
  const patterns = stripImages
    ? [...STATIC_TAG_PATTERNS, ...STATIC_IMAGE_TAG_PATTERNS]
    : STATIC_TAG_PATTERNS;
  for (const pat of patterns) {
    out = out.replace(pat, '');
  }
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function prerender() {
  // CRITICAL: read the template ONCE, keep it in memory. Earlier versions
  // re-read dist/index.html each loop iteration, which meant after the '/'
  // route was prerendered, every subsequent route inherited the homepage's
  // baked-in helmet output. Snapshotting up-front guarantees a clean shell
  // per route.
  const template = readFileSync(join(dist, 'index.html'), 'utf-8');

  // GUARD: prerender must only run on a fresh `vite build` output. If the
  // markers are already consumed, a second run would silently no-op the head
  // injection while removeStaticTags strips the previously injected <title>,
  // shipping a title-less site (this exact failure hit prod on 2026-07-06).
  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    console.error(
      'prerender: dist/index.html has no <!--app-head-->/<!--app-html--> markers.\n' +
      'It was already prerendered. Re-run the full build (`npm run build`) instead.'
    );
    process.exit(1);
  }

  // Dynamic import of the Vite SSR bundle
  const { render } = await import(join(ssrDir, 'entry-server.js'));

  let ok = 0;
  let failed = 0;

  for (const route of ROUTES) {
    process.stdout.write(`  prerender ${route} … `);
    try {
      const { html, helmet } = await render(route);

      const headHtml = buildHead(helmet);

      if (!headHtml || !/<title/i.test(headHtml)) {
        // Loud warning — every route MUST emit a <title>. If this fires,
        // the page is missing a <SEO/> or <Helmet> usage.
        console.warn(`\n    [WARN] no <title> for ${route} — page is missing SEO component`);
      }

      // 1. Remove static per-page tags from the shared template
      // 2. Inject helmet (per-page) tags at the <!--app-head--> marker
      // 3. Inject rendered body HTML at the <!--app-html--> marker
      const stripImages = /property="og:image"/.test(headHtml);
      let finalHtml = removeStaticTags(template, { stripImages })
        .replace('<!--app-head-->', headHtml)
        .replace('<!--app-html-->', html);

      // Determine output path
      const outPath =
        route === '/'
          ? join(dist, 'index.html')
          : join(dist, route.slice(1), 'index.html');

      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, finalHtml, 'utf-8');

      console.log('✓');
      ok++;
    } catch (err) {
      console.log('✗ (skipped)');
      console.error(`    ${err?.message ?? err}`);
      failed++;
      // Don't abort — a failed route falls back to the SPA shell client-side.
    }
  }

  console.log(`\nPrerender complete: ${ok} ok, ${failed} failed.\n`);
  if (failed > 0) {
    process.exit(1); // surface failures in Vercel build logs
  }
}

prerender().catch(err => {
  console.error('Prerender script crashed:', err);
  process.exit(1);
});
