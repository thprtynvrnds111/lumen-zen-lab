# Breath Sound-Healing Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the inaudible 96–144 Hz breath-glide tone in the `/breath` app with a per-mode healing-frequency drone (528/432/396 Hz) that is ON by default and swells in volume with the breath.

**Architecture:** All changes live in `src/pages/breath/`. `breathData.ts` gains a per-mode `droneHz` map and retuned gain constants. `useBreathEngine.ts`'s existing Web Audio graph (`ensureToneGraph` / `rampTone` / `teardownTone`) is rewritten from one pitch-gliding oscillator to three fixed-pitch oscillators with a breath-synced master-gain swell. `Breath.tsx` gains one corner label in the session screen. No new dependencies, no assets.

**Tech Stack:** React 18 hook (`useBreathEngine`), Web Audio API (OscillatorNode/GainNode), Vitest + Testing Library (`src/test/breath.test.tsx`).

**Spec:** `docs/superpowers/specs/2026-07-29-breath-sound-healing-design.md`

## Global Constraints

- Frequencies are EXACT and constant per session: meditate **528 Hz**, restore **432 Hz**, reset **396 Hz**. Pitch never ramps.
- Breath sync is **gain-only**: exhale floor **0.03** linear gain → inhale peak **0.10** (master). Sub-oscillator rides the master gain scaled by **0.35**.
- Tone defaults **ON** (`INITIAL.toneOn = true`); a saved `localStorage` `zb_cues` value always wins after mount.
- **No healing claims in any copy** — frequency number + neutral noun only (label text is exactly `<freq> HZ · THE TONE`). Never "healing", "DNA", "transformation", "chakra".
- All AudioContext access stays inside effects/handlers (SSR-stable initial render) — this is an existing invariant in `useBreathEngine.ts`, keep it.
- Engine timer-chain invariant (see `useBreathEngine.ts:261-267`): functions called from timers read state ONLY via `stateRef.current`; do not add render-scope deps.
- Working branch: `feat/the-system-page` in `~/lumen-zen-lab`. Run tests with `npx vitest run src/test/breath.test.tsx` (full suite: `npx vitest run`).

---

### Task 1: Default tone ON + saved-preference override

**Files:**
- Modify: `src/pages/breath/useBreathEngine.ts:91` (INITIAL.toneOn)
- Test: `src/test/breath.test.tsx`

**Interfaces:**
- Consumes: existing `zb_cues` localStorage format `{"tone":boolean,"pulse":boolean}` (load at `useBreathEngine.ts:437-441`, save at `423-429`).
- Produces: fresh visitors get `toneOn === true`; the home-screen CUES button renders `TONE · ON`. Task 2's tests rely on a fresh-visitor session auto-creating the audio graph.

- [ ] **Step 1: Write the failing tests**

Add to the `describe("Breath")` block in `src/test/breath.test.tsx` (outside the `tone glide` block):

```tsx
it("TONE cue reads ON for a fresh visitor", () => {
  renderBreath();
  expect(screen.getByRole("button", { name: "TONE · ON" })).toBeInTheDocument();
});

it("a saved zb_cues tone:false loads as OFF", () => {
  localStorage.setItem("zb_cues", JSON.stringify({ tone: false, pulse: false }));
  renderBreath();
  expect(screen.getByRole("button", { name: "TONE · OFF" })).toBeInTheDocument();
});
```

Then update the two existing `tone glide` tests, which assume the old off-by-default world:

Replace the test `"starting a session with tone OFF never constructs an AudioContext"` (line 118) with:

```tsx
it("a saved tone:false preference: session never constructs an AudioContext", async () => {
  localStorage.setItem("zb_cues", JSON.stringify({ tone: false, pulse: false }));
  const { ctor } = mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("5 MIN")[0]);
  await settle(700);
  await settle(900); // past the 800ms first-phase timer
  expect(ctor).not.toHaveBeenCalled();
});
```

Replace the test `"session + toggle tone ON creates the graph..."` (line 127) with:

