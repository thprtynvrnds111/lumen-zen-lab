// PROPOSED PATCH for productConfigs.ts — 8 Zential Pure body devices
// Built 2026-05-27 from knowledge/offers/<product>-pdp-copy.md
// Matches entry shape of productConfigs.face-introducer.PATCH-PROPOSED.ts
//
// SCOPE: 8 body devices already wired into the Object.assign block at the end
// of productConfigs.ts. The variable bindings (fluxPanelConfig, etc.) ALREADY
// exist as complete configs in productConfigs.ts. This patch UPGRADES them
// with the 4 fields the Face Introducer PATCH adds and that are required for
// the PDP to render the bonus stack, guarantee, and price anchor sections:
//   - valueAnchor
//   - guaranteeName
//   - guaranteeDesc
//   - bonusStack
// Plus aligns subheadline + adds forYouIf where missing for parity.
//
// HOW TO APPLY:
// Miguel — paste each block over the corresponding existing
// `const <handle>Config: ProductConfig = { ... }` declaration in productConfigs.ts.
// Do NOT modify the Object.assign block at the bottom — those mappings stay.
//
// MODALITY VERIFIED against knowledge/products/modality-naming-standard.md:
//   Flux Panel        → Red Light Therapy 660nm + NIR 850nm    [CLINICAL]
//   Ritual Light Pro  → Red Light Therapy 660nm desktop        [CLINICAL]
//   Thermal Zone      → Red Light Therapy 660nm + NIR + Thermal[CLINICAL]
//   Frequency Mat+    → Red Light Therapy 660nm full-body mat  [CLINICAL]
//   Thermal Pad       → Red Light Therapy (8.5W, NO nm) + Thermal
//   Restore Mat       → Acupressure (6,210 points)             [MECHANICAL]
//   Pulse Roller      → Percussion · Vibration                 [MECHANICAL]
//   Pressure Shell    → Pneumatic Compression                  [PNEUMATIC]

// ─── FLUX PANEL ───
const fluxPanelConfig: ProductConfig = {
  handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
  name: "Flux Panel",
  subheadline: "Dual-Wavelength Red Light Therapy. 660nm + NIR 850nm. Surface and Depth.",
  benefits: [
    { icon: Sun, label: "660nm Red + 850nm Near-Infrared" },
    { icon: Activity, label: "Full-Body Coverage" },
    { icon: Brain, label: "Mitochondrial Activation" },
    { icon: Heart, label: "10-Minute Daily Protocol" },
  ],
  testimonials: [
    { name: "Rens, 36", text: "I had this running for 10 minutes before realising I wasn't even facing it. Had to actually read the instructions. Results from week two." },
    { name: "Jules, 42", text: "NIR at 850nm reaches muscle tissue. This isn't a face device — it's a full recovery tool." },
    { name: "Mia, 31", text: "Morning sessions before training. My baseline soreness dropped in the first two weeks." },
  ],
  problemReframe: {
    headline: "Your Mitochondria Respond to Specific Wavelengths. Most of Your Body Never Gets Them.",
    paragraphs: [
      "Photobiomodulation is wavelength-specific. Red light at 660nm stimulates cytochrome c oxidase in the mitochondrial membrane — the enzyme that drives ATP production. Near-infrared at 850nm penetrates 5–7cm below the skin surface, reaching muscle and connective tissue where the recovery work actually happens.",
      "Handheld devices treat centimetres. Panels treat the entire body. The Flux Panel delivers both wavelengths simultaneously across a full-body exposure area — the combination shown in research to produce additive effects on cellular energy production.",
      "The mechanism is photochemical, not thermal. You don't need to feel warmth for the cellular effect to occur. You need the right wavelength at the right intensity for the right duration.",
    ],
    closing: "Ten minutes. The mitochondria handle the rest.",
  },
  techCards: [
    { icon: Sun, title: "660nm Red Light", desc: "Optimal wavelength for surface tissue. Penetrates 1–2cm into skin and subcutaneous tissue. Stimulates cytochrome c oxidase, increasing ATP production in fibroblasts, keratinocytes, and surface muscle fibres. The most-studied wavelength in photobiomodulation research." },
    { icon: Activity, title: "850nm Near-Infrared", desc: "Deeper penetration at 5–7cm reaches muscle, fascia, joint capsules, and periosteum. Supports reduction of inflammatory cytokines, mitochondrial biogenesis, and blood flow in deep tissue. Used in clinical sports rehabilitation protocols." },
    { icon: Brain, title: "Dual-Wavelength Stack", desc: "660nm and 850nm applied simultaneously produce additive effects on mitochondrial function. Research shows combination protocols outperform single-wavelength protocols for both surface skin and deep tissue outcomes at equivalent session durations." },
    { icon: Heart, title: "Clinical Configuration", desc: "The 660 + 850nm dual stack is the standard clinical configuration — not a marketing combination. The same diode array a longevity clinic runs at €60–€90 per 10-minute session, calibrated for daily home use." },
  ],
  ritualSteps: [
    { step: "01", title: "Position", desc: "Stand or sit 30–50cm from the panel. Direct skin exposure is optimal for 660nm. Near-infrared at 850nm penetrates thin fabric effectively." },
    { step: "02", title: "Run Protocol", desc: "10 minutes per session. Keep eyes closed or wear protective eyewear during face-targeting sessions. For body panels, look away or close eyes." },
    { step: "03", title: "Repeat", desc: "Daily. Cellular work compounds — consistent 10-minute sessions outperform irregular longer sessions. Morning for energy, evening for recovery." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "How far away should I stand?", a: "30–50cm is the optimal distance. Closer increases intensity but reduces coverage area. Further reduces intensity below therapeutic threshold. At 30cm: full torso covered for a front-body session." },
    { q: "Should I look at the panel?", a: "No. Never look directly at the panel. Close your eyes or wear protective eyewear during any session where the face or eyes are in the treatment zone." },
    { q: "How long per session?", a: "10 minutes is the standard daily protocol. Near-infrared research shows diminishing returns beyond 20 minutes at therapeutic intensities. Consistent shorter sessions outperform irregular longer ones." },
    { q: "Does it work through clothing?", a: "850nm penetrates most thin fabrics. 660nm is absorbed by most materials. For optimal results with red light, direct skin exposure is preferred. For NIR-only sessions, thin clothing is acceptable." },
    { q: "When should I use it — before or after training?", a: "Either. Pre-training sessions warm tissue and enhance mitochondrial output. Post-training sessions support reduction of inflammatory load and recovery. Both are supported by research. Choose based on your schedule consistency." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Flux Panel daily for 30 days. If it has not earned its place in your morning, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Red Light 660nm · Mitochondria", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
    { technology: "Near-Infrared 850nm · Tissue", studyTitle: "Near-Infrared Photobiomodulation in a Cellular Model", journal: "Frontiers in Neuroscience, 2016", url: "https://scholar.google.com/scholar?q=near-infrared+850nm+photobiomodulation+tissue+penetration+muscle" },
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
    "Mild warmth at close distance — normal",
    "No sensation at standard distance — expected",
    "Brief afterglow perception if eyes are exposed momentarily — do not look at panel",
  ],
  sessionInfo: "Session time: 10 minutes · Distance: 30–50cm · Frequency: daily · Eyes closed during face-adjacent sessions",
  forYouIf: [
    "You want the full photobiomodulation protocol — not a handheld device that covers centimetres",
    "You train hard and recovery is a measurable bottleneck in your progress",
    "You're already familiar with red light therapy and want a serious full-body format",
    "You're looking for a one-time investment to replace ongoing clinic light therapy sessions",
    "You want to address skin renewal and performance recovery with the same tool",
  ],
  mechanismTimeline: [
    { week: "Week 1–2", heading: "Cellular activation", body: "Red light at 660nm begins increasing ATP production. NIR at 850nm activates deeper tissue. Skin texture and post-training muscle recovery are typically the first observable changes." },
    { week: "Week 3–4", heading: "Inflammatory reduction", body: "Consistent sessions support reduction of inflammatory load in treated tissue. Baseline soreness decreases; training sessions feel better supported from the outset." },
    { week: "Week 5+", heading: "Compounding recovery", body: "Mitochondrial density and efficiency build with continued input. The panel becomes part of the daily stack — producing structural improvement that accumulates across months." },
  ],
  techSectionTitle: "Two wavelengths. One panel.",
  valueAnchor: "A single clinic-grade red light session runs €60–€90. Twice weekly for visible change. The Flux Panel is the same dual-wavelength spectrum — 660nm and 850nm — in a 10-minute home protocol. €280 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Flux Panel daily for 30 days following the protocol. If the ritual has not earned its place in your morning, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Light Protocol Guide", desc: "The progression a clinician would walk you through if you started in-office. Week 1 distance and tolerance. Week 2 zone rotation. Week 3 compound sessions. Week 4 maintenance rhythm.", value: "€47" },
    { title: "Frequency Pairing Card", desc: "Printed card mapping the Flux Panel to the other Zential instruments. Which devices stack, which protocols compound, when to run the panel alone vs. layered with microcurrent or thermal work.", value: "€18" },
  ],
};

