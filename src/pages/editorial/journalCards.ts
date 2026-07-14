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
 *
 * 2026-07-12 — the three "expert" quote pins were fabricated personas illustrated
 * with stock portraits (one of which was a photo of a man captioned with a woman's
 * name). They are gone. Evidence pins now carry real published papers from
 * ./citations.ts, each with its PMID and its stated limit. See that file's header.
 */

import { C_ADHERENCE, C_MICROCURRENT, C_REDLIGHT, type Citation } from "./citations";

export type CardCategory = "Mechanism" | "Ritual" | "Evidence" | "Sources" | "Skin";

/** Board filter chips, in display order. "All" shows every card. */
export const FILTERS = ["All", "Mechanism", "Ritual", "Evidence", "Sources"] as const;
export type Filter = (typeof FILTERS)[number];

/**
 * Every live path a card may link to. The hub must produce no dead links, so the
 * card inventory is asserted against this list in journalHub.test.tsx.
 * These mirror the registered routes in App.tsx (three /editorial/* pages and the
 * seven /journal/* article detail pages — the hub itself is excluded).
 */
export const VALID_CARD_LINKS = [
  "/breath",
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

/**
 * A published paper, rendered as a pin. There is no `name`/`image` pair here on
 * purpose: this site does not put a stock-photo face next to a researcher's name.
 * The card carries the paper, the design, the honest limit, and a PMID the reader
 * can check for themselves.
 */
export interface CitationCard extends BaseCard {
  kind: "citation";
  citation: Citation;
  /** The one thing a reader should walk away knowing. */
  takeaway: string;
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

export type JournalCard = ImageCard | TextCard | CitationCard | FactCard | NewsletterCard;

/**
 * Pinterest save-intent for a card. Plain link — no SDK, no script.
 * The board itself (and every image/stat/quote pin) is savable this way.
 */
export function pinterestSaveHref(link: string, description: string): string {
  const url = `https://zentialpure.com${link}`;
  return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    url,
  )}&description=${encodeURIComponent(description)}`;
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
    image: "/editorial/skin-jawline.webp",
    imgAlt: "Aged jawline and neck skin in warm morning light",
    imgH: H[0],
    link: "/editorial/the-diagnosis",
  },
  // 1b — the Breath practice (free interactive tool; the journey's habit loop)
  {
    kind: "text",
    id: "breath-app",
    category: "Ritual",
    headline: "The Breath.",
    body: "Three practices — observe, synchronize, release — calibrated to the same return. Free, in the browser. No signup.",
    meta: "THE PRACTICE · INTERACTIVE",
    link: "/breath",
  },
  // 2 — fact: clinic economics. Corrected 2026-07-12 — the old card said "€3.40 …
  // over one year of daily use", which is €88÷26, not €88÷365. The honest number is
  // stronger anyway. Clinic figure is the €90–€180 range from customer research, not
  // an invented "€180 average".
  {
    kind: "fact",
    id: "h-eur024",
    category: "Evidence",
    stat: "€0.24",
    body: "The Face Introducer is €88, once. Used daily for a year, that is 24 cents a session. A single clinic microcurrent session runs €90–€180 — and you rebook it every month.",
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
    image: "/editorial/ritual-hands.webp",
    imgAlt: "Aged hands cradling a warm ceramic mug in morning light",
    imgH: H[1],
    link: "/editorial/the-ritual",
  },
  // 4 — citation: microcurrent → ATP (Cheng 1982). The industry's favourite paper,
  // quoted with the half the industry leaves out.
  {
    kind: "citation",
    id: "c-microcurrent",
    category: "Sources",
    citation: C_MICROCURRENT,
    takeaway:
      "Every microcurrent brand cites this paper for “500% more ATP”. None of them quote the next finding: past 1000 µA the effect stops, and at 5000 µA it reverses. More current is not more result.",
    link: "/journal/microcurrent-collagen",
  },
  // 5 — handoff image: 630 nanometres
  {
    kind: "image",
    id: "h-630nm",
    category: "Mechanism",
    headline: "What happens at 630 nanometres",
    body: "Cosmetic LED explained at the level of the mitochondrion. The wavelength, the dose, the study.",
    image: "/editorial/red-630-skin.webp",
    imgAlt: "Forearm skin bathed in deep red LED light",
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
  // 11 — citation: red light → collagen density (Wunsch 2014), sponsor disclosure and all.
  {
    kind: "citation",
    id: "c-redlight",
    category: "Sources",
    citation: C_REDLIGHT,
    takeaway:
      "128 people, 30 sessions, red light in the same band the instruments use — and collagen density rose on the ultrasound, not just in the mirror. Then read the disclosure line. We publish that too.",
    link: "/editorial/the-science",
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
  // 18 — citation: adherence decides the outcome (Carroll 2004). The device is not the variable.
  {
    kind: "citation",
    id: "c-adherence",
    category: "Sources",
    citation: C_ADHERENCE,
    takeaway:
      "When researchers stopped asking people whether they used the treatment and put an electronic counter on the lid, the answer was blunt: every 10% of days skipped cost visible ground. Most people used about a third of the dose they thought they did.",
    link: "/editorial/the-ritual",
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
    image: "/editorial/skin-forearm.webp",
    imgAlt: "Forearm skin with honest sun-weathered texture in raking light",
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
