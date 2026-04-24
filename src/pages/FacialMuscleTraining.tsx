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
      name: "Can you actually train facial muscles with a device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Electrical Muscle Stimulation (EMS) causes involuntary muscle contractions in the facial muscles by delivering patterned electrical impulses. This is the same mechanism used in physical therapy and sports rehabilitation for limb muscles. The facial muscles respond identically — they contract, fatigue, and adapt over time.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between EMS and microcurrent for the face?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EMS (Electrical Muscle Stimulation) works at higher current levels that cause visible muscle contractions — the muscle actually moves. Microcurrent works at sub-sensory levels (below 1mA) that the body cannot detect. Microcurrent stimulates fibroblast activity and ATP synthesis at the cellular level without muscle contraction. EMS trains the muscle; microcurrent works at the cellular level in the dermis.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I use an EMS face device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3–5 sessions per week is the standard protocol for facial EMS. Unlike gym training, facial muscle recovery is faster — daily use is tolerated by most people. Starting at the lowest intensity and progressively increasing over weeks produces the best structural results.",
      },
    },
    {
      "@type": "Question",
      name: "How long until EMS facial training produces visible results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muscle tone changes from EMS typically become visible after 4–6 weeks of consistent use (3–5 sessions per week). The jawline and cheekbones tend to respond first. Brow and forehead changes take longer. Results compound — week 8 shows significantly more change than week 4.",
      },
    },
    {
      "@type": "Question",
      name: "Which Zential Pure device delivers EMS for facial training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Sculpt Wand uses EMS microcurrent at variable 0.4–5.5W — the variable output allows progressive intensity increase as tolerance builds. The Frequency Wand includes EMS in its first three modes (Glow, Line, Contour). The Frequency Wand Pro uses EMS microcurrent in its stimulation phase.",
      },
    },
  ],
};

const muscleGroups = [
  { name: "Frontalis", location: "Forehead", function: "Raises brows, wrinkles forehead", loss: "Brow heaviness, horizontal lines" },
  { name: "Orbicularis oculi", location: "Around eyes", function: "Controls eye opening/closing", loss: "Drooping upper eyelid, crow's feet depth" },
  { name: "Zygomaticus major", location: "Cheeks", function: "Draws corner of mouth upward", loss: "Flattened cheek, nasolabial deepening" },
  { name: "Masseter", location: "Jaw", function: "Jaw closure, chewing", loss: "Loss of jawline definition" },
  { name: "Platysma", location: "Neck/jaw", function: "Depresses jaw, tightens neck", loss: "Jowl formation, neck laxity" },
  { name: "Mentalis", location: "Chin", function: "Raises lower lip, wrinkles chin", loss: "Chin softening, marionette lines" },
];