```tsx
it("fresh visitor: session auto-creates the audio graph on the first phase", async () => {
  const { ctor } = mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("5 MIN")[0]); // no toggle click — default ON
  await settle(700);
  await settle(900); // runPhase(0) fires
  expect(ctor).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `cd ~/lumen-zen-lab && npx vitest run src/test/breath.test.tsx`
Expected: "TONE cue reads ON" FAILS (button reads `TONE · OFF`); "auto-creates the audio graph" FAILS (ctor never called). The two seeded-`zb_cues` tests PASS already (saved prefs load today) — that is fine; they pin the override behavior.

- [ ] **Step 3: Flip the default**

In `src/pages/breath/useBreathEngine.ts` line 91, change:

```ts
  toneOn: false,
```

to:

```ts
  toneOn: true,
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run src/test/breath.test.tsx`
Expected: PASS (all).

- [ ] **Step 5: Commit**

```bash
git add src/pages/breath/useBreathEngine.ts src/test/breath.test.tsx
git commit -m "feat(breath): tone cue defaults ON; saved zb_cues preference still wins"
```

---

### Task 2: Per-mode healing drone graph with breath-synced gain swell

**Files:**
- Modify: `src/pages/breath/breathData.ts:47-52` (constants)
- Modify: `src/pages/breath/useBreathEngine.ts` — `toneNodesRef` (line 117), `ensureToneGraph` (159-181), `rampTone` (186-203), `teardownTone` (218-255)
- Test: `src/test/breath.test.tsx`

**Interfaces:**
- Consumes: `stateRef.current.mode: BreathMode | null` (set by `startSession` before the first `runPhase`); existing call sites `updateToneForPhase(frac, durSecs)` at `useBreathEngine.ts:286` and `629` — their signatures DO NOT change.
- Produces:
  - `breathData.ts` exports: `droneHz: Record<BreathMode, number>` (`{ meditate: 528, restore: 432, reset: 396 }`), `GAIN_MIN = 0.03`, `GAIN_MAX = 0.10`, `SUB_GAIN_RATIO = 0.35`, `DETUNE_CENTS = 2`. `FREQ_MIN`/`FREQ_MAX` are deleted.
  - `toneNodesRef` shape becomes `{ oscs: OscillatorNode[]; gains: GainNode[]; master: GainNode } | null`.
  - Task 3 renders labels from `droneHz`.

- [ ] **Step 1: Extend the AudioContext mock, then write the failing tests**

In `mockAudioContext()` in `src/test/breath.test.tsx`, add a `detune` param to `makeOsc` and capture gain nodes:

```tsx
const oscillators: ReturnType<typeof makeOsc>[] = [];
const gains: ReturnType<typeof makeGain>[] = [];
function makeOsc() {
  return {
    type: "sine",
    frequency: param(),
    detune: param(),
    start: vi.fn(),
    stop: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
  };
}
function makeGain() {
  return { gain: param(), connect: vi.fn(), disconnect: vi.fn() };
}
```

…and have `createGain` push into `gains` the same way `createOscillator` pushes into `oscillators`. Return `{ ctor, oscillators, gains }`.

Add these tests inside the `tone glide` describe block:

```tsx
it("meditate session builds a 3-oscillator 528 Hz drone (two detuned + octave-down sub)", async () => {
  const { oscillators } = mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("5 MIN")[0]); // meditate
  await settle(700);
  await settle(900);
  expect(oscillators).toHaveLength(3);
  const freqs = oscillators.map((o) => o.frequency.setValueAtTime.mock.calls[0][0]);
  expect(freqs).toEqual([528, 528, 264]);
  expect(oscillators[0].detune.setValueAtTime.mock.calls[0][0]).toBe(2);
  expect(oscillators[1].detune.setValueAtTime.mock.calls[0][0]).toBe(-2);
});

it("reset session drones at 396 Hz", async () => {
  const { oscillators } = mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("2 MIN")[0]); // reset chip
  await settle(700);
  await settle(900);
  expect(oscillators.map((o) => o.frequency.setValueAtTime.mock.calls[0][0])).toEqual([396, 396, 198]);
});

