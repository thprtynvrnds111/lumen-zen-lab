/**
 * Paid-traffic bridge funnel — campaign copy + data, keyed by product slug.
 *
 * Source of truth: Zential Pure funnel build SPEC + knowledge/products/LIVE-CATALOG-TRUTH.md.
 * All figures here are the VERIFIED set — do not add numbers that are not below.
 * Compliance hard rules baked in: Trustpilot shown as an honest low-count signal
 * (founding phase, <20 reviews — NEVER a big rating number); testimonials are real
 * founding-customer quotes only (placeholder-flagged until real); category-level hedged
 * claims only; no medical/treatment claims; no before/after; no urgency theater.
 *
 * VERIFIED CATALOG (LIVE-CATALOG-TRUTH, 2026-07-08):
 *  - Face Introducer €88 · EMS·microcurrent·thermal·cosmetic LED (630–660nm) · 12 min
 *    · with RITUAL15 (15%): €74.80 — cartCreate-verified 2026-07-18 (grep anchor: 74.80)
 *  - Restoration Belt €180 (compare-at €280) · 660nm red + 850nm NIR, thermal wrap, waist 28–48in · 15 min
 *    · with RITUAL15 (15%): €153.00 — cartCreate-verified 2026-07-19 (grep anchor: 153.00)
 *  - Restoration Mat from €200 · 660nm red + far-infrared heat, 100/120×40cm panel, rolls flat · 20 min
 */

/* Heroes — approved, do not change. */
import faceHero from "@/assets/funnel/product-hero.webp";
import beltHero from "@/assets/funnel/belt-hero.webp";
import matHero from "@/assets/funnel/mat-hero.webp";

/* Secondary imagery — real product-in-use shots from the storefront library,
   visually audited 2026-07-08. Each slot matches the product + the pain point
   (never generic mood filler). HARD RULES: no before/after imagery anywhere
   (problem-face-introducer-v2 is a banned split); never use fallback-restore-mat /
   problem-restore-mat (blue acupressure mat = wrong product, ghost SKU). */
import faceMechanism from "@/assets/funnel/face-mechanism-gen.webp"; // device-only on marble shelf at dusk, red glow (generated 2026-07-08)
import faceRitual1 from "@/assets/ritual-guide-hero.webp"; // vanity mirror, robe, gel — continues the UGC ad register
import faceRitual2 from "@/assets/lifestyle-facial.webp"; // instrument at the cheek, glide moment
import faceRitual3 from "@/assets/method/glow.webp"; // calm skin in warm light, no claim
import faceOffer from "@/assets/unboxing-founder.webp"; // Zential Pure box open on a kitchen table

import beltMechanism from "@/assets/funnel/belt-mechanism-gen.webp"; // device-only, open wrap glowing on the bed (generated 2026-07-08)
import beltRitual1 from "@/assets/storefront-belt-woman.png"; // fastening the wrap on the bed, daylight
import beltRitual2 from "@/assets/belt-who.png"; // seated cross-legged, mid-session calm
import beltRitual3 from "@/assets/instruments-belt-back.webp"; // evening, lamp, book — the kept-up habit (male buyer visible)
import beltOffer from "@/assets/hero-redlight-belt.webp"; // relaxed at home, belt glowing — human buy-moment

import matMechanism from "@/assets/funnel/mat-mechanism-gen.webp"; // mat glowing on the bed at dusk (generated 2026-07-08, brand-matched)
import matOffer from "@/assets/funnel/mat-offer-gen.webp"; // half-rolled, rolls-flat proof, remote beside (generated 2026-07-08)
import matRitual1 from "@/assets/funnel/mat-ritual-1-gen.webp"; // half unrolled across the bed, glow beginning (generated 2026-07-08)
import matRitual2 from "@/assets/funnel/mat-ritual-2-gen.webp"; // close glow detail, tea on the nightstand (generated 2026-07-08)
import matRitual3 from "@/assets/funnel/mat-ritual-3-gen.webp"; // rolled away at the foot of the bed, morning light (generated 2026-07-08)

export interface TrustItem {
  title: string;
  body: string;
}

