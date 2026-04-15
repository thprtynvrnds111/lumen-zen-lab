import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Eye Activator | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Eye Activator. Red light 630–660nm. Three minutes per eye.",
  canonicalUrl: "/ritual-guide/eye-activator",
  heroHeading: <>Your Eye Activator.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Red light 630–660nm. Three minutes per eye.",
  prepItems: [
    { title: "Cleanse", desc: "Cleanse around the eye area. Remove all makeup completely." },
    { title: "Eye Serum", desc: "Apply eye serum to the orbital area before treatment." },
    { title: "Distance", desc: "Hold 1–2cm from skin. Do not press directly on the eyelid." },
  ],
  steps: [
    {
      num: "01", mode: "Warm Mode", param: "Controlled periorbital heat",
      duration: "30 seconds per eye",
      what: "Controlled heat increases circulation around the eye and enhances serum absorption.",
      sensation: "Gentle warmth. Eyes closed throughout.",
    },
    {
      num: "02", mode: "Red Light 630–660nm", param: "Near-visible red wavelength",
      duration: "3 minutes per eye",
      what: "Activates mitochondrial activity in periorbital skin. Supports collagen renewal at the cellular level.",
      sensation: "Warmth and visible red glow. Eyes closed. Fully comfortable.",
    },
    {
      num: "03", mode: "Sonic Drainage", param: "Micro-vibration, inner to outer corner",
      duration: "60 seconds",
      what: "Sweep from inner to outer corner. Encourages lymphatic flow to reduce puffiness and dark circles.",
      sensation: "Light vibration. Gentle and calming.",
    },
  ],
  frequencyText: "Morning for depuffing. Evening for repair. Results visible in 2–3 weeks.",
  afterItems: [
    { title: "Eye Cream", desc: "Apply eye cream immediately post-treatment for maximum absorption." },
    { title: "Gentle Touch", desc: "Press gently with your ring finger. Do not rub." },
    { title: "SPF", desc: "If morning, finish with SPF around the eye area." },
  ],
  contraindications: [
    "Active eye infections",
    "Pregnancy",
    "Photosensitive medication",
    "Epilepsy (due to light pulses)",
    "Never apply directly on the eyelid",
  ],
};

export default function EyeActivatorGuide() {
  return <RitualGuideLayout config={config} />;
}