it("phase changes ramp gain, never frequency", async () => {
  const { oscillators, gains } = mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("5 MIN")[0]);
  await settle(700);
  await settle(900); // phase 0 — graph created + first ramp
  for (const o of oscillators) {
    expect(o.frequency.linearRampToValueAtTime).not.toHaveBeenCalled();
  }
  expect(gains.some((g) => g.gain.linearRampToValueAtTime.mock.calls.length > 0)).toBe(true);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/test/breath.test.tsx`
Expected: new tests FAIL — 1 oscillator not 3, frequency ramped.

- [ ] **Step 3: Replace the constants in breathData.ts**

Replace lines 47–52 of `src/pages/breath/breathData.ts`:

```ts
/** Per-mode drone frequency (Hz). Fixed for the whole session — the named frequency IS the feature. */
export const droneHz: Record<BreathMode, number> = {
  meditate: 528,
  restore: 432,
  reset: 396,
};
/** Breath-swell master gain range (linear) — exhale floor / inhale peak. Nonzero floor so ramps never click. */
export const GAIN_MIN = 0.03;
export const GAIN_MAX = 0.1;
/** Octave-down sub oscillator gain, as a fraction of master. */
export const SUB_GAIN_RATIO = 0.35;
/** Chorus detune (± cents) for the two unison oscillators. */
export const DETUNE_CENTS = 2;
```

- [ ] **Step 4: Rewrite the audio graph in useBreathEngine.ts**

Update the import (line 17-28): drop `FREQ_MAX, FREQ_MIN`, add `droneHz, SUB_GAIN_RATIO, DETUNE_CENTS` (keep `GAIN_MAX, GAIN_MIN`).

Replace the `toneNodesRef` declaration (lines 116-117):

```ts
  // The live drone graph (3 oscs -> [subGain] -> master -> destination), or null when torn down.
  const toneNodesRef = useRef<{ oscs: OscillatorNode[]; gains: GainNode[]; master: GainNode } | null>(null);
```

Replace `ensureToneGraph` (lines 157-181):

```ts
  // Lazily creates the drone graph on first enable (session start with tone on,
  // or a mid-session toggle-on). Three sines at the mode's healing frequency:
  // two detuned ±DETUNE_CENTS for a soft chorus, one an octave down for body.
  // Pitch is fixed for the session; only gain moves with the breath.
  const ensureToneGraph = useCallback((frac: number) => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = audioRef.current || (audioRef.current = new Ctx());
      if (ctx.state === "suspended") ctx.resume();
      if (toneNodesRef.current) return;
      const mode = stateRef.current.mode;
      if (!mode) return;
      const base = droneHz[mode];
      const t = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(GAIN_MIN + (GAIN_MAX - GAIN_MIN) * frac, t);
      master.connect(ctx.destination);
      const sub = ctx.createGain();
      sub.gain.setValueAtTime(SUB_GAIN_RATIO, t);
      sub.connect(master);
      const mk = (freq: number, cents: number, dest: AudioNode) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        osc.detune.setValueAtTime(cents, t);
        osc.connect(dest);
        osc.start(t);
        return osc;
      };
      const oscs = [
        mk(base, DETUNE_CENTS, master),
        mk(base, -DETUNE_CENTS, master),
        mk(base / 2, 0, sub),
      ];
      toneNodesRef.current = { oscs, gains: [master, sub], master };
    } catch {
      /* audio unsupported — ignore */
    }
  }, []);
```

Replace `rampTone` (lines 183-203):

```ts
  // Ramps the master gain to the target breath fraction over durSecs, synced to
  // the orb. Pitch never moves. Cancels any in-flight ramp so phases never stack.
  const rampTone = useCallback((frac: number, durSecs: number) => {
    const ctx = audioRef.current;
    const nodes = toneNodesRef.current;
    if (!ctx || !nodes) return;
    try {
      const t = ctx.currentTime;
      const gainTarget = GAIN_MIN + (GAIN_MAX - GAIN_MIN) * frac;
      nodes.master.gain.cancelScheduledValues(t);
      nodes.master.gain.setValueAtTime(nodes.master.gain.value, t);
      nodes.master.gain.linearRampToValueAtTime(gainTarget, t + durSecs);
    } catch {
      /* ignore */
    }
  }, []);
```

Update `teardownTone` (lines 216-255) to fade the master and stop all oscillators — replace its body after the early-return guard:

```ts
    try {
      const t = ctx.currentTime;
      nodes.master.gain.cancelScheduledValues(t);
      nodes.master.gain.setValueAtTime(nodes.master.gain.value, t);
      nodes.master.gain.linearRampToValueAtTime(0.0001, t + fadeSecs);
    } catch {
      /* ignore */
    }
    toneFadeTimer.current = setTimeout(
      () => {
        for (const osc of nodes.oscs) {
          try {
            osc.stop();
          } catch {
            /* ignore */
          }
          try {
            osc.disconnect();
          } catch {
            /* ignore */
          }
        }
        for (const g of nodes.gains) {
          try {
            g.disconnect();
          } catch {
            /* ignore */
          }
        }
      },
      Math.max(0, fadeSecs) * 1000,
    );