// ─── RITUAL LIGHT PRO ───
const ritualLightProConfig: ProductConfig = {
  handle: "led-beauty-lamp-red-light-therapy-lamp-desktop-stand",
  name: "Ritual Light Pro",
  subheadline: "Red Light Therapy. 660nm Desktop Panel. Stationary Protocol.",
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
      "Photobiomodulation at 660nm is one of the most replicated findings in non-invasive medicine. Red light activates cytochrome c oxidase in the mitochondrial membrane, increasing ATP production, supporting cellular turnover, and stimulating fibroblast activity — the pathway that supports collagen and elastin.",
      "Handheld devices work. They require you to hold them, which requires you to maintain a session actively. The proportion of people who use handheld devices consistently enough to reach the cumulative threshold for visible results is low. The barrier is not interest — it's friction.",
      "The Ritual Light Pro sits at desk distance. You sit in front of it. The session runs while you are stationary — working, reading, or doing nothing. No active maintenance. No technique. The mechanism works on the tissue while your hands are free.",
    ],
    closing: "The best protocol is the one you don't have to maintain.",
  },
  techCards: [
    { icon: Sun, title: "660nm Red Light", desc: "Optimal wavelength for surface tissue photobiomodulation. At 660nm, cytochrome c oxidase absorption is maximal — the enzyme responsible for electron transfer in the mitochondrial respiratory chain. Stimulates ATP production in fibroblasts and surface epithelial tissue." },
    { icon: Focus, title: "Desktop Stand Format", desc: "Freestanding at desk height. Position 20–30cm from face and neck. The light angle is optimised for facial incidence at seated position. No arm fatigue. No active positioning during the session." },
    { icon: Brain, title: "Photon Dose", desc: "Therapeutic photobiomodulation requires sufficient photon dose (irradiance × time). The Ritual Light Pro delivers adequate irradiance at 20–30cm distance for 10-minute sessions to meet the dosing range associated with cellular response in clinical studies." },
    { icon: Activity, title: "Clean Protocol", desc: "No app, no modes, no sequences. Turn on, sit at the correct distance, session runs 10–15 minutes. The simplicity is the product — a protocol that generates zero friction and gets used daily." },
  ],
  ritualSteps: [
    { step: "01", title: "Position", desc: "Place on desk at comfortable seated height. Sit 20–30cm away. Eyes closed or eyewear during full-face sessions. The lamp should face the target area directly." },
    { step: "02", title: "Run", desc: "Power on. 10–15 minutes per session. You can read, rest, or simply be still. The protocol requires nothing from you except proximity." },
    { step: "03", title: "Repeat", desc: "Daily. The photobiomodulation effect is cumulative — cellular ATP production, collagen support, and turnover rate develop over weeks and months of consistent input, not single sessions." },
  ],
  beforeAfter: { before: beforeImg, after: afterImg },
  comparisonRows: defaultComparison,
  faqs: [
    { q: "Should I close my eyes?", a: "Yes. Never look directly into the light. Close your eyes during full-face sessions or wear protective eyewear." },
    { q: "How close should I sit?", a: "20–30cm is optimal for the Ritual Light Pro's irradiance output. Closer increases intensity; further reduces it below therapeutic range. Sitting at normal desk distance is approximately correct." },
    { q: "How many sessions per week?", a: "Daily is optimal. The photobiomodulation mechanism responds to consistent dosing — the cumulative effect of daily 10-minute sessions outperforms sporadic 20-minute sessions." },
    { q: "Is this the same as a facial LED mask?", a: "Similar mechanism, different format. LED masks cover the full face in contact. The Ritual Light Pro delivers at-distance irradiance without contact. Research shows both formats produce cellular response — the distinction is convenience and coverage area." },
    { q: "Does the light work through a moisturiser or serum?", a: "Yes. Topical products don't meaningfully block red light wavelengths. You can run the lamp session after applying serum." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Ritual Light Pro daily for 30 days. If it has not earned a permanent spot on your desk, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Red Light 660nm · Collagen", studyTitle: "Low-Level Laser (Light) Therapy (LLLT) in Skin: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
    { technology: "Photobiomodulation · ATP", studyTitle: "Mechanisms and Mitochondrial Redox Signalling in Photobiomodulation", journal: "Photochemistry and Photobiology, 2017", url: "https://scholar.google.com/scholar?q=photobiomodulation+mitochondria+ATP+cytochrome+c+oxidase+660nm" },
    { technology: "LED Therapy · Skin", studyTitle: "Red and Near-Infrared Light Treatment: Fine Lines, Wrinkles, Skin Roughness, and Intradermal Collagen Density", journal: "Photomedicine and Laser Surgery, 2014", url: "https://scholar.google.com/scholar?q=red+light+LED+facial+collagen+fibroblast+clinical+trial+satisfaction" },
    { technology: "Compliance · Consistency", studyTitle: "Adherence to Home-Based Light Therapy Protocols", journal: "Journal of Dermatological Treatment, 2019", url: "https://scholar.google.com/scholar?q=home+red+light+therapy+adherence+consistency+outcomes" },
  ],
  contraindications: [
    "You are on photosensitising medication (tetracyclines, certain antidepressants)",
    "You have active cancer in the treatment area",
    "You have epilepsy (photosensitive)",
    "Do not look directly into the lamp",
  ],
  normalSensations: [
    "Mild warmth at close distance — normal",
    "No sensation at recommended distance — expected",
  ],
  sessionInfo: "Session time: 10–15 minutes · Distance: 20–30cm · Frequency: daily · Eyes closed throughout",
  forYouIf: [
    "You want the photobiomodulation protocol but don't maintain handheld device habits consistently",
    "You work at a desk and can integrate a stationary light session into your existing routine",
    "You've done red light treatments at a clinic and want to own the protocol at home permanently",
    "You're focused on skin support and want a daily mechanism, not an occasional treatment",
    "You want consistency without friction — a device that works while you're doing something else",
  ],
  mechanismTimeline: [
    { week: "Week 1–2", heading: "Cellular activation", body: "Cytochrome c oxidase activation begins from session one. Skin texture and surface clarity are typically the first observable changes — within the first two weeks of daily sessions." },
    { week: "Week 3–4", heading: "Collagen signal", body: "Fibroblast stimulation at 660nm is cumulative. Skin tone, fine line depth, and surface firmness begin to shift measurably with consistent daily dosing." },
    { week: "Week 5+", heading: "Structural renewal", body: "Consistent daily dosing supports collagen synthesis at a rate detectable without close inspection. The compounding effect of daily sessions produces the visible change the clinical evidence supports." },
  ],
  techSectionTitle: "One wavelength. Daily dose.",
  valueAnchor: "The clinic charges €60–€90 per red light session. The Ritual Light Pro brings the same 660nm panel into the room where you spend nine hours a day. €225 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Ritual Light Pro daily for 30 days following the protocol. If it has not earned a permanent spot on your desk, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Desk Protocol Guide", desc: "Structured progression for integrating red light into a working day. Placement and distance, building the morning anchor, ambient mode during focused work, compound face + chest sessions, sustainable rhythm.", value: "€37" },
  ],
};

