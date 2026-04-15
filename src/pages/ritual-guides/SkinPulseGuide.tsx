import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Skin Pulse | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Skin Pulse. Sub-sensory current. Every session builds.",
  canonicalUrl: "/ritual-guide/skin-pulse",
  heroHeading: <>Your Skin Pulse.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Sub-sensory current. Every session builds.",
  prepItems: [
    { title: "Cleanse", desc: "Start on clean, dry skin." },
    { title: "Serum First", desc: "Apply your treatment serum before the device." },
    { title: "Gel Layer", desc: "Layer conductive gel over the serum for optimal conductivity." },
  ],
  steps: [
    {
      num: "01", mode: "Microcurrent", param: "Sub-sensory bioelectric current",
      duration: "60 seconds per zone",
      what: "Mirrors the body's own bioelectric signals to re-educate facial muscles at the cellular level.",
      sensation: "You may feel nothing. That is correct.",
    },
    {
      num: "02", mode: "EMS Activation", param: "Electrical muscle stimulation",
      duration: "60 seconds per zone",
      what: "Stronger pulse contracts and tones muscles for visible firmness and definition.",
      sensation: "Noticeable, comfortable pulse. Adjust intensity if needed.",
    },
    {
      num: "03", mode: "Ion Drive Close", param: "Positive ion infusion",
      duration: "60 seconds",
      what: "Pushes serum actives past the skin barrier for deeper penetration and efficacy.",
      sensation: "Faint tingle or nothing at all.",
    },
  ],
  frequencyText: "Daily, morning or evening. 5–10 minutes. Results compound over 4–6 weeks.",
  afterItems: [
    { title: "Serum", desc: "Add more serum and use Ion Drive mode if not done during the session." },
    { title: "Moisturise", desc: "Seal everything in with your preferred moisturiser." },
    { title: "Micro-Vibration", desc: "Run the device over moisturiser for 30 seconds for final absorption." },
  ],
  contraindications: [
    "Active skin infections or open wounds in treatment area",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Metal implants in the face",
  ],
};

export default function SkinPulseGuide() {
  return <RitualGuideLayout config={config} />;
}
