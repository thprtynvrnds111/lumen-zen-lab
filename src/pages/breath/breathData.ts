/**
 * Zential Breath — static data.
 * Copied verbatim from the DCLogic script in
 * design-reference/editorial/zential-breath.dc.html:
 *   patterns(mode) [with sessionEvening lifted to an argument],
 *   protocolDefs(), modeNames, and the per-mode duration chips.
 * No behavior here — pure data consumed by useBreathEngine.
 */

export type BreathMode = "meditate" | "restore" | "reset";

/** One phase of a breath cycle: label, orb scale, duration (s), progress fraction. */
export interface Phase {
  l: string;
  s: number;
  d: number;
  f: number;
}

export interface ProtocolSeg {
  mode: BreathMode;
  mins: number;
  evening?: boolean;
}

export interface ProtocolDef {
  role: string;
  num: string;
  name: string;
  desc: string;
  seq: ProtocolSeg[];
}

export const modeNames: Record<BreathMode, string> = {
  meditate: "Meditate",
  restore: "Restore",
  reset: "Reset",
};

/** Duration chips per act (home screen). meditate/restore 5·10·20, reset 2·3·5. */
export const chipMins: Record<BreathMode, number[]> = {
  meditate: [5, 10, 20],
  restore: [5, 10, 20],
  reset: [2, 3, 5],
};

/** Tone glide pitch range (Hz) — oscillator frequency at f=0 (exhale) vs f=1 (inhale). */
export const FREQ_MIN = 96;
export const FREQ_MAX = 144;
/** Tone glide gain range (linear) — nonzero floor so ramps never cross zero and click. */
export const GAIN_MIN = 0.015;
export const GAIN_MAX = 0.055;

export function patterns(mode: BreathMode, evening: boolean): Phase[] {
  if (mode === "meditate")
    return [
      { l: "", s: 1, d: 4.6, f: 1 },
      { l: "", s: 0.66, d: 5.8, f: 0 },
    ];
  if (mode === "restore")
    return evening
      ? [
          { l: "INHALE", s: 1, d: 4, f: 1 },
          { l: "EXHALE", s: 0.62, d: 6, f: 0 },
        ]
      : [
          { l: "INHALE", s: 1, d: 5.5, f: 1 },
          { l: "EXHALE", s: 0.62, d: 5.5, f: 0 },
        ];
  return [
    { l: "INHALE", s: 0.82, d: 1.5, f: 0.55 },
    { l: "INHALE AGAIN", s: 1, d: 1, f: 1 },
    { l: "EXHALE", s: 0.58, d: 6, f: 0 },
  ];
}

export function protocolDefs(): ProtocolDef[] {
  return [
    {
      role: "MORNING",
      num: "( 01 )",
      name: "Morning Return",
      desc: "A short release, then the resonance rate. Before the day begins.",
      seq: [
        { mode: "reset", mins: 2 },
        { mode: "restore", mins: 5 },
      ],
    },
    {
      role: "MIDDAY",
      num: "( 02 )",
      name: "The Interval",
      desc: "A downshift between tasks, then quiet observation.",
      seq: [
        { mode: "reset", mins: 3 },
        { mode: "meditate", mins: 5 },
      ],
    },
    {
      role: "EVENING",
      num: "( 03 )",
      name: "The Descent",
      desc: "The evening rate, four counts in and six out, then stillness before sleep.",
      seq: [
        { mode: "restore", mins: 10, evening: true },
        { mode: "meditate", mins: 10 },
      ],
    },
  ];
}