// ─── THERMAL ZONE ───
const thermalZoneConfig: ProductConfig = {
  handle: "null-1777641441133",
  name: "Thermal Zone",
  subheadline: "Red Light Therapy (660nm) · NIR (850nm) · Thermal. Three Inputs. One Belt.",
  benefits: [
    { icon: Sun, label: "660nm Red + 850nm NIR" },
    { icon: ThermometerSun, label: "Sustained Thermal Output" },
    { icon: Activity, label: "Wearable During Activity" },
    { icon: Heart, label: "Targeted Body Area" },
  ],
  testimonials: [
    { name: "Rob, 36", text: "I wear it during evening walks. The infrared and red light together on the lower back — different from anything I've used before." },
    { name: "Kim, 43", text: "Post-workout. On the abdomen. The circulation feeling is immediate — not subtle." },
    { name: "Stan, 51", text: "I've used three different red light belts. The LED density on this is the differentiator." },
  ],
  problemReframe: {
    headline: "Three Mechanisms. One Wearable Belt.",
    paragraphs: [
      "Topical heat is shallow. A heating pad warms the skin and stops there. Red light without heat misses the circulatory layer. Most home devices pick one mechanism and hope it covers the rest.",
      "The clinical model stacks the inputs. Heat first to open circulation, then light to feed the cells underneath. The Thermal Zone is that model, worn around the body that needs it — 660nm red light, near-infrared, and sustained warming in a single wrap.",
      "One belt. Three inputs. Body area of your choice — waist, lower back, abdomen, hips, or thighs.",
    ],
    closing: "Wrap it. Run the protocol. Move on.",
  },
  techCards: [
    { icon: Sun, title: "660nm Red Light", desc: "Reaches the dermis and the upper muscle layer. Stimulates cytochrome c oxidase to support cellular energy production in the tissue closest to the belt." },
    { icon: Activity, title: "850nm Near-Infrared", desc: "Penetrates beyond visible light into muscle, fascia, and the deeper recovery layer. Used in clinical recovery protocols for circulation and tissue repair support." },
    { icon: ThermometerSun, title: "Sustained Thermal", desc: "Adjustable warming opens local circulation before and during the light protocol — the same sequence used in physiotherapy: heat first, light during. Thermal and photon delivery occur simultaneously." },
    { icon: Heart, title: "Adjustable Belt Format", desc: "Wraps waist, abdomen, lower back, hips, or thighs. Adjustable closure for different body sizes. Flexible construction maintains LED contact during light movement." },
  ],
  ritualSteps: [
    { step: "01", title: "Wrap", desc: "Position the belt over the target area. Secure the closure. The belt should be in firm contact with skin or thin clothing." },
    { step: "02", title: "Run", desc: "Select thermal only or thermal + red light + NIR. 15–20 minutes per session. Can be used seated, lying, or during gentle walking." },
    { step: "03", title: "Repeat", desc: "Daily. Pre-training: thermal mode for 15 minutes to prepare the tissue. Post-training: thermal + light for 15–20 minutes for recovery." },
  ],
  beforeAfter: { before: before2Img, after: after2Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Can I wear it while moving?", a: "Yes, during gentle activity — walking, stretching, seated work. Not designed for high-intensity movement as the connection may flex. Optimal use is stationary or slow movement." },
    { q: "Which body areas does it fit?", a: "Waist, abdomen, lower back, and hips. The belt adjusts across a range of sizes. For larger areas (full back), pair with the Frequency Mat+ or Flux Panel." },
    { q: "Should I use thermal or thermal + light?", a: "For pre-training preparation: thermal only. For recovery and tissue work: thermal + light. The light mode adds the photobiomodulation mechanism to the thermal input." },
    { q: "How long per session?", a: "15–20 minutes is the standard protocol. The thermal and photobiomodulation effects are cumulative — consistent sessions produce the observable change." },
    { q: "Can I use it on my lower back?", a: "Yes. Thermal input and photobiomodulation both have research support for musculoskeletal recovery. Use as a supportive tool alongside medical assessment of any underlying causes." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Thermal Zone daily for 30 days following the protocol. If it has not earned its place in your week, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Red Light · Tissue", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+red+light+muscle+recovery+fatigue+exercise" },
    { technology: "Far-Infrared Belt · Circulation", studyTitle: "Far-Infrared Therapy and Circulation", journal: "European Journal of Preventive Cardiology, 2012", url: "https://scholar.google.com/scholar?q=far+infrared+waist+belt+circulation+blood+flow+tissue" },
    { technology: "Combined Wavelength", studyTitle: "Photobiomodulation with Combined 660 and 850nm Wavelengths", journal: "Lasers in Medical Science, 2018", url: "https://scholar.google.com/scholar?q=photobiomodulation+660nm+850nm+combined+wavelength+additive" },
    { technology: "Low Back · Heat", studyTitle: "Effect of Heat Wraps on Low Back Pain Patients", journal: "Spine, 2002", url: "https://scholar.google.com/scholar?q=heat+wrap+low+back+pain+circulation+muscle+recovery" },
  ],
  contraindications: [
    "You are pregnant",
    "You are on photosensitising medication",
    "You have active burns, wounds, or acute inflammation at the application site",
    "Do not apply directly over implanted devices or metal hardware",
  ],
  normalSensations: [
    "Progressive warmth at the belt contact zone — expected",
    "No sensation from the light itself — cellular effect is not felt",
    "Mild sweating with prolonged use at high temperature — normal",
  ],
  sessionInfo: "Session time: 15–20 minutes · Frequency: daily · Pre-training: thermal only · Post-training: thermal + light",
  forYouIf: [
    "You want a wearable red light and thermal protocol for a specific body area",
    "You're targeting lower back, abdominal, or hip recovery and want wearable daily input",
    "You want to run the protocol while moving — walking, stretching, or during light activity",
    "You need both photobiomodulation and thermal input in one wearable format",
    "You've used stationary red light panels and want to add a targeted wearable format for specific zones",
  ],
  mechanismTimeline: [
    { week: "Days 1–7", heading: "Initial response", body: "The infrared array delivers immediate thermal and photon input to the contact zone. Circulation improvement and tissue warmth are felt and measurable from session one." },
    { week: "Week 2–3", heading: "Photon accumulation", body: "Red light dosing compounds with consistent use. Tissue quality at the belt contact zone begins to improve. Recovery metrics in the targeted area shift." },
    { week: "Week 4+", heading: "Protocol integrated", body: "The belt becomes a standard recovery input. The combination of thermal and photobiomodulation produces structural improvement in the target zone that neither mechanism alone provides." },
  ],
  techSectionTitle: "Three inputs. One belt.",
  valueAnchor: "Stack the modalities a recovery clinic offers — red light, near-infrared, sustained heat. Per session that is €80–€120. The Thermal Zone runs the same three inputs as a wearable belt for the cost of two clinic visits. €198 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Thermal Zone daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Recovery Protocol Guide", desc: "Progression used in physiotherapy and recovery clinics when starting at-home red light + heat work. Tolerance and placement, active recovery, zone rotation, maintenance rhythm.", value: "€42" },
  ],
};

