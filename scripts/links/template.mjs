/**
 * Renders the link-in-bio page to a complete HTML string.
 *
 * Hard constraints, in priority order:
 *  1. Zero JavaScript. Not "a little" — none. Every byte of behaviour is HTML+CSS.
 *  2. One render-blocking subresource: the DM Sans variable font. All CSS is
 *     inlined; the hero is preloaded so it can start before CSS parses.
 *  3. Fixed 480px column. No breakpoints, no responsive image sets — this page
 *     is only ever opened from a phone's in-app browser.
 */

import { BRAND, TILES, FOOT_LINKS, SITE } from "./tiles.mjs";

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Appends utm params to a site-relative href, keeping any fragment last.
 * "/instruments#system" + utm -> "/instruments?utm_source=…#system"
 * A fragment placed before the query string silently breaks both.
 */
export function withUtm(href, utm) {
  const hashAt = href.indexOf("#");
  const fragment = hashAt === -1 ? "" : href.slice(hashAt);
  const path = hashAt === -1 ? href : href.slice(0, hashAt);
  const sep = path.includes("?") ? "&" : "?";
  const query = Object.entries(utm)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return `${path}${sep}${query}${fragment}`;
}

const CSS = `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;padding:0 16px 40px;
  font-family:'DM Sans','Inter',system-ui,-apple-system,sans-serif;
  background:#f5f5f7;color:#1d1d1f;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
}
main{max-width:480px;margin:0 auto}

/* Hero — the LCP element. aspect-ratio reserves the box before the image
   arrives, so there is no layout shift and no height guess. */
.hero{
  display:block;position:relative;margin:16px 0 12px;
  border-radius:24px;overflow:hidden;
  aspect-ratio:8/5;background:#e5e3e0;
  text-decoration:none;color:#fff;
}
.hero img{display:block;width:100%;height:100%;object-fit:cover}
.hero::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(0,0,0,0) 34%,rgba(0,0,0,.72) 100%);
}
.hero-txt{position:absolute;left:20px;right:20px;bottom:18px;z-index:1}
.wordmark{
  display:block;font-size:12px;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;
  color:#2ED8A8;margin:0 0 6px;
}
.tagline{
  display:block;font-family:'Lora',Georgia,serif;
  /* 20px, not 22: at 22 the tagline sets to within ~8px of the hero's rounded
     right corner on a 390px viewport and reads as if it were clipped. */
  font-size:20px;line-height:1.2;font-weight:500;
  letter-spacing:-.4px;margin:0;text-shadow:0 1px 12px rgba(0,0,0,.35);
}

/* Tiles. 88px rows — comfortably over the 44px minimum touch target, and tall
   enough that a 72px image reads as a photograph rather than an icon. */
.tiles{display:flex;flex-direction:column;gap:8px;margin:0;padding:0;list-style:none}
.tile{
  display:flex;align-items:center;gap:14px;
  min-height:88px;padding:8px 16px 8px 8px;
  background:#fff;border:1px solid #e9e9ec;border-radius:24px;
  text-decoration:none;color:inherit;
}
.tile img{
  width:72px;height:72px;flex:0 0 72px;
  border-radius:18px;object-fit:cover;background:#eceaea;
}
.tile-txt{flex:1 1 auto;min-width:0}
.tile-title{
  display:block;font-size:16px;font-weight:600;
  letter-spacing:-.24px;line-height:1.25;
}
.tile-sub{
  display:block;margin-top:3px;font-size:13.5px;
  line-height:1.3;color:#636363;
}
/* Chevron drawn in CSS — an inline SVG per row costs more bytes than this. */
.chev{
  flex:0 0 auto;width:8px;height:8px;margin-right:4px;
  border-right:1.5px solid #b9b9bd;border-bottom:1.5px solid #b9b9bd;
  transform:rotate(-45deg);
}
.tile-accent{border-color:#2ED8A8}
.tile-accent .chev{border-color:#2ED8A8}

/* Focus ring uses the app's --ring tangerine. Keyboard users exist on phones. */
.hero:focus-visible,.tile:focus-visible,.foot a:focus-visible{
  outline:2px solid #f69251;outline-offset:2px;
}

.foot{margin:20px 0 0;text-align:center}
.foot-links{
  display:flex;justify-content:center;gap:6px;
  margin:0 0 10px;padding:0;list-style:none;
  font-size:13px;color:#8a8a8e;
}
.foot-links li:not(:last-child)::after{content:"·";margin-left:6px;color:#c9c9ce}
.foot a{color:#636363;text-decoration:none}
.foot-note{
  margin:0;font-size:11.5px;line-height:1.5;color:#8a8a8e;
  letter-spacing:.01em;
}

/* The in-app browsers this page opens in (IG, TikTok) are light-mode only in
   practice, but respect the setting if the OS forces dark. */
@media (prefers-color-scheme:dark){
  body{background:#111112;color:#f2f2f4}
  .tile{background:#1c1c1e;border-color:#2c2c2f}
  .tile-sub{color:#a1a1a6}
  .chev{border-color:#6a6a70}
  .foot a{color:#a1a1a6}
}
`.trim();

