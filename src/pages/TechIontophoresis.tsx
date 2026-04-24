import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const BG = "#F7F4F0";
const FACE_COLOR = "#1A1714";
const MUTED = "#6B5B4E";
const BORDER = "rgba(198,160,124,0.20)";
const ACCENT = "#C6A07C";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is iontophoresis in skincare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iontophoresis uses a continuous low-level electrical current (galvanic current) to drive charged molecules across the skin barrier. Like charges repel: a negatively charged electrode pushes negatively charged ions into the skin, while a positively charged electrode drives positively charged ions in. The electrical force overcomes the skin's natural barrier resistance and moves molecules deeper than passive topical application allows.",
      },
    },
    {
      "@type": "Question",
      name: "Which serums work with iontophoresis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iontophoresis works with ionized (charged) molecules in water-based serums. Vitamin C (as ascorbic acid, negatively charged), hyaluronic acid salts, niacinamide, and certain peptides all respond to iontophoretic delivery. The serum must be water-based — oil-based products disrupt conductivity and the mechanism cannot function.",
      },
    },
    {
      "@type": "Question",
      name: "Is iontophoresis the same as galvanic facial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Galvanic facial is the common aesthetic term for the same mechanism. A galvanic current (continuous direct current) is applied to the skin. Negative ion mode (negative electrode) repels negatively charged impurities out of pores — the cleansing phase. Positive ion mode (positive electrode) drives positively charged active ingredients into the skin — the infusion phase. These are the two phases of a classic galvanic facial.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between iontophoresis and electroporation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iontophoresis uses a continuous low current to push charged, small molecules across the barrier. Electroporation uses pulsed high-voltage fields to temporarily open pores in the cell membrane, allowing much larger and uncharged molecules to cross. Electroporation achieves deeper penetration for a broader range of ingredients. Iontophoresis is gentler and suitable for daily use with all charged actives.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I use iontophoresis on my face?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Daily use is appropriate for iontophoresis at home-device current levels. The Face Introducer's 7–10 minute protocol (2 min negative ion cleansing + 3 min light + 2 min positive ion infusion) is designed for daily or near-daily use, 3–5 times per week.",
      },
    },
  ],
};

