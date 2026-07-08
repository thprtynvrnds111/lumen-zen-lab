interface EditorialImageSlotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Art direction note from the design handoff — kept for regeneration briefs. */
  artDirection: string;
  eager?: boolean;
  className?: string;
}

/** Fixed-dimension image slot: dimensions always explicit so layout space is
 *  reserved (no CLS). Below-fold images lazy-load unless eager is set. */
export function EditorialImageSlot({
  src,
  alt,
  width,
  height,
  artDirection,
  eager = false,
  className,
}: EditorialImageSlotProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      data-art-direction={artDirection}
      className={className}
      style={{ width: "100%", height: `${height}px`, objectFit: "cover" }}
    />
  );
}
