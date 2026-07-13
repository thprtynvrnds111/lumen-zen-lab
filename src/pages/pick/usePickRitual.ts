import { useCallback, useEffect, useRef, useState } from "react";
import { PRIZES, T_CTA, T_PRIZE_START } from "./config";

/**
 * /pick — mechanic state machine, no presentation.
 *
 * idle ──choose(i)──▶ flip ──(lift+flip+beat)──▶ prize ──▶ ctaReady
 *
 * The three prizes are shuffled onto the cards once per session (dealt when
 * the page first renders), so position never predicts the rate. A completed
 * pick persists in sessionStorage — a back-button return restores the
 * revealed state (same card, same prize) instead of replaying the ritual.
 */

export type Phase = "idle" | "flip" | "prize";

const STORAGE_KEY = "zp-pick-state"; // JSON: { chosen, order }

interface Stored {
  chosen: number;
  order: number[]; // card index -> PRIZES index
}

function shuffledOrder(): number[] {
  const order = PRIZES.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function isValidOrder(order: unknown): order is number[] {
  return (
    Array.isArray(order) &&
    order.length === PRIZES.length &&
    [...order].sort().every((v, i) => v === i)
  );
}

function readStored(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (
      Number.isInteger(parsed.chosen) &&
      parsed.chosen >= 0 &&
      parsed.chosen < PRIZES.length &&
      isValidOrder(parsed.order)
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function usePickRitual(onChoose?: (index: number, prizeIndex: number) => void) {
  const stored = useRef<Stored | null | undefined>(undefined);
  if (stored.current === undefined) stored.current = readStored();

  const [order] = useState<number[]>(() => stored.current?.order ?? shuffledOrder());
  const [chosen, setChosen] = useState<number | null>(stored.current?.chosen ?? null);
  const restored = useRef(chosen !== null);
  const [phase, setPhase] = useState<Phase>(chosen !== null ? "prize" : "idle");
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
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ chosen: i, order }));
      } catch {
        /* private mode — the pick simply replays on return */
      }
      onChoose?.(i, order[i]);
      setPhase("flip");
      timers.current.push(
        window.setTimeout(() => setPhase("prize"), T_PRIZE_START),
        window.setTimeout(() => setCtaReady(true), T_CTA)
      );
    },
    [chosen, onChoose, order]
  );

  const prize = chosen !== null ? PRIZES[order[chosen]] : null;

  return { phase, chosen, prize, order, ctaReady, restored: restored.current, choose };
}
