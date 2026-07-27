/**
 * /reveal — campaign configuration.
 * Everything an operator edits per campaign lives in this file;
 * mechanic and presentation never need touching.
 */

export interface Gift {
  num: string;
  title: string;
  detail: string;
}

/** Grounded in knowledge/products/LIVE-CATALOG-TRUTH.md (verified 2026-06-29).
 *  The Face Introducer, €88 — EMS, microcurrent, thermal. */
export const GIFTS: Gift[] = [
  {
    num: "01",
    title: "10% off The Face Introducer",
    detail: "Your founding rate, applied at checkout.",
  },
  {
    num: "02",
    title: "The Face Protocol",
    detail: "The 12 minute clinic sequence, yours with the instrument.",
  },
  {
    num: "03",
    title: "The 30 Day Protocol Guarantee",
    detail: "A full month with the instrument. Not yours, full refund.",
  },
];

/** Shopify product path the discount URL redirects to — live handle verified. */
export const PDP_URL = "/products/lifting-and-tightening-face-introducer";
/** NOTE: create/verify this code in Shopify admin before production —
 *  referenced by winback flow spec but marked unverified there. */
export const DISCOUNT_CODE = "PROTOCOL10";
export const CHECKOUT_DOMAIN = "https://checkout.zentialpure.com";

export const CTA_HREF = `${CHECKOUT_DOMAIN}/discount/${DISCOUNT_CODE}?redirect=${encodeURIComponent(
  PDP_URL
)}`;

export const COPY = {
  eyebrow: "Zential Pure",
  headline1: "Begin your ritual.",
  headline2: "Choose one.",
  sub1: "3 cards. Each carries the same 3 gifts.",
  sub2: "The choosing is the ritual.",
  headlineAfter: "It begins.",
  subAfter: "3 gifts, sealed to your card.",
  footer: "One choice. No wrong card.",
  footerAfter: "Clinic Precision. Daily Ritual.",
  cardFrontLine: "Daily Ritual.",
  cta: "Receive your 3 gifts",
  ctaNote: "Applied at checkout. No code needed.",
  title: "A Ritual Begins, Zential Pure",
};

/** The ritual's tempo (ms). Slow, deliberate, one beat of silence. */
export const TIMING = {
  lift: 250, // chosen card lifts before flipping
  flip: 600, // the flip itself
  beat: 350, // held silence after the flip
  giftStagger: 400,
  giftDur: 500,
} as const;

export const T_GIFTS_START = TIMING.lift + TIMING.flip + TIMING.beat; // 1200
export const T_CTA = T_GIFTS_START + TIMING.giftStagger * 2 + TIMING.giftDur; // after gift 03 lands