export function renderPage({ platform }) {
  const { utm, label } = platform;
  const hero = BRAND.hero;

  const tiles = TILES.map((t) => {
    const href = escapeHtml(withUtm(t.href, utm));
    return `      <li>
        <a class="tile${t.accent ? " tile-accent" : ""}" href="${href}">
          <img src="${escapeHtml(t.img)}" width="72" height="72" alt="${escapeHtml(t.alt)}" loading="lazy" decoding="async">
          <span class="tile-txt">
            <span class="tile-title">${escapeHtml(t.title)}</span>
            <span class="tile-sub">${escapeHtml(t.sub)}</span>
          </span>
          <span class="chev" aria-hidden="true"></span>
        </a>
      </li>`;
  }).join("\n");

  const footLinks = FOOT_LINKS.map(
    (l) => `        <li><a href="${escapeHtml(withUtm(l.href, utm))}">${escapeHtml(l.label)}</a></li>`
  ).join("\n");

  const title = `${BRAND.wordmark} — ${BRAND.tagline}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="Start here: the instruments, the 60-second protocol quiz, the evidence, and the free Breath app.">
<!-- Generated by scripts/build-links.mjs for ${escapeHtml(label)}. Do not edit; edit scripts/links/tiles.mjs. -->
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${SITE}/instruments">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(BRAND.wordmark)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:image" content="${SITE}/og-image.jpg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" as="image" href="${escapeHtml(hero.src)}" fetchpriority="high">
<link rel="preload" as="font" type="font/woff2" href="/fonts/dm-sans-wght.woff2" crossorigin>
<link rel="dns-prefetch" href="https://checkout.zentialpure.com">
<style>
@font-face{font-family:'DM Sans';src:url('/fonts/dm-sans-wght.woff2') format('woff2-variations');font-weight:100 1000;font-style:normal;font-display:swap}
@font-face{font-family:'Lora';src:url('/fonts/lora-wght.woff2') format('woff2-variations');font-weight:100 1000;font-style:normal;font-display:swap}
${CSS}
</style>
</head>
<body>
<main>
  <a class="hero" href="${escapeHtml(withUtm("/", utm))}">
    <img src="${escapeHtml(hero.src)}" width="${hero.width}" height="${hero.height}" alt="${escapeHtml(hero.alt)}" fetchpriority="high" decoding="async">
    <span class="hero-txt">
      <span class="wordmark">${escapeHtml(BRAND.wordmark)}</span>
      <span class="tagline">${escapeHtml(BRAND.tagline)}</span>
    </span>
  </a>

  <ul class="tiles">
${tiles}
  </ul>

  <div class="foot">
    <ul class="foot-links">
${footLinks}
    </ul>
    <p class="foot-note">${escapeHtml(BRAND.footNote)}</p>
  </div>
</main>
</body>
</html>
`;
}