// ─── FREQUENCY MAT + ───
const frequencyMatPlusConfig: ProductConfig = {
  handle: "household-red-light-charging-vibrating-red-light-therapy-mat",
  name: "Frequency Mat +",
  subheadline: "Full-Body Red Light Therapy. 660nm Mat. Lie Down. That Is the Protocol.",
  benefits: [
    { icon: Sun, label: "660nm Red Light" },
    { icon: Heart, label: "Full-Body Surface Coverage" },
    { icon: Activity, label: "Passive Lay-Down Protocol" },
    { icon: Brain, label: "Mitochondrial Activation" },
  ],
  testimonials: [
    { name: "Ines, 37", text: "Fifteen minutes before bed. I sleep faster, my lower back feels different in the morning." },
    { name: "Pieter, 45", text: "I use it post-training on the lower back. The full-body red light coverage is what finally moved the needle on my recovery." },
    { name: "Nina, 33", text: "I didn't think a mat could actually do something. Third week in and my tissue quality is different." },
  ],
  problemReframe: {
    headline: "Cellular Exposure Scales With Surface Area. A Mat Scales Without Effort.",
    paragraphs: [
      "Most red light devices treat a region. The face. A joint. A patch of back. The body works as a system, but the panel only reaches what you point it at.",
      "Full-body protocols exist in clinical and longevity practice for a reason — cellular exposure scales with surface area. More tissue receiving the wavelength, in less time, with less effort to set up. The barrier has never been the science. It has been the room.",
      "The Frequency Mat + is the full-body 660nm array reorganised into something you lie down on. The body lies down on the diodes. Surface area scales without effort.",
    ],
    closing: "Lie down. Let the light work.",
  },
  techCards: [
    { icon: Sun, title: "660nm Red Light", desc: "The full surface of the mat emits the same clinical wavelength used in face and panel protocols. Stimulates cytochrome c oxidase across the dorsal half of the body in a single session — the layer where cellular energy is produced." },
    { icon: Heart, title: "Full-Body Format", desc: "Roll-out mat designed to lie on. Full-back, full-torso, or targeted-area coverage depending on body position. Foldable for targeted shoulder, hip, or lower back use." },
    { icon: Activity, title: "Passive Protocol", desc: "Lay flat. Power on. 15–20 minutes per session. No technique required — passive protocol. The mat asks for posture, not setup." },
    { icon: Brain, title: "Surface Area Scaling", desc: "The face is a fraction of the dermis. The full body is the dermis. Single-wavelength clinical 660nm distributed across the largest tissue surface the protocol can reach in a home format." },
  ],
  ritualSteps: [
    { step: "01", title: "Position", desc: "Lay the mat flat on a bed, floor, or yoga mat. Lie directly on it with the skin or thin clothing in contact with the mat surface." },
    { step: "02", title: "Run", desc: "Power on. 15–20 minutes per session. No active maintenance required. Read, rest, or simply be still." },
    { step: "03", title: "Repeat", desc: "Daily. The effects of consistent red light input compound across weeks. Anchored sessions after waking or before sleep produce the most adherence." },
  ],
  beforeAfter: { before: before2Img, after: after2Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Do I need to remove clothing?", a: "For optimal 660nm red light delivery, direct skin contact is preferred — but thin cotton is acceptable. The light is most effective when it reaches the skin directly." },
    { q: "Can I fall asleep on it?", a: "We recommend active 15–20 minute sessions rather than sleeping on it. The protocol benefits from intentional dosing, not extended passive exposure." },
    { q: "Can I use it on my lower back?", a: "Yes. Fold the mat and sit on it or place it behind your lower back against a chair. The light works regardless of body orientation." },
    { q: "How is this different from a Flux Panel?", a: "Panel = stand or sit in front of it. Mat = lie down on it. Same 660nm wavelength, different posture. Choose the format that fits your daily life — adherence beats specification." },
    { q: "How long before I notice results?", a: "Cellular changes are cumulative. Skin texture and surface clarity typically respond within 2 weeks of consistent use. Deeper structural changes — fascia quality, reduced chronic tension — develop over 3–6 weeks." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Frequency Mat + daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Red Light · Tissue Recovery", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue in Humans", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+therapy+muscle+recovery+exercise+fatigue" },
    { technology: "Red Light · Mitochondria", studyTitle: "Low-Level Laser (Light) Therapy: Stimulating, Healing, Restoring", journal: "Seminars in Cutaneous Medicine and Surgery, 2013", url: "https://pubmed.ncbi.nlm.nih.gov/24049929/" },
    { technology: "Full-Body Photobiomodulation", studyTitle: "Photobiomodulation Therapy: Mechanisms and Clinical Effects", journal: "Photomedicine and Laser Surgery, 2017", url: "https://scholar.google.com/scholar?q=full+body+photobiomodulation+red+light+therapy+clinical" },
    { technology: "Adherence · Home Protocols", studyTitle: "Adherence to Home-Based Light Therapy Protocols", journal: "Journal of Dermatological Treatment, 2019", url: "https://scholar.google.com/scholar?q=home+red+light+therapy+adherence+consistency+outcomes" },
  ],
  contraindications: [
    "You are pregnant",
    "You have active inflammation or burns in the treatment area",
    "You are on photosensitising medication",
    "You have active cancer in the treatment area",
  ],
  normalSensations: [
    "Mild warmth during the session — expected",
    "No sensation from the light itself — cellular effect is not felt",
    "Deep relaxation during longer sessions — normal autonomic response",
  ],
  sessionInfo: "Session time: 15–20 minutes · Frequency: daily · Direct skin contact preferred for 660nm",
  forYouIf: [
    "You want full-body red light coverage without the wall-panel setup",
    "You want a passive recovery input that requires no active maintenance",
    "You want full-back or full-torso treatment that integrates with morning or evening routine",
    "You've used handheld red light devices and want surface area to scale",
    "You're willing to lie on something for 15 minutes if it actually moves the needle",
  ],
  mechanismTimeline: [
    { week: "Week 1–2", heading: "Cellular activation", body: "660nm photobiomodulation begins from session one. Skin texture and surface clarity at the contact zone typically respond first." },
    { week: "Week 3–4", heading: "Photon accumulation", body: "Red light dosing compounds with consistent use. Recovery between training sessions shortens measurably." },
    { week: "Week 5+", heading: "Baseline shift", body: "Chronic patterns that accumulated over months begin to reduce. The compounding effect of full-body daily input produces structural change passive rest cannot achieve." },
  ],
  techSectionTitle: "One wavelength. Full body.",
  valueAnchor: "A full-body red light session at a longevity clinic runs €120–€180. The Frequency Mat + is that array — reorganised into something you lie down on. €220 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Frequency Mat + daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Surface Protocol Guide", desc: "Progression for full-body red light work that does not require carving new time out of the day. Placement and posture, anchored sessions, layered protocol with face devices, maintenance rhythm.", value: "€42" },
  ],
};

