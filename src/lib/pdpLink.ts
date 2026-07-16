import { useEffect, useState } from "react";

/**
 * Editorial pages are shared landing surfaces: Pinterest pins, Meta ads, and
 * organic all arrive here. The PDP CTA must therefore FORWARD the visitor's own
 * utm_* params instead of stamping a hard-coded source — the previous
 * `utm_source=pinterest` constant attributed every Meta-paid click-through to
 * Pinterest (bug found 2026-07-16, ad→lander audit).
 *
 * Server/prerender renders the neutral fallback (`?utm_campaign=<slug>`); after
 * hydration the real query params are read from the URL. useEffect (not inline
 * window reads) keeps server and first client render identical.
 */
export function usePdpLink(base: string, campaign: string): string {
  const fallback = `${base}?utm_campaign=${campaign}`;
  const [href, setHref] = useState(fallback);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fwd = new URLSearchParams();
    for (const [k, v] of params) {
      if (k.startsWith("utm_")) fwd.set(k, v);
    }
    if ([...fwd].length === 0) return; // no inbound UTMs — keep neutral fallback
    if (!fwd.has("utm_campaign")) fwd.set("utm_campaign", campaign);
    fwd.set("utm_content", campaign);
    setHref(`${base}?${fwd.toString()}`);
  }, [base, campaign]);
  return href;
}
