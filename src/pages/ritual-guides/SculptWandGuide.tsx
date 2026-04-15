import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";
import heroImg from "@/assets/ritual-sculpt-wand.png";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Sculpt Wand | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Sculpt Wand. Precision EMS. Five minutes. Real contour.",
  canonicalUrl: "/ritual-guide/sculpt-wand",
  heroHeading: <>Your Sculpt Wand.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Precision EMS. Five minutes. Real contour.",
  heroImage: heroImg,
  heroCaption: "Sculpt Wand — used daily",
  prepItems: [
    { title: "Cleanse", desc: "Start on clean, dry skin." },
    { title: "Gel", desc: "Apply conductive gel on jaw, cheeks, and brow area." },
    { title: "Intensity", desc: "Start at low intensity. Increase gradually as you learn your zones." },
  ],
  steps: [
    {
      num: "01", mode: "Heat Prep", param: "Mild thermal energy",
      duration: "30–60 seconds per zone",
      what: "Mild thermal energy relaxes tissue before current, improving conductivity and comfort.",
      sensation: "Gentle warmth. Like a warm compress.",
    },
    {
      num: "02", mode: "EMS Sculpting", param: "Precision-tip electrical muscle stimulation",
      duration: "60 seconds per zone",
      what: "Precision tip targets jaw, cheekbones, nasolabial folds, and brow arch for contour definition.",
      sensation: "Controlled pulse. Noticeable but comfortable.",
    },
    {
      num: "03", mode: "Pulse Finish", param: "Rhythmic lymphatic mode",
      duration: "60 seconds",
      what: "Rhythmic mode encourages lymphatic drainage to close the session and reduce fluid retention.",
      sensation: "Lighter, calming pulse. Relaxing.",
    },
  ],
  frequencyText: "Daily. 5 minutes. Consistency builds the contour one session cannot.",
  afterItems: [
    { title: "Rinse", desc: "Remove remaining gel with warm water." },
    { title: "Serum", desc: "Apply your serum while skin is still warm for maximum absorption." },
    { title: "Moisturise", desc: "Seal with your preferred moisturiser." },
  ],
  contraindications: [
    "Active skin infections or open wounds in treatment area",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Metal implants in the face",
  ],
};

export default function SculptWandGuide() {
  return <RitualGuideLayout config={config} />;
}
