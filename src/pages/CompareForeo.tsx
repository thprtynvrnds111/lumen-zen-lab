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
      name: "Is the FOREO BEAR better than the Zential Pure Frequency Wand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They use different mechanisms. The FOREO BEAR uses T-Sonic pulsations and microcurrent. The Zential Pure Frequency Wand uses EMS microcurrent combined with 5-spectrum LED therapy, electroporation, and vibration — four distinct technologies versus two. The FOREO BEAR retails at approximately €269–349. The Frequency Wand is €147.",
      },
    },
    {
      "@type": "Question",
      name: "Does FOREO BEAR use EMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The FOREO BEAR uses microcurrent technology. It does not include EMS muscle stimulation, LED light therapy, or electroporation. These modalities are present in the Zential Pure Frequency Wand.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price difference between FOREO BEAR and Zential Pure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The FOREO BEAR retails at approximately €269–349 depending on the model. The Zential Pure Frequency Wand is €147 — a difference of €122–202 for a device with a broader technology stack.",
      },
    },
    {
      "@type": "Question",
      name: "Can the Frequency Wand replace the FOREO BEAR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For microcurrent toning, both deliver the mechanism. The Frequency Wand adds 5-spectrum LED therapy (red, blue, green, orange, purple), electroporation for deeper serum delivery, and vibration for lymphatic drainage — modalities the FOREO BEAR does not include.",
      },
    },
    {
      "@type": "Question",
      name: "Is FOREO a better brand than Zential Pure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FOREO has significantly more brand recognition and a larger public review base. Zential Pure is a newer brand. If established reputation is your primary criterion, FOREO has the advantage. If technology breadth and price are your criteria, the Frequency Wand delivers more modalities at a lower price point.",
      },
    },
  ],
};

const rows = [
  { feature: "Technology", zential: "EMS microcurrent · 5-spectrum LED · Electroporation · Vibration", foreo: "T-Sonic pulsations · Microcurrent" },
  { feature: "LED light therapy", zential: "5 wavelengths (red, blue, green, orange, purple)", foreo: "None" },
  { feature: "Electroporation", zential: "Yes — modes 4 & 5", foreo: "No" },
  { feature: "EMS", zential: "Yes — modes 1, 2, 3", foreo: "No" },
  { feature: "Microcurrent", zential: "Yes", foreo: "Yes" },
  { feature: "Vibration", zential: "Yes — all modes", foreo: "T-Sonic (ultrasound-style)" },
  { feature: "Waterproof", zential: "IPX3", foreo: "IPX7" },
  { feature: "Price", zential: "€147", foreo: "€269–349" },
  { feature: "Session time", zential: "3–5 min per mode", foreo: "2 min (app-guided)" },
  { feature: "App required", zential: "No", foreo: "Yes (Bluetooth)" },
];

export default function CompareForeo() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: FACE_COLOR }}>
      <SEO
        title="FOREO BEAR Alternative — Frequency Wand vs FOREO BEAR | Zential Pure"
        description="Comparing the Zential Pure Frequency Wand (€147) and the FOREO BEAR (€269–349). Five technologies vs two. An honest breakdown of what each device actually does."
        canonicalUrl="/compare/foreo-bear-vs-zential-pure"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center" style={{ backgroundColor: BG }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold" style={{ color: ACCENT }}>
              Device Comparison
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6" style={{ color: FACE_COLOR }}>
              FOREO BEAR vs Zential Pure
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
              FOREO BEAR is one of the most recognised microcurrent devices in Europe. The Zential Pure Frequency Wand costs €122–202 less and delivers five distinct technologies. Here is what actually differs — and what the price gap buys.
            </p>
          </div>
        </section>

        {/* Table */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-12 text-center" style={{ color: FACE_COLOR }}>
              Side-by-side
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <th className="text-left py-3 pr-6 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>Feature</th>
                    <th className="text-center py-3 px-4 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>
                      Zential Pure<br />
                      <span className="font-serif normal-case text-base font-medium" style={{ color: FACE_COLOR }}>Frequency Wand</span>
                    </th>
                    <th className="text-center py-3 pl-4 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>
                      FOREO<br />
                      <span className="font-serif normal-case text-base font-medium" style={{ color: FACE_COLOR }}>BEAR</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: i % 2 === 0 ? "rgba(198,160,124,0.04)" : "transparent" }}>
                      <td className="py-4 pr-6 font-medium text-xs tracking-wide" style={{ color: MUTED }}>{row.feature}</td>
                      <td className="py-4 px-4 text-center text-sm" style={{ color: FACE_COLOR }}>{row.zential}</td>
                      <td className="py-4 pl-4 text-center text-sm" style={{ color: MUTED }}>{row.foreo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Honest analysis */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24" style={{ backgroundColor: "#F0EBE3" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              An honest breakdown
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-sm tracking-wider uppercase mb-3" style={{ color: ACCENT }}>Where FOREO has the advantage</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Brand recognition. FOREO has a large public review base built over years. If you need social proof from thousands of verified buyers, FOREO provides it. The IPX7 waterproof rating is also higher than IPX3 — the BEAR can be submerged, the Frequency Wand cannot. And the FOREO app provides guided protocols that some users find useful for consistency.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-sm tracking-wider uppercase mb-3" style={{ color: ACCENT }}>Where the Frequency Wand has the advantage</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Technology breadth. The FOREO BEAR delivers two modalities: T-Sonic pulsations and microcurrent. The Frequency Wand delivers five: EMS (which causes involuntary muscle contraction, distinct from microcurrent re-education), five-spectrum LED therapy covering red, blue, green, orange, and purple wavelengths, electroporation for transdermal serum delivery, and vibration for lymphatic support.
                </p>
                <p className="text-sm leading-relaxed mt-3" style={{ color: MUTED }}>
                  Electroporation is worth specific mention. It creates temporary micro-channels in the cell membrane, allowing active ingredients to reach tissue depths that topical application cannot. The FOREO BEAR has no equivalent modality.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-sm tracking-wider uppercase mb-3" style={{ color: ACCENT }}>The price question</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  €147 versus €269–349. The gap is €122–202. For that difference, the Frequency Wand adds three modalities the BEAR does not have. Whether FOREO's brand heritage and review volume is worth €122–202 to you is a personal decision. The technology gap favours Zential Pure.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-sm tracking-wider uppercase mb-3" style={{ color: ACCENT }}>The honest limitation</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  Zential Pure is a newer brand. We do not have the volume of independent third-party reviews that FOREO has accumulated. If external social proof is your primary purchase criterion, acknowledge that clearly. We offer a 30-day ritual guarantee in its place — if the device does not perform, return it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              Common questions
            </h2>
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
              Frequency Wand · €147
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: "#f0ebe3" }}>
              Five technologies. One instrument.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8a7f74" }}>
              EMS microcurrent · 5-spectrum LED · Electroporation · Vibration · IPX3
            </p>
            <Link
              to="/product/color-light-import-micro-current-vibration-massager"
              className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase"
              style={{ backgroundColor: ACCENT, color: FACE_COLOR }}
            >
              Order the Frequency Wand
            </Link>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
