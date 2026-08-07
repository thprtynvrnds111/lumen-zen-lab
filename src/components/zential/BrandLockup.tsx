/**
 * BrandLockup — the unified Zential Pure logo (2026-08-07).
 *
 * Answers the designer note "icon + naam, niet een logo samen": the flower mark
 * is no longer a separate icon beside tracked text — it IS the tittle of the i
 * in "Zential", drawn over a dotless ı (U+0131, present in Switzer, verified in
 * Switzer-Semibold.woff2). One unit, one logo, scales with font-size.
 *
 * The visible text intentionally contains ı; screen readers and crawlers get
 * the correct spelling via the sr-only span, the visual is aria-hidden.
 */

const FLOWER_ROTATIONS = [0, 45, 90, 135] as const;

export function BrandLockup({
  size = 17,
  color = "#141414",
  flower = "#2ED8A8",
  className = "",
}: {
  /** Font size in px — every part of the lockup scales from it. */
  size?: number;
  color?: string;
  flower?: string;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "inline-block", lineHeight: 1 }}>
      <span className="sr-only">Zential Pure</span>
      <span
        aria-hidden
        style={{
          fontFamily: "'Switzer', 'DM Sans', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: size,
          letterSpacing: "0.01em",
          color,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Zent
        <span style={{ position: "relative", display: "inline-block" }}>
          ı
          <svg
            viewBox="0 0 100 100"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "0.02em",
              width: "0.30em",
              height: "0.30em",
            }}
          >
            <g transform="translate(50,50)">
              {FLOWER_ROTATIONS.map((r) => (
                <ellipse key={r} rx="20" ry="34" fill={flower} transform={`rotate(${r})`} />
              ))}
            </g>
          </svg>
        </span>
        al{" "}
        <span style={{ fontWeight: 300 }}>Pure</span>
      </span>
    </span>
  );
}
