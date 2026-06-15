import { useEffect, useState } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { ResetTimer } from "@/components/movement/ResetTimer";
import {
  captureRef,
  logReset,
  getPractice,
  currentStreak,
  doneToday,
  lastDays,
  myShareUrl,
  type PracticeState,
} from "@/lib/movement-practice";
import { trackPractice } from "@/lib/movement-tracking";
import { logResetRemote } from "@/lib/movement-stats";

/** Eyebrow, mono, tracked. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B5A4A] mb-6">
      {children}
    </p>
  );
}

const PHASES = [
  {
    range: "0:00 · 2:00",
    title: "Empty the alarm",
    body:
      "Sit or stand. Breathe in through the nose, then take a second short sip of air on top of it. Long, slow exhale through the mouth. Repeat for two minutes. The double inhale and long exhale lean the system toward its rest state. This is the part most people skip.",
  },
  {
    range: "2:00 · 4:00",
    title: "Work the face",
    body:
      "Bring attention to the jaw, the brow, the space between the eyes. These hold the day. Move slowly here, with or without the device. The face already runs on its own current. You are working with the signal, not forcing it.",
  },
  {
    range: "4:00 · 6:00",
    title: "Stay down",
    body:
      "Do nothing. No phone, no plan, no input. Let the system stay in the lower gear you just found. Two minutes of being unreachable is the whole point. This is where the reset sets.",
  },
];

/** Streak strip — the retention loop made visible. */
function StreakStrip({ state }: { state: PracticeState }) {
  const streak = currentStreak(state);
  const today = doneToday(state);
  const week = lastDays(7, state);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 rounded-[1.5rem] border border-[#2ED8A8]/30 bg-white p-6">
      <div>
        <p className="font-[Lora] italic text-[#1A1714] leading-none" style={{ fontSize: "2.5rem" }}>
          {streak}
        </p>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B5A4A] mt-1">
          day streak
        </p>
      </div>
      <div className="flex-1">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B5A4A] mb-3">
          {today ? "Reset done today" : "Not yet today"}
        </p>
        <div className="flex gap-2">
          {week.map((d) => (
            <span
              key={d.date}
              title={d.date}
              className={`h-4 w-4 rounded-full ${d.done ? "bg-[#2ED8A8]" : "bg-[#1A1714]/10"}`}
              aria-label={`${d.date} ${d.done ? "done" : "missed"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-[#8A7F74] max-w-[14rem]">
        Total resets: {state.total}. Consistency beats intensity.
      </p>
    </div>
  );
}

const Reset = () => {
  const [state, setState] = useState<PracticeState>({ days: [], total: 0 });
  const [shared, setShared] = useState(false);

  useEffect(() => {
    captureRef();
    setState(getPractice());
  }, []);

  const handleComplete = () => {
    setState(logReset());
    logResetRemote("reset");
  };

  const handleShare = async () => {
    const url = myShareUrl();
    trackPractice("shared", { from: "reset" });
    try {
      if (navigator.share) {
        await navigator.share({ title: "Reclaim your own frequency", url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch { /* user cancelled */ }
  };

  return (
    <PageShell
      title="The 6-Minute Reset | Zential Pure"
      description="A guided down-regulation practice you can run anywhere. Six minutes, every day. Build the streak that brings your own system back online."
      canonical="/reset"
      eyebrow="ZENTIAL PURE · THE MOVEMENT"
      displayTitle="The 6-Minute Reset."
      displaySubtitle="One practice. Six minutes. Run it now, then run it tomorrow. The streak is how the system learns to switch off on command."
      stickyTag="Reset 01"
    >
      {/* The tool + the streak */}
      <section className="section-padding">
        <div className="max-w-3xl space-y-6">
          <Eyebrow>The practice, guided</Eyebrow>
          <ResetTimer onComplete={handleComplete} />
          <StreakStrip state={state} />
        </div>
      </section>

      {/* The protocol in writing */}
      <section className="section-padding bg-white border-y border-border/60">
        <div className="max-w-3xl">
          <Eyebrow>The practice, in writing</Eyebrow>
          <div className="space-y-6">
            {PHASES.map((p, i) => (
              <div key={p.range} className="bg-[#F7F4F0] rounded-[1.5rem] border border-border/60 p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h2 className="font-[Lora] italic text-[#1A1714] leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
                    {p.title}
                  </h2>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#2ED8A8] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B5A4A] mb-3">{p.range}</p>
                <p className="text-base md:text-lg text-[#1A1714]/80 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-[#8A7F74] leading-relaxed">
            This is a wellbeing practice, not medical advice, and not a treatment for any condition.
          </p>
        </div>
      </section>

      {/* Bring one — referral */}
      <section className="section-padding">
        <div className="max-w-3xl">
          <Eyebrow>Bring one</Eyebrow>
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.1] mb-6" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            A movement is people, not posts.
          </h2>
          <p className="text-lg text-[#1A1714]/80 leading-relaxed mb-8 max-w-xl">
            Send the reset to one person who is holding their breath at a screen right now. When
            they join through your link, you move up the Founding 100.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={handleShare} className="cta-pill">
              {shared ? "Link copied" : "Share the reset"}
            </button>
            <a href="/movement#join" className="ghost-pill">Back to the movement</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Reset;
