/**
 * The link-in-bio tile set — the single source of truth for /ig and /tt.
 *
 * Editing this file is the whole job of changing the bio page. The HTML in
 * public/ig.html and public/tt.html is generated (and gitignored); never edit
 * those by hand.
 *
 * Copy rules that apply here:
 *  - No performance, treatment, or outcome claims. This page is read by cold
 *    social traffic and is not gated by the compliance reviewer at request time,
 *    so the copy has to be safe by construction. Factual price and logistics
 *    only. See knowledge/compliance/prohibited-claims.md.
 *  - Prices are HARDCODED here, which the React app deliberately never does
 *    (SystemBundle.tsx renders whatever Shopify returns, in the visitor's own
 *    currency). A zero-JS page cannot do that. The trade is accepted for the
 *    single entry anchor below and nowhere else: every other tile is priceless,
 *    so there is exactly one number on this page to keep true.
 *    €88 verified live 2026-07-26 via the Storefront API.
 */

export const SITE = "https://zentialpure.com";

/** Verified live 2026-07-26, Storefront API, handle lifting-and-tightening-face-introducer. */
export const ENTRY_PRICE_EUR = 88;

export const BRAND = {
  wordmark: "Zential Pure",
  tagline: "Clinic Precision. Daily Ritual.",
  hero: {
    src: "/link/hero.webp",
    width: 960,
    height: 600,
    alt: "The Restoration Mat lit red, in use at home.",
  },
  footNote: "Ships free in the EU from Rotterdam · 30-day protocol guarantee · CE marked",
};

/**
 * Order is the design. The €88 entry leads because cold social traffic prices
 * the whole brand off the first number it sees; the €399 System sits third,
 * after the quiz has had a chance to qualify.
 */
export const TILES = [
  {
    id: "instruments",
    title: "The Instruments",
    sub: `Three. From €${ENTRY_PRICE_EUR}.`,
    href: "/instruments",
    img: "/link/t-instruments.webp",
    alt: "The Face Introducer on marble, lit blue.",
  },
  {
    id: "quiz",
    title: "Find your protocol",
    sub: "60-second quiz",
    href: "/quiz",
    img: "/link/t-quiz.webp",
    alt: "Close crop of a jawline and neck in daylight.",
  },
  {
    id: "system",
    title: "The System",
    sub: "All three, one price",
    // /instruments#system, deliberately, after two dead ends found by loading
    // the live page rather than reasoning about it:
    //   - /product/the-system-founding-bundle renders "Product not found". The
    //     handle is allowlisted in liveCatalog.ts but has no entry in
    //     productConfigs.ts, and ProductDetail requires one. The bundle has no
    //     PDP; nothing else on the site links to it either.
    //   - /protocols does not surface the bundle at all (no €399 on the page).
    // <SystemBundle /> on /instruments is the only rendering of the System
    // offer, hence the anchor. The deep link depends on useHashScroll retrying
    // past the lazy-route boot; see that hook.
    href: "/instruments#system",
    img: "/link/t-system.webp",
    alt: "The three instruments side by side.",
  },
  {
    id: "science",
    title: "The Science",
    sub: "What the evidence says",
    href: "/science",
    img: "/link/t-science.webp",
    alt: "660nm red light falling across a forearm.",
  },
  {
    id: "breath",
    title: "Breath",
    sub: "Free ritual app",
    href: "/breath",
    img: "/link/t-breath.webp",
    alt: "A woman seated at a bright window with a cup.",
    accent: true,
  },
];

/** Small type under the tiles. Utility, not conversion. */
export const FOOT_LINKS = [
  { label: "Track order", href: "/track" },
  { label: "Support", href: "/support" },
  { label: "Journal", href: "/editorial" },
];

/**
 * One output file per platform. utm is baked into every outbound href at build
 * time because the page ships zero JavaScript and therefore cannot read its own
 * query string.
 */
export const PLATFORMS = [
  {
    slug: "ig",
    out: "ig.html",
    label: "Instagram",
    utm: { utm_source: "instagram", utm_medium: "bio", utm_campaign: "link_in_bio" },
  },
  {
    slug: "tt",
    out: "tt.html",
    label: "TikTok",
    utm: { utm_source: "tiktok", utm_medium: "bio", utm_campaign: "link_in_bio" },
  },
];
