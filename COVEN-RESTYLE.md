# Coven Restyle — page translation spec (2026-08-07)

Approved by the founder on the live homepage. Every storefront page moves to this
grammar. Canonical example: `src/pages/Storefront.tsx` (read it first, copy its
idioms). Chrome (Header, AnnouncementBar, SparseFooter, PageShell) is already
restyled — do not touch those four files.

## The grammar (from alexcoven.com/work/spritzi, translated to Zential green)

- **Canvas**: white `#FFFFFF`. No fog `#F7F4F0`, no cream, no dark page bands.
  Section separation = hairlines `rgba(20,20,20,0.10)` + whitespace, not colour blocks.
  The ONLY tinted section background allowed is mint `#F4FBF8` (sparingly, one
  band per page max).
- **Ink**: text `#141414`; secondary `#5A5A5A`; muted labels `#8E8E8E`.
- **Green**: CTA pill teal `#2ED8A8` (hover `#1BAF86`), links/labels/numbers
  deep emerald `#0E7A54`. Old gold `#C6A07C` and warm brown `#6B5A4A` are DEAD —
  replace with `#8E8E8E` (labels) or emerald (accents).
- **Type**: single grotesque, Switzer (already the default `font-sans`).
  - Display/headings: `font-sans font-light tracking-[-0.03em]` (or -0.025em),
    sizes via clamp — see Storefront.tsx.
  - NO `font-serif`, NO `font-[Lora]`, NO italic display. Replace every serif
    italic heading with Switzer light.
  - Labels: `text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]`.
  - `font-mono` labels → same sans label style.
- **Buttons**: keep pill radius. Primary = teal pill exactly as `PILL_ACTION` in
  Storefront.tsx. Ghost = `PILL_GHOST` (ink hairline border, hover emerald).
- **Cards/blocks**: white, hairline borders, sharp corners (drop `rounded-[24px]`
  → `rounded-none` or small). Hover: `-translate-y` stays fine, shadows subtle.
- **Imagery**: keep every existing product/lifestyle image and its alt text.
  Bright coven stills live in `src/assets/coven/` (hero-fi-landscape,
  hero-fi-portrait, collection-still, texture-green, belt-bright) — reuse where
  a page needs an editorial band, don't force them everywhere.
- **Dark sections** (`#070A0E`, `#1A1714` bands): translate to white + hairlines.
  Exception: a page may keep ONE dark statement band only if it is the page's
  hero image overlay (text over photo), like Storefront's texture interlude.
- **Grain overlays** (`GRAIN` svg noise): delete on white sections.

## Hard rules

1. **Copy is frozen.** Customer-facing text, prices, claims, alt texts, SEO
   titles/descriptions/jsonLd: byte-for-byte identical. You are re-skinning,
   not rewriting. (Compliance-cleared set; changing a word reopens the gate.)
2. All routing, data fetching, Shopify logic, i18n keys, tracking, tests,
   comments: untouched unless a comment describes a colour you changed.
3. Never name LED/light therapy as a Face Introducer modality
   (modality-naming-standard). You won't hit this if rule 1 holds.
4. Don't touch: Header.tsx, AnnouncementBar.tsx, SparseFooter.tsx, PageShell.tsx,
   Storefront.tsx, anything under `src/pages/editorial/` unless your task says so.
5. Keep diffs surgical: className/style swaps, not component rewrites, unless a
   section is a dark band that must become a white hairline section.
6. After your files: run `npx tsc --noEmit` scoped mentally — no new TS errors
   (unused imports you orphaned must be removed).

## Mechanical translation table

| Old | New |
|---|---|
| `bg-[#F7F4F0]`, `bg-[#EDEAE6]`, `bg-[#F1F5F3]`, fog gradients | `bg-white` |
| `bg-[#070A0E]`, `bg-[#1A1714]` section bands | `bg-white` + `border-y border-[rgba(20,20,20,0.10)]` (text colours flip to ink set) |
| `text-[#1A1714]` | `text-[#141414]` |
| `text-[#F7F4F0]…` (on converted dark bands) | ink set: `#141414` / `#5A5A5A` / `#8E8E8E` |
| `text-[#C6A07C]`, `text-[#6B5A4A]` | `text-[#8E8E8E]` (labels) or `#0E7A54` (accent) |
| `text-[#157A5C]` | `text-[#0E7A54]` |
| `border-[rgba(26,23,20,…)]` | `border-[rgba(20,20,20,0.10)]` |
| `border-[rgba(247,244,240,…)]` (on converted bands) | `border-[rgba(20,20,20,0.10)]` |
| `font-serif italic`, `font-[Lora] italic` headings | `font-sans font-light tracking-[-0.025em]` |
| `font-mono` labels | sans label style above |
| gold hairline `bg-[#C6A07C]` | `bg-[#0E7A54]` or drop |
| rounded-[14px]/[24px] cards | rounded-none |

Done = page renders white/ink/green, no serif, no fog, no gold, copy identical.
