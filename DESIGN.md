# Zential Pure — Design System

## Color Tokens (HSL — Tailwind CSS variables)

| Token | HSL | Hex | Role |
|-------|-----|-----|------|
| `--background` | 240 5% 96% | #f5f5f7 | Apple fog canvas — page background |
| `--foreground` | 240 3% 12% | #1d1d1f | Body copy |
| `--card` | 0 0% 100% | #ffffff | Card surfaces |
| `--primary` | 24 90% 64% | #f69251 | Tangerine — sole CTA/action color |
| `--accent` | 160 67% 51% | #2ED8A8 | Teal — secondary identity only |
| `--brand-gold` | — | #C6A07C | Premium warmth, highlight accents |
| `--brand-ink` | — | #1d1d1f | Deep headings |
| `--border` | 240 9% 92% | — | Borders, inputs |
| `--muted-foreground` | 0 0% 39% | — | Captions, secondary labels |

**Dark mode:** not currently implemented.

## Typography

- **Sans:** DM Sans — body copy, UI labels, navigation
- **Serif:** Lora — editorial headers, pull quotes, ritual/science sections
- **Tracking scale:**
  - Display: `-2.11px`
  - Heading LG: `-0.9px`
  - Heading: `-0.6px`
  - Heading SM: `-0.36px`
- Tight/negative tracking throughout — Apple-influenced, not editorial-loose

## Spacing & Layout

- `--radius`: 1.5rem (24px) — cards
- Pill buttons: 28px radius (9999px)
- Max content width: ~1280px
- Sections breathe with generous vertical padding (py-16 to py-24)

## Component Patterns

- **AnnouncementBar** — single line, full-width, teal background
- **Header** — sticky, minimal nav, transparent-to-white scroll
- **HeroSection** — editorial headline + single CTA
- **TrustStrip** — icon + label row (free shipping, guarantee, clinical)
- **Cards** — white surface, 24px radius, subtle shadow
- **Buttons** — primary: tangerine pill, full-width on mobile; secondary: outlined
- **StatsBar** — dark or fog background, large number + label

## Framework

- Vite + React + TypeScript
- Tailwind CSS (shadcn/ui base)
- SSR via entry-server.tsx + entry-client.tsx
- Lazy-loaded sections below the fold

## Current Issues to Address

- Possible inconsistency between brand register (luxury/editorial) and typical Tailwind SaaS defaults
- Font loading strategy (DM Sans + Lora) may cause FOUT
- Need to verify spacing rhythm at breakpoints
- Motion/animation usage needs audit against reduced-motion preference