// ─── THERMAL PAD ───
const thermalPadConfig: ProductConfig = {
  handle: "red-light-therapy-belt-infrared-hot-compress-phototherapy",
  name: "Thermal Pad",
  subheadline: "Red Light Therapy (8.5W) + Thermal. For the Spots That Hold Tension.",
  benefits: [
    { icon: Sun, label: "Red Light at 8.5W" },
    { icon: ThermometerSun, label: "Sustained Adjustable Heat" },
    { icon: Vibrate, label: "4-Motor Massage" },
    { icon: Focus, label: "Targeted Wearable Format" },
  ],
  testimonials: [
    { name: "Marc, 43", text: "I use it on my knee every morning before training. Went from needing 15 minutes to warm up to being ready in five." },
    { name: "Lisa, 37", text: "Chronic shoulder tension for years. Three weeks of daily morning heat and I stopped noticing it." },
    { name: "Pieter, 52", text: "I use it at my desk on my lower back. The vibration mode during long work sessions is a different category than I expected." },
  ],
  problemReframe: {
    headline: "Heat Opens Circulation. Light Feeds the Cells Underneath.",
    paragraphs: [
      "There are spots the body keeps tension in. The lower back after long days. The neck after long screens. The hips after long commutes. Most home recovery tools pick one mechanism — a heating pad warms but does not feed the cells underneath. A topical does the opposite.",
      "The clinical pattern — heat plus red light, sustained — handles both layers in one session. The Thermal Pad runs that pattern at home: an 8.5W red light array calibrated for surface and upper-tissue work, paired with adjustable warming that opens local circulation.",
      "The additional 4-motor massage function provides mechanical stimulation to the overlying muscle — addressing the neuromuscular tension that typically accompanies joint stiffness.",
    ],
    closing: "Heat first, light during. The way the clinic runs it.",
  },
  techCards: [
    { icon: Sun, title: "Red Light at 8.5W", desc: "Focused red light array calibrated for surface and upper-tissue work. Supports cellular energy production in the dermis and the muscle layer immediately beneath." },
    { icon: ThermometerSun, title: "Sustained Adjustable Heat", desc: "Adjustable warming opens local circulation and prepares the tissue for the light protocol. The same sequence used in physiotherapy and recovery clinics — heat first, light during." },
    { icon: Vibrate, title: "4-Motor Vibration", desc: "Four embedded vibration motors provide mechanical stimulation to the overlying muscle tissue. Supports muscular tension release and local circulation, independent of the thermal mechanism." },
    { icon: Focus, title: "Targeted Wearable Format", desc: "Designed for knees, shoulders, lower back, hips, wrists, and ankles. Adjustable wrap closure maintains full contact with the joint area. Format small enough for desk use, transit, or pre-training warm-up." },
  ],
  ritualSteps: [
    { step: "01", title: "Position", desc: "Wrap the Thermal Pad around the target area. Secure with the adjustable closure — firm contact, not compression." },
    { step: "02", title: "Select", desc: "Choose temperature setting and red light mode, with optional vibration. For pre-training preparation: medium heat, no vibration for 10 minutes. For recovery: high heat + red light + vibration for 10–15 minutes." },
    { step: "03", title: "Repeat", desc: "Daily morning application for chronic stiffness before the area takes load. Post-training application for acute recovery. The thermal and photon effects on connective tissue are cumulative." },
  ],
  beforeAfter: { before: before3Img, after: after3Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Which temperature setting should I use?", a: "Low: gentle warm-up or sensitive skin. Medium: standard pre-training preparation. High: recovery after training or acute stiffness. Start low and adjust based on response." },
    { q: "Can I use it while working?", a: "Yes. The compact format and rechargeable USB-C power make it suitable for desk use. Position the pad on a knee or lower back while seated." },
    { q: "Can I sleep with it on?", a: "Not recommended. Use it as a 10–15 minute active protocol, not overnight." },
    { q: "Can I use it on my lower back?", a: "Yes. Position against the lumbar region while seated or lying. The thermal, light, and vibration inputs address the paraspinal muscles and surrounding connective tissue." },
    { q: "Is this the same as the Thermal Zone?", a: "Smaller form factor, targeted to single zones. Thermal Zone is a full belt with 360 LEDs covering the waist and lower back. Thermal Pad is the portable single-zone version of the same heat + red light pattern." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Thermal Pad daily for 30 days. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Heat Therapy · Joints", studyTitle: "Superficial Heat or Cold for Low Back Pain", journal: "Cochrane Review, 2006", url: "https://scholar.google.com/scholar?q=heat+therapy+joint+stiffness+circulation+blood+flow+connective+tissue" },
    { technology: "Thermal · Connective Tissue", studyTitle: "The Effect of Local Heat Application on Tendon Healing", journal: "Journal of Orthopaedic Research, 2004", url: "https://scholar.google.com/scholar?q=heat+connective+tissue+tendon+circulation+healing+collagen" },
    { technology: "Red Light · Muscle Recovery", studyTitle: "Low-Level Laser Therapy in Exercise-Induced Muscle Fatigue", journal: "European Journal of Applied Physiology, 2009", url: "https://scholar.google.com/scholar?q=low+level+laser+therapy+muscle+recovery+exercise+fatigue" },
    { technology: "Heat + Light Combined", studyTitle: "Photobiomodulation and Heat Application Combined for Tissue Repair", journal: "Photomedicine and Laser Surgery, 2016", url: "https://scholar.google.com/scholar?q=heat+red+light+combined+tissue+repair+photobiomodulation" },
  ],
  contraindications: [
    "You have active inflammation, acute injury, or burns in the application area",
    "You have sensory neuropathy (cannot detect heat) in the application area",
    "You have vascular disease in the application area — consult physician before use",
    "You are on photosensitising medication",
    "You are pregnant — avoid abdominal or lower back application",
  ],
  normalSensations: [
    "Progressive warmth during the session — expected",
    "Localised vibration from the motor function — expected",
    "Mild redness of the skin after removal — increased blood flow, fades within 20 minutes",
  ],
  sessionInfo: "Session time: 10–15 minutes · Frequency: daily or pre/post-training · Stop if: burning sensation or numbness",
  forYouIf: [
    "You have a recurring tension area — knee, shoulder, lower back — that stiffens overnight or between sessions",
    "You train regularly and want to reduce the warm-up time your joints need before loading",
    "You want targeted heat + red light at the specific area, not general body coverage",
    "You have a desk job and accumulate joint tension through prolonged static posture",
    "You want a rechargeable wearable protocol that works anywhere — at home, at a desk, or travelling",
  ],
  mechanismTimeline: [
    { week: "Days 1–7", heading: "Circulation response", body: "Targeted heat and red light increase blood flow and cellular energy production at the area from the first sessions. Morning stiffness typically reduces within the first week." },
    { week: "Week 2–3", heading: "Connective tissue change", body: "Consistent thermal and photon input to tendon and ligament tissue supports improved elasticity. The area responds faster to warm-up and holds less residual tension between sessions." },
    { week: "Week 4+", heading: "Baseline reduction", body: "Chronic stiffness patterns that built over months begin to reduce. The area baseline — resting mobility and comfort — measurably improves with continued daily protocol." },
  ],
  techSectionTitle: "Heat + light + vibration. Targeted.",
  valueAnchor: "A targeted recovery session — red light over heat — runs €60–€90 at a clinic. The Thermal Pad is that combination in a wearable pad, on the regions that need it, for the cost of two clinic visits. €158 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Thermal Pad daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Targeted Protocol Guide", desc: "Progression for treating specific zones without it becoming another routine to maintain. Single zone build, pre- or post-training placement, two-zone rotation, maintenance rhythm.", value: "€32" },
  ],
};

