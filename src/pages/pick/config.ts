/**
 * /pick — gamified discount lander for the TOF educator ad campaign.
 * Three cards, three REAL discount tiers. The card she turns is the rate
 * she keeps — no fake scarcity, no losing card, smallest prize stated openly.
 *
 * Everything an operator edits per campaign lives here; the mechanic and
 * presentation (Pick.tsx / usePickRitual.ts) never need touching.
 */

export interface PickPrize {
  /** Shopify discount code — must exist in admin before traffic runs. */
  code: string;
  /** Whole-number percentage, shown on the card face. */
  percent: number;
  detail: string;
}

/** Grounded in knowledge/products/LIVE-CATALOG-TRUTH.md (Belt €180, compare-at €280).
 *  All three codes exist and are live in Shopify. RITUAL15 checkout-verified
 *  2026-07-13; PRACTICE20 verified applying 2026-07-18 via live Storefront
 *  cartCreate (FI cart €88 → €70.40, applicable:true). PROTOCOL10 exists but
 *  returns applicable:false on anonymous carts — likely a once-per-customer
 *  restriction (separate open question, not a launch blocker here).
 *  Rates below MUST match the discount rates configured in Shopify admin. */
export const PRIZES: PickPrize[] = [
  { code: "PROTOCOL10", percent: 10, detail: "The founding rate." },
  { code: "RITUAL15", percent: 15, detail: "The ritual rate." },
  { code: "PRACTICE20", percent: 20, detail: "The practice rate." },
];

/** Storefront PDP the CTA leads to — the PDP forwards ?discount= into
 *  Shopify checkout (InstrumentLanding bridge-funnel continuity). */
export const PDP_PATH = "/instruments/restoration-belt";

export const COPY = {
  eyebrow: "Zential Pure",
  headline1: "Three cards.",
  headline2: "Three real discounts.",
  sub1: "Ten, fifteen and twenty percent are on this table.",
  sub2: "The card you turn is the rate you keep.",
  headlineAfter: "Yours now.",
  subAfter: "Sealed to your card, applied at checkout.",
  footer: "No wrong card. The smallest is ten percent.",
  footerAfter: "Recovery is a practice, not a procedure.",
  prizeProduct: "off The Restoration Belt",
  prizeAnchor: "€180 once — was €280. Your rate comes off at checkout.",
  cta: "Take it to the Belt",
  ctaNote: "Applied at checkout automatically. No code to remember.",
  title: "Pick a Card, Zential Pure",
};

/** Same tempo as /reveal — slow, deliberate, one beat of silence. */
export const TIMING = {
  lift: 250,
  flip: 600,
  beat: 350,
  prizeDur: 500,
} as const;

export const T_PRIZE_START = TIMING.lift + TIMING.flip + TIMING.beat; // 1200
export const T_CTA = T_PRIZE_START + TIMING.prizeDur + 300;
