/**
 * Customer social proof for the instrument PDPs, keyed by product slug.
 *
 * SINGLE SOURCE OF TRUTH — edit copy here, never in components.
 *
 * NOTHING IS FABRICATED. `testimonials` ships empty and `rating`/`reviewCount`
 * stay undefined until real Trustpilot data exists. While empty:
 *   - the hero rating badge does not render (no fake stars)
 *   - the proof section shows a tasteful "Founding reviews incoming" + a real
 *     Trustpilot link
 * Populate from the live Trustpilot profile when reviews are in.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Set true only for Trustpilot / verified-purchase reviews. */
  verified?: boolean;
}

export interface ProductSocialProof {
  /** 1–5, one decimal. Leave undefined until real. Drives the star badge. */
  rating?: number;
  /** Total review count behind the rating. Leave undefined until real. */
  reviewCount?: number;
  trustpilotUrl: string;
  testimonials: Testimonial[];
}

const TRUSTPILOT_URL = "https://nl.trustpilot.com/review/zentialpure.com";

export const SOCIAL_PROOF: Record<string, ProductSocialProof> = {
  "face-introducer": {
    trustpilotUrl: TRUSTPILOT_URL,
    // TODO: real reviews — populate from Trustpilot. No fake names in committed code.
    testimonials: [],
  },
  "restoration-belt": {
    trustpilotUrl: TRUSTPILOT_URL,
    // TODO: real reviews
    testimonials: [],
  },
  "restoration-mat": {
    trustpilotUrl: TRUSTPILOT_URL,
    // TODO: real reviews
    testimonials: [],
  },
};

export function getSocialProof(slug: string): ProductSocialProof {
  return SOCIAL_PROOF[slug] ?? { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] };
}
