/**
 * Bridge funnel — analytics wiring.
 * COMPLIANCE / PIXEL HYGIENE: this page fires Meta ViewContent + a custom
 * BridgeEngaged ONLY. It NEVER fires AddToCart, InitiateCheckout, or Purchase —
 * those belong on the PDP / checkout. Purchase fires only on a confirmed order.
 * Mirrors src/pages/reveal/tracking.ts.
 */

interface TrackingWindow {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
}

export function ga4Event(name: string, params?: Record<string, unknown>): void {
  try {
    const w = window as unknown as TrackingWindow;
    w.dataLayer = w.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    function gtag() { (w.dataLayer as unknown[]).push(arguments); }
    (gtag as (...a: unknown[]) => void)("event", name, params ?? {});
  } catch {
    /* tracking must never break the page */
  }
}

export function pixelViewContent(): void {
  try {
    const w = window as unknown as TrackingWindow;
    if (typeof w.fbq === "function") w.fbq("track", "ViewContent");
  } catch {
    /* ignore */
  }
}

export function pixelBridgeEngaged(): void {
  try {
    const w = window as unknown as TrackingWindow;
    if (typeof w.fbq === "function") w.fbq("trackCustom", "BridgeEngaged");
  } catch {
    /* ignore */
  }
}