export default function FacialMuscleTraining() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: textPrimary }}>
      <SEO
        title="Facial Muscle Training with EMS — How Electrical Stimulation Tones the Face | Zential Pure"
        description="Your face has 43 muscles. EMS (Electrical Muscle Stimulation) causes involuntary contractions in those muscles — the same mechanism used in sports rehabilitation. Here is the anatomy, the evidence, and the protocol."
        canonicalUrl="/facial-muscle-training"
        jsonLd={faqJsonLd}
      />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 text-center" style={{ backgroundColor: bg }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-semibold" style={{ color: accent }}>
              EMS · Facial Anatomy · Training Protocol
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-6" style={{ color: textPrimary }}>
              Your face has 43 muscles. Most people never train them.
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: textMuted }}>
              Skeletal muscle atrophies without stimulus. That includes the muscles underneath your skin. Here is what happens when they go untrained — and what EMS does about it.
            </p>
          </div>
        </section>

        {/* Anatomy */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: surface }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              The anatomy of facial structure
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: textMuted }}>
              Facial contour is not primarily cosmetic. It is structural — the product of muscle tone, fascial integrity, and the fat compartments that sit over them. When facial muscles lose tone from disuse or age-related atrophy, the structure beneath the skin changes. Definition fades. This is not a skin problem. It is a muscle and connective tissue problem.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {["Muscle", "Zone", "Function", "Loss without training"].map(h => (
                      <th key={h} className="text-left py-3 pr-4 font-medium text-xs tracking-widest uppercase" style={{ color: textMuted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {muscleGroups.map((m, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, backgroundColor: i % 2 === 0 ? "rgba(196,113,74,0.04)" : "transparent" }}>
                      <td className="py-4 pr-4 font-medium text-sm italic" style={{ color: textPrimary }}>{m.name}</td>
                      <td className="py-4 pr-4 text-sm" style={{ color: textMuted }}>{m.location}</td>
                      <td className="py-4 pr-4 text-sm" style={{ color: textMuted }}>{m.function}</td>
                      <td className="py-4 text-sm" style={{ color: textMuted }}>{m.loss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* EMS mechanism */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              How EMS stimulates facial muscles
            </h2>
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: textMuted }}>
              <p>
                Electrical Muscle Stimulation works by bypassing the voluntary nervous system. Normally, muscles contract when the brain sends a motor nerve signal. EMS mimics this signal with an external electrical impulse — the muscle cannot tell the difference. It contracts.
              </p>
              <p>
                The principle is identical to EMS used in sports medicine and physical rehabilitation. EMS has been used for decades to prevent muscle atrophy in post-surgical patients, to strengthen specific muscle groups in athletes, and to rehabilitate motor function after nerve injury.
              </p>
              <p>
                Applied to the face, the same mechanism stimulates the underlying musculature. Involuntary contractions work the muscle tissue. Over weeks, tone improves. The structure beneath the skin changes because the muscle beneath it has changed.
              </p>
              <p style={{ color: textMuted, fontSize: "0.75rem", borderLeft: `2px solid ${accent}`, paddingLeft: "1rem" }}>
                Neuromuscular electrical stimulation produces measurable increases in muscle strength and cross-sectional area with consistent application. — Porcari et al., Journal of Strength and Conditioning Research, 2002.
              </p>
              <p>
                The intensity parameter matters. Low intensity produces mild twitching without full contraction — a warm-up effect. Higher intensity causes full contraction and fatigue — the training effect. At variable output (the Sculpt Wand operates at 0.4–5.5W), intensity can be progressively increased as the muscle adapts. This is progressive overload applied to the face.
              </p>
            </div>
          </div>
        </section>

        {/* EMS vs microcurrent */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: surface }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>
              EMS vs microcurrent — different mechanisms, different results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div style={{ border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-4" style={{ color: accent }}>EMS</h3>
                <ul className="space-y-2 text-sm" style={{ color: textMuted }}>
                  <li>Current level: 0.4–5.5W (perceptible)</li>
                  <li>Effect: Involuntary muscle contraction</li>
                  <li>Target: Skeletal muscle fibers</li>
                  <li>Result: Improved muscle tone, definition</li>
                  <li>Timeline: Visible change from week 4–6</li>
                  <li>Sensation: You feel the contraction</li>
                </ul>
              </div>
              <div style={{ border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                <h3 className="font-medium text-sm tracking-widest uppercase mb-4" style={{ color: textMuted }}>Microcurrent</h3>
                <ul className="space-y-2 text-sm" style={{ color: textMuted }}>
                  <li>Current level: Below 1mA (sub-sensory)</li>
                  <li>Effect: Fibroblast stimulation, ATP synthesis</li>
                  <li>Target: Dermal cells, collagen matrix</li>
                  <li>Result: Improved texture, skin quality</li>
                  <li>Timeline: Texture from week 2</li>
                  <li>Sensation: None — sub-sensory by definition</li>
                </ul>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-8" style={{ color: textMuted }}>
              These are not competing technologies. EMS works on the muscle layer. Microcurrent works on the dermal layer. Combining both — as the Frequency Wand does in its Contour mode — addresses structural and cellular dimensions simultaneously.
            </p>
          </div>
        </section>

        {/* Training protocol */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: textPrimary }}>
              The progressive training protocol
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: textMuted }}>
              Facial EMS follows the same progression logic as any training protocol. Start minimal. Build over weeks. Results compound.
            </p>
            <div className="space-y-6">
              {[
                { week: "Week 1–2", intensity: "Lowest setting", goal: "Tissue adaptation. Let the muscle adjust to the stimulus. Contractions should be subtle — gentle twitching, not full contraction." },
                { week: "Week 3–4", intensity: "Mid-range", goal: "Increase to where contractions are clearly felt. Hold each zone for 45 seconds. The jaw, cheekbone, and brow should feel fatigued after a full session." },
                { week: "Week 5–8", intensity: "Progressive increase", goal: "Increase intensity weekly. Full contraction in each zone. This is where structural results begin to become visible. Jawline definition is typically the first change others notice." },
                { week: "Week 9+", intensity: "Maintenance", goal: "Hold intensity at your working level. 4–5 sessions per week sustains and continues building what weeks 1–8 established." },
              ].map(({ week, intensity, goal }) => (
                <div key={week} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: "1.5rem" }}>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-xs font-medium tracking-widest uppercase" style={{ color: accent }}>{week}</span>
                    <span className="text-xs" style={{ color: textMuted }}>{intensity}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28" style={{ backgroundColor: surface }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-10" style={{ color: textPrimary }}>Common questions</h2>
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
        <section className="px-6 md:px-12 lg:px-20 py-20 text-center" style={{ backgroundColor: bg }}>
          <div className="max-w-xl mx-auto">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold" style={{ color: accent }}>
              Sculpt Wand · €75
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4" style={{ color: textPrimary }}>
              EMS at 0.4–5.5W. Variable. Progressive.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: textMuted }}>
              TYPE-C · 400mAh · Motor vibration for lymphatic drainage · 8–12 minute protocol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/product/facial-beauty-tools-and-ems-beauty-equipment"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase"
                style={{ backgroundColor: accent, color: bg }}
              >
                Order the Sculpt Wand
              </Link>
              <Link
                to="/product/color-light-import-micro-current-vibration-massager"
                className="inline-block px-8 py-4 text-sm font-medium tracking-widest uppercase border"
                style={{ borderColor: accent, color: accent }}
              >
                Frequency Wand — EMS + LED
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ZentialFooter />
    </div>
  );
}
