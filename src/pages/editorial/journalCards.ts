/**
 * Journal Pin Board — card inventory for the /journal hub.
 *
 * Combines three sources into one ordered masonry (see task-6c):
 *   1. The 14 handoff pins from design-reference/editorial/pinboard-cards.json
 *      (copy VERBATIM). Their handoff `source-page` values point at articles that
 *      were never built; each is remapped here to the closest LIVE page and the
 *      original is preserved in `plannedPage` for when those articles ship.
 *   2. Three cards for the live /editorial/* pages (headline = page headline,
 *      body = page deck).
 *   3. The 7 existing /journal/* articles, rendered as text pins.
 *
 * No card links anywhere that is not a real route (see VALID_CARD_LINKS).
 */

export type CardCategory = "Mechanism" | "Ritual" | "Evidence" | "Experts" | "Skin";

/** Board filter chips, in display order. "All" shows every card. */
export const FILTERS = ["All", "Mechanism", "Ritual", "Evidence", "Experts"] as const;
export type Filter = (typeof FILTERS)[number];

/**
 * Every live path a card may link to. The hub must produce no dead links, so the
 * card inventory is asserted against this list in journalHub.test.tsx.
 * These mirror the registered routes in App.tsx (three /editorial/* pages and the
 * seven /journal/* article detail pages — the hub itself is excluded).
 */
export const VALID_CARD_LINKS = [
  "/editorial/the-ritual",
  "/editorial/the-science",
  "/editorial/the-diagnosis",
  "/journal/frequency-shift",
  "/journal/microcurrent-collagen",
  "/journal/evening-protocol",
  "/journal/red-light-clinical",
  "/journal/lymphatic-drainage",
  "/journal/ems-vs-microcurrent",
  "/journal/ritual-that-lasts",
] as const;

interface BaseCard {
  id: string;
  category: CardCategory;
  /** Original handoff source-page for pins whose real article is not built yet. */
  plannedPage?: string;
}

export interface ImageCard extends BaseCard {
  kind: "image";
  headline: string;
  body: string;
  image: string;
  imgAlt: string;
  imgH: string;
  link: string;
}

export interface TextCard extends BaseCard {
  kind: "text";
  headline: string;
  body: string;
  meta: string;
  link: string;
}

export interface QuoteCard extends BaseCard {
  kind: "quote";
  quote: string;
  name: string;
  role: string;
  image: string;
  link: string;
}

export interface FactCard extends BaseCard {
  kind: "fact";
  stat: string;
  body: string;
  link: string;
}

export interface NewsletterCard extends BaseCard {
  kind: "newsletter";
}

export type JournalCard = ImageCard | TextCard | QuoteCard | FactCard | NewsletterCard;

/**
 * Pinterest save-intent for a card. Plain link — no SDK, no script.
 * The board itself (and every image/stat/quote pin) is savable this way.
 */
export function pinterestSaveHref(link: string, description: string): string {
  const url = `https://zentialpure.com${link}`;
  return `https://www.pinterest.com/pin/create/button/?url=${url}&description=${encodeURIComponent(
    description,
  )}`;
}

// Alternating pin-image heights, taken from the 1c reference (320 / 230 / 280).
const H = ["320px", "230px", "280px"];

/**
 * The board, in masonry order. Handoff pins keep their JSON copy verbatim; the
 * three editorial destination cards and seven legacy article pins are woven in
 * for category spread and rhythm. `imgH` cycles the reference heights across the
 * image-bearing pins in array order.
 */
