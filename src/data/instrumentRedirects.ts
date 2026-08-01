/**
 * Shopify handles that must NOT render a generic /product page.
 *
 * Two distinct reasons land a handle here:
 *
 *  1. Legacy copy. The belt and the mat both have productConfigs entries, but
 *     those were authored against the old SKUs ("80W full-body panel",
 *     "full-back mat"). The accurate pages live at /instruments/<slug>.
 *
 *  2. No config at all. `the-restoration-mat` and `the-system-founding-bundle`
 *     are allowlisted in liveCatalog.ts, so they render in every browse grid
 *     (/collection, /protocols/03-recovery, SearchOverlay, RelatedProducts,
 *     QuizResult) as `/product/<handle>` — but productConfigs.ts has no entry
 *     for either, and ProductDetail falls through to "Product not found".
 *     Reported from the Instagram bio path on 2026-08-01 and reproduced on an
 *     iPhone viewport at /collection and /protocols/03-recovery.
 *
 * Invariant: every handle in LIVE_HANDLES resolves to either a productConfig or
 * an entry here. src/lib/market.test.ts asserts it, so a new allowlisted SKU
 * cannot ship as a dead link.
 *
 * Values are route slugs under /instruments/, and each must be a real route in
 * App.tsx (`/instruments/the-system` is explicit; the rest hit
 * `/instruments/:slug` and must exist in InstrumentLanding's CONFIGS).
 */
export const INSTRUMENT_REDIRECTS: Record<string, string> = {
  "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "restoration-belt",
  "household-red-light-charging-vibrating-red-light-therapy-mat": "restoration-mat",
  "the-restoration-mat": "restoration-mat",
  "the-system-founding-bundle": "the-system",
};
