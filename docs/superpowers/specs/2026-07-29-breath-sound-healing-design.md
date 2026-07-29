# Breath Sound-Healing Layer — Design

**Date:** 2026-07-29
**Status:** Approved (operator, 2026-07-29)
**Scope:** `/breath` app only — `src/pages/breath/{useBreathEngine.ts, breathData.ts, Breath.tsx}` + tests.

## Problem

The Breath app's audio cue is effectively inaudible in practice:

1. The only frequency users *see* is the "0.09 HZ · THE RESONANCE RATE" label — a breathing
   rate, not a sound. Users expect sound and hear none.
2. The audible tone that does exist ships **off by default** (`toneOn: false`) behind a small
   `TONE · OFF` button on the session screen.
3. Even when enabled, the tone glides 96–144 Hz at gain 0.015–0.055. Phone speakers roll off
   sharply below ~200 Hz, so on a phone (the primary device) the tone is nearly silent.

## Goal

An audible, calm, per-mode healing-frequency drone that swells with the breath, on by default,
correct on phone speakers, with no new dependencies or assets.

## Design

### 1. Sound

- **Per-mode fixed drone frequency:**
  | Mode | Frequency |
  |---|---|
  | Meditate | 528 Hz |
  | Restore | 432 Hz |
  | Reset | 396 Hz |
- Pitch is **constant** for the whole session — the named frequency is the feature; it never
  bends. (Replaces the old 96–144 Hz pitch glide.)
- **Voice:** three sine oscillators per session:
  - two at the mode frequency, detuned ±2 cents (soft chorus shimmer, removes sterile-beep feel);
  - one at half the mode frequency (octave-down body for headphones), at lower gain.
- **Breath sync = volume swell, not pitch:** master gain ramps with the breath fraction using
  the existing per-phase ramp timing (same call sites as the current pitch glide), so the swell
  tracks the orb exactly. Exhale floor ≈ 0.03 linear gain → inhale peak ≈ 0.10. Sub-oscillator
  scales proportionally at roughly a third of master gain.
- 396–528 Hz sits comfortably inside phone-speaker response — audible where the old tone was not.

### 2. Engine integration

- `breathData.ts`: retire `FREQ_MIN`/`FREQ_MAX`; add `droneHz: Record<BreathMode, number>` and
  new gain constants (`GAIN_MIN`/`GAIN_MAX` re-tuned to the swell range above, sub-gain ratio).
- `useBreathEngine.ts`:
  - `ensureToneGraph(frac)` → `ensureToneGraph(mode, frac)`: builds the 3-oscillator graph at
    the mode's frequency; oscillator frequencies set once at creation.
  - `rampTone` / `updateToneForPhase`: ramp **gain only**; frequency ramp code removed.
  - `teardownTone` fade/stop/disconnect logic unchanged (now stops three oscillators).
- **Default ON:** `INITIAL.toneOn = true`. Saved preference in `localStorage` (`zb_cues`) still
  wins on load — a user who turned tone off stays off. The session-start tap satisfies browser
  autoplay policy; existing `ctx.resume()` handling is kept.

### 3. UI + copy

- Session screen gains a per-mode corner label in the existing label style
  (cf. the current resonance-rate label), e.g. `528 HZ · THE TONE`.
- **No healing claims anywhere** — no "DNA repair", "transformation", "chakra", "healing"
  language. Frequency number + neutral noun only. This is a hard rule (prohibited-claims policy
  + calm-authority voice).
- Existing `TONE · ON/OFF` toggle unchanged in placement and behavior; it now reads ON by default.

### 4. Known limits (accepted, not solved)

- iPhone hardware silent switch mutes Web Audio in Safari; nothing a web page can do.
  Optional one-line first-session hint ("sound on · raise ringer") may be added at implementation
  time if it fits the visual style; not required.
- Audio continues in a backgrounded tab — desired behavior, unchanged.

### 5. Testing

- Extend `src/test/breath.test.tsx`:
  - tone defaults ON for a fresh visitor;
  - saved `zb_cues` with `tone:false` overrides the default;
  - graph is created with the correct frequency per mode;
  - gain (not frequency) is ramped on phase change.
- Manual real-phone check on a preview deploy before production (device-verification rule).

## Rejected alternatives

- **Pre-rendered audio loops** — cannot sync loop tempo to live breath phase; adds asset weight.
- **Binaural beats** — requires headphones; phone-speaker users (the complaint) hear nothing special.
- **Full synth stack (filters/reverb/noise pads)** — richer but heavier code and CPU; YAGNI for v1.
