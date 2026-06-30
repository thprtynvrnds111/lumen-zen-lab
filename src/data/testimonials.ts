/**
 * Customer social proof for the instrument PDPs, keyed by product slug.
 * SINGLE SOURCE OF TRUTH — edit copy here, never in components.
 *
 * Compliance line: testimonials stay within cosmetic / recovery framing —
 * appearance, comfort, ritual. No disease, pain-treatment, or guaranteed-
 * outcome language. Keep it that way when editing.
 *
 * 2026-06-29: Fabricated pre-launch reviews + ratings REMOVED (EU Omnibus /
 * fake-review rules + Meta ad policy). Leave `rating`/`reviewCount` undefined and
 * `testimonials` empty until REAL reviews exist. instrumentproof.tsx renders an
 * honest "reviews incoming" state while empty. To go live with real proof, either
 * paste verified reviews here OR embed the Trustpilot TrustBox widget
 * (see components/zential/TrustBox.tsx) and remove this static block.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Shows a small "Verified" tag — only set true for genuinely verified reviews. */
  verified?: boolean;
}

export interface ProductSocialProof {
  /** 1–5, one decimal. Drives the star badge. Leave undefined until real. */
  rating?: number;
  /** Total review count behind the rating. Leave undefined until real. */
  reviewCount?: number;
  trustpilotUrl: string;
  testimonials: Testimonial[];
}

const TRUSTPILOT_URL = "https://nl.trustpilot.com/review/zentialpure.com";

// Empty until real reviews are wired. No fabricated ratings / counts / names.
export const SOCIAL_PROOF: Record<string, ProductSocialProof> = {
  "face-introducer": { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] },
  "restoration-belt": { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] },
  "restoration-mat": { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] },
};

export function getSocialProof(slug: string): ProductSocialProof {
  return SOCIAL_PROOF[slug] ?? { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] };
}
