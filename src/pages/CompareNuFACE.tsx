import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Zential Pure Face Introducer as effective as NuFACE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both devices deliver microcurrent technology for facial toning. The Face Introducer adds red light at 630–660nm, EMS, and blue light — modalities NuFACE Trinity does not include. Effectiveness depends on consistent use with either device. The mechanisms are comparable; the protocol stack is broader with Zential.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price difference between NuFACE Trinity and the Face Introducer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The NuFACE Trinity retails at approximately €339. The Zential Pure Face Introducer is €88. The price difference is €251. Both are designed for daily at-home use.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Face Introducer work without a gel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A conductive gel or water-based serum is required for the microcurrent and EMS modes to deliver current effectively. Red light and blue light modes do not require gel.",
      },
    },
    {
      "@type": "Question",
      name: "How long do sessions take with the Face Introducer vs NuFACE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both devices are designed for 5–10 minute daily sessions. The Face Introducer's four modalities can be used sequentially in a single session or on a rotating protocol.",
      },
    },
    {
      "@type": "Question",
      name: "Is NuFACE better known than Zential Pure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. NuFACE is an established brand with a large review base. Zential Pure is newer. If brand recognition and a volume of public reviews are your primary decision criteria, NuFACE has the advantage. If multi-modality technology and price are your criteria, the Face Introducer is the stronger option.",
      },
    },
  ],
};

const FACE_COLOR = "#1A1714";
const MUTED = "#6B5B4E";
const BORDER = "rgba(198,160,124,0.20)";
const ACCENT = "#C6A07C";
const BG = "#F7F4F0";

