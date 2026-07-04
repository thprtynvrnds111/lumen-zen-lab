/**
 * /reveal — analytics wiring.
 * GA4 loads deferred (after window load, see index.html), so events push
 * straight onto the dataLayer queue; gtag.js replays it when it arrives.
 * Meta Pixel: ViewContent + custom RevealEngaged ONLY. Never Purchase,
 * InitiateCheckout, or AddToCart from this page.
 */

interface TrackingWindow {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
}

export function ga4Event(name: string, params?: Record<string, unknown>): void {
  try {
    const w = window as unknown as TrackingWindow;
    w.dataLayer = w.dataLayer || [];
    // gtag.js requires an Arguments object, not an Array — replicate the shim.
    // eslint-disable-next-line prefer-rest-params
    function gtag() { (w.dataLayer as unknown[]).push(arguments); }
    (gtag as (...a: unknown[]) => void)("event", name, params ?? {});
  } catch {
    /* tracking must never break the ritual */
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

export function pixelRevealEngaged(): void {
  try {
    const w = window as unknown as TrackingWindow;
    if (typeof w.fbq === "function") w.fbq("trackCustom", "RevealEngaged");
  } catch {
    /* ignore */
  }
}
