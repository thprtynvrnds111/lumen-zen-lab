/**
 * Bridge funnel — US market localization.
 *
 * WHY THIS EXISTS (diagnosed 2026-07-26 against live systems):
 * Both ACTIVE Meta ad sets (`broad-us-purchase`, `warm-atc-14d-purchase`) target
 * the US ONLY, and `/f/*` is their sole destination. The bridge config is written
 * in EUR for the home market, so every US visitor read a euro price and an
 * "EU shipping" promise while Shopify Dynamic FX charged them USD at checkout.
 * Last 7d before this shipped: 96 landing_page_views, 0 AddToCart, 0 checkouts.
 *
 * HOW IT WORKS
 * `localizeToUSD(config)` deep-clones a BridgeConfig and rewrites every string
 * we own into US truth. Two passes, in order:
 *   1. COPY  — whole phrases whose meaning (not just the symbol) changes for a
 *              US reader: clinic-cost anchors, shipping lines, benchmark bodies.
 *   2. MONEY — exact EUR→USD token substitution from the verified table below.
 * Competitor rows in `comparison` are SKIPPED by design: the interface contract
 * is that a competitor price is printed in the seller's own native currency with
 * no FX conversion. Our own row (`ours: true`) IS localized.
 *
 * EVERY FIGURE BELOW IS LIVE-VERIFIED — never computed by FX arithmetic in code.
 * Verified 2026-07-26 via Storefront API `cartCreate` @inContext(country: US)
 * with discountCodes ["RITUAL15"] against 0d1m9a-w7.myshopify.com:
 *   Face Introducer 51731419922775  $103.00 → $87.55
 *   Restore Gel     52413727506775  $21.00  (FI+Gel: $124.00 → $105.40)
 *   Restoration Belt 53502319755607 $209.00 (compare-at $325) → $177.65
 *   Mat no-remote 100 53525385019735 $232.00 → $197.20
 *   Mat no-remote 120 53525385052503 $232.00 → $197.20
 *   Mat remote 100    53525384954199 $256.00 → $217.60
 *   Mat remote 120    53525384986967 $289.00 → $245.65
 *   The System        53870945567063 $399.00 (compare-at $546) → $339.15
 * US delivery verified the same day on a real New York cart:
 *   deliveryOptions → "Rate FREE for Market(International)" $0.00 USD.
 *
 * US clinic-cost anchors are SOURCED, not converted:
 *   Microcurrent facial — $90–$180/session, ~$140 average (pmuhub.com/
 *     microcurrent-facial/microcurrent-facial-cost/, read 2026-07-26)
 *   Red light therapy  — handheld/targeted $25–$100/session
 *     (thervo.com/costs/red-light-therapy-cost, read 2026-07-26)
 *   Infrared sauna     — $30–$50 typical drop-in
 *     (alteredstateswellness.com/blog/how-much-does-a-sauna-session-cost,
 *      read 2026-07-26)
 * Annual clinic figures keep the session COUNT implied by the EUR copy and
 * multiply it by the sourced US FLOOR price, so the comparison understates our
 * advantage rather than overstating it.
 */

import type { BridgeConfig } from "./config";

/** Verified EUR→USD token substitutions. Longest keys first at apply time so
 *  "€88.00" can never be eaten by "€88". */
export const USD_MONEY: Record<string, string> = {
  // Face Introducer + gel
  "€88.00": "$103.00",
  "€74.80": "$87.55",
  "€90.10": "$105.40",
  "€106": "$124",
  "€88": "$103",
  "€18": "$21",
  // Restoration Belt
  "€153.00": "$177.65",
  "€180": "$209",
  "€280": "$325",
  // Restoration Mat
  "€211.65": "$245.65",
  "€187.00": "$217.60",
  "€170.00": "$197.20",
  "€249": "$289",
  "€220": "$256",
  "€200": "$232",
  // The System
  "€468": "$546",
  "€399": "$399",
};

/** Whole-phrase rewrites applied BEFORE the money table. Each entry replaces
 *  home-market meaning with US truth — sourced, not converted. */
