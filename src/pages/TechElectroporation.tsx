import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const accent = "#c4714a";
const bg = "#1a1714";
const surface = "#242019";
const textPrimary = "#f0ebe3";
const textMuted = "#8a7f74";
const BORDER = "rgba(196,113,74,0.20)";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is electroporation in skincare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Electroporation uses pulsed electrical fields to create temporary micro-channels in the skin's cell membranes. These channels allow large molecules — hyaluronic acid, vitamin C, peptides, retinol — to penetrate the skin far deeper than topical application or iontophoresis allows. The channels close within minutes of the treatment ending, leaving the skin barrier intact.",
      },
    },
    {
      "@type": "Question",
      name: "How is electroporation different from iontophoresis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iontophoresis uses a continuous low-level electrical current to push charged molecules across the skin barrier. It works for small, charged molecules. Electroporation uses pulsed high-voltage electrical fields to temporarily open pores in the cell membrane itself, allowing much larger molecules — including uncharged ones — to cross. Electroporation achieves significantly deeper penetration for a broader range of ingredients.",
      },
    },
    {
      "@type": "Question",
      name: "Is electroporation safe for home use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Home electroporation devices operate at much lower energy levels than clinical devices. The mechanism is the same — pulsed electrical fields creating transient membrane permeability — but at parameters calibrated for safe daily use without professional supervision. The Zential Pure Frequency Wand includes electroporation in its Pore and Acne modes.",
      },
    },
    {
      "@type": "Question",
      name: "Which serums work best with electroporation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Water-based serums with active ingredients that benefit from deeper penetration: hyaluronic acid (for dermal hydration rather than surface moisture), vitamin C (for dermis-level collagen support), niacinamide, and peptides. Apply the serum before activating electroporation mode. Do not use oil-based products — they do not conduct.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I use electroporation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3–5 sessions per week is the standard protocol for home electroporation devices. Daily use is tolerated by most skin types. If sensitivity occurs, reduce to alternate days and ensure a conductive serum is applied before each session.",
      },
    },
  ],
};

