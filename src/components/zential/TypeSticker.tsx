import { useId } from "react";

/**
 * TypeSticker — small decorative "sticker" in the RITUAL type-study style
 * (approved 2026-08-07): extruded patterned display type, green family,
 * cream keyline, placed sparingly on empty canvas around the site. Purely
 * decorative: aria-hidden, pointer-events-none, never carries copy that
 * makes a claim (word set is fixed: RITUAL / RESET / 12 MIN).
 *
 * Pattern ids are namespaced per instance via useId so multiple stickers
 * can render on one page without SVG id collisions.
 */

export type StickerWord = "RITUAL" | "RESET" | "12 MIN";

export function TypeSticker({
  word = "RITUAL",
  width = 120,
  rotate = -7,
  className = "",
}: {
  word?: StickerWord;
  width?: number;
  rotate?: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rings = `rings${uid}`;
  const waves = `waves${uid}`;
  const dots = `dots${uid}`;
  // Wider words render on a wider viewBox so the type stays chunky.
  const vw = word === "12 MIN" ? 320 : word === "RITUAL" ? 340 : 300;
  const patterns = [rings, waves, dots];
  const letters = word.split("");
  return (
    <span
      aria-hidden
      className={`pointer-events-none inline-block select-none ${className}`}
      style={{ width, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox={`0 0 ${vw} 120`} width="100%" style={{ display: "block", overflow: "visible", filter: "drop-shadow(0 2px 5px rgba(20,20,20,0.22))" }}>
        <defs>
          <pattern id={rings} width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill="#0E7A54" />
            <circle cx="13" cy="13" r="9" fill="none" stroke="#2ED8A8" strokeWidth="3" />
            <circle cx="13" cy="13" r="3" fill="#F5EFE0" />
          </pattern>
          <pattern id={waves} width="34" height="18" patternUnits="userSpaceOnUse">
            <rect width="34" height="18" fill="#2ED8A8" />
            <path d="M0,5 Q8.5,-3 17,5 T34,5" fill="none" stroke="#0E7A54" strokeWidth="3.4" />
            <path d="M0,13 Q8.5,6 17,13 T34,13" fill="none" stroke="#F5EFE0" strokeWidth="2.6" />
          </pattern>
          <pattern id={dots} width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill="#DFF5EC" />
            <circle cx="4.5" cy="4.5" r="2.6" fill="#0E7A54" />
            <circle cx="13.5" cy="13.5" r="2.6" fill="#2ED8A8" />
          </pattern>
        </defs>
        <g
          fontFamily="'Switzer', 'DM Sans', sans-serif"
          fontWeight={600}
          fontSize={72}
          textAnchor="middle"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* die-cut contour wraps the WHOLE sticker shape, extrusion included —
              without these the offset extrusion pokes past the face outline as
              black nubs at glyph corners (operator screenshot 2026-08-07) */}
          <text x={vw / 2 + 7} y={92} stroke="#F5EFE0" strokeWidth={13} fill="none">{word}</text>
          <text x={vw / 2} y={86} stroke="#F5EFE0" strokeWidth={13} fill="none">{word}</text>
          <text x={vw / 2 + 7} y={92} fill="#05231A">{word}</text>
          <text x={vw / 2 + 4} y={89} fill="#0A4A34">{word}</text>
          <text x={vw / 2} y={86} stroke="#F5EFE0" strokeWidth={7} fill="none">{word}</text>
          <text x={vw / 2} y={86}>
            {letters.map((ch, i) => (
              <tspan key={i} fill={ch === " " ? "none" : `url(#${patterns[i % 3]})`}>{ch}</tspan>
            ))}
          </text>
          <text x={vw / 2} y={86} stroke="#F5EFE0" strokeWidth={2.4} fill="none">{word}</text>
        </g>
      </svg>
    </span>
  );
}
