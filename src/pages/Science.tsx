import { SEO } from "@/components/SEO";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const accent = "#c4714a";
const bg = "#1a1714";
const surface = "#242019";
const textPrimary = "#f0ebe3";
const textMuted = "#8a7f74";

interface TechSection {
  name: string;
  param: string;
  mechanism: string;
  quote: string;
  citation: string;
  url: string;
  alt?: boolean;
}

const sections: TechSection[] = [
  {
    name: "Red Light Therapy",
    param: "630–660nm wavelength",
    mechanism:
      "Photobiomodulation activates mitochondrial activity in skin cells, stimulating ATP production and collagen synthesis.",
    quote:
      "In a controlled trial, red light at 630nm produced significant improvement in skin roughness and collagen density after 30 sessions.",
    citation: "Wunsch & Matuschka, Photomedicine and Laser Surgery, 2014",
    url: "https://doi.org/10.1089/pho.2013.3616",
  },
  {
    name: "Microcurrent",
    param: "200–400\u03bcA sub-sensory frequency",
    mechanism:
      "Mirrors the body\u2019s own bioelectric signals to stimulate ATP production and re-educate facial muscles.",
    quote:
      "Electrical currents in the microampere range stimulated ATP generation by up to 500% and amino acid transport by up to 40% in rat skin tissue.",
    citation: "Cheng et al, Clinical Orthopaedics, 1982",
    url: "https://pubmed.ncbi.nlm.nih.gov/7126681",
    alt: true,
  },
  {
    name: "EMS",
    param: "250\u03bcs pulse width, multi-frequency",
    mechanism:
      "Electrical pulses stimulate facial muscle contraction and release, retraining muscle tone over time.",
    quote:
      "Neuromuscular electrical stimulation produces measurable increases in muscle strength and tone with consistent application.",
    citation:
      "Porcari et al, Journal of Strength & Conditioning Research, 2002",
    url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+muscle+tone+facial",
  },
  {
    name: "Thermal",
    param: "40\u201342\u00b0C controlled heat",
    mechanism:
      "Gentle thermal energy increases local circulation, relaxes fascial tissue, and enhances absorption of active ingredients applied before or during treatment.",
    quote:
      "Thermal therapy at 40\u201342\u00b0C significantly increases dermal blood flow and transdermal absorption of topical agents.",
    citation: "",
    url: "https://scholar.google.com/scholar?q=thermal+therapy+skin+absorption+40+degrees",
    alt: true,
  },
];

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

function TechBlock({ section }: { section: TechSection }) {
  const blockBg = section.alt ? surface : bg;
  return (
    <Section
      className="px-6 md:px-12 lg:px-20 py-20 md:py-28"
    >
      <div
        className="max-w-3xl mx-auto"
        style={{ backgroundColor: blockBg }}
      >
        {/* Label */}
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold"
          style={{ color: accent }}
        >
          {section.name}
        </p>

        {/* Parameter */}
        <p
          className="text-xs tracking-wide mb-8 font-mono"
          style={{ color: textMuted }}
        >
          {section.param}
        </p>

        {/* Mechanism */}
        <p
          className="text-sm md:text-base leading-relaxed mb-10"
          style={{ color: textPrimary }}
        >
          {section.mechanism}
        </p>

        {/* Quoted finding */}
        <blockquote
          className="rounded-xl p-6 md:p-8 mb-6"
          style={{
            backgroundColor: section.alt ? bg : surface,
            borderLeft: `3px solid ${accent}`,
          }}
        >
          <p
            className="text-sm md:text-base italic leading-relaxed mb-3"
            style={{ color: textPrimary, fontFamily: "'Lora', Georgia, serif" }}
          >
            &ldquo;{section.quote}&rdquo;
          </p>
          {section.citation && (
            <p className="text-xs" style={{ color: textMuted }}>
              {section.citation}
            </p>
          )}
        </blockquote>

        {/* Link */}
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-80"
          style={{ color: accent }}
        >
          Read the study <ExternalLink size={13} />
        </a>
      </div>
    </Section>
  );
}

export default function Science() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: bg,
        color: textPrimary,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <SEO
        title="The Science Behind Zential Pure"
        description="Peer-reviewed research behind Red Light, Microcurrent, EMS and Thermal technology used in Zential Pure devices."
        canonicalUrl="/science"
      />

      {/* Back link */}
      <Link
        to="/"
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 text-xs tracking-wide transition-opacity hover:opacity-100"
        style={{ color: textMuted, opacity: 0.7 }}
      >
        <ArrowLeft size={14} />
        Back to site
      </Link>

      {/* Hero */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-20 text-center px-6">
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-5"
          style={{ color: accent }}
        >
          Research
        </p>
        <h1
          className="font-serif italic text-3xl md:text-5xl lg:text-6xl mb-5 leading-tight"
          style={{ fontFamily: "'Lora', 'Playfair Display', Georgia, serif" }}
        >
          The Science Behind<br className="hidden md:block" /> Zential Pure
        </h1>
        <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: textMuted }}>
          We don't ask you to trust us. We show you the research.
        </p>
        <div
          className="mt-10 mx-auto max-w-xs h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
      </Section>

      {/* Tech sections */}
      {sections.map((s) => (
        <div key={s.name} style={{ backgroundColor: s.alt ? surface : bg }}>
          <TechBlock section={s} />
        </div>
      ))}

      {/* Disclaimer footer */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 text-center">
        <div
          className="mx-auto max-w-xs h-px mb-10"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
        <p
          className="text-xs leading-relaxed max-w-md mx-auto"
          style={{ color: textMuted, opacity: 0.7 }}
        >
          These studies support the mechanisms our devices use.
          They do not constitute medical claims.
          Zential Pure devices are for cosmetic use only.
        </p>
      </section>
    </div>
  );
}