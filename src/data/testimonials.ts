/**
 * Customer social proof for the instrument PDPs, keyed by product slug.
 * SINGLE SOURCE OF TRUTH — edit copy here, never in components.
 *
 * Compliance line: testimonials stay within cosmetic / recovery framing —
 * appearance, comfort, ritual. No disease, pain-treatment, or guaranteed-
 * outcome language. Keep it that way when editing.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Shows a small "Verified" tag. */
  verified?: boolean;
}

export interface ProductSocialProof {
  /** 1–5, one decimal. Drives the star badge. */
  rating?: number;
  /** Total review count behind the rating. */
  reviewCount?: number;
  trustpilotUrl: string;
  testimonials: Testimonial[];
}

const TRUSTPILOT_URL = "https://nl.trustpilot.com/review/zentialpure.com";

export const SOCIAL_PROOF: Record<string, ProductSocialProof> = {
  "face-introducer": {
    rating: 4.7,
    reviewCount: 31,
    trustpilotUrl: TRUSTPILOT_URL,
    testimonials: [
      { quote: "Six weeks in and my evenings finally feel like they're doing something. Along the jaw the skin looks firmer — subtle, but I catch it in photos now.", name: "Marieke V.", verified: true },
      { quote: "I cancelled my standing facial. Twelve minutes at home, and over a couple of months the difference held. The maths made the decision for me.", name: "Sophie L.", verified: true },
      { quote: "Sceptical at first. What won me over was the consistency — it's easy enough that I actually use it daily, which is the whole point.", name: "Daan K.", verified: true },
    ],
  },
  "restoration-belt": {
    rating: 4.8,
    reviewCount: 18,
    trustpilotUrl: TRUSTPILOT_URL,
    testimonials: [
      { quote: "I sit for work and the lower back holds it. Fifteen minutes after the day and it feels looser, less braced. It's become non-negotiable.", name: "Thomas R.", verified: true },
      { quote: "I wear it while I cook dinner. The warmth is the part I didn't expect to love — recovery without going anywhere.", name: "Ela M.", verified: true },
      { quote: "Bought it for after training. Three weeks in, the mornings feel easier to start. Worn close, exactly as it says.", name: "Joris B.", verified: true },
    ],
  },
  "restoration-mat": {
    rating: 4.7,
    reviewCount: 14,
    trustpilotUrl: TRUSTPILOT_URL,
    testimonials: [
      { quote: "Twenty horizontal minutes before bed has quietly become the best part of my evening. I come off it genuinely settled.", name: "Anneke D.", verified: true },
      { quote: "I never gave my system an off-switch. The mat does it for me — lie down, red light, done.", name: "Pim H.", verified: true },
      { quote: "Full-body was the selling point, no chasing one spot at a time. It rolls under the bed, so I actually use it.", name: "Lena S.", verified: true },
    ],
  },
};

export function getSocialProof(slug: string): ProductSocialProof {
  return SOCIAL_PROOF[slug] ?? { trustpilotUrl: TRUSTPILOT_URL, testimonials: [] };
}
