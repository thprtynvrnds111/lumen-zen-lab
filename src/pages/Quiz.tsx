import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { quizSteps, type QuizAnswers } from "@/data/quizData";

const STORAGE_KEY = "zential.quiz.answers";

export default function Quiz() {
  const nav = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  const totalSteps = quizSteps.length;
  const step = quizSteps[stepIdx];
  const progress = ((stepIdx + (showEmailGate ? 1 : 0)) / (totalSteps + 1)) * 100;

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setAnswers(JSON.parse(saved)); } catch {}
    }
  }, []);

  const select = (value: string) => {
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setTimeout(() => {
      if (stepIdx < totalSteps - 1) {
        setStepIdx(stepIdx + 1);
      } else {
        setShowEmailGate(true);
      }
    }, 280);
  };

  const back = () => {
    if (showEmailGate) { setShowEmailGate(false); return; }
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const submit = async (skipEmail = false) => {
    setSubmitting(true);
    const params = new URLSearchParams(answers as Record<string, string>);
    const target = `/quiz/result?${params.toString()}`;

    // Fire-and-forget newsletter signup with a hard timeout so it can never
    // block navigation (especially on mobile or in preview environments where
    // the /api endpoint may not be available).
    if (!skipEmail && email && /\S+@\S+\.\S+/.test(email)) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);
        fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "skin-ritual-quiz" }),
          signal: controller.signal,
          keepalive: true,
        })
          .catch(() => {})
          .finally(() => clearTimeout(timeout));
      } catch {}
    }

    // Navigate immediately — do not await the network call.
    nav(target);
  };

  const selected = answers[step.id as keyof QuizAnswers];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F4" }}>
      <SEO
        title="Skin Ritual Quiz — Find Your Zential Device"
        description="A 60-second quiz to map your skin's needs to a clinically-inspired ritual. Personalized device recommendation."
        canonicalUrl="/quiz"
      />
      <Header />

      {/* Progress */}
      <div className="sticky top-16 z-40 backdrop-blur-xl" style={{ backgroundColor: "rgba(251,248,244,0.85)" }}>
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2.5">
            <button
              onClick={back}
              disabled={stepIdx === 0 && !showEmailGate}
              className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-foreground/55 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={12} /> Back
            </button>
            <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/45">
              {showEmailGate ? "Final step" : `${stepIdx + 1} of ${totalSteps}`}
            </span>
          </div>
          <div className="h-[2px] bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: "#9B5A2E" }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {!showEmailGate ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6" style={{ backgroundColor: "#9B5A2E", opacity: 0.45 }} />
              <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#9B5A2E" }}>
                — {step.label} —
              </p>
            </div>

            <h1 className="font-serif italic text-[34px] md:text-5xl leading-[1.05] tracking-[-0.01em] text-foreground mb-4 text-balance">
              {step.question}
            </h1>
            <p className="text-base text-foreground/60 mb-10 leading-relaxed max-w-lg">
              {step.sub}
            </p>

            <div className="space-y-3">
              {step.options.map((opt) => {
                const isSelected = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => select(opt.id)}
                    className={`group w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-foreground bg-foreground/[0.04] shadow-md"
                        : "border-foreground/15 bg-background hover:border-foreground/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-serif italic text-xl text-foreground mb-1">{opt.label}</p>
                        <p className="text-[13px] text-foreground/55 leading-relaxed">{opt.desc}</p>
                      </div>
                      <div
                        className={`mt-1.5 h-6 w-6 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                          isSelected ? "border-foreground bg-foreground text-background" : "border-foreground/25"
                        }`}
                      >
                        {isSelected ? <Check size={12} strokeWidth={2.5} /> : <ArrowRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6" style={{ backgroundColor: "#9B5A2E", opacity: 0.45 }} />
              <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#9B5A2E" }}>— Almost there —</p>
            </div>
            <h1 className="font-serif italic text-[34px] md:text-5xl leading-[1.05] tracking-[-0.01em] text-foreground mb-4 text-balance">
              Where should we send your protocol?
            </h1>
            <p className="text-base text-foreground/60 mb-10 leading-relaxed max-w-lg">
              We'll save your personalized ritual and send a Day 1 → Day 90 guide. No spam, ever — unsubscribe in one click.
            </p>

            <div className="space-y-4 max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-full border border-foreground/15 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
              />
              <button
                onClick={() => submit(false)}
                disabled={submitting || !email}
                className="w-full py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                style={{ backgroundColor: "#2A211A" }}
              >
                {submitting ? "Building your ritual…" : "Reveal my ritual"}
              </button>
              <button
                onClick={() => submit(true)}
                disabled={submitting}
                className="w-full text-[11px] tracking-[0.2em] uppercase text-foreground/45 hover:text-foreground/70 transition-colors py-2"
              >
                Skip — show results without saving
              </button>
            </div>
          </>
        )}

        {/* Reassurance footer */}
        <div className="mt-16 pt-8 border-t border-foreground/10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-serif italic text-2xl text-foreground">60s</p>
            <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Average<br/>completion</p>
          </div>
          <div>
            <p className="font-serif italic text-2xl text-foreground">5</p>
            <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Calibration<br/>signals</p>
          </div>
          <div>
            <p className="font-serif italic text-2xl text-foreground">1</p>
            <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Personalized<br/>protocol</p>
          </div>
        </div>
      </main>
    </div>
  );
}
