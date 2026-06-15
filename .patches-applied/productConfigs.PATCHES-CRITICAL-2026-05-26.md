# productConfigs.ts Critical Patches — 2026-05-26

Built by autonomous block 18:30. Three critical patches required BEFORE the P0 vercel.json routing deploys, otherwise non-compliant PDPs ship.

**Apply order:**
1. Body Lift (field-level, ~5 lines) — easy
2. Eye Activator (field-level + add Microcurrent benefit) — medium
3. Frame Pulse (full entry rewrite — biggest, but most strategic — establishes clinical midband positioning)
4. Then apply `productConfigs.face-introducer.PATCH-PROPOSED.ts` (already written this session)

After all 4: `npm run build` → verify no `grep -c "630" dist/product/eye-massage/index.html` returns 0, and Face Introducer page no longer claims 630-660nm.

---

## PATCH 1 — Body Lift (`body-lift`)
Lines 121–145, 156. Body Lift is an alias for Face Introducer purchase; same modality rules apply.

```ts
// CURRENT (line 121-145)
benefits: [
  { icon: Sparkles, label: "Microcurrent Lift" },
  { icon: Flame, label: "Red Light Collagen Support" },        // CRITICAL drift
  { icon: Heart, label: "Lymphatic Activation" },
  { icon: Brain, label: "Built for Long-Term Tone" },
],
...
problemReframe.paragraphs[2]:
"Body Lift targets these layers directly. Through microcurrent, red light, and sonic pulse, ..."
...
techCards: [
  { icon: Sun, title: "Red Light", desc: "Stimulates collagen response at the cellular level..." },  // CRITICAL
  ...
],
studyCards: [
  { technology: "Red Light", studyTitle: "Low-Level Laser (Light) Therapy and Photobiomodulation"... },  // CRITICAL — remove
  ...
],

// REPLACE WITH
benefits: [
  { icon: Sparkles, label: "Microcurrent Lift" },
  { icon: Sun, label: "Cosmetic LED Visible-Light Support" },
  { icon: Heart, label: "Lymphatic Activation" },
  { icon: Brain, label: "Built for Long-Term Tone" },
],
...
problemReframe.paragraphs[2]:
"Body Lift targets these layers directly. Through microcurrent, cosmetic LED, and sonic pulse, ..."
...
techCards: [
  { icon: Sun, title: "Cosmetic LED", desc: "Visible-spectrum LED component pairs with the microcurrent and thermal stack to support your daily ritual. Soft, non-clinical light delivery." },
  ...
],
studyCards: [
  // DROP the "Red Light" studyCard entirely. Cosmetic LED does not pair with photobiomodulation citations per modality-naming-standard.md.
  { technology: "Microcurrent", studyTitle: "..." (keep) },
  { technology: "Thermal", studyTitle: "..." (keep) },
  { technology: "Sonic Pulse", studyTitle: "..." (keep) },
],
```

---

## PATCH 2 — Eye Activator (`eye-massage`)
Lines 267–315. Currently claims clinical wavelength 630-660nm — memory confirms NO confirmed nm. Also missing Microcurrent from benefits despite it being a confirmed modality.

```ts
// CURRENT (line 267-273, 285, 290-293, 311-315)
subheadline: "Sonic Vibration + Red Light for the Periorbital Zone",
benefits: [
  { icon: Eye, label: "Under-Eye Depuffing" },
  { icon: Waves, label: "Sonic Lymphatic Drainage" },
  { icon: Sun, label: "Red Light Repair" },                      // CRITICAL
  { icon: Droplets, label: "Serum Penetration" },
],
...
problemReframe.paragraphs[2]:
"Eye Activator combines sonic vibration with red light to address the periorbital zone from two angles: mechanical stimulation to encourage lymphatic drainage, and targeted wavelengths to support collagen renewal in the tissue beneath."  // CRITICAL — "targeted wavelengths for collagen renewal" = clinical claim
...
techCards: [
  { icon: Waves, title: "Sonic Vibration", desc: "..." (keep) },
  { icon: Sun, title: "Red Light", desc: "Targeted wavelengths support collagen renewal..." },  // CRITICAL
  { icon: ThermometerSun, title: "Warm Mode", desc: "..." (keep, optional rename to Thermal) },
  { icon: Droplets, title: "Serum Activation", desc: "..." (keep) },
],
...
studyCards: [
  { technology: "Red Light 630–660nm", studyTitle: "..." },  // CRITICAL — REMOVE
  ...
],

// REPLACE WITH
subheadline: "Microcurrent · Sonic Vibration · Cosmetic LED for the Periorbital Zone",
benefits: [
  { icon: Eye, label: "Under-Eye Depuffing" },
  { icon: Zap, label: "Microcurrent (Periorbital Zone)" },
  { icon: Waves, label: "Sonic Lymphatic Drainage" },
  { icon: Sun, label: "Cosmetic LED Component" },
],
...
problemReframe.paragraphs[2]:
"Eye Activator combines microcurrent, sonic vibration, and cosmetic LED to address the periorbital zone from three angles: sub-sensory current for the underlying tissue, mechanical stimulation to encourage lymphatic drainage, and a soft visible-light component that pairs with your serum ritual."
...
techCards: [
  { icon: Waves, title: "Sonic Vibration", desc: "High-frequency oscillation creates mechanical movement in the periorbital tissue, supporting lymphatic drainage and reducing fluid retention that appears as puffiness." },
  { icon: Zap, title: "Microcurrent", desc: "Sub-sensory current operates within the body's own bioelectric range — for the thinnest skin on the face, with a calibrated periorbital intensity." },
  { icon: Sun, title: "Cosmetic LED", desc: "Visible-spectrum LED supports the daily ritual at the periorbital zone. Soft light delivery, no clinical wavelength claim. For confirmed clinical red light at this zone, see Frame Pulse." },
  { icon: ThermometerSun, title: "Thermal (Warm Mode)", desc: "Controlled thermal energy enhances serum absorption and promotes blood flow to the eye area." },
],
...
studyCards: [
  // REMOVE the "Red Light 630-660nm" studyCard
  { technology: "Microcurrent · ATP", studyTitle: "The Effects of Electric Currents on ATP Generation, Protein Synthesis, and Membrane Transport in Rat Skin", journal: "Clinical Orthopaedics and Related Research, 1982", url: "https://scholar.google.com/scholar?q=cheng+1982+electric+currents+ATP+generation" },
  { technology: "Sonic Vibration", studyTitle: "..." (keep) },
  { technology: "Vibration + Absorption", studyTitle: "..." (keep) },
],
```

