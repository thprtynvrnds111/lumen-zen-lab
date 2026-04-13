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
  '/journal',
  '/journal/frequency-shift',
  '/journal/microcurrent-collagen',
  '/journal/evening-protocol',
  '/journal/red-light-clinical',
  '/journal/lymphatic-drainage',
  '/journal/ems-vs-microcurrent',
  '/journal/ritual-that-lasts',
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
  '/body-lift',
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
const STATIC_TAG_PATTERNS = [
  /<title>[^<]*<\/title>/,
  /<meta name="description"[^>]*>/,
  /<meta property="og:title"[^>]*>/,
  /<meta property="og:description"[^>]*>/,
  /<meta property="og:url"[^>]*>/,
  /<meta property="og:type"[^>]*>/,
  /<meta name="twitter:title"[^>]*>/,
  /<meta name="twitter:description"[^>]*>/,
  /<link rel="canonical"[^>]*>/,
];

function removeStaticTags(html) {
  let out = html;
  for (const pat of STATIC_TAG_PATTERNS) {
    out = out.replace(pat, '');
  }
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function prerender() {
  const template = readFileSync(join(dist, 'index.html'), 'utf-8');

  // Dynamic import of the Vite SSR bundle
  const { render } = await import(join(ssrDir, 'entry-server.js'));

  let ok = 0;
  let failed = 0;

  for (const route of ROUTES) {
    process.stdout.write(`  prerender ${route} … `);
    try {
      const { html, helmet } = await render(route);

      const headHtml = buildHead(helmet);

      // 1. Remove static per-page tags from the shared template
      // 2. Inject helmet (per-page) tags at the <!--app-head--> marker
      // 3. Inject rendered body HTML at the <!--app-html--> marker
      let finalHtml = removeStaticTags(template)
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
