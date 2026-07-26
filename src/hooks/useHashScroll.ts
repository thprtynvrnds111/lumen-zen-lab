import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Roughly 4s of retries at 100ms — long enough for a lazy route chunk on 4G. */
const MAX_TRIES = 40;
const INTERVAL_MS = 100;

export function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Retry rather than fire once. This hook lives in AppContent, which mounts
    // immediately, while every route below it is lazy — so on a cold deep link
    // like /instruments#system the target element does not exist yet at +100ms
    // and a single attempt silently lands the visitor at the top of the page.
    const id = hash.replace("#", "");
    let tries = 0;
    let timer: number | undefined;

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (++tries < MAX_TRIES) timer = window.setTimeout(attempt, INTERVAL_MS);
    };

    timer = window.setTimeout(attempt, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);
}
