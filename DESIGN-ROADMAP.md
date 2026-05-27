# Zential Pure — Storefront Editorial Roadmap

> **Canonical doc:** `~/zential-agent-engine/knowledge/brand/editorial-roadmap-q3-2026.md`
>
> This file is a slimmed-down working copy that lives next to the code.
> Read this every Monday before shipping the week's task.

## Cadence Rule

**1 design ship per week. No exceptions. No double-ups.**

If a week slips → push to next week. Don't compound.

## 12-Week Sprint

| Week | Task | Effort | Files touched |
|------|------|--------|---------------|
| 1 | PDP REBRAND (10 /product/* pages) | 1.5d | src/pages/ProductDetail.tsx + new editorial PDP shell |
| 2 | /PRIMER route (Klaviyo gate) | 4h | src/pages/Primer.tsx + Klaviyo subscribe wire |
| 3 | PAGE TRANSITIONS (200ms fade-up) | 2h | src/App.tsx + framer-motion |
| 4 | JOURNAL ARTICLE TEMPLATE + migrate 7 | 6h+ | src/pages/Journal*.tsx |
| 5 | TECHNOLOGY PAGES (/technology/* × 6) | 1d | src/pages/Tech*.tsx |
| 6 | /LAB page (brand methodology) | 5h | src/pages/Lab.tsx (new) |
| 7 | COMPARE PAGES (/compare/* × 2) | 1d | src/pages/Compare*.tsx |
| 8 | CHECKOUT FLOW POLISH (Shopify theme) | 3h | shopify theme branch |
| 9 | SCROLL-TRIGGERED REVEALS (/protocols/*) | 3h | src/pages/ProtocolDetail.tsx |
| 10 | PROTOCOL CARD ANIMATION | 1h | src/components/zential/ProtocolCardPreview.tsx |
| 11 | UTILITY PAGES MIGRATE (Support/Ship/FAQ etc) | 4h | src/pages/{Support,Shipping,Returns,FAQ,Privacy,Terms}.tsx |
| 12 | RETRO + Q4 PLAN | 1.5d | this file + canonical doc |

## Parallel Tracks (not week-blocking)

- **Photography:** book Week 2 or 3 shoot. 25 photos. ~€1000.
- **Lab writing:** 3h drafting whenever inspired. Target Week 6 ship.

## Weekly Pattern

```
MON  ship the week's task → prod by EOD
TUE  post IG carousel via /god (auto via Composio)
WED  measure t+24h: god-conversion-log.md
THU  measure + reply to DMs
FRI  git review ritual (20 min) — merge accumulated diffs
SAT  optional: 1 day engineering cap (engine work)
SUN  read week's metrics + confirm next Monday's scope
```

## Stop-Loss

Halt if any:
1. 2 weeks slipped in a row → re-scope
2. Eng:ship ratio inverts → pause engine 14d
3. Klaviyo list < 5/week growth for 3 weeks → audit /primer
4. /product/* add-to-cart drops below baseline 14d → pause new ships

## Read Before Shipping Each Monday

1. This file (current week's row)
2. `god-conversion-log.md` (last week's metrics)
3. `knowledge/brand/voice-and-tone.md` (voice gate)
4. `knowledge/brand/voice-banned-phrases.md` (auto-reject list)
5. `knowledge/products/modality-naming-standard.md` (FI compliance)

## After Each Ship

```bash
cd ~/lumen-zen-lab
git add -A src/
git commit -m "feat(week-N): <task name>"
vercel deploy --prod --yes
```

Then post IG via /god skill.

---

*Locked 2026-05-27. Review gate 2026-08-26.*