```

`updateToneForPhase` (lines 205-214) is unchanged — same signature, same call sites.

- [ ] **Step 5: Run tests to verify all pass**

Run: `npx vitest run src/test/breath.test.tsx`
Expected: PASS (all, including Task 1's).

- [ ] **Step 6: Commit**

```bash
git add src/pages/breath/breathData.ts src/pages/breath/useBreathEngine.ts src/test/breath.test.tsx
git commit -m "feat(breath): per-mode healing drone (528/432/396 Hz) with breath-synced gain swell"
```

---

### Task 3: Session drone label

**Files:**
- Modify: `src/pages/breath/useBreathEngine.ts` (renderVals return object, ~line 570-644)
- Modify: `src/pages/breath/Breath.tsx` (session screen, after the `v.isRestore` label block at ~line 510-512)
- Test: `src/test/breath.test.tsx`

**Interfaces:**
- Consumes: `droneHz` from `breathData.ts` (Task 2); `st.mode`, `st.toneOn`, `st.screen` via the hook's render pass.
- Produces: renderVal `droneText: string` — `"528 HZ · THE TONE"` style, empty string when tone off or no mode. Copy rule: frequency number + `THE TONE` only, no healing language.

- [ ] **Step 1: Write the failing tests**

```tsx
it("session shows the mode's drone label when tone is on", async () => {
  mockAudioContext();
  renderBreath();
  fireEvent.click(screen.getAllByText("5 MIN")[0]); // meditate
  await settle(700);
  expect(screen.getByText("528 HZ · THE TONE")).toBeInTheDocument();
});

it("no drone label when tone preference is off", async () => {
  localStorage.setItem("zb_cues", JSON.stringify({ tone: false, pulse: false }));
  renderBreath();
  fireEvent.click(screen.getAllByText("2 MIN")[0]); // reset
  await settle(700);
  expect(screen.queryByText(/HZ · THE TONE/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/test/breath.test.tsx`
Expected: first new test FAILS (label absent).

- [ ] **Step 3: Add the renderVal and the label**

In `useBreathEngine.ts`, add to the returned object (next to `toneOn` at line 638):

```ts
    droneText: st.mode && st.toneOn ? droneHz[st.mode] + " HZ · THE TONE" : "",
```

In `Breath.tsx`, directly after the `v.isRestore` label block (lines 510-512), add:

```tsx
              {v.droneText && (
                <div style={{ position: "absolute", bottom: "12.5%", left: 0, right: 0, textAlign: "center", fontWeight: 300, fontSize: "9.5px", letterSpacing: "0.24em", color: "rgba(46,216,168,0.55)", paddingLeft: "0.24em" }}>{v.droneText}</div>
              )}
```

(Same typographic recipe as the resonance label; teal instead of gold so the two Hz lines read as different facts.)

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run src/test/breath.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/breath/useBreathEngine.ts src/pages/breath/Breath.tsx src/test/breath.test.tsx
git commit -m "feat(breath): session drone-frequency label"
```

---

### Task 4: Full-suite verification

**Files:**
- None modified — verification only.

**Interfaces:**
- Consumes: Tasks 1-3 complete.
- Produces: green full suite; branch ready for preview deploy + real-phone check.

- [ ] **Step 1: Run the full lumen test suite**

Run: `cd ~/lumen-zen-lab && npx vitest run`
Expected: PASS, zero failures. If anything outside `breath.test.tsx` fails, STOP and investigate — do not commit over a red suite.

- [ ] **Step 2: Type-check + lint**

Run: `npx tsc --noEmit && npx eslint src/pages/breath src/test/breath.test.tsx`
Expected: clean. (Notably: no lingering `FREQ_MIN`/`FREQ_MAX` imports.)

- [ ] **Step 3: Manual verification note**

Do NOT deploy in this task. Report to operator: preview deploy + listen on a real phone (speaker, not headphones) and desktop before production — per the device-verification rule. iPhone hardware silent switch mutes Web Audio; that is expected, not a bug.
