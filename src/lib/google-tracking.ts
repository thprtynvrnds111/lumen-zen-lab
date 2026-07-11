/**
 * Google Ads (gtag) ecommerce tracking — dormant until VITE_GOOGLE_ADS_ID is set.
 *
 * Mirrors meta-tracking.ts: a small, SSR-safe module with no side effects at
 * import time. When VITE_GOOGLE_ADS_ID is absent or empty every export no-ops
 * and no gtag script is loaded (zero network activity). When it is set, the
 * gtag.js tag is injected lazily on the first event, and every event is scoped
 * to the Ads destination via `send_to` so it never double-counts the GA4
 * property already wired in index.html.
 */

interface GtagWindow {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

export interface GoogleTrackItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

export interface GoogleTrackProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
}

/** The Google Ads tag id, trimmed. Empty string means tracking is disabled. */
function adsId(): string {
  const raw = import.meta.env.VITE_GOOGLE_ADS_ID;
  return typeof raw === "string" ? raw.trim() : "";
}

let injected = false;

/**
 * Ensure a gtag stub exists and the Ads tag is configured, injecting gtag.js
 * once. Returns null when tracking is disabled or running server-side, so
 * callers no-op without touching the DOM or the network.
 */
function ensureGtag(): ((...args: unknown[]) => void) | null {
  const id = adsId();
  if (!id) return null;
  if (typeof window === "undefined" || typeof document === "undefined") return null;

  const w = window as unknown as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // gtag.js requires the raw `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.gtag = function gtag() { (w.dataLayer as unknown[]).push(arguments); };
  }

  if (!injected) {
    injected = true;
    const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      document.head.appendChild(s);
    }
    w.gtag("js", new Date());
    w.gtag("config", id);
  }

  return w.gtag as (...args: unknown[]) => void;
}

export function trackViewItem(product: GoogleTrackProduct): void {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", "view_item", {
    send_to: adsId(),
    currency: product.currency,
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }],
  });
}

export function trackAddToCart(product: GoogleTrackProduct, qty = 1): void {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", "add_to_cart", {
    send_to: adsId(),
    currency: product.currency,
    value: product.price * qty,
    items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: qty }],
  });
}

export function trackBeginCheckout(
  cartTotal: number,
  currency: string,
  items: GoogleTrackItem[] = [],
): void {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", "begin_checkout", {
    send_to: adsId(),
    currency,
    value: cartTotal,
    items,
  });
}

/** Test-only: reset the lazy-injection latch. */
export function _resetGoogleTracking(): void {
  injected = false;
}