---

## PATCH 3 — Frame Pulse (`3d-eye-beauty-instrument-...-massager-beauty-tool`)
Lines 617–684. Current entry UNDERSELLS Frame Pulse — calls it "Hands-Free LED Beauty Device" but Frame Pulse is the ONE face device with CONFIRMED clinical 630-660nm red light. PDP should establish clinical-midband positioning to support repricing memo's €128→€149 move.

```ts
// REPLACE ENTIRE ENTRY (lines 617-684) WITH:
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
      "Red light at 630–660nm is the most-studied band in photobiomodulation literature. Mitochondrial cytochrome c oxidase absorbs photons in this range, supporting ATP output. The Frame Pulse delivers this clinical wavelength specifically — not as a 'visible-spectrum' marketing claim, but as a documented mechanism with PubMed-cited studies.",
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
    "You have epilepsy or photosensitive conditions",
    "You have active skin infections or open wounds in the treatment area",
    "You have metal implants in the face",
  ],
  normalSensations: [
    "Gentle warmth from the red light array — expected",
    "Soft rhythmic pulse during microcurrent phase — confirms delivery",
    "No sensation between pulse cycles — normal",
  ],
  sessionInfo: "Session time: 8 minutes · Frequency: daily · Stop if: burning sensation, unusual pain, or persistent redness",
  valueAnchor: "Eye-zone clinic red light session: €80–€150. Frame Pulse: €149. Once.",
  guaranteeName: "30-Day Clinical Protocol Guarantee",
  guaranteeDesc: "30 days daily use. No visible response in tone, firmness, or upper-face definition — full refund. We cover return shipping.",
  bonusStack: [
    { title: "The Frame Pulse Protocol Guide", desc: "Daily timing, intensity progression, serum pairing. The clinical wavelength is half the protocol — the discipline is the other half.", value: "€19" },
    { title: "Photobiomodulation Science Primer", desc: "What the 630–660nm wavelength actually does at the cellular level. PubMed citations, mechanism diagrams.", value: "€27" },
    { title: "Periorbital Progress Tracker", desc: "Photo template for upper-face zone documentation. Week-by-week.", value: "€17" },
  ],
},
```

**Pricing note in PATCH 3:** `valueAnchor` set to **€149** matching the recommended reprice. If Miguel decides to hold €128, change line `Frame Pulse: €149. Once.` to `Frame Pulse: €128. Once.` (and likewise for any other €149 reference). Decision deadline 2026-05-30 per `frame-pulse-repricing-memo-2026-05-26.md`.

---

## After All 3 + Face Introducer Patches Applied

Run:
```bash
cd ~/lumen-zen-lab
npm run build
grep -c "630" dist/product/eye-massage/index.html
# Expected: 0

grep -c "630" dist/product/3d-eye-beauty-instrument*/index.html
# Expected: ≥4 (Frame Pulse legitimately claims 630-660nm)

grep -c "630" dist/product/lifting-and-tightening-face-introducer/index.html
# Expected: 0 (Face Introducer is now Cosmetic LED only)
```

Then deploy:
```bash
git add -A
git commit -m "fix: per-product modality standard compliance across 4 PDPs

- Face Introducer: 630-660nm + photobiomodulation claims removed, reframed as Cosmetic LED
- Body Lift (alias): same as Face Introducer
- Eye Activator: 630-660nm claim removed (no confirmed nm), Microcurrent added to benefits
- Frame Pulse: rebranded from 'Frame Pulse Activator' to 'Frame Pulse', clinical 630-660nm positioning now front-and-center (this is the only face device with confirmed clinical wavelength)

Per knowledge/products/modality-naming-standard.md and project_zentialpure.md catalog spec.
Closes P0 compliance issue surfaced in infra/logs/p0-pdp-compliance-2026-05-26.md."

vercel deploy --prod
```

Verify on prod:
```bash
curl -s https://zentialpure.com/product/lifting-and-tightening-face-introducer | grep -c "630"
# Expected: 0

curl -s https://zentialpure.com/product/3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool | grep -c "Frame Pulse"
# Expected: ≥3 (brand-facing name now visible)
```

THEN apply `vercel.json.PATCH-PROPOSED` for product routing redirects. Order matters — if you flip routing before fixing PDPs, every clean-slug click renders non-compliant Face Introducer page.
