import { Sparkles, Flame, Heart, Brain, Sun, Zap, Waves, ThermometerSun, Eye, Gauge, Focus, CircleDot, ShieldCheck, Droplets, ScanFace, Vibrate, Radio, Gem, Aperture, Activity, Beaker, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";
import before2Img from "@/assets/before2.webp";
import after2Img from "@/assets/after2.webp";
import before3Img from "@/assets/before3.webp";
import after3Img from "@/assets/after3.webp";

import problemFaceIntroducer from "@/assets/problem-face-introducer-v2.webp";
import problemFramePulse from "@/assets/problem-frame-pulse.webp";
import problemGuasha from "@/assets/problem-guasha-v2.webp";
import problemSkinpulse from "@/assets/problem-skinpulse-v2.webp";
import problemEyeActivator from "@/assets/problem-eye-activator.webp";
import problemFrequencyWand from "@/assets/problem-frequency-wand-v2.webp";
import problemDepthMask from "@/assets/problem-depth-mask.webp";
import problemThermalZoneLite from "@/assets/problem-thermal-zone-lite.webp";
import problemPressureShell from "@/assets/problem-pressure-shell.webp";
import problemPulseRoller from "@/assets/problem-pulse-roller.webp";
import problemRestoreMat from "@/assets/problem-restore-mat.webp";
import problemSculptWand from "@/assets/problem-sculpt-wand-v2.webp";

import problemWandPro from "@/assets/problem-wand-pro.webp";
import productBodyLift from "@/assets/product-body-lift.webp";
import productSculptWand from "@/assets/ritual-sculpt-wand.webp";
import productEyeActivator from "@/assets/ritual-eye-activator.webp";
import productFramePulse from "@/assets/ritual-frame-pulse.webp";
import productFrequencyWand from "@/assets/ritual-frequency-wand.webp";
import productFrequencyWandPro from "@/assets/ritual-frequency-wand-pro.webp";
import productGuaSha from "@/assets/ritual-gua-sha.webp";
import productSkinPulse from "@/assets/ritual-skin-pulse.webp";
import productFaceIntroducer from "@/assets/problem-face-introducer.webp";
import productFaceLift from "@/assets/problem-face-introducer.webp";

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
 forYouIf?: string[];
 studyCards?: StudyCard[];
 contraindications?: string[];
 normalSensations?: string[];
 sessionInfo?: string;
 mechanismTimeline?: { week: string; heading: string; body: string }[];
 techSectionTitle?: string;
 bonusStack?: { title: string; desc: string; value: string }[];
 guaranteeName?: string;
 guaranteeDesc?: string;
 valueAnchor?: string;
}

const defaultComparison = [
 { feature: "Cost over 6 months", zential: "One-time investment", clinic: "€1,200+", creams: "€300+", generic: "€40–€80 (repeated)" },
 { feature: "Appointments needed", zential: "None", clinic: "12+ visits", creams: "None", generic: "None" },
 { feature: "Long-term structural support", zential: true, clinic: true, creams: false, generic: false },
 { feature: "Pain or downtime", zential: false, clinic: true, creams: false, generic: false },
 { feature: "Professional-grade control", zential: true, clinic: true, creams: false, generic: false },
 { feature: "Daily ritual integration", zential: true, clinic: false, creams: true, generic: true },
];

const recoveryComparison = [
 { feature: "Cost over 6 months", zential: "One-time investment", clinic: "€900+", creams: "N/A", generic: "€50–€100 (repeated)" },
 { feature: "Clinical-grade output", zential: true, clinic: true, creams: false, generic: false },
 { feature: "Daily home use", zential: true, clinic: false, creams: true, generic: true },
 { feature: "Session scheduling", zential: true, clinic: false, creams: true, generic: true },
 { feature: "Mechanism-first design", zential: true, clinic: true, creams: false, generic: false },
 { feature: "Compounding long-term effect", zential: true, clinic: true, creams: false, generic: false },
];

