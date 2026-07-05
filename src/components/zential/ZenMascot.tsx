import { useId } from "react";
import { cn } from "@/lib/utils";

export type ZenExpression = "calm" | "delighted" | "skeptical" | "sleepy" | "thinking";

interface ZenMascotProps {
  expression?: ZenExpression;
  /** Rendered width/height in px (viewBox is square-ish 200x240). */
  size?: number;
  /** Float/blink/halo-drift CSS animation. */
  animated?: boolean;
  /** Pseudo-3D tilt on hover (pure CSS). */
  tilt?: boolean;
  className?: string;
}

const CHARCOAL = "#2a211a";

const Eyes = ({ expression }: { expression: ZenExpression }) => {
  if (expression === "delighted") {
    return (
      <g className="zen-eyes" data-part="eyes">
        <path d="M68 130 Q78 120 88 130" stroke={CHARCOAL} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M112 130 Q122 120 132 130" stroke={CHARCOAL} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (expression === "sleepy") {
    return (
      <g className="zen-eyes" data-part="eyes">
        <path d="M68 128 Q78 136 88 128" stroke={CHARCOAL} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M112 128 Q122 136 132 128" stroke={CHARCOAL} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (expression === "thinking") {
    // eyes glance up and to the side
    return (
      <g className="zen-eyes" data-part="eyes">
        <ellipse cx="82" cy="124" rx="5.5" ry="8.5" fill={CHARCOAL} />
        <ellipse cx="126" cy="124" rx="5.5" ry="8.5" fill={CHARCOAL} />
      </g>
    );
  }
  // calm + skeptical share open oval eyes
  return (
    <g className="zen-eyes" data-part="eyes">
      <ellipse cx="78" cy="130" rx="5.5" ry="8.5" fill={CHARCOAL} />
      <ellipse cx="122" cy="130" rx="5.5" ry="8.5" fill={CHARCOAL} />
    </g>
  );
};

const Mouth = ({ expression }: { expression: ZenExpression }) => {
  switch (expression) {
    case "delighted":
      return <path data-part="mouth" d="M85 158 Q100 178 115 158 Z" fill={CHARCOAL} strokeLinejoin="round" />;
    case "skeptical":
      return <path data-part="mouth" d="M88 164 L112 164" stroke={CHARCOAL} strokeWidth="4.5" strokeLinecap="round" fill="none" />;
    case "sleepy":
      return <circle data-part="mouth" cx="100" cy="164" r="5" fill={CHARCOAL} />;
    case "thinking":
      return <path data-part="mouth" d="M92 164 L110 160" stroke={CHARCOAL} strokeWidth="4.5" strokeLinecap="round" fill="none" />;
    default: // calm
      return <path data-part="mouth" d="M88 160 Q100 170 112 160" stroke={CHARCOAL} strokeWidth="4.5" strokeLinecap="round" fill="none" />;
  }
};

export const ZenMascot = ({
  expression = "calm",
  size = 128,
  animated = true,
  tilt = false,
  className,
}: ZenMascotProps) => {
  const uid = useId();
  const bodyGrad = `zen-body-${uid}`;
  const glowGrad = `zen-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={Math.round(size * 1.2)}
      role="img"
      aria-label="Zen, the Zential Pure mascot"
      data-expression={expression}
      className={cn(animated && "zen-animated", tilt && "zen-tilt", className)}
    >
      <defs>
        <radialGradient id={bodyGrad} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fdf6f0" />
          <stop offset="58%" stopColor="#fdf6f0" />
          <stop offset="100%" stopColor="#8b5a3c" />
        </radialGradient>
        <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#c9a87c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c9a87c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse className="zen-shadow" cx="100" cy="224" rx="44" ry="8" fill={CHARCOAL} opacity="0.08" />

      <g className="zen-body">
        <ellipse cx="100" cy="138" rx="88" ry="92" fill={`url(#${glowGrad})`} />
        <ellipse cx="100" cy="138" rx="70" ry="74" fill={`url(#${bodyGrad})`} />
        <g className="zen-face">
          {expression === "skeptical" && (
            <path data-part="brow" d="M64 110 L90 104" stroke={CHARCOAL} strokeWidth="4.5" strokeLinecap="round" fill="none" />
          )}
          <Eyes expression={expression} />
          <Mouth expression={expression} />
          {expression === "thinking" && (
            <ellipse data-part="hand" cx="88" cy="174" rx="8" ry="6" fill="#fdf6f0" stroke="#8b5a3c" strokeWidth="2.5" />
          )}
        </g>
      </g>

      <ellipse
        className="zen-halo"
        cx="100"
        cy="44"
        rx="48"
        ry="12"
        fill="none"
        stroke="#c9a87c"
        strokeWidth="5"
        strokeLinecap="round"
        transform="rotate(-12 100 44)"
      />
    </svg>
  );
};
