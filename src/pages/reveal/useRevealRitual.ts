import { useCallback, useEffect, useRef, useState } from "react";
import { T_CTA, T_GIFTS_START } from "./config";

/**
 * /reveal — mechanic state machine, no presentation.
 *
 * idle ──choose(i)──▶ flip ──(lift+flip+beat)──▶ gifts ──(cascade)──▶ ctaReady
 *
 * A completed reveal persists in sessionStorage so a back-button return
 * restores the revealed state instead of replaying the ritual.
 */

export type Phase = "idle" | "flip" | "gifts";

const STORAGE_KEY = "zp-reveal-chosen";

function readStoredChoice(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isInteger(n) && n >= 0 && n <= 2 ? n : null;
  } catch {
    return null;
  }
}

export function useRevealRitual(onChoose?: (index: number) => void) {
  const [chosen, setChosen] = useState<number | null>(readStoredChoice);
  const restored = useRef(chosen !== null);
  const [phase, setPhase] = useState<Phase>(chosen !== null ? "gifts" : "idle");
  const [ctaReady, setCtaReady] = useState(chosen !== null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const timerList = timers.current;
    return () => timerList.forEach((t) => window.clearTimeout(t));
  }, []);

  const choose = useCallback(
    (i: number) => {
      if (chosen !== null) return; // taps during the animation change nothing
      setChosen(i);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, String(i));
      } catch {
        /* private mode — the reveal simply replays on return */
      }
      onChoose?.(i);
      setPhase("flip");
      timers.current.push(
        window.setTimeout(() => setPhase("gifts"), T_GIFTS_START),
        window.setTimeout(() => setCtaReady(true), T_CTA)
      );
    },
    [chosen, onChoose]
  );

  return { phase, chosen, ctaReady, restored: restored.current, choose };
}