export const JOURNAL_CARDS: JournalCard[] = [
  // 1 — editorial: The Diagnosis (the "why")
  {
    kind: "image",
    id: "ed-diagnosis",
    category: "Mechanism",
    headline: "Why your skin stopped listening.",
    body: "Twelve products on the shelf and the same face in the mirror. The problem is not the ingredients. It is the signal.",
    image: "/editorial/hero-face-introducer.webp",
    imgAlt: "Face Introducer instrument in warm light",
    imgH: H[0],
    link: "/editorial/the-diagnosis",
  },
  // 2 — handoff fact: €3.40 (clinic economics → the clinic-dropout page)
  {
    kind: "fact",
    id: "h-eur340",
    category: "Evidence",
    stat: "€3.40",
    body: "Cost per session over one year of daily use. A single clinic microcurrent visit averages €180.",
    link: "/editorial/the-diagnosis",
    plannedPage: "/journal/the-clinic-dropouts-guide",
  },
  // 3 — editorial: The Ritual (distinct image to avoid twinning the 12-min pin)
  {
    kind: "image",
    id: "ed-ritual",
    category: "Ritual",
    headline: "Ten quiet minutes.",
    body: "Before the phone, before the noise. A warm instrument, a chair by the window, and nothing else on the schedule.",
    image: "/editorial/brand-story.webp",
    imgAlt: "A calm morning interior",
    imgH: H[1],
    link: "/editorial/the-ritual",
  },
  // 4 — handoff quote: Dr. Amara Osei
  {
    kind: "quote",
    id: "h-osei",
    category: "Experts",
    quote:
      "The honest claim for home microcurrent is frequency. Daily, correctly dosed stimulation is something no monthly clinic visit can replicate.",
    name: "Dr. Amara Osei",
    role: "Clinical dermatology, Berlin",
    image: "/editorial/people/expert-1.webp",
    link: "/editorial/the-diagnosis",
    plannedPage: "/experts/amara-osei",
  },
  // 5 — handoff image: 630 nanometres
  {
    kind: "image",
    id: "h-630nm",
    category: "Mechanism",
    headline: "What happens at 630 nanometres",
    body: "Cosmetic LED explained at the level of the mitochondrion. The wavelength, the dose, the study.",
    image: "/editorial/waking-hand.webp",
    imgAlt: "A hand in soft morning light",
    imgH: H[2],
    link: "/editorial/the-science",
    plannedPage: "/journal/what-happens-at-630-nanometres",
  },
  // 6 — inline newsletter pin
  {
    kind: "newsletter",
    id: "nl-inline",
    category: "Ritual",
  },
  // 7 — editorial: The Science
  {
    kind: "image",
    id: "ed-science",
    category: "Evidence",
    headline: "What 660nm actually does.",
    body: "A short, annotated reading of the published research on red light and skin tissue. Mechanism first. Claims last, if at all.",
    image: "/editorial/hero-redlight-belt.webp",
    imgAlt: "Restoration Belt, edge glow and side control unit",
    imgH: H[0],
    link: "/editorial/the-science",
  },
  // 8 — handoff fact: 630nm
  {
    kind: "fact",
    id: "h-630nm-fact",
    category: "Mechanism",
    stat: "630nm",
    body: "The red wavelength window where dermal penetration and mitochondrial response overlap.",
    link: "/editorial/the-science",
    plannedPage: "/journal/what-happens-at-630-nanometres",
  },
  // 9 — legacy: Microcurrent Rebuilds Collagen
  {
    kind: "text",
    id: "l-collagen",
    category: "Mechanism",
    headline: "How Microcurrent Rebuilds Collagen",
    body: "Understanding the biophysics behind electrical stimulation and its effects on fibroblast activity, ATP production, and dermal remodeling.",
    meta: "Science · 8 min read",
    link: "/journal/microcurrent-collagen",
  },
  // 10 — handoff image: The 12-minute window
  {
    kind: "image",
    id: "h-12min-window",
    category: "Ritual",
    headline: "The 12-minute window",
    body: "Why the protocol is calibrated to twelve minutes, and what happens in tissue when you stop at eleven.",
    image: "/editorial/morning-mug.webp",
    imgAlt: "Morning light on a ceramic mug",
    imgH: H[1],
    link: "/editorial/the-ritual",
    plannedPage: "/journal/the-12-minute-window",
  },
  // 11 — handoff quote: Dr. Elena Vasquez
  {
    kind: "quote",
    id: "h-vasquez",
    category: "Experts",
    quote:
      "At 630 to 660 nanometres the literature is genuinely strong. The variable that decides outcomes is not the device. It is adherence.",
    name: "Dr. Elena Vasquez",
    role: "Photobiomodulation researcher",
    image: "/editorial/people/expert-2.webp",
    link: "/editorial/the-science",
    plannedPage: "/experts/elena-vasquez",
  },
  // 12 — handoff image: Microcurrent needs moisture
  {
    kind: "image",
    id: "h-moisture",
    category: "Mechanism",
    headline: "Microcurrent needs moisture",
    body: "Conductivity is chemistry. What a conductive gel actually does, and why water alone underperforms.",
    image: "/editorial/pour-water.webp",
    imgAlt: "Water poured in soft light",
    imgH: H[2],
    link: "/journal/microcurrent-collagen",
    plannedPage: "/journal/microcurrent-needs-moisture",
  },
  // 13 — legacy: 660nm Red Light data
  {
    kind: "text",
    id: "l-redlight",
    category: "Evidence",
    headline: "660nm Red Light: What the Data Shows",
    body: "A transparent review of peer-reviewed studies on red light therapy for skin rejuvenation, wound healing, and inflammation.",
    meta: "Research · 10 min read",
    link: "/journal/red-light-clinical",
  },
  // 14 — handoff image: Consistency beats intensity
  {
    kind: "image",
    id: "h-consistency",
    category: "Ritual",
    headline: "Consistency beats intensity",
    body: "The clinic delivers peaks. The instrument delivers frequency. Which one your skin remembers.",
    image: "/editorial/seated-calm.webp",
    imgAlt: "Seated figure in calm light",
    imgH: H[0],
    link: "/journal/ritual-that-lasts",
    plannedPage: "/journal/consistency-beats-intensity",
  },
  // 15 — handoff fact: 12 min
  {
    kind: "fact",
    id: "h-12min-fact",
    category: "Ritual",
    stat: "12 min",
    body: "The full four-modality sequence. Calibrated so it survives contact with a real morning.",
    link: "/editorial/the-ritual",
    plannedPage: "/journal/the-12-minute-window",
  },
  // 16 — legacy: The Night My Frequency Shifted
  {
    kind: "text",
    id: "l-frequency",
    category: "Ritual",
    headline: "The Night My Frequency Shifted",
    body: "A sacred reflection on what happens when microcurrent becomes more than skincare, when it becomes a conversation with the nervous system, a vote for slowness, and a return to self-trust.",
    meta: "Ritual · 12 min read",
    link: "/journal/frequency-shift",
  },
  // 17 — handoff image: Read a label like a chemist
  {
    kind: "image",
    id: "h-label",
    category: "Evidence",
    headline: "Read a label like a chemist",
    body: "A working method for cross-referencing ingredient claims against the papers they cite.",
    image: "/editorial/three-vessels.webp",
    imgAlt: "Three vessels on a surface",
    imgH: H[1],
    link: "/editorial/the-science",
    plannedPage: "/journal/read-a-label-like-a-chemist",
  },
  // 18 — handoff quote: Maren Holt
  {
    kind: "quote",
    id: "h-holt",
    category: "Experts",
    quote:
      "I stopped selling single treatments. Tissue responds to sequence, not to events. Twelve minutes a day outperforms an hour a month.",
    name: "Maren Holt",
    role: "Medical aesthetician, 14 yrs clinical",
    image: "/editorial/people/expert-3.webp",
    link: "/editorial/the-ritual",
    plannedPage: "/experts/maren-holt",
  },
  // 19 — legacy: EMS vs. Microcurrent
  {
    kind: "text",
    id: "l-ems",
    category: "Mechanism",
    headline: "EMS vs. Microcurrent",
    body: "Not all electrical stimulation is equal. A clinical breakdown of frequency ranges, muscle response types, and ideal use cases.",
    meta: "Science · 7 min read",
    link: "/journal/ems-vs-microcurrent",
  },
  // 20 — handoff image: Recovery is a skin strategy (category Skin — All-only, per 1c)
  {
    kind: "image",
    id: "h-recovery",
    category: "Skin",
    headline: "Recovery is a skin strategy",
    body: "Sleep, circulation and cortisol set the ceiling on any protocol. The physiology, briefly.",
    image: "/editorial/walk-stone.webp",
    imgAlt: "A walk over stone in muted light",
    imgH: H[2],
    link: "/journal/lymphatic-drainage",
    plannedPage: "/journal/recovery-is-a-skin-strategy",
  },
  // 21 — legacy: The 5-Minute Evening Protocol
  {
    kind: "text",
    id: "l-evening",
    category: "Ritual",
    headline: "The 5-Minute Evening Protocol",
    body: "A structured guide to integrating microcurrent into your nightly wind-down. Designed for consistency, not perfection.",
    meta: "Ritual · 5 min read",
    link: "/journal/evening-protocol",
  },
  // 22 — handoff image: The clinic dropout's guide
  {
    kind: "image",
    id: "h-dropout",
    category: "Evidence",
    headline: "The clinic dropout's guide",
    body: "What professional microcurrent costs per session, what it delivers, and where home output now stands.",
    image: "/editorial/threshold.webp",
    imgAlt: "A threshold in warm light",
    imgH: H[0],
    link: "/editorial/the-diagnosis",
    plannedPage: "/journal/the-clinic-dropouts-guide",
  },
  // 23 — legacy: Lymphatic Drainage and Facial Sculpting
  {
    kind: "text",
    id: "l-lymphatic",
    category: "Mechanism",
    headline: "Lymphatic Drainage and Facial Sculpting",
    body: "Why gentle electrical stimulation supports the body's natural detoxification pathways.",
    meta: "Wellness · 6 min read",
    link: "/journal/lymphatic-drainage",
  },
  // 24 — legacy: Building a Skin Ritual That Lasts
  {
    kind: "text",
    id: "l-lasts",
    category: "Ritual",
    headline: "Building a Skin Ritual That Lasts",
    body: "Consistency over intensity. How to design a personal protocol that adapts to your life, without burnout or guilt.",
    meta: "Ritual · 4 min read",
    link: "/journal/ritual-that-lasts",
  },
];