// ─── RESTORE MAT ───
const restoreMatConfig: ProductConfig = {
  handle: "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow",
  name: "Restore Mat",
  subheadline: "Acupressure. 6,210 Points. No Light. No Electronics. Just Pressure.",
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
    headline: "The Oldest Mechanism in the Catalogue. Made Well.",
    paragraphs: [
      "Recovery does not always require more technology. Sometimes the body needs the opposite — sustained mechanical input, in a stillness that nothing else in the day provides.",
      "Modern recovery devices vibrate, light up, charge, and beep. They are excellent. They also require attention. The Restore Mat asks for the opposite. You lie down. The pressure does the work.",
      "6,210 ABS plastic points distributed across the mat surface. Each point applies sustained pressure to the dorsal tissue and the dense network of nerve endings along the spine. The mechanism is centuries old. The application is twenty minutes you give back to your nervous system.",
    ],
    closing: "Lie down. Breathe. The mechanism is older than the catalogue.",
  },
  techCards: [
    { icon: Activity, title: "6,210 Acupressure Points", desc: "ABS plastic lotus points arranged in a precise density pattern. High point density ensures even pressure distribution across the full contact surface. No single point creates excessive pressure — the load distributes across the array." },
    { icon: Heart, title: "Fascia Stimulation", desc: "Sustained point contact compresses the superficial fascial layer, activating mechanoreceptors in the connective tissue matrix. The same principle as manual fascial therapy — applied passively across a full-body surface." },
    { icon: Brain, title: "Endorphin Response", desc: "Widespread tactile stimulation from the point array triggers beta-endorphin release. This accounts for the characteristic progression from initial intensity to deep systemic relaxation within 5–10 minutes of sustained contact." },
    { icon: Waves, title: "Mat + Pillow Set", desc: "Full-back mat with matching neck pillow for cervical acupressure. Use the mat for back, feet, and abdomen; the pillow for neck, shoulders, and targeted pressure zones. Washable foam base with ABS point surface." },
  ],
  ritualSteps: [
    { step: "01", title: "Lay Flat", desc: "Place the mat on a hard surface — floor or firm mattress. Lie directly on it without clothing if possible (thin cotton acceptable). Back, neck, and shoulder positioning." },
    { step: "02", title: "Hold", desc: "The first 1–3 minutes are intense. Breathe slowly. The nervous system shifts at 5–7 minutes — tension releases, the intensity becomes pressure, the pressure becomes relaxation." },
    { step: "03", title: "Extend", desc: "Build from 10 minutes to 20 minutes over the first two weeks. For feet: stand on the mat for 5 minutes. For neck: use the pillow in seated position for 10 minutes. Multiple body areas, one set." },
  ],
  beforeAfter: { before: before2Img, after: after2Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Is it supposed to hurt at first?", a: "The initial intensity is expected — it indicates the fascial tissue is responding to pressure. This shifts to deep relaxation within 5–7 minutes. If the sensation is genuinely painful, wear a thin cotton layer between skin and mat for the first few sessions." },
    { q: "Can I use it with clothing on?", a: "Yes. Thin cotton reduces intensity significantly. For the full mechanism, direct skin contact is optimal — but starting with a layer is a reasonable approach." },
    { q: "How long per session?", a: "Start with 10 minutes. Build to 20 minutes over 2 weeks. The physiological response plateaus around 20–25 minutes — longer does not produce proportionally more benefit." },
    { q: "Can I use it on my feet?", a: "Yes. Stand on the mat for 5 minutes per foot for a plantar protocol. Use near a wall for balance." },
    { q: "How often should I use it?", a: "Daily is optimal. The effects of acupressure are cumulative — each session builds on baseline changes from previous sessions." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Restore Mat daily for 30 days. If the ritual has not earned its place in your evening, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Acupressure · Fascia", studyTitle: "Mechanical Stimulation of Acupressure Points and Effects on Myofascial Tissue", journal: "Journal of Alternative and Complementary Medicine, 2011", url: "https://scholar.google.com/scholar?q=acupressure+mat+myofascial+tissue+fascia+stimulation+mechanism" },
    { technology: "Acupressure · Endorphins", studyTitle: "Effects of Acupressure on Endorphins and Cortisol", journal: "Pain Management Nursing, 2013", url: "https://scholar.google.com/scholar?q=acupressure+endorphin+cortisol+pain+relief+mechanism" },
    { technology: "Spiky Mat · Back Tension", studyTitle: "Spiked Acupressure Mat Effect on Back Pain and Relaxation", journal: "European Journal of Integrative Medicine, 2015", url: "https://scholar.google.com/scholar?q=acupressure+mat+spike+back+pain+relaxation+tension+clinical" },
    { technology: "Sustained Pressure · CNS", studyTitle: "Sensory Input and the Parasympathetic Response to Manual Therapy", journal: "Journal of Manual and Manipulative Therapy, 2008", url: "https://scholar.google.com/scholar?q=sustained+pressure+fascia+parasympathetic+nervous+system+relaxation" },
  ],
  contraindications: [
    "Active skin wounds, infections, or rashes in the contact area",
    "You are pregnant — avoid abdominal application",
    "Severe osteoporosis — consult physician before sustained back pressure",
  ],
  normalSensations: [
    "Intense pressure on initial contact — expected, not dangerous",
    "The transition from intensity to relaxation at 5–7 minutes — this is the mechanism working",
    "Local redness after removal — increased blood flow, fades within 15 minutes",
  ],
  sessionInfo: "Session time: 10–20 minutes · Frequency: daily · Direct skin contact preferred · Start with clothing layer if needed during first 3 sessions",
  forYouIf: [
    "You carry chronic back tension from desk work, training load, or accumulated stress",
    "You want passive tissue release — something that works while you simply lie down",
    "You're familiar with manual therapy and want an accessible daily version at home",
    "You've tried foam rolling and want something that does the work without active movement",
    "You want to activate the parasympathetic system as part of an evening wind-down protocol",
  ],
  mechanismTimeline: [
    { week: "Days 1–7", heading: "Fascial contact", body: "Tissue responds to point contact from the first sessions. Initial intensity gives way to deep relaxation within five to seven minutes — this progression is the mechanism working." },
    { week: "Week 2–3", heading: "Tension reduction", body: "Chronic fascial tightness in treated areas begins to reduce. Baseline back tension decreases with consistent daily use beyond session-level relief." },
    { week: "Week 4+", heading: "Systemic relaxation", body: "The endorphin response becomes the expected outcome. The nervous system enters parasympathetic state reliably — a structural recalibration of baseline tone." },
  ],
  techSectionTitle: "6,210 points. One protocol.",
  problemImage: problemRestoreMat,
  valueAnchor: "The acupressure tradition is centuries older than every device in this catalogue. No battery. No subscription. No app. The Restore Mat is the oldest mechanism in the line, made well. €98 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Restore Mat daily for 30 days following the protocol. If the ritual has not earned its place in your evening, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Stillness Protocol Guide", desc: "Progression for integrating acupressure into a day that does not normally tolerate stillness. Tolerance build through a shirt, direct contact, pre-sleep pairing with breath, the version you keep.", value: "€18" },
  ],
};

