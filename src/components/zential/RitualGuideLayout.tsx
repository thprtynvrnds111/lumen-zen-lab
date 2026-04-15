import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

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

export interface RitualStep {
  num: string;
  mode: string;
  param: string;
  duration: string;
  what: string;
  sensation: string;
}

export interface RitualGuideConfig {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  heroHeading: React.ReactNode;
  heroSubline: string;
  heroImage?: string;
  heroCaption?: string;
  prepItems: { title: string; desc: string }[];
  steps: RitualStep[];
  frequencyText: string;
  afterItems: { title: string; desc: string }[];
  contraindications: string[];
}

export default function RitualGuideLayout({ config }: { config: RitualGuideConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SEO title={config.seoTitle} description={config.seoDescription} canonicalUrl={config.canonicalUrl} />

      <a
        href="https://zentialpure.com"
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 text-xs tracking-wide transition-opacity hover:opacity-100"
        style={{ color: textMuted, opacity: 0.7 }}
      >
        <ArrowLeft size={14} />
        Back to site
      </a>

      {/* HERO */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-20 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: accent }}>
          The Ritual Guide
        </p>
        <h1 className="font-serif italic text-3xl md:text-5xl lg:text-6xl mb-5 leading-tight" style={{ fontFamily: "'Lora', 'Playfair Display', Georgia, serif" }}>
          {config.heroHeading}
        </h1>
        <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: textMuted }}>
          {config.heroSubline}
        </p>
        <div className="mt-10 mx-auto max-w-xs h-px" style={{ backgroundColor: divider }} />

        {config.heroImage && (
          <div className="mt-12 mx-auto w-full max-w-[900px]">
            <div className="relative rounded-[4px] overflow-hidden">
              <img
                src={config.heroImage}
                alt={config.seoTitle}
                className="w-full aspect-[3/2] object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${bg}, transparent)` }}
              />
            </div>
            {config.heroCaption && (
              <p className="text-xs mt-3 text-center tracking-wide" style={{ color: textMuted }}>
                {config.heroCaption}
              </p>
            )}
          </div>
        )}
      </Section>

      {/* BEFORE YOU BEGIN */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif italic text-2xl md:text-3xl mb-12 text-center" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            Before You Begin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.prepItems.map((item) => (
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

      {/* THE SEQUENCE */}
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
            {config.steps.map((step) => (
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
                  <p><span style={{ color: textPrimary }} className="font-medium">Duration:</span> {step.duration}</p>
                  <p><span style={{ color: textPrimary }} className="font-medium">What it does:</span> {step.what}</p>
                  <p><span style={{ color: textPrimary }} className="font-medium">Sensation:</span> {step.sensation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FREQUENCY */}
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
              {config.frequencyText}
            </p>
          </div>
        </div>
      </Section>

      {/* AFTER YOUR SESSION */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif italic text-2xl md:text-3xl mb-12 text-center" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            After Your Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.afterItems.map((item) => (
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

      {/* CONTRAINDICATIONS */}
      <Section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif italic text-xl md:text-2xl mb-6" style={{ fontFamily: "'Lora', Georgia, serif", color: textMuted }}>
            When not to use it
          </h2>
          <ul className="space-y-3 text-sm" style={{ color: textMuted }}>
            {config.contraindications.map((c) => (
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

      {/* FOOTER CTA */}
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