export interface Quote {
  /** Real founding-customer quote. Leave `placeholder: true` until a real one exists. */
  text: string;
  name: string;
  meta: string;
  placeholder?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RitualStep {
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}

export interface BridgeConfig {
  slug: string;
  /** PDP route. When `checkout` is set, buy CTAs bypass this and go one-hop to
   *  checkout; pdpPath then only feeds the "see the product page" softlink
   *  (with ?discount= appended, which drives the PDP arrival strip). */
  pdpPath: string;
  discountCode: string;
  /** Direct-to-checkout data. When set, buy CTAs render as a plain anchor to a
   *  Shopify cart permalink derived from variantId + discountCode (works with
   *  zero JS in weak in-app browsers), and fire click-bound AddToCart +
   *  InitiateCheckout with these figures. Every figure here must be verified
   *  against live Shopify (cartCreate) before shipping. */
  checkout?: {
    variantId: string;
    name: string;
    listValue: number;
    /** Price after discountCode — must match a live cartCreate total. */
    checkoutValue: number;
    currency: string;
  };
  title: string;
  metaDescription: string;

  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    /** Price + risk-reversal line shown above the hero CTA. */
    priceLine: string;
    /** Hero CTA label — the same single purchase path as the offer block. */
    cta: string;
    image: string;
    alt: string;
  };

  credibility: {
    eyebrow: string;
    lead: string;
    trustpilot: { label: string; note: string; href: string };
    items: TrustItem[];
  };

  mechanism: {
    eyebrow: string;
    headline: string;
    body: string[];
    caption: string;
    image: string;
    alt: string;
    research: { intro: string; points: string[]; disclaimer: string };
  };

  clinicMath: {
    eyebrow: string;
    headline: string;
    clinic: { title: string; price: string; unit: string; rows: string[] };
    instrument: { title: string; price: string; unit: string; rows: string[] };
    benchmark: { title: string; body: string; tag: string };
  };

  social: {
    eyebrow: string;
    headline: string;
    /** Honest low-count framing. Shown ABOVE the quotes. This is not a weakness —
     *  our first real customer bought because of "relentless honesty". */
    honesty: { headline: string; body: string; href: string; linkLabel: string };
    quotes: Quote[];
  };

  ritual: { eyebrow: string; headline: string; steps: RitualStep[]; closing: string };

  faq: { eyebrow: string; headline: string; items: FaqItem[] };

  offer: {
    eyebrow: string;
    headline: string;
    price: string;
    /** Optional AOV add-on: one extra variant appended to the one-hop cart.
     *  Figures must be cartCreate-verified before shipping. */
    bundle?: {
      addVariantId: string;
      /** List price of the added item, EUR — for honest pixel values. */
      addListValue: number;
      text: string;
      note: string;
      cta: string;
    };
    /** Optional high-AOV bridge to the System lander. */
    systemBridge?: {
      text: string;
      cta: string;
      href: string;
    };
    priceNote: string;
    inBoxTitle: string;
    inBox: string[];
    guarantee: string;
    cta: string;
    /** Micro-reassurance rendered directly under the CTA button. */
    ctaNote: string;
    /** One-line price+risk summary for the sticky bar. */
    stickyLine: string;
    image: string;
    alt: string;
  };

  footer: {
    echoes: string[];
    legal: { label: string; href: string }[];
    smallprint: string;
  };
}

/* ── Shared, product-agnostic blocks (institutional trust is identical per brand) ── */

const TRUSTPILOT = {
  label: "Verified reviews, growing",
  note: "We are early. Reviews come from founding customers on our public Trustpilot profile — real, and few, on purpose.",
  href: "https://nl.trustpilot.com/review/zentialpure.com",
};

const TRUST_ITEMS: TrustItem[] = [
  {
    title: "CE Marked",
    body: "Independently assessed against EU safety, health and environmental standards for consumer electronics. Not a self-declared marketing badge.",
  },
  {
    title: "EU Company · Netherlands",
    body: "Zential Pure B.V., a registered company in the Netherlands, verifiable in the Dutch business register.",
  },
  {
    title: "30-Day Return",
    body: "Thirty days to change your mind. Full refund, any reason, no forms and no photos. Stated here as a promise, not buried in a footnote.",
  },
  {
    title: "2-Year Warranty",
    body: "Every instrument is covered for two years against manufacturing fault. A device meant to be kept, backed like one.",
  },
  {
    title: "Secure Checkout",
    body: "Payment handled by Shopify Payments over encrypted SSL — Wero, major cards, PayPal, Apple Pay and Google Pay. We never see your card details.",
  },
  {
    title: "Shipping & Duties",
    body: "Free EU shipping, dispatched within two to three working days and tracked to your door. Import VAT is prepaid at checkout — no customs bill, no surprises on arrival.",
  },
];