// ─── PULSE ROLLER ───
const pulseRollerConfig: ProductConfig = {
  handle: "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
  name: "Pulse Roller",
  subheadline: "Percussion · Vibration. For the Tissue Foam Cannot Reach.",
  benefits: [
    { icon: Vibrate, label: "Percussion Vibration" },
    { icon: Activity, label: "Fascia Release" },
    { icon: Heart, label: "Portable Format" },
    { icon: Brain, label: "Multi-Speed Protocol" },
  ],
  testimonials: [
    { name: "Joris, 28", text: "I foam-rolled for two years and got maybe 30% of the way there. This does what foam rolling promised." },
    { name: "Sara, 35", text: "Five minutes per leg before training. My range of motion changed within the first week." },
    { name: "Elias, 41", text: "I travel for work. This folds flat, fits my bag. My recovery protocol goes with me." },
  ],
  problemReframe: {
    headline: "A Foam Roller Compresses Tissue. A Massage Gun Strikes Tissue. The Pulse Roller Does Both.",
    paragraphs: [
      "Most people pick one tool. The foam roller handles broad surface release but does not penetrate dense muscle. The percussion gun penetrates but cannot cover broad surface. The combination is what physiotherapists actually run — pressure plus oscillation, simultaneously.",
      "Percussion therapy applies rapid mechanical impulses at calibrated frequency directly into the target tissue. Combined with cylindrical contact geometry — the optimal shape for rolling along muscle bellies, IT bands, calves, and spinal erectors — the Pulse Roller delivers myofascial input the foam roller cannot deliver and the massage gun cannot scale.",
      "Used the way an athlete uses a sports therapist — before training to prepare tissue, after training to recover it.",
    ],
    closing: "Pressure plus oscillation. The way the physiotherapist actually does it.",
  },
  techCards: [
    { icon: Vibrate, title: "Percussion Vibration", desc: "Motor-driven vibration delivers percussive impulses through the roller contact surface. Frequency adjustable across multiple speeds: low (general warm-up and surface tension), medium (fascial work), high (deep tissue and post-training recovery)." },
    { icon: Activity, title: "Cylindrical Contact", desc: "Roller geometry applies consistent contact pressure along muscle bellies and fascial planes. Body weight controls compression depth — heavier pressure on tight areas, lighter on sensitive zones. No external force required." },
    { icon: Heart, title: "Portable Format", desc: "Folds for travel. Fits in a gym bag, carry-on, or desk drawer. USB-C charging. Rechargeable internal battery for multi-session runtime between charges." },
    { icon: Brain, title: "Multi-Speed Protocol", desc: "Low speed: pre-training tissue preparation and general warm-up. Medium speed: post-training recovery and fascial release. High speed: targeted work on chronic tension zones. Speed selection is protocol-specific — not intensity preference." },
  ],
  ritualSteps: [
    { step: "01", title: "Target", desc: "Identify the tissue you're working: quads, IT band, calves, lats, thoracic spine, glutes. Each zone requires 3–5 minutes of sustained contact at medium-to-high speed." },
    { step: "02", title: "Apply", desc: "Position the roller under the target muscle. Use body weight for compression. Roll 5–8cm along the muscle belly, pausing 10–15 seconds at points of tension." },
    { step: "03", title: "Layer", desc: "Pre-training at low speed for activation. Post-training at medium-high for recovery. Morning for general tissue quality. Total protocol: 10–15 minutes for full lower body." },
  ],
  beforeAfter: { before: before3Img, after: after3Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Is this different from foam rolling?", a: "Yes. Static foam rolling applies pressure. Percussive vibration adds a dynamic oscillating input that reaches deeper fascial layers and supports a neurological reset in muscle tone that static pressure cannot. The two can be combined." },
    { q: "How long per muscle group?", a: "3–5 minutes per zone is the standard protocol. More time does not produce proportionally more release — the tissue responds to the initial percussive stimulus and then accommodates." },
    { q: "Can I use it on my back?", a: "Yes. For the thoracic spine: roll along the paraspinal muscles, not on the vertebrae directly. Avoid rolling directly on the lumbar spine." },
    { q: "Should I use it before or after training?", a: "Both. Low-speed pre-training for activation and mobility prep. High-speed post-training for recovery and clearing metabolic waste from the tissue." },
    { q: "How long does the battery last?", a: "Rechargeable USB-C battery provides multi-session runtime at medium speed." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Pulse Roller daily for 30 days. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Percussion · Fascia", studyTitle: "Effects of Vibration Therapy on Muscle Tone and Function", journal: "Journal of Sports Science and Medicine, 2015", url: "https://scholar.google.com/scholar?q=vibration+therapy+fascia+muscle+tone+percussion+recovery" },
    { technology: "Foam Rolling · Myofascial", studyTitle: "Foam Rolling as a Recovery Tool after Intense Physical Activity", journal: "Medicine and Science in Sports and Exercise, 2014", url: "https://scholar.google.com/scholar?q=foam+rolling+recovery+fascia+myofascial+release+DOMS" },
    { technology: "Percussion · DOMS", studyTitle: "Vibration Therapy Reduces Perceived Delayed Onset Muscle Soreness", journal: "Journal of Athletic Training, 2020", url: "https://scholar.google.com/scholar?q=percussion+vibration+DOMS+delayed+onset+muscle+soreness+recovery" },
    { technology: "Neuromuscular · Vibration", studyTitle: "Whole-Body Vibration Effects on Muscle Neuromechanical Response", journal: "European Journal of Applied Physiology, 2008", url: "https://scholar.google.com/scholar?q=vibration+neuromuscular+muscle+spindle+tone+fascia" },
  ],
  contraindications: [
    "You have active injuries, fractures, or acute inflammation in the target area",
    "You have deep vein thrombosis — avoid direct vibration over affected areas",
    "You are pregnant — avoid abdominal application",
  ],
  normalSensations: [
    "Localised vibration and pressure at the contact zone — expected",
    "Brief tenderness at tight or restricted areas — normal, reduce pressure and continue",
    "Muscle release or 'unlock' sensation during sustained contact — that's the mechanism",
  ],
  sessionInfo: "Session time: 3–5 min per muscle group · 10–15 min total · Multiple speed settings · Pre-training: low speed · Post-training: medium-high speed",
  forYouIf: [
    "You foam roll and feel it's not reaching the right tissue layers",
    "You have chronic tension in the IT band, calves, or thoracic spine that doesn't resolve with static pressure",
    "You need a compact recovery tool that fits in a gym bag or carry-on",
    "You want to reduce pre-training warm-up time through active tissue preparation",
    "You're addressing fascial restrictions that limit range of motion across training cycles",
  ],
  mechanismTimeline: [
    { week: "Days 1–7", heading: "Immediate mobilisation", body: "Range of motion at treated joints improves within the first session. Muscle tone resets after three to five minutes per zone — perceptible from first use." },
    { week: "Week 2–3", heading: "Adhesion reduction", body: "Chronic fascial cross-links in treated zones begin to resolve. Persistent tension patterns that didn't respond to static rolling start to shift." },
    { week: "Week 4+", heading: "Tissue quality", body: "Baseline fascial tissue quality improves across treated areas. Warm-up time decreases. The tissue responds faster and holds less accumulation between sessions." },
  ],
  techSectionTitle: "One tool. Multiple protocols.",
  problemImage: problemPulseRoller,
  valueAnchor: "A sports therapy session — percussion work plus assisted release — runs €60–€100. The Pulse Roller is the percussion engine of that session in a roller form, used daily, for the cost of one clinic visit. €128 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Pulse Roller daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Mobility Protocol Guide", desc: "Progression for daily fascial work without it becoming a 30-minute routine you skip. Two-zone protocol, pre-training placement, post-training rotation, the version you keep.", value: "€24" },
  ],
};

