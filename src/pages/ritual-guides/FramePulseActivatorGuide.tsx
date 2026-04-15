import RitualGuideLayout, { type RitualGuideConfig } from "@/components/zential/RitualGuideLayout";
import heroImg from "@/assets/ritual-frame-pulse.png";

const config: RitualGuideConfig = {
  seoTitle: "Ritual Guide — Frame Pulse Activator | Zential Pure",
  seoDescription: "Step-by-step ritual guide for the Zential Pure Frame Pulse Activator. Hands-free EMS and LED therapy in ten minutes.",
  canonicalUrl: "/ritual-guide/frame-pulse-activator",
  heroHeading: <>Your Frame Pulse Activator.<br className="hidden md:block" /> How to use it.</>,
  heroSubline: "Hands-free. Eyes closed. Ten minutes.",
  heroImage: heroImg,
  heroCaption: "Frame Pulse Activator — used daily or every other day",
  prepItems: [
    { title: "Cleanse + Serum", desc: "Start on clean skin. Apply your preferred serum to the treatment area." },
    { title: "Position", desc: "Place the device along the orbital bone. Adjust straps for a snug, comfortable fit." },
    { title: "Time", desc: "Set aside 10 minutes. This is a hands-free ritual — close your eyes." },
  ],
  steps: [
    {
      num: "01", mode: "Select Program", param: "Pre-programmed pulse patterns",
      duration: "10 seconds",
      what: "Pre-programmed pulses target different muscle groups. Choose intensity level based on experience.",
      sensation: "Button feedback only. No sensation yet.",
    },
    {
      num: "02", mode: "EMS Training", param: "Electrical muscle stimulation, auto-cycle",
      duration: "10 minutes (automatic)",
      what: "Contracts and releases facial muscles for tone and depuffing across the full treatment zone.",
      sensation: "Light rhythmic pulse. Comfortable. Adjust intensity if needed.",
    },
    {
      num: "03", mode: "LED Array", param: "Full-spectrum LED, simultaneous",
      duration: "Runs simultaneously with EMS",
      what: "Full-spectrum LED stimulates collagen across the entire zone during the EMS cycle.",
      sensation: "Gentle warmth. Keep eyes closed throughout.",
    },
  ],
  frequencyText: "Daily or every other day. The best ritual is the one you actually do.",
  afterItems: [
    { title: "Remove", desc: "Gently remove the device. Wipe contact points clean." },
    { title: "Eye Care", desc: "Apply eye cream or serum immediately while absorption is highest." },
    { title: "SPF", desc: "If morning, finish with SPF. LED increases light sensitivity slightly." },
  ],
  contraindications: [
    "Active skin infections or open wounds in treatment area",
    "Pregnancy",
    "Implanted electronic devices (pacemakers, cochlear implants)",
    "Epilepsy (due to light pulses)",
    "Metal implants in the face",
  ],
};

export default function FramePulseActivatorGuide() {
  return <RitualGuideLayout config={config} />;
}
