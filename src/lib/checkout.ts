/**
 * In-app browser handling for checkout.
 *
 * Instagram/Facebook/etc. open links in their own webview. Shop Pay's handoff
 * to shop.app dead-ends inside those webviews, so for in-app-browser visitors
 * we append `skip_shop_pay=true` to keep checkout on the Shopify-hosted page.
 * Normal browsers keep Shop Pay (it converts well) untouched.
 */

export function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Instagram|FBAN|FBAV|FB_IAB|Line\/|Snapchat|Pinterest|TikTok|musical_ly/i.test(navigator.userAgent);
}

/** Make a checkout URL safe for in-app browsers; pass-through otherwise. */
export function safeCheckoutUrl(url: string): string {
  if (!url || !isInAppBrowser()) return url;
  return url + (url.includes("?") ? "&" : "?") + "skip_shop_pay=true";
}

/**
 * Carry the Meta pixel cookies into the checkout so server-side CAPI can identify
 * the visitor.
 *
 * WHY (measured 2026-07-27): Shopify fires the `checkouts/create` webhook the moment
 * a checkout object exists — BEFORE the buyer types an email. The CAPI sender builds
 * `user_data` from that payload, finds no identifier, and Meta rejects the event with
 * subcode 2804050, "no customer information parameters". Over the preceding 7 days
 * that was 29 InitiateCheckout events rejected against 3 accepted — a 91% loss. It
 * looked like nobody was starting checkouts. 32 people were.
 *
 * `_fbp` (browser id, set by the pixel on every visitor) and `_fbc` (click id, set
 * when a visitor arrives with `fbclid`) are valid Meta identifiers on their own. Cart
 * permalink `attributes[...]` params become cart attributes, which Shopify surfaces as
 * `note_attributes` on the checkout webhook — exactly where `buildUserData()` in
 * scripts/meta-capi/capi-sender.js already looks for them.
 *
 * Best-effort by design: no cookie, no attribute, unchanged URL. Never block a buy click
 * over analytics.
 */
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

export function withPixelAttribution(url: string): string {
  if (!url) return url;
  try {
    const params: string[] = [];
    for (const name of ["_fbp", "_fbc"]) {
      const value = readCookie(name);
      // Shopify caps attribute values; these cookies are ~40-60 chars, but guard anyway.
      if (value && value.length <= 255) {
        params.push(`attributes[${name}]=${encodeURIComponent(value)}`);
      }
    }
    if (!params.length) return url;
    return url + (url.includes("?") ? "&" : "?") + params.join("&");
  } catch {
    return url; // analytics must never break a purchase path
  }
}

/** The one call every buy path should use: in-app-browser safe + CAPI-identifiable. */
export function buyUrl(url: string): string {
  return safeCheckoutUrl(withPixelAttribution(url));
}
