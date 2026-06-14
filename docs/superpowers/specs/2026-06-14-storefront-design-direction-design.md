# Storefront Design Direction — "Clinical Ritual"

> Date: 2026-06-14
> Author: brainstorming session (Miguel + Claude)
> Reference studied: https://www.dayguard.com/ (Korean pre-alcohol jelly sticks)
> Repo: lumen-zen-lab · Brand: Zential Pure (Skin Intelligence)
> Status: design direction approved for spec; implementation plan to follow.

---

## 1. Why this exists

dayguard sells a wellness consumable and still reads more *credible* than most
beauty-device DTC. The lesson is not their product — it is their **posture**:
clinical minimalism, a functional-pillar system, measured copy, and a stacked
authority/trust spine. Zential already owns the right brand thesis ("Skin
Intelligence," instruments not devices). What it lacks is dayguard's *structural
discipline* on the homepage and PDP.

This document defines the design direction to close that gap and beat it. It does
**not** change the brand's identity tokens wholesale — it tightens, sequences, and
systematizes what already exists.

**One-line direction:** *Clinical authority with ritual warmth — pharma-grade
structure, not pharma-cold palette.*

---

## 2. What dayguard does that we steal

| dayguard move | Why it works | Zential adaptation |
|---|---|---|
| Pain→prevention hero headline ("don't let your tonight ruin your tomorrow") | Outcome-first, names the stakes | Tension/aging→reset framing, single CTA, angled instrument shot |
| 4 functional pillar cards (liver/gut/vitamins/hydration) | Makes a complex product legible in one glance | **4-modality pillar system** (per modality-naming-standard), each linking to its existing Tech\* page |
| Authority spine (doctor, 60yr pharma, clinical studies) | Borrows institutional trust | Mechanism transparency + "Resonance Restoration" science + practitioner credibility (NO medical claims) |
| Measured, qualified copy (no hyperbole) | Reads honest, not salesy | Already our brand voice — dayguard validates it. Enforce ruthlessly |
| 3-step "how to use" visual sequence | Removes usage anxiety | Protocol demo: 3-step instrument ritual, stills/diagrams |
| Subscribe & save spine | Recurring revenue, signals confidence | Protocol/membership framing (already the strategic thesis) |
| Stacked trust strip + press logos | Compounds credibility | Honest signals only (see §6) — no fabricated counts pre-launch |

## 3. Where we beat them

1. **Mechanism depth.** dayguard asserts "clinically backed" and moves on. We
   have real Tech\* and Science pages. Wire every pillar card directly to its
   mechanism page — depth on demand. This is our moat; they can't match it.
2. **Warmth.** dayguard is surgical-cold monochrome. We keep cream/gold so the
   clinical structure feels like a *ritual* you want, not a supplement you tolerate.
3. **No before/after, no fake urgency.** Per PRODUCT.md anti-references. The
   restraint itself becomes the credibility signal in a category full of
   transformation grids.

---

## 4. Token decisions (tighten, don't reinvent)

Keep the existing system in `DESIGN.md`. Changes are disciplinary:

- **Fonts:** unchanged — Lora (editorial heads, science/ritual) + DM Sans (body/UI).
- **Color:** unchanged palette, stricter usage.
  - Tangerine `#f69251` = sole action color. Audit and remove any decorative use.
  - Teal `#2ED8A8` = secondary identity touches only (never CTA).
  - Gold `#C6A07c` = premium warmth accents, hairlines, pillar iconography.
  - Fog `#f5f5f7` ground, white `#ffffff` card surfaces.
- **Elevation:** flat. Borders + surface shifts for depth. No new shadows.
- **Whitespace:** increase vertical rhythm toward dayguard's breathing room.
  Sections `py-20`→`py-24` on desktop. Generous gutters. Density is the enemy of
  perceived premium here.
- **Gradients:** demote. Use only for genuine emphasis (1 per viewport max),
  never as section background decoration.
- **Motion:** keep expressive but restrained — entrance fades/slide-up on scroll,
  spring on interactive elements, always gated by `prefers-reduced-motion`.

---

## 5. Homepage section order (the spine)

Adopt dayguard's proven flow, adapted to instruments:

1. **Announcement bar** — single honest line (shipping/guarantee), teal ground.
2. **Hero** — pain→reset headline, sub (mechanism promise), single tangerine CTA
   with arrow, angled instrument shot. No floating-on-white.
3. **Authority strip** — one calm line of institutional credibility (clinical-grade
   output, EU, guarantee). Replaces dayguard's "20,000 customers" with honest signals.
4. **Product thesis** — one statement of what Skin Intelligence means.
5. **4-modality pillar grid** — the centerpiece steal. Icon + modality name +
   one-line benefit + link to mechanism page. (Modality strings: §7.)
6. **Mechanism / Resonance Restoration** — Lora editorial block, links to Science.
7. **3-step protocol ritual** — visual sequence, how the instrument is used.
8. **Comparison / "clinic vs home"** — leverage existing ClinicVsHome page logic.
9. **Trust + guarantee** — 30-Day Protocol Guarantee, honest reassurance.
10. **Flagship CTA** — Face Introducer, "Clinic-precision facial technology. €88 once."
11. **FAQ** — accordion (objection handling: credibility, output, protocol).
12. **Email capture** — quiet, value-framed (protocol guide, not "10% off").
13. **Footer.**

PDP gets the same discipline: hero → modality pillars → mechanism → protocol →
guarantee → "Part of a Protocol" cross-sell (already shipped) → FAQ.

---

## 6. Trust spine — honest-only (compliance hard rule)

Pre-launch means **no fabricated social proof**. Allowed signals:

- 30-Day Protocol Guarantee (on the purchase, per PRODUCT.md).
- Clinic-grade output / mechanism transparency.
- EU shipping + integrity-of-pricing ("no codes" story, already live).
- Practitioner / founder credibility, ingredient & spec transparency.
- Press/logos **only when real**. Empty until earned.

Forbidden: invented customer counts, "#1 recommended" claims, before/after,
medical/therapeutic claims, fake urgency timers.

---

## 7. Compliance guardrails (MUST read before copy)

These are non-negotiable and override any convenience:

1. **Modality naming.** Read the canonical
   `~/zential-agent-engine/knowledge/products/modality-naming-standard.md`
   before writing ANY modality string. Do not hardcode from memory.
   - **OPEN RECONCILIATION:** `PRODUCT.md` labels Face Introducer "red light
     (630–660nm)". The canonical standard reserves "Red Light Therapy" for other
     SKUs and uses "Cosmetic LED" for Face Introducer. **Resolve against the
     canonical file, then fix PRODUCT.md to match.** Flagged, not silently chosen.
2. **No medical claims.** No "treats," "cures," therapeutic promises. Run copy
   through the zp-compliance skill before ship.
3. **Brand voice.** No em dashes in customer-facing copy. No exclamations, no
   adverb-hype, no influencer-speak. Mechanism before benefit before claim.
4. **No before/after imagery.** Positions as cosmetics, not Skin Intelligence.

---

## 8. Component work implied (for the plan)

- `HeroSection` — restructure to pain→reset + angled instrument shot variant.
- `ModalityPillarGrid` — **new** 4-card system, icon set, mechanism-page links.
- `AuthorityStrip` — **new** honest-signal row (replaces any count-based strip).
- `ProtocolSteps` — **new/refit** 3-step visual ritual sequence.
- `TrustGuarantee` — consolidate guarantee + reassurance.
- Token discipline pass — audit tangerine misuse, gradient demotion, whitespace.

Each is independently testable: renders from props, no shared mutable state,
mechanism links resolve to existing routes.

---

## 9. Out of scope (YAGNI)

- No palette/font replacement.
- No dark mode.
- No new product pages.
- No subscription/membership *build* (framing only; commerce wiring is its own spec).
- No real press logos until earned.

---

## 10. Success criteria

- Homepage reads as credible as dayguard to the "Invested Ritualist" without a
  single fabricated trust signal.
- Any visitor can answer "how does it actually work?" in ≤2 clicks from any pillar.
- Copy passes zp-compliance with zero medical-claim or naming flags.
- Lighthouse + `prefers-reduced-motion` respected; flat elevation preserved.

---

## Next step

Implementation plan via writing-plans skill (per-component, test-gated). Not
started in this session.