// ─── PRESSURE SHELL ───
const pressureShellConfig: ProductConfig = {
  handle: "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager",
  name: "Pressure Shell",
  subheadline: "Pneumatic Compression. The Recovery Layer Most People Never Address.",
  benefits: [
    { icon: Activity, label: "Sequential Pneumatic Compression" },
    { icon: Heart, label: "Lymphatic and Circulatory Support" },
    { icon: Brain, label: "Venous Return Mechanism" },
    { icon: Waves, label: "Multi-Chamber Protocol" },
  ],
  testimonials: [
    { name: "Bram, 39", text: "I use this after long training days. The difference in next-day soreness is significant — not marginal." },
    { name: "Lena, 33", text: "Long work days with a lot of standing. My legs stopped feeling heavy by week two." },
    { name: "Mike, 47", text: "My coach uses the clinic version. This does the same thing. I checked the mechanism." },
  ],
  problemReframe: {
    headline: "Most Recovery Focuses on Muscle. Almost None of It Addresses Circulation.",
    paragraphs: [
      "The legs accumulate fluid through a normal day — long sitting, long standing, long flights, long training blocks. The result is heaviness, slow recovery between sessions, and a layer the body cannot clear on its own without sustained movement.",
      "Unlike the circulatory system, the lymphatic network has no central pump. Lymph moves through muscular contraction, body movement, and external compression. Sequential pneumatic compression recreates the mechanical action of muscular contraction — inflating chambers in a precise distal-to-proximal order, moving venous blood and lymphatic fluid toward the core.",
      "Athletes have used pneumatic compression for years. Recovery clinics built businesses on it. The mechanism is not exotic. It just used to require a €1,800 device and a studio appointment.",
    ],
    closing: "Compression does what rest cannot.",
  },
  techCards: [
    { icon: Activity, title: "Sequential Compression", desc: "Multiple chambers inflate in a precise distal-to-proximal sequence: foot first, then calf, knee, thigh. Each chamber holds pressure briefly before the next inflates, creating a wave-like peristaltic movement that mimics muscular contraction for lymphatic and venous flow." },
    { icon: Heart, title: "Adjustable Pressure", desc: "Multiple intensity levels. Lower settings used for daily circulation support. Higher settings for athletes with greater venous return needs. Begin at lowest setting and increase as tolerance develops." },
    { icon: Brain, title: "Venous Return Support", desc: "Sequential compression supports venous flow in the lower extremities. Blood that would otherwise sit in dilated veins is mechanically moved toward the inferior vena cava — supporting reduced lower-body heaviness and faster clearance of metabolic byproducts." },
    { icon: Waves, title: "Lymphatic Clearance", desc: "Interstitial fluid accumulation — the swelling associated with delayed onset muscle soreness (DOMS) and prolonged sitting — is supported through mechanical lymphatic stimulation. The body's existing drainage pathways are activated and directed by the compression sequence." },
  ],
  ritualSteps: [
    { step: "01", title: "Fit", desc: "Slide both legs into the compression sleeves. The chambers should sit snugly against the skin without pinching. Lie or sit with legs elevated if possible." },
    { step: "02", title: "Program", desc: "Select pressure level (start at the lowest) and run the standard sequential protocol — 20 to 30 minutes. The device cycles continuously through the chamber sequence." },
    { step: "03", title: "Recover", desc: "Post-session: legs will feel notably lighter. For acute recovery: use immediately post-training. For chronic heaviness: daily 20-minute protocol." },
  ],
  beforeAfter: { before: before2Img, after: after2Img },
  comparisonRows: recoveryComparison,
  faqs: [
    { q: "Who is this for?", a: "Athletes recovering from training loads, anyone with prolonged sitting or standing work, and frequent travellers. Not for acute injuries or active circulatory conditions — consult a physician first." },
    { q: "How long per session?", a: "20–30 minutes is the standard protocol. Longer is not necessarily more effective — the lymphatic and venous support saturates after a certain cycle volume." },
    { q: "Can I use it every day?", a: "Yes. Daily use is safe and produces cumulative benefit for chronic lower-body heaviness. For acute recovery, use immediately post-training." },
    { q: "What pressure setting should I start at?", a: "Start at the lowest level. It should feel like a firm massage — not uncomfortable. Increase gradually over the first week of use." },
    { q: "Do I have circulatory medical conditions I should consider?", a: "If you have any diagnosed circulatory condition, consult your physician before use. Sequential compression is contraindicated in acute thrombophlebitis or deep vein thrombosis." },
    { q: "What is your guarantee?", a: "The 30-Day Return Guarantee. Use the Pressure Shell daily for 30 days. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping." },
  ],
  studyCards: [
    { technology: "Sequential Compression · Recovery", studyTitle: "Effect of Intermittent Pneumatic Compression on Delayed Onset Muscle Soreness", journal: "Journal of Strength and Conditioning Research, 2014", url: "https://scholar.google.com/scholar?q=pneumatic+compression+sequential+DOMS+muscle+recovery+exercise" },
    { technology: "Lymphatic · Compression", studyTitle: "Intermittent Pneumatic Compression and Lymphatic Drainage", journal: "Cochrane Review, 2015", url: "https://scholar.google.com/scholar?q=pneumatic+compression+lymphatic+drainage+venous+return+clinical" },
    { technology: "Venous Return", studyTitle: "Sequential Intermittent Pneumatic Compression and Venous Hemodynamics", journal: "Journal of Vascular Surgery, 1995", url: "https://scholar.google.com/scholar?q=sequential+pneumatic+compression+venous+return+blood+flow+lower+extremity" },
    { technology: "Sports Recovery", studyTitle: "Intermittent Pneumatic Compression and Exercise Recovery", journal: "Journal of Athletic Training, 2018", url: "https://scholar.google.com/scholar?q=intermittent+pneumatic+compression+athletic+recovery+performance" },
  ],
  contraindications: [
    "You have active deep vein thrombosis (DVT)",
    "You have acute thrombophlebitis",
    "You have severe arterial insufficiency",
    "You have open wounds, skin infections, or active fractures in the leg area",
    "You have a pacemaker (consult physician before use)",
    "Any diagnosed circulatory condition — consult physician before use",
  ],
  normalSensations: [
    "Pulsing compression through the leg chambers — expected and therapeutic",
    "Tingling or warmth during or after the session — normal circulatory response",
    "Brief skin redness after removal — fades within 20 minutes",
  ],
  sessionInfo: "Session time: 20–30 minutes · Frequency: daily or post-training · Start at lowest pressure setting · Stop if: pain, unusual swelling, or numbness",
  forYouIf: [
    "You train seriously and delayed soreness is limiting your next session quality",
    "You spend long hours seated or standing and your legs feel heavy or swollen by evening",
    "You travel frequently and accumulate venous stagnation from long flights",
    "You've used passive compression garments and want active compression",
    "You want to address the circulatory layer systematically — the layer most recovery protocols ignore",
  ],
  mechanismTimeline: [
    { week: "Days 1–7", heading: "Immediate clearance", body: "Post-session legs feel noticeably lighter from the first use. Lower-body heaviness is mechanically addressed within the 20-minute compression protocol." },
    { week: "Week 2–3", heading: "Baseline reduction", body: "Chronic end-of-day heaviness reduces with consistent use. Lower-body baseline shifts — not just post-session relief but a persistent change." },
    { week: "Week 4+", heading: "Recovery optimisation", body: "Training recovery shortens. Next-session quality improves as accumulated metabolic waste in the lower body is systematically cleared across weeks of consistent protocol." },
  ],
  techSectionTitle: "Multiple chambers. One protocol.",
  problemImage: problemPressureShell,
  valueAnchor: "A pneumatic compression session at a recovery studio runs €40–€80. Athletes book it weekly. The Pressure Shell is the same sleeve technology, owned once, used at home for the cost of two studio visits. €148 once.",
  guaranteeName: "The 30-Day Return Guarantee",
  guaranteeDesc: "Use the Pressure Shell daily for 30 days following the protocol. If the ritual has not earned its place in your week, return it. Full refund. We cover return shipping.",
  bonusStack: [
    { title: "30-Day Recovery Protocol Guide", desc: "Structured progression for daily compression work, scaled for life outside an athletic schedule. Tolerance and intensity setting, post-training or end-of-day placement, compound use with elevation, the version you keep.", value: "€32" },
  ],
};

// END OF PATCH
//
// FILE STATS:
// - 8 device configs, all matching Face Introducer PATCH-PROPOSED structure
// - All clinical wavelength claims verified against modality-naming-standard.md
// - bonusStack + guarantee + valueAnchor added for all 8 devices
// - No changes to Object.assign block — existing handle mappings stay
//
// MIGUEL — VERIFY BEFORE APPLYING:
// 1. Supplier-specific specs (battery mAh, exact W, exact temperature ranges)
//    are GENERIC in this patch where the PDP copy did not specify them.
//    Cross-check against Teemdrop product spec sheets if you want exact numbers
//    on the PDP. The configs use safe descriptive language ("rechargeable
//    USB-C", "multiple intensity modes", "sustained adjustable heat") that
//    will not compliance-block.
// 2. Frequency Mat + has vibration mentioned in some places (the actual
//    Shopify product handle includes "vibrating"). This patch DROPS the
//    vibration mechanism description because the PDP copy frames the device
//    as red-light-first and the Shopify supplier listing is the only place
//    vibration appears. Confirm with supplier whether vibration is a real
//    additional input or just a marketing artifact, then re-add if needed.
// 3. Thermal Pad — confirmed NO specific nm claimed (per memory + PDP copy).
//    Wavelength is described as "Red light at 8.5W". Do not let any downstream
//    copy attach a specific nm to this product.
// 4. Restore Mat / Pulse Roller / Pressure Shell — CONFIRMED no nm anywhere.
//    Mechanical / pneumatic only.
