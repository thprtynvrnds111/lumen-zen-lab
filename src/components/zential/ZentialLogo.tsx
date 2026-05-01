import { cn } from "@/lib/utils";

interface ZentialLogoProps {
  variant?: "dark" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  animateMark?: boolean;
}

const sizes = {
  sm: { fontSize: 18, markSize: 22, gap: 7 },
  md: { fontSize: 26, markSize: 32, gap: 9 },
  lg: { fontSize: 42, markSize: 50, gap: 14 },
};

export function FlowerMark({
  size = 32,
  color = "#2ED8A8",
  className,
  animate = false,
}: {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(animate && "animate-flower-breathe", className)}
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <g transform="translate(50,50)">
        <ellipse rx="18" ry="32" fill={color} transform="rotate(0)" />
        <ellipse rx="18" ry="32" fill={color} transform="rotate(45)" />
        <ellipse rx="18" ry="32" fill={color} transform="rotate(90)" />
        <ellipse rx="18" ry="32" fill={color} transform="rotate(135)" />
      </g>
    </svg>
  );
}

export function ZentialLogo({
  variant = "dark",
  size = "md",
  className,
  animateMark = false,
}: ZentialLogoProps) {
  const s = sizes[size];
  const textColor = variant === "white" ? "#FFFFFF" : "#1A1714";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ gap: s.gap }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: s.fontSize,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: textColor,
        }}
      >
        zential
      </span>
      <FlowerMark size={s.markSize} animate={animateMark} />
    </span>
  );
}
