import { Sparkles, Flame, Heart, Brain, Sun, Zap, Waves, ThermometerSun, Eye, Gauge, Focus, CircleDot, ShieldCheck, Droplets, ScanFace, Vibrate, Radio, Gem, Aperture, Activity, Beaker, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import before2Img from "@/assets/before2.jpg";
import after2Img from "@/assets/after2.jpg";
import before3Img from "@/assets/before3.jpg";
import after3Img from "@/assets/after3.jpg";

import problemFaceIntroducer from "@/assets/problem-face-introducer.png";
import problemFramePulse from "@/assets/problem-frame-pulse.png";
import problemGuasha from "@/assets/problem-guasha.png";
import problemSkinpulse from "@/assets/problem-skinpulse.png";
import problemEyeActivator from "@/assets/problem-eye-activator.png";
import problemFrequencyWand from "@/assets/problem-frequency-wand.png";
import problemSculptWand from "@/assets/problem-sculpt-wand.png";

export interface ProductConfig {
  handle: string;
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
  beforeAfter: { before: string; after: string };
  comparisonRows: { feature: string; zential: string | boolean; clinic: string | boolean; creams: string | boolean; generic: string | boolean }[];
  faqs: { q: string; a: string }[];
}

const defaultComparison = [
  { feature: "Cost over 6 months", zential: "One-time investment", clinic: "€1,200+", creams: "€300+", generic: "€40–€60" },
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
  },

  // ─── LIFTING & TIGHTENING FACE INTRODUCER ───
  "lifting-and-tightening-face-introducer": {
    handle: "lifting-and-tightening-face-introducer",
    name: "Face Introducer",
    subheadline: "Multi-Frequency Facial Sculptor for Visible Definition",
    benefits: [
      { icon: ScanFace, label: "Deep Facial Sculpting" },
      { icon: Zap, label: "Multi-Frequency EMS" },
      { icon: Sun, label: "LED Light Therapy" },
      { icon: Droplets, label: "Serum Infusion Mode" },
    ],
    testimonials: [
      { name: "Lina, 29", text: "My cheekbones look more defined after just two weeks. I look rested without filler." },
      { name: "Diane, 41", text: "The tightening effect after each session is real. My morning ritual changed completely." },
      { name: "Priya, 35", text: "I returned my clinic membership. This does what I was paying hundreds for." },
    ],
    problemReframe: {
      headline: "Your Definition Is Muscular. Not Cosmetic.",
      paragraphs: [
        "The contour of your face isn't shaped by what you apply on top. It's shaped by the tone of 43 facial muscles, the density of collagen fibers, and the flow of lymphatic circulation underneath.",
        "When these systems slow down, definition fades. Not because of age alone, but because of disuse. Muscles that aren't stimulated lose their structure, just like any other muscle in your body.",
        "The Face Introducer delivers multi-frequency stimulation directly to the areas that matter: jawline, cheekbones, forehead. It retrains your facial architecture from beneath the surface.",
      ],
      closing: "Structure isn't about vanity. It's about activating what's already yours.",
    },
    techCards: [
      { icon: Zap, title: "EMS Sculpting", desc: "Multi-frequency electrical muscle stimulation targets deep facial muscles for visible contouring and lift." },
      { icon: Sun, title: "LED Therapy", desc: "Red and infrared light wavelengths stimulate collagen synthesis and reduce visible signs of fatigue." },
      { icon: Vibrate, title: "Sonic Vibration", desc: "High-frequency vibration enhances product absorption and promotes microcirculation in the skin." },
      { icon: Droplets, title: "Ion Infusion", desc: "Ionic technology drives active ingredients deeper into the skin for enhanced efficacy of your serums." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse and apply conductive serum. Select your preferred intensity mode." },
      { step: "02", title: "Activate", desc: "Glide the device along your jawline, cheekbones, and forehead using upward strokes. 5 minutes." },
      { step: "03", title: "Repeat", desc: "Complete your ritual daily. Consistency builds the definition that one session cannot." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemFaceIntroducer,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
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
  },

  // ─── FREQUENCY WAND ───
  "color-light-import-micro-current-vibration-massager": {
    handle: "color-light-import-micro-current-vibration-massager",
    name: "Frequency Wand",
    subheadline: "High-Frequency Skin Purifier and Collagen Activator",
    benefits: [
      { icon: Radio, label: "High-Frequency Therapy" },
      { icon: ShieldCheck, label: "Antibacterial Action" },
      { icon: Flame, label: "Collagen Stimulation" },
      { icon: Gauge, label: "Adjustable Intensity" },
    ],
    testimonials: [
      { name: "Nina, 27", text: "My breakouts calmed down within a week. This wand is the missing step in my skincare." },
      { name: "Sophie, 34", text: "The tingling sensation is addictive. My skin texture has never been this smooth." },
      { name: "Jordan, 31", text: "I use it before every serum application. Absorption is completely different now." },
    ],
    problemReframe: {
      headline: "Your Skin Is Electrical. Not Just Chemical.",
      paragraphs: [
        "Skin health isn't only about what you apply. Your skin is an electrical organ. Cellular turnover, collagen production, and immune response are all driven by bioelectrical signals.",
        "When those signals weaken, skin becomes dull, congested, and slow to heal. No serum can replace the electrical frequency your cells need to regenerate.",
        "The Frequency Wand delivers calibrated high-frequency current that oxygenates tissue, eliminates bacteria, and primes your skin for maximum product absorption.",
      ],
      closing: "This is about activating your skin's intelligence, not overloading it with products.",
    },
    techCards: [
      { icon: Radio, title: "High Frequency", desc: "Oscillating current generates oxygen molecules that purify and stimulate cellular renewal." },
      { icon: ShieldCheck, title: "Antibacterial", desc: "Destroys acne-causing bacteria on contact through gentle electrical sterilization." },
      { icon: Flame, title: "Collagen Boost", desc: "Thermal energy from high-frequency current stimulates fibroblast activity for firmer skin." },
      { icon: Aperture, title: "Multi-Mode", desc: "Multiple treatment modes target different skin concerns from congestion to aging." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse skin thoroughly. Select your treatment mode based on your skin concern." },
      { step: "02", title: "Activate", desc: "Glide the wand across your skin in circular motions. Start at low intensity. 5 minutes." },
      { step: "03", title: "Repeat", desc: "Follow with your serum immediately after treatment. Use 3 to 5 times per week for optimal results." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemFrequencyWand,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
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
  },

  // ─── SKIN PULSE ───
  "electric-micro-current": {
    handle: "electric-micro-current",
    name: "Skin Pulse",
    subheadline: "Multi-Modal Skin Rejuvenation System",
    benefits: [
      { icon: Activity, label: "Pulsed Micro-Stimulation" },
      { icon: Sun, label: "LED Color Therapy" },
      { icon: Droplets, label: "Deep Product Infusion" },
      { icon: Focus, label: "Targeted Treatment Zones" },
    ],
    testimonials: [
      { name: "Lisa, 37", text: "My skin literally glows after each session. Friends keep asking what changed." },
      { name: "Naomi, 44", text: "The pulsing sensation is calming. My evening ritual now includes this and nothing else." },
      { name: "Vera, 31", text: "I was skeptical until week two. Now my texture is smoother than it's been in a decade." },
    ],
    problemReframe: {
      headline: "Your Skin Is Responsive. Not Passive.",
      paragraphs: [
        "Your skin doesn't just absorb what you put on it. It responds to signals: light, current, vibration, and temperature. These signals trigger cellular processes that products alone cannot.",
        "When skin cells receive the right frequency of stimulation, they accelerate collagen production, improve barrier function, and increase turnover. Without stimulation, they plateau.",
        "Skin Pulse delivers calibrated multi-modal stimulation that wakes up dormant cellular pathways, turning your daily skincare into an active treatment session.",
      ],
      closing: "Stop applying. Start activating.",
    },
    techCards: [
      { icon: Activity, title: "Pulse Mode", desc: "Rhythmic micro-stimulation activates cellular renewal cycles and improves skin elasticity over time." },
      { icon: Sun, title: "LED Spectrum", desc: "Multiple light wavelengths target different skin concerns from redness to fine lines to texture." },
      { icon: Droplets, title: "Ion Drive", desc: "Ionic infusion technology pushes active ingredients past the skin barrier for deeper efficacy." },
      { icon: Vibrate, title: "Micro-Vibration", desc: "High-frequency vibration stimulates blood flow and enhances the natural desquamation process." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Cleanse and apply your treatment serum. Select the appropriate LED mode for your concern." },
      { step: "02", title: "Activate", desc: "Press the device gently against the skin. Glide across each zone for 60 seconds. Total: 5 minutes." },
      { step: "03", title: "Repeat", desc: "Use daily, morning or evening. Your skin's response compounds with consistency." },
    ],
    beforeAfter: { before: before3Img, after: after3Img },
    problemImage: problemSkinpulse,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
  },

  // ─── SCULPT WAND ───
  "facial-beauty-tools-and-ems-beauty-equipment": {
    handle: "facial-beauty-tools-and-ems-beauty-equipment",
    name: "Sculpt Wand",
    subheadline: "Precision Facial Contouring with EMS Technology",
    benefits: [
      { icon: ScanFace, label: "Precision Contouring" },
      { icon: Zap, label: "Targeted EMS" },
      { icon: Waves, label: "Lymphatic Support" },
      { icon: Gauge, label: "Variable Intensity" },
    ],
    testimonials: [
      { name: "Annika, 34", text: "The wand reaches areas my other device couldn't. My nasolabial folds look softer." },
      { name: "Fatima, 39", text: "Precise enough for around the mouth. Powerful enough for the jawline. Perfect balance." },
      { name: "Camille, 26", text: "I use it while watching TV. Five minutes and my face feels tighter every single time." },
    ],
    problemReframe: {
      headline: "Your Contour Is Muscular. Not Makeup.",
      paragraphs: [
        "The sharp angles of your cheekbones, the definition of your jawline, the lift of your brow. These aren't cosmetic effects. They're the result of toned facial muscles and firm connective tissue.",
        "Contouring makeup creates an illusion. But true facial definition comes from within: muscles that hold their shape, fascia that supports structure, and skin that sits taut over bone.",
        "Sculpt Wand delivers precision EMS exactly where definition matters most, training facial muscles to hold their natural contour through consistent daily activation.",
      ],
      closing: "Real contour doesn't wash off.",
    },
    techCards: [
      { icon: Zap, title: "EMS Current", desc: "Calibrated electrical muscle stimulation targets specific facial muscles for precise toning and lift." },
      { icon: CircleDot, title: "Precision Tip", desc: "Narrow applicator reaches detailed areas like nasolabial folds, lip lines, and brow arches." },
      { icon: Waves, title: "Pulse Mode", desc: "Rhythmic pulsation encourages lymphatic movement and reduces facial fluid retention." },
      { icon: ThermometerSun, title: "Gentle Heat", desc: "Mild thermal energy relaxes muscle tension and prepares tissue for deeper current penetration." },
    ],
    ritualSteps: [
      { step: "01", title: "Prepare", desc: "Apply conductive gel to the treatment area. Power on and select your intensity level." },
      { step: "02", title: "Activate", desc: "Trace the wand along your jawline, cheekbones, and brow line using slow, upward strokes. 5 minutes." },
      { step: "03", title: "Repeat", desc: "Daily use builds cumulative tone. Each session reinforces the structure of the last." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemSculptWand,
    comparisonRows: defaultComparison,
    faqs: defaultDeviceFaqs,
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
};

export function getProductConfig(handle: string): ProductConfig | null {
  return productConfigs[handle] || null;
}