const FOOTER = {
  echoes: [
    "30-day full refund, any reason",
    "CE marked · tested to spec",
    "Import VAT prepaid — no customs bill",
  ],
  legal: [
    { label: "Returns policy", href: "/returns" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/support" },
  ],
  smallprint:
    "Zential Pure B.V. · Registered in the Netherlands. This instrument is designed to support the appearance of skin and everyday recovery with consistent use. It does not diagnose, treat or cure any medical condition. Individual experiences vary.",
};

const GUARANTEE =
  "Backed by our 30-day return. Keep it thirty days; if it is not for you, send it back for a full refund. No forms, no photos.";

/* ───────────────────────── Face Introducer (€88) ───────────────────────── */

const faceIntroducer: BridgeConfig = {
  slug: "face-introducer",
  pdpPath: "/instruments/face-introducer",
  discountCode: "RITUAL15",
  // Verified 2026-07-18: variant 51731419922775 = Face Introducer €88.00 (live
  // products.json); cart permalink 302s straight into checkout with
  // discount_code=RITUAL15 applied; cartCreate with RITUAL15 totals €74.80.
  checkout: {
    variantId: "51731419922775",
    name: "The Face Introducer",
    listValue: 88.0,
    checkoutValue: 74.8,
    currency: "EUR",
  },
  title: "The Face Introducer — Zential Pure",
  metaDescription:
    "The instrument category behind clinic microcurrent, recalibrated for a twelve-minute evening ritual at home. CE marked. 30-day return. Free, tracked EU shipping.",

  hero: {
    eyebrow: "No miracle — a mechanism · here is the full story",
    headline: "Your skin already knows how to do this. It has simply stopped being reminded.",
    sub: "The instrument category behind clinic microcurrent — EMS, microcurrent, thermal and cosmetic LED (630–660nm) — recalibrated for a twelve-minute evening ritual at home.",
    priceLine: "€88 once · 30-day full refund, any reason",
    cta: "Claim the founding price",
    image: faceHero,
    alt: "The Face Introducer resting on a bathroom shelf in warm evening light.",
  },

  credibility: {
    eyebrow: "Who you are ordering from",
    lead: "Before we say a word about your skin, here is who stands behind the instrument. A registered EU company, independently safety-assessed, returnable for any reason — everything you would check before spending real money, in one place.",
    trustpilot: TRUSTPILOT,
    items: TRUST_ITEMS,
  },

  mechanism: {
    eyebrow: "How the instrument works",
    headline: "Resonance restoration",
    body: [
      "Facial tissue produces its own low-level electrical signal. With age and fatigue that signal grows quieter. The Face Introducer delivers a calibrated microcurrent that reminds the tissue of a frequency it already produces naturally.",
      "That is the mechanism. The benefit reported by consistent users is firmer-looking contour and a more rested appearance. The claim we make is deliberately narrow: this is support, delivered daily, not a cure.",
      "The cosmetic LED runs at 630–660nm — wavelengths absorbed in the upper layers of the skin, a process called photobiomodulation. Where the cosmetic LED literature is studied at all, the subject is the appearance of skin — and the timescale is weeks of consistent use, not days.",
    ],
    caption: "Four modalities — EMS, microcurrent, thermal and cosmetic LED (630–660nm) — one calibrated signal, twelve minutes.",
    image: faceMechanism,
    alt: "The Face Introducer standing on a marble shelf at dusk, red light glowing at its head, conductive gel beside it.",
    research: {
      intro:
        "Peer-reviewed studies exist on this technology class — facial microcurrent, EMS and cosmetic LED. The evidence is early and modest, and two things we refuse to do: promise you a specific outcome, or decorate this page with citations we have not read ourselves. Here is the honest shape of it.",
      points: [
        "Facial microcurrent and neuromuscular stimulation: category-level reviews are studied for short-term changes in muscle tone with repeated use. The evidence is early and modest — we would rather say so than oversell it.",
        "Cosmetic LED at 630–660nm: the wavelength range studied for the appearance of skin with repeated use. Studied means studied — not proven for you personally.",
        "Frequency and duration follow the protocol card in the box: twelve minutes, most evenings. Consistency is the variable the literature keeps pointing at.",
      ],
      disclaimer:
        "Individual results vary with consistency. This instrument supports the appearance of skin; it does not treat any medical condition.",
    },
  },

  clinicMath: {
    eyebrow: "If you have sat in the chair before",
    headline: "The maths of doing it at home.",
    clinic: {
      title: "A course in the clinic",
      price: "€720",
      unit: "per year",
      rows: ["Six to ten sessions at €80–120 each", "Travel and time booked around them", "Results fade between appointments"],
    },
    instrument: {
      title: "The Face Introducer",
      price: "€88",
      unit: "once",
      rows: ["Yours to keep, no subscription", "Twelve minutes, at home, on your schedule", "Used daily, so the signal never lapses"],
    },
    benchmark: {
      title: "Versus the premium US benchmark",
      body: "The best-known US microcurrent device retails around €349 for a single modality, with returns handled overseas. The Face Introducer runs four, ships free within the EU, and is returnable to Rotterdam.",
      tag: "€88 · EU support",
    },
  },

  social: {
    eyebrow: "In their own words",
    headline: "Founding customers",
    honesty: {
      headline: "We are new. We have six reviews.",
      body: "Not six hundred. We are not going to invent the difference. Below are the real ones, copied from our public Trustpilot profile — typos and all. Judge us on the methodology above, keep the instrument for thirty days, and send it back if we are wrong.",
      href: "https://nl.trustpilot.com/review/zentialpure.com",
      linkLabel: "Read them on Trustpilot →",
    },
    quotes: [
      { text: "Bougth this after doing alot of research. The fullface coverage and the glow it gives after each session is unlike anything i've used before. Three weeks in an two people have asked if I changed my skincare routine!", name: "Maria", meta: "Netherlands · Trustpilot, verified" },
      { text: "The difference between other devices and this one is just huge. The quality is really there.", name: "Jennarosa", meta: "Netherlands · Trustpilot, verified" },
      { text: "first I was a bit sceptical, about improving my skin. Fortunately, the devices really worked well.", name: "Daan Mossel", meta: "Netherlands · Trustpilot, verified" },
    ],
  },

  ritual: {
    eyebrow: "What your Tuesday night looks like",
    headline: "The ritual, in three steps.",
    steps: [
      { index: "One", title: "Evening", body: "After you have cleansed. A layer of conductive gel, the lights low. The end of the day, not another task in it.", image: faceRitual1, alt: "At the bathroom mirror in a robe, gel and instrument laid out on the vanity." },
      { index: "Two", title: "Twelve minutes", body: "Glide the instrument upward and outward along the jaw and cheek. Slow passes. It hums warm against the skin; most people feel a gentle tightening, nothing sharp.", image: faceRitual2, alt: "The instrument gliding along the cheek, its light warm against the skin." },
      { index: "Three", title: "Kept up", body: "The signal responds to repetition, not intensity. Done most evenings, it becomes the quiet punctuation at the end of your day.", image: faceRitual3, alt: "Calm skin in warm evening light." },
    ],
    closing: "It is always a ritual, and always an instrument. Never a routine, never a gadget.",
  },

  faq: {
    eyebrow: "The things you are still wondering",
    headline: "Answered plainly.",
    items: [
      { q: "Will I feel anything?", a: "A gentle warmth and a light tightening as the instrument passes over the skin — most people find it calming rather than sharp. If a setting feels too strong, step it down; the signal responds to consistency, not intensity." },
      { q: "How is this different from the cheaper devices on Amazon?", a: "Most inexpensive wands run a single modality and no independent safety assessment. The Face Introducer combines four — EMS, microcurrent, thermal and cosmetic LED — is CE marked against EU standards, and is backed by a two-year warranty and a company you can look up in the Dutch register." },
      { q: "What if it doesn't work for me?", a: "Keep it thirty days. If it is not for you, send it back to Rotterdam for a full refund — any reason, no forms and no photos. The risk of trying it is thirty days, not €88." },
      { q: "Is it safe?", a: "It is CE marked, meaning independently assessed against EU safety, health and environmental standards for consumer electronics. Follow the protocol card for session length and frequency, and avoid use over broken skin or if you have an implanted electronic device without checking with your doctor first." },
      { q: "How long until I notice anything?", a: "Honestly, it depends on consistency. This is support delivered daily, not an overnight change. Users who keep to most evenings tend to report a firmer-looking contour and a more rested appearance over weeks — we make no promise of a fixed timeline, because that would not be true." },
    ],
  },

  offer: {
    eyebrow: "Clinic precision. Daily ritual.",
    headline: "The Face Introducer",
    price: "€88",
    priceNote: "Once, not per session. One clinic session costs €80 to €120. The founding code RITUAL15 is applied for you at checkout — €74.80, nothing to type. Free, tracked EU shipping.",
    inBoxTitle: "In the box",
    inBox: ["The Face Introducer instrument", "Conductive ritual gel, first supply", "Magnetic charging base and cable", "The twelve-minute protocol card"],
    guarantee: GUARANTEE,
    cta: "Claim the founding price",
    ctaNote: "RITUAL15 applied automatically — €74.80 at checkout · Free, tracked EU shipping · 30-day full refund",
    stickyLine: "€74.80 founding · 30-day return",
    // Verified 2026-07-19: variant 52413727506775 = Restore Gel €18 (live products.json);
    // FI+Gel cartCreate with RITUAL15: €106 subtotal → €90.10 total; permalink 302s.
    bundle: {
      addVariantId: "52413727506775",
      addListValue: 18.0,
      text: "Add the Restore Gel — the conductive layer the ritual runs on.",
      note: "Instrument + gel: €106 — €90.10 with RITUAL15 at checkout. Same 30-day return.",
      cta: "Begin with the full ritual",
    },
    systemBridge: {
      text: "Outfitting the whole shelf? Face, body and full rest — The System runs €399, was €468.",
      cta: "See the System",
      href: "/one-shelf",
    },
    image: faceOffer,
    alt: "The Face Introducer in its open Zential Pure box on a kitchen table.",
  },

  footer: FOOTER,
};

/* ───────────────────────── Restoration Belt (€180, was €280) ───────────────────────── */

const restorationBelt: BridgeConfig = {
  slug: "restoration-belt",
  pdpPath: "/instruments/restoration-belt",
  discountCode: "RITUAL15",
  // Verified 2026-07-19: variant 53502319755607 = Restoration Belt €180.00
  // (compare-at €280, live products.json, single variant); permalink 302s into
  // checkout with discount_code=RITUAL15; cartCreate with RITUAL15 totals €153.00.
  checkout: {
    variantId: "53502319755607",
    name: "The Restoration Belt",
    listValue: 180.0,
    checkoutValue: 153.0,
    currency: "EUR",
  },
  title: "The Restoration Belt — Zential Pure",
  metaDescription:
    "The recovery-wrap category — 660nm red and 850nm near-infrared light held close by a thermal wrap — recalibrated for a fifteen-minute ritual at home. CE marked. 30-day return. Free, tracked EU shipping.",

  hero: {
    eyebrow: "You watched her routine · here is the rest of it",
    headline: "Your body already knows how to recover. Warmth and the right light simply give it somewhere to begin.",
    sub: "The recovery-wrap category — 660nm red and 850nm near-infrared, pressed close to muscle by a thermal wrap — recalibrated for a fifteen-minute ritual at home.",
    priceLine: "€180 once · 30-day full refund, any reason",
    cta: "Claim the founding price",
    image: beltHero,
    alt: "The Restoration Belt wrapped at the waist in warm, low evening light.",
  },

  credibility: {
    eyebrow: "Who you are ordering from",
    lead: "Before we say a word about recovery, here is who stands behind the instrument. A registered EU company, independently safety-assessed, returnable for any reason — everything you would check before spending real money, in one place.",
    trustpilot: TRUSTPILOT,
    items: TRUST_ITEMS,
  },

  mechanism: {
    eyebrow: "How the instrument works",
    headline: "Light and warmth, worn close",
    body: [
      "Muscle tissue responds to specific wavelengths of light. The Restoration Belt delivers 660nm red and 850nm near-infrared, held against the body by a thermal wrap so a steady warmth carries the light to where it is worn close.",
      "That is the mechanism. Consistent users report muscles that feel looser and a body that feels readier the next day. The claim is deliberately narrow: this is warmth and light applied as a ritual, not a medical treatment.",
    ],
    caption: "Two wavelengths, gentle heat, fifteen minutes, worn where the day settled.",
    image: beltMechanism,
    alt: "The Restoration Belt laid open on cream linen, its inner grid of red light glowing softly.",
    research: {
      intro:
        "Peer-reviewed studies on red and near-infrared light (photobiomodulation) report effects on muscle recovery and local circulation with repeated use. We link the category literature rather than promising you a specific outcome.",
      points: [
        "Reviews on red / near-infrared photobiomodulation for muscle recovery (category level).",
        "Literature on 660nm and 850nm wavelengths and tissue penetration.",
        "Our own methodology note on session length and placement.",
      ],
      disclaimer:
        "Individual results vary with consistency. This instrument supports recovery and comfort; it does not diagnose, treat or cure any medical condition.",
    },
  },

  clinicMath: {
    eyebrow: "If you have booked recovery before",
    headline: "The maths of doing it at home.",
    clinic: {
      title: "A course of studio sessions",
      price: "€480",
      unit: "per year",
      rows: ["Around €30 a session, booked ahead", "Travel and a fixed time slot", "The warmth ends when the session does"],
    },
    instrument: {
      title: "The Restoration Belt",
      price: "€180",
      unit: "once",
      rows: ["Yours to keep, no subscription", "Fifteen minutes, at home, worn close", "Used as often as you like"],
    },
    benchmark: {
      title: "Versus the premium US wraps",
      body: "Premium US recovery wraps retail around €300 and up for a single light band, with returns handled overseas. The Restoration Belt runs two wavelengths under a thermal wrap, ships free within the EU, and is returnable to Rotterdam.",
      tag: "€180 · was €280 · EU support",
    },
  },

  social: {
    eyebrow: "In their own words",
    headline: "Founding customers",
    honesty: {
      headline: "We are new. We have six reviews.",
      body: "Not six hundred, and none of them for this instrument yet. We are not going to invent them. Below is what founding customers have said about Zential instruments on our public Trustpilot profile — copied exactly. Judge us on the methodology above, keep it thirty days, and send it back if we are wrong.",
      href: "https://nl.trustpilot.com/review/zentialpure.com",
      linkLabel: "Read them on Trustpilot →",
    },
    quotes: [
      { text: "The difference between other devices and this one is just huge. The quality is really there.", name: "Jennarosa", meta: "Netherlands · Trustpilot, verified" },
      { text: "The instructions where clear and the customer service answered my questions within hours. will order the Eye Activator next.", name: "Miguel Lam", meta: "Cura\u00e7ao · Trustpilot, verified" },
      { text: "first I was a bit sceptical, about improving my skin. Fortunately, the devices really worked well.", name: "Daan Mossel", meta: "Netherlands · Trustpilot, verified" },
    ],
  },

  ritual: {
    eyebrow: "What your evening looks like",
    headline: "The ritual, in three steps.",
    steps: [
      { index: "One", title: "Worn close", body: "Wrap it around the waist, or wherever the day settled. Snug, not tight. The heat begins to build within a minute.", image: beltRitual1, alt: "Fastening the Restoration Belt at the waist, seated on the bed in daylight." },
      { index: "Two", title: "Fifteen minutes", body: "The light works under the warmth while you sit back. Most people feel a steady, spreading heat — nothing sharp.", image: beltRitual2, alt: "Seated cross-legged with the belt on, its red light glowing softly." },
      { index: "Three", title: "Kept up", body: "Used most evenings, or after training, it becomes the moment your body files the day as done.", image: beltRitual3, alt: "On the edge of the bed in lamplight, the belt warm against the lower back." },
    ],
    closing: "It is always a ritual, and always an instrument. Never a routine, never a gadget.",
  },

  faq: {
    eyebrow: "The things you are still wondering",
    headline: "Answered plainly.",
    items: [
      { q: "Will I feel anything?", a: "A steady, spreading warmth and a soft glow of light against the skin — most people find it calming rather than intense. If the heat feels too strong, step it down." },
      { q: "How is this different from a cheap heat wrap?", a: "A heat wrap is only heat. The Restoration Belt adds 660nm red and 850nm near-infrared light under that warmth, is CE marked against EU standards, and is backed by a two-year warranty and a company you can look up in the Dutch register." },
      { q: "What if it doesn't work for me?", a: "Keep it thirty days. If it is not for you, send it back to Rotterdam for a full refund — any reason, no forms and no photos." },
      { q: "Is it safe?", a: "It is CE marked, independently assessed against EU safety standards for consumer electronics. Follow the protocol card for session length, avoid use over broken skin, and check with your doctor first if you are pregnant or have an implanted electronic device." },
      { q: "How long until I notice anything?", a: "It depends on consistency. This is warmth and light applied as a ritual, not an overnight fix. Users who keep to most evenings tend to report feeling looser and readier over weeks — we promise no fixed timeline, because that would not be true." },
    ],
  },

  offer: {
    eyebrow: "Recovery, worn close.",
    headline: "The Restoration Belt",
    price: "€180",
    priceNote: "Was €280. Once, not per session. The founding code RITUAL15 is applied for you at checkout — €153.00, nothing to type. Free, tracked EU shipping.",
    inBoxTitle: "In the box",
    inBox: ["The Restoration Belt instrument", "Adjustable thermal wrap (fits waist 28–48in)", "Power adapter and cable", "The fifteen-minute protocol card"],
    guarantee: GUARANTEE,
    cta: "Claim the founding price",
    ctaNote: "RITUAL15 applied automatically — €153.00 at checkout · Free, tracked EU shipping · 30-day full refund",
    stickyLine: "€153.00 founding · 30-day return",
    image: beltOffer,
    alt: "The Restoration Belt, folded and arranged on a warm surface.",
  },

  footer: FOOTER,
};

/* ───────────────────────── Restoration Mat (from €200) ───────────────────────── */

const restorationMat: BridgeConfig = {
  slug: "restoration-mat",
  pdpPath: "/instruments/restoration-mat",
  discountCode: "RITUAL15",
  title: "The Restoration Mat — Zential Pure",
  metaDescription:
    "The lie-down recovery-mat category — 660nm red light and far-infrared heat, edge to edge across a 100 × 40 cm panel — recalibrated for a twenty-minute ritual you can roll out anywhere. CE marked. 30-day return. Free, tracked EU shipping.",

  hero: {
    eyebrow: "You watched her lie down · here is the rest of it",
    headline: "Your whole body carries the day. Give it twenty minutes of light and warmth to set it down.",
    sub: "The lie-down recovery-mat category — 660nm red light and far-infrared heat, edge to edge across a 100 × 40 cm panel — recalibrated for a twenty-minute ritual you can roll out anywhere.",
    priceLine: "from €200 once · 30-day full refund, any reason",
    cta: "See the Restoration Mat",
    image: matHero,
    alt: "The Restoration Mat rolled out, glowing softly in a calm, low-lit room.",
  },

  credibility: {
    eyebrow: "Who you are ordering from",
    lead: "Before we say a word about recovery, here is who stands behind the instrument. A registered EU company, independently safety-assessed, returnable for any reason — everything you would check before spending real money, in one place.",
    trustpilot: TRUSTPILOT,
    items: TRUST_ITEMS,
  },

  mechanism: {
    eyebrow: "How the instrument works",
    headline: "Wide-field restoration",
    body: [
      "The body responds to specific wavelengths of light and to deep, even warmth. The Restoration Mat delivers 660nm red light and far-infrared heat across its whole surface, so you lie in it rather than aim it.",
      "That is the mechanism. Consistent users report a body that feels looser and a mind that slows down. The claim is deliberately narrow: this is light and warmth applied as a ritual, not a medical treatment.",
    ],
    caption: "Red light and far-infrared, a whole region at a time, twenty minutes, rolled flat.",
    image: matMechanism,
    alt: "A figure lying back on the mat in soft light during an evening ritual.",
    research: {
      intro:
        "Peer-reviewed studies on red-light photobiomodulation and far-infrared warmth report effects on recovery, relaxation and local circulation with repeated use. We link the category literature rather than promising you a specific outcome.",
      points: [
        "Reviews on red-light photobiomodulation for recovery and relaxation (category level).",
        "Literature on 660nm wavelengths and on far-infrared warmth.",
        "Our own methodology note on session length and placement.",
      ],
      disclaimer:
        "Individual results vary with consistency. This instrument supports recovery and relaxation; it does not diagnose, treat or cure any medical condition.",
    },
  },

  clinicMath: {
    eyebrow: "If you have booked recovery before",
    headline: "The maths of doing it at home.",
    clinic: {
      title: "A studio red-light course",
      price: "€640",
      unit: "per year",
      rows: ["Around €40 a session, booked ahead", "Travel and a fixed time slot", "Nothing to take home"],
    },
    instrument: {
      title: "The Restoration Mat",
      price: "from €200",
      unit: "once",
      rows: ["Yours to keep, no subscription", "Twenty minutes, at home, rolled out", "Used as often as you like"],
    },
    benchmark: {
      title: "Versus the premium US mats",
      body: "Premium US infrared mats retail around €800 and up and ship from overseas. The Restoration Mat pairs 660nm red light with far-infrared heat, rolls flat to store, ships free within the EU, and is returnable to Rotterdam.",
      tag: "from €200 · EU support",
    },
  },

  social: {
    eyebrow: "In their own words",
    headline: "Founding customers",
    honesty: {
      headline: "We are new. We have six reviews.",
      body: "Not six hundred, and none of them for this instrument yet. We are not going to invent them. Below is what founding customers have said about Zential instruments on our public Trustpilot profile — copied exactly. Judge us on the methodology above, keep it thirty days, and send it back if we are wrong.",
      href: "https://nl.trustpilot.com/review/zentialpure.com",
      linkLabel: "Read them on Trustpilot →",
    },
    quotes: [
      { text: "The difference between other devices and this one is just huge. The quality is really there.", name: "Jennarosa", meta: "Netherlands · Trustpilot, verified" },
      { text: "The instructions where clear and the customer service answered my questions within hours. will order the Eye Activator next.", name: "Miguel Lam", meta: "Cura\u00e7ao · Trustpilot, verified" },
      { text: "first I was a bit sceptical, about improving my skin. Fortunately, the devices really worked well.", name: "Daan Mossel", meta: "Netherlands · Trustpilot, verified" },
    ],
  },

  ritual: {
    eyebrow: "What your evening looks like",
    headline: "The ritual, in three steps.",
    steps: [
      { index: "One", title: "Roll it out", body: "Unroll the mat on a bed or the floor, wherever you can lie flat. It warms through within a couple of minutes.", image: matRitual1, alt: "The Restoration Mat half unrolled across the bed, its red light coming on." },
      { index: "Two", title: "Twenty minutes", body: "Lie back in the light and far-infrared heat. A deep, even warmth spreads; most people feel themselves slow down.", image: matRitual2, alt: "The glowing surface of the Restoration Mat up close, a cup of tea on the nightstand." },
      { index: "Three", title: "Kept up", body: "Most evenings, or after a hard day, it becomes the twenty minutes the whole body waits for.", image: matRitual3, alt: "The mat rolled away at the foot of the bed in morning light, remote and towel beside it." },
    ],
    closing: "It is always a ritual, and always an instrument. Never a routine, never a gadget.",
  },

  faq: {
    eyebrow: "The things you are still wondering",
    headline: "Answered plainly.",
    items: [
      { q: "Will I feel anything?", a: "A deep, even warmth across the whole body and a soft glow of red light — most people find it deeply calming. If the heat feels too strong, step it down." },
      { q: "How is this different from an electric blanket?", a: "A blanket is only heat. The Restoration Mat adds 660nm red light and far-infrared warmth across its whole surface, is CE marked against EU standards, and is backed by a two-year warranty and a company you can look up in the Dutch register." },
      { q: "What if it doesn't work for me?", a: "Keep it thirty days. If it is not for you, send it back to Rotterdam for a full refund — any reason, no forms and no photos." },
      { q: "Is it safe?", a: "It is CE marked, independently assessed against EU safety standards for consumer electronics. Follow the protocol card for session length, and check with your doctor first if you are pregnant or have a condition affected by heat." },
      { q: "How long until I notice anything?", a: "It depends on consistency. This is light and warmth applied as a ritual, not an overnight fix. Users who keep to most evenings tend to report feeling looser and calmer over weeks — we promise no fixed timeline, because that would not be true." },
    ],
  },

  offer: {
    eyebrow: "A lie-down bed of red light and far-infrared heat.",
    headline: "The Restoration Mat",
    price: "from €200",
    priceNote: "From €200. Once, not per session. Free, tracked EU shipping.",
    inBoxTitle: "In the box",
    inBox: ["The Restoration Mat (rolls flat to store)", "Optional remote control (select variants)", "Power adapter and cable", "The twenty-minute protocol card"],
    guarantee: GUARANTEE,
    cta: "See the Restoration Mat",
    ctaNote: "Founding price carried to checkout · Free, tracked EU shipping · 30-day full refund",
    stickyLine: "from €200 · 30-day return",
    image: matOffer,
    alt: "The Restoration Mat, rolled and arranged on a warm surface.",
  },

  footer: FOOTER,
};

export const BRIDGE_CONFIGS: Record<string, BridgeConfig> = {
  "face-introducer": faceIntroducer,
  "restoration-belt": restorationBelt,
  "restoration-mat": restorationMat,
};

export function getBridgeConfig(slug: string | undefined): BridgeConfig | undefined {
  if (!slug) return undefined;
  return BRIDGE_CONFIGS[slug];
}
