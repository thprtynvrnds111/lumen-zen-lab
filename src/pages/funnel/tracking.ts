/**
 * Bridge funnel — analytics wiring.
 * COMPLIANCE / PIXEL HYGIENE: this page fires Meta ViewContent + a custom
 * BridgeEngaged on view/scroll. AddToCart fires ONLY from pixelDirectCheckout,
 * ONLY on a buy-CTA click whose href is a direct cart-permalink into checkout —
 * strictly click-bound, never page-load-bound. NOTE:
 * src/pages/reveal/tracking.ts stays view-only — do NOT copy
 * pixelDirectCheckout there; /reveal has no one-hop checkout path.
 *
 * EVENT OWNERSHIP — one sender per event, do not add a second:
 *   browser (here)  PageView · ViewContent · AddToCart
 *   CAPI (server)   InitiateCheckout · Purchase
 *
 * InitiateCheckout was removed from the browser on 2026-07-27. CAPI already
 * sends it from the Shopify `checkouts/create` webhook keyed on
 * `event_id = checkout.id || checkout.token` (scripts/meta-capi/capi-sender.js).
 * The browser cannot know that id — the checkout does not exist until after the
 * redirect — so the two can never be deduplicated, and Meta counts both. That
 * was harmless while the browser fired into pixel 915… alone, which no US ad
 * set reads; it stopped being harmless the moment index.html also initialised
 * 2204…, the pixel both US ad sets optimise against. Re-adding a client-side
 * InitiateCheckout here silently inflates the number the budget is judged on.
 * Guarded by src/test/funnelTracking.test.ts.
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

/** Click-bound AddToCart for the one-hop cart-permalink CTA. InitiateCheckout is
 *  CAPI's — see the event-ownership note at the top of this file.
 *  Best-effort: if fbq has not loaded, the anchor still navigates.
 *  `checkoutValue` stays in the signature: callers compute the honest
 *  post-discount figure per cart, and it is the value CAPI reports for the
 *  matching InitiateCheckout. */
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
    // No InitiateCheckout here — CAPI owns it. See the header note.
  } catch {
    /* tracking must never break the page */
  }
}
