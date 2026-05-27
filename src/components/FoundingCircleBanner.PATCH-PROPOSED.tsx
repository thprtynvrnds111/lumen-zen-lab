/**
 * Founding Circle banner.
 *
 * Visibility rules (per spec):
 *   - hidden while ordersCount < 5     (anti-social-proof guard)
 *   - hidden while slotsRemaining < 0  (data error)
 *   - active state          1 <= slotsRemaining <= 20 (after the >=5 orders guard)
 *   - closed state          slotsRemaining === 0  (calm, no exclamations)
 *
 * Data source: /api/founding-circle-status — cached server-side (300s) and
 * client-side via TanStack Query (5 min staleTime, no refetch on focus).
 *
 * Style: matches Lumen Zen Lab editorial system — inline tokens, Lora italic
 * accent + DM Sans body, terra + teal accents, calm authority.
 */

import { useQuery } from "@tanstack/react-query";

type Status = {
  total: number;
  ordersCount: number;
  slotsRemaining: number;
  closed: boolean;
};

const S = {
  dark: "#1A1714",
  teal: "#2ED8A8",
  terra: "#9B5A2E",
  ink: "#2A2420",
  bg: "#F7F4F0",
  cream: "#EDE8E0",
  muted: "#8A7F74",
  gold: "#C6A07C",
};

const FIVE_MIN = 5 * 60 * 1000;
const MIN_ORDERS_TO_SHOW = 5;

async function fetchStatus(): Promise<Status> {
  const r = await fetch("/api/founding-circle-status", {
    headers: { accept: "application/json" },
  });
  if (!r.ok) throw new Error("status_fetch_failed");
  return r.json();
}

export function FoundingCircleBanner() {
  const { data, isLoading, isError } = useQuery<Status>({
    queryKey: ["founding-circle-status"],
    queryFn: fetchStatus,
    staleTime: FIVE_MIN,
    gcTime: FIVE_MIN * 2,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading || isError || !data) return null;

  const { ordersCount, slotsRemaining, total, closed } = data;

  // Closed state — calm thank-you, no urgency.
  if (closed) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          background: S.cream,
          border: `1px solid ${S.gold}33`,
          borderRadius: 2,
          padding: "12px 18px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: S.terra,
          }}
        >
          Founding Circle
        </span>
        <span
          aria-hidden="true"
          style={{ width: 40, height: 1, background: S.gold, opacity: 0.6 }}
        />
        <span
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.6vw, 16px)",
            color: S.ink,
            lineHeight: 1.5,
          }}
        >
          Closed. Thank you to the first 25.
        </span>
      </div>
    );
  }

  // Anti-social-proof guard — hide until we have momentum.
  if (ordersCount < MIN_ORDERS_TO_SHOW) return null;

  // Active state.
  return (
    <div
      role="status"
      aria-live="polite"
      data-component="founding-circle-banner"
      style={{
        background: S.bg,
        border: `1px solid ${S.teal}33`,
        borderRadius: 2,
        padding: "12px 18px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: S.teal,
          }}
        >
          Founding Circle
        </span>
        <span
          aria-hidden="true"
          style={{ width: 40, height: 1, background: S.teal, opacity: 0.6 }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: S.ink,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ fontWeight: 500, color: S.dark }}>
            {slotsRemaining} of {total}
          </strong>{" "}
          slots remaining
        </span>
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: S.muted,
          lineHeight: 1.7,
          letterSpacing: "0.01em",
        }}
      >
        Lifetime 15% off · early access to new launches · free shipping forever
      </div>
    </div>
  );
}

export default FoundingCircleBanner;
