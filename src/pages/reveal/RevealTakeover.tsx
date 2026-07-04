import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RevealRitual } from "./RevealRitual";

/**
 * Homepage takeover — opens the reveal ritual over zentialpure.com.
 *
 * Rules:
 * - homepage ("/") only
 * - waits 6s for organic landings, 2.5s when the visit carries ad markers
 *   (fbclid / utm) — those visitors came for the offer
 * - once per session: never reopens after a dismissal, never shows again
 *   once a card has been chosen (the /reveal page shares the same key)
 */

const DISMISS_KEY = "zp-reveal-dismissed";
const CHOSEN_KEY = "zp-reveal-chosen";
const DELAY_ORGANIC = 6000;
const DELAY_AD = 2500;

export default function RevealTakeover() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || open) return;
    try {
      if (window.sessionStorage.getItem(CHOSEN_KEY) !== null) return;
      if (window.sessionStorage.getItem(DISMISS_KEY) !== null) return;
    } catch {
      return; // storage unavailable — never risk a popup loop
    }
    const params = new URLSearchParams(window.location.search);
    const fromAd =
      params.has("fbclid") || params.has("utm_source") || params.has("utm_campaign");
    const t = window.setTimeout(() => setOpen(true), fromAd ? DELAY_AD : DELAY_ORGANIC);
    return () => window.clearTimeout(t);
  }, [pathname, open]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // scroll lock + escape while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open || pathname !== "/") return null;

  return (
    <div className="zr-overlay" role="dialog" aria-modal="true" aria-label="A ritual begins">
      <button className="zr-close" onClick={close} aria-label="Close">
        ×
      </button>
      <RevealRitual placement="overlay" />
    </div>
  );
}
