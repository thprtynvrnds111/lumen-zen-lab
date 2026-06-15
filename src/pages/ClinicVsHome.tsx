import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import methodReturning from "@/assets/method/returning.webp";
import methodStandard from "@/assets/method/standard.webp";
import methodGlow from "@/assets/method/glow.webp";

const S = {
  dark: "#1A1714",
  teal: "#2ED8A8",
  cream: "#F7F4F0",
  bg: "#F7F4F0",
  ink: "#2A2420",
  muted: "#8A7F74",
  gold: "#C6A07C",
  cream2: "#EDE8E0",
  border: "rgba(42,36,32,0.10)",
  lora: { fontFamily: "'Lora', serif" } as React.CSSProperties,
  dm: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
};

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
  { line: "Monthly maintenance (2× per month)", clinic: "€160–240 / mo", home: "—" },
  { line: "Skin Pulse — unlimited sessions", clinic: "—", home: "€70 once" },
  { line: "Face Introducer — unlimited sessions", clinic: "—", home: "€88 once" },
  { line: "Frequency Wand — unlimited sessions", clinic: "—", home: "€147 once" },
];

const proof = [
  { n: "200+", lbl: "Home sessions\nper year" },
  { n: "6–12", lbl: "Clinic sessions\nper course" },
  { n: "€88", lbl: "vs €1,440 / yr\nclinic average" },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        ...S.dm,
        fontWeight: 300,
        fontSize: 10,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: dark ? S.teal : S.gold,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <span style={{ width: 36, height: 1, backgroundColor: dark ? S.teal : S.gold }} />
      {children}
    </span>
  );
}

