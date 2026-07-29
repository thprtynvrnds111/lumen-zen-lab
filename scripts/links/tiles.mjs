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
 *  - Prices are HARDCODED here as TEXT, which the React app deliberately never
 *    does (SystemBundle.tsx renders whatever Shopify returns, in the visitor's
 *    own currency). A zero-JS page cannot do that. The trade is accepted for two
 *    anchors and nowhere else — the €88 entry and the €399 System — and never as
 *    pixels: no price may be typeset into a tile image (that is the €499
 *    incident; see knowledge/products/LIVE-CATALOG-TRUTH.md). Two numbers on
 *    this page to keep true; both are verified below.
 */

export const SITE = "https://zentialpure.com";

/** Verified live 2026-07-26, Storefront API, handle lifting-and-tightening-face-introducer. */
export const ENTRY_PRICE_EUR = 88;

/** Verified live 2026-07-26, 0d1m9a-w7.myshopify.com/products/the-system-founding-bundle.json → 399.00 (compare-at 468.00). */
export const SYSTEM_PRICE_EUR = 399;

export const BRAND = {
  wordmark: "Zential Pure",
  tagline: "Clinic Precision. Daily Ritual.",
  hero: {
    src: "/link/hero.webp",
    width: 960,
    height: 600,
    alt: "The Restoration Mat lit red, in use at home.",
  },
  footNote: "Ships free in the EU · 30-Day Money-Back Guarantee · CE marked",
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
    sub: `All three · €${SYSTEM_PRICE_EUR}`,
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
    alt: "Triptych of the three instruments in use — face, belt, mat — titled The System.",
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
    // Restoration Wrap waitlist test (Gate 1, zero inventory). Thumb is
    // typographic-only, rendered by the wrap-ship session 2026-07-28 — the
    // product does not exist, so there is no honest photo of it.
    id: "wrap",
    title: "The Restoration Wrap",
    sub: "Proposed — built only if you vote",
    href: "/wrap",
    img: "/link/t-wrap.webp",
    alt: "Typographic card reading Wrap? — proposed, you decide.",
  },
  {
    id: "breath",
    title: "Breath",
    sub: "Free ritual app",
    href: "/breath",
    img: "/link/t-breath.webp",
    alt: "The Breath app's resonance visualisation — a glowing teal orb inside an expanding ring.",
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
 * The brand's own social profiles, rendered as a small logo row under the foot
 * links. Deliberately NOT tiles: tiles are conversion surface, this is audience
 * transfer, and a Pinterest row that outranked the €88 entry would be a bad
 * trade. The row exists to move an Instagram viewer to Pinterest (and back),
 * which is the only reason to link off a bio page at all.
 *
 * `platform` matches PLATFORMS[].slug where one exists; the renderer drops the
 * row's own platform, so /ig never offers a link back to Instagram.
 *
 * Paths are the official marks from simple-icons@13, 24x24 viewBox, fetched
 * 2026-07-29 — not redrawn by hand. Inlined because this page loads no
 * JavaScript and no third-party asset, ever.
 */
export const SOCIALS = [
  {
    platform: "ig",
    label: "Instagram",
    handle: "@zentialpure",
    // Operator-confirmed live 2026-07-29 (instagram.com blocks server-side
    // fetch, so this is confirmation, not a machine check).
    href: "https://www.instagram.com/zentialpure/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    platform: "tt",
    label: "TikTok",
    handle: "@zentialpure",
    href: "https://www.tiktok.com/@zentialpure",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    // Verified live 2026-07-29: GET pinterest.com/zentialpure -> 200, "Zential Pure".
    platform: "pin",
    label: "Pinterest",
    handle: "zentialpure",
    href: "https://www.pinterest.com/zentialpure/",
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  },
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