export default function TechElectroporation() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: textPrimary }}>
      <SEO
        title="Electroporation Facial — How It Works and Why It Penetrates Deeper | Zential Pure"
        description="Electroporation uses pulsed electrical fields to open micro-channels in the cell membrane, delivering active ingredients deeper than any topical application. The mechanism, the evidence, and how to use it at home."
        canonicalUrl="/technology/electroporation"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 text-center" style={{ backgroundColor: bg }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold" style={{ color: accent }}>
              Technology · Mechanism
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6" style={{ color: textPrimary }}>
              Electroporation
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: textMuted }}>
              Most skincare never reaches the dermis. Electroporation changes that — not by breaking the barrier, but by opening it temporarily. Here is the mechanism, the evidence, and the protocol.
            </p>
          </div>
        </section>

        {/* Mechanism */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: surface }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              The mechanism
            </h2>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: textMuted }}>
              <p>
                The skin's outermost layer — the stratum corneum — is a tightly organized barrier. It keeps pathogens out. It also keeps most topically applied actives out. Molecules above approximately 500 Daltons in molecular weight cannot cross it by passive diffusion. Hyaluronic acid is 5,000–20,000 Da. Vitamin C (ascorbic acid) is 176 Da but is rapidly oxidized at the surface. Most peptides are far above the penetration threshold.
              </p>
              <p>
                Electroporation bypasses this problem by a different route. Pulsed electrical fields — applied in microsecond-to-millisecond bursts at controlled voltage — temporarily destabilize phospholipid bilayers in the cell membranes. This creates transient hydrophilic pores: micro-channels that persist for seconds to minutes, allowing larger molecules to move across the barrier.
              </p>
              <p>
                The channels are reversible. Once the electrical pulses stop, membrane integrity restores. The barrier closes. The molecules that entered during the open window remain in the tissue.
              </p>
              <p>
                This is not a theoretical mechanism. Electroporation is used clinically for electrochemotherapy — where the same pore-opening effect delivers chemotherapeutic agents directly into tumour cells. The skin application operates on identical physics at much lower energy parameters.
              </p>
              <p style={{ color: textMuted, fontSize: "0.75rem", borderLeft: `2px solid ${accent}`, paddingLeft: "1rem" }}>
                Denet A-R et al. "Skin electroporation for transdermal and topical delivery." Advanced Drug Delivery Reviews, 2004. — The primary review of electroporation mechanisms in skin delivery research.
              </p>
            </div>
          </div>
        </section>

        {/* vs Iontophoresis */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              Electroporation vs iontophoresis
            </h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <th className="text-left py-3 pr-6 font-medium text-xs tracking-widest uppercase" style={{ color: textMuted }}>Property</th>
                    <th className="text-center py-3 px-4 font-medium text-xs tracking-widest uppercase" style={{ color: accent }}>Electroporation</th>
                    <th className="text-center py-3 pl-4 font-medium text-xs tracking-widest uppercase" style={{ color: textMuted }}>Iontophoresis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Mechanism", "Opens membrane pores via pulsed voltage", "Pushes charged ions via continuous current"],
                    ["Molecule size limit", "Large (5,000+ Da)", "Small — typically under 500 Da"],
                    ["Charge requirement", "Works on uncharged molecules", "Requires charged (ionic) molecules"],
                    ["Penetration depth", "Dermis and beyond", "Epidermis to upper dermis"],
                    ["Serum types", "HA, peptides, vitamin C, niacinamide", "Ionized actives only"],
                    ["Sensation", "Brief surface tingle", "Faint tingle from current"],
                  ].map(([prop, electro, iono], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: i % 2 === 0 ? "rgba(196,113,74,0.04)" : "transparent" }}>
                      <td className="py-4 pr-6 text-xs tracking-wide font-medium" style={{ color: textMuted }}>{prop}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: textPrimary }}>{electro}</td>
                      <td className="py-4 pl-4 text-center text-sm" style={{ color: textMuted }}>{iono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
              Both technologies appear in Zential Pure devices. The Face Introducer uses iontophoresis (positive ion mode). The Frequency Wand uses electroporation in Pore and Acne modes. They are not competing technologies — they serve different ingredient profiles and penetration goals.
            </p>
          </div>
        </section>

        {/* Protocol */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: surface }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              Protocol for home electroporation
            </h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Cleanse completely", body: "The skin must be free of surface oils, sunscreen, and residual product. Oil on the surface disrupts electrical conductivity. The electroporation current needs a clear path to the membrane." },
                { step: "02", title: "Apply your serum first", body: "The serum goes on before you activate electroporation mode — not after. The micro-channels open during pulsing. The molecules need to be present at the surface when the window opens. Water-based formulations only." },
                { step: "03", title: "Activate electroporation mode", body: "On the Frequency Wand, this is Pore mode (blue + electroporation) or Acne mode (purple + electroporation). Run 3–5 minutes across the treatment zone. You will feel a brief surface tingle — that is normal and confirms current delivery." },
                { step: "04", title: "Do not rinse", body: "After the session, do not rinse the face. The serums that entered the tissue should remain. A light moisturiser on top is acceptable — it will not displace what has already penetrated." },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-6" style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem" }}>
                  <span className="font-serif text-2xl font-medium shrink-0 w-8" style={{ color: accent }}>{step}</span>
                  <div>
                    <h3 className="font-medium text-sm tracking-wide mb-2" style={{ color: textPrimary }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              Common questions
            </h2>
            <div className="space-y-8">
              {faqJsonLd.mainEntity.map((item, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem" }}>
                  <h3 className="font-medium text-base mb-3" style={{ color: textPrimary }}>{item.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 text-center" style={{ backgroundColor: surface }}>
          <div className="max-w-xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold" style={{ color: accent }}>
              Frequency Wand · €147
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: textPrimary }}>
              Electroporation in Pore and Acne modes.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: textMuted }}>
              Five protocols. EMS · 5-spectrum LED · Electroporation · Vibration. One instrument.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product/color-light-import-micro-current-vibration-massager"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase"
                style={{ backgroundColor: accent, color: bg }}
              >
                Order the Frequency Wand
              </Link>
              <Link
                to="/technology/iontophoresis"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase border"
                style={{ borderColor: accent, color: accent }}
              >
                Read: Iontophoresis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
