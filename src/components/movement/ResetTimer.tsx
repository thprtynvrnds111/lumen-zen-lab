import { useEffect, useRef, useState, useCallback } from "react";
import { trackPractice } from "@/lib/movement-tracking";

/**
 * The guided 6-Minute Reset. A real tool, not a video: a paced breathing circle
 * (long exhale is the lever) across three phases. On completion it calls onComplete
 * so the page can log the streak. Respects prefers-reduced-motion.
 */

const TOTAL = 360; // seconds
const PHASES = [
  { from: 0, to: 120, key: "Empty the alarm", cue: "Long exhale. Lean toward rest.", breath: true },
  { from: 120, to: 240, key: "Work the face", cue: "Jaw. Brow. The space between the eyes.", breath: false },
  { from: 240, to: 360, key: "Stay down", cue: "No input. Let the lower gear hold.", breath: false },
] as const;

// One breath cycle: 4s in, 6s out (the long exhale).
const IN = 4, OUT = 6, CYCLE = IN + OUT;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function ResetTimer({ onComplete }: { onComplete?: () => void }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = useRef(false);
  const raf = useRef<number | null>(null);
  const start = useRef(0);
  const base = useRef(0);

  useEffect(() => { reduced.current = prefersReducedMotion(); }, []);

  const tick = useCallback(() => {
    const now = performance.now();
    const e = base.current + (now - start.current) / 1000;
    if (e >= TOTAL) {
      setElapsed(TOTAL);
      setRunning(false);
      setDone(true);
      onComplete?.();
      trackPractice("reset_completed", { duration: TOTAL });
      return;
    }
    setElapsed(e);
    raf.current = requestAnimationFrame(tick);
  }, [onComplete]);

  useEffect(() => {
    if (!running) return;
    start.current = performance.now();
    raf.current = requestAnimationFrame(tick);
    // Safety net: rAF throttles in background tabs, so a low-rate interval
    // guarantees completion fires even if the user tabs away mid-reset.
    const guard = window.setInterval(() => {
      const e = base.current + (performance.now() - start.current) / 1000;
      if (e >= TOTAL) {
        setElapsed(TOTAL);
        setRunning(false);
        setDone(true);
        onComplete?.();
        trackPractice("reset_completed", { duration: TOTAL });
      }
    }, 1000);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.clearInterval(guard);
    };
  }, [running, tick, onComplete]);

  const toggle = () => {
    if (done) { base.current = 0; setElapsed(0); setDone(false); setRunning(true); trackPractice("reset_started", { restart: true }); return; }
    if (running) { base.current = elapsed; setRunning(false); }
    else { if (elapsed === 0) trackPractice("reset_started"); setRunning(true); }
  };

  const phase = PHASES.find((p) => elapsed >= p.from && elapsed < p.to) ?? PHASES[PHASES.length - 1];
  const inBreath = phase.breath && running && !reduced.current;
  const cyclePos = elapsed % CYCLE;
  const inhaling = cyclePos < IN;
  // scale 0.62 -> 1.0 on inhale, back down on exhale
  const breatheScale = inhaling
    ? 0.62 + (cyclePos / IN) * 0.38
    : 1.0 - ((cyclePos - IN) / OUT) * 0.38;
  const scale = inBreath ? breatheScale : phase.breath ? 0.8 : 0.72;
  const breathLabel = inhaling ? "Breathe in" : "Long exhale";

  const pct = (elapsed / TOTAL) * 100;

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#1A1714] p-8 md:p-12 text-center">
      {/* breathing circle */}
      <div className="mx-auto mb-8 flex h-56 w-56 items-center justify-center md:h-64 md:w-64">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${scale})`,
            transition: inBreath ? "transform 120ms linear" : "transform 600ms cubic-bezier(.4,0,.2,1)",
            background:
              "radial-gradient(circle at 50% 45%, rgba(46,216,168,0.9) 0%, rgba(46,216,168,0.25) 55%, rgba(46,216,168,0) 75%)",
          }}
        >
          <span className="font-[Lora] italic text-[#F7F4F0]" style={{ fontSize: "1.5rem" }}>
            {done ? "Done" : running ? (phase.breath ? breathLabel : "Be still") : "Ready"}
          </span>
        </div>
      </div>

      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#2ED8A8] mb-2">
        {done ? "Complete" : `${fmt(Math.floor(elapsed))} · ${phase.key}`}
      </p>
      <p className="text-[#F7F4F0]/75 mb-8 min-h-[1.5rem]">
        {done ? "Your reset is logged. Same time tomorrow." : phase.cue}
      </p>

      {/* progress */}
      <div className="mx-auto mb-8 h-1 w-full max-w-sm overflow-hidden rounded-full bg-[#F7F4F0]/10">
        <div className="h-full bg-[#2ED8A8]" style={{ width: `${pct}%`, transition: "width 200ms linear" }} />
      </div>

      <button type="button" onClick={toggle} className="cta-pill">
        {done ? "Run it again" : running ? "Pause" : elapsed > 0 ? "Resume" : "Begin the reset"}
      </button>
    </div>
  );
}
