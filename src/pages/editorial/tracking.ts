/**
 * Editorial pages — pixel wiring.
 * PIXEL HYGIENE (spec): these pages fire ViewContent ONLY (PageView is global).
 * NEVER AddToCart / InitiateCheckout / Purchase / Lead here.
 */

interface TrackingWindow {
  fbq?: (...args: unknown[]) => void;
}

export function pixelViewContent(contentName: string): void {
  try {
    const w = window as unknown as TrackingWindow;
    if (typeof w.fbq === "function") {
      w.fbq("track", "ViewContent", { content_name: contentName });
    }
  } catch {
    /* tracking must never break the page */
  }
}