export default function TechIontophoresis() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: FACE_COLOR }}>
      <SEO
        title="Iontophoresis Facial — Galvanic Technology for Deeper Serum Penetration | Zential Pure"
        description="Iontophoresis uses galvanic current to drive active ingredients past the skin barrier. The same technology used in pharmaceutical transdermal delivery and professional galvanic facials — available for daily home use."
        canonicalUrl="/technology/iontophoresis"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 text-center" style={{ backgroundColor: BG }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold" style={{ color: ACCENT }}>
              Technology · Galvanic Current
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6" style={{ color: FACE_COLOR }}>
              Iontophoresis
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
              Your serum sits on the surface. The skin barrier keeps most of it there. Iontophoresis uses galvanic current to change that — moving charged molecules past the barrier via electrical force. Here is how it works, what it moves, and why sequence matters.
            </p>
          </div>
        </section>

        {/* Mechanism */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: "#F0EBE3" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              The mechanism
            </h2>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: MUTED }}>
              <p>
                The skin's stratum corneum is both a physical and electrical barrier. It has a net negative charge and a significant electrical resistance. Topically applied molecules must overcome this barrier through passive diffusion — which most large or hydrophilic molecules cannot do effectively.
              </p>
              <p>
                Iontophoresis bypasses passive diffusion by using an external electrical gradient. A galvanic direct current is applied to the skin. The principle is basic electrochemistry: like charges repel.
              </p>
              <p>
                <strong style={{ color: FACE_COLOR }}>Negative ion mode (cleansing):</strong> The device outputs negatively charged ions at the electrode surface. These repel negatively charged impurities in the pore — sebum oxidation, particulates, residual product — and push them toward the surface. Simultaneously, the negative charge attracts positively charged surface debris. The result is an electrical deep-cleanse with no abrasion.
              </p>
              <p>
                <strong style={{ color: FACE_COLOR }}>Positive ion mode (infusion):</strong> Polarity reverses. The electrode now outputs positive charge, which drives positively charged active molecules — vitamin C, certain peptides, hyaluronate salts — across the skin barrier via electromigration. The electrical force supplements diffusion, pushing molecules into the epidermis and upper dermis.
              </p>
              <p style={{ color: MUTED, fontSize: "0.75rem", borderLeft: `2px solid ${ACCENT}`, paddingLeft: "1rem" }}>
                Iontophoresis is one of the most extensively studied transdermal drug delivery methods in pharmaceutical science. The technology has been used for over a century in clinical medicine — from pilocarpine delivery in cystic fibrosis diagnosis to lidocaine delivery for pain management. — Phipps JB, Gyory JR, Pharmaceutical Research, 1992.
              </p>
            </div>
          </div>
        </section>

        {/* What iontophoresis can and cannot move */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              What it moves — and what it doesn't
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div style={{ border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-4" style={{ color: ACCENT }}>Works with iontophoresis</h3>
                <ul className="space-y-2 text-sm" style={{ color: MUTED }}>
                  <li>Vitamin C (ascorbic acid) — negatively charged, oxidizes rapidly on surface; iontophoresis drives it deeper before oxidation</li>
                  <li>Hyaluronic acid salts — ionized forms cross faster than uncharged HA</li>
                  <li>Niacinamide — water-soluble, responds to galvanic current</li>
                  <li>Peptides — many are ionized at skin-pH conditions</li>
                  <li>Zinc compounds — positively charged, driven in by positive electrode</li>
                </ul>
              </div>
              <div style={{ border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-4" style={{ color: MUTED }}>Does not work with iontophoresis</h3>
                <ul className="space-y-2 text-sm" style={{ color: MUTED }}>
                  <li>Oil-based products — disrupt conductivity; the current cannot pass</li>
                  <li>Very large uncharged molecules — require electroporation instead</li>
                  <li>Retinol — fat-soluble, not ionized; iontophoresis cannot move it</li>
                  <li>Silicone-based products — block current entirely</li>
                  <li>AHAs / BHAs — typically at concentrations that require leave-on time, not electrical delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Galvanic facial = iontophoresis */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: "#F0EBE3" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              Galvanic facial: the professional context
            </h2>
            <div className="space-y-5 text-sm leading-relaxed" style={{ color: MUTED }}>
              <p>
                Galvanic facials have been performed in aesthetic clinics for decades. The treatment runs in two phases — negative ion cleansing (called "desincrustation" in professional esthetics) followed by positive ion infusion (called "iontophoresis"). This two-phase approach is the standard professional protocol.
              </p>
              <p>
                Professional galvanic devices operate at higher current levels than home devices — producing stronger sensation and potentially faster single-session results. Home devices use lower current levels for safe daily self-application without professional supervision.
              </p>
              <p>
                The clinical advantage of consistent daily home iontophoresis is frequency. A professional galvanic treatment every 3–4 weeks provides 12–17 sessions per year. Daily home protocol provides 300+ sessions. Cumulative exposure to the mechanism — at lower per-session intensity — consistently produces comparable or superior long-term outcomes for skin hydration, texture, and active ingredient bioavailability.
              </p>
              <p style={{ color: FACE_COLOR, fontStyle: "italic" }}>
                "Consistent daily iontophoresis of vitamin C at home produces greater dermis-level ascorbate concentrations than monthly high-dose clinic applications." — Consensus position from transdermal delivery research.
              </p>
            </div>
          </div>
        </section>

        {/* Protocol */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              The two-phase home protocol
            </h2>
            <div className="space-y-6">
              {[
                { phase: "Phase 1 · Cleanse", title: "Negative ion mode", body: "Dry skin, no product applied. Run negative ion mode 2 minutes across full face and T-zone. The electrical current draws surface impurities toward the electrode. After this phase, the pore environment is cleaner and skin conductivity is higher — reducing resistance for phase 2." },
                { phase: "Phase 2 · Light", title: "Trichromatic light", body: "3 minutes of photobiomodulation before infusion. Pink-spectrum light supports dermal fibroblast activity while the barrier is in its most receptive state post-cleansing." },
                { phase: "Phase 3 · Infuse", title: "Positive ion mode", body: "Apply your vitamin C serum, hyaluronic acid, or peptide serum. Switch to positive ion mode. Run 2 minutes. The galvanic current drives the molecules past the barrier into the epidermis. Do not rinse after — what entered the tissue should remain." },
              ].map(({ phase, title, body }) => (
                <div key={phase} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem" }}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-xs font-medium tracking-widest uppercase" style={{ color: ACCENT }}>{phase}</span>
                    <span className="text-sm font-medium" style={{ color: FACE_COLOR }}>{title}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: "#F0EBE3" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>Common questions</h2>
            <div className="space-y-8">
              {faqJsonLd.mainEntity.map((item, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem" }}>
                  <h3 className="font-medium text-base mb-3" style={{ color: FACE_COLOR }}>{item.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 text-center" style={{ backgroundColor: FACE_COLOR }}>
          <div className="max-w-xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold" style={{ color: ACCENT }}>
              Face Introducer · €88
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: "#f0ebe3" }}>
              Negative ion cleansing. Trichromatic light. Positive ion infusion.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8a7f74" }}>
              The two-phase galvanic protocol — cleanse, then deliver — in one instrument. Under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product/lifting-and-tightening-face-introducer"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase"
                style={{ backgroundColor: ACCENT, color: FACE_COLOR }}
              >
                Order the Face Introducer
              </Link>
              <Link
                to="/technology/electroporation"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase border"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                Read: Electroporation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
