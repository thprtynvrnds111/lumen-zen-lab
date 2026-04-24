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
      name: "Can an at-home facial device replace clinic treatments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Home devices operate at lower output levels than clinical equipment. They cannot replicate a single high-intensity clinic session. What they can do is deliver consistent, repeated stimulation over months — which, for technologies like microcurrent and red light, is how results accumulate. Consistency at lower intensity over time can outperform sporadic high-intensity clinic sessions.",
      },
    },
    {
      "@type": "Question",
      name: "How much do professional microcurrent and red light facial treatments cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional microcurrent sessions typically cost €60–120 per session in Europe. Red light and LED facial treatments cost €50–90 per session. A full course of 6–12 sessions is commonly recommended, putting total clinic costs at €360–1,440 for a single course.",
      },
    },
    {
      "@type": "Question",
      name: "Which Zential Pure device is closest to a professional microcurrent treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Skin Pulse uses dual-ball microcurrent at 2.4V — the same galvanic technology used in professional facial devices. The Frequency Wand Pro adds EMS microcurrent to a negative ion cleansing pre-phase. Both are designed for the buyer who has had professional treatments and wants to continue the protocol at home.",
      },
    },
    {
      "@type": "Question",
      name: "How long before I see results from daily home device use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skin texture changes are commonly reported within 2 weeks of consistent use. Structural changes — jawline definition, brow lift, cheek firmness — typically become visible after 4–6 weeks of 4–5 sessions per week. Results compound over months. This is not a one-session technology. It is a daily practice.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost saving compared to clinic visits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One clinic microcurrent session costs approximately €80–120. The Zential Pure Skin Pulse costs €70 — less than a single session. Used 4–5 times per week for a year, the device delivers 200+ sessions for the price of one clinic visit. The Face Introducer at €88 adds iontophoresis and trichromatic light therapy — technologies that would cost significantly more per session in a professional setting.",
      },
    },
  ],
};

const costRows = [
  { line: "Single microcurrent session", clinic: "€80–120", home: "—" },
  { line: "6-session course (recommended)", clinic: "€480–720", home: "—" },
  { line: "12-session course", clinic: "€960–1,440", home: "—" },
  { line: "Monthly maintenance (2× per month)", clinic: "€160–240/mo", home: "—" },
  { line: "Skin Pulse — unlimited sessions", clinic: "—", home: "€70 once" },
  { line: "Face Introducer — unlimited sessions", clinic: "—", home: "€88 once" },
  { line: "Frequency Wand — unlimited sessions", clinic: "—", home: "€147 once" },
];

export default function ClinicVsHome() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: FACE_COLOR }}>
      <SEO
        title="Clinic Facial vs At-Home Device — The Real Cost Comparison | Zential Pure"
        description="One clinic microcurrent session costs €80–120. The Zential Pure Skin Pulse costs €70. An honest breakdown of what you pay, what you get, and where daily home devices outperform sporadic clinic visits."
        canonicalUrl="/clinic-vs-home-facial-device"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 text-center" style={{ backgroundColor: BG }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold" style={{ color: ACCENT }}>
              Clinic vs Home · Cost Analysis
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6" style={{ color: FACE_COLOR }}>
              One clinic session. Or a device. Forever.
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
              Professional microcurrent and red light treatments cost €80–120 per session. Daily home devices cost €70–147 once. Here is the real comparison — what each delivers, what each costs, and what consistency actually does to results.
            </p>
          </div>
        </section>

        {/* Cost table */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-12 text-center" style={{ color: FACE_COLOR }}>
              The cost breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <th className="text-left py-3 pr-6 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>Treatment</th>
                    <th className="text-center py-3 px-4 font-medium text-xs tracking-widest uppercase" style={{ color: MUTED }}>Clinic</th>
                    <th className="text-center py-3 pl-4 font-medium text-xs tracking-widest uppercase" style={{ color: ACCENT }}>At Home</th>
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: i % 2 === 0 ? "rgba(198,160,124,0.04)" : "transparent" }}>
                      <td className="py-4 pr-6 text-sm" style={{ color: FACE_COLOR }}>{row.line}</td>
                      <td className="py-4 px-4 text-center text-sm font-medium" style={{ color: row.clinic === "—" ? MUTED : FACE_COLOR }}>{row.clinic}</td>
                      <td className="py-4 pl-4 text-center text-sm font-medium" style={{ color: row.home === "—" ? MUTED : ACCENT }}>{row.home}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Analysis */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: "#F0EBE3" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: FACE_COLOR }}>
              What clinic gives you that home doesn't
            </h2>
            <div className="space-y-5 text-sm leading-relaxed" style={{ color: MUTED }}>
              <p>
                Clinical devices operate at higher output levels. A professional microcurrent device delivers more current per session than a home device — the sensations are stronger, the immediate post-treatment tightening is more noticeable. If you've had professional microcurrent, you know this.
              </p>
              <p>
                A trained aesthetician also reads the face in real time and adjusts protocol. They know where to spend extra time. They catch contraindications. For first-time users, clinic is a reasonable starting point.
              </p>
              <p>
                Professional LED panels are larger and often more powerful than home devices. A clinical red light bed covers the full face and neck simultaneously with higher irradiance.
              </p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10 mt-16" style={{ color: FACE_COLOR }}>
              What home gives you that clinic doesn't
            </h2>
            <div className="space-y-5 text-sm leading-relaxed" style={{ color: MUTED }}>
              <p>
                Frequency. Microcurrent and red light results accumulate through repetition. The technologies work on cellular processes — ATP synthesis, fibroblast stimulation, collagen remodeling — that respond to consistent, repeated stimulus. Not to occasional high-intensity sessions.
              </p>
              <p>
                Most people who achieve visible long-term results from microcurrent and LED do so through sustained daily or near-daily practice. Clinic visits at €80–120 per session make daily practice economically impossible for almost everyone.
              </p>
              <p>
                A home device at €70–147 used 4–5 times per week delivers 200+ sessions in a year. One clinic course delivers 6–12. The frequency advantage sits entirely with home use.
              </p>
              <p style={{ color: FACE_COLOR, fontStyle: "italic" }}>
                "The clinic gave me results. The problem was keeping the appointments — and the bill."
              </p>
            </div>
          </div>
        </section>

        {/* Honest take */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-8" style={{ color: FACE_COLOR }}>
              The honest position
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: MUTED }}>
              Home devices are not as powerful as clinical devices. We will not claim otherwise. A single professional microcurrent session delivers more current than a home session. If you need the maximum possible output from a single treatment, clinic is the answer.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: MUTED }}>
              But results from these technologies are not built in single sessions. They're built through weeks of consistent repetition. And consistency at clinic prices is not sustainable for most people.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              The argument for daily home devices is not that they're stronger. It's that they're there every day. That frequency — applied consistently over months — is what produces the results that clinic dropout patients remember from their sessions and can no longer afford to maintain.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24" style={{ backgroundColor: "#F0EBE3" }}>
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
              Clinic Precision. Daily Ritual.
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: "#f0ebe3" }}>
              One clinic session costs what this device costs. Once.
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "#8a7f74" }}>
              30-day ritual guarantee. If consistent daily use doesn't deliver — return it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product/electric-micro-current"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase"
                style={{ backgroundColor: ACCENT, color: FACE_COLOR }}
              >
                Order the Skin Pulse — €70
              </Link>
              <Link
                to="/product/lifting-and-tightening-face-introducer"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase border"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                Order the Face Introducer — €88
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
