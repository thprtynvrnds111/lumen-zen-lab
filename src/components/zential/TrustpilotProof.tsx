/**
 * TrustpilotProof — one quiet line of social proof, rendered as STATIC text.
 *
 * Deliberately does NOT use the Trustpilot TrustBox script (widget.trustpilot.com):
 * it costs CSP surface + a request-blocking third party that would threaten the
 * Lighthouse-90 floor. The score/count below are real numbers, hand-verified, and
 * rendered as plain text per the brand authenticity floor — never a live widget,
 * never a fabricated figure.
 *
 * Single file by design: the whole widget (both placements) is removable in one
 * commit if the 30-day kill criteria fire (action1-human-reality-checklist.md §1a).
 *
 * Count verified 2026-07-24 (7th review landed); score last verified 2026-07-11
 * from https://www.trustpilot.com/review/zentialpure.com.
 * UPDATE these two numbers on review milestones — they are the only source here.
 */
const TRUSTPILOT = {
  score: "4.4",
  reviewCount: 7,
  url: "https://www.trustpilot.com/review/zentialpure.com",
} as const;

/** Single teal star glyph — matches the SVG star path used across the PDPs. */
function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" className="block shrink-0" aria-hidden="true">
      <path
        d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 15.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86z"
        fill="#157A5C"
      />
    </svg>
  );
}

/**
 * @param variant  "pdp" — under the price/CTA block on instrument pages.
 *                 "cart" — compact, next to the checkout hand-off.
 */
export function TrustpilotProof({
  variant = "pdp",
  className = "",
}: {
  variant?: "pdp" | "cart";
  className?: string;
}) {
  const size = variant === "cart" ? "text-[11px]" : "text-[12px]";
  return (
    <a
      href={TRUSTPILOT.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-sans ${size} text-[#1A1714] transition-colors hover:text-[#157A5C] ${className}`}
    >
      <Star />
      <span>
        <b className="font-semibold tabular-nums">{TRUSTPILOT.score}</b> on Trustpilot
        <span className="text-[#1A1714]/55"> · {TRUSTPILOT.reviewCount} reviews</span>
      </span>
    </a>
  );
}
