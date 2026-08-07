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
        background:   "#F4FBF8",
        border:       "1px solid rgba(20, 20, 20, 0.10)",
        borderRadius: "0",
        padding:      "10px 16px",
        marginBottom: "12px",
      }}
    >
      <span
        style={{
          fontSize:      "11px",
          fontWeight:    500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         "#141414",
        }}
      >
        {parsed.message}
      </span>
    </div>
  );
}
