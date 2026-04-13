interface ScarcitySignal {
  show: boolean;
  level: string;
  units_left: number;
  message: string;
}

interface Props {
  signal: string | null | undefined;
}

export function ScarcityBanner({ signal }: Props) {
  if (!signal) return null;

  let parsed: ScarcitySignal;
  try {
    parsed = JSON.parse(signal);
  } catch {
    return null;
  }

  if (!parsed.show || !parsed.message) return null;

  return (
    <div
      style={{
        background:   "rgba(196, 97, 74, 0.08)",
        border:       "1px solid rgba(196, 97, 74, 0.25)",
        borderRadius: "2px",
        padding:      "10px 16px",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          fontFamily:    "Poppins, sans-serif",
          fontSize:      "11px",
          fontWeight:    500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "#C4614A",
        }}
      >
        {parsed.message}
      </span>
    </div>
  );
}
