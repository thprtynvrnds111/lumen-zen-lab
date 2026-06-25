/**
 * Movement conversion tracking.
 *
 * Fires browser Meta Pixel + GA events on join / deposit intent, and best-effort
 * mirrors a server-side Meta CAPI "Lead" (deduped by event_id) for ad attribution.
 * Every call is wrapped — tracking never blocks or breaks the user flow.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function newEventId(prefix: string): string {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${rnd}`;
}

/** Fire on a successful movement signup. */
export function trackMovementJoin(email: string, source: string): void {
  if (typeof window === "undefined") return;
  const eventId = newEventId("lead");
  try {
    window.fbq?.("track", "Lead", { content_name: "movement", source }, { eventID: eventId });
  } catch { /* no-op */ }
  try {
    window.gtag?.("event", "generate_lead", { method: "movement", source });
  } catch { /* no-op */ }
  // Best-effort server CAPI (deduped against the pixel via the shared event_id).
  try {
    fetch("/api/movement-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        email,
        source,
        event_id: eventId,
        event_source_url: window.location.href,
      }),
    }).catch(() => { /* swallow */ });
  } catch { /* no-op */ }
}

/** Fire when a visitor opens the founding-circle deposit. */
export function trackDepositIntent(source = "founding-circle"): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", "InitiateCheckout", { content_name: "founding-deposit", source });
  } catch { /* no-op */ }
  try {
    window.gtag?.("event", "begin_checkout", { method: "movement", source });
  } catch { /* no-op */ }
}

/** Generic movement-product event (reset started/completed, share, streak milestone). */
export function trackPractice(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("trackCustom", `Movement_${event}`, params);
  } catch { /* no-op */ }
  try {
    window.gtag?.("event", `movement_${event}`, params);
  } catch { /* no-op */ }
}
