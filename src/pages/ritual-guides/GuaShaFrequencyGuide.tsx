import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Gua Sha Frequency | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Gua Sha Frequency. Ancient ritual. Electrical precision. Every morning.",
  canonicalUrl: "/ritual-guide/gua-sha-frequency",
  heroHeading: <>Your Gua Sha Frequency.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Ancient ritual. Electrical precision. Every morning.",
  prepItems: [
    { title: "Cleanse", desc: "Start on clean skin." },
    { title: "Oil or Serum", desc: "Apply oil or serum generously. Never use on dry skin." },
    { title: "Morning", desc: "This is a morning ritual, always. Puffiness responds best after sleep." },
  ],
  steps: [
    {
      num: "01", mode: "Neck First", param: "Downward strokes, lymphatic pathway",
      duration: "60 seconds",
      what: "Opens the lymphatic drainage pathway. This must come before treating the face.",
      sensation: "Gentle vibration and mild warmth. Grounding.",
    },
    {
      num: "02", mode: "Jaw to Ear", param: "Microcurrent + vibration",
      duration: "60 seconds per side",
      what: "Moves fluid along the jawline, activates jaw tone, and defines contour.",
      sensation: "Subtle pulse with vibration. Comfortable.",
    },
    {
      num: "03", mode: "Cheekbone to Temple", param: "Sculpt edge follows anatomy",
      duration: "60 seconds per side",
      what: "Sculpt edge follows facial anatomy toward the temporal lymph node for drainage and lift.",
      sensation: "Smooth glide with gentle current. Relaxing.",
    },
    {
      num: "04", mode: "Brow to Hairline", param: "Vibration + heat",
      duration: "30 seconds per side",
      what: "Releases tension in the frontalis muscle and promotes upper face circulation.",
      sensation: "Warmth and vibration. Tension release.",
    },
  ],
  frequencyText: "Daily, every morning. Puffiness responds within days. 5–7 minutes total.",
  afterItems: [
    { title: "Moisturise", desc: "Apply moisturiser while skin is still warm." },
    { title: "SPF", desc: "Always finish with SPF for the day ahead." },
    { title: "Clean", desc: "Wipe the sculpt edge clean after each use." },
  ],
  contraindications: [
    "Active acne or broken skin in the treatment area",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Rosacea flare-ups",
  ],
};

export default function GuaShaFrequencyGuide() {
  return <RitualGuideLayout config={config} />;
}
