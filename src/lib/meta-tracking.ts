/**
 * Meta click-ID + browser-ID capture for CAPI deduplication.
 *
 * - Captures `fbclid` query param on landing, writes Meta-formatted `_fbc` cookie.
 * - Reads `_fbp` cookie auto-set by the Meta pixel script in index.html.
 * - Exposes both as Shopify cart attributes so they reach the order webhook
 *   and the server-side CAPI Purchase event can match it back to the click.
 */

const COOKIE_TTL_DAYS = 90;
const COOKIE_DOMAIN = ".zentialpure.com";

function setCookie(name: string, value: string, days = COOKIE_TTL_DAYS): void {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function captureFbclid(): void {
  if (typeof window === "undefined") return;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return;
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  setCookie("_fbc", fbc);
}

export interface MetaAttribute {
  key: string;
  value: string;
}

export function getMetaAttributes(): MetaAttribute[] {
  const out: MetaAttribute[] = [];
  const fbc = getCookie("_fbc");
  const fbp = getCookie("_fbp");
  if (fbc) out.push({ key: "_fbc", value: fbc });
  if (fbp) out.push({ key: "_fbp", value: fbp });
  return out;
}