export default function ClinicVsHome() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: S.bg, color: S.ink }}>
      <SEO
        title="Clinic Facial vs At-Home Device — The Real Cost Comparison | Zential Pure"
        description="One clinic microcurrent session costs €80–120. The Zential Pure Skin Pulse costs €70. An honest breakdown of what you pay, what you get, and where daily home devices outperform sporadic clinic visits."
        canonicalUrl="/clinic-vs-home-facial-device"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* ── Hero (dark editorial, matches homepage system) ── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: S.dark, paddingTop: 100, paddingBottom: 96 }}
        >
          {/* Film grain */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
              opacity: 0.04,
              mixBlendMode: "overlay",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 700px at 30% 30%, rgba(46,216,168,0.06) 0%, rgba(46,216,168,0.015) 40%, transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-12 md:gap-20 px-8 md:px-14 lg:px-20 max-w-7xl mx-auto" style={{ zIndex: 2 }}>
            <div>
              <div className="mb-7">
                <Eyebrow dark>Method · Clinic vs Home</Eyebrow>
              </div>
              <h1
                style={{
                  ...S.lora,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 4.2vw, 68px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: S.cream,
                  marginBottom: 28,
                }}
              >
                One clinic session.<br />
                Or a device.<br />
                <span style={{ color: S.teal }}>Forever.</span>
              </h1>
              <p
                style={{
                  ...S.dm,
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "rgba(247,244,240,0.7)",
                  maxWidth: 520,
                  marginBottom: 36,
                }}
              >
                Professional microcurrent and red light treatments cost €80–120 per session.
                Daily home devices cost €70–147 once. Here is the real comparison —
                what each delivers, what each costs, and what consistency actually does to results.
              </p>

              {/* Proof strip — same Lora italic numerals as homepage */}
              <div
                className="grid grid-cols-3"
                style={{
                  maxWidth: 540,
                  borderTop: "1px solid rgba(247,244,240,0.08)",
                  borderBottom: "1px solid rgba(247,244,240,0.08)",
                }}
              >
                {proof.map((row, i, arr) => (
                  <div
                    key={row.lbl}
                    style={{
                      padding: "18px 4px 18px 0",
                      borderRight: i === arr.length - 1 ? "none" : "1px solid rgba(247,244,240,0.08)",
                    }}
                  >
                    <div
                      style={{
                        ...S.lora,
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: 34,
                        lineHeight: 1,
                        color: S.teal,
                        marginBottom: 7,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {row.n}
                    </div>
                    <div
                      style={{
                        ...S.dm,
                        fontWeight: 300,
                        fontSize: 10,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(247,244,240,0.5)",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {row.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — editorial image (eye-free, outcome embodiment) */}
            <div className="hidden md:block relative">
              <img
                src={methodReturning}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ minHeight: 480, filter: 'contrast(1.02) saturate(0.95)' }}
                aria-hidden
              />
              {/* edge bleed into dark left + bottom */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(26,23,20,0.65) 0%, transparent 22%)' }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, transparent 55%, rgba(26,23,20,0.4) 100%)' }}
              />
              {/* meta overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  ...S.dm,
                  fontWeight: 300,
                  fontSize: 9,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(247,244,240,0.55)",
                }}
              >
                Cost Analysis · Issue 002
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 18,
                  left: 24,
                  ...S.dm,
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(46,216,168,0.6)",
                }}
              >
                4×5 · Method Series
              </div>
            </div>
          </div>
        </section>

        {/* ── Cost table (light editorial) ── */}
        <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28" style={{ backgroundColor: S.bg }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Eyebrow>The Numbers</Eyebrow>
            </div>
            <h2
              style={{
                ...S.lora,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(32px, 3.4vw, 48px)",
                lineHeight: 1.1,
                color: S.ink,
                marginBottom: 40,
                letterSpacing: "-0.01em",
              }}
            >
              The cost breakdown
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "collapse", ...S.dm }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${S.border}` }}>
                    <th
                      className="text-left py-4 pr-6"
                      style={{
                        fontWeight: 300,
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: S.muted,
                      }}
                    >
                      Treatment
                    </th>
                    <th
                      className="text-right py-4 px-4"
                      style={{
                        fontWeight: 300,
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: S.muted,
                      }}
                    >
                      Clinic
                    </th>
                    <th
                      className="text-right py-4 pl-4"
                      style={{
                        fontWeight: 400,
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: S.gold,
                      }}
                    >
                      At Home
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                      <td className="py-5 pr-6" style={{ fontSize: 14, fontWeight: 400, color: S.ink }}>
                        {row.line}
                      </td>
                      <td
                        className="py-5 px-4 text-right"
                        style={{
                          fontSize: 14,
                          fontWeight: row.clinic === "—" ? 300 : 500,
                          color: row.clinic === "—" ? S.muted : S.ink,
                        }}
                      >
                        {row.clinic}
                      </td>
                      <td
                        className="py-5 pl-4 text-right"
                        style={{
                          fontSize: 14,
                          fontWeight: row.home === "—" ? 300 : 500,
                          color: row.home === "—" ? S.muted : S.gold,
                        }}
                      >
                        {row.home}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Analysis: clinic vs home (cream2 break) ── */}
        <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28" style={{ backgroundColor: S.cream2 }}>
          {/* Editorial band image — the standard, embodied */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-20 relative" style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
            <img
              src={methodStandard}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'contrast(1.02) saturate(0.95)' }}
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(237,232,224,0.5) 100%)' }}
            />
            <div
              className="absolute bottom-5 left-6"
              style={{
                ...S.dm,
                fontSize: 9,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(42,36,32,0.55)",
              }}
            >
              The Standard · Plate 02
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <div className="mb-6">
                <Eyebrow>Clinic Advantage</Eyebrow>
              </div>
              <h2
                style={{
                  ...S.lora,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 2.6vw, 38px)",
                  lineHeight: 1.15,
                  color: S.ink,
                  marginBottom: 24,
                  letterSpacing: "-0.01em",
                }}
              >
                What clinic gives that home doesn't
              </h2>
              <div className="space-y-5" style={{ ...S.dm, fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: S.muted }}>
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
            </div>

            <div className="mt-14 md:mt-0">
              <div className="mb-6">
                <Eyebrow>Home Advantage</Eyebrow>
              </div>
              <h2
                style={{
                  ...S.lora,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 2.6vw, 38px)",
                  lineHeight: 1.15,
                  color: S.ink,
                  marginBottom: 24,
                  letterSpacing: "-0.01em",
                }}
              >
                What home gives that clinic doesn't
              </h2>
              <div className="space-y-5" style={{ ...S.dm, fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: S.muted }}>
                <p>
                  Frequency. Microcurrent and red light results accumulate through repetition. The technologies work on cellular processes — ATP synthesis, fibroblast stimulation, collagen remodeling — that respond to consistent, repeated stimulus. Not to occasional high-intensity sessions.
                </p>
                <p>
                  Most people who achieve visible long-term results from microcurrent and LED do so through sustained daily or near-daily practice. Clinic visits at €80–120 per session make daily practice economically impossible for almost everyone.
                </p>
                <p>
                  A home device at €70–147 used 4–5 times per week delivers 200+ sessions in a year. One clinic course delivers 6–12. The frequency advantage sits entirely with home use.
                </p>
              </div>
            </div>
          </div>

          {/* Pull quote */}
          <div className="max-w-3xl mx-auto mt-16 md:mt-20 text-center">
            <p
              style={{
                ...S.lora,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(22px, 2.2vw, 32px)",
                lineHeight: 1.35,
                color: S.ink,
                letterSpacing: "-0.005em",
              }}
            >
              "The clinic gave me results.
              <br />
              The problem was keeping the appointments — and the bill."
            </p>
          </div>
        </section>

        {/* ── Honest take ── */}
        <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28" style={{ backgroundColor: S.bg }}>
          <div className="max-w-2xl mx-auto">
            <div className="mb-7">
              <Eyebrow>Position</Eyebrow>
            </div>
            <h2
              style={{
                ...S.lora,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(30px, 3vw, 44px)",
                lineHeight: 1.12,
                color: S.ink,
                marginBottom: 28,
                letterSpacing: "-0.01em",
              }}
            >
              The honest position
            </h2>
            <div className="space-y-5" style={{ ...S.dm, fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: S.muted }}>
              <p>
                Home devices are not as powerful as clinical devices. We will not claim otherwise. A single professional microcurrent session delivers more current than a home session. If you need the maximum possible output from a single treatment, clinic is the answer.
              </p>
              <p>
                But results from these technologies are not built in single sessions. They're built through weeks of consistent repetition. And consistency at clinic prices is not sustainable for most people.
              </p>
              <p style={{ color: S.ink }}>
                The argument for daily home devices is not that they're stronger. It's that they're there every day. That frequency — applied consistently over months — is what produces the results that clinic dropout patients remember from their sessions and can no longer afford to maintain.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-8 md:px-14 lg:px-20 py-20 md:py-28" style={{ backgroundColor: S.cream2 }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-7">
              <Eyebrow>Questions</Eyebrow>
            </div>
            <h2
              style={{
                ...S.lora,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(30px, 3vw, 44px)",
                lineHeight: 1.12,
                color: S.ink,
                marginBottom: 36,
                letterSpacing: "-0.01em",
              }}
            >
              Common questions
            </h2>
            <div>
              {faqJsonLd.mainEntity.map((item, i) => (
                <div
                  key={i}
                  style={{ borderTop: i === 0 ? `1px solid ${S.border}` : "none", borderBottom: `1px solid ${S.border}`, padding: "28px 0" }}
                >
                  <h3
                    style={{
                      ...S.dm,
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: 1.4,
                      color: S.ink,
                      marginBottom: 12,
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ ...S.dm, fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: S.muted }}>
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA (dark, matches homepage CTA weight) ── */}
        <section className="relative px-8 md:px-14 lg:px-20 py-24 md:py-32 overflow-hidden" style={{ backgroundColor: S.dark }}>
          {/* full-bleed editorial bg (the glow — low opacity, dark wash) */}
          <img
            src={methodGlow}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.42, filter: 'saturate(0.7) contrast(0.98)' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(26,23,20,0.35) 0%, rgba(26,23,20,0.62) 55%, rgba(26,23,20,0.82) 100%)' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
              opacity: 0.05,
              mixBlendMode: "overlay",
            }}
          />
          <div className="relative max-w-2xl mx-auto text-center" style={{ zIndex: 2 }}>
            <div className="mb-6 flex justify-center">
              <Eyebrow dark>Clinic Precision · Daily Ritual</Eyebrow>
            </div>
            <h2
              style={{
                ...S.lora,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(32px, 3.6vw, 52px)",
                lineHeight: 1.1,
                color: S.cream,
                marginBottom: 24,
                letterSpacing: "-0.015em",
              }}
            >
              One clinic session costs<br />what this device costs. <span style={{ color: S.teal }}>Once.</span>
            </h2>
            <p
              style={{
                ...S.dm,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(247,244,240,0.55)",
                marginBottom: 40,
                maxWidth: 480,
                marginInline: "auto",
              }}
            >
              30-day ritual guarantee. If consistent daily use doesn't deliver — return it.
            </p>

            <div className="flex flex-col min-[480px]:flex-row gap-3 max-w-md mx-auto">
              <Link
                to="/product/lifting-and-tightening-face-introducer"
                className="flex-1 py-4 px-6 text-center transition-all duration-300"
                style={{
                  ...S.dm,
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: S.dark,
                  border: `1px solid ${S.teal}`,
                  backgroundColor: S.teal,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = S.teal;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = S.teal;
                  (e.currentTarget as HTMLElement).style.color = S.dark;
                }}
              >
                Order Face Introducer · €88
              </Link>
              <Link
                to="/product/electric-micro-current"
                className="flex-1 py-4 px-6 text-center transition-all duration-300"
                style={{
                  ...S.dm,
                  fontWeight: 400,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: S.cream,
                  border: "1px solid rgba(247,244,240,0.28)",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = S.teal;
                  (e.currentTarget as HTMLElement).style.color = S.teal;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,244,240,0.28)";
                  (e.currentTarget as HTMLElement).style.color = S.cream;
                }}
              >
                Skin Pulse · €70
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
