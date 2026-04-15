import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Frequency Wand Pro | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Frequency Wand Pro. Five modes. One sequence. Every layer.",
  canonicalUrl: "/ritual-guide/frequency-wand-pro",
  heroHeading: <>Your Frequency Wand Pro.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Five modes. One sequence. Every layer.",
  prepItems: [
    { title: "Cleanse", desc: "Start on clean, dry skin. No moisturizer yet." },
    { title: "Gel", desc: "Apply conductive gel to all treatment zones." },
    { title: "Order", desc: "Follow the order below. Each mode prepares for the next." },
  ],
  steps: [
    {
      num: "01", mode: "Ion Cleansing", param: "Negative ion emission",
      duration: "2 minutes",
      what: "Negative ions draw out deep impurities from pores that cleansing alone cannot reach.",
      sensation: "Mild surface tingle. Fully comfortable.",
    },
    {
      num: "02", mode: "Microcurrent", param: "Sub-sensory electrical current",
      duration: "5 minutes",
      what: "Sub-sensory current re-educates facial muscles and boosts cellular ATP production.",
      sensation: "You may feel very little. That is correct.",
    },
    {
      num: "03", mode: "LED + Ion Infusion", param: "Selectable wavelength + positive ion drive",
      duration: "10 minutes",
      what: "Select the wavelength for your concern. Apply serum first — infusion mode drives actives deeper into skin.",
      sensation: "Gentle warmth from LED. Faint tingle from ion drive.",
    },
  ],
  frequencyText: "4–5× per week for the first 30 days. Results compound at weeks 4–8.",
  afterItems: [
    { title: "Serum", desc: "Apply active serum and use infusion mode to drive it deeper." },
    { title: "LED Close", desc: "Close your session with your preferred LED wavelength." },
    { title: "Moisturise", desc: "Seal everything in with your moisturiser." },
  ],
  contraindications: [
    "Active skin infections or open wounds in treatment area",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Epilepsy (due to light pulses)",
    "Metal implants in the face",
  ],
};

export default function FrequencyWandProGuide() {
  return <RitualGuideLayout config={config} />;
}
