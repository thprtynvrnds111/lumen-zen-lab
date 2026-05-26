// Silent prefetch utility for instant-feel CTAs.
// On hover/focus/touchstart, warms the network path for cart creation + checkout:
//   1) prefetches the checkout origin HTML (browser caches it)
//   2) sends a HEAD-equivalent warm-up to the Shopify Storefront API to keep HTTP/2 warm
// Both are idempotent — multiple triggers cost nothing because the browser dedupes.

const STOREFRONT_URL = 'https://0d1m9a-w7.myshopify.com/api/2025-04/graphql.json';
const CHECKOUT_ORIGIN = 'https://checkout.zentialpure.com/';

let prefetchedCheckout = false;
let warmedStorefront = false;

function injectPrefetchLink(href: string) {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
  const l = document.createElement('link');
  l.rel = 'prefetch';
  l.href = href;
  l.crossOrigin = 'anonymous';
  document.head.appendChild(l);
}

async function warmStorefront() {
  if (warmedStorefront || typeof fetch === 'undefined') return;
  warmedStorefront = true;
  try {
    // Tiny no-op query just to open the TLS/HTTP-2 channel and prime DNS.
    await fetch(STOREFRONT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ shop { name } }' }),
      keepalive: true,
      credentials: 'omit',
      mode: 'cors',
    });
  } catch {
    warmedStorefront = false; // allow retry next time
  }
}

export function prefetchCheckout() {
  if (typeof window === 'undefined') return;
  if (!prefetchedCheckout) {
    prefetchedCheckout = true;
    injectPrefetchLink(CHECKOUT_ORIGIN);
  }
  // Fire-and-forget — do not await.
  warmStorefront();
}
