/**
 * Journal hub data — 1a "The Ritual Journal" (/editorial) and
 * 1b "The Clinical Issue" (/editorial/clinical-issue).
 *
 * Copy is VERBATIM from the design handoff (Zential Pure Journal,
 * handoff-src/1a + 1b). The handoff articles point at journal entries that are
 * not built yet; each card's `link` is remapped to the closest LIVE page —
 * the same mapping journalCards.ts uses — and the intended URL is preserved
 * in `plannedPage` for when those articles ship.
 */

import { C_ADHERENCE, C_MICROCURRENT, C_REDLIGHT, type Citation } from "../citations";

export type HubTopic = "Mechanism" | "Ritual" | "Evidence" | "Skin";

export const HUB_FILTERS = ["All", "Mechanism", "Ritual", "Evidence", "Skin"] as const;
export type HubFilter = (typeof HUB_FILTERS)[number];

export interface HubArticle {
  img: string;
  imgAlt: string;
  topic: HubTopic;
  read: string;
  title: string;
  dek: string;
  link: string;
  plannedPage?: string;
}

export const HUB_ARTICLES: HubArticle[] = [
  {
    img: "/editorial/morning-mug.webp",
    imgAlt: "Ceramic mug in low warm morning window light",
    topic: "Ritual",
    read: "6 min",
    title: "The 12-minute window",
    dek: "Why the protocol is calibrated to twelve minutes, and what happens in tissue when you stop at eleven.",
    link: "/editorial/the-ritual",
    plannedPage: "/journal/the-12-minute-window",
  },
  {
    img: "/editorial/pour-water.webp",
    imgAlt: "Water being poured into a glass in soft light",
    topic: "Mechanism",
    read: "8 min",
    title: "Microcurrent needs moisture",
    dek: "Conductivity is chemistry. What a conductive gel actually does, and why water alone underperforms.",
    link: "/journal/microcurrent-collagen",
    plannedPage: "/journal/microcurrent-needs-moisture",
  },
  {
    img: "/editorial/waking-hand.webp",
    imgAlt: "A waking hand in soft diffuse light on bed linen",
    topic: "Mechanism",
    read: "7 min",
    title: "What happens at 630 nanometres",
    dek: "Red light explained at the level of the mitochondrion. The wavelength, the dose, the study.",
    link: "/editorial/the-science",
    plannedPage: "/journal/what-happens-at-630-nanometres",
  },
  {
    img: "/editorial/three-vessels.webp",
    imgAlt: "Three ceramic vessels in warm natural light",
    topic: "Evidence",
    read: "9 min",
    title: "Read a label like a chemist",
    dek: "A working method for cross-referencing ingredient claims against the papers they cite.",
    link: "/editorial/the-science",
    plannedPage: "/journal/read-a-label-like-a-chemist",
  },
  {
    img: "/editorial/seated-calm.webp",
    imgAlt: "Seated figure in calm natural side light",
    topic: "Ritual",
    read: "5 min",
    title: "Consistency beats intensity",
    dek: "The clinic delivers peaks. The instrument delivers frequency. Which one your skin remembers.",
    link: "/journal/ritual-that-lasts",
    plannedPage: "/journal/consistency-beats-intensity",
  },
  {
    img: "/editorial/walk-stone.webp",
    imgAlt: "Morning walk on stone in muted light",
    topic: "Skin",
    read: "6 min",
    title: "Recovery is a skin strategy",
    dek: "Sleep, circulation and cortisol set the ceiling on any protocol. The physiology, briefly.",
    link: "/journal/lymphatic-drainage",
    plannedPage: "/journal/recovery-is-a-skin-strategy",
  },
  {
    img: "/editorial/threshold.webp",
    imgAlt: "A doorway threshold in warm natural light",
    topic: "Evidence",
    read: "10 min",
    title: "The clinic dropout's guide",
    dek: "What professional microcurrent costs per session, what it delivers, and where home output now stands.",
    link: "/editorial/the-diagnosis",
    plannedPage: "/journal/the-clinic-dropouts-guide",
  },
];

export interface HubModality {
  n: string;
  name: string;
  mech: string;
  benefit: string;
}

export const HUB_MODALITIES: HubModality[] = [
  {
    n: "01",
    name: "EMS",
    mech: "Pulsed stimulation recruits facial muscle fibres the way resistance recruits skeletal muscle.",
    benefit: "Supports tone along the jaw and cheek with consistent use.",
  },
  {
    n: "02",
    name: "Microcurrent",
    mech: "Sub-sensory current in the microampere range, the same order as the body's own bioelectric signalling.",
    benefit: "Supports firmness. Studied since 1982, cited on every claim.",
  },
  {
    n: "03",
    name: "Thermal",
    mech: "Controlled warmth increases local circulation and softens the stratum corneum.",
    benefit: "Visibly improves how actives absorb, per session.",
  },
  {
    n: "04",
    name: "LED 630-660nm",
    mech: "Red wavelengths reach the dermis and act on mitochondrial cytochrome c oxidase.",
    benefit: "Supports collagen density with daily exposure.",
  },
];

/**
 * The evidence rail. Formerly three invented "clinicians" with stock portraits —
 * removed 2026-07-12. What a reader gets instead is the paper itself, what it
 * found, and what it does not show. See ../citations.ts.
 */
export const HUB_CITATIONS: Citation[] = [C_REDLIGHT, C_MICROCURRENT, C_ADHERENCE];

/** 1b cover index strip. */
export const ISSUE_INDEX = [
  { n: "i.", t: "Current" },
  { n: "ii.", t: "Light" },
  { n: "iii.", t: "Heat" },
  { n: "iv.", t: "Adherence" },
] as const;
