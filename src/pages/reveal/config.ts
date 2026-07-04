/**
 * /reveal — campaign configuration.
 * Everything an operator edits per campaign lives in this file;
 * mechanic and presentation never need touching.
 */

export interface Gift {
  num: string;
  title: string;
}

export const GIFTS: Gift[] = [
  { num: "01", title: "[GIFT_1]" },
  { num: "02", title: "[GIFT_2]" },
  { num: "03", title: "[GIFT_3]" },
];

/** Shopify product path the discount URL redirects to, e.g. "/products/frequency-wand-pro" */
export const PDP_URL = "[___]";
export const DISCOUNT_CODE = "[___]";
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
