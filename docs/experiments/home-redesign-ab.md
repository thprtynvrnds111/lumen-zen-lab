# Experiment: Home Redesign A/B (home_redesign)

**Status:** Running · **Launched:** 2026-06-23 · **URL:** `/`

## Hypothesis
Because the Claude Design storefront is a bolder, more editorial homepage, we believe
serving it at `/` will increase homepage→PDP click-through and add-to-cart rate vs the
current homepage, for new and returning visitors.

## Variants (50/50, sticky per visitor via `zp_home_ab` cookie)
- **A (control):** current homepage — `src/pages/Index.tsx`
- **B (treatment):** Claude Design storefront — `src/pages/Storefront.tsx` (also live standalone at `/storefront`)

## Mechanism
- Edge middleware (`middleware.js`) assigns `zp_home_ab=a|b` on first `/` visit and serves
  the matching **prerendered** HTML at `/` (A=`/`, B=`/storefront`) — no hydration flicker.
- `src/pages/HomeAB.tsx` reads the cookie, renders the matching variant, reports impression.
- Bots are excluded (handled by the SEO-snapshot branch before A/B).

## Metrics
- **Primary:** add-to-cart / initiate-checkout rate
- **Secondary:** homepage→instrument PDP click-through
- **Guardrail:** bounce rate
- **Tracking:** GA4 `experiment_impression` event + `home_variant` user-property
  (segments downstream events incl. purchase); Meta pixel `HomeVariant` custom event.

## Caveat
Pre-launch / low traffic — will not reach p<0.05 quickly. Read direction qualitatively;
let data accrue before calling a winner. Do not peek-and-stop.

## Decision
- [ ] Reached sample size
- [ ] Winner: ____  ·  primary metric Δ: ____  ·  p: ____
- [ ] Action: promote B to `/` permanently / keep A / iterate
