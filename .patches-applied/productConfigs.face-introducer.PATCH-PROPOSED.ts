// PROPOSED PATCH for productConfigs.ts Face Introducer entry (lines 177–261)
// Built 2026-05-26 by autonomous block to fix compliance drift
// Replace the existing "lifting-and-tightening-face-introducer" block with this version
// DO NOT apply directly — Miguel reviews, copy-pastes, builds, deploys

// CHANGES from original:
// - Removed all clinical-wavelength claims (630-660nm, 415nm) attached to Face Introducer
// - Reframed Blue/Red/Purple light modes as "Cosmetic LED" not "phototherapy"
// - Removed Red Light 630-660nm PubMed study (moved citation to Frame Pulse / Flux Panel)
// - Kept iontophoresis + EMS-ATP study (those mechanisms are real, supported, allowed for FI)
// - Per knowledge/products/modality-naming-standard.md canonical FI modality language
// - "Phototherapy with Blue/Red Light" study cited generic, not as Face Introducer evidence

  "lifting-and-tightening-face-introducer": {
    handle: "lifting-and-tightening-face-introducer",
    fallbackImage: productFaceIntroducer,
    name: "Face Introducer",
    subheadline: "4-Modality Daily Protocol: EMS · Microcurrent · Thermal (45°C) · Cosmetic LED · Ion Cleansing",
    benefits: [
      { icon: Zap, label: "EMS Microcurrent — ATP + Muscle" },
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
        "Most skincare works on the surface. The Face Introducer addresses four mechanisms in one sequential protocol — each with a specific role, each building on the last.",
        "EMS (Mode 4) releases intermittent microcurrent pulses that stimulate ATP production and support facial muscle fiber elasticity. 45°C constant thermal softens tissue and supports absorption throughout every mode. Positive and negative ions cleanse the follicle and then drive actives past the skin barrier — the same galvanic mechanism used in professional facials.",
        "Cosmetic LED (Modes 1–3, Blue · Red · Purple spectra) adds the visible-light component of the daily ritual. For confirmed clinical wavelength outputs at 630–660nm and 660+850nm — see Frame Pulse and Flux Panel.",
      ],
      closing: "EMS. Microcurrent. Thermal. Cosmetic LED. In that order.",
    },
    techCards: [
      { icon: Zap, title: "EMS — Mode 4", desc: "Releases intermittent microcurrent pulses that stimulate ATP production in facial muscle tissue. Supports facial muscle fiber elasticity. Operates current-only — no light component." },
      { icon: ScanFace, title: "Positive & Negative Ions", desc: "Negative ion output attracts and lifts positively charged impurities from the follicle — electrical cleansing, no abrasion, barrier intact. Polarity reverses to drive positively charged actives past the barrier via galvanic gradient. Same class of technology used in professional spa facials." },
      { icon: ThermometerSun, title: "45°C Thermal + Sonic", desc: "Constant 45°C hot compress softens tissue and supports ingredient absorption throughout every mode. Sonic vibration supports lymphatic drainage and product penetration. Both are always-on — not mode-dependent." },
      { icon: Sun, title: "Cosmetic LED — Mode 1 (Blue)", desc: "Soft visible-spectrum blue LED component of the daily ritual. Supports the morning protocol sequence. For confirmed clinical wavelength claims, see Frame Pulse and Flux Panel." },
      { icon: Sun, title: "Cosmetic LED — Mode 2 (Red)", desc: "Soft visible-spectrum red LED component of the daily protocol. Supports the visible-light step of the ritual. For confirmed 630–660nm clinical red light, see Frame Pulse." },
      { icon: Aperture, title: "Cosmetic LED — Mode 3 (Purple)", desc: "Combined blue+red LED for the daily ritual stack. Visible-spectrum only." },
    ],
    ritualSteps: [
      { step: "01", title: "Cleanse", desc: "Ion cleansing mode — 2 minutes across full face. No serum yet. Let negative ions lift surface buildup first." },
      { step: "02", title: "Stimulate", desc: "Select EMS for muscle tone, or one of the three cosmetic LED modes (Blue, Red, Purple) for the daily ritual visible-light component. 3–5 minutes. The 45°C thermal is active throughout." },
      { step: "03", title: "Deliver", desc: "Apply serum. Positive ion mode drives actives through the barrier. Total protocol: under 10 minutes. 3–5× per week." },
    ],
    beforeAfter: { before: beforeImg, after: afterImg },
    problemImage: problemFaceIntroducer,
    comparisonRows: defaultComparison,
    forYouIf: [
      "You book professional facials but want the same galvanic technology at home, on your own schedule.",
      "You've tried serums and creams that absorb inconsistently — you want to understand the mechanism and fix it.",
      "You research before you buy. You want to understand what each mode does and why. Mechanism first.",
    ],
    faqs: [
      { q: "Does this actually work?", a: "The mechanisms in this device — EMS microcurrent, galvanic ion cleansing, iontophoretic delivery, 45°C thermal, and cosmetic LED — are each supported by peer-reviewed research. We link the actual studies on this page. What we cannot promise is the consistency you bring to it. Use it daily for 14 days before forming a conclusion." },
      { q: "How long until I see results?", a: "Improved skin absorption is measurable from the first session — the galvanic ion delivery changes how actives penetrate. Skin clarity and texture typically respond within 7 to 10 days. Firming becomes visible at 3 to 4 weeks of consistent daily use." },
      { q: "Is it safe for daily use?", a: "Yes. The Face Introducer is designed for daily 7–10 minute protocols. The 45°C thermal stays within safe tissue temperature. Galvanic cleansing is non-abrasive. EMS is calibrated at home-device intensity. Start on the lowest of the four speed settings and increase over the first week." },
      { q: "What if it doesn't work for me?", a: "30 days, daily use. If you see no visible change in skin tone, firmness, or definition, email us. Full refund — no form, no questionnaire, no restocking fee. That is the 30-Day Protocol Guarantee. We print it on the box." },
      { q: "How is this different from a clinic?", a: "One professional microcurrent session: €90–€180. Monthly clinic protocol: €220+/month, €2,640+/year. The Face Introducer uses the same class of technology — ion cleansing, EMS microcurrent, thermal, cosmetic LED — for a one-time €88 purchase. The mechanism is the same. The math is not." },
      { q: "Which mode should I use first?", a: "Start with ion cleansing (negative ion mode) every session — it clears the follicle so subsequent modes work on clean tissue. Then select EMS for firming, or one of the three cosmetic LED modes (Blue, Red, Purple) based on the daily protocol you want." },
      { q: "Is this clinical red light therapy?", a: "No. The cosmetic LED modes in the Face Introducer are visible-spectrum LED — not the clinical wavelengths (630–660nm or 660+850nm) used in photobiomodulation research. For confirmed clinical wavelength output, see Frame Pulse (630–660nm) or Flux Panel (660nm + 850nm)." },
    ],
    studyCards: [
      // Removed: Red Light 630–660nm study (moved to Frame Pulse PDP)
      // Removed: Blue Light 415nm acne study (not a claim for Face Introducer)
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
      "Mild surface tingle during ion cleansing — fully comfortable",
      "Gentle 45°C warmth throughout every mode — expected and therapeutic",
      "Faint pulse during EMS mode — confirms current delivery",
      "Subtle tingle during positive ion infusion — confirms galvanic delivery",
    ],
    sessionInfo: "Session time: 7–10 minutes · Frequency: 3–5× per week · Four intensity levels · Stop if: burning, unusual pain, or redness persisting over 30 min",
    valueAnchor: "One professional microcurrent session: €90–€180. The Face Introducer: €88. Once.",
    guaranteeName: "30-Day Protocol Guarantee",
    guaranteeDesc: "Use it daily for 30 days. If you see no visible change in skin tone, firmness, or definition, full refund. No form, no questions, no restocking fee.",
    bonusStack: [
      { title: "The Face Protocol Guide", desc: "Step-by-step ritual breakdown for all four modalities. Which order. Which serum. Which frequency.", value: "€19" },
      { title: "Modality Masterclass PDF", desc: "Mechanism explanation for each technology — so you know exactly what's happening at the cellular level.", value: "€27" },
      { title: "21-Day Progress Tracker", desc: "Week-by-week photo + observation template. The protocol without tracking is just hope.", value: "€17" },
      { title: "Serum Pairing Guide", desc: "Which actives work with each mode. What to apply before ion cleansing vs. before iontophoresis.", value: "€14" },
      { title: "Clinic Cost Calculator", desc: "A one-page breakdown: what you would have spent at the clinic in 6 months vs. this device.", value: "€12" },
    ],
  },
