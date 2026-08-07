// Allowlist of Shopify handles the storefront is permitted to surface.
//
// Shopify publishes ~11 products, but only these are on-brand and safe to sell.
// Everything else (charging-unlock, white-noise-sleep-aid-machine, breath-seal,
// infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad,
// gravity-quilt-cotton-weighted-blanket, and any older ghost SKUs) is filtered
// out at the fetch layer so it never renders in browse grids, search, or PDPs.
//
// Handles verified 2026-07-11 against the live Storefront API
// (0d1m9a-w7.myshopify.com/products.json) and cross-checked with
// zential-agent-engine/knowledge/products/LIVE-CATALOG-TRUTH.md.
//
// The four core catalog products are the Face Introducer (€88), Restoration Belt
// (€180), Restoration Mat (from €200), and The System bundle. The Restore Gel and
// Restore Pads are included because the storefront wires them as the conductive-gel
// and PDRN-pad add-ons in the bundle tiers, cart upsell, and cross-sell — filtering
// them out would break those purchase paths.
export const LIVE_HANDLES: ReadonlySet<string> = new Set([
  // Core catalog
  'lifting-and-tightening-face-introducer', // The Face Introducer — €88
  'red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device', // The Restoration Belt — €180
  'the-restoration-mat', // The Restoration Mat — from €200
  'the-system-founding-bundle', // The System bundle
  // Purchase-path add-ons (conductive gel + PDRN pads)
  'medicube-collagen-elastic-jelly-moisturizing-cream', // Restore Gel — €18
  'collagen-eye-mask', // Restore Pads — €18
  // Renamed handles, 2026-08-03 — rename VERIFIED LIVE 2026-08-07 (Storefront API:
  // new handles return products, old handles return null). BOTH spellings stay
  // allowlisted: the new ones are what Shopify serves, the old ones remain so any
  // cached page or stale link still passes the allowlist and hits the redirect layer.
  'restore-gel', // renamed from 'medicube-collagen-elastic-jelly-moisturizing…' 2026-08-03
  'restore-pads', // renamed from 'collagen-eye-mask…' 2026-08-03
  'restoration-belt', // renamed from 'red-light-therapy-belt-for-waist-shoulder-66…' 2026-08-03
  'face-introducer', // renamed from 'lifting-and-tightening-face-introducer…' 2026-08-03
]);
