import { Sparkles, Flame, Heart, Brain, Sun, Zap, Waves, ThermometerSun, Eye, Gauge, Focus, CircleDot, ShieldCheck, Droplets, ScanFace, Vibrate, Radio, Gem, Aperture, Activity, Beaker, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";
import before2Img from "@/assets/before2.webp";
import after2Img from "@/assets/after2.webp";
import before3Img from "@/assets/before3.webp";
import after3Img from "@/assets/after3.webp";

import problemFaceIntroducer from "@/assets/problem-face-introducer.webp";
import problemFramePulse from "@/assets/problem-frame-pulse.webp";
import problemGuasha from "@/assets/problem-guasha.webp";
import problemSkinpulse from "@/assets/problem-skinpulse.webp";
import problemEyeActivator from "@/assets/problem-eye-activator.webp";
import problemFrequencyWand from "@/assets/problem-frequency-wand.webp";
import problemSculptWand from "@/assets/problem-sculpt-wand.webp";
import problemWandPro from "@/assets/problem-wand-pro.webp";
import productBodyLift from "@/assets/product-body-lift.jpg";

export interface StudyCard {
  technology: string;
  studyTitle: string;
  journal: string;
  url: string;
}

export interface ProductConfig {
  handle: string;
  purchaseHandle?: string; // fallback Shopify handle when `handle` has no live product
  name: string;
  subheadline: string;
  isAccessory?: boolean;
  benefits: { icon: LucideIcon; label: string }[];
  testimonials: { name: string; text: string }[];
  problemReframe: {
    headline: string;
    paragraphs: string[];
    closing: string;
  };
  techCards: { icon: LucideIcon; title: string; desc: string }[];
  ritualSteps: { step: string; title: string; desc: string }[];
  problemImage?: string;
  fallbackImage?: string;
  beforeAfter: { before: string; after: string };
  comparisonRows: { feature: string; zential: string | boolean; clinic: string | boolean; creams: string | boolean; generic: string | boolean }[];
  faqs: { q: string; a: string }[];
  studyCards?: StudyCard[];
  contraindications?: string[];
  normalSensations?: string[];
  sessionInfo?: string;
}

const defaultComparison = [
  { feature: "Cost over 6 months", zential: "One-time investment", clinic: "\u20ac1,200+", creams: "\u20ac300+", generic: "\u20ac40\u2013\u20ac80 (repeated)" },
  { feature: "Appointments needed", zential: "None", clinic: "12+ visits", creams: "None", generic: "None" },
  { feature: "Long-term structural support", zential: true, clinic: true, creams: false, generic: false },
  { feature: "Pain or downtime", zential: false, clinic: true, creams: false, generic: false },
  { feature: "Professional-grade control", zential: true, clinic: true, creams: false, generic: false },
  { feature: "Daily ritual integration", zential: true, clinic: false, creams: true, generic: true },
];

const defaultDeviceFaqs = [
  { q: "How long until I see results?", a: "Most users notice improved skin texture within 2 weeks of consistent daily use. Structural changes typically become visible after 3 to 4 weeks of daily ritual practice." },
  { q: "Can I use it daily?", a: "Yes. This device is designed for daily use in 5-minute sessions. Start at the lowest intensity and gradually increase as your skin adapts." },
  { q: "Is it safe for all skin types?", a: "Yes, it's designed for all skin types. If you have sensitive skin, start at the lowest setting. If irritation persists, reduce frequency and consult your dermatologist." },
  { q: "Who should not use this device?", a: "Do not use if you have a pacemaker, are pregnant, have active skin infections, epilepsy, or metal implants in the treatment area. Always consult your physician if you have a medical condition." },
  { q: "What serum works best?", a: "Any water-based conductive serum or gel works well. Avoid oil-based products as they can interfere with conductivity. Our Collagen Face Gel is specially formulated for optimal results." },
  { q: "What is your guarantee?", a: "We offer a 30-Day Ritual Guarantee. If you don't feel visible improvement within 30 days of consistent daily use, contact us for a full refund. No friction, no pressure." },
];

const accessoryComparison = [
  { feature: "Formulated for devices", zential: true, clinic: false, creams: false, generic: false },
  { feature: "Clinical-grade ingredients", zential: true, clinic: true, creams: false, generic: false },
  { feature: "Daily ritual integration", zential: true, clinic: false, creams: true, generic: true },
  { feature: "Cost per month", zential: "Under €10", clinic: "€80+", creams: "€30–€60", generic: "€10–€20" },
  { feature: "Enhances device results", zential: true, clinic: false, creams: false, generic: false },
  { feature: "Dermatologist reviewed", zential: true, clinic: true, creams: false, generic: false },
];

// Maps Shopify handle → config
export const productConfigs: Record<string, ProductConfig> = {
  // ─── BODY LIFT ───
  "body-lift": {
    handle: "body-lift",
    name: "Body Lift",
    fallbackImage: productBodyLift,
    subheadline: "Microcurrent Facial Lift, Built for Daily Structure",
    benefits: [
      { icon: Sparkles, label: "Microcurrent Lift" },
      { icon: Flame, label: "Red Light Collagen Support" },
      { icon: Heart, label: "Lymphatic Activation" },
      { icon: Brain, label: "Built for Long-Term Tone" },
    ],
    testimonials: [
      { name: "Sarah, 32", text: "Week 3 and my jawline feels structured. This is part of my morning now." },
      { name: "Elena, 45", text: "No needles. No clinic. Just consistency. My skin feels firmer than it has in years." },
      { name: "Maya, 38", text: "This feels like owning my structure. I finally trust a device." },
    ],
    problemReframe: {
      headline: "Your Face Is Structural. Not Topical.",
      paragraphs: [
        "After 25, facial muscles lose tone. Collagen production slows. Lymphatic flow stagnates. The result isn't just aging, it's a loss of structural definition that no cream can restore.",
        "Topical products hydrate the surface. But lift, tone, and definition come from deeper layers: the muscles, the fascia, the circulatory system beneath the skin.",
        "Body Lift targets these layers directly. Through microcurrent, red light, and sonic pulse, it works with your body's own systems to rebuild what time slowly softens.",
      ],
      closing: "This is about daily frequency, not emergency fixes.",
    },
    techCards: [
      { icon: Sun, title: "Red Light", desc: "Stimulates collagen response at the cellular level, supporting skin density and elasticity over time." },
      { icon: Zap, title: "Microcurrent", desc: "Activates facial muscle tone through gentle electrical stimulation, encouraging natural lift and definition." },
      { icon: ThermometerSun, title: "Thermal Support", desc: "Enhances circulation and nutrient delivery, warming tissue for optimal absorption and recovery." },
      { icon: Waves, title: "Sonic Pulse", desc: "Encourages lymphatic drainage and reduces fluid retention for a sculpted, depuffed appearance." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse skin. Apply a thin layer of conductive serum to the treatment area." },
      { step: "02", title: "Activate", desc: "Turn on your Body Lift. Glide upward along the jawline, cheeks, and forehead. 5 minutes." },
      { step: "03", title: "Repeat", desc: "Pause. Let the frequency settle. Repeat your ritual daily for structural results." },
    ],
    beforeAfter: { before: before2Img, after: after2Img },
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Red Light", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=photobiomodulation+630nm+collagen+skin" },
      { technology: "Microcurrent", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=microcurrent+ATP+skin+cells" },
      { technology: "Thermal", studyTitle: "Collagen Remodeling After 585-nm Pulsed Dye Laser Irradiation", journal: "Dermatologic Surgery, 2003", url: "https://scholar.google.com/scholar?q=thermal+therapy+skin+collagen" },
      { technology: "Sonic Pulse", studyTitle: "Low-Frequency Vibrotherapy Improves the Effectiveness of Manual Lymphatic Drainage", journal: "Journal of Clinical Medicine, 2018", url: "https://scholar.google.com/scholar?q=sonic+vibration+skin+absorption" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have epilepsy or photosensitive conditions",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A mild tingling or warmth during use \u2014 expected",
      "Slight redness that fades within 30 minutes \u2014 normal",
      "No sensation at all on microcurrent mode \u2014 correct, it\u2019s sub-sensory",
    ],
    sessionInfo: "Session time: 5\u201310 minutes \u00b7 Frequency: 5\u00d7 per week \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── LIFTING & TIGHTENING FACE INTRODUCER ───
  "lifting-and-tightening-face-introducer": {
    handle: "lifting-and-tightening-face-introducer",
    name: "Face Introducer",
    subheadline: "Ion-Assisted Delivery + Trichromatic Light Therapy",
    benefits: [
      { icon: ScanFace, label: "Negative Ion Cleansing" },
      { icon: Sun, label: "Trichromatic Light (White · Pink · Purple)" },
      { icon: Droplets, label: "Iontophoretic Serum Delivery" },
      { icon: Zap, label: "Galvanic Ionic Current" },
    ],
    testimonials: [
      { name: "Lina, 29", text: "My skin absorbs everything differently now. The serum actually goes in. I can feel it." },
      { name: "Diane, 41", text: "Two phases. Two minutes each. My morning ritual is under ten minutes and my skin is clearer than it's been in years." },
      { name: "Priya, 35", text: "I was spending €90 a session on professional facials. This is the same galvanic mechanism. Once." },
    ],
    problemReframe: {
      headline: "Your Skincare Sits on the Surface. This Changes That.",
      paragraphs: [
        "Most products never reach the tissue they're designed for. They hydrate the surface, protect it — but the active ingredients stop at the barrier. The barrier is doing its job. The problem is getting past it without damaging it.",
        "The Face Introducer works in two phases. First, negative ions attract and lift positively charged impurities from the follicle — the galvanic cleansing mechanism used in professional facials, without abrasion. The barrier stays intact. Then polarity reverses, and the iontophoretic current drives your serum past it, into the dermis.",
        "Between those phases: trichromatic light therapy. White for surface clarity. Pink-spectrum photobiomodulation for dermal-level collagen support. Purple for antimicrobial action on congestion-prone skin.",
      ],
      closing: "Cleanse. Stimulate. Deliver. In that order.",
    },
    techCards: [
      { icon: ScanFace, title: "Negative Ion Cleansing", desc: "Negatively charged ion output attracts positively charged impurities — sebum, particulates, oxidative residue — and lifts them from the follicle. Electrical, not abrasive. The skin barrier stays intact." },
      { icon: Sun, title: "Trichromatic Light", desc: "White light supports surface clarity. Pink-spectrum output targets cytochrome c oxidase in the mitochondria, supporting ATP synthesis and fibroblast activity. Purple provides antimicrobial surface action for congestion-prone skin." },
      { icon: Droplets, title: "Positive Ion Infusion", desc: "Polarity reverses after cleansing. Galvanic iontophoretic current drives positively charged actives — vitamin C, hyaluronic acid, peptides — across the skin barrier via electrical gradient. Product reaches the dermis." },
      { icon: Zap, title: "Galvanic Current", desc: "12,000 RPM · 3 intensity levels · 750mAh · 4W rated output. The same galvanic current technology used in professional spa facials, calibrated for daily home protocol." },
    ],
    ritualSteps: [
      { step: "01", title: "Cleanse", desc: "Dry the skin completely. Negative ion mode — 2 minutes across full face and T-zone. No serum yet." },
      { step: "02", title: "Stimulate", desc: "Pink light mode — 3 minutes. Hold at cheeks and forehead. Let the wavelength work at the dermal level." },
      { step: "03", title: "Deliver", desc: "Apply your serum or active. Positive ion mode — 2 minutes. Drive it past the barrier. Total: under 10 minutes." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemFaceIntroducer,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Photobiomodulation", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
      { technology: "Trichromatic LED", studyTitle: "A Controlled Trial: Efficacy of Red and Near-Infrared Light in Reduction of Fine Lines and Collagen Density Increase", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=wunsch+matuschka+red+near+infrared+light+fine+lines+collagen+2014" },
      { technology: "Iontophoresis", studyTitle: "Iontophoresis for Drug Delivery: Principles, Opportunities and Challenges", journal: "Advanced Drug Delivery Reviews, 2011", url: "https://scholar.google.com/scholar?q=iontophoresis+transdermal+drug+delivery+skin+galvanic+principles" },
      { technology: "Ion Cleansing", studyTitle: "Galvanic Current and Skin Barrier Integrity in Transdermal Electrostimulation", journal: "Journal of Cosmetic Science, 2003", url: "https://scholar.google.com/scholar?q=galvanic+current+facial+cleansing+ion+skin+barrier" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have epilepsy or photosensitive conditions",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A mild surface tingle during ion cleansing \u2014 fully comfortable",
      "Gentle warmth from pink light mode \u2014 expected",
      "Faint tingle during positive ion infusion \u2014 confirms current delivery",
    ],
    sessionInfo: "Session time: 7\u201310 minutes \u00b7 Frequency: 3\u20135\u00d7 per week \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── EYE ACTIVATOR ───
  "eye-massage": {
    handle: "eye-massage",
    name: "Eye Activator",
    subheadline: "Targeted Microcurrent for the Periorbital Zone",
    benefits: [
      { icon: Eye, label: "Under-Eye Depuffing" },
      { icon: Zap, label: "Orbital Microcurrent" },
      { icon: Sun, label: "Red Light Repair" },
      { icon: Droplets, label: "Serum Penetration" },
    ],
    testimonials: [
      { name: "Rachel, 33", text: "The puffiness under my eyes is gone by morning. I actually look rested." },
      { name: "Aisha, 40", text: "Dark circles were my biggest insecurity. Three weeks in, people ask if I slept 10 hours." },
      { name: "Clara, 28", text: "I replaced my eye cream routine with this. The difference is visible, not imagined." },
    ],
    problemReframe: {
      headline: "Your Eye Area Is Circulatory. Not Cosmetic.",
      paragraphs: [
        "The skin around your eyes is the thinnest on your body. Puffiness, dark circles, and fine lines aren't just surface concerns. They signal stagnant lymphatic flow and weakened microcirculation.",
        "Eye creams can hydrate the surface, but they cannot stimulate the drainage pathways or activate the collagen network beneath. The tissue needs movement, current, and light.",
        "Eye Activator delivers precise microcurrent and red light to the periorbital zone, encouraging drainage, firming the delicate tissue, and reducing the visible signs of fatigue.",
      ],
      closing: "This is about restoring circulation, not masking exhaustion.",
    },
    techCards: [
      { icon: Zap, title: "Microcurrent", desc: "Precision-calibrated current stimulates the delicate periorbital muscles without overstimulation." },
      { icon: Sun, title: "Red Light", desc: "Targeted wavelengths support collagen renewal in the thinnest skin on your face." },
      { icon: Waves, title: "Sonic Pulse", desc: "Gentle vibration encourages lymphatic drainage to reduce puffiness and dark circles." },
      { icon: ThermometerSun, title: "Warm Mode", desc: "Controlled thermal energy enhances serum absorption and promotes blood flow to the eye area." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Apply eye serum or conductive gel to the under-eye and orbital area." },
      { step: "02", title: "Activate", desc: "Gently glide the Eye Activator from inner corner outward. Follow the orbital bone. 3 minutes per eye." },
      { step: "03", title: "Repeat", desc: "Use every morning for depuffing, or every evening for repair. Consistency reveals clarity." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    problemImage: problemEyeActivator,
    comparisonRows: defaultComparison,
    faqs: [
      { q: "How long until I see results?", a: "Many users notice reduced puffiness after the first session. Consistent improvement in dark circles and fine lines typically becomes visible after 2 to 3 weeks of daily use." },
      { q: "Can I use it daily?", a: "Yes. The Eye Activator is designed for gentle daily use. We recommend 3-minute sessions per eye, morning or evening." },
      { q: "Is it safe around the eyes?", a: "Yes. The device is specifically designed for the periorbital zone with calibrated intensity levels. Avoid direct contact with the eyeball. Always use on closed-eye areas." },
      { q: "Who should not use this device?", a: "Do not use if you have a pacemaker, are pregnant, have eye infections, recent eye surgery, or metal implants near the eye area. Consult your physician with any concerns." },
      { q: "Do I need a special serum?", a: "Any lightweight, water-based eye serum works well. Avoid heavy oils. Our Collagen Face Gel can also be used around the eye area." },
      { q: "What is your guarantee?", a: "We offer a 30-Day Ritual Guarantee. If you don't see visible improvement within 30 days of consistent daily use, contact us for a full refund." },
    ],
    studyCards: [
      { technology: "Red Light 630\u2013660nm", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=photobiomodulation+630nm+collagen+skin" },
      { technology: "Microcurrent", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=microcurrent+ATP+skin+cells" },
      { technology: "Sonic Pulse", studyTitle: "Low-Frequency Vibrotherapy Improves the Effectiveness of Manual Lymphatic Drainage", journal: "Journal of Clinical Medicine, 2018", url: "https://scholar.google.com/scholar?q=sonic+vibration+skin+absorption" },
      { technology: "Thermal", studyTitle: "Collagen Remodeling After 585-nm Pulsed Dye Laser Irradiation", journal: "Dermatologic Surgery, 2003", url: "https://scholar.google.com/scholar?q=thermal+therapy+skin+collagen" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active eye infections or recent eye surgery",
      "You have epilepsy or photosensitive conditions",
      "You have metal implants near the eye area",
    ],
    normalSensations: [
      "A mild tingling or warmth during use \u2014 expected",
      "Slight redness that fades within 30 minutes \u2014 normal",
      "No sensation at all on microcurrent mode \u2014 correct, it\u2019s sub-sensory",
    ],
    sessionInfo: "Session time: 3 minutes per eye \u00b7 Frequency: daily \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── FREQUENCY WAND ───
  "color-light-import-micro-current-vibration-massager": {
    handle: "color-light-import-micro-current-vibration-massager",
    name: "Frequency Wand",
    subheadline: "Five-Mode Protocol: EMS · 5-Spectrum LED · Electroporation · Vibration",
    benefits: [
      { icon: Sun, label: "5-Spectrum LED Therapy" },
      { icon: Zap, label: "EMS Microcurrent" },
      { icon: Activity, label: "Electroporation Delivery" },
      { icon: Vibrate, label: "Vibration Massage" },
    ],
    testimonials: [
      { name: "Nina, 27", text: "I use the pore mode before every serum. The absorption difference is not subtle." },
      { name: "Sophie, 34", text: "Five modes sounds like marketing. It isn't. Each one feels different. Each one does something different." },
      { name: "Jordan, 31", text: "Contour mode three times a week. My jawline is more defined than it was six months ago." },
    ],
    problemReframe: {
      headline: "Five Concerns. Five Protocols. One Instrument.",
      paragraphs: [
        "Dullness, fine lines, congestion, active acne, and poor product absorption don't share a cause. They shouldn't share a solution.",
        "Each of the Frequency Wand's five modes targets a distinct variable with a distinct mechanism: a specific light wavelength, a specific current pattern, a specific delivery technology. Prescribed by concern, not applied generally.",
        "Glow mode uses orange-spectrum light with EMS for circulation and radiance. Line mode uses green light for pigmentation. Contour mode uses red light at 630–660nm — the most studied wavelength in photobiomodulation research — with EMS for collagen support. Pore mode uses blue light with electroporation for deep antibacterial delivery. Acne mode combines red and blue simultaneously with electroporation for active breakouts.",
      ],
      closing: "Prescribe. Don't generalise.",
    },
    techCards: [
      { icon: Sun, title: "5-Spectrum LED", desc: "Five clinically relevant wavelengths: Red (630–660nm, photobiomodulation + collagen) · Blue (~415nm, antibacterial) · Green (~520nm, pigmentation and tone) · Orange (circulation and radiance) · Purple (red + blue combined). Each mode activates the wavelength matched to its target." },
      { icon: Zap, title: "EMS Microcurrent", desc: "Integrated into modes 1–3 (Glow, Line, Contour). Electrical impulses cause involuntary facial muscle contractions, progressively training tone. Same mechanism used in sports rehabilitation — applied to facial architecture." },
      { icon: Activity, title: "Electroporation", desc: "Modes 4–5 (Pore, Acne) use pulsed electrical fields to create temporary micro-channels in the cell membrane, allowing large active molecules to penetrate depths iontophoresis cannot reach. Apply your targeted serum before these modes." },
      { icon: Vibrate, title: "Vibration", desc: "Layered into all five modes. Mechanical vibration stimulates lymphatic circulation, supports drainage, and enhances product absorption across every protocol." },
    ],
    ritualSteps: [
      { step: "01", title: "Prescribe", desc: "Identify today's concern: radiance, lines, firmness, pores, or acne. Select the corresponding mode. Don't rotate randomly." },
      { step: "02", title: "Activate", desc: "Apply conductive serum. Run your selected mode 3–5 minutes on the target zone. For electroporation modes, serum goes on first." },
      { step: "03", title: "Layer", desc: "Full protocol: Contour (red + EMS) \u2192 Pore (blue + electroporation). Under 15 minutes. IPX3-rated — bathroom safe." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemFrequencyWand,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Red Light 630\u2013660nm", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
      { technology: "Blue Light \u00b7 Antibacterial", studyTitle: "Phototherapy with Blue (415nm) and Red (660nm) Light in the Treatment of Acne Vulgaris", journal: "British Journal of Dermatology, 2000", url: "https://scholar.google.com/scholar?q=papageorgiou+blue+415nm+red+660nm+acne+vulgaris+phototherapy+2000" },
      { technology: "Electroporation", studyTitle: "Skin Electroporation: A Review of Molecular Transport Mechanisms and Applications", journal: "Advanced Drug Delivery Reviews, 2002", url: "https://scholar.google.com/scholar?q=skin+electroporation+transdermal+drug+delivery+molecular+transport+review" },
      { technology: "EMS", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=electrical+muscle+stimulation+facial+wrinkles+sagging+neuromuscular" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have epilepsy or photosensitive conditions",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A comfortable pulse during EMS modes \u2014 expected",
      "Mild warmth from LED \u2014 keep eyes closed during purple and blue modes",
      "Brief surface tingle during electroporation \u2014 normal, confirms micro-channel formation",
    ],
    sessionInfo: "Session time: 3\u20135 min per mode \u00b7 Frequency: 3\u20135\u00d7 per week \u00b7 IPX3 waterproof \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── GUA SHA FREQUENCY ───
  "electric-guasha-massager": {
    handle: "electric-guasha-massager",
    name: "Gua Sha Frequency",
    subheadline: "Ancient Ritual Meets Microcurrent Precision",
    benefits: [
      { icon: Gem, label: "Sculpting Contour Shape" },
      { icon: Zap, label: "Embedded Microcurrent" },
      { icon: Waves, label: "Lymphatic Drainage" },
      { icon: Heart, label: "Tension Release" },
    ],
    testimonials: [
      { name: "Mei, 36", text: "The sculpting effect is instant. Combined with microcurrent, my gua sha ritual leveled up." },
      { name: "Olivia, 42", text: "I feel the tension melt with every stroke. My jawline looks sharper within days." },
      { name: "Yuki, 30", text: "This replaced three tools in my routine. One device, one ritual, real results." },
    ],
    problemReframe: {
      headline: "Your Tension Is Structural. Not Emotional.",
      paragraphs: [
        "Facial tension doesn't just make you look tired. It restricts blood flow, traps fluid, and compresses the fascia that gives your face its shape.",
        "Traditional gua sha releases surface tension. But without electrical stimulation, it can't reach the deeper muscular and fascial layers where real sculpting happens.",
        "Gua Sha Frequency combines the ancient scraping technique with embedded microcurrent, delivering both mechanical release and electrical activation in a single stroke.",
      ],
      closing: "Release what's held. Activate what's dormant.",
    },
    techCards: [
      { icon: Gem, title: "Sculpt Edge", desc: "Precision-contoured shape follows facial anatomy for targeted sculpting along the jawline and cheekbones." },
      { icon: Zap, title: "Microcurrent", desc: "Embedded electrodes deliver gentle current during every stroke, stimulating muscle tone as you sculpt." },
      { icon: Waves, title: "Vibration", desc: "Sonic vibration enhances lymphatic drainage and breaks up fluid stagnation beneath the skin." },
      { icon: ThermometerSun, title: "Heat Therapy", desc: "Gentle warmth relaxes facial muscles and enhances serum absorption during the sculpting ritual." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Apply facial oil or conductive serum generously. Turn on microcurrent mode." },
      { step: "02", title: "Activate", desc: "Sweep upward from jawline to temple, neck to chin, and brow to hairline. 5 minutes." },
      { step: "03", title: "Repeat", desc: "Practice daily. Sculpting is cumulative. Each session builds on the last." },
    ],
    beforeAfter: { before: before2Img, after: after2Img },
    problemImage: problemGuasha,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Microcurrent", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=microcurrent+ATP+skin+cells" },
      { technology: "Gua Sha", studyTitle: "The Effect of Gua Sha Treatment on the Microcirculation of Surface Tissue", journal: "Explore, 2007", url: "https://scholar.google.com/scholar?q=gua+sha+lymphatic+facial" },
      { technology: "Vibration", studyTitle: "Low-Frequency Vibrotherapy Improves the Effectiveness of Manual Lymphatic Drainage", journal: "Journal of Clinical Medicine, 2018", url: "https://scholar.google.com/scholar?q=sonic+vibration+skin+absorption" },
      { technology: "Heat Therapy", studyTitle: "Collagen Remodeling After 585-nm Pulsed Dye Laser Irradiation", journal: "Dermatologic Surgery, 2003", url: "https://scholar.google.com/scholar?q=thermal+therapy+skin+collagen" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active acne or broken skin in the treatment area",
      "You have rosacea flare-ups",
    ],
    normalSensations: [
      "Gentle vibration and mild warmth during use \u2014 expected",
      "Slight redness that fades within 30 minutes \u2014 normal",
      "Subtle pulse with vibration \u2014 comfortable and expected",
    ],
    sessionInfo: "Session time: 5\u20137 minutes \u00b7 Frequency: daily, every morning \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── SKIN PULSE ───
  "electric-micro-current": {
    handle: "electric-micro-current",
    name: "Skin Pulse",
    subheadline: "Dual-Ball Microcurrent for Daily Facial Stimulation",
    benefits: [
      { icon: Zap, label: "Dual-Electrode Microcurrent" },
      { icon: Activity, label: "Fibroblast Stimulation" },
      { icon: Focus, label: "Targeted Zone Treatment" },
      { icon: CircleDot, label: "2.4V Bioelectric Circuit" },
    ],
    testimonials: [
      { name: "Lisa, 37", text: "I don't feel much during use. That's the point. Two weeks in, my texture changed." },
      { name: "Naomi, 44", text: "Compact. Quiet. Works. My evening ritual is five minutes and this is all I need." },
      { name: "Vera, 31", text: "I was skeptical of something so simple. I'm not skeptical anymore." },
    ],
    problemReframe: {
      headline: "Your Face Has 43 Muscles. Most of Them Go Unstimulated.",
      paragraphs: [
        "Facial muscles atrophy the same way any untrained muscle does — gradually, without clear announcement. The loss isn't dramatic. It compounds.",
        "The Skin Pulse delivers low-level microcurrent through a dual-ball electrode design: two conductive spheres, positive and negative, that create a circuit through the skin tissue. At 2.4V and 0.15W, the current operates within the range of the body's own bioelectric signals — sub-sensory, but biologically active.",
        "Electrical stimulation at this level has been studied for its effect on fibroblast activity. Fibroblasts produce collagen and elastin. Both balls stay in contact with skin at all times. That's the circuit. That's the protocol.",
      ],
      closing: "You won't feel much. That is correct.",
    },
    techCards: [
      { icon: Zap, title: "Dual-Ball Microcurrent", desc: "Two conductive spheres — positive and negative — create a continuous low-level electrical circuit through the dermis. Current travels through tissue, not along the surface. Both balls must remain in contact at all times to maintain the circuit." },
      { icon: Activity, title: "Fibroblast Stimulation", desc: "Electrical stimulation at sub-sensory levels has been studied for its effect on fibroblast activity and ATP synthesis — the cellular energy currency that drives collagen and elastin production. No sensation required." },
      { icon: Focus, title: "Targeted Zone Protocol", desc: "Compact dual-ball format (10.6 \u00d7 6.5cm) allows precise treatment of specific zones: nasolabial folds, under-eye, brow, lip lines. Each zone gets its own 60-second pass." },
      { icon: CircleDot, title: "2.4V Bioelectric Range", desc: "The device operates at 2.4V, 0.15W — within the body's own bioelectric frequency range. This is not TENS, not EMS. Microcurrent is a distinct category: current at or below 1mA, calibrated for cellular-level stimulation." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse. Apply a conductive serum or light water layer — always use with a medium. Both balls need conductivity to complete the circuit." },
      { step: "02", title: "Activate", desc: "Keep both balls in continuous contact with skin. Slow, upward strokes. Never drag. 60 seconds per zone." },
      { step: "03", title: "Repeat", desc: "5–8 minutes. 4–5 days a week. You will not feel strong sensation. That is correct." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    problemImage: problemSkinpulse,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Microcurrent \u00b7 ATP", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation+protein+synthesis+skin" },
      { technology: "Fibroblast Stimulation", studyTitle: "Effect of Microcurrent Stimulation on Fibroblast Proliferation and Collagen Synthesis", journal: "Journal of Dermatological Science, 2010", url: "https://scholar.google.com/scholar?q=microcurrent+fibroblast+proliferation+collagen+synthesis+skin+stimulation" },
      { technology: "Bioelectric Signalling", studyTitle: "Endogenous Bioelectric Signals as Morphogenetic Controls of Development, Regeneration and Neoplasm", journal: "Journal of Pathology, 2011", url: "https://scholar.google.com/scholar?q=bioelectric+signals+skin+regeneration+collagen+morphogenetic" },
      { technology: "Sub-Sensory Current", studyTitle: "Low-Intensity Electric Stimulation of the Skin: A Review After 20 Years of Research", journal: "Bioelectrochemistry and Bioenergetics, 1999", url: "https://scholar.google.com/scholar?q=low+intensity+electric+stimulation+skin+review+bioelectrochemistry" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "No sensation on microcurrent mode \u2014 correct, this is sub-sensory",
      "Faint tingle if gel layer is thin \u2014 add more medium and continue",
      "Slight warmth after sustained contact on one zone \u2014 normal",
    ],
    sessionInfo: "Session time: 5\u20138 minutes \u00b7 Frequency: 4\u20135\u00d7 per week \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── SCULPT WAND ───
  "facial-beauty-tools-and-ems-beauty-equipment": {
    handle: "facial-beauty-tools-and-ems-beauty-equipment",
    name: "Sculpt Wand",
    subheadline: "EMS Microcurrent + Lymphatic Vibration. Facial Muscle Training.",
    benefits: [
      { icon: Zap, label: "EMS Microcurrent (0.4–5.5W)" },
      { icon: Vibrate, label: "Lymphatic Vibration" },
      { icon: Gauge, label: "Progressive Intensity" },
      { icon: Activity, label: "Facial Muscle Training" },
    ],
    testimonials: [
      { name: "Annika, 34", text: "Third week. My jawline is more defined than it's been in years. I train it like I train everything else." },
      { name: "Fatima, 39", text: "The vibration finish is what makes it different. My face is less puffy every single morning." },
      { name: "Camille, 26", text: "EMS is EMS. It contracts. It works. That's it." },
    ],
    problemReframe: {
      headline: "EMS Has Been Used in Rehabilitation for Decades. Your Face Has the Same Muscles.",
      paragraphs: [
        "Electrical Muscle Stimulation is established medicine. Sports clinics, physical therapy, post-operative rehabilitation. The mechanism is not new: an electrical impulse triggers an involuntary muscle contraction. The muscle works. Tone builds.",
        "The Sculpt Wand applies this to the 43 muscles of the face. EMS microcurrent at variable 0.4–5.5W — intensity that scales as tolerance builds, the same progressive overload principle that governs any effective training protocol.",
        "Paired with mechanical vibration. The lymphatic system has no pump — it relies on muscular movement. Vibration provides that stimulus, supporting drainage and reducing retained fluid from the face. EMS contracts. Vibration circulates.",
      ],
      closing: "Train what you have. Circulate what stagnates.",
    },
    techCards: [
      { icon: Zap, title: "EMS Microcurrent", desc: "Patterned electrical impulses cause involuntary facial muscle contractions — replicating voluntary muscular exercise at the neuromuscular level. Variable output (0.4–5.5W) allows progressive intensity increase over weeks. Same principle as resistance training." },
      { icon: Vibrate, title: "Lymphatic Vibration", desc: "Motor vibration at the surface stimulates lymphatic circulation. The lymphatic system moves only when the tissue around it moves. Vibration provides that mechanical input — supporting drainage, reducing puffiness and fluid retention." },
      { icon: Gauge, title: "Progressive Intensity", desc: "Four intensity levels from 0.4W to 5.5W. Start minimal. Increase week by week. Muscle adaptation to EMS follows the same progression curve as athletic training — incremental, not immediate." },
      { icon: Activity, title: "TYPE-C Build", desc: "400mAh battery \u00b7 TYPE-C fast charge \u00b7 1.5\u20132h full charge \u00b7 ABS/zinc alloy construction \u00b7 120 \u00d7 67 \u00d7 39mm. Built for daily use without interruption." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Apply conductive gel. Required for EMS — gel ensures current transfers to tissue, not lost at the surface." },
      { step: "02", title: "Train", desc: "Lowest intensity first. Hold against each zone 30–45 seconds: chin \u2192 jaw \u2192 cheekbones \u2192 forehead." },
      { step: "03", title: "Circulate", desc: "Vibration mode to finish. Downward from temples \u2192 ear \u2192 neck. Follow lymph direction. Total: 8–12 minutes." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemSculptWand,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "EMS \u00b7 Facial Muscles", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+facial+wrinkles+sagging+cosmetic" },
      { technology: "Progressive EMS", studyTitle: "Use of a Neuromuscular Electrical Stimulation Device for Facial Muscle Toning", journal: "Journal of Cosmetic Dermatology, 2012", url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+facial+muscle+toning+cosmetic+2012" },
      { technology: "Lymphatic Vibration", studyTitle: "Low-Frequency Vibrotherapy Improves the Effectiveness of Manual Lymphatic Drainage", journal: "Journal of Clinical Medicine, 2018", url: "https://scholar.google.com/scholar?q=vibrotherapy+lymphatic+drainage+manual+skin+facial+clinical+medicine+2018" },
      { technology: "EMS Mechanism", studyTitle: "A Systematic Review of the Effects of Neuromuscular Electrical Stimulation on Facial Muscles", journal: "Journal of Facial Plastic Surgery, 2021", url: "https://scholar.google.com/scholar?q=systematic+review+neuromuscular+electrical+stimulation+facial+muscles+2021" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A controlled pulse during EMS \u2014 should feel like a gentle involuntary contraction",
      "No burning \u2014 if burning occurs, reduce intensity immediately and add more gel",
      "Vibration at the surface \u2014 like a gentle buzz, not discomfort",
    ],
    sessionInfo: "Session time: 8\u201312 minutes \u00b7 Frequency: 3\u20135\u00d7 per week \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── FRAME PULSE ACTIVATOR ───
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": {
    handle: "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
    name: "Frame Pulse Activator",
    subheadline: "Hands-Free EMS and LED Beauty Device",
    benefits: [
      { icon: Focus, label: "Hands-Free Treatment" },
      { icon: Zap, label: "EMS Muscle Training" },
      { icon: Sun, label: "Full-Spectrum LED" },
      { icon: Brain, label: "Multi-Zone Coverage" },
    ],
    testimonials: [
      { name: "Iris, 38", text: "Hands-free means I actually use it every day. Put it on, relax, and let it work." },
      { name: "Tessa, 43", text: "The EMS pulsing feels like a professional facial. Except I'm on my couch." },
      { name: "Monica, 31", text: "My forehead lines are visibly softer after 3 weeks. This device is underrated." },
    ],
    problemReframe: {
      headline: "Your Routine Should Work for You. Not Against You.",
      paragraphs: [
        "The biggest barrier to results isn't technology. It's consistency. Handheld devices require active effort, and effort creates friction. Friction kills habits.",
        "Frame Pulse removes the friction entirely. Wear it. Press start. Your hands are free. Your ritual happens while you rest, read, or prepare for the day.",
        "With EMS and full-spectrum LED working simultaneously across multiple facial zones, you get comprehensive treatment without holding, guiding, or concentrating.",
      ],
      closing: "The best ritual is the one you actually do.",
    },
    techCards: [
      { icon: Zap, title: "EMS Training", desc: "Electrical muscle stimulation contracts and releases facial muscles automatically for toning without effort." },
      { icon: Sun, title: "LED Array", desc: "Full-spectrum LED covers the entire treatment area simultaneously for uniform collagen stimulation." },
      { icon: Focus, title: "Hands-Free", desc: "Wearable design means zero effort during treatment. Just put it on and press start." },
      { icon: Vibrate, title: "Pulse Patterns", desc: "Pre-programmed pulse sequences target different muscle groups in optimized intervals." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse your face and apply serum. Position the Frame Pulse comfortably on your face." },
      { step: "02", title: "Activate", desc: "Select your program and intensity. Relax. The device works automatically for 10 minutes." },
      { step: "03", title: "Repeat", desc: "Use daily or every other day. The hands-free design makes consistency effortless." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    problemImage: problemFramePulse,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "EMS", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=electrical+muscle+stimulation+facial" },
      { technology: "LED Array", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=LED+light+therapy+skin+rejuvenation" },
      { technology: "Hands-Free EMS", studyTitle: "A Controlled Trial to Determine the Efficacy of Red and Near-Infrared Light Treatment", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=electrical+muscle+stimulation+facial" },
      { technology: "Pulse Patterns", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=sonic+vibration+skin+absorption" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have epilepsy (due to light pulses)",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "Light rhythmic pulse during EMS \u2014 comfortable and expected",
      "Gentle warmth from LED array \u2014 keep eyes closed",
      "No sensation between pulse cycles \u2014 normal",
    ],
    sessionInfo: "Session time: 10 minutes \u00b7 Frequency: daily or every other day \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── MICROCURRENT SCULPT WAND (unlisted) ───
  "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": {
    handle: "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening",
    name: "Microcurrent Sculpt Wand",
    subheadline: "Advanced Sculpting Wand with Dual-Wave Microcurrent",
    benefits: [
      { icon: Zap, label: "Dual-Wave Microcurrent" },
      { icon: ScanFace, label: "Full-Face Sculpting" },
      { icon: Sun, label: "LED Integration" },
      { icon: Heart, label: "Muscle Re-Education" },
    ],
    testimonials: [
      { name: "Hana, 33", text: "The dual-wave mode feels different from anything I've tried. My jawline responds within days." },
      { name: "Rebecca, 46", text: "Professional-grade results from my bathroom. I cancelled my monthly facial appointments." },
      { name: "Zara, 29", text: "Lightweight, precise, effective. This is the only device I've used consistently for months." },
    ],
    problemReframe: {
      headline: "Your Muscles Remember. Train Them.",
      paragraphs: [
        "Facial muscles, like all muscles, respond to training. When stimulated consistently, they develop tone, hold their position, and create the visible structure we associate with a youthful face.",
        "Without stimulation, facial muscles gradually atrophy. This isn't damage. It's simply disuse. The architecture is still there, waiting to be reactivated.",
        "The Microcurrent Sculpt Wand uses dual-wave technology to deliver two complementary current patterns, one for deep muscle activation and one for surface toning.",
      ],
      closing: "Your face has muscle memory. Reactivate it.",
    },
    techCards: [
      { icon: Zap, title: "Dual-Wave Current", desc: "Two complementary microcurrent frequencies work together for deep activation and surface toning." },
      { icon: ScanFace, title: "Full-Face Mode", desc: "Ergonomic head design covers larger treatment areas for efficient full-face sculpting sessions." },
      { icon: Sun, title: "LED Boost", desc: "Integrated LED light enhances collagen stimulation during microcurrent treatment." },
      { icon: Waves, title: "Smart Pulse", desc: "Adaptive pulse patterns respond to tissue resistance for optimal current delivery in every zone." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse thoroughly and apply conductive medium. Select dual-wave mode for comprehensive treatment." },
      { step: "02", title: "Activate", desc: "Work systematically from neck upward: jawline, cheeks, forehead. Hold 5 seconds per zone. 5 minutes total." },
      { step: "03", title: "Repeat", desc: "Commit to your daily ritual. Muscle re-education is progressive. Week 3 is where the shift begins." },
    ],
    beforeAfter: { before: before2Img, after: after2Img },
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Microcurrent", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=microcurrent+ATP+skin+cells" },
      { technology: "Dual-Wave", studyTitle: "Use of a Neuromuscular Electrical Stimulation Device for Facial Muscle Toning", journal: "Journal of Cosmetic Dermatology, 2012", url: "https://scholar.google.com/scholar?q=photobiomodulation+630nm+collagen+skin" },
      { technology: "LED Boost", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=LED+light+therapy+skin+rejuvenation" },
      { technology: "Smart Pulse", studyTitle: "Electromagnetic Muscle Stimulation: A Retrospective Study", journal: "Journal of Cosmetic Dermatology, 2022", url: "https://scholar.google.com/scholar?q=electrical+muscle+stimulation+facial" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A mild tingling or warmth during use \u2014 expected",
      "Slight redness that fades within 30 minutes \u2014 normal",
      "No sensation at all on microcurrent mode \u2014 correct, it\u2019s sub-sensory",
    ],
    sessionInfo: "Session time: 5 minutes \u00b7 Frequency: daily \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },

  // ─── COLLAGEN FACE GEL ───
  "medicube-collagen-elastic-jelly-moisturizing-cream": {
    handle: "medicube-collagen-elastic-jelly-moisturizing-cream",
    name: "Collagen Face Gel",
    subheadline: "Device-Optimized Conductive Gel with Collagen Complex",
    isAccessory: true,
    benefits: [
      { icon: Droplets, label: "Deep Hydration" },
      { icon: Sparkles, label: "Collagen Elasticity" },
      { icon: Zap, label: "Device Conductivity" },
      { icon: ShieldCheck, label: "Dermatologist Reviewed" },
    ],
    testimonials: [
      { name: "Emma, 30", text: "This gel made my device sessions twice as effective. My skin drinks it up." },
      { name: "Kate, 37", text: "Finally a conductive gel that also works as skincare. No sticky residue, just glow." },
      { name: "Ava, 42", text: "I tried other gels before. This one glides perfectly and my skin feels plump all day." },
    ],
    problemReframe: {
      headline: "Your Device Needs a Partner. Not Just Any Product.",
      paragraphs: [
        "Microcurrent devices require a conductive medium to work properly. Without it, current can't travel effectively through the skin, reducing treatment efficacy by up to 60%.",
        "Most conductive gels are pure function, no skincare benefit. And most serums don't conduct. You end up choosing between conductivity and nourishment.",
        "Collagen Face Gel bridges both. Formulated with hydrolyzed collagen, hyaluronic acid, and optimal ionic conductivity, it ensures every pulse reaches your muscles while feeding your skin.",
      ],
      closing: "The right medium amplifies everything.",
    },
    techCards: [
      { icon: Droplets, title: "Collagen Complex", desc: "Hydrolyzed collagen peptides support skin elasticity and firmness with every application." },
      { icon: Zap, title: "Ionic Conductivity", desc: "Specifically formulated to conduct microcurrent and EMS signals for maximum device efficacy." },
      { icon: Sparkles, title: "Hyaluronic Acid", desc: "Multi-weight hyaluronic acid provides layered hydration from surface to deeper skin layers." },
      { icon: ShieldCheck, title: "Clean Formula", desc: "Free from parabens, sulfates, and artificial fragrance. Suitable for all skin types including sensitive." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse your face. Apply a generous layer of Collagen Face Gel to the treatment area." },
      { step: "02", title: "Activate", desc: "Use with your ZENTIAL device. The gel ensures optimal current delivery during your ritual." },
      { step: "03", title: "Repeat", desc: "After your ritual, massage any remaining gel into the skin. No need to rinse. Use daily." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    comparisonRows: accessoryComparison,
    faqs: [
      { q: "Can I use this without a device?", a: "Yes. Collagen Face Gel works as a standalone moisturizer and collagen treatment. However, it's specially formulated to enhance device results when used together." },
      { q: "How long does one jar last?", a: "With daily use during device sessions, one jar typically lasts 4 to 6 weeks depending on application amount." },
      { q: "Is it suitable for sensitive skin?", a: "Yes. The formula is free from parabens, sulfates, and artificial fragrance. It's been reviewed by dermatologists for sensitive skin compatibility." },
      { q: "Can I use it around my eyes?", a: "Yes. The gentle formula is safe for the periorbital area. Use a thin layer when pairing with the Eye Activator." },
      { q: "Does it work with all ZENTIAL devices?", a: "Yes. Collagen Face Gel is compatible with all ZENTIAL PURE devices including Body Lift, Eye Activator, Sculpt Wand, and Gua Sha Frequency." },
      { q: "What is your guarantee?", a: "We offer a 30-Day Ritual Guarantee on all products. If you're not satisfied, contact us for a full refund." },
    ],
  },

  // ─── COLLAGEN PDRN PADS ───
  "collagen-eye-mask": {
    handle: "collagen-eye-mask",
    name: "Collagen PDRN Pads",
    subheadline: "Concentrated Collagen Eye Patches with PDRN Technology",
    isAccessory: true,
    benefits: [
      { icon: Eye, label: "Under-Eye Revival" },
      { icon: Beaker, label: "PDRN Technology" },
      { icon: Sparkles, label: "Collagen Infusion" },
      { icon: Heart, label: "Instant Plumping" },
    ],
    testimonials: [
      { name: "Julia, 35", text: "I wear these before my Eye Activator session. The combination is unmatched." },
      { name: "Mina, 29", text: "Morning puffiness gone in 15 minutes. These are my new non-negotiable." },
      { name: "Sophie, 44", text: "The PDRN formula is real. My under-eyes look brighter and the fine lines are fading." },
    ],
    problemReframe: {
      headline: "Your Under-Eyes Need Repair. Not Concealer.",
      paragraphs: [
        "The periorbital area ages faster than any other part of your face. Thin skin, constant movement, and poor lymphatic drainage create dark circles, puffiness, and fine lines that worsen over time.",
        "Concealer hides the symptoms. But the tissue underneath continues to thin, lose collagen, and accumulate damage. Surface coverage doesn't equal structural repair.",
        "Collagen PDRN Pads deliver polydeoxyribonucleotide directly to the under-eye area, stimulating cellular regeneration and collagen synthesis where it matters most.",
      ],
      closing: "Repair the tissue. The brightness follows.",
    },
    techCards: [
      { icon: Beaker, title: "PDRN Complex", desc: "Polydeoxyribonucleotide promotes cellular repair and regeneration in the delicate under-eye tissue." },
      { icon: Sparkles, title: "Collagen Matrix", desc: "High-concentration collagen peptides rebuild skin density and reduce the appearance of fine lines." },
      { icon: Droplets, title: "Hydrogel Delivery", desc: "Advanced hydrogel technology ensures sustained ingredient release over the entire wearing period." },
      { icon: Eye, title: "Contour Fit", desc: "Ergonomic pad shape conforms perfectly to the orbital area for maximum contact and absorption." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse the under-eye area. Remove pads from packaging and apply to clean, dry skin." },
      { step: "02", title: "Activate", desc: "Leave on for 15 to 20 minutes. For enhanced results, use before your Eye Activator session." },
      { step: "03", title: "Repeat", desc: "Use 3 to 4 times per week. Pat remaining essence into the skin after removal. Do not rinse." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    comparisonRows: accessoryComparison,
    faqs: [
      { q: "How often should I use these?", a: "We recommend 3 to 4 times per week for optimal results. They can be used daily if desired, especially when targeting stubborn dark circles or puffiness." },
      { q: "Can I use them with the Eye Activator?", a: "Yes. For best results, apply the pads first for 15 minutes, then follow with your Eye Activator session. The PDRN primes the tissue for enhanced device efficacy." },
      { q: "How many pads are in each pack?", a: "Each pack contains multiple pairs of pads designed for a full month of regular use (3 to 4 times per week)." },
      { q: "Are they suitable for sensitive skin?", a: "Yes. The hydrogel formula is fragrance-free and dermatologist reviewed. If you experience irritation, reduce frequency of use." },
      { q: "Do I rinse after use?", a: "No. After removing the pads, gently pat the remaining essence into the skin. This allows continued absorption of active ingredients." },
      { q: "What is your guarantee?", a: "We offer a 30-Day Ritual Guarantee on all products. If you're not satisfied, contact us for a full refund." },
    ],
  },

  // ─── FREQUENCY WAND PRO ───
  "portable-ems-microcurrent-facial-beauty-device": {
    handle: "portable-ems-microcurrent-facial-beauty-device",
    name: "Frequency Wand Pro",
    subheadline: "Ion Purification + EMS Microcurrent. Clear First. Stimulate Second.",
    benefits: [
      { icon: ShieldCheck, label: "Negative Ion Cleansing" },
      { icon: Zap, label: "EMS Microcurrent Firming" },
      { icon: Droplets, label: "Electrostatic Purification" },
      { icon: Gauge, label: "High-Capacity Battery (1200–2000mAh)" },
    ],
    testimonials: [
      { name: "Leah, 30", text: "The ion cleansing phase is the step I didn't know I was missing. Everything works better after it." },
      { name: "Andrea, 38", text: "Ion cleanse. EMS. Serum. Under ten minutes. My skin hasn't looked like this since I was in my twenties." },
      { name: "Nadia, 34", text: "The sequence matters. Cleanse first, stimulate second. I noticed the difference the first time I got the order right." },
    ],
    problemReframe: {
      headline: "Your Skin Needs to Be Clear Before It Can Be Stimulated.",
      paragraphs: [
        "Two things consistently prevent skin rituals from delivering results. First: a pore environment saturated with oxidative residue and environmental buildup — surface cleansers remove what's on top, not what's embedded in the follicle. Second: EMS current trying to pass through tissue with high surface resistance.",
        "The Frequency Wand Pro addresses both, in sequence. Negative ion output creates an electromagnetic attraction between the instrument and positively charged impurities — sebum oxidation, particulates, residual product buildup. The cleansing is electrical, not abrasive. No friction. The barrier stays intact.",
        "After the cleansing phase, EMS microcurrent runs into cleaner tissue with lower resistance and better conductivity. The high-capacity battery (1200–2000mAh) ensures consistent output across a full session. The sequence is the product.",
      ],
      closing: "Sequence is protocol. Protocol is result.",
    },
    techCards: [
      { icon: ShieldCheck, title: "Negative Ion Cleansing", desc: "Negative ion output attracts and lifts positively charged impurities — sebum oxidation, environmental particulates, residual product buildup — from the follicle via electrostatic force. No friction. No disruption to the skin barrier." },
      { icon: Zap, title: "EMS Microcurrent", desc: "Low-frequency electrical pulses stimulate facial muscle groups and support fibroblast activity in the dermis. High-capacity battery (1200–2000mAh) ensures consistent output across a full protocol without current drop." },
      { icon: Droplets, title: "Conductivity After Cleansing", desc: "Ion-cleansed tissue presents less surface resistance. EMS current travels more efficiently into the dermis. The cleaning phase is not cosmetic — it's functional preparation for the stimulation phase." },
      { icon: Gauge, title: "Built for Daily Protocol", desc: "1200\u20132000mAh battery \u00b7 USB charging \u00b7 Compact portable format. Designed for a 10-minute daily ritual without battery anxiety." },
    ],
    ritualSteps: [
      { step: "01", title: "Cleanse", desc: "Negative ion mode — 2–3 minutes across face and neck. No serum yet. Let the ions draw out surface buildup first." },
      { step: "02", title: "Stimulate", desc: "Apply conductive serum. EMS microcurrent mode — 3–5 minutes, upward strokes jaw to temple." },
      { step: "03", title: "Repeat", desc: "4–5\u00d7 per week. Total protocol: under 10 minutes. Sequence does not change." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemWandPro,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
    studyCards: [
      { technology: "Ion Cleansing \u00b7 Galvanic", studyTitle: "Galvanic Current and Skin Barrier Integrity in Transdermal Electrostimulation", journal: "Journal of Cosmetic Science, 2003", url: "https://scholar.google.com/scholar?q=galvanic+current+facial+cleansing+ion+skin+barrier+electrostimulation" },
      { technology: "EMS Microcurrent", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+facial+wrinkles+sagging+cosmetic" },
      { technology: "ATP \u00b7 Cellular Stimulation", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation+protein+synthesis+skin" },
      { technology: "Iontophoresis", studyTitle: "Iontophoresis for Drug Delivery: Principles, Opportunities and Challenges", journal: "Advanced Drug Delivery Reviews, 2011", url: "https://scholar.google.com/scholar?q=iontophoresis+transdermal+drug+delivery+principles+opportunities+challenges+2011" },
    ],
    contraindications: [
      "You have a pacemaker or implanted electronic device",
      "You are pregnant",
      "You have active skin infections or open wounds in the treatment area",
      "You have metal implants in the face",
    ],
    normalSensations: [
      "A mild surface tingle during ion cleansing \u2014 comfortable and expected",
      "No sensation on microcurrent \u2014 sub-sensory is correct",
      "Slight warmth after sustained contact \u2014 normal",
    ],
    sessionInfo: "Session time: 10 minutes \u00b7 Frequency: 4\u20135\u00d7 per week \u00b7 Stop if: burning sensation, unusual pain, or persistent redness",
  },
};

export function getProductConfig(handle: string): ProductConfig | null {
  return productConfigs[handle] || null;
}
