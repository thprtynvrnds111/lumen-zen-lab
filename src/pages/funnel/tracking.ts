/**
 * Bridge funnel — analytics wiring.
 * COMPLIANCE / PIXEL HYGIENE: this page fires Meta ViewContent + a custom
 * BridgeEngaged on view/scroll. AddToCart + InitiateCheckout fire ONLY from
 * pixelDirectCheckout, ONLY on a buy-CTA click whose href is a direct
 * cart-permalink into checkout — the click IS checkout entry, so the events
 * are strictly click-bound, never page-load-bound. Purchase fires only on a
 * confirmed order (checkout side). NOTE: src/pages/reveal/tracking.ts stays
 * view-only — do NOT copy pixelDirectCheckout there; /reveal has no one-hop
 * checkout path.
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

/** Click-bound ATC + InitiateCheckout for the one-hop cart-permalink CTA.
 *  Best-effort: if fbq has not loaded, the anchor still navigates. */
export function pixelDirectCheckout(item: {
  variantId: string;
  name: string;
  listValue: number;
  checkoutValue: number;
  currency: string;
}): void {
  try {
    const w = window as unknown as TrackingWindow;
    if (typeof w.fbq !== "function") return;
    w.fbq("track", "AddToCart", {
      content_ids: [item.variantId],
      content_type: "product",
      content_name: item.name,
      value: item.listValue,
      currency: item.currency,
    });
    w.fbq("track", "InitiateCheckout", {
      content_ids: [item.variantId],
      content_type: "product",
      value: item.checkoutValue,
      currency: item.currency,
      num_items: 1,
    });
  } catch {
    /* tracking must never break the page */
  }
}
