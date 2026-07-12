/**
 * Verified citations — the evidence spine of the Journal.
 *
 * RULE: every entry here is a real, published paper whose PubMed record was loaded
 * and read before it was added. `quote` is VERBATIM from the paper's abstract (or
 * from the named peer-reviewed review that restates it, see `quoteSource`).
 * `limit` is what the paper does NOT show — it is not optional, and it is not
 * marketing softening. It is the reason this page is worth trusting.
 *
 * Nothing on this site attributes words to a person who did not publish them.
 * There are no personas, no stock-photo "clinicians", and no invented advisors.
 * If a claim cannot carry a PMID, it does not go on a card.
 *
 * Verified 2026-07-12 against pubmed.ncbi.nlm.nih.gov.
 */

export interface Citation {
  id: string;
  /** Verbatim sentence from the abstract (or from `quoteSource` when set). */
  quote: string;
  /** Author line as printed, e.g. "Wunsch & Matuschka". */
  authors: string;
  /** Journal, volume, year. */
  journal: string;
  year: number;
  pmid: string;
  /** Study design in one honest line — human/animal, n, duration. */
  design: string;
  /** What the paper does NOT establish. Always rendered. Never omitted. */
  limit: string;
  /** Set when the verbatim quote is restated by a later review rather than the original. */
  quoteSource?: string;
  /** Disclosure we volunteer before a critic finds it. */
  disclosure?: string;
}

export const pubmedHref = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

/** Red light → measured collagen density. The strongest human trial in the band we use. */
export const C_REDLIGHT: Citation = {
  id: "wunsch-2014",
  quote:
    "The treated subjects experienced significantly improved skin complexion and skin feeling, profilometrically assessed skin roughness, and ultrasonographically measured collagen density.",
  authors: "Wunsch & Matuschka",
  journal: "Photomedicine and Laser Surgery 32(2)",
  year: 2014,
  pmid: "24286286",
  design: "Controlled human trial · 128 completers · 30 sessions over ~15 weeks · 611–650nm",
  limit:
    "It did not test our instruments. It tested a clinic-grade light source in the same wavelength band — the band is the shared fact, not the result. And it does not show permanence: the authors state the long-term effect still has to be evaluated, and almost no one was followed past 15 weeks.",
  disclosure:
    "Disclosed in the paper: the principal investigator was paid by the light-source manufacturer. We are telling you because it is true, not because it is flattering.",
};

/** Red light → wrinkles, split-face, with biopsies. The hardest design to fake. */
export const C_SPLITFACE: Citation = {
  id: "lee-2007",
  quote:
    "Significant reductions of wrinkles (maximum: 36%) and increases of skin elasticity … Histology showed increased amounts of collagen and elastic fibres.",
  authors: "Lee et al.",
  journal: "Journal of Photochemistry and Photobiology B 88(1)",
  year: 2007,
  pmid: "17566756",
  design: "Randomised, double-blind, placebo-controlled split-face study · n=76 · 633nm / 830nm",
  limit:
    "36% was the maximum wrinkle reduction, not the typical one — quoting it as an average would be dishonest. Four weeks of treatment, with clinic-grade panels. It was not a test of our instruments.",
};

/** Microcurrent → ATP. The most misquoted paper in the beauty-device industry. */
export const C_MICROCURRENT: Citation = {
  id: "cheng-1982",
  quote:
    "The application of MCT on rat skin, using currents from 50 µA to 1000 µA, significantly increased ATP by between three and five-fold … ATP concentration levelled with currents exceeding 1000 µA, and decreased with currents of 5000 µA.",
  authors: "Cheng et al.",
  journal: "Clinical Orthopaedics and Related Research 171",
  year: 1982,
  pmid: "7140077",
  quoteSource:
    "Numbers as restated in the peer-reviewed review by Kolimechkov et al., European Journal of Applied Physiology, 2022 (PMC9941239).",
  design: "Rat skin, ex vivo · direct current 10–1000 µA · not human, not a face",
  limit:
    "This is rat skin in a dish. It shows a change in cellular energy — not a wrinkle, not a lift, not any outcome you can see in a mirror. Every brand that cites it as proof their device lifts your face is over-reading a 1982 orthopaedics paper. And note the half nobody quotes: past 1000 µA the effect stops, and at 5000 µA it goes backwards. More current is not more result. That is why the output is meant to sit below what you can feel.",
};

/** Adherence → outcome. The variable that is actually you. */
export const C_ADHERENCE: Citation = {
  id: "carroll-2004",
  quote:
    "A decrease in adherence rate of 10% was associated with a 1-point increase in severity … Nonadherence may have a significant role in altering clinical trial data, skewing it towards ineffectiveness.",
  authors: "Carroll et al.",
  journal: "British Journal of Dermatology 151(4)",
  year: 2004,
  pmid: "15491434",
  design:
    "n=24 · 8 weeks · adherence measured by an electronic cap on the tube, not by asking people",
  limit:
    "This was a prescription topical in a medical condition — nothing to do with what these instruments are for, and Zential instruments do not treat any condition. Take the principle, not the number. The principle: when researchers stop trusting what people say they did and put a counter on the lid, skipped days show up in the result. A companion study (Storm et al., JAAD 2008) found patients used a median 35% of the expected dose. The device is rarely the variable. You are.",
};

/** Dose is biphasic. The honest ceiling on the whole category. */
export const C_DOSE: Citation = {
  id: "huang-2009",
  quote:
    "A biphasic dose response has been frequently observed where low levels of light have a much better effect on stimulating and repairing tissues than higher levels of light.",
  authors: "Huang, Chen, Carroll & Hamblin",
  journal: "Dose-Response 7(4)",
  year: 2009,
  pmid: "20011653",
  design: "Mechanistic review of the light-dose literature",
  limit:
    "A review, not a trial. It does not tell you the optimal dose for any one device or any one face — only that 'more' stops helping and then starts hurting.",
};

/** EMS → facial muscle, measured by blinded ultrasound. */
export const C_EMS: Citation = {
  id: "kavanagh-2012",
  quote:
    "Mean muscle thickness increased vs. baseline in the NMES group (18.6%) but not the control group … ≥80% of NMES users reported improved firmness, tone and lift.",
  authors: "Kavanagh et al.",
  journal: "Journal of Cosmetic Dermatology 11(4)",
  year: 2012,
  pmid: "23174048",
  design:
    "Randomised controlled trial · n=108 women · 20 min/day, 5 days/week, 12 weeks · assessor-blinded ultrasound",
  limit:
    "It tested a different commercial device, not ours — EMS is the shared mechanism, not the outcome. The control group received no device at all, so the 'firmness' ratings are wide open to expectation. Thicker muscle is not better skin. And read the protocol before the result: daily, five days a week, for three months.",
};

export const ALL_CITATIONS: Citation[] = [
  C_REDLIGHT,
  C_SPLITFACE,
  C_MICROCURRENT,
  C_ADHERENCE,
  C_DOSE,
  C_EMS,
];
