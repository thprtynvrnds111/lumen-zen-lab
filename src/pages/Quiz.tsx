import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { quizSteps, type QuizAnswers } from "@/data/quizData";
import quizPause from "@/assets/editorial/quiz-pause.webp";

const STORAGE_KEY = "zential.quiz.answers";

export default function Quiz() {
 const nav = useNavigate();
 const { t } = useTranslation('quiz');
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

  nav(target);
 };

 const selected = answers[step.id as keyof QuizAnswers];

 const footerCompletionLabel = t('footer.completionLabel').split('\n');
 const footerSignalsLabel = t('footer.signalsLabel').split('\n');
 const footerProtocolLabel = t('footer.protocolLabel').split('\n');

 return (
  <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
   <SEO
    title="Skin Ritual Quiz, Find Your Zential Device"
    description="A 60-second quiz to map your skin's needs to a clinically-inspired ritual. Personalized device recommendation."
    canonicalUrl="/quiz"
   />
   <Header />

   {/* Editorial opening band, the pause before knowing */}
   <section className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 32vh, 360px)' }} aria-hidden>
    <img
     src={quizPause}
     alt=""
     loading="eager"
     className="absolute inset-0 w-full h-full object-cover"
     style={{ objectPosition: 'center 30%', filter: 'saturate(0.92)' }}
    />
    <div
     className="absolute inset-0 pointer-events-none"
     style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.35) 100%)' }}
    />
    <div
     className="absolute inset-0 pointer-events-none"
     style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.55) 0%, transparent 45%)' }}
    />
    <div className="absolute inset-0 flex items-center px-6 md:px-14">
     <p
      className="font-sans font-light tracking-[-0.02em] max-w-md text-balance"
      style={{
       fontSize: 'clamp(18px, 2.4vw, 30px)',
       lineHeight: 1.25,
       color: '#141414',
       letterSpacing: '-0.02em',
      }}
     >
      The pause before knowing.
      <br />
      <span style={{ color: 'rgba(20,20,20,0.55)' }}>
       Sixty seconds to your protocol.
      </span>
     </p>
    </div>
   </section>

   {/* Progress */}
   <div className="sticky top-16 z-40 backdrop-blur-xl" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
    <div className="max-w-2xl mx-auto px-6 py-4">
     <div className="flex items-center justify-between mb-2.5">
      <button
       onClick={back}
       disabled={stepIdx === 0 && !showEmailGate}
       className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-foreground/55 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
       <ArrowLeft size={12} /> {t('back')}
      </button>
      <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/45">
       {showEmailGate ? t('finalStep') : t('stepOf', { step: stepIdx + 1, total: totalSteps })}
      </span>
     </div>
     <div className="h-[2px] bg-foreground/10 rounded-full overflow-hidden">
      <div
       className="h-full transition-all duration-500 ease-out"
       style={{ width: `${progress}%`, backgroundColor: "#0E7A54" }}
      />
     </div>
    </div>
   </div>

   <main className="max-w-2xl mx-auto px-6 py-12 md:py-20">
    {!showEmailGate ? (
     <>
      <div className="flex items-center gap-3 mb-5">
       <span className="h-px w-6" style={{ backgroundColor: "#0E7A54", opacity: 0.45 }} />
       <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#0E7A54" }}>
       , {step.label} 
       </p>
      </div>

      <h1 className="font-sans font-light text-[34px] md:text-5xl leading-[1.05] tracking-[-0.03em] text-foreground mb-4 text-balance">
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
          className={`group w-full text-left px-6 py-5 rounded-none border transition-all duration-300 hover:-translate-y-0.5 ${
           isSelected
            ? "border-[#0E7A54] bg-[#F4FBF8] shadow-sm"
            : "border-[rgba(20,20,20,0.10)] bg-white hover:border-[rgba(20,20,20,0.35)] hover:shadow-sm"
          }`}
         >
          <div className="flex items-start justify-between gap-4">
           <div className="flex-1">
            <p className="font-sans text-xl font-medium tracking-[-0.015em] text-foreground mb-1">{opt.label}</p>
            <p className="text-[13px] text-foreground/55 leading-relaxed">{opt.desc}</p>
           </div>
           <div
            className={`mt-1.5 h-6 w-6 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
             isSelected ? "border-[#0E7A54] bg-[#0E7A54] text-white" : "border-foreground/25"
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
       <span className="h-px w-6" style={{ backgroundColor: "#0E7A54", opacity: 0.45 }} />
       <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#0E7A54" }}> {t('emailGate.eyebrow')} </p>
      </div>
      <h1 className="font-sans font-light text-[34px] md:text-5xl leading-[1.05] tracking-[-0.03em] text-foreground mb-4 text-balance">
       {t('emailGate.headline')}
      </h1>
      <p className="text-base text-foreground/60 mb-10 leading-relaxed max-w-lg">
       {t('emailGate.sub')}
      </p>

      <div className="space-y-4 max-w-md">
       <input
        type="email"
        placeholder={t('emailGate.placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-5 py-4 rounded-full border border-foreground/15 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
       />
       <button
        onClick={() => submit(false)}
        disabled={submitting || !email}
        className="w-full py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-semibold text-[#141414] rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        style={{ backgroundColor: "#2ED8A8" }}
       >
        {submitting ? t('emailGate.submitting') : t('emailGate.submit')}
       </button>
       <button
        onClick={() => submit(true)}
        disabled={submitting}
        className="w-full text-[11px] tracking-[0.2em] uppercase text-foreground/45 hover:text-foreground/70 transition-colors py-2"
       >
        {t('emailGate.skip')}
       </button>
      </div>
     </>
    )}

    {/* Reassurance footer */}
    <div className="mt-16 pt-8 border-t border-foreground/10 grid grid-cols-3 gap-4 text-center">
     <div>
      <p className="font-sans font-light tracking-[-0.02em] text-2xl text-foreground">{t('footer.completion')}</p>
      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">
       {footerCompletionLabel[0]}<br />{footerCompletionLabel[1]}
      </p>
     </div>
     <div>
      <p className="font-sans font-light tracking-[-0.02em] text-2xl text-foreground">{t('footer.signals')}</p>
      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">
       {footerSignalsLabel[0]}<br />{footerSignalsLabel[1]}
      </p>
     </div>
     <div>
      <p className="font-sans font-light tracking-[-0.02em] text-2xl text-foreground">{t('footer.protocol')}</p>
      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">
       {footerProtocolLabel[0]}<br />{footerProtocolLabel[1]}
      </p>
     </div>
    </div>
   </main>
  </div>
 );
}
