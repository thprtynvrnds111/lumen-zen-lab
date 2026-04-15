import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import ritualHeroImg from "@/assets/ritual-guide-hero.png";

const accent = "#c4714a";
const bg = "#1a1714";
const surface = "#242019";
const textPrimary = "#f0ebe3";
const textMuted = "#8a7f74";
const divider = "rgba(255,255,255,0.08)";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className={`px-6 md:px-12 lg:px-20 ${className}`}>
      {children}
    </section>
  );
}

const prepItems = [
  { title: "Cleanse", desc: "Start on clean, dry skin. No moisturizer yet." },
  { title: "Gel", desc: "Apply the included conductive gel to areas you'll treat." },
  { title: "Space", desc: "Set aside 5–10 minutes. No rushing the ritual." },
];

const steps = [
  {
    num: "01",
    mode: "Thermal Warm-Up",
    param: "40–42°C gentle heat",
    duration: "60 seconds",
    what: "Increases blood circulation and prepares tissue for deeper penetration of subsequent modes.",
    sensation: "Gentle, steady warmth. Like holding a warm stone against your skin.",
  },
  {
    num: "02",
    mode: "Red Light",
    param: "630–660nm wavelength",
    duration: "90 seconds",
    what: "Stimulates fibroblast activity to support collagen synthesis at the cellular level.",
    sensation: "Subtle warmth and light. Fully comfortable throughout.",
  },
  {
    num: "03",
    mode: "Microcurrent",
    param: "Low-frequency electrical current, sub-sensory threshold",
    duration: "60 seconds per zone (forehead, cheeks, jawline)",
    what: "Re-educates facial muscles. Clinically used for facial contouring and lift.",
    sensation: "A faint tingling or nothing at all. If it feels uncomfortable, reduce contact pressure.",
  },
  {
    num: "04",
    mode: "EMS Finish",
    param: "Electrical muscle stimulation",
    duration: "60 seconds",
    what: "Produces gentle muscle contractions to tone and firm. Completes the four-modality cycle.",
    sensation: "A light pulse. Normal. Adjust intensity with the side button.",
  },
];

const afterItems = [
  { title: "Rinse", desc: "Remove any remaining gel with warm water." },
  { title: "Serum", desc: "Apply your preferred serum immediately. Absorption is highest right after treatment." },
  { title: "SPF", desc: "Always finish your morning ritual with SPF. Red light increases photosensitivity slightly." },
];

const contraindications = [
  "Active skin infections or open wounds in treatment area",
  "Pregnancy",
  "Implanted electronic devices (pacemakers, cochlear implants)",
  "Epilepsy (due to light pulses)",
  "Metal implants in the face",
];

export default function RitualGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SEO
        title="Ritual Guide — Face Introducer | Zential Pure"
        description="Step-by-step ritual guide for the Zential Pure Face Introducer. Four technologies. One sequence. Five minutes."
        canonicalUrl="/ritual-guide"
      />

      {/* Sticky back link */}
      <a
        href="https://zentialpure.com"
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 text-xs tracking-wide transition-opacity hover:opacity-100"
        style={{ color: textMuted, opacity: 0.7 }}
      >
        <ArrowLeft size={14} />
        Back to site
      </a>

      {/* 1 — HERO */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-20 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: accent }}>
          The Ritual Guide
        </p>
        <h1 className="font-serif italic text-3xl md:text-5xl lg:text-6xl mb-5 leading-tight" style={{ fontFamily: "'Lora', 'Playfair Display', Georgia, serif" }}>
          Your Face Introducer.<br className="hidden md:block" /> How to use it.
        </h1>
        <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: textMuted }}>
          Four technologies. One sequence. Five minutes.
        </p>
        <div className="mt-10 mx-auto max-w-xs h-px" style={{ backgroundColor: divider }} />

        {/* Hero image */}
        <div className="mt-12 mx-auto w-full max-w-[900px]">
          <div className="relative rounded-[4px] overflow-hidden">
            <img
              src={ritualHeroImg}
              alt="Model using the Zential Pure Face Introducer"
              className="w-full aspect-[3/2] object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${bg}, transparent)` }}
            />
          </div>
          <p className="text-xs mt-3 text-center tracking-wide" style={{ color: textMuted }}>
            Face Introducer — used 5× per week
          </p>
        </div>

      {/* 2 — BEFORE YOU BEGIN */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif italic text-2xl md:text-3xl mb-12 text-center" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Before You Begin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {prepItems.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-sm font-semibold tracking-wide uppercase mb-2" style={{ color: accent }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 — THE SEQUENCE */}
      <Section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif italic text-2xl md:text-3xl mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              The Sequence
            </h2>
            <p className="text-sm" style={{ color: textMuted }}>
              Use each mode in order. Each builds on the last.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-xl p-6 md:p-8"
                style={{ backgroundColor: surface, borderLeft: `3px solid ${accent}` }}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-2xl md:text-3xl font-serif italic" style={{ color: accent, fontFamily: "'Lora', Georgia, serif" }}>
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-wide uppercase" style={{ color: textPrimary }}>
                      {step.mode}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>{step.param}</p>
                  </div>
                </div>
                <div className="ml-0 md:ml-12 space-y-3 text-sm leading-relaxed" style={{ color: textMuted }}>
                  <p>
                    <span style={{ color: textPrimary }} className="font-medium">Duration:</span> {step.duration}
                  </p>
                  <p>
                    <span style={{ color: textPrimary }} className="font-medium">What it does:</span> {step.what}
                  </p>
                  <p>
                    <span style={{ color: textPrimary }} className="font-medium">Sensation:</span> {step.sensation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4 — FREQUENCY */}
      <Section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-xl p-8 md:p-10"
            style={{ border: `1px solid ${accent}40`, backgroundColor: `${accent}08` }}
          >
            <h2 className="font-serif italic text-xl md:text-2xl mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              How often?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
              5 sessions per week for the first 4 weeks. After that, 3 sessions per week as maintenance.
              Consistency matters more than intensity.
            </p>
          </div>
        </div>
      </Section>

      {/* 5 — AFTER YOUR SESSION */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif italic text-2xl md:text-3xl mb-12 text-center" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            After Your Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {afterItems.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-sm font-semibold tracking-wide uppercase mb-2" style={{ color: accent }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6 — CONTRAINDICATIONS */}
      <Section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif italic text-xl md:text-2xl mb-6" style={{ fontFamily: "'Lora', Georgia, serif", color: textMuted }}>
            When not to use it
          </h2>
          <ul className="space-y-3 text-sm" style={{ color: textMuted }}>
            {contraindications.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: textMuted }} />
                {c}
              </li>
            ))}
          </ul>
          <p className="text-xs mt-6 italic" style={{ color: textMuted, opacity: 0.7 }}>
            If in doubt, consult your doctor first.
          </p>
        </div>
      </Section>

      {/* 7 — FOOTER CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto max-w-xs h-px mb-10" style={{ backgroundColor: divider }} />
          <p className="text-sm mb-2" style={{ color: textMuted }}>Questions about your device?</p>
          <a
            href="mailto:info@zentialpure.com"
            className="text-sm underline underline-offset-4 transition-colors hover:opacity-80"
            style={{ color: accent }}
          >
            Email us at info@zentialpure.com
          </a>
        </div>
      </section>
    </div>
  );
}