const defaultDeviceFaqs = [
 { q: "How long until I see results?", a: "Most users notice improved skin texture within 2 weeks of consistent daily use. Structural changes typically become visible after 3 to 4 weeks of daily ritual practice." },
 { q: "Can I use it daily?", a: "Yes. This device is designed for daily use in 5-minute sessions. Start at the lowest intensity and gradually increase as your skin adapts." },
 { q: "Is it safe for all skin types?", a: "Yes, it's designed for all skin types. If you have sensitive skin, start at the lowest setting. If irritation persists, reduce frequency and consult your dermatologist." },
 { q: "Who should not use this device?", a: "Do not use if you have a pacemaker, are pregnant, have active skin infections, epilepsy, or metal implants in the treatment area. Always consult your physician if you have a medical condition." },
 { q: "What serum works best?", a: "Any water-based conductive serum or gel works well. Avoid oil-based products as they can interfere with conductivity. Our Collagen Face Gel is specially formulated for optimal results." },
 { q: "What is your guarantee?", a: "30 days, daily use. If you see no visible improvement, email us. Full refund, no form, no questionnaire, no restocking fee. That is the 30-Day Protocol Guarantee." },
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
  purchaseHandle: "lifting-and-tightening-face-introducer",
  name: "Body Lift",
  fallbackImage: productBodyLift,
  subheadline: "Microcurrent Facial Lift, Built for Daily Structure",
  benefits: [
   { icon: Sparkles, label: "Microcurrent Lift" },
   { icon: Sun, label: "Cosmetic LED Visible-Light Support" },
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
    "Body Lift targets these layers directly. Through microcurrent, cosmetic LED, and sonic pulse, it works with your body's own systems to rebuild what time slowly softens.",
   ],
   closing: "This is about daily frequency, not emergency fixes.",
  },
  techCards: [
   { icon: Sun, title: "Cosmetic LED", desc: "Visible-spectrum LED pairs with microcurrent and thermal to support your daily ritual. Soft, non-clinical light delivery." },
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
   "A mild tingling or warmth during use, expected",
   "Slight redness that fades within 30 minutes, normal",
   "No sensation at all on microcurrent mode, correct, it’s sub-sensory",
  ],
  sessionInfo: "Session time: 5–10 minutes · Frequency: 5× per week · Stop if: burning sensation, unusual pain, or persistent redness",
 },

 // ─── LIFTING & TIGHTENING FACE INTRODUCER ───
 "lifting-and-tightening-face-introducer": {
  handle: "lifting-and-tightening-face-introducer",
  fallbackImage: productFaceIntroducer,
  name: "Face Introducer",
  subheadline: "4-Modality Daily Protocol: EMS · Microcurrent · Thermal (45°C) · Cosmetic LED · Ion Cleansing",
  benefits: [
   { icon: Zap, label: "EMS Microcurrent, ATP + Muscle" },
   { icon: ThermometerSun, label: "45°C Constant Thermal + Sonic" },
   { icon: ScanFace, label: "Positive & Negative Ion Cleansing" },
   { icon: Sun, label: "Cosmetic LED (Blue · Red · Purple modes)" },
  ],
  testimonials: [
   { name: "Lina, 29", text: "My skin absorbs everything differently now. The serum actually goes in. I can feel it." },
   { name: "Diane, 41", text: "Four modes. Ten minutes. My morning ritual is clear and my skin is firmer than it's been in years." },
   { name: "Priya, 35", text: "I was spending €90 a session on professional facials. This is the same galvanic mechanism. Once." },
  ],
  problemReframe: {
   headline: "Four Modalities. One Instrument. One Daily Ritual.",
   paragraphs: [
    "Most skincare works on the surface. The Face Introducer addresses four mechanisms in one sequential protocol, each with a specific role, each building on the last.",
    "EMS (Mode 4) releases intermittent microcurrent pulses that stimulate ATP production and support facial muscle fiber elasticity. 45°C constant thermal softens tissue and supports absorption throughout every mode. Positive and negative ions cleanse the follicle and then drive actives past the skin barrier, the same galvanic mechanism used in professional facials.",
    "Cosmetic LED (Modes 1–3, Blue · Red · Purple spectra) adds the visible-light component of the daily ritual. For confirmed clinical wavelength outputs, see Frame Pulse and Flux Panel.",
   ],
   closing: "EMS. Microcurrent. Thermal. Cosmetic LED. In that order.",
  },
  techCards: [
   { icon: Zap, title: "EMS, Mode 4", desc: "Releases intermittent microcurrent pulses that stimulate ATP production in facial muscle tissue. Supports facial muscle fiber elasticity. Operates current-only, no light component." },
   { icon: ScanFace, title: "Positive & Negative Ions", desc: "Negative ion output attracts and lifts positively charged impurities from the follicle, electrical cleansing, no abrasion, barrier intact. Polarity reverses to drive positively charged actives past the barrier via galvanic gradient. Same class of technology used in professional spa facials." },
   { icon: ThermometerSun, title: "45°C Thermal + Sonic", desc: "Constant 45°C hot compress softens tissue and supports ingredient absorption throughout every mode. Sonic vibration supports lymphatic drainage and product penetration. Both are always-on, not mode-dependent." },
   { icon: Sun, title: "Cosmetic LED, Mode 1 (Blue)", desc: "Soft visible-spectrum blue LED component of the daily ritual. Supports the morning protocol sequence. For confirmed clinical wavelength claims, see Frame Pulse and Flux Panel." },
   { icon: Sun, title: "Cosmetic LED, Mode 2 (Red)", desc: "Soft visible-spectrum red LED component of the daily protocol. Supports the visible-light step of the ritual. For confirmed clinical wavelengths, see Frame Pulse." },
   { icon: Aperture, title: "Cosmetic LED, Mode 3 (Purple)", desc: "Combined blue+red LED for the daily ritual stack. Visible-spectrum only." },
  ],
  ritualSteps: [
   { step: "01", title: "Cleanse", desc: "Ion cleansing mode, 2 minutes across full face. No serum yet. Let negative ions lift surface buildup first." },
   { step: "02", title: "Stimulate", desc: "Select EMS for muscle tone, or one of the three cosmetic LED modes (Blue, Red, Purple) for the daily ritual visible-light component. 3–5 minutes. The 45°C thermal is active throughout." },
   { step: "03", title: "Deliver", desc: "Apply serum. Positive ion mode drives actives through the barrier. Total protocol: under 10 minutes. 3–5× per week." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  problemImage: problemFaceIntroducer,
  comparisonRows: defaultComparison,
  forYouIf: [
   "You book professional facials but want the same galvanic technology at home, on your own schedule.",
   "You've tried serums and creams that absorb inconsistently, you want to understand the mechanism and fix it.",
   "You research before you buy. You want to understand what each mode does and why. Mechanism first.",
  ],
  faqs: [
   { q: "Does this actually work?", a: "The mechanisms in this device, EMS microcurrent, galvanic ion cleansing, iontophoretic delivery, 45°C thermal, and cosmetic LED, are each supported by peer-reviewed research where applicable. We link the actual studies on this page. What we cannot promise is the consistency you bring to it. Use it daily for 14 days before forming a conclusion." },
   { q: "How long until I see results?", a: "Improved skin absorption is measurable from the first session, the galvanic ion delivery changes how actives penetrate. Skin clarity and texture typically respond within 7 to 10 days. Firming becomes visible at 3 to 4 weeks of consistent daily use." },
   { q: "Is it safe for daily use?", a: "Yes. The Face Introducer is designed for daily 7–10 minute protocols. The 45°C thermal stays within safe tissue temperature. Galvanic cleansing is non-abrasive. EMS is calibrated at home-device intensity. Start on the lowest of the four speed settings and increase over the first week." },
   { q: "What if it doesn't work for me?", a: "30 days, daily use. If you see no visible change in skin tone, firmness, or definition, email us. Full refund, no form, no questionnaire, no restocking fee. That is the 30-Day Protocol Guarantee. We print it on the box." },
   { q: "How is this different from a clinic?", a: "One professional microcurrent session: €90–€180. Monthly clinic protocol: €220+/month, €2,640+/year. The Face Introducer uses the same class of technology, ion cleansing, EMS microcurrent, thermal, cosmetic LED, for a one-time €88 purchase. The mechanism is the same. The math is not." },
   { q: "Which mode should I use first?", a: "Start with ion cleansing (negative ion mode) every session, it clears the follicle so subsequent modes work on clean tissue. Then select EMS for firming, or one of the three cosmetic LED modes (Blue, Red, Purple) based on the daily protocol you want." },
   { q: "Is this clinical red light therapy?", a: "No. The cosmetic LED modes in the Face Introducer are visible-spectrum LED, not the clinical wavelengths used in photobiomodulation research. For confirmed clinical wavelength output, see Frame Pulse or Flux Panel." },
  ],
  studyCards: [
   { technology: "EMS · ATP Production", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation+protein+synthesis+skin" },
   { technology: "Iontophoresis · Ion Cleansing", studyTitle: "Iontophoresis for Drug Delivery: Principles, Opportunities and Challenges", journal: "Advanced Drug Delivery Reviews, 2011", url: "https://scholar.google.com/scholar?q=iontophoresis+transdermal+drug+delivery+skin+galvanic+principles" },
   { technology: "Microcurrent · Facial Toning", studyTitle: "The Use of Microcurrent in Aesthetic Facial Treatment", journal: "Journal of Cosmetic Dermatology", url: "https://scholar.google.com/scholar?q=microcurrent+aesthetic+facial+treatment" },
  ],
  contraindications: [
   "You have a pacemaker or implanted electronic device",
   "You are pregnant",
   "You have epilepsy or photosensitive conditions",
   "You have active skin infections or open wounds in the treatment area",
   "You have metal implants in the face or neck",
  ],
  normalSensations: [
   "Mild surface tingle during ion cleansing, fully comfortable",
   "Gentle 45°C warmth throughout every mode, expected and therapeutic",
   "Faint pulse during EMS mode, confirms current delivery",
   "Subtle tingle during positive ion infusion, confirms galvanic delivery",
  ],
  sessionInfo: "Session time: 7–10 minutes · Frequency: 3–5× per week · Four intensity levels · Stop if: burning, unusual pain, or redness persisting over 30 min",
  valueAnchor: "One professional microcurrent session: €90–€180. The Face Introducer: €88. Once.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "Use it daily for 30 days. If you see no visible change in skin tone, firmness, or definition, full refund. No form, no questions, no restocking fee.",
  bonusStack: [
   { title: "The Face Protocol Guide", desc: "Step-by-step ritual breakdown for all four modes. Which order. Which serum. Which frequency.", value: "€19" },
   { title: "Modality Masterclass PDF", desc: "Mechanism explanation for each technology, so you know exactly what's happening at the cellular level.", value: "€27" },
   { title: "21-Day Progress Tracker", desc: "Week-by-week photo + observation template. The protocol without tracking is just hope.", value: "€17" },
   { title: "Serum Pairing Guide", desc: "Which actives work with each mode. What to apply before ion cleansing vs. before iontophoresis.", value: "€14" },
   { title: "Clinic Cost Calculator", desc: "A one-page breakdown: what you would have spent at the clinic in 6 months vs. this device.", value: "€12" },
  ],
 },

 // ─── EYE ACTIVATOR ───
 "eye-massage": {
  handle: "eye-massage",
  fallbackImage: productEyeActivator,
  name: "Eye Activator",
  subheadline: "Microcurrent · Sonic Vibration · Cosmetic LED for the Periorbital Zone",
  benefits: [
   { icon: Eye, label: "Under-Eye Depuffing" },
   { icon: Zap, label: "Microcurrent (Periorbital Zone)" },
   { icon: Waves, label: "Sonic Lymphatic Drainage" },
   { icon: Sun, label: "Cosmetic LED Component" },
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
    "Eye creams can hydrate the surface, but they cannot stimulate the drainage pathways or activate the collagen network beneath. The tissue needs movement and light.",
    "Eye Activator combines microcurrent, sonic vibration, and cosmetic LED to address the periorbital zone from three angles: sub-sensory current for the underlying tissue, mechanical stimulation to encourage lymphatic drainage, and a soft visible-light component that pairs with your serum ritual.",
   ],
   closing: "This is about restoring circulation, not masking exhaustion.",
  },
  techCards: [
   { icon: Waves, title: "Sonic Vibration", desc: "High-frequency oscillation creates mechanical movement in the periorbital tissue, supporting lymphatic drainage and reducing fluid retention that appears as puffiness." },
   { icon: Sun, title: "Cosmetic LED", desc: "Visible-spectrum LED supports the daily ritual at the periorbital zone. Soft light delivery, no clinical wavelength claim. For confirmed clinical red light at this zone, see Frame Pulse." },
   { icon: Zap, title: "Microcurrent", desc: "Sub-sensory current operates within the body's own bioelectric range, for the thinnest skin on the face, with a calibrated periorbital intensity." },
   { icon: ThermometerSun, title: "Warm Mode", desc: "Controlled thermal energy enhances serum absorption and promotes blood flow to the eye area." },
   { icon: Droplets, title: "Serum Activation", desc: "The combination of warmth and vibration drives serums deeper into the periorbital tissue than manual application alone." },
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
   { technology: "Microcurrent · ATP", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation" },
   { technology: "Sonic Vibration", studyTitle: "Low-Frequency Vibrotherapy Improves the Effectiveness of Manual Lymphatic Drainage", journal: "Journal of Clinical Medicine, 2018", url: "https://scholar.google.com/scholar?q=sonic+vibration+lymphatic+drainage" },
   { technology: "Thermal", studyTitle: "Collagen Remodeling After 585-nm Pulsed Dye Laser Irradiation", journal: "Dermatologic Surgery, 2003", url: "https://scholar.google.com/scholar?q=thermal+therapy+skin+collagen" },
   { technology: "Vibration + Absorption", studyTitle: "Enhancement of Topical Drug Delivery by Sonophoresis", journal: "Journal of Controlled Release, 2004", url: "https://scholar.google.com/scholar?q=vibration+sonic+skin+absorption+topical" },
  ],
  contraindications: [
   "You are pregnant",
   "You have active eye infections or recent eye surgery",
   "You have epilepsy or photosensitive conditions",
   "You have metal implants near the eye area",
  ],
  normalSensations: [
   "A gentle buzzing or vibration during use, expected",
   "A mild warmth in warm mode, normal",
   "Slight redness that fades within 30 minutes, normal",
  ],
  sessionInfo: "Session time: 3 minutes per eye · Frequency: daily · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Eye-zone clinic treatments: €80–€150 per session. Eye Activator: €88. Once.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "Use it daily for 30 days. If you see no visible change in puffiness, dark circles, or fine lines, full refund. No questions.",
  bonusStack: [
   { title: "The Eye Zone Protocol Guide", desc: "Morning depuff routine vs. evening repair routine, exactly which movements, which order.", value: "€17" },
   { title: "Serum Pairing Guide", desc: "Which eye actives (peptides, caffeine, retinol) work with sonic delivery vs. heat mode.", value: "€14" },
   { title: "Progress Tracker", desc: "Photo template to document the periorbital zone week by week.", value: "€12" },
  ],
 },

 // ─── FREQUENCY WAND ───
 "color-light-import-micro-current-vibration-massager": {
  handle: "color-light-import-micro-current-vibration-massager",
  fallbackImage: productFrequencyWand,
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
    "Glow mode uses orange-spectrum light with EMS for circulation and radiance. Line mode uses green light for pigmentation. Contour mode uses red light at 630–660nm, the most studied wavelength in photobiomodulation research, with EMS for collagen support. Pore mode uses blue light with electroporation for deep antibacterial delivery. Acne mode combines red and blue simultaneously with electroporation for active breakouts.",
   ],
   closing: "Prescribe. Don't generalise.",
  },
  techCards: [
   { icon: Sun, title: "5-Spectrum LED", desc: "Five clinically relevant wavelengths: Red (630–660nm, photobiomodulation + collagen) · Blue (~415nm, antibacterial) · Green (~520nm, pigmentation and tone) · Orange (circulation and radiance) · Purple (red + blue combined). Each mode activates the wavelength matched to its target." },
   { icon: Zap, title: "EMS Microcurrent", desc: "Integrated into modes 1–3 (Glow, Line, Contour). Electrical impulses cause involuntary facial muscle contractions, progressively training tone. Same mechanism used in sports rehabilitation, applied to facial architecture." },
   { icon: Activity, title: "Electroporation", desc: "Modes 4–5 (Pore, Acne) use pulsed electrical fields to create temporary micro-channels in the cell membrane, allowing large active molecules to penetrate depths iontophoresis cannot reach. Apply your targeted serum before these modes." },
   { icon: Vibrate, title: "Vibration", desc: "Layered into all five modes. Mechanical vibration stimulates lymphatic circulation, supports drainage, and enhances product absorption across every protocol." },
  ],
  ritualSteps: [
   { step: "01", title: "Prescribe", desc: "Identify today's concern: radiance, lines, firmness, pores, or acne. Select the corresponding mode. Don't rotate randomly." },
   { step: "02", title: "Activate", desc: "Apply conductive serum. Run your selected mode 3–5 minutes on the target zone. For electroporation modes, serum goes on first." },
   { step: "03", title: "Layer", desc: "Full protocol: Contour (red + EMS) → Pore (blue + electroporation). Under 15 minutes. IPX3-rated, bathroom safe." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  problemImage: problemFrequencyWand,
  comparisonRows: defaultComparison,
  faqs: defaultDeviceFaqs,
  studyCards: [
   { technology: "Red Light 630–660nm", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
   { technology: "Blue Light · Antibacterial", studyTitle: "Phototherapy with Blue (415nm) and Red (660nm) Light in the Treatment of Acne Vulgaris", journal: "British Journal of Dermatology, 2000", url: "https://scholar.google.com/scholar?q=papageorgiou+blue+415nm+red+660nm+acne+vulgaris+phototherapy+2000" },
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
   "A comfortable pulse during EMS modes, expected",
   "Mild warmth from LED, keep eyes closed during purple and blue modes",
   "Brief surface tingle during electroporation, normal, confirms micro-channel formation",
  ],
  sessionInfo: "Session time: 3–5 min per mode · Frequency: 3–5× per week · IPX3 waterproof · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Five modes. Five clinical mechanisms. One €147 device vs. €150+ per multi-modality clinic session.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "30 days daily use. No visible improvement, full refund, no friction.",
  bonusStack: [
   { title: "The 5-Mode Prescription Guide", desc: "Which mode for which concern. Glow, Line, Contour, Pore, Acne, prescribed not randomised.", value: "€22" },
   { title: "Electroporation Serum Guide", desc: "Which active molecules benefit from electroporation delivery vs. standard application.", value: "€17" },
   { title: "Weekly Protocol Planner", desc: "How to rotate modes across a 7-day cycle without overworking any skin variable.", value: "€14" },
  ],
 },

 // ─── GUA SHA FREQUENCY ───
 "electric-guasha-massager": {
  handle: "electric-guasha-massager",
  fallbackImage: productGuaSha,
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
   "Gentle vibration and mild warmth during use, expected",
   "Slight redness that fades within 30 minutes, normal",
   "Subtle pulse with vibration, comfortable and expected",
  ],
  sessionInfo: "Session time: 5–7 minutes · Frequency: daily, every morning · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Traditional gua sha facial: €60–€90 per session. Gua Sha Frequency: €88. Once.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "30 days daily practice. No visible change in tension, definition, or drainage, full refund, no friction.",
  bonusStack: [
   { title: "The Gua Sha Ritual Map", desc: "Stroke-by-stroke guide following facial anatomy. Exactly which direction, which pressure, which zones in which order.", value: "€17" },
   { title: "Facial Oil Pairing Guide", desc: "Which oils conduct best with microcurrent. Which actives to layer after each stroke sequence.", value: "€14" },
   { title: "21-Day Sculpting Tracker", desc: "Weekly photo template for jawline, cheekbones, and neck. The ritual without tracking is just habit.", value: "€12" },
  ],
 },

 // ─── SKIN PULSE ───
 "electric-micro-current": {
  handle: "electric-micro-current",
  fallbackImage: productSkinPulse,
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
    "Facial muscles atrophy the same way any untrained muscle does, gradually, without clear announcement. The loss isn't dramatic. It compounds.",
    "The Skin Pulse delivers low-level microcurrent through a dual-ball electrode design: two conductive spheres, positive and negative, that create a circuit through the skin tissue. At 2.4V and 0.15W, the current operates within the range of the body's own bioelectric signals, sub-sensory, but biologically active.",
    "Electrical stimulation at this level has been studied for its effect on fibroblast activity. Fibroblasts produce collagen and elastin. Both balls stay in contact with skin at all times. That's the circuit. That's the protocol.",
   ],
   closing: "You won't feel much. That is correct.",
  },
  techCards: [
   { icon: Zap, title: "Dual-Ball Microcurrent", desc: "Two conductive spheres, positive and negative, create a continuous low-level electrical circuit through the dermis. Current travels through tissue, not along the surface. Both balls must remain in contact at all times to maintain the circuit." },
   { icon: Activity, title: "Fibroblast Stimulation", desc: "Electrical stimulation at sub-sensory levels has been studied for its effect on fibroblast activity and ATP synthesis, the cellular energy currency that drives collagen and elastin production. No sensation required." },
   { icon: Focus, title: "Targeted Zone Protocol", desc: "Compact dual-ball format (10.6 × 6.5cm) allows precise treatment of specific zones: nasolabial folds, under-eye, brow, lip lines. Each zone gets its own 60-second pass." },
   { icon: CircleDot, title: "2.4V Bioelectric Range", desc: "The device operates at 2.4V, 0.15W, within the body's own bioelectric frequency range. This is not TENS, not EMS. Microcurrent is a distinct category: current at or below 1mA, calibrated for cellular-level stimulation." },
  ],
  ritualSteps: [
   { step: "01", title: "Prepare", desc: "Cleanse. Apply a conductive serum or light water layer, always use with a medium. Both balls need conductivity to complete the circuit." },
   { step: "02", title: "Activate", desc: "Keep both balls in continuous contact with skin. Slow, upward strokes. Never drag. 60 seconds per zone." },
   { step: "03", title: "Repeat", desc: "5–8 minutes. 4–5 days a week. You will not feel strong sensation. That is correct." },
  ],
  beforeAfter: { before: before3Img, after: after3Img },
  problemImage: problemSkinpulse,
  comparisonRows: defaultComparison,
  faqs: defaultDeviceFaqs,
  studyCards: [
   { technology: "Microcurrent · ATP", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation+protein+synthesis+skin" },
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
   "No sensation on microcurrent mode, correct, this is sub-sensory",
   "Faint tingle if gel layer is thin, add more medium and continue",
   "Slight warmth after sustained contact on one zone, normal",
  ],
  sessionInfo: "Session time: 5–8 minutes · Frequency: 4–5× per week · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Microcurrent clinic sessions: €90–€150 each. Skin Pulse: €88. Once.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "30 days, 5× per week. No visible change in texture, tone, or firmness, full refund, no form.",
  bonusStack: [
   { title: "The Circuit Protocol Guide", desc: "Zone-by-zone sequence, which area, how long, what order. The dual-ball circuit breaks without both balls in contact.", value: "€19" },
   { title: "Serum Compatibility Guide", desc: "Which conductors work best. Why oil-based products break the circuit and which water-based actives to use instead.", value: "€14" },
   { title: "4-Week Fibroblast Log", desc: "Track texture and tone changes week by week. Microcurrent results compound, document them.", value: "€12" },
  ],
 },

 // ─── SCULPT WAND ───
 "facial-beauty-tools-and-ems-beauty-equipment": {
  handle: "facial-beauty-tools-and-ems-beauty-equipment",
  name: "Sculpt Wand",
  fallbackImage: productSculptWand,
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
    "The Sculpt Wand applies this to the 43 muscles of the face. EMS microcurrent at variable 0.4–5.5W, intensity that scales as tolerance builds, the same progressive overload principle that governs any effective training protocol.",
    "Paired with mechanical vibration. The lymphatic system has no pump, it relies on muscular movement. Vibration provides that stimulus, supporting drainage and reducing retained fluid from the face. EMS contracts. Vibration circulates.",
   ],
   closing: "Train what you have. Circulate what stagnates.",
  },
  techCards: [
   { icon: Zap, title: "EMS Microcurrent", desc: "Patterned electrical impulses cause involuntary facial muscle contractions, replicating voluntary muscular exercise at the neuromuscular level. Variable output (0.4–5.5W) allows progressive intensity increase over weeks. Same principle as resistance training." },
   { icon: Vibrate, title: "Lymphatic Vibration", desc: "Motor vibration at the surface stimulates lymphatic circulation. The lymphatic system moves only when the tissue around it moves. Vibration provides that mechanical input, supporting drainage, reducing puffiness and fluid retention." },
   { icon: Gauge, title: "Progressive Intensity", desc: "Four intensity levels from 0.4W to 5.5W. Start minimal. Increase week by week. Muscle adaptation to EMS follows the same progression curve as athletic training, incremental, not immediate." },
   { icon: Activity, title: "TYPE-C Build", desc: "400mAh battery · TYPE-C fast charge · 1.5–2h full charge · ABS/zinc alloy construction · 120 × 67 × 39mm. Built for daily use without interruption." },
  ],
  ritualSteps: [
   { step: "01", title: "Prepare", desc: "Apply conductive gel. Required for EMS, gel ensures current transfers to tissue, not lost at the surface." },
   { step: "02", title: "Train", desc: "Lowest intensity first. Hold against each zone 30–45 seconds: chin → jaw → cheekbones → forehead." },
   { step: "03", title: "Circulate", desc: "Vibration mode to finish. Downward from temples → ear → neck. Follow lymph direction. Total: 8–12 minutes." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  problemImage: problemSculptWand,
  comparisonRows: defaultComparison,
  faqs: defaultDeviceFaqs,
  studyCards: [
   { technology: "EMS · Facial Muscles", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+facial+wrinkles+sagging+cosmetic" },
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
   "A controlled pulse during EMS, should feel like a gentle involuntary contraction",
   "No burning, if burning occurs, reduce intensity immediately and add more gel",
   "Vibration at the surface, like a gentle buzz, not discomfort",
  ],
  sessionInfo: "Session time: 8–12 minutes · Frequency: 3–5× per week · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Clinical EMS facial sessions: €80–€150/session. Sculpt Wand: €88. Once.",
  guaranteeName: "30-Day Protocol Guarantee",
  guaranteeDesc: "30 days of consistent EMS training. No visible change in definition or drainage, full refund, no friction.",
  bonusStack: [
   { title: "The EMS Training Schedule", desc: "Week-by-week intensity progression map. Same progressive overload logic as athletic training, applied to facial muscle.", value: "€19" },
   { title: "Zone Targeting Guide", desc: "Which areas to hold, how long, in which sequence. Chin, jaw, cheekbones, forehead, each zone has a protocol.", value: "€17" },
   { title: "Lymphatic Follow-Up Sequence", desc: "Vibration mode guide for post-EMS drainage. Downward strokes from temples to clavicle, completes the protocol.", value: "€12" },
  ],
 },

 // ─── FRAME PULSE ACTIVATOR ───
 "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": {
  handle: "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
  fallbackImage: productFramePulse,
  name: "Frame Pulse",
  subheadline: "Clinical Red Light Therapy (630–660nm) + Microcurrent · Eye and Upper-Face Zone",
  benefits: [
   { icon: Sun, label: "Clinical Red Light 630–660nm" },
   { icon: Zap, label: "Microcurrent (Periorbital Calibration)" },
   { icon: Focus, label: "Hands-Free Wearable Design" },
   { icon: Brain, label: "Eye + Upper-Face Targeting" },
  ],
  testimonials: [
   { name: "Iris, 38", text: "Hands-free means I actually use it every day. Put it on, relax, and let it work." },
   { name: "Tessa, 43", text: "The clinical wavelength claim sold me. Three weeks in, my upper-face lines are visibly softer." },
   { name: "Monica, 31", text: "I'd done red light at a clinic. This is the same range. At home. Every morning." },
  ],
  problemReframe: {
   headline: "The Eye Zone Recovers Slowest. The Wavelength Matters Most.",
   paragraphs: [
    "The periorbital dermis is the thinnest skin on your face. Capillary density is the highest. Recovery time is the longest. Most home devices broadcast generic light. The mechanism is in the wavelength.",
    "Red light at 630–660nm is the most-studied band in photobiomodulation literature. Mitochondrial cytochrome c oxidase absorbs photons in this range, supporting ATP output. Frame Pulse delivers this clinical wavelength specifically, not as a 'visible-spectrum' marketing claim, but as a documented mechanism with PubMed-cited studies.",
    "Microcurrent at periorbital calibration runs alongside the red light. Two mechanisms. One device. Worn hands-free for 8 minutes daily.",
   ],
   closing: "Mechanism over miracle. Wavelength over wattage.",
  },
  techCards: [
   { icon: Sun, title: "Red Light Therapy 630–660nm", desc: "The most-studied wavelength range in photobiomodulation research. Mitochondrial photoreceptors absorb 630–660nm photons and increase ATP output. Frame Pulse calibrates this to eye-zone tissue specifically." },
   { icon: Zap, title: "Microcurrent", desc: "Sub-sensory current at periorbital calibration. Supports facial muscle tone for the upper-face zone." },
   { icon: Focus, title: "Hands-Free Wearable", desc: "Wearable design means the 8-minute protocol happens while you read, work, or prepare. Consistency without friction." },
   { icon: Vibrate, title: "Pulse Sequencing", desc: "Pre-programmed sequences alternate red light and microcurrent across the upper-face zone." },
  ],
  ritualSteps: [
   { step: "01", title: "Prepare", desc: "Cleanse face. Position Frame Pulse comfortably across upper face. Eyes closed during use." },
   { step: "02", title: "Activate", desc: "Select program. Relax. 8 minutes." },
   { step: "03", title: "Repeat", desc: "Daily. The wavelength does the work over 3-4 weeks of consistent use." },
  ],
  beforeAfter: { before: before3Img, after: after3Img },
  problemImage: problemFramePulse,
  comparisonRows: defaultComparison,
  faqs: defaultDeviceFaqs,
  studyCards: [
   { technology: "Red Light Therapy 630–660nm", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
   { technology: "Photobiomodulation", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=photobiomodulation+630nm+collagen+skin" },
   { technology: "Microcurrent · Facial Toning", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=electrical+muscle+stimulation+facial" },
   { technology: "Mitochondrial ATP", studyTitle: "Mechanisms of Low Level Light Therapy", journal: "Photomedicine and Laser Surgery, 2008", url: "https://scholar.google.com/scholar?q=cytochrome+c+oxidase+photobiomodulation+ATP" },
  ],
  contraindications: [
   "You have a pacemaker or implanted electronic device",
   "You are pregnant",
   "You have epilepsy (due to light pulses)",
   "You have active skin infections or open wounds in the treatment area",
   "You have metal implants in the face",
  ],
  normalSensations: [
   "Light rhythmic pulse during EMS, comfortable and expected",
   "Gentle warmth from LED array, keep eyes closed",
   "No sensation between pulse cycles, normal",
  ],
  sessionInfo: "Session time: 8 minutes · Frequency: daily · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Eye-zone clinic red light session: €80–€150. Frame Pulse: €149. Once.",
  guaranteeName: "30-Day Clinical Protocol Guarantee",
  guaranteeDesc: "30 days daily use. No visible response in tone, firmness, or upper-face definition, full refund. We cover return shipping.",
  bonusStack: [
   { title: "The Frame Pulse Protocol Guide", desc: "Daily timing, intensity progression, serum pairing. The clinical wavelength is half the protocol, the discipline is the other half.", value: "€19" },
   { title: "Photobiomodulation Science Primer", desc: "What the 630–660nm wavelength actually does at the cellular level. PubMed citations, mechanism diagrams.", value: "€27" },
   { title: "Periorbital Progress Tracker", desc: "Photo template for upper-face zone documentation. Week-by-week.", value: "€17" },
  ],
 },

 // ─── MICROCURRENT SCULPT WAND (unlisted) ───
 "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": {
  handle: "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening",
  fallbackImage: productFaceLift,
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
   "A mild tingling or warmth during use, expected",
   "Slight redness that fades within 30 minutes, normal",
   "No sensation at all on microcurrent mode, correct, it’s sub-sensory",
  ],
  sessionInfo: "Session time: 5 minutes · Frequency: daily · Stop if: burning sensation, unusual pain, or persistent redness",
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

 // ─── COLLAGEN FACE GEL (renamed: Restore Gel) ───
 // Note: config key kept as original Shopify handle; product is now titled "Restore Gel"

 // ─── FREQUENCY WAND PRO ───
 "portable-ems-microcurrent-facial-beauty-device": {
  handle: "portable-ems-microcurrent-facial-beauty-device",
  fallbackImage: productFrequencyWandPro,
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
    "Two things consistently prevent skin rituals from delivering results. First: a pore environment saturated with oxidative residue and environmental buildup, surface cleansers remove what's on top, not what's embedded in the follicle. Second: EMS current trying to pass through tissue with high surface resistance.",
    "The Frequency Wand Pro addresses both, in sequence. Negative ion output creates an electromagnetic attraction between the instrument and positively charged impurities, sebum oxidation, particulates, residual product buildup. The cleansing is electrical, not abrasive. No friction. The barrier stays intact.",
    "After the cleansing phase, EMS microcurrent runs into cleaner tissue with lower resistance and better conductivity. The high-capacity battery (1200–2000mAh) ensures consistent output across a full session. The sequence is the product.",
   ],
   closing: "Sequence is protocol. Protocol is result.",
  },
  techCards: [
   { icon: ShieldCheck, title: "Negative Ion Cleansing", desc: "Negative ion output attracts and lifts positively charged impurities, sebum oxidation, environmental particulates, residual product buildup, from the follicle via electrostatic force. No friction. No disruption to the skin barrier." },
   { icon: Zap, title: "EMS Microcurrent", desc: "Low-frequency electrical pulses stimulate facial muscle groups and support fibroblast activity in the dermis. High-capacity battery (1200–2000mAh) ensures consistent output across a full protocol without current drop." },
   { icon: Droplets, title: "Conductivity After Cleansing", desc: "Ion-cleansed tissue presents less surface resistance. EMS current travels more efficiently into the dermis. The cleaning phase is not cosmetic, it's functional preparation for the stimulation phase." },
   { icon: Gauge, title: "Built for Daily Protocol", desc: "1200–2000mAh battery · USB charging · Compact portable format. Designed for a 10-minute daily ritual without battery anxiety." },
  ],
  ritualSteps: [
   { step: "01", title: "Cleanse", desc: "Negative ion mode, 2–3 minutes across face and neck. No serum yet. Let the ions draw out surface buildup first." },
   { step: "02", title: "Stimulate", desc: "Apply conductive serum. EMS microcurrent mode, 3–5 minutes, upward strokes jaw to temple." },
   { step: "03", title: "Repeat", desc: "4–5× per week. Total protocol: under 10 minutes. Sequence does not change." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  problemImage: problemWandPro,
  comparisonRows: defaultComparison,
  faqs: defaultDeviceFaqs,
  studyCards: [
   { technology: "Ion Cleansing · Galvanic", studyTitle: "Galvanic Current and Skin Barrier Integrity in Transdermal Electrostimulation", journal: "Journal of Cosmetic Science, 2003", url: "https://scholar.google.com/scholar?q=galvanic+current+facial+cleansing+ion+skin+barrier+electrostimulation" },
   { technology: "EMS Microcurrent", studyTitle: "Neuromuscular Electrical Stimulation for Facial Wrinkles and Sagging", journal: "Journal of Cosmetic Dermatology, 2024", url: "https://scholar.google.com/scholar?q=neuromuscular+electrical+stimulation+facial+wrinkles+sagging+cosmetic" },
   { technology: "ATP · Cellular Stimulation", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation+protein+synthesis+skin" },
   { technology: "Iontophoresis", studyTitle: "Iontophoresis for Drug Delivery: Principles, Opportunities and Challenges", journal: "Advanced Drug Delivery Reviews, 2011", url: "https://scholar.google.com/scholar?q=iontophoresis+transdermal+drug+delivery+principles+opportunities+challenges+2011" },
  ],
  contraindications: [
   "You have a pacemaker or implanted electronic device",
   "You are pregnant",
   "You have active skin infections or open wounds in the treatment area",
   "You have metal implants in the face",
  ],
  normalSensations: [
   "A mild surface tingle during ion cleansing, comfortable and expected",
   "No sensation on microcurrent, sub-sensory is correct",
   "Slight warmth after sustained contact, normal",
  ],
  sessionInfo: "Session time: 10 minutes · Frequency: 4–5× per week · Stop if: burning sensation, unusual pain, or persistent redness",
 },
};

// ── New recovery / sleep / body products ──────────────────────────────────────

// ─── BREATH SEAL ───
const breathSealConfig: ProductConfig = {
 handle: "breath-seal",
 name: "Breath Seal",
 subheadline: "Nasal Breathing. All Night.",
 benefits: [
  { icon: Brain, label: "Nasal Breathing Protocol" },
  { icon: Heart, label: "Cortisol Reduction" },
  { icon: Waves, label: "Oxygen Efficiency" },
  { icon: Focus, label: "Sleep Architecture" },
 ],
 testimonials: [
  { name: "Lars, 34", text: "I wake up without a dry mouth for the first time in years. One strip. That's all it took." },
  { name: "Mara, 29", text: "My partner said my breathing was different from night one. More even, quieter." },
  { name: "Daan, 41", text: "I started tracking HRV. It went up in week one. The only thing I changed was this." },
 ],
 problemReframe: {
  headline: "You Breathe 23,000 Times a Day. Most of Them Through the Wrong Pathway.",
  paragraphs: [
   "Mouth breathing during sleep bypasses the nasal passage, the filter, the humidifier, the nitric oxide production site. The result: elevated cortisol, reduced oxygen efficiency, lighter sleep stages, and the morning tiredness that follows a night of technically-logged hours.",
   "Nasal breathing activates the parasympathetic branch. Nitric oxide released in the nasal passage dilates blood vessels and improves oxygen uptake at the tissue level. Sleep architecture deepens. The physiological stress response stays lower overnight.",
   "The Breath Seal maintains lip closure during sleep. No technique. No effort. The mechanical input that reroutes your breathing pathway.",
  ],
  closing: "Better breathing doesn't start at sunrise.",
 },
 techCards: [
  { icon: Brain, title: "Nitric Oxide Pathway", desc: "Nasal breathing generates nitric oxide in the paranasal sinuses, a vasodilator that improves oxygen uptake in the blood and reduces systemic vascular resistance. Mouth breathing bypasses this entirely." },
  { icon: Heart, title: "Parasympathetic Activation", desc: "Nasal airflow activates the lower lobes of the lungs and engages the diaphragm, the primary driver of parasympathetic nervous system activation during breathing. Mouth breathing uses accessory muscles and maintains sympathetic tone." },
  { icon: Waves, title: "CO2 Tolerance", desc: "Consistent nasal breathing over weeks improves CO2 tolerance, the primary trigger for the respiratory reflex. Higher tolerance means more efficient oxygen exchange and calmer baseline breathing rate." },
  { icon: Focus, title: "Adhesive Mechanism", desc: "Medical-grade hypoallergenic adhesive holds the lip seal through a full sleep cycle without skin irritation. Single-use format ensures consistent adhesion from application to removal." },
 ],
 ritualSteps: [
  { step: "01", title: "Cleanse", desc: "Apply to clean, dry lips. Remove any lip balm or moisture from the area before application." },
  { step: "02", title: "Apply", desc: "Center the strip across closed lips. Press gently and hold 5 seconds to activate adhesive. That's the full protocol." },
  { step: "03", title: "Remove", desc: "Remove slowly in the morning, moving from one corner. Consistent use for 2–4 weeks normalises nasal breathing patterns beyond sleep hours." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Is it safe to sleep with my lips sealed?", a: "Yes. Your nasal passage remains open throughout. The strip maintains lip closure, it doesn't seal your airway. In the case of nasal obstruction (illness, congestion), the strip opens naturally under any pressure differential." },
  { q: "Will I notice anything on night one?", a: "Many users report a noticeably drier mouth in the morning on previous nights once they compare. HRV and sleep quality data, if you track them, typically show a measurable shift within the first week." },
  { q: "Can I use it if I snore?", a: "Yes. Nasal breathing reduces snoring in most cases. Snoring is predominantly a mouth-breathing phenomenon, vibration in the soft tissue caused by turbulent oral airflow. This does not address anatomical causes of snoring (deviated septum, sleep apnea)." },
  { q: "Will it pull off my lip skin?", a: "No. The adhesive is hypoallergenic and calibrated for skin contact. Remove slowly from the corner rather than pulling from the centre." },
  { q: "How many strips per pack?", a: "Each pack contains 30 strips, one per night for a month." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. If you don't notice a change in your sleep quality within 30 days of consistent use, contact us for a full refund." },
 ],
 studyCards: [
  { technology: "Nasal Breathing · Nitric Oxide", studyTitle: "Nasal Nitric Oxide and Its Role in the Regulation of Airway Function", journal: "Chest, 2006", url: "https://scholar.google.com/scholar?q=nasal+nitric+oxide+airway+function+regulation+breathing" },
  { technology: "Nasal Breathing · Sleep", studyTitle: "Oral Versus Nasal Breathing: Effects on Overnight Sleep", journal: "Sleep Medicine, 2021", url: "https://scholar.google.com/scholar?q=oral+nasal+breathing+sleep+quality+HRV+overnight" },
  { technology: "Parasympathetic · HRV", studyTitle: "Slow Breathing and Cardiovascular Autonomic Modulation", journal: "Psychophysiology, 2010", url: "https://scholar.google.com/scholar?q=nasal+breathing+slow+heart+rate+variability+parasympathetic" },
  { technology: "CO2 Tolerance", studyTitle: "Breathing Pattern Training to Improve Functional Status in Heart Failure", journal: "Heart & Lung, 2012", url: "https://scholar.google.com/scholar?q=CO2+tolerance+breathing+retraining+nasal" },
 ],
 contraindications: [
  "Nasal obstruction or congestion preventing nasal breathing",
  "Active lip wounds, cold sores, or perioral skin conditions",
  "Sleep apnea (consult your physician before nasal breathing protocols)",
 ],
 normalSensations: [
  "Slight lip awareness at application, fades within minutes",
  "Gentle pull at removal, apply slowly from one corner",
 ],
 sessionInfo: "One strip per night · Apply to clean, dry lips · Remove slowly in the morning",
 forYouIf: [
  "You track HRV or sleep quality and want to understand what's actually driving the data",
  "You wake up with a dry mouth, morning fatigue, or feel unrested despite 7+ hours",
  "You want to activate the parasympathetic branch during sleep without supplements",
  "You're optimising sleep architecture and have already addressed light and temperature",
  "You snore or breathe audibly during sleep",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Pathway recalibration", body: "The body adjusts to nasal breathing during sleep. Most users notice less morning dry mouth within the first three to five nights of consistent use." },
  { week: "Week 2–3", heading: "HRV shift", body: "With consistent nasal breathing overnight, HRV data shows measurable change for most users. Sleep stages may deepen and overnight cortisol rhythm begins to normalise." },
  { week: "Week 4+", heading: "Pattern normalisation", body: "Nasal breathing begins extending into waking hours. The respiratory pathway recalibrates beyond sleep, a structural shift in default breathing pattern." },
 ],
 techSectionTitle: "The mechanism. One input.",
};

// ─── DEPTH MASK ───
const depthMaskConfig: ProductConfig = {
 handle: "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers",
 name: "Depth Mask",
 subheadline: "Total Blackout. Contoured Fit.",
 benefits: [
  { icon: Brain, label: "Melatonin Protection" },
  { icon: Focus, label: "Lash-Friendly Contour" },
  { icon: Heart, label: "Side-Sleeper Compatible" },
  { icon: Waves, label: "Light Elimination" },
 ],
 testimonials: [
  { name: "Selin, 31", text: "I've tried ten sleep masks. This is the first one that doesn't press on my eyes. I forget I'm wearing it." },
  { name: "Tom, 38", text: "Travel changed. Same blackout wherever I sleep. My circadian rhythm doesn't know what timezone it's in." },
  { name: "Femke, 44", text: "Lash extensions. This is the only mask I can use without destroying them overnight." },
 ],
 problemReframe: {
  headline: "Light at 0.3 Lux Suppresses Melatonin. Your Bedroom Is Not Dark.",
  paragraphs: [
   "Melatonin production is exquisitely sensitive to light. Research shows that even low ambient light, a charging indicator, streetlight through curtains, a display in sleep mode, delays melatonin onset and reduces sleep depth. The darkness you perceive isn't the darkness your photoreceptors measure.",
   "Total blackout is a different input than near-dark. Sealed light elimination removes the retinal signal that holds the SCN's arousal circuit in a partially activated state. Sleep pressure accumulates faster. Sleep onset shortens. Deep sleep architecture improves.",
   "The Depth Mask's 3D contoured shell creates a sealed light barrier without pressing on the eye surface. No retinal pressure. No eyelash compression. The blackout holds regardless of sleep position.",
  ],
  closing: "Your photoreceptors don't sleep until the light is gone.",
 },
 techCards: [
  { icon: Brain, title: "3D Contour Shell", desc: "Moulded inner chamber suspends fabric away from the eye surface. No contact with the cornea or eyelashes during sleep. Maintains seal integrity through movement in any sleep position." },
  { icon: Focus, title: "Total Light Seal", desc: "Anatomically designed edge contour eliminates light entry from nasal bridge, lateral edges, and brow. Creates the same blackout from any sleep position, back, side, or stomach." },
  { icon: Heart, title: "Adjustable Strap", desc: "Dual-side buckle adjustment with zero-pressure silicone strap maintains seal without creating tension headache or hair disruption. One-handed adjustment for night use." },
  { icon: Waves, title: "Material", desc: "Breathable fabric exterior. Opaque blackout inner lining. Machine washable. Designed for nightly use without heat retention or skin irritation from accumulated contact." },
 ],
 ritualSteps: [
  { step: "01", title: "Adjust", desc: "Fit the strap before lying down. The seal should be light and even, not tight. If there's pressure on the eye surface, adjust the contour shell position." },
  { step: "02", title: "Apply", desc: "Lie back. The shell creates the sealed blackout without resting on your eyes. That's the mechanism, space, not compression." },
  { step: "03", title: "Repeat", desc: "Nightly use. Pair with Breath Seal for a full sleep input protocol. The two tools address different inputs, breathing and light, that independently affect sleep architecture." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Can I use it with eyelash extensions?", a: "Yes. The 3D contoured shell keeps the inner fabric away from your lashes through the night." },
  { q: "Does it work for side sleepers?", a: "Yes. The strap system and contour shape maintain the light seal through lateral sleep positions." },
  { q: "Can I wash it?", a: "Yes. Machine washable on a gentle cycle. Air dry to maintain the contour structure." },
  { q: "Does it get hot during sleep?", a: "The breathable outer fabric reduces heat buildup. If you run hot, the open contour design reduces direct contact with the eye area." },
  { q: "Will the strap tighten overnight?", a: "No. The buckle adjusts and holds position. For first use, adjust while lying flat in your normal sleep position." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. If you don't notice a difference in your sleep quality within 30 days of consistent use, contact us for a full refund." },
 ],
 studyCards: [
  { technology: "Light Suppression · Melatonin", studyTitle: "Light at Night as an Exposure Factor in Metabolic Syndrome and Obesity", journal: "Environmental Health Perspectives, 2011", url: "https://scholar.google.com/scholar?q=light+at+night+melatonin+suppression+sleep+disruption" },
  { technology: "Blackout · Sleep Depth", studyTitle: "The Effect of Ambient Light on Sleep Quality in Healthy Adults", journal: "Sleep Medicine, 2019", url: "https://scholar.google.com/scholar?q=ambient+light+sleep+quality+deep+sleep+architecture" },
  { technology: "Circadian Rhythm · Light", studyTitle: "Entrainment of the Human Circadian Clock to Environmental Light", journal: "Nature Reviews Neuroscience, 2010", url: "https://scholar.google.com/scholar?q=circadian+entrainment+light+melatonin+SCN+sleep" },
  { technology: "Darkness · Sleep Architecture", studyTitle: "Impact of Light Exposure Before Sleep on Sleep Quality", journal: "Chronobiology International, 2017", url: "https://scholar.google.com/scholar?q=darkness+sleep+onset+latency+architecture+melatonin" },
 ],
 contraindications: [
  "Active eye infections or irritation",
  "Recent eye surgery (consult your physician before use)",
 ],
 normalSensations: [
  "Slight facial awareness on first use, disappears within minutes",
  "No pressure on the eyes, if you feel pressure, reposition the contour shell",
 ],
 sessionInfo: "Nightly use · Adjust strap while lying in sleep position · Machine washable",
 forYouIf: [
  "Your bedroom isn't fully dark, streetlights, electronics, or a partner's phone reach your eyes during sleep",
  "You have eyelash extensions and every other sleep mask presses on them overnight",
  "You're a side sleeper and most sleep masks shift or lose their seal",
  "You've read about melatonin suppression from ambient light and want to eliminate the variable",
  "You travel frequently and need consistent sleep quality regardless of environment",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Light elimination", body: "Total blackout from night one. Melatonin onset typically improves within the first few nights of eliminated ambient light, the retinal signal that delays sleep onset is removed." },
  { week: "Week 2–3", heading: "Architecture deepening", body: "With persistent light elimination, deep sleep stages extend. More consistent sleep onset and reduced overnight waking as the circadian signal strengthens." },
  { week: "Week 4+", heading: "Circadian anchoring", body: "Consistent light/dark signalling anchors the circadian rhythm. Sleep pressure accumulates on schedule regardless of travel or environmental variation." },
 ],
 techSectionTitle: "The mechanism. One input.",
 problemImage: problemDepthMask,
};

// ─── FLUX PANEL ───
const fluxPanelConfig: ProductConfig = {
 handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
 name: "Flux Panel",
 subheadline: "Full-Body Photon Protocol. 660nm + 850nm. 80W.",
 benefits: [
  { icon: Sun, label: "660nm Red + 850nm Near-Infrared" },
  { icon: Activity, label: "80W Output" },
  { icon: Brain, label: "Mitochondrial Activation" },
  { icon: Heart, label: "Full-Body Coverage" },
 ],
 testimonials: [
  { name: "Rens, 36", text: "I had this running for 10 minutes before realising I wasn't even facing it. Had to actually read the instructions. Results from week two." },
  { name: "Jules, 42", text: "NIR at 850nm reaches muscle tissue. This isn't a face device, it's a full recovery tool." },
  { name: "Mia, 31", text: "Morning sessions before training. My baseline soreness dropped in the first two weeks." },
 ],
 problemReframe: {
  headline: "Your Mitochondria Respond to Specific Wavelengths. Most of Your Body Never Gets Them.",
  paragraphs: [
   "Photobiomodulation is wavelength-specific. Red light at 660nm stimulates cytochrome c oxidase in the mitochondrial membrane, the enzyme that drives ATP production. Near-infrared at 850nm penetrates 5–7cm below the skin surface, reaching muscle and connective tissue where the recovery work actually happens.",
   "Handheld devices treat centimetres. Panels treat the entire body. The Flux Panel delivers 80W across a full-body exposure area, both wavelengths simultaneously, the combination shown in research to produce additive effects on cellular energy production.",
   "The mechanism is photochemical, not thermal. You don't need to feel warmth for the cellular effect to occur. You need the right wavelength at the right intensity for the right duration.",
  ],
  closing: "Fifteen minutes. The mitochondria handle the rest.",
 },
 techCards: [
  { icon: Sun, title: "660nm Red Light", desc: "Optimal wavelength for surface tissue. Penetrates 1–2cm into skin and subcutaneous tissue. Stimulates cytochrome c oxidase, increasing ATP production in fibroblasts, keratinocytes, and surface muscle fibres. The most-studied wavelength in photobiomodulation research." },
  { icon: Activity, title: "850nm Near-Infrared", desc: "Deeper penetration at 5–7cm reaches muscle, fascia, joint capsules, and periosteum. Reduces inflammatory cytokines, supports mitochondrial biogenesis, and enhances blood flow in deep tissue. Used in clinical sports rehabilitation protocols." },
  { icon: Brain, title: "80W Panel Output", desc: "Higher wattage means more photons delivered per unit time. At 80W, the Flux Panel reaches therapeutic irradiance at 30–50cm distance, the zone where the beam is broad enough for full-torso coverage without sacrificing intensity." },
  { icon: Heart, title: "Dual-Wavelength Combination", desc: "660nm and 850nm applied simultaneously produce additive effects on mitochondrial function. Research shows combination protocols outperform single-wavelength protocols for both surface skin and deep tissue outcomes at equivalent session durations." },
 ],
 ritualSteps: [
  { step: "01", title: "Position", desc: "Stand or sit 30–50cm from the panel. No need to remove clothing for near-infrared penetration, thin fabric doesn't block 850nm effectively but direct skin exposure is optimal for 660nm." },
  { step: "02", title: "Run Protocol", desc: "10–20 minutes per session. Keep eyes closed or wear protective eyewear during face-targeting sessions. For body panels, look away or close eyes." },
  { step: "03", title: "Repeat", desc: "4–5 sessions per week. Morning sessions enhance cellular energy for the day. Evening sessions support recovery and tissue repair during sleep." },
 ],
 beforeAfter: { before: beforeImg, after: afterImg },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "How far away should I stand?", a: "30–50cm is the optimal distance. Closer increases intensity but reduces coverage area. Further reduces intensity below therapeutic threshold. At 30cm: full torso covered for front-body session." },
  { q: "Should I look at the panel?", a: "No. Never look directly at the panel. Close your eyes or wear protective eyewear during any session where the face or eyes are in the treatment zone." },
  { q: "How long per session?", a: "10–15 minutes for most protocols. Near-infrared research shows diminishing returns beyond 20 minutes at therapeutic intensities. Consistent shorter sessions outperform irregular longer ones." },
  { q: "Does it work through clothing?", a: "850nm penetrates most thin fabrics. 660nm is absorbed by most materials. For optimal results with red light, direct skin exposure is preferred. For NIR-only sessions, thin clothing is acceptable." },
  { q: "When should I use it, before or after training?", a: "Either. Pre-training sessions warm tissue and enhance mitochondrial output. Post-training sessions reduce inflammatory load and accelerate repair. Both are supported by research. Choose based on your schedule consistency." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. If you don't see measurable change in recovery or skin within 30 days of consistent use, contact us for a full refund." },
 ],
 studyCards: [
  { technology: "Red Light 660nm · Mitochondria", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
  { technology: "Near-Infrared 850nm · Tissue", studyTitle: "Near-Infrared Photobiomodulation in a Cellular Model of Parkinson's Disease", journal: "Frontiers in Neuroscience, 2016", url: "https://scholar.google.com/scholar?q=near-infrared+850nm+photobiomodulation+tissue+penetration+muscle" },
  { technology: "Dual Wavelength · Combination", studyTitle: "Photobiomodulation with Combined 660 and 850nm Wavelengths", journal: "Lasers in Medical Science, 2018", url: "https://scholar.google.com/scholar?q=photobiomodulation+660nm+850nm+combined+wavelength+additive+effect" },
  { technology: "Recovery · Inflammation", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue in Humans", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+therapy+exercise+muscle+recovery+inflammation" },
 ],
 contraindications: [
  "You are pregnant",
  "You have active cancer or are receiving photosensitising medication",
  "You have epilepsy (photosensitive)",
  "You have active wounds or burns in the treatment area",
 ],
 normalSensations: [
  "Mild warmth at close distance, normal",
  "No sensation at standard distance, expected",
  "Brief afterglow perception if eyes are exposed momentarily, do not look at panel",
 ],
 sessionInfo: "Session time: 10–20 minutes · Distance: 30–50cm · Frequency: 4–5× per week · Eyes closed during face-adjacent sessions",
 forYouIf: [
  "You want the full photobiomodulation protocol, not a handheld device that covers centimetres",
  "You train hard and recovery is a measurable bottleneck in your progress",
  "You're already familiar with red light therapy and want a serious full-body format",
  "You're looking for a one-time investment to replace ongoing clinic light therapy sessions",
  "You want to address skin renewal and performance recovery with the same tool",
 ],
 mechanismTimeline: [
  { week: "Week 1–2", heading: "Cellular activation", body: "Red light at 660nm begins increasing ATP production. NIR at 850nm activates deeper tissue. Skin texture and post-training muscle recovery are typically the first observable changes." },
  { week: "Week 3–4", heading: "Inflammatory reduction", body: "Consistent sessions reduce inflammatory load in treated tissue. Baseline soreness decreases; training sessions feel better supported from the outset." },
  { week: "Week 5+", heading: "Compounding recovery", body: "Mitochondrial density and efficiency build with continued input. The panel becomes part of the daily stack, producing structural improvement that accumulates across months." },
 ],
 techSectionTitle: "Two wavelengths. One panel.",
 valueAnchor: "Clinic red light + NIR session: €60–€90 per 10-minute exposure. Flux Panel: €280. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Flux Panel daily for 30 days. If it has not earned its place in your morning, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Photon Protocol Guide", desc: "Distance, duration, frequency, calibration for skin, recovery, and combined sessions.", value: "€19" },
  { title: "Dual-Wavelength Science Primer", desc: "What 660nm and 850nm actually do at the cellular level. PubMed citations.", value: "€27" },
  { title: "Recovery Tracker Template", desc: "Weekly soreness, sleep, and energy log. Photobiomodulation effects compound; tracking surfaces the trend.", value: "€17" },
 ],
};

// ─── FREQUENCY MAT + ───
const frequencyMatPlusConfig: ProductConfig = {
 handle: "household-red-light-charging-vibrating-red-light-therapy-mat",
 name: "Frequency Mat +",
 subheadline: "Far-Infrared Heat + Red Light. Full-Body Mat Protocol.",
 benefits: [
  { icon: Sun, label: "660nm Red Light" },
  { icon: ThermometerSun, label: "Far-Infrared Heat" },
  { icon: Activity, label: "Dual-Input Protocol" },
  { icon: Heart, label: "Full-Back Coverage" },
 ],
 testimonials: [
  { name: "Ines, 37", text: "Fifteen minutes before bed. I sleep faster, my lower back feels different in the morning." },
  { name: "Pieter, 45", text: "I use it post-training on the lower back. The combination of heat and light is what finally moved the needle on my recovery." },
  { name: "Nina, 33", text: "I didn't think a mat could actually do something. Third week in and my tissue quality is different." },
 ],
 problemReframe: {
  headline: "Heat Opens the Tissue. Light Activates It. Most Tools Only Do One.",
  paragraphs: [
   "Far-infrared heat and photobiomodulation operate through different cellular pathways. Heat increases local blood flow, relaxes connective tissue, and prepares the cellular environment for repair. Red light at 660nm activates cytochrome c oxidase, stimulating ATP production directly. When applied together, each mechanism amplifies the other.",
   "A standard heating pad produces surface warmth. A handheld red light device treats centimetres. The Frequency Mat+ delivers both inputs simultaneously across the full back, the largest surface area where chronic tension, poor circulation, and under-stimulated tissue accumulate.",
   "One mat. Two mechanisms. One flat protocol, lie on it for 15 minutes.",
  ],
  closing: "Lie down. Let both inputs work.",
 },
 techCards: [
  { icon: Sun, title: "Red Light 660nm", desc: "Embedded LEDs at 660nm deliver photobiomodulation across the full mat surface. Stimulates mitochondrial function in the tissue layers above the mat, dermis, subcutaneous fat, and superficial muscle fibres." },
  { icon: ThermometerSun, title: "Far-Infrared Heat", desc: "Electric heating generates warmth that penetrates beyond surface skin into the tissue below. Temperature range calibrated for therapeutic use, not surface burning. Increases local blood flow, reduces muscular tension, and prepares tissue for optimal photon absorption." },
  { icon: Activity, title: "Simultaneous Protocol", desc: "Heat and light run together, not as alternating modes. The combined input produces additive effects: heat prepares the circulatory and tissue environment; red light activates cellular energy production in that prepared environment." },
  { icon: Heart, title: "Mat Format", desc: "Flat panel designed to lie on. Full-back, full-torso, or targeted-area coverage depending on body position. Foldable for targeted shoulder, hip, or lower back use. USB power format." },
 ],
 ritualSteps: [
  { step: "01", title: "Position", desc: "Lay the mat flat on a bed, floor, or chair. Lie directly on it with the skin or thin clothing in contact with the mat surface." },
  { step: "02", title: "Run", desc: "Power on. Both heat and light activate simultaneously. 15–20 minutes per session. No technique required, passive protocol." },
  { step: "03", title: "Repeat", desc: "4–5 sessions per week. Morning sessions before loading the back. Evening sessions for recovery. The effects of consistent heat and light input compound across weeks." },
 ],
 beforeAfter: { before: before2Img, after: after2Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Do I need to remove clothing?", a: "Not necessary. Near-infrared penetrates thin fabric well. For optimal 660nm red light delivery, direct skin contact is preferred, but thin cotton is acceptable." },
  { q: "Can I fall asleep on it?", a: "The mat has built-in temperature safety cutoff. However, we recommend active 15–20 minute sessions rather than sleeping on it." },
  { q: "Can I use it on my lower back?", a: "Yes. Fold the mat and sit on it or place it behind your lower back against a chair. The heat and light work regardless of body orientation." },
  { q: "How hot does it get?", a: "Operating temperature is 38–45°C, therapeutic heat range. Not burning temperature. If the mat feels too warm, add a thin cloth layer between skin and mat surface." },
  { q: "How long before I notice results?", a: "Circulation and muscle tension respond within the first few sessions. Structural tissue changes, fascia quality, reduced chronic tension, develop over 3–6 weeks of consistent use." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable change within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Red Light · Tissue Recovery", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue in Humans", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+therapy+muscle+recovery+exercise+fatigue" },
  { technology: "Far-Infrared Heat · Circulation", studyTitle: "Far-Infrared Sauna as a Novel Therapeutic Modality for Cardiovascular Health", journal: "Journal of Human Hypertension, 2004", url: "https://scholar.google.com/scholar?q=far+infrared+heat+therapy+circulation+blood+flow+tissue" },
  { technology: "Heat + Light Combination", studyTitle: "Photobiomodulation and Heat Application Combined for Tissue Repair", journal: "Photomedicine and Laser Surgery, 2016", url: "https://scholar.google.com/scholar?q=heat+red+light+combined+tissue+repair+photobiomodulation" },
  { technology: "Back Pain · Heat Therapy", studyTitle: "The Efficacy of Superficial Heat and Cold Applied to Low Back Pain", journal: "Spine, 2002", url: "https://scholar.google.com/scholar?q=heat+therapy+low+back+pain+circulation+muscle+tension" },
 ],
 contraindications: [
  "You are pregnant",
  "You have active inflammation or burns in the treatment area",
  "You have sensory neuropathy in the contact area (cannot detect heat)",
  "You are on photosensitising medication",
 ],
 normalSensations: [
  "Progressive warmth during the session, this is expected",
  "No sensation from the light itself, cellular effect is not felt",
  "Mild sweating with prolonged sessions, reduce to 15 minutes if uncomfortable",
 ],
 sessionInfo: "Session time: 15–20 minutes · Frequency: 4–5× per week · Direct skin contact preferred for 660nm · Stop if: excessive heat or discomfort",
 forYouIf: [
  "Your recovery is limited by chronic back tension or poor post-training tissue quality",
  "You want heat and light in one passive protocol that requires no active maintenance",
  "You want full-back treatment that integrates with your morning or evening routine without setup",
  "You've used heating pads and want a meaningful upgrade with added photobiomodulation",
  "You're willing to lie on something for 15 minutes if it actually moves the needle",
 ],
 mechanismTimeline: [
  { week: "Week 1–2", heading: "Heat response", body: "Tissue warmth improves circulation. Muscle tension in the lower back typically responds within the first few sessions. Morning stiffness decreases." },
  { week: "Week 3–4", heading: "Photon accumulation", body: "Red light dosing compounds with consistent use. Tissue quality at the surface layer improves. Recovery between training sessions shortens measurably." },
  { week: "Week 5+", heading: "Baseline shift", body: "Chronic tension patterns that accumulated over months begin to reduce. The combined heat and light input produces structural change that passive rest cannot achieve alone." },
 ],
 techSectionTitle: "Two mechanisms. One mat.",
 valueAnchor: "Clinic recovery mat session: €40–€80 each. Frequency Mat +: €220. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Frequency Mat + daily for 30 days. If recovery has not noticeably shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Full-Body Protocol Guide", desc: "Position, timing, frequency. How to layer the mat with training, sleep, or stress recovery.", value: "€19" },
  { title: "Infrared Heat Science Primer", desc: "What far-infrared does to circulation, lymphatic flow, and tissue absorption at sub-clinical doses.", value: "€17" },
  { title: "Recovery Stack Mapping", desc: "Which body devices stack with the mat. Sequence ideas for evening or morning rituals.", value: "€14" },
 ],
};

// ─── PRESSURE SHELL ───
const pressureShellConfig: ProductConfig = {
 handle: "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager",
 name: "Pressure Shell",
 subheadline: "Sequential Compression. Systematic Leg Recovery.",
 benefits: [
  { icon: Activity, label: "Sequential Compression" },
  { icon: Heart, label: "Lymphatic Drainage" },
  { icon: Brain, label: "Venous Return" },
  { icon: Waves, label: "4-Chamber Protocol" },
 ],
 testimonials: [
  { name: "Bram, 39", text: "I use this after long training days. The difference in next-day soreness is significant, not marginal." },
  { name: "Lena, 33", text: "Long work days with a lot of standing. My legs stopped feeling heavy by week two." },
  { name: "Mike, 47", text: "My coach uses the clinic version. This does the same thing. I checked the mechanism." },
 ],
 problemReframe: {
  headline: "Your Lymphatic System Has No Pump. It Needs One.",
  paragraphs: [
   "Unlike the circulatory system, the lymphatic network has no central pump. Lymph moves through muscular contraction, body movement, and external compression. After long training sessions, flights, or sedentary work days, lymphatic stagnation creates the heaviness, swelling, and delayed soreness that accumulates in the lower body.",
   "Sequential compression therapy works by inflating chambers in a precise distal-to-proximal order, foot → calf → knee → thigh, recreating the mechanical action of muscular contraction without requiring active movement. Venous blood and lymphatic fluid move toward the core, clearing metabolic waste and reducing inflammatory load in the tissue.",
   "The Pressure Shell uses 4 independent chambers with programmable pressure and sequence. The same technology used in sports medicine recovery suites and post-surgical lymphatic care, at home.",
  ],
  closing: "Compression does what rest cannot.",
 },
 techCards: [
  { icon: Activity, title: "Sequential Compression", desc: "Four chambers inflate in a precise distal-to-proximal sequence: foot first, then calf, knee, thigh. Each chamber holds pressure briefly before the next inflates, creating a wave-like peristaltic movement that mimics muscular contraction for lymphatic and venous flow." },
  { icon: Heart, title: "Adjustable Pressure", desc: "Pressure adjustable from 20–240 mmHg across four intensity levels. Clinical lymphatic protocols typically operate at 30–60 mmHg. Higher settings used for athletes with greater venous return needs. Begin at lowest setting and increase as tolerance develops." },
  { icon: Brain, title: "Venous Return Enhancement", desc: "Sequential compression reduces venous pooling in the lower extremities. Blood that would otherwise sit in dilated veins is mechanically moved toward the inferior vena cava. Reduced venous pressure means lower inflammation, reduced swelling, and faster clearance of metabolic byproducts." },
  { icon: Waves, title: "Lymphatic Clearance", desc: "Interstitial fluid accumulation, the swelling associated with delayed onset muscle soreness (DOMS) and prolonged sitting, is reduced through mechanical lymphatic stimulation. The body's existing drainage pathways are activated and directed by the compression sequence." },
 ],
 ritualSteps: [
  { step: "01", title: "Fit", desc: "Slide both legs into the compression sleeves. The chambers should sit snugly against the skin without pinching. Lie or sit with legs elevated if possible." },
  { step: "02", title: "Program", desc: "Select pressure level (start at 1 or 2) and run the standard sequential protocol, 20 to 30 minutes. The device cycles continuously through the four-chamber sequence." },
  { step: "03", title: "Recover", desc: "Post-session: legs will feel notably lighter. For acute recovery: use immediately post-training. For chronic heaviness: daily 20-minute protocol." },
 ],
 beforeAfter: { before: before2Img, after: after2Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Who is this for?", a: "Athletes recovering from training loads, anyone with prolonged sitting or standing work, people with mild venous insufficiency or lymphedema, and frequent travellers. Not for acute injuries or DVT, consult a physician first." },
  { q: "How long per session?", a: "20–30 minutes is the standard protocol. Longer is not necessarily more effective, lymphatic drainage saturates after a certain volume of cleared fluid." },
  { q: "Can I use it every day?", a: "Yes. Daily use is safe and produces cumulative benefit for chronic venous and lymphatic issues. For acute recovery, use immediately post-training." },
  { q: "What pressure setting should I start at?", a: "Start at level 1 (20–40 mmHg range). It should feel like a firm massage, not uncomfortable. Increase gradually over the first week of use." },
  { q: "Can I use it if I have varicose veins?", a: "Generally yes, but consult your physician first. Sequential compression can be beneficial for mild venous insufficiency but is contraindicated in acute thrombophlebitis or deep vein thrombosis." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Contact us for a full refund if you don't notice measurable recovery improvement within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Sequential Compression · Recovery", studyTitle: "The Effect of Intermittent Pneumatic Compression on Delayed Onset Muscle Soreness", journal: "Journal of Strength and Conditioning Research, 2014", url: "https://scholar.google.com/scholar?q=pneumatic+compression+sequential+DOMS+muscle+recovery+exercise" },
  { technology: "Lymphatic Drainage · Compression", studyTitle: "Intermittent Pneumatic Compression for Lymphedema", journal: "Cochrane Review, 2015", url: "https://scholar.google.com/scholar?q=pneumatic+compression+lymphatic+drainage+venous+return+clinical" },
  { technology: "Venous Return", studyTitle: "Sequential Intermittent Pneumatic Compression and Venous Hemodynamics", journal: "Journal of Vascular Surgery, 1995", url: "https://scholar.google.com/scholar?q=sequential+pneumatic+compression+venous+return+blood+flow+lower+extremity" },
  { technology: "Sports Recovery", studyTitle: "Intermittent Pneumatic Compression Improves Exercise Recovery", journal: "Journal of Athletic Training, 2018", url: "https://scholar.google.com/scholar?q=intermittent+pneumatic+compression+athletic+recovery+performance" },
 ],
 contraindications: [
  "You have active deep vein thrombosis (DVT)",
  "You have acute thrombophlebitis",
  "You have severe arterial insufficiency",
  "You have open wounds, skin infections, or active fractures in the leg area",
  "You have a pacemaker (consult physician before use)",
 ],
 normalSensations: [
  "Pulsing compression through the leg chambers, expected and therapeutic",
  "Tingling or warmth during or after the session, normal circulatory response",
  "Brief skin redness after removal, fades within 20 minutes",
 ],
 sessionInfo: "Session time: 20–30 minutes · Frequency: daily or post-training · Start at lowest pressure setting · Stop if: pain, unusual swelling, or numbness",
 forYouIf: [
  "You train seriously and delayed soreness is limiting your next session quality",
  "You spend long hours seated or standing and your legs feel heavy or swollen by evening",
  "You travel frequently and accumulate venous stagnation from long flights",
  "You've used passive compression garments and want active compression therapy",
  "You want to address lymphatic drainage systematically, not just manage symptoms",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Immediate clearance", body: "Post-session legs feel noticeably lighter from the first use. Venous pooling and lymphatic stagnation are mechanically addressed within the 20-minute compression protocol." },
  { week: "Week 2–3", heading: "Baseline reduction", body: "Chronic end-of-day heaviness and swelling reduce with consistent use. Lower body baseline inflammation decreases, not just post-session relief but a persistent change." },
  { week: "Week 4+", heading: "Recovery optimisation", body: "Training recovery shortens. Next-session quality improves as accumulated metabolic waste in the lower body is systematically cleared across weeks of consistent protocol." },
 ],
 techSectionTitle: "Four chambers. One protocol.",
 problemImage: problemPressureShell,
 valueAnchor: "Clinic pneumatic compression session: €50–€90 each. Pressure Shell: €148. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Pressure Shell daily for 30 days. If recovery has not noticeably shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Sequential Protocol Guide", desc: "Sequence, intensity, duration. How to layer pneumatic compression with training, sleep, or stress recovery.", value: "€19" },
  { title: "Lymphatic Flow Science Primer", desc: "What sequential compression does to circulation, lymphatic clearance, and venous return at sub-clinical doses.", value: "€17" },
  { title: "Recovery Stack Mapping", desc: "Which body devices stack with the compression boots. Sequence ideas for evening or post-training rituals.", value: "€14" },
 ],
};

// ─── PULSE ROLLER ───
const pulseRollerConfig: ProductConfig = {
 handle: "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
 name: "Pulse Roller",
 subheadline: "Percussion Therapy. Compact Format.",
 benefits: [
  { icon: Vibrate, label: "Percussion Vibration" },
  { icon: Activity, label: "Fascia Release" },
  { icon: Heart, label: "Portable Format" },
  { icon: Brain, label: "3-Speed Protocol" },
 ],
 testimonials: [
  { name: "Joris, 28", text: "I foam-rolled for two years and got maybe 30% of the way there. This does what foam rolling promised." },
  { name: "Sara, 35", text: "Five minutes per leg before training. My range of motion changed within the first week." },
  { name: "Elias, 41", text: "I travel for work. This folds flat, fits my bag. My recovery protocol goes with me." },
 ],
 problemReframe: {
  headline: "Fascia Doesn't Release Under Static Pressure Alone.",
  paragraphs: [
   "The fascia, the connective tissue network that encases every muscle, bone, and organ, responds to two inputs: sustained pressure and vibration. Static foam rolling applies pressure. It can soften superficial tension and improve short-term range of motion. But it cannot reach the fascial layers where chronic restriction accumulates, and it cannot produce the rapid tissue response that percussive vibration generates.",
   "Percussion therapy applies rapid mechanical impulses at calibrated frequency directly into the target tissue. The vibration disrupts the cross-link adhesions that form in fascial planes through immobility, overuse, or stress. It also stimulates muscle spindle activity, temporarily resetting neuromuscular tone in the target area.",
   "The Pulse Roller combines percussive vibration with cylindrical contact geometry, the optimal shape for rolling along muscle bellies, IT bands, calves, and spinal erectors.",
  ],
  closing: "Three minutes per muscle group. That's the protocol.",
 },
 techCards: [
  { icon: Vibrate, title: "Percussion Vibration", desc: "Motor-driven vibration delivers percussive impulses through the roller contact surface. Frequency adjustable across three speeds: low (general warm-up and surface tension), medium (fascial adhesion), high (deep tissue and post-training recovery)." },
  { icon: Activity, title: "Cylindrical Contact", desc: "Roller geometry applies consistent contact pressure along muscle bellies and fascial planes. Body weight controls compression depth, heavier pressure on tight areas, lighter on sensitive zones. No external force required." },
  { icon: Heart, title: "Retractable Format", desc: "Head folds flush for travel. Fits in a gym bag, carry-on, or desk drawer. USB charging. 2400mAh battery for 2+ hour runtime between charges." },
  { icon: Brain, title: "3-Speed Protocol", desc: "Low speed: pre-training tissue preparation and general warm-up. Medium speed: post-training recovery and fascial release. High speed: targeted adhesion work on chronic tension zones. Speed selection is protocol-specific, not intensity preference." },
 ],
 ritualSteps: [
  { step: "01", title: "Target", desc: "Identify the tissue you're working: quads, IT band, calves, lats, thoracic spine, glutes. Each zone requires 3 minutes of sustained contact at medium-to-high speed." },
  { step: "02", title: "Apply", desc: "Position the roller under the target muscle. Use body weight for compression. Roll 5–8cm along the muscle belly, pausing 10–15 seconds at points of tension." },
  { step: "03", title: "Layer", desc: "Pre-training at low speed for activation. Post-training at medium-high for recovery. Morning for general tissue quality. Total protocol: 10–15 minutes for full lower body." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Is this different from foam rolling?", a: "Yes. Static foam rolling applies pressure. Percussive vibration adds a dynamic oscillating input that reaches deeper fascial layers and produces a neurological reset in muscle tone that static pressure cannot. The two can be combined." },
  { q: "How long per muscle group?", a: "3 minutes per zone is the standard protocol. More time does not produce proportionally more release, the tissue responds to the initial percussive stimulus and then accommodates." },
  { q: "Can I use it on my back?", a: "Yes. For the thoracic spine: roll along the paraspinal muscles, not on the vertebrae directly. Avoid rolling directly on the lumbar spine." },
  { q: "Should I use it before or after training?", a: "Both. Low-speed pre-training for activation and mobility prep. High-speed post-training for recovery and clearing metabolic waste from the tissue." },
  { q: "How long does the battery last?", a: "2400mAh battery provides approximately 2–2.5 hours at medium speed. USB-C charging to full in 90 minutes." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice improvement in recovery or range of motion within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Percussion · Fascia", studyTitle: "Effects of Vibration Therapy on Muscle Tone and Function", journal: "Journal of Sports Science and Medicine, 2015", url: "https://scholar.google.com/scholar?q=vibration+therapy+fascia+muscle+tone+percussion+recovery" },
  { technology: "Foam Rolling · Myofascial", studyTitle: "Foam Rolling as a Recovery Tool after an Intense Bout of Physical Activity", journal: "Medicine and Science in Sports and Exercise, 2014", url: "https://scholar.google.com/scholar?q=foam+rolling+recovery+fascia+myofascial+release+DOMS" },
  { technology: "Percussion · DOMS", studyTitle: "Vibration Therapy Reduces Perceived Delayed Onset Muscle Soreness", journal: "Journal of Athletic Training, 2020", url: "https://scholar.google.com/scholar?q=percussion+vibration+DOMS+delayed+onset+muscle+soreness+recovery" },
  { technology: "Neuromuscular · Vibration", studyTitle: "Whole-Body Vibration Effects on Muscle Neuromechanical Response", journal: "European Journal of Applied Physiology, 2008", url: "https://scholar.google.com/scholar?q=vibration+neuromuscular+muscle+spindle+tone+fascia" },
 ],
 contraindications: [
  "You have active injuries, fractures, or acute inflammation in the target area",
  "You have deep vein thrombosis, avoid direct vibration over affected areas",
  "You are pregnant, avoid abdominal application",
 ],
 normalSensations: [
  "Localised vibration and pressure at the contact zone, expected",
  "Brief tenderness at tight or restricted areas, normal, reduce pressure and continue",
  "Muscle release or 'unlock' sensation during sustained contact, that's the mechanism",
 ],
 sessionInfo: "Session time: 3 min per muscle group · 10–15 min total · 3 speed settings · Pre-training: low speed · Post-training: medium-high speed",
 forYouIf: [
  "You foam roll and feel it's not reaching the right tissue layers",
  "You have chronic tension in the IT band, calves, or thoracic spine that doesn't resolve with static pressure",
  "You need a compact recovery tool that fits in a gym bag or carry-on",
  "You want to reduce pre-training warm-up time through active tissue preparation",
  "You're addressing fascial restrictions that limit range of motion and compound across training cycles",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Immediate mobilisation", body: "Range of motion at treated joints improves within the first session. Muscle tone resets after three minutes per zone, perceptible from first use." },
  { week: "Week 2–3", heading: "Adhesion reduction", body: "Chronic fascial cross-links in treated zones begin to resolve. Persistent tension patterns that didn't respond to static rolling start to shift." },
  { week: "Week 4+", heading: "Tissue quality", body: "Baseline fascial tissue quality improves across treated areas. Warm-up time decreases. The tissue responds faster and holds less accumulation between sessions." },
 ],
 techSectionTitle: "One tool. Three protocols.",
 problemImage: problemPulseRoller,
 valueAnchor: "Clinic percussion massage session: €30–€60 each. Pulse Roller: €128. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Pulse Roller daily for 30 days. If soreness and recovery have not noticeably shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Percussion Protocol Guide", desc: "Intensity, duration, target zones. Three preset protocols for warm-up, recovery, and fascia release.", value: "€19" },
  { title: "Fascia Science Primer", desc: "What percussion does to fascial tissue, blood flow, and neuromuscular reset at sub-clinical doses.", value: "€17" },
  { title: "Recovery Stack Mapping", desc: "Which body devices stack with the Pulse Roller. Sequence ideas for pre-training and post-training rituals.", value: "€14" },
 ],
};

// ─── REST SHELL ───
const restShellConfig: ProductConfig = {
 handle: "gravity-quilt-cotton-weighted-blanket",
 name: "Rest Shell",
 subheadline: "Weighted Pressure. Sleep Protocol.",
 benefits: [
  { icon: Brain, label: "Deep Pressure Stimulation" },
  { icon: Heart, label: "Cortisol Reduction" },
  { icon: Waves, label: "Parasympathetic Activation" },
  { icon: Focus, label: "Pure Cotton 205TC" },
 ],
 testimonials: [
  { name: "Kees, 36", text: "Sleep onset went from 40 minutes to under 10. I didn't believe it until I tracked it." },
  { name: "Roos, 29", text: "I don't wake up at 3am anymore. The first time it happened I thought it was coincidence. Three weeks in it's consistent." },
  { name: "Sam, 43", text: "I use this with the Depth Mask and Breath Seal. It's the whole sleep input stack. Nothing else has changed." },
 ],
 problemReframe: {
  headline: "Your Nervous System Is Not Turning Off. It Needs Input to Do So.",
  paragraphs: [
   "The transition from wakefulness to deep sleep requires the nervous system to shift from sympathetic activation to parasympathetic dominance. Modern environments maintain low-level threat activation, notifications, light, temperature variation, that keep the sympathetic branch partially engaged throughout the night.",
   "Deep pressure stimulation (DPS) is a well-documented physiological mechanism: distributed weight across the body activates the parasympathetic nervous system, reduces circulating cortisol, and increases serotonin and oxytocin, the upstream precursors to melatonin. This is why being held calms the nervous system, and why infants swaddled in weighted pressure sleep longer and deeper.",
   "The Rest Shell applies 7kg of even pressure across the body during sleep. Not enough to restrict movement. Enough to signal safety to the CNS and initiate the parasympathetic shift.",
  ],
  closing: "The blanket doesn't put you to sleep. Your nervous system does, once you give it the right input.",
 },
 techCards: [
  { icon: Brain, title: "7kg Weight Distribution", desc: "Distributed weight across 205 × 230cm surface area. 7kg is within the clinical range associated with therapeutic DPS, approximately 10% of average adult body weight, the research-indicated optimal ratio for sleep applications." },
  { icon: Heart, title: "Deep Pressure Stimulation", desc: "DPS activates A-beta sensory fibres in the skin, fibres associated with safe touch and pressure. A-beta stimulation has an inhibitory effect on the ascending pain and arousal pathways, reducing the sensory noise that prevents sleep onset." },
  { icon: Waves, title: "Serotonin / Oxytocin Pathway", desc: "Clinical DPS research shows consistent increases in serotonin and oxytocin and decreases in cortisol following weighted pressure application. Elevated serotonin provides the substrate for melatonin synthesis, the upstream molecule the body needs for sleep architecture." },
  { icon: Focus, title: "Pure Cotton Construction", desc: "205 thread count pure cotton outer. Breathable for year-round use. No synthetic fill that creates heat retention. The blanket does its work through weight and texture, not material properties that require specific temperature environments." },
 ],
 ritualSteps: [
  { step: "01", title: "Lay Flat", desc: "Position the Rest Shell over your body from the chest down. The weight distributes naturally across the contact area. No need to pull it tight or arrange it specifically." },
  { step: "02", title: "Pair", desc: "For full sleep input protocol: Breath Seal, Depth Mask, and Rest Shell together address three independent variables, breathing, light, and nervous system tone. Each works through a different mechanism." },
  { step: "03", title: "Repeat", desc: "Nightly. The physiological effect of DPS normalises within 7–14 days, what feels like unusual pressure becomes the expected resting state. Sleep architecture improvement builds across weeks, not sessions." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "7kg, is that too heavy?", a: "7kg across a full-size blanket surface creates mild distributed pressure, not heavy compression. You can move freely under it. If it feels uncomfortable, try sleeping under it for 10 minutes before sleep for the first few nights to normalise the sensation." },
  { q: "Will I overheat?", a: "The pure cotton construction breathes well. The blanket adds minimal thermal mass. If you run hot, use a lighter layer beneath and add the Rest Shell on top in the cooler hours of sleep." },
  { q: "How long until I notice results?", a: "Many users notice reduced sleep onset time in the first week. Sustained improvement in sleep depth and overnight waking typically becomes consistent by week 2–3 of nightly use." },
  { q: "Can I wash it?", a: "Yes. Machine washable at 30°C on a gentle cycle. Tumble dry at low heat. The weight comes from fill distributed in individual pockets, this maintains even distribution after washing." },
  { q: "Is the size right for my bed?", a: "The Rest Shell is sized for a standard double bed (205 × 230cm). For a single bed: the blanket will overhang; pull it flat across the sleeping area." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable improvement in sleep quality within 30 days of consistent nightly use." },
 ],
 studyCards: [
  { technology: "Deep Pressure Stimulation · Sleep", studyTitle: "The Effect of Weighted Blankets on Sleep Quality and Insomnia", journal: "Journal of Sleep Research, 2020", url: "https://scholar.google.com/scholar?q=weighted+blanket+sleep+quality+deep+pressure+stimulation+cortisol" },
  { technology: "DPS · Cortisol", studyTitle: "Efficacy of Weighted Blankets for Anxiety Reduction in Adults", journal: "Occupational Therapy in Mental Health, 2008", url: "https://scholar.google.com/scholar?q=weighted+blanket+deep+pressure+cortisol+serotonin+anxiety" },
  { technology: "Serotonin · Melatonin Pathway", studyTitle: "Serotonin and Sleep: Molecular, Functional and Clinical Aspects", journal: "Pharmacology & Therapeutics, 2007", url: "https://scholar.google.com/scholar?q=serotonin+melatonin+sleep+architecture+parasympathetic+deep+pressure" },
  { technology: "DPS · Parasympathetic", studyTitle: "Sensory Integration in Autism Spectrum Disorder: Deep Pressure Stimulation", journal: "Autism Research and Treatment, 2011", url: "https://scholar.google.com/scholar?q=deep+pressure+stimulation+parasympathetic+nervous+system+sleep+onset" },
 ],
 contraindications: [
  "Children under 3 years or under 15kg body weight, not suitable",
  "You have respiratory difficulties that may be worsened by additional chest weight",
  "You have claustrophobia triggered by confined weight (test in an awake state first)",
 ],
 normalSensations: [
  "Distributed weight across the body, expected",
  "A 'held' sensation on first use, this is the mechanism, not discomfort",
  "Unfamiliar on night one, this normalises within 3–7 nights of consistent use",
 ],
 sessionInfo: "Nightly use · Full 7kg weight · Machine washable 30°C · No prep required, lay flat and sleep",
 forYouIf: [
  "You take more than 20 minutes to fall asleep despite being tired",
  "You wake during the night without clear reason and struggle to return to sleep",
  "You carry high baseline stress and it follows you into your sleep environment",
  "You're building a full sleep input protocol and want to address nervous system tone",
  "You track sleep quality and want to address a remaining variable in your stack",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "First signal", body: "Sleep onset typically shortens within the first few nights. The nervous system begins recognising distributed pressure as the resting state signal." },
  { week: "Week 2–3", heading: "Architecture improvement", body: "Cortisol suppression and serotonin increase compound with consistent nightly input. Deep sleep stages extend; overnight waking reduces." },
  { week: "Week 4+", heading: "Normalisation", body: "The weighted pressure becomes the expected resting condition. Sleep architecture is measurably different from the pre-blanket baseline, the change is structural, not situational." },
 ],
 techSectionTitle: "One weight. One input.",
};

// ─── RESTORE MAT ───
const restoreMatConfig: ProductConfig = {
 handle: "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow",
 name: "Restore Mat",
 subheadline: "Acupressure at Home. 6,210 Points.",
 benefits: [
  { icon: Activity, label: "6,210 Acupressure Points" },
  { icon: Heart, label: "Fascia Stimulation" },
  { icon: Brain, label: "Endorphin Response" },
  { icon: Waves, label: "Mat + Pillow Set" },
 ],
 testimonials: [
  { name: "Eva, 38", text: "The first two minutes feel like too much. By minute five I'm completely relaxed. I use it every evening." },
  { name: "Bas, 44", text: "I replaced 20 minutes of foam rolling with 10 minutes on this. Same tissue release, no effort." },
  { name: "Tamar, 31", text: "I was convinced it was pseudoscience. Eight weeks in, my chronic back tension is gone. I looked up the research." },
 ],
 problemReframe: {
  headline: "Thousands of Points. Sustained Contact. The Same Input Traditional Medicine Has Used for Centuries.",
  paragraphs: [
   "Acupressure works through two concurrent mechanisms. The mechanical pressure from thousands of contact points stimulates the fascia directly, the same tissue that foam rolling and manual therapy target, producing release through sustained compression of the connective tissue matrix. Simultaneously, the widespread skin stimulation triggers an endorphin response that reduces pain perception and induces systemic relaxation.",
   "The Restore Mat's 6,210 acupressure points create full-back coverage from a single 10-minute session. The ABS plastic points compress into the fascia and superficial tissue without piercing, pressure, not puncture.",
   "Consistent use over weeks reduces baseline fascial tension, improves local circulation, and recalibrates the pain threshold at treated areas.",
  ],
  closing: "It's uncomfortable for the first two minutes. Then your nervous system shifts.",
 },
 techCards: [
  { icon: Activity, title: "6,210 Acupressure Points", desc: "ABS plastic lotus points arranged in a precise density pattern. High point density ensures even pressure distribution across the full contact surface. No single point creates excessive pressure, the load distributes across the array." },
  { icon: Heart, title: "Fascia Stimulation", desc: "Sustained point contact compresses the superficial fascial layer, activating mechanoreceptors in the connective tissue matrix. The same principle as manual fascial therapy, applied passively across a full-body surface." },
  { icon: Brain, title: "Endorphin Response", desc: "Widespread tactile stimulation from the point array triggers beta-endorphin release, the body's endogenous analgesic. This accounts for the characteristic progression from initial intensity to deep systemic relaxation that develops within 5–10 minutes of sustained contact." },
  { icon: Waves, title: "Mat + Pillow Set", desc: "Full-back mat (62 × 38cm) with matching neck pillow for cervical acupressure. Use the mat for back, feet, and abdomen; the pillow for neck, shoulders, and targeted pressure zones. Washable foam base with ABS point surface." },
 ],
 ritualSteps: [
  { step: "01", title: "Lay Flat", desc: "Place the mat on a hard surface, floor or firm mattress. Lie directly on it without clothing if possible (thin cotton acceptable). Back, neck, and shoulder positioning." },
  { step: "02", title: "Hold", desc: "The first 1–3 minutes are intense. Breathe slowly. The nervous system shifts at 5–7 minutes, tension releases, the intensity becomes pressure, the pressure becomes relaxation." },
  { step: "03", title: "Extend", desc: "Build from 10 minutes to 20 minutes over the first two weeks. For feet: stand on the mat for 5 minutes. For neck: use the pillow in seated position for 10 minutes. Multiple body areas, one set." },
 ],
 beforeAfter: { before: before2Img, after: after2Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Is it supposed to hurt at first?", a: "The initial intensity is expected, it indicates the fascial tissue is responding to pressure. This shifts to deep relaxation within 5–7 minutes. If the sensation is genuinely painful (sharp, not intense), wear a thin cotton layer between skin and mat for the first few sessions." },
  { q: "Can I use it with clothing on?", a: "Yes. Thin cotton reduces intensity significantly. For the full mechanism, direct skin contact is optimal, but starting with a layer is a reasonable approach." },
  { q: "How long per session?", a: "Start with 10 minutes. Build to 20 minutes over 2 weeks. The physiological response plateaus around 20–25 minutes, longer does not produce proportionally more benefit." },
  { q: "Can I use it on my feet?", a: "Yes. Stand on the mat for 5 minutes per foot for a plantar fascia protocol. Use near a wall for balance." },
  { q: "How often should I use it?", a: "Daily is optimal. The effects of acupressure are cumulative, each session builds on baseline changes from previous sessions." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable improvement in tension and relaxation within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Acupressure · Fascia", studyTitle: "Mechanical Stimulation of Acupressure Points and Its Effects on Myofascial Tissue", journal: "Journal of Alternative and Complementary Medicine, 2011", url: "https://scholar.google.com/scholar?q=acupressure+mat+myofascial+tissue+fascia+stimulation+mechanism" },
  { technology: "Acupressure · Pain · Endorphins", studyTitle: "Effects of Acupressure on Endorphins and Cortisol in Fibromyalgia", journal: "Pain Management Nursing, 2013", url: "https://scholar.google.com/scholar?q=acupressure+endorphin+cortisol+pain+relief+mechanism" },
  { technology: "Spiky Mat · Clinical Evidence", studyTitle: "Spiked Acupressure Mat Effect on Back Pain and Relaxation", journal: "European Journal of Integrative Medicine, 2015", url: "https://scholar.google.com/scholar?q=acupressure+mat+spike+back+pain+relaxation+tension+clinical" },
  { technology: "Sustained Pressure · CNS", studyTitle: "Sensory Input and the Parasympathetic Response to Manual Therapy", journal: "Journal of Manual and Manipulative Therapy, 2008", url: "https://scholar.google.com/scholar?q=sustained+pressure+fascia+parasympathetic+nervous+system+relaxation" },
 ],
 contraindications: [
  "Active skin wounds, infections, or rashes in the contact area",
  "You are pregnant, avoid abdominal application",
  "Severe osteoporosis, consult physician before sustained back pressure",
 ],
 normalSensations: [
  "Intense pressure on initial contact, expected, not dangerous",
  "The transition from intensity to relaxation at 5–7 minutes, this is the mechanism working",
  "Local redness after removal, increased blood flow, fades within 15 minutes",
 ],
 sessionInfo: "Session time: 10–20 minutes · Frequency: daily · Direct skin contact preferred · Start with clothing layer if needed during first 3 sessions",
 forYouIf: [
  "You carry chronic back tension from desk work, training load, or accumulated stress",
  "You want passive tissue release, something that works while you simply lie down",
  "You're familiar with manual therapy and want an accessible daily version at home",
  "You've tried foam rolling and want something that does the work without active movement",
  "You want to activate the parasympathetic system as part of an evening wind-down protocol",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Fascial contact", body: "Tissue responds to point contact from the first sessions. Initial intensity gives way to deep relaxation within five to seven minutes, this progression is the mechanism working, not tolerance." },
  { week: "Week 2–3", heading: "Tension reduction", body: "Chronic fascial tightness in treated areas begins to reduce. Baseline back tension decreases with consistent daily use beyond session-level relief." },
  { week: "Week 4+", heading: "Systemic relaxation", body: "The endorphin response becomes the expected outcome. The nervous system enters parasympathetic state reliably and on schedule, a structural recalibration of baseline tone." },
 ],
 techSectionTitle: "6,210 points. One protocol.",
 problemImage: problemRestoreMat,
 valueAnchor: "Clinic red light + NIR session: €60–€90 per 10-minute exposure. Flux Panel: €280. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Flux Panel daily for 30 days. If it has not earned its place in your morning, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Photon Protocol Guide", desc: "Distance, duration, frequency, calibration for skin, recovery, and combined sessions.", value: "€19" },
  { title: "Wavelength Science Primer", desc: "What 660nm and 850nm actually do at the cellular level. PubMed citations.", value: "€27" },
  { title: "Recovery Tracker Template", desc: "Weekly soreness, sleep, and energy log. Photobiomodulation effects compound; tracking surfaces the trend.", value: "€17" },
 ],
};

// ─── RITUAL LIGHT PRO ───
const ritualLightProConfig: ProductConfig = {
 handle: "led-beauty-lamp-red-light-therapy-lamp-desktop-stand",
 name: "Ritual Light Pro",
 subheadline: "Red Light. Stationary Protocol. 660nm.",
 benefits: [
  { icon: Sun, label: "660nm Photobiomodulation" },
  { icon: Focus, label: "Hands-Free Desktop Protocol" },
  { icon: Brain, label: "Mitochondrial Activation" },
  { icon: Activity, label: "10–15 Minute Sessions" },
 ],
 testimonials: [
  { name: "Hanna, 34", text: "I sit in front of it for 12 minutes every morning while I read. Three weeks in my skin texture is different." },
  { name: "Joren, 39", text: "I was spending €90 a month on LED facials. This is the same mechanism, stationary at home." },
  { name: "Tine, 47", text: "Consistent is the word. It sits on my desk. I don't have to remember to pick it up and hold it. That's why it works." },
 ],
 problemReframe: {
  headline: "The Mechanism Is Real. The Barrier Is Consistency.",
  paragraphs: [
   "Photobiomodulation at 660nm is one of the most replicated findings in non-invasive medicine. Red light activates cytochrome c oxidase in the mitochondrial membrane, increasing ATP production, accelerating cellular turnover, and stimulating fibroblast activity, the pathway that produces collagen and elastin.",
   "Handheld devices work. They require you to hold them, which requires you to maintain a session actively. The proportion of people who use handheld devices consistently enough to reach the cumulative threshold for visible results is low. The barrier is not interest, it's friction.",
   "The Ritual Light Pro sits at desk distance. You sit in front of it. The session runs while you are stationary, working, reading, or doing nothing. No active maintenance. No technique. The mechanism works on the tissue while your hands are free.",
  ],
  closing: "The best protocol is the one you don't have to maintain.",
 },
 techCards: [
  { icon: Sun, title: "660nm Red Light", desc: "Optimal wavelength for surface tissue photobiomodulation. At 660nm, cytochrome c oxidase absorption is maximal, the enzyme responsible for electron transfer in the mitochondrial respiratory chain. Stimulates ATP production in fibroblasts, collagen-producing cells, and surface epithelial tissue." },
  { icon: Focus, title: "Desktop Stand Format", desc: "Freestanding at desk height. Position 20–30cm from face and neck. The light angle is optimised for facial incidence at seated position. No arm fatigue. No active positioning during the session." },
  { icon: Brain, title: "Photon Dose", desc: "Therapeutic photobiomodulation requires sufficient photon dose (irradiance × time). The Ritual Light Pro delivers adequate irradiance at 20–30cm distance for 10-minute sessions to meet the dosing range associated with cellular response in clinical studies." },
  { icon: Activity, title: "Clean Protocol", desc: "No app, no modes, no sequences. Turn on, sit at the correct distance, session runs 10–15 minutes. Power from included cord. The simplicity is the product, a protocol that generates zero friction and gets used daily." },
 ],
 ritualSteps: [
  { step: "01", title: "Position", desc: "Place on desk at comfortable seated height. Sit 20–30cm away. Eyes closed or eyewear during full-face sessions. The lamp should face the target area directly." },
  { step: "02", title: "Run", desc: "Power on. 10–15 minutes per session. You can read, rest, or simply be still. The protocol requires nothing from you except proximity." },
  { step: "03", title: "Repeat", desc: "Daily. The photobiomodulation effect is cumulative, cellular ATP production, collagen synthesis, and turnover rate improve over weeks and months of consistent input, not single sessions." },
 ],
 beforeAfter: { before: beforeImg, after: afterImg },
 comparisonRows: defaultComparison,
 faqs: [
  { q: "Should I close my eyes?", a: "Yes. Never look directly into the light. Close your eyes during full-face sessions or wear protective eyewear." },
  { q: "How close should I sit?", a: "20–30cm is optimal for the Ritual Light Pro's irradiance output. Closer increases intensity; further reduces it below therapeutic range. Sitting at normal desk distance is approximately correct." },
  { q: "How many sessions per week?", a: "Daily is optimal. The photobiomodulation mechanism responds to consistent dosing, the cumulative effect of daily 10-minute sessions outperforms sporadic 20-minute sessions." },
  { q: "Is this the same as a facial LED mask?", a: "Similar mechanism, different format. LED masks cover the full face in contact. The Ritual Light Pro delivers at-distance irradiance without contact. Research shows both formats produce cellular response, the distinction is convenience and coverage area." },
  { q: "Does the light work through a moisturiser or serum?", a: "Yes. Topical products don't meaningfully block red light wavelengths. You can run the lamp session after applying serum." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable skin change within 30 days of consistent daily use." },
 ],
 studyCards: [
  { technology: "Red Light 660nm · Collagen", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
  { technology: "Photobiomodulation · ATP", studyTitle: "Mechanisms and Mitochondrial Redox Signalling in Photobiomodulation", journal: "Photochemistry and Photobiology, 2017", url: "https://scholar.google.com/scholar?q=photobiomodulation+mitochondria+ATP+cytochrome+c+oxidase+660nm" },
  { technology: "LED Therapy · Skin", studyTitle: "A Controlled Trial to Determine the Efficacy of Red and Near-Infrared Light Treatment in Patient Satisfaction, Reduction of Fine Lines, Wrinkles, Skin Roughness, and Intradermal Collagen Density Increase", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=red+light+LED+facial+collagen+fibroblast+clinical+trial+satisfaction" },
  { technology: "Compliance · Consistency", studyTitle: "Adherence to Home-Based Light Therapy Protocols for Skin Conditions", journal: "Journal of Dermatological Treatment, 2019", url: "https://scholar.google.com/scholar?q=home+red+light+therapy+adherence+consistency+outcomes" },
 ],
 contraindications: [
  "You are on photosensitising medication (tetracyclines, certain antidepressants)",
  "You have active cancer in the treatment area",
  "You have epilepsy (photosensitive)",
  "Do not look directly into the lamp",
 ],
 normalSensations: [
  "Mild warmth at close distance, normal",
  "No sensation at recommended distance, expected",
 ],
 sessionInfo: "Session time: 10–15 minutes · Distance: 20–30cm · Frequency: daily · Eyes closed throughout",
 forYouIf: [
  "You want the photobiomodulation protocol but don't maintain handheld device habits consistently",
  "You work at a desk and can integrate a stationary light session into your existing routine",
  "You've done red light treatments at a clinic and want to own the protocol at home permanently",
  "You're focused on skin improvement and want a daily mechanism, not an occasional treatment",
  "You want consistency without friction, a device that works while you're doing something else",
 ],
 mechanismTimeline: [
  { week: "Week 1–2", heading: "Cellular activation", body: "Cytochrome c oxidase activation begins from session one. Skin texture and surface clarity are typically the first observable changes, within the first two weeks of daily sessions." },
  { week: "Week 3–4", heading: "Collagen signal", body: "Fibroblast stimulation at 660nm is cumulative. Skin tone, fine line depth, and surface firmness begin to shift measurably with consistent daily dosing." },
  { week: "Week 5+", heading: "Structural renewal", body: "Consistent daily dosing drives collagen synthesis at a rate detectable without close inspection. The compounding effect of daily sessions produces the visible change the clinical evidence supports." },
 ],
 techSectionTitle: "One wavelength. Daily dose.",
 valueAnchor: "Clinic desktop red light session: €40–€80 each. Ritual Light Pro: €225. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Ritual Light Pro daily for 30 days. If skin response or rhythm has not shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Desktop Protocol Guide", desc: "Distance, duration, frequency. How to integrate the panel into morning and workday rituals without adding time.", value: "€19" },
  { title: "660nm Wavelength Science Primer", desc: "What 660nm light does at the cellular level. Mitochondrial absorption, ATP output, fibroblast response.", value: "€17" },
  { title: "Stack Mapping Guide", desc: "Which face and body devices pair with the Ritual Light Pro for compounding effect.", value: "€14" },
 ],
};

// ─── THERMAL PAD ───
const thermalPadConfig: ProductConfig = {
 handle: "red-light-therapy-belt-infrared-hot-compress-phototherapy",
 name: "Thermal Pad",
 subheadline: "Targeted Heat. Joint Protocol.",
 benefits: [
  { icon: ThermometerSun, label: "USB Thermal at 35–55°C" },
  { icon: Vibrate, label: "4-Motor Massage" },
  { icon: Heart, label: "Joint Inflammation Reduction" },
  { icon: Focus, label: "Targeted Area Coverage" },
 ],
 testimonials: [
  { name: "Marc, 43", text: "I use it on my knee every morning before training. Went from needing 15 minutes to warm up to being ready in five." },
  { name: "Lisa, 37", text: "Chronic shoulder tension for years. Three weeks of daily morning heat and I stopped noticing it." },
  { name: "Pieter, 52", text: "I use it at my desk on my lower back. The vibration mode during long work sessions is a different category than I expected." },
 ],
 problemReframe: {
  headline: "Chronic Joint Stiffness Is a Circulation Problem Before It Is a Pain Problem.",
  paragraphs: [
   "Connective tissue, tendons, ligaments, joint capsule, has poor blood supply compared to muscle. Heat increases local blood flow to these structures, delivering nutrients and clearing inflammatory markers more effectively than passive rest. The improvement in morning stiffness with heat is not analgesic masking, it is circulation-driven tissue preparation.",
   "The Thermal Pad applies consistent thermal input at 35–55°C to a targeted body area via USB at 8.5W. A focused thermal application that stays precisely where you put it, for as long as the protocol runs.",
   "The additional 4-motor massage function provides mechanical stimulation to the overlying muscle, addressing the neuromuscular tension that typically accompanies joint stiffness.",
  ],
  closing: "Fifteen minutes of targeted heat before loading the joint changes the entire session.",
 },
 techCards: [
  { icon: ThermometerSun, title: "USB Thermal at 8.5W", desc: "Electric heating element powered via USB at 8.5W. Reaches operating temperature in under 3 minutes. Temperature range 35–55°C with three adjustable settings. The 55°C setting delivers therapeutic heat below the threshold for tissue damage." },
  { icon: Vibrate, title: "4-Motor Vibration", desc: "Four embedded vibration motors provide mechanical stimulation to the overlying muscle tissue. Vibration breaks up muscular tension, supports local circulation, and adds a tactile recovery input independent of the thermal mechanism." },
  { icon: Heart, title: "Targeted Application", desc: "Designed for knees, shoulders, lower back, hips, wrists, and ankles. Adjustable wrap closure maintains full contact with the joint area. Format small enough for desk use, transit, or pre-training warm-up." },
  { icon: Focus, title: "Circulation Mechanism", desc: "Heat-driven vasodilation in the joint area increases capillary blood flow, improving oxygen and nutrient delivery to connective tissue while accelerating clearance of inflammatory mediators, the same mechanism underlying physiotherapy heat protocols." },
 ],
 ritualSteps: [
  { step: "01", title: "Position", desc: "Wrap the Thermal Pad around the target joint. Secure with the adjustable closure, firm contact, not compression. The heat transfers through fabric; direct skin contact is not required." },
  { step: "02", title: "Select", desc: "Choose temperature (35°C, 45°C, or 55°C) and optional vibration mode. For pre-training preparation: medium heat, no vibration for 10 minutes. For recovery: high heat, vibration for 15–20 minutes." },
  { step: "03", title: "Repeat", desc: "Daily morning application for chronic stiffness before the joint takes load. Post-training application for acute recovery. The thermal effect on connective tissue is cumulative, consistent daily use reduces baseline stiffness across weeks." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Is 55°C safe?", a: "55°C is the upper therapeutic range for surface heat application. The Thermal Pad applies this to the skin surface, which has significant insulation. Joint temperature does not reach surface temperature. If the setting feels too warm, reduce to 45°C." },
  { q: "Which temperature setting should I use?", a: "35°C: gentle warm-up or sensitive skin. 45°C: standard pre-training preparation. 55°C: recovery after training or acute stiffness. Start at 35–45°C and adjust based on response." },
  { q: "Can I use it while working?", a: "Yes. The compact format and USB power make it suitable for desk use. Position the pad on a knee or lower back while seated." },
  { q: "Can I sleep with it on?", a: "Not recommended. The pad has no auto-shutoff for extended sessions. Use it as a 15–20 minute active protocol, not overnight." },
  { q: "Can I use it on my lower back?", a: "Yes. Position against the lumbar region while seated or lying. The thermal and vibration inputs address the paraspinal muscles and surrounding connective tissue." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable improvement in joint stiffness or recovery within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Heat Therapy · Joints", studyTitle: "Superficial Heat or Cold for Low Back Pain", journal: "Cochrane Review, 2006", url: "https://scholar.google.com/scholar?q=heat+therapy+joint+stiffness+circulation+blood+flow+connective+tissue" },
  { technology: "Thermal · Connective Tissue", studyTitle: "The Effect of Local Heat Application on Tendon Healing", journal: "Journal of Orthopaedic Research, 2004", url: "https://scholar.google.com/scholar?q=heat+connective+tissue+tendon+circulation+healing+collagen" },
  { technology: "Vibration · Muscle Tension", studyTitle: "Effect of Local Vibration on Muscle Performance", journal: "Journal of Sports Science, 2016", url: "https://scholar.google.com/scholar?q=vibration+therapy+muscle+tension+joint+preparation+recovery" },
  { technology: "Heat + Vibration Combined", studyTitle: "Thermal and Mechanical Stimulation in Musculoskeletal Recovery", journal: "Physical Therapy Research, 2019", url: "https://scholar.google.com/scholar?q=heat+vibration+combined+musculoskeletal+recovery+inflammation" },
 ],
 contraindications: [
  "You have active inflammation, acute injury, or burns in the application area",
  "You have sensory neuropathy (cannot detect heat) in the application area",
  "You have vascular disease in the application area, consult physician before use",
  "You are pregnant, avoid abdominal or lower back application",
 ],
 normalSensations: [
  "Progressive warmth during the session, expected",
  "Localised vibration from the motor function, expected",
  "Mild redness of the skin after removal, increased blood flow, fades within 20 minutes",
 ],
 sessionInfo: "Session time: 15–20 minutes · Temperature: 35–55°C · Frequency: daily or pre/post-training · Stop if: burning sensation or numbness",
 forYouIf: [
  "You have a recurring joint issue, knee, shoulder, or wrist, that stiffens overnight or between sessions",
  "You train regularly and want to reduce the warm-up time your joints need before loading",
  "You want targeted heat at the joint specifically, not general body warmth",
  "You have a desk job and accumulate joint tension through prolonged static posture",
  "You want a USB-powered protocol that works anywhere, at home, at a desk, or travelling",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Circulation response", body: "Targeted heat increases blood flow to the joint from the first sessions. Morning stiffness typically reduces within the first week of consistent pre-loading application." },
  { week: "Week 2–3", heading: "Connective tissue change", body: "Consistent thermal input to tendon and ligament tissue improves elasticity. The joint responds faster to warm-up and holds less residual tension between sessions." },
  { week: "Week 4+", heading: "Baseline reduction", body: "Chronic stiffness patterns that built over months begin to reduce. The joint baseline, resting mobility and comfort, measurably improves with continued daily protocol." },
 ],
 techSectionTitle: "Heat + vibration. One joint.",
 valueAnchor: "Clinic targeted heat session: €25–€60 each. Thermal Pad: €158. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Thermal Pad daily for 30 days. If joint comfort or baseline mobility has not shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Targeted Heat Protocol Guide", desc: "Position, duration, temperature settings for specific joint and muscle zones.", value: "€19" },
  { title: "Thermal Mechanism Primer", desc: "How controlled heat affects tissue absorption, circulation, and stiffness response.", value: "€17" },
  { title: "Recovery Stack Mapping", desc: "Which devices layer with the Thermal Pad. Sequence ideas for evening recovery or pre-training warm-up.", value: "€14" },
 ],
};

// ─── THERMAL SHELL (full sauna blanket) ───
const thermalShellConfig: ProductConfig = {
 handle: "portable-home-use-charging-red-light-therapy-blanket-far-infrared",
 name: "Thermal Shell",
 subheadline: "Heat Protocol. Wherever You Are.",
 benefits: [
  { icon: ThermometerSun, label: "Far-Infrared at 8–14μm" },
  { icon: Brain, label: "Heat Shock Protein Induction" },
  { icon: Heart, label: "Parasympathetic Rebound" },
  { icon: Activity, label: "USB-Powered. One Size." },
 ],
 testimonials: [
  { name: "Wout, 34", text: "Three nights a week before bed. Sleep score went from 71 to 84 in two weeks. My Oura ring was the first to notice." },
  { name: "Vera, 40", text: "I was paying €25 a session at the infrared studio. Same mechanism. Same output. I stopped going." },
  { name: "Omar, 38", text: "HRV went up 11 points in three weeks of post-training sessions. That's not placebo, I tracked it before I even noticed the soreness was gone." },
 ],
 problemReframe: {
  headline: "Your Body Was Built for Heat Stress. You've Been Keeping It Comfortable.",
  paragraphs: [
   "For most of human history, the body encountered acute thermal stress daily, sun, fire, exertion. That stress triggered a cascade your biology still expects: heat shock protein synthesis, vasodilation, hormonal reset, and a deep parasympathetic rebound during cooling. Modern life removed the trigger. The recovery signal is missing.",
   "Far-infrared radiation operates at 8–14 micrometres, the precise wavelength range the body emits and absorbs most efficiently. At 0–15W through SBR neoprene, the Thermal Shell delivers radiant thermal energy that penetrates tissue without requiring extreme ambient heat. Core temperature rises. The cascade follows.",
   "The Thermal Shell is USB-powered. It runs from any wall adapter, power bank, or laptop port. One-size construction fits up to 190cm. The thermal protocol that required a facility now requires a surface to lie on.",
  ],
  closing: "Thirty minutes. The biology you were supposed to activate every day.",
 },
 techCards: [
  { icon: ThermometerSun, title: "Far-Infrared at 8–14μm", desc: "Far-infrared wavelengths in the 8–14 micrometre range are absorbed directly by water molecules in tissue, the primary heat transfer mechanism inside the body. The Thermal Shell emits within this window, delivering radiant thermal load that penetrates beyond the skin surface without requiring high ambient temperature." },
  { icon: Brain, title: "Heat Shock Protein Induction", desc: "Thermal stress, even moderate, activates HSP70 and HSP90. These proteins repair and stabilise cellular structures damaged by oxidative stress and training load. Regular heat exposure has been consistently linked to reduced inflammatory markers, improved metabolic function, and faster recovery between sessions." },
  { icon: Heart, title: "Parasympathetic Rebound", desc: "During a session, heart rate and core temperature rise. When the body exits the heat environment and begins to cool, the nervous system shifts toward parasympathetic dominance, the mechanism behind post-sauna relaxation, faster sleep onset, and the subjective heaviness of well-rested muscles. Scheduling sessions 60–90 minutes before sleep amplifies this effect." },
  { icon: Activity, title: "SBR Neoprene Construction", desc: "The Thermal Shell is built from SBR neoprene, the same flexible, durable material used in wetsuits. It insulates thermal energy against the body, maximises radiant contact along the full body surface, and is sweat-resistant. USB-powered at 5V/0–15W. Runs from any standard adapter or power bank. One size fits up to 190cm." },
 ],
 ritualSteps: [
  { step: "01", title: "Plug in", desc: "Connect to any USB power source, wall adapter, power bank, laptop. Pre-heat for 3–5 minutes on your chosen setting. The neoprene retains warmth efficiently; you will feel heat within minutes of lying in." },
  { step: "02", title: "Lie in", desc: "Wear light cotton or enter directly. Standard session: 30 minutes. New to heat protocol: begin at 20 minutes, low setting. Hydrate with 400–600ml beforehand, you will perspire." },
  { step: "03", title: "Cool down", desc: "Exit and lie flat for 10–15 minutes. This is not optional, the cooling phase is where the parasympathetic shift occurs. For sleep: schedule the full sequence 60–90 minutes before bed." },
 ],
 beforeAfter: { before: before2Img, after: after2Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "What powers it?", a: "USB at 5V, 0–15W. Any standard USB wall adapter, power bank, or USB-C hub works. No special power supply needed. It draws less than a laptop charger." },
  { q: "How warm does it get?", a: "The internal surface reaches 40–55°C depending on setting and ambient temperature. Far-infrared operates at lower surface temperatures than traditional sauna, the mechanism is radiant tissue absorption, not hot-air convection. Many users find it more comfortable to sustain for a full 30-minute session as a result." },
  { q: "What is SBR neoprene?", a: "The same flexible, durable material used in wetsuits and thermal sportswear. It insulates body heat, maintains full-surface contact, and is sweat-resistant. The neoprene construction is what allows the blanket to be rolled and packed into a compact format (30×16×7cm)." },
  { q: "Should I wear anything inside?", a: "Light cotton is recommended for comfort and sweat absorption. Direct contact with the neoprene lining is also fine. Avoid synthetic fabrics, they trap heat unevenly and are less comfortable for extended sessions." },
  { q: "When should I use it relative to training?", a: "Post-training: wait 2 hours after intense sessions before heat exposure. The HSP and recovery benefit is strongest when the body has begun initial repair. Pre-sleep: 60–90 minutes before bed for sleep architecture benefit. Morning sessions work well for metabolic activation without affecting sleep timing." },
  { q: "How is this different from a traditional sauna?", a: "Traditional sauna heats ambient air to 80–100°C; you heat by convection. Far-infrared heats tissue directly via radiant wavelengths at much lower ambient temperature. The core temperature response is similar. The Thermal Shell runs at a fraction of the power and requires no facility." },
  { q: "What is your guarantee?", a: "30-Day Protocol Guarantee. If you run consistent sessions and don't notice measurable improvement in recovery or sleep within 30 days, full refund, no process required." },
 ],
 studyCards: [
  { technology: "Far-Infrared · Recovery", studyTitle: "Far-Infrared Sauna as a Novel Therapeutic Modality for Cardiovascular Health", journal: "Journal of Human Hypertension, 2004", url: "https://scholar.google.com/scholar?q=far+infrared+sauna+cardiovascular+recovery+heat+shock+protein" },
  { technology: "Passive Heat · Sleep", studyTitle: "Passive Body Heating and Sleep in Humans", journal: "Sleep, 1997", url: "https://scholar.google.com/scholar?q=heat+sauna+sleep+onset+latency+deep+sleep+architecture+parasympathetic" },
  { technology: "HSP Induction · Exercise", studyTitle: "Exercise, Heat Stress, and the HSP Response", journal: "Canadian Journal of Physiology and Pharmacology, 2006", url: "https://scholar.google.com/scholar?q=heat+shock+protein+sauna+exercise+stress+HSP70+induction" },
  { technology: "Sauna · Longevity", studyTitle: "Association Between Sauna Bathing and Fatal Cardiovascular and All-Cause Mortality Events", journal: "JAMA Internal Medicine, 2015", url: "https://scholar.google.com/scholar?q=sauna+mortality+cardiovascular+longevity+heat+exposure+Laukkanen" },
 ],
 contraindications: [
  "You are pregnant",
  "You have severe cardiovascular disease or uncontrolled hypertension",
  "You have a history of heat stroke or heat intolerance",
  "You are on medication that impairs thermoregulation, consult your physician first",
  "Do not use immediately after intense training, wait at least 2 hours",
 ],
 normalSensations: [
  "Gradual warmth building across the full body, expected; the neoprene retains heat progressively",
  "Perspiration after 10–15 minutes, normal and desired; hydrate before each session",
  "Deep relaxation and heaviness post-session, the parasympathetic shift in progress",
 ],
 sessionInfo: "Session time: 30 min · Power: USB 5V / 0–15W · Material: SBR neoprene · Surface temp: 40–55°C · Packed size: 30×16×7cm · Frequency: 3–4× per week",
 forYouIf: [
  "You want the heat shock protein protocol without a commercial sauna or monthly membership",
  "You track HRV, sleep quality, or recovery metrics and want to add a proven hormetic input",
  "You travel and want a recovery tool that folds into a bag and runs from any power bank",
  "You train seriously and want to accelerate the tissue repair process between sessions",
  "You understand that discomfort is a signal, and you want to give your body the one it's been missing",
 ],
 mechanismTimeline: [
  { week: "Sessions 1–5", heading: "Thermal activation", body: "Core temperature rises and the parasympathetic rebound begins from the first session. Most users notice sleep onset improving before they notice any change in recovery, the nervous system responds first." },
  { week: "Week 2–3", heading: "HSP induction", body: "Consistent heat stress triggers measurable heat shock protein production. Residual soreness between training days shortens. Tissue baseline shifts, the body begins arriving at sessions with less accumulated tension." },
  { week: "Week 4–6", heading: "Systemic adaptation", body: "Hormetic adaptation to regular thermal stress accumulates. HRV trends upward, metabolic markers improve, and sleep architecture deepens. The protocol is now producing structural change, not just session-by-session relief." },
 ],
 techSectionTitle: "Far-infrared. Full body. USB-powered.",
};

// ─── THERMAL SHELL LITE ───
const thermalShellLiteConfig: ProductConfig = {
 handle: "household-full-body-moisture-removing-infrared-sauna-blanket",
 name: "Thermal Shell Lite",
 subheadline: "Sauna Protocol. Lighter Form.",
 benefits: [
  { icon: ThermometerSun, label: "Far-Infrared Penetration" },
  { icon: Heart, label: "Core Temperature Protocol" },
  { icon: Activity, label: "Single-Zone Heating" },
  { icon: Focus, label: "Packable Format" },
 ],
 testimonials: [
  { name: "Ana, 28", text: "I travel a lot. This is the first recovery tool that actually comes with me and gets used." },
  { name: "Tim, 35", text: "I wanted the thermal protocol without the full blanket size. This does the same thing, lighter." },
  { name: "Nora, 42", text: "Recovery sessions after long runs. My baseline soreness reduced. The heat protocol is real." },
 ],
 problemReframe: {
  headline: "The Sauna Protocol in a Form That Goes With You.",
  paragraphs: [
   "Far-infrared heat exposure produces a systemic physiological response, heat shock proteins, vasodilation, parasympathetic rebound, improved sleep onset. This doesn't require a 90kg wood-fired cabin. It requires consistent thermal loading at the right intensity for the right duration.",
   "The Thermal Shell Lite delivers the same far-infrared mechanism as the full Thermal Shell in a lighter, more packable construction. Single-zone heating covers the full body. For users who want the thermal protocol without the larger format.",
  ],
  closing: "Same mechanism. Lighter form. Same result.",
 },
 techCards: [
  { icon: ThermometerSun, title: "Far-Infrared Heating", desc: "Far-infrared wavelengths penetrate beyond the skin surface to elevate core tissue temperature. The sensation is mild, the physiological response is systemic." },
  { icon: Heart, title: "Single-Zone Protocol", desc: "One continuous heating zone covers the full body length. Power via standard cord. Temperature adjustable. Fits up to 185cm." },
  { icon: Activity, title: "Waterproof Construction", desc: "Waterproof interior manages sweat during sessions. Lighter exterior construction than the full Thermal Shell, more packable, easier to store." },
  { icon: Focus, title: "Session Structure", desc: "30-minute sessions at standard temperature. The same thermal loading protocol as the full Thermal Shell, core temperature elevation, HSP induction, parasympathetic rebound." },
 ],
 ritualSteps: [
  { step: "01", title: "Prepare", desc: "Preheat for 5 minutes. Lie inside in light cotton clothing. Hydrate before the session." },
  { step: "02", title: "Run", desc: "30 minutes at standard temperature. You will sweat, this is the mechanism, not a side effect." },
  { step: "03", title: "Recover", desc: "10–15 minutes of cool-down after the session. For sleep benefit: schedule 60–90 minutes before bed." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Is this different from the Thermal Shell?", a: "Same far-infrared mechanism. The Lite is lighter construction, more packable, single-zone heating. The full Thermal Shell has a heavier build and multi-zone control. For most users, the Lite delivers the same physiological protocol." },
  { q: "How long per session?", a: "30 minutes is standard. Begin at 20 minutes in the first week if new to heat training." },
  { q: "When should I use it?", a: "Post-training for recovery, or 60–90 minutes before bed for sleep benefit. Morning sessions support metabolic activation." },
  { q: "Do I need to hydrate?", a: "Yes. Hydrate with 500ml before a session. Electrolytes are useful for regular use." },
  { q: "Can I use it while sitting?", a: "Not designed for seated use, optimised for supine (lying flat) position. For seated thermal protocols, consider the Thermal Zone or Thermal Pad." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable recovery or sleep improvement within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Far-Infrared · Recovery", studyTitle: "Far-Infrared Sauna as a Novel Therapeutic Modality for Cardiovascular Health", journal: "Journal of Human Hypertension, 2004", url: "https://scholar.google.com/scholar?q=far+infrared+sauna+cardiovascular+recovery+heat+shock+protein" },
  { technology: "Heat Exposure · Sleep", studyTitle: "Passive Body Heating and Sleep in Humans", journal: "Sleep, 1997", url: "https://scholar.google.com/scholar?q=heat+sauna+sleep+onset+latency+deep+sleep+architecture+parasympathetic" },
  { technology: "Core Temperature · Physiology", studyTitle: "Thermoregulation and Human Performance", journal: "Medicine and Science in Sports and Exercise, 2007", url: "https://scholar.google.com/scholar?q=core+temperature+elevation+heat+physiological+response+recovery" },
  { technology: "HSP · Thermal Training", studyTitle: "Exercise, Heat Stress, and the HSP Response", journal: "Canadian Journal of Physiology and Pharmacology, 2006", url: "https://scholar.google.com/scholar?q=heat+shock+protein+sauna+exercise+stress+HSP70+induction" },
 ],
 contraindications: [
  "You are pregnant",
  "You have severe cardiovascular disease or uncontrolled hypertension",
  "You have heat intolerance or history of heat stroke",
  "You are on medication that impairs thermoregulation",
 ],
 normalSensations: [
  "Progressive warmth build-up, expected",
  "Sweating after 10–15 minutes, normal",
  "Post-session relaxation, the parasympathetic rebound",
 ],
 sessionInfo: "Session time: 30 minutes · Hydrate before and after · Cool down 10–15 minutes post-session · Frequency: 2–4× per week",
 forYouIf: [
  "You want the far-infrared sauna protocol in a lighter, more practical format",
  "You don't need a full-weight sauna blanket and want something packable and storage-friendly",
  "You're new to thermal recovery and want to start the protocol with a lower barrier to entry",
  "You travel regularly and want a thermal recovery protocol that comes with you",
  "You want the core temperature protocol without the larger format investment",
 ],
 mechanismTimeline: [
  { week: "Week 1–2", heading: "Thermal activation", body: "Core temperature elevation begins the physiological cascade from session one. Sweating, parasympathetic rebound, and improved sleep onset are typically the first responses." },
  { week: "Week 3–4", heading: "HSP accumulation", body: "Heat shock protein induction compounds across sessions. Recovery efficiency improves. The body adapts to the thermal stress and becomes more efficient at managing it." },
  { week: "Week 6+", heading: "Consistent protocol", body: "Far-infrared sessions become part of weekly recovery. The cumulative effect, reduced inflammation, better sleep architecture, improved metabolic markers, builds across continued use." },
 ],
 techSectionTitle: "One mechanism. Lighter format.",
};

// ─── THERMAL ZONE (infrared belt, 360 LEDs) ───
const thermalZoneConfig: ProductConfig = {
 handle: "null-1777641441133",
 name: "Thermal Zone",
 subheadline: "Infrared Belt. 360 LED Nodes. Wearable Protocol.",
 benefits: [
  { icon: Sun, label: "360 Infrared LED Nodes" },
  { icon: ThermometerSun, label: "Far-Infrared + Red Light" },
  { icon: Activity, label: "Wearable During Activity" },
  { icon: Heart, label: "Targeted Body Area" },
 ],
 testimonials: [
  { name: "Rob, 36", text: "I wear it during evening walks. The infrared and red light together on the lower back, different from anything I've used before." },
  { name: "Kim, 43", text: "Post-workout. On the abdomen. The circulation feeling is immediate, not subtle." },
  { name: "Stan, 51", text: "I've used three different red light belts. The LED density on this is the differentiator." },
 ],
 problemReframe: {
  headline: "360 LEDs. Two Mechanisms. One Wearable Protocol.",
  paragraphs: [
   "Most thermal wraps deliver heat only. Most red light devices are stationary. The Thermal Zone combines both into a wearable belt format, far-infrared thermal output and photobiomodulation from 360 LED nodes, targeted to the specific body area where you wrap it.",
   "The infrared component increases local tissue temperature and blood flow. The red light photons penetrate 2–7mm beneath the skin surface into the muscle and connective tissue layer, activating cellular energy production at the site of application.",
   "One belt. Two inputs. Body area of your choice.",
  ],
  closing: "Wrap it. Run the protocol. Move on.",
 },
 techCards: [
  { icon: Sun, title: "360 LED Node Array", desc: "360 infrared LED nodes distributed uniformly across the belt surface. High node density ensures even irradiance delivery, no dark zones or hot spots. Both red light (visible spectrum) and near-infrared (invisible, deeper penetration) emitters." },
  { icon: ThermometerSun, title: "Thermal Output", desc: "Far-infrared heating increases local tissue temperature in the belt contact area. Vasodilation improves blood flow to the underlying muscle and connective tissue. Thermal and photon delivery occur simultaneously." },
  { icon: Activity, title: "Adjustable Belt Format", desc: "Wraps waist, abdomen, lower back, hips, or thighs. Adjustable closure for different body sizes. Flexible construction maintains LED contact during light movement." },
  { icon: Heart, title: "Dual Protocol", desc: "Run thermal only for pre-training joint warmup and tissue preparation. Run thermal + red light for post-training recovery and photobiomodulation-driven tissue repair. Two protocols from one instrument." },
 ],
 ritualSteps: [
  { step: "01", title: "Wrap", desc: "Position the belt over the target area, waist, lower back, abdomen, or hips. Secure the closure. The belt should be in firm contact with skin or thin clothing." },
  { step: "02", title: "Run", desc: "Select thermal only or thermal + LED. 20–30 minutes per session. Can be used seated, lying, or during gentle walking." },
  { step: "03", title: "Repeat", desc: "4–5 sessions per week. Pre-training: thermal mode for 15 minutes to prepare the tissue. Post-training: thermal + LED for 20–30 minutes for recovery." },
 ],
 beforeAfter: { before: before2Img, after: after2Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Can I wear it while moving?", a: "Yes, during gentle activity, walking, stretching, seated work. Not designed for high-intensity movement as the connection may flex. Optimal use is stationary or slow movement." },
  { q: "Which body areas does it fit?", a: "Waist, abdomen, lower back, and hips. The belt adjusts across a range of sizes. For larger areas (full back), pair with the Frequency Mat+ or Flux Panel." },
  { q: "Should I use thermal or thermal + LED?", a: "For pre-training preparation: thermal only. For recovery and tissue work: thermal + LED. The LED mode adds the photobiomodulation mechanism to the thermal input." },
  { q: "How long per session?", a: "20–30 minutes is the standard protocol. The thermal and photobiomodulation effects are cumulative, consistent sessions produce the observable change." },
  { q: "Can I use it on my lower back for chronic pain?", a: "Yes. Thermal input and photobiomodulation both have evidence for reducing musculoskeletal pain. This should be used as a supportive tool, not a replacement for medical assessment of underlying causes." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable improvement within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Red Light · Tissue", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+red+light+muscle+recovery+fatigue+exercise" },
  { technology: "Far-Infrared Belt · Circulation", studyTitle: "Far-Infrared Therapy for Waist Circumference Reduction", journal: "European Journal of Preventive Cardiology, 2012", url: "https://scholar.google.com/scholar?q=far+infrared+waist+belt+circulation+blood+flow+tissue" },
  { technology: "Combined Wavelength", studyTitle: "Photobiomodulation with Combined 660 and 850nm Wavelengths", journal: "Lasers in Medical Science, 2018", url: "https://scholar.google.com/scholar?q=photobiomodulation+660nm+850nm+combined+wavelength+additive" },
  { technology: "Low Back Pain · Heat", studyTitle: "Effect of Heat Wraps on Low Back Pain Patients", journal: "Spine, 2002", url: "https://scholar.google.com/scholar?q=heat+wrap+low+back+pain+circulation+muscle+recovery" },
 ],
 contraindications: [
  "You are pregnant",
  "You are on photosensitising medication",
  "You have active burns, wounds, or acute inflammation at the application site",
  "Do not apply directly over implanted devices or metal hardware",
 ],
 normalSensations: [
  "Progressive warmth at the belt contact zone, expected",
  "No sensation from the light itself, cellular effect is not felt",
  "Mild sweating with prolonged use at high temperature, normal",
 ],
 sessionInfo: "Session time: 20–30 minutes · Frequency: 4–5× per week · Pre-training: thermal only · Post-training: thermal + LED",
 forYouIf: [
  "You want a wearable red light and thermal protocol for a specific body area",
  "You're targeting lower back, abdominal, or hip recovery and want wearable daily input",
  "You want to run the protocol while moving, walking, stretching, or during light activity",
  "You need both photobiomodulation and thermal input in one wearable format",
  "You've used stationary red light panels and want to add a targeted wearable format for specific zones",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Initial response", body: "The 360-node infrared array delivers immediate thermal and photon input to the contact zone. Circulation improvement and tissue warmth are felt and measurable from session one." },
  { week: "Week 2–3", heading: "Photon accumulation", body: "Red light dosing compounds with consistent use. Tissue quality at the belt contact zone begins to improve. Recovery metrics in the targeted area shift." },
  { week: "Week 4+", heading: "Protocol integrated", body: "The belt becomes a standard recovery input. The combination of thermal and photobiomodulation produces structural improvement in the target zone that neither mechanism alone provides." },
 ],
 techSectionTitle: "360 LEDs. Two mechanisms.",
 valueAnchor: "Clinic red light + heat session: €50–€90 each. Thermal Zone: €198. Daily.",
 guaranteeName: "30-Day Protocol Guarantee",
 guaranteeDesc: "Use the Thermal Zone daily for 30 days. If recovery or tissue comfort has not noticeably shifted, return it. Full refund. We cover return shipping.",
 bonusStack: [
  { title: "The Combination Protocol Guide", desc: "When thermal alone, when red light alone, when both. Calibration for specific recovery scenarios.", value: "€19" },
  { title: "660nm + Heat Science Primer", desc: "Why dual mechanism outperforms either alone for targeted recovery. PubMed citations.", value: "€17" },
  { title: "Body Stack Mapping", desc: "Which body devices layer with the Thermal Zone for compounding recovery effect.", value: "€14" },
 ],
};

// ─── THERMAL ZONE LITE (targeted joint wrap) ───
const thermalZoneLiteConfig: ProductConfig = {
 handle: "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad",
 name: "Thermal Zone Lite",
 subheadline: "Thermal Wrap. Single Joint.",
 benefits: [
  { icon: ThermometerSun, label: "USB 12W at 35–55°C" },
  { icon: Focus, label: "Single Joint Target" },
  { icon: Heart, label: "Circulation + Inflammation" },
  { icon: Activity, label: "3-Minute Warm-Up Time" },
 ],
 testimonials: [
  { name: "Seb, 33", text: "My knee every morning before running. The warm-up time went from 20 minutes to five. The data says the same." },
  { name: "Marjolein, 46", text: "Shoulder has been stiff for two years. Three weeks of daily morning heat and I stopped mentioning it to my physio." },
  { name: "Arjun, 39", text: "Compact. USB. Goes with me everywhere. My chronic wrist issue is manageable now." },
 ],
 problemReframe: {
  headline: "One Chronic Area. Fifteen Minutes. Every Day.",
  paragraphs: [
   "Thermal Zone covers a body panel. Thermal Zone Lite covers one joint. For recurring tension in a single area, a knee that stiffens overnight, a shoulder that's never quite ready, a wrist that accumulates load across a workday, targeted daily thermal input is the protocol.",
   "USB power at 12W. Reaches 35°C in under 3 minutes. Stays at operating temperature for as long as the session runs. Lightweight wrap closure. This is not equipment, it's a daily input that takes less time to apply than to think about.",
  ],
  closing: "Fifteen minutes, every morning, before the joint takes load.",
 },
 techCards: [
  { icon: ThermometerSun, title: "12W USB Thermal", desc: "USB powered at 12W. Reaches operating temperature in under 3 minutes. Temperature range 35–55°C. Runs from any USB power source, laptop, adapter, power bank." },
  { icon: Focus, title: "Adjustable Wrap Closure", desc: "Fits knee, shoulder, wrist, elbow, ankle. Adjustable velcro closure maintains snug contact with the joint area. Lightweight construction, under 350g for the wrap and cord." },
  { icon: Heart, title: "Thermal Circulation Mechanism", desc: "Heat at 35–55°C causes local vasodilation, increasing capillary blood flow to connective tissue. Improved circulation delivers nutrients and clears inflammatory markers from the joint capsule, tendon, and surrounding fascia." },
  { icon: Activity, title: "Pre-Training or Recovery", desc: "Pre-training: 10–15 minutes at 45°C to prepare the joint before loading. Post-training: 15–20 minutes at 45–55°C to support recovery and clearance. Daily morning use for chronic stiffness." },
 ],
 ritualSteps: [
  { step: "01", title: "Wrap", desc: "Position the Thermal Zone Lite over the target joint. Secure the velcro closure, firm contact without compression." },
  { step: "02", title: "Heat", desc: "Power on. Reaches operating temperature in 3 minutes. Select your protocol: 15 minutes pre-training, or 20 minutes recovery." },
  { step: "03", title: "Daily", desc: "For chronic joint stiffness: apply every morning before the joint takes weight or load. Consistency changes the baseline. Weekly use manages symptoms; daily use reduces them." },
 ],
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: recoveryComparison,
 faqs: [
  { q: "Which joints can I use it on?", a: "Knee, shoulder, wrist, elbow, ankle, and lower back. The adjustable closure fits most adult joint sizes." },
  { q: "How long per session?", a: "10–15 minutes for pre-training preparation. 15–20 minutes for post-training recovery. For daily morning use: 15 minutes before loading the joint." },
  { q: "Is 55°C safe on a joint?", a: "Yes, at appropriate application time. The thermal wrap applies heat through the skin surface; joint capsule temperature rises less dramatically than surface temperature. If 55°C feels too warm, reduce to 45°C." },
  { q: "Can I use it at my desk?", a: "Yes. USB power and lightweight construction make it practical for desk use on knees, wrists, or elbows during work." },
  { q: "How is this different from a hot water bottle?", a: "Consistent calibrated temperature (not cooling progressively like a water bottle), USB reusability, targeted wrap format for specific joints, and portability. Hot water bottles drop temperature within 20 minutes; the Thermal Zone Lite maintains set temperature for the full session." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Full refund if you don't notice measurable improvement in joint stiffness or recovery within 30 days of consistent use." },
 ],
 studyCards: [
  { technology: "Heat · Joints", studyTitle: "Superficial Heat or Cold for Low Back Pain", journal: "Cochrane Review, 2006", url: "https://scholar.google.com/scholar?q=heat+therapy+joint+stiffness+connective+tissue+blood+flow" },
  { technology: "Thermal · Connective Tissue", studyTitle: "The Effect of Local Heat on Tendon Healing and Repair", journal: "Journal of Orthopaedic Research, 2004", url: "https://scholar.google.com/scholar?q=local+heat+tendon+connective+tissue+healing+blood+flow" },
  { technology: "Knee · Heat Protocol", studyTitle: "Efficacy of Continuous Low-Level Heat Wrap Therapy for Treating Knee Osteoarthritis", journal: "Physical Therapy, 2004", url: "https://scholar.google.com/scholar?q=continuous+heat+wrap+knee+osteoarthritis+pain+stiffness+therapy" },
  { technology: "Daily Thermal · Chronic Pain", studyTitle: "Repeated Thermal Treatment in Chronic Musculoskeletal Conditions", journal: "Pain Medicine, 2015", url: "https://scholar.google.com/scholar?q=repeated+heat+therapy+chronic+musculoskeletal+pain+joint+inflammation" },
 ],
 contraindications: [
  "Active inflammation, acute injury, or burns at the application site",
  "Sensory neuropathy in the application area",
  "Vascular disease at the application site, consult physician before use",
  "Do not apply over implanted devices or metal hardware in the joint",
 ],
 normalSensations: [
  "Progressive warmth during the session, expected",
  "Mild redness of skin after removal, increased circulation, fades within 20 minutes",
  "Joint feels 'looser' immediately after, the thermal preparation mechanism",
 ],
 sessionInfo: "Session time: 15–20 minutes · Temperature: 35–55°C · USB 12W · Warm-up: 3 minutes · Daily use for chronic stiffness",
 forYouIf: [
  "You have a single joint, knee, shoulder, or wrist, that needs consistent targeted daily thermal input",
  "You want targeted heat without a full-body format or bulk",
  "You spend time at a desk and want a USB-powered joint-specific protocol that runs while you work",
  "Your joint stiffness is predictable: same area, every morning, before it takes load",
  "You've used heat for joint management and want a more precise, calibrated and consistent version",
 ],
 mechanismTimeline: [
  { week: "Days 1–7", heading: "Circulation activation", body: "Targeted thermal input to the joint area increases local blood flow from the first session. Morning stiffness typically reduces within the first week of daily pre-loading application." },
  { week: "Week 2–3", heading: "Connective tissue response", body: "Daily heat prepares the joint's connective tissue before loading. Warm-up time decreases. The joint moves differently after consistent daily input, less resistance, less compensatory tension." },
  { week: "Week 4+", heading: "Baseline improvement", body: "Chronic stiffness that accumulated over months begins to reduce. Resting mobility improves and accumulated tension between sessions decreases measurably." },
 ],
 techSectionTitle: "One joint. Daily protocol.",
 problemImage: problemThermalZoneLite,
};

// ─── FREQUENCY REST (white noise sleep machine) ───
const frequencyRestConfig: ProductConfig = {
 handle: "white-noise-sleep-aid-machine",
 name: "Frequency Rest",
 subheadline: "Acoustic Masking. Sleep Onset Protocol.",
 benefits: [
  { icon: Waves, label: "20 Ambient Sound Modes" },
  { icon: Brain, label: "Sleep Latency Reduction" },
  { icon: Heart, label: "HRV & Recovery Support" },
  { icon: CircleDot, label: "USB · 110mm Compact Form" },
 ],
 testimonials: [
  { name: "Lena, 34", text: "I've tried everything for city apartment noise. This is the first thing that actually changes the room. I'm asleep 20 minutes faster, I tracked it." },
  { name: "Daan, 41", text: "Two months in. My deep sleep percentage went from 14% to 22% on my tracker. The consistent acoustic environment is the variable I changed." },
  { name: "Sofía, 29", text: "Travel changed completely. Same sound every hotel room. My body doesn't know the difference anymore between home and anywhere else." },
 ],
 problemReframe: {
  headline: "Your Nervous System Monitors Sound While You Sleep.",
  paragraphs: [
   "The auditory cortex remains partially active throughout sleep, particularly in light sleep and the transitions between cycles. Any novel sound above your ambient baseline can trigger a micro-arousal: a brief cortisol spike, a shift in sleep stage, a reduction in slow-wave depth. You don't need to fully wake up for this to degrade your sleep quality.",
   "White noise doesn't silence your environment. It raises the acoustic floor, the consistent baseline against which your auditory system evaluates threat. When the baseline is consistent, novel sounds produce less signal contrast. Less contrast means fewer micro-arousals, more time in deep sleep stages, and more complete overnight recovery.",
   "Frequency Rest delivers 20 ambient sound modes, broadband white noise, pink noise, brown noise, rainfall, ocean, from a 110mm compact unit. USB powered. No subscription. No phone screen. No blue light exposure at the moment your melatonin should peak.",
  ],
  closing: "Same sound. Every night. Consistent acoustic environment for consistent sleep.",
 },
 techCards: [
  { icon: Waves, title: "Broadband Acoustic Masking", desc: "White noise distributes sound energy across all audible frequencies equally. Pink noise weights lower frequencies for a warmer profile. Brown noise emphasises bass, associated with deeper perceived relaxation in several sleep studies. 20 modes across all three noise types plus natural soundscapes." },
  { icon: Brain, title: "Micro-Arousal Suppression", desc: "The auditory system evaluates novel sounds against the ambient acoustic baseline. Consistent broadband masking raises that baseline, reducing signal contrast for transient sounds, traffic, voices, building noise. Fewer micro-arousals means more unbroken sleep cycles and more time in slow-wave and REM stages." },
  { icon: Heart, title: "HRV & Autonomic Regulation", desc: "Sleep quality and heart rate variability are directly linked. Fragmented sleep suppresses parasympathetic recovery overnight, reducing next-day HRV. Consistent acoustic environments support deeper sleep stages where autonomic recovery happens, measurable on any HRV-capable tracker." },
  { icon: CircleDot, title: "Compact. USB. Always On.", desc: "110 × 110 × 62mm. USB powered from any adapter or power bank. No Wi-Fi, no app, no notification risk. Volume dial, mode button, and optional timer, that's the entire interface. Travel-ready. Works in any acoustic environment." },
 ],
 ritualSteps: [
  { step: "01", title: "Place", desc: "Position Frequency Rest 1–2 metres from your bed, on a nightstand or floor. Distance determines volume and dispersion. Start at 30–40% volume: ambient enough to mask, not loud enough to become the sound you notice." },
  { step: "02", title: "Select", desc: "Choose your mode. White noise for broad masking. Pink noise for a warmer profile. Brown noise if you prefer deep bass-weighted ambience. Natural soundscapes if you respond better to biophilic acoustic environments." },
  { step: "03", title: "Commit", desc: "Run it every night. Acoustic conditioning works through consistency, your nervous system learns to associate the sound with sleep. Within two weeks, the sound itself becomes a sleep onset trigger. Silence becomes the exception." },
 ],
 problemImage: problemEyeActivator,
 fallbackImage: problemEyeActivator,
 beforeAfter: { before: before3Img, after: after3Img },
 comparisonRows: [
  { feature: "Cost over 6 months", zential: "One-time investment", clinic: "N/A", creams: "€120+ (app subscription)", generic: "€10–€20 (earplugs, repeated)" },
  { feature: "Acoustic masking quality", zential: true, clinic: false, creams: false, generic: false },
  { feature: "No blue light exposure", zential: true, clinic: true, creams: false, generic: true },
  { feature: "HRV & sleep cycle support", zential: true, clinic: true, creams: false, generic: false },
  { feature: "Travel-ready", zential: true, clinic: false, creams: true, generic: true },
  { feature: "No app or subscription", zential: true, clinic: false, creams: false, generic: true },
 ],
 faqs: [
  { q: "What's the difference between white, pink, and brown noise?", a: "White noise distributes energy equally across all frequencies, the broadest masking profile. Pink noise has equal energy per octave, with a warmer, lower-weighted sound. Brown noise emphasises the bass end further, often described as a deep rumble or heavy rainfall. Most people find pink or brown noise more comfortable for sleep; white noise has the strongest masking effect for high-frequency sounds like voices." },
  { q: "How loud should I run it?", a: "Start at 30–40% volume, roughly 50–60 dB at arm's length. Loud enough to mask transient sounds, quiet enough that you don't consciously register it. The goal is for the sound to become background, not foreground. After two weeks of consistent use, you may find lower volume is sufficient as the acoustic conditioning takes effect." },
  { q: "Will I become dependent on it?", a: "Acoustic conditioning is not dependency in a neurological sense, your nervous system learns to associate consistent inputs with sleep, which is the mechanism behind any good sleep ritual. If you travel without it, re-adaptation takes 2–3 nights. Most people consider this a worthwhile trade for the consistent sleep quality they gain." },
  { q: "My partner doesn't like it, what do I do?", a: "Start with pink or brown noise, both are more universally accepted than white noise due to their warmer, less 'static' character. Lower volume than you think necessary. Most people who resist white noise are convinced after 5–7 nights." },
  { q: "Can I use it for babies or children?", a: "White noise for infant sleep is one of the most well-documented acoustic interventions in sleep science. For infants, keep the unit further from the cot and volume below 50 dB. Consult your paediatrician if you have specific questions about your child's needs." },
  { q: "What is your guarantee?", a: "30-Day Ritual Guarantee. Track your sleep for 30 nights with consistent use. If you don't see measurable improvement in sleep onset or continuity, full refund, no conditions." },
 ],
 studyCards: [
  { technology: "White Noise · Sleep Onset", studyTitle: "White Noise and Sleep Induction", journal: "A & A Case Reports, 2016", url: "https://scholar.google.com/scholar?q=white+noise+sleep+onset+latency+reduction" },
  { technology: "Acoustic Masking · Micro-Arousals", studyTitle: "Effect of Continuous Background White Noise on Nocturnal Arousals", journal: "Sleep Medicine, 2005", url: "https://scholar.google.com/scholar?q=white+noise+nocturnal+micro+arousal+suppression+sleep+quality" },
  { technology: "Pink Noise · Slow-Wave Sleep", studyTitle: "Pink Noise to Enhance Slow Oscillations and Slow-Wave Sleep", journal: "Frontiers in Human Neuroscience, 2017", url: "https://scholar.google.com/scholar?q=pink+noise+slow+wave+sleep+enhancement+deep+sleep" },
  { technology: "HRV · Sleep Quality", studyTitle: "Heart Rate Variability as a Biomarker of Sleep Quality", journal: "Sleep Medicine Reviews, 2019", url: "https://scholar.google.com/scholar?q=heart+rate+variability+sleep+quality+biomarker+autonomic" },
 ],
 contraindications: [
  "Do not use at high volume in confined spaces with infants, maintain safe SPL levels",
  "Individuals with hyperacusis (sound sensitivity disorder) should consult an audiologist before use",
  "Not a substitute for clinical evaluation of chronic insomnia or sleep disorders",
 ],
 normalSensations: [
  "Initial awareness of the sound, fades within 5–10 minutes as attention habituates",
  "Slightly earlier sleep onset in the first week, the novelty effect is real and temporary",
  "Mild disorientation on first nights without it, normal re-adaptation to ambient environment",
 ],
 sessionInfo: "Run nightly from lights-out until wake time · Volume: 50–60 dB at arm's length · Mode: pink or brown noise recommended for first-time users",
 forYouIf: [
  "You live in a city, apartment building, or shared space with unpredictable ambient noise",
  "You track sleep and want to reduce micro-arousals and improve deep sleep percentage",
  "You travel frequently and want a consistent acoustic environment in any location",
  "You take more than 20 minutes to fall asleep and have ruled out other causes",
  "You wake frequently in the night and suspect environmental sound is the trigger",
 ],
 mechanismTimeline: [
  { week: "Nights 1–3", heading: "Novelty phase", body: "You will be aware of the sound. This is expected. The auditory system is still evaluating it as a stimulus. Sleep onset may not improve significantly in the first three nights." },
  { week: "Week 1–2", heading: "Habituation", body: "The auditory cortex begins treating the consistent signal as non-novel background. Micro-arousal frequency decreases. Sleep onset typically shortens. If you track sleep, you may begin to see improvements in sleep efficiency and deep sleep percentage." },
  { week: "Week 3+", heading: "Acoustic conditioning", body: "The sound becomes a sleep onset cue in its own right. The nervous system begins associating the acoustic environment with sleep, similar to the mechanism behind other consistent pre-sleep rituals. Remove it, and you'll notice its absence. That's the protocol working." },
 ],
 techSectionTitle: "One signal. Consistent acoustic floor.",
};

// Register all new configs
Object.assign(productConfigs, {
 "breath-seal": breathSealConfig,
 "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers": depthMaskConfig,
 "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": fluxPanelConfig,
 "household-red-light-charging-vibrating-red-light-therapy-mat": frequencyMatPlusConfig,
 "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": pressureShellConfig,
 "electric-foam-roller-muscle-relaxation-fitness-yoga-column": pulseRollerConfig,
 "gravity-quilt-cotton-weighted-blanket": restShellConfig,
 "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow": restoreMatConfig,
 "led-beauty-lamp-red-light-therapy-lamp-desktop-stand": ritualLightProConfig,
 "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": thermalZoneLiteConfig,
 "portable-home-use-charging-red-light-therapy-blanket-far-infrared": thermalShellConfig,
 "household-full-body-moisture-removing-infrared-sauna-blanket": thermalShellLiteConfig,
 "null-1777641441133": thermalZoneConfig,
 "red-light-therapy-belt-infrared-hot-compress-phototherapy": thermalPadConfig,
 "white-noise-sleep-aid-machine": frequencyRestConfig,
});

export function getProductConfig(handle: string): ProductConfig | null {
 return productConfigs[handle] || null;
}