export const USD_COPY: Array<[string, string]> = [
  // ── Shipping: US delivery verified free + tracked on a live New York cart ──
  ["Free, tracked EU shipping.", "Free, tracked US shipping."],
  ["Free, tracked EU shipping", "Free, tracked US shipping"],
  [
    "CE marked. 30-day return. Free, tracked EU shipping.",
    "CE marked. 30-day return. Free, tracked US shipping.",
  ],
  ["ships free within the EU", "ships free to the US"],

  // ── Face Introducer: clinic anchor (US-sourced, floor-priced) ──
  [
    "Microcurrent at the clinic runs €80–120 a session, and the chair is never yours.",
    "Microcurrent at the clinic runs $90–180 a session, and the chair is never yours.",
  ],
  [
    "€80–120 handed over at the desk, every single visit",
    "$90–180 handed over at the desk, every single visit",
  ],
  [
    "Less than a single €80–120 clinic session, and this one you keep.",
    "Less than a single $90–180 clinic session, and this one you keep.",
  ],
  [
    "The best-known US microcurrent device retails around €349 for a single modality, with returns handled overseas.",
    "The best-known US microcurrent set retails at $595 for a marketed three-in-one, with returns handled overseas.",
  ],

  // ── Restoration Belt: targeted red light session anchor ──
  ["Around €30 a session, booked ahead", "Around $25 a session, booked ahead"],
  // The home copy's competitor figures (€300 / €800) are EUR estimates with no
  // source on file. FX-converting them would be inventing a US price, so the US
  // variant drops the figure and keeps only what we can stand behind about our
  // own instrument. (The Face Introducer benchmark keeps its number because
  // $595 is live-verified on mynuface.com — see the comparison block comment.)
  [
    "Premium US recovery wraps retail around €300 and up for a single light band, with returns handled overseas.",
    "Premium US recovery wraps run a single light band, with returns handled overseas.",
  ],

  // ── Restoration Mat: infrared session anchor ──
  ["Around €40 a session, booked ahead", "Around $30 a session, booked ahead"],
  [
    "Premium US infrared mats retail around €800 and up and ship from overseas.",
    "Premium US infrared mats ship from overseas.",
  ],

  // ── Promises the US checkout does not keep ──
  // Live US checkout (cart c/hWNEw1co…, read 2026-07-26) serialises
  // `installmentPlans: []`, and contains no Klarna, Shop Pay or Afterpay. The
  // home-market instalment promise is false for a US buyer, so it is removed
  // rather than restated. Wero is a European scheme and is not offered to the US;
  // PayPal IS present. We name nothing we have not seen on that page.
  [" · 3 instalments available at checkout", ""],
  [
    "You will see the full total before anything is charged — Wero, cards, PayPal, Apple Pay or Google Pay.",
    "You will see the full total, and every payment option available to you, before anything is charged.",
  ],
  [
    "Shopify Payments over encrypted SSL — Wero, major cards, PayPal, Apple Pay, Google Pay, and Klarna instalments. We never see your card details.",
    "Shopify Payments over encrypted SSL — major cards and PayPal. We never see your card details.",
  ],
  // Import VAT is an EU tax; it means nothing on a US doorstep. US delivery was
  // verified free ($0.00) on a live New York cart, and the checkout shows the
  // exact total before payment — say that instead.
  ["Import VAT prepaid — no customs bill", "Free, tracked shipping — your exact total before you pay"],
  [
    "Ships to the US and across the EU, dispatched in 2–3 working days, tracked to your door. EU orders ship free with import VAT prepaid — no customs bill. US orders: your exact total, shipping included, is shown at checkout before you pay.",
    "Ships across the US, dispatched in 2–3 working days, tracked to your door. Shipping is free, and your exact total is shown at checkout before you pay.",
  ],

  // ── Annual clinic totals: same session count as the EUR copy × US floor price ──
  ["€720", "$540"], // 6 microcurrent sessions × $90 floor
  ["€480", "$400"], // 16 red-light sessions × $25 floor
  ["€640", "$480"], // 16 infrared sessions × $30 floor

  // ── Support tags: honest about where returns go ──
  ["€88 · EU support", "$103 · EU-based support"],
  ["€180 · was €280 · EU support", "$209 · was $325 · EU-based support"],
  ["from €200 · EU support", "from $232 · EU-based support"],
];

/** Verified USD figures for the pixel/checkout numerics, keyed by variant id. */
const USD_VARIANTS: Record<string, { listValue: number; checkoutValue: number }> = {
  "51731419922775": { listValue: 103.0, checkoutValue: 87.55 },
  "53502319755607": { listValue: 209.0, checkoutValue: 177.65 },
  "53525385019735": { listValue: 232.0, checkoutValue: 197.2 },
  "53525385052503": { listValue: 232.0, checkoutValue: 197.2 },
  "53525384954199": { listValue: 256.0, checkoutValue: 217.6 },
  "53525384986967": { listValue: 289.0, checkoutValue: 245.65 },
};

/** List price in USD of add-on variants used by `offer.bundle`. */
const USD_ADDONS: Record<string, number> = {
  "52413727506775": 21.0, // Restore Gel
};

const MONEY_KEYS = Object.keys(USD_MONEY).sort((a, b) => b.length - a.length);

/** Rewrite one string into US market truth. Exported for tests. */
export function localizeString(input: string): string {
  let out = input;
  for (const [from, to] of USD_COPY) out = out.split(from).join(to);
  for (const key of MONEY_KEYS) out = out.split(key).join(USD_MONEY[key]);
  return out;
}

/** Recursively localize every string in a value, honouring a skip predicate on
 *  the dotted path (used to leave competitor rows in their native currency). */
function walk(value: unknown, path: string, skip: (p: string) => boolean): unknown {
  if (skip(path)) return value;
  if (typeof value === "string") return localizeString(value);
  if (Array.isArray(value)) return value.map((v, i) => walk(v, `${path}[${i}]`, skip));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = walk(v, path ? `${path}.${k}` : k, skip);
    }
    return out;
  }
  return value;
}

/**
 * Return a US-market copy of `config`. The input is never mutated, so the EUR
 * config stays the home-market default (and the prerendered HTML stays EUR).
 */
export function localizeToUSD(config: BridgeConfig): BridgeConfig {
  // Competitor rows keep the seller's own native currency — never FX-converted.
  const competitorRows = new Set<string>();
  config.comparison?.rows.forEach((row, i) => {
    if (!row.ours) competitorRows.add(`comparison.rows[${i}]`);
  });
  const skip = (p: string) => competitorRows.has(p);

  const next = walk(config, "", skip) as BridgeConfig;

  if (next.checkout) {
    const usd = USD_VARIANTS[next.checkout.variantId];
    if (usd) {
      next.checkout.listValue = usd.listValue;
      next.checkout.checkoutValue = usd.checkoutValue;
    }
    next.checkout.currency = "USD";
  }

  next.variantChoices?.options.forEach((opt) => {
    const usd = USD_VARIANTS[opt.variantId];
    if (usd) {
      opt.listValue = usd.listValue;
      opt.checkoutValue = usd.checkoutValue;
    }
    opt.currency = "USD";
  });

  if (next.offer.bundle) {
    const addUsd = USD_ADDONS[next.offer.bundle.addVariantId];
    if (addUsd !== undefined) next.offer.bundle.addListValue = addUsd;
  }

  return next;
}