export default function CompareNuFACE() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: FACE_COLOR }}>
      <SEO
        title="NuFACE Alternative — Face Introducer vs NuFACE Trinity | Zential Pure"
        description="Comparing the Zential Pure Face Introducer (€88) and the NuFACE Trinity (€339). Four modalities vs one. An honest breakdown for the informed buyer."
        canonicalUrl="/compare/nuface-vs-zential-pure"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section
          className="px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center"
          style={{ backgroundColor: BG }}
        >
          <div className="max-w-2xl mx-auto">
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold"
              style={{ color: ACCENT }}
            >
              Device Comparison
            </p>
            <h1
              className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6"
              style={{ color: FACE_COLOR }}
            >
              NuFACE vs Zential Pure
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
              NuFACE is the best-known microcurrent brand. The Zential Pure Face Introducer is €251 cheaper and delivers four modalities. Here is what actually differs — and what doesn't.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-serif text-2xl md:text-3xl font-medium mb-12 text-center"
              style={{ color: FACE_COLOR }}
            >
              Side-by-side
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <th className="text-left py-3 pr-6 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>
                      Zential Pure<br />
                      <span className="font-serif normal-case text-base font-medium" style={{ color: FACE_COLOR }}>Face Introducer</span>
                    </th>
                    <th className="text-center py-3 pl-4 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>
                      NuFACE<br />
                      <span className="font-serif normal-case text-base font-medium" style={{ color: FACE_COLOR }}>Trinity</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Price", zential: "€88", nuface: "€339" },
                    { feature: "Microcurrent", zential: "✓", nuface: "✓" },
                    { feature: "Red light (630–660nm)", zential: "✓", nuface: "✗" },
                    { feature: "EMS", zential: "✓", nuface: "✗" },
                    { feature: "Blue light (415nm)", zential: "✓", nuface: "✗" },
                    { feature: "Total modalities", zential: "4", nuface: "1 (2 with attachment)" },
                    { feature: "Daily session time", zential: "5–10 min", nuface: "5 min" },
                    { feature: "Gel required", zential: "Yes (microcurrent/EMS modes)", nuface: "Yes" },
                    { feature: "Brand history", zential: "New", nuface: "Established" },
                    { feature: "Review volume", zential: "Limited", nuface: "Extensive" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                      <td className="py-4 pr-6 text-sm" style={{ color: MUTED }}>
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-center text-sm font-medium" style={{ color: FACE_COLOR }}>
                        {row.zential}
                      </td>
                      <td className="py-4 pl-4 text-center text-sm" style={{ color: MUTED }}>
                        {row.nuface}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to choose each */}
        <section
          className="px-6 md:px-12 lg:px-20 py-16 md:py-24"
          style={{ backgroundColor: "#EFEBE5" }}
        >
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold" style={{ color: ACCENT }}>
                Choose the Face Introducer if
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: FACE_COLOR }}>
                {[
                  "Price is a meaningful factor in your decision",
                  "You want red light therapy alongside microcurrent in a single daily ritual",
                  "You prefer multi-modality protocols over a single-technology approach",
                  "You're entering the category for the first time and want maximum coverage",
                  "You're replacing repeated clinic sessions and want the cost argument to work in your favour",
                ].map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color: ACCENT, flexShrink: 0 }}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold" style={{ color: MUTED }}>
                Choose NuFACE Trinity if
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                {[
                  "Brand recognition and a large review base are your primary purchase signal",
                  "You specifically want a device with an established clinical track record by brand name",
                  "You have already used NuFACE and are replacing an existing device",
                  "Budget is not a constraint and you prefer to buy the most recognised name",
                ].map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ flexShrink: 0 }}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mechanism section */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-serif text-2xl md:text-3xl font-medium mb-8"
              style={{ color: FACE_COLOR }}
            >
              What microcurrent actually does
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: MUTED }}>
              Microcurrent delivers low-level electrical current at 200–400 microamperes — close to the body's own bioelectric signals. At this level, it stimulates fibroblast activity, increases ATP production, and supports the re-education of facial muscles over time. Both the Face Introducer and the NuFACE Trinity deliver this mechanism.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: MUTED }}>
              What differentiates the Face Introducer is the additional modalities. Red light at 630–660nm stimulates mitochondrial activity through photobiomodulation — a distinct cellular process, not a variation of microcurrent. EMS delivers deeper muscle stimulation via electrical pulses. Blue light at 415nm targets surface-level impurities.
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: MUTED }}>
              NuFACE's strength is its decade-long brand authority and review base. The technology it delivers — standard microcurrent — is matched by the Face Introducer at a lower price point, with three additional modalities included.
            </p>
          </div>
        </section>

        {/* The price argument */}
        <section
          className="px-6 md:px-12 lg:px-20 py-16 md:py-24 text-center"
          style={{ backgroundColor: "#EFEBE5" }}
        >
          <div className="max-w-xl mx-auto">
            <p className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: FACE_COLOR }}>
              One clinic microcurrent session costs €80–120.
            </p>
            <p className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              The Face Introducer costs €88. Once.
            </p>
            <p className="text-sm leading-relaxed mb-10" style={{ color: MUTED }}>
              The NuFACE Trinity costs €339 — a reasonable investment if brand authority is your primary criterion. If you're evaluating the category on technology and cost per year of use, the Face Introducer is the stronger argument.
            </p>
            <Link
              to="/product/lifting-and-tightening-face-introducer"
              className="inline-block px-8 py-3.5 text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: FACE_COLOR, color: "#F7F4F0" }}
            >
              Order the Face Introducer — €88
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-serif text-2xl md:text-3xl font-medium mb-12"
              style={{ color: FACE_COLOR }}
            >
              Common questions
            </h2>
            <div className="space-y-8">
              {[
                {
                  q: "Is the Zential Pure Face Introducer as effective as NuFACE?",
                  a: "Both deliver microcurrent at clinical amplitudes. The Face Introducer adds red light, EMS, and blue light — modalities the NuFACE Trinity does not include. Effectiveness depends on consistent daily use with either device.",
                },
                {
                  q: "What is the price difference?",
                  a: "The NuFACE Trinity retails at approximately €339. The Face Introducer is €88. The difference is €251.",
                },
                {
                  q: "Do I need a gel for the Face Introducer?",
                  a: "A conductive gel or water-based serum is required for microcurrent and EMS modes. Red light and blue light modes do not require gel.",
                },
                {
                  q: "NuFACE has thousands of reviews. Does Zential Pure?",
                  a: "Zential Pure is a newer brand. We don't have the review volume NuFACE has. What we have is the mechanism, the technology, and the price. Read the science and decide.",
                },
                {
                  q: "Can I use the Face Introducer daily?",
                  a: "Yes. It's designed for daily use in 5–10 minute sessions. Start at the lowest intensity. Results build with consistency over 3–4 weeks.",
                },
              ].map((item, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "2rem" }}>
                  <h3 className="text-sm font-medium mb-3" style={{ color: FACE_COLOR }}>
                    {item.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section
          className="px-6 md:px-12 lg:px-20 py-16 border-t"
          style={{ borderColor: BORDER }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-xs tracking-widest uppercase mb-6 font-medium" style={{ color: MUTED }}>
              Related
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {[
                { label: "Face Introducer — full product page", to: "/product/lifting-and-tightening-face-introducer" },
                { label: "How microcurrent works", to: "/technology/microcurrent" },
                { label: "How red light therapy works", to: "/technology/red-light" },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: FACE_COLOR, textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
