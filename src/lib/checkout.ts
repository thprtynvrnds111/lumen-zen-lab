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
