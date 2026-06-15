# Hybrid Homepage — Implementation Plan

> Date: 2026-06-15
> Decision: Hybrid (keep sparse v2 editorial spine + inject honest, already-built orphan sections)
> Supersedes the "build new components" assumption in 2026-06-14 design direction.
> Repo: lumen-zen-lab · current branch feat/protocols-category-hub

---

## Ground truth (verified, not assumed)

- Live homepage `src/pages/Index.tsx` = sparse "v2" editorial:
  `AnnouncementBar → Header → HeroSection → ProtocolsShowcase → PhilosophyBand →
   DevicesSection → PhilosophyBand → FAQSection → SparseFooter`, separated by
   full-bleed `ImageDivider`s.
- 13 conversion sections already exist but are **orphaned** (built, then cut for v2).
- The orphans are **dark-themed** (`#111820`, `#1C2A3A`) — built for a prior darker
  homepage. v2 is **light** (`#F7F4F0` bg, `#1A1714` ink, `#6B5A4A` border, `#2ED8A8`
  teal). Reuse therefore requires a **restyle to light**, not a plain import.
- Pre-launch reality: no real customers/press/Trustpilot → proof-based orphans
  (`SocialProof`, `PressQuotesSection`, `TrustpilotStrip`, `AsSeenInStrip`) are
  **excluded** until earned (honest-trust rule).

## Scope — 4 orphans, restyled + composed

| Component | Lines | Role on page | Work |
|---|---|---|---|
| `TechCardsSection` | 61 | Modality/mechanism legibility (the moat) | dark→light restyle; rename card `"Red Light"` → `"Red Light Therapy"` |
| `ComparisonSection` | 284 | Clinic-vs-home objection | dark→light restyle (largest job) |
| `PriceGuaranteeSection` | 43 | 30-Day Protocol Guarantee | dark→light restyle |
| `TutorialStrip` | 99 | 3-step ritual, removes usage anxiety | dark→light restyle |

No new components. No proof fabrication.

## Token swap (dark → light v2)

| Dark (current) | Light (target) | Use |
|---|---|---|
| `#111820` | `#F7F4F0` (or `#ffffff` cards) | section / card bg |
| `#1C2A3A` (highlight) | `#ffffff` + `#6B5A4A` border, teal hairline | highlighted card |
| white text / `rgba(255,255,255,.x)` borders | `#1A1714` text / `#6B5A4A` borders | text + dividers |
| orange glow shadows | drop (flat elevation rule) | — |
| teal `#2ED8A8` | keep — already on-register | accent only |

## Proposed homepage order (after restyle)

```
Hero
  ImageDivider
TechCardsSection        ← inject (mechanism, your edge)
  ImageDivider
ProtocolsShowcase
  ImageDivider
ComparisonSection       ← inject (clinic vs home)
  ImageDivider
PhilosophyBand
  ImageDivider
DevicesSection
  ImageDivider
TutorialStrip           ← inject (3-step ritual)
PriceGuaranteeSection   ← inject (guarantee, pre-FAQ reassurance)
  ImageDivider
FAQSection
SparseFooter
```
Lazy-load the injected sections below the fold (match existing `DevicesSection`/`FAQSection` Suspense pattern).

## Compliance gate (must pass before merge)

1. Modality naming: read `~/zential-agent-engine/knowledge/products/modality-naming-standard.md`.
   Bare "Red Light" is a forbidden alias → "Red Light Therapy". Face Introducer = Cosmetic LED.
2. No medical claims in any restyled copy → run zp-compliance.
3. No em dashes in customer copy. No fabricated counts/press.
4. `prefers-reduced-motion` respected; flat elevation (no shadows) preserved.

## Build + review flow

1. New branch `feat/hybrid-homepage` off current.
2. Restyle 4 orphans → light tokens. Fix Red Light copy.
3. Compose into `Index.tsx` per order above (lazy below fold).
4. Register any new routes if introduced — N/A (sections only, no new pages).
5. `bun run typecheck` + `bun run build`.
6. Push → Vercel **preview** (do NOT promote to prod).
7. Visual review against the v2 light register + Sourcia quality bar before any prod promotion.

## Destination (measurable)

Homepage that converts the Invested Ritualist using only honest signals:
- every "how does it work?" answerable in ≤2 clicks (TechCards → /technology/*),
- zero fabricated proof,
- clinic-vs-home objection handled on-page,
- guarantee visible before FAQ.

## Out of scope

Proof sections until earned; new components; PDP changes; dark-mode; subscription commerce wiring.
