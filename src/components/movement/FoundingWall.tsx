import { useEffect, useState } from "react";
import { getPractice, currentStreak } from "@/lib/movement-practice";
import { fetchMovementStats, type MovementStats } from "@/lib/movement-stats";

/**
 * Founding Wall — live collective proof. Reads the founding-circle status endpoint
 * (graceful if it is not live yet) for the "X of 100" count, and shows the visitor
 * their own streak as personal proof. No fabricated numbers: if the endpoint is
 * absent, it shows the cap and the personal signal only.
 */

const TOTAL = 100;

interface Status {
  count: number | null;
}

export function FoundingWall() {
  const [status, setStatus] = useState<Status>({ count: null });
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<MovementStats | null>(null);

  useEffect(() => {
    const p = getPractice();
    setStreak(currentStreak(p));
    setTotal(p.total);
    fetchMovementStats().then((s) => s && setStats(s));
    let alive = true;
    fetch("/api/founding-circle-status")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        const c = typeof d.count === "number" ? d.count : typeof d.founding_orders_count === "number" ? d.founding_orders_count : null;
        if (c !== null) setStatus({ count: c });
      })
      .catch(() => { /* endpoint not live yet — keep cap-only view */ });
    return () => { alive = false; };
  }, []);

  const claimed = status.count;
  const pct = claimed !== null ? Math.min((claimed / TOTAL) * 100, 100) : 0;
  const remaining = claimed !== null ? Math.max(TOTAL - claimed, 0) : null;

  return (
    <section className="relative overflow-hidden section-padding bg-[#1A1714]">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8] mb-6">
          The founding wall
        </p>

        {claimed !== null ? (
          <>
            <h2 className="font-[Lora] italic text-[#F7F4F0] leading-[1.05] mb-3" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              {claimed} of {TOTAL} claimed.
            </h2>
            <p className="text-[#F7F4F0]/70 mb-8">
              {remaining === 0 ? "Founding is closed." : `${remaining} founding places left.`}
            </p>
            <div className="mx-auto mb-10 h-2 w-full max-w-md overflow-hidden rounded-full bg-[#F7F4F0]/10">
              <div className="h-full bg-[#2ED8A8]" style={{ width: `${pct}%`, transition: "width 600ms cubic-bezier(.4,0,.2,1)" }} />
            </div>
          </>
        ) : (
          <h2 className="font-[Lora] italic text-[#F7F4F0] leading-[1.05] mb-8" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            The Founding 100.
          </h2>
        )}

        <div className="inline-flex items-center gap-6 rounded-[1.5rem] border border-[#2ED8A8]/30 px-7 py-5">
          <div className="text-left">
            <p className="font-[Lora] italic text-[#F7F4F0] leading-none" style={{ fontSize: "2rem" }}>{streak}</p>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F7F4F0]/50 mt-1">your streak</p>
          </div>
          <div className="h-10 w-px bg-[#F7F4F0]/15" aria-hidden />
          <div className="text-left">
            <p className="font-[Lora] italic text-[#F7F4F0] leading-none" style={{ fontSize: "2rem" }}>
              {stats ? stats.week : total}
            </p>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F7F4F0]/50 mt-1">
              {stats ? "resets this week" : "your resets"}
            </p>
          </div>
          <div className="h-10 w-px bg-[#F7F4F0]/15" aria-hidden />
          <a href="/reset" className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#2ED8A8] hover:opacity-80">
            Run today →
          </a>
        </div>
      </div>
    </section>
  );
}
