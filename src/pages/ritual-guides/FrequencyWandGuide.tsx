import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Frequency Wand | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Frequency Wand. High-frequency therapy. Oxygenated skin.",
  canonicalUrl: "/ritual-guide/frequency-wand",
  heroHeading: <>Your Frequency Wand.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "High-frequency therapy. Oxygenated skin.",
  prepItems: [
    { title: "Cleanse", desc: "Cleanse thoroughly. No oils, serums, or moisturiser before use." },
    { title: "Dry", desc: "Pat skin completely dry. High-frequency works best on dry skin." },
    { title: "Electrode", desc: "Select the correct glass electrode for your concern." },
  ],
  steps: [
    {
      num: "01", mode: "Select Electrode", param: "Interchangeable glass electrodes",
      duration: "Setup",
      what: "Mushroom for full face, spot for blemishes, comb for scalp. A faint ozone scent on power-on is normal.",
      sensation: "No sensation during selection.",
    },
    {
      num: "02", mode: "High-Frequency Treatment", param: "High-frequency oscillating current",
      duration: "5–10 minutes",
      what: "Circular motions across treatment area. Generates ozone on contact: antibacterial, oxygenates tissue, stimulates collagen production.",
      sensation: "Gentle tingling and faint buzz. Both are normal and expected.",
    },
    {
      num: "03", mode: "Serum Immediately After", param: "Post-treatment absorption window",
      duration: "Immediately",
      what: "Skin absorption is at its highest right after treatment. This is the moment to apply your actives.",
      sensation: "Enhanced absorption — your serum may feel more active than usual.",
    },
  ],
  frequencyText: "3–5× per week. Not daily — skin needs recovery between sessions.",
  afterItems: [
    { title: "Serum", desc: "Apply your active serum immediately after treatment." },
    { title: "Moisturise", desc: "Seal with your moisturiser." },
    { title: "Clean", desc: "Wipe electrode with a dry cloth. Never submerge in water." },
  ],
  contraindications: [
    "Active skin infections or broken capillaries",
    "Rosacea",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Metal implants in the face",
    "Do not use near the eyes",
  ],
};

export default function FrequencyWandGuide() {
  return <RitualGuideLayout config={config} />;
}
