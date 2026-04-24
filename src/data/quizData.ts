// Skin Ritual Quiz — recommendation engine
// Maps quiz answers → recommended device + ritual + reasoning

export type ConcernId = "lift" | "tone" | "eyes" | "texture" | "body";
export type AgeId = "20s" | "30s" | "40s" | "50plus";
export type SkinId = "dry" | "combo" | "oily" | "sensitive";
export type TimeId = "3min" | "5min" | "10min";
export type GoalId = "prevent" | "maintain" | "transform";

export interface QuizAnswers {
  concern?: ConcernId;
  age?: AgeId;
  skin?: SkinId;
  time?: TimeId;
  goal?: GoalId;
  email?: string;
}

export interface Recommendation {
  primaryHandle: string;
  primaryName: string;
  primaryReason: string;
  ritualHandles: string[]; // additional ritual companions
  ritualHeadline: string;
  ritualSubcopy: string;
  protocol: { day: string; action: string }[];
  expectedTimeline: string;
  bundlePitch: string;
}

export const quizSteps = [
  {
    id: "concern" as const,
    label: "Primary concern",
    question: "What does your skin keep telling you?",
    sub: "Pick the one that feels most true today.",
    options: [
      { id: "lift" as ConcernId, label: "Lift & contour loss", desc: "Jawline softening, cheek descent" },
      { id: "tone" as ConcernId, label: "Dull tone & uneven texture", desc: "Lacking glow, surface roughness" },
      { id: "eyes" as ConcernId, label: "Eyes & fine lines", desc: "Crow's feet, puffiness, dark circles" },
      { id: "texture" as ConcernId, label: "Pores & elasticity", desc: "Loose feel, visible pores" },
      { id: "body" as ConcernId, label: "Body firmness", desc: "Arms, abdomen, thighs" },
    ],
  },
  {
    id: "age" as const,
    label: "Life stage",
    question: "Where are you in the timeline?",
    sub: "There's no wrong answer — context shapes the protocol.",
    options: [
      { id: "20s" as AgeId, label: "20s", desc: "Prevention era" },
      { id: "30s" as AgeId, label: "30s", desc: "First signs era" },
      { id: "40s" as AgeId, label: "40s", desc: "Architecture era" },
      { id: "50plus" as AgeId, label: "50+", desc: "Restoration era" },
    ],
  },
  {
    id: "skin" as const,
    label: "Skin type",
    question: "How does your skin behave by midday?",
    sub: "We adjust intensity recommendations based on this.",
    options: [
      { id: "dry" as SkinId, label: "Dry", desc: "Tight, sometimes flaky" },
      { id: "combo" as SkinId, label: "Combination", desc: "Oily T-zone, dry cheeks" },
      { id: "oily" as SkinId, label: "Oily", desc: "Shines, larger pores" },
      { id: "sensitive" as SkinId, label: "Sensitive / reactive", desc: "Flushes, easily irritated" },
    ],
  },
  {
    id: "time" as const,
    label: "Time honesty",
    question: "How much time do you actually have?",
    sub: "Rituals only work if they fit. Be honest.",
    options: [
      { id: "3min" as TimeId, label: "3 minutes", desc: "I want efficiency" },
      { id: "5min" as TimeId, label: "5 minutes", desc: "I can commit daily" },
      { id: "10min" as TimeId, label: "10+ minutes", desc: "I want the full ritual" },
    ],
  },
  {
    id: "goal" as const,
    label: "North star",
    question: "What does success look like in 90 days?",
    sub: "This shapes the intensity of the protocol.",
    options: [
      { id: "prevent" as GoalId, label: "Prevent what's coming", desc: "Stay ahead of the timeline" },
      { id: "maintain" as GoalId, label: "Maintain & enhance", desc: "Hold and refine current state" },
      { id: "transform" as GoalId, label: "Visible transformation", desc: "I want measurable change" },
    ],
  },
];

const protocolByGoal: Record<GoalId, { day: string; action: string }[]> = {
  prevent: [
    { day: "Week 1–2", action: "3 sessions/week to build tolerance" },
    { day: "Week 3–4", action: "Daily 5-min ritual, low-medium intensity" },
    { day: "Day 30+", action: "Maintenance: 4–5 sessions/week" },
  ],
  maintain: [
    { day: "Week 1", action: "Daily ritual, medium intensity" },
    { day: "Week 2–4", action: "Layer in companion device 2x/week" },
    { day: "Day 30+", action: "Sustain. Add bi-weekly intensive sessions" },
  ],
  transform: [
    { day: "Week 1–2", action: "Daily ritual, gradual ramp to high intensity" },
    { day: "Week 3–6", action: "2 modalities daily, 8 min total" },
    { day: "Day 60–90", action: "Full stack — measure progress with weekly photos" },
  ],
};

export function getRecommendation(a: QuizAnswers): Recommendation {
  const concern = a.concern ?? "lift";
  const goal = a.goal ?? "maintain";
  const time = a.time ?? "5min";

  // Primary device by concern
  const primaryByConcern: Record<ConcernId, { handle: string; name: string; reason: string }> = {
    lift: {
      handle: "portable-ems-microcurrent-facial-beauty-device",
      name: "Frame Pulse Activator",
      reason: "Combines EMS + microcurrent — the only at-home stack that addresses both muscle tone and structural firmness, the two pillars of contour.",
    },
    tone: {
      handle: "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening",
      name: "Frequency Wand Pro",
      reason: "Red light at 630nm + thermal — the clinical pairing for cellular renewal and even tone. The most studied modality combination for radiance.",
    },
    eyes: {
      handle: "eye-massage",
      name: "Eye Activator",
      reason: "The periorbital area needs precision frequencies you cannot get from a full-face device. Dedicated 3MHz vibration + warmth designed for the orbital bone.",
    },
    texture: {
      handle: "lifting-and-tightening-face-introducer",
      name: "Skin Pulse",
      reason: "EMS-led device tuned for elasticity. Stimulates the deeper tissue layer where pore structure and firmness originate.",
    },
    body: {
      handle: "color-light-import-micro-current-vibration-massager",
      name: "Body Lift",
      reason: "Body tissue requires larger surface coverage and deeper penetration. Microcurrent + vibration calibrated for arms, abdomen, and thighs.",
    },
  };

  // Ritual companions — scale with time commitment + goal
  const ritualByConcern: Record<ConcernId, string[]> = {
    lift: ["lifting-and-tightening-face-introducer", "eye-massage"],
    tone: ["portable-ems-microcurrent-facial-beauty-device", "lifting-and-tightening-face-introducer"],
    eyes: ["red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening", "portable-ems-microcurrent-facial-beauty-device"],
    texture: ["red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening", "eye-massage"],
    body: ["portable-ems-microcurrent-facial-beauty-device"],
  };

  const ritualSize = time === "3min" ? 0 : time === "5min" ? 1 : 2;
  const ritualHandles = ritualByConcern[concern].slice(0, ritualSize);

  const goalCopy: Record<GoalId, { headline: string; sub: string; timeline: string; pitch: string }> = {
    prevent: {
      headline: "Your prevention protocol",
      sub: "The earliest interventions compound the most. You're building infrastructure your future skin will thank you for.",
      timeline: "Texture refinement: 2–3 weeks. Structural reinforcement: 60–90 days.",
      pitch: "Start with the device. Add companions as the practice becomes second nature.",
    },
    maintain: {
      headline: "Your maintenance ritual",
      sub: "You've earned where you are. This protocol holds it — and quietly enhances week by week.",
      timeline: "Visible glow: 7–14 days. Sustained firmness: 4–6 weeks of consistent use.",
      pitch: "The ritual set is calibrated for your goal — single device works, but the pairing is what compounds.",
    },
    transform: {
      headline: "Your transformation protocol",
      sub: "You're not here for incremental. This is the full stack — what we'd recommend if budget weren't a factor.",
      timeline: "Measurable change: 30 days. Full transformation: 60–90 days of daily practice.",
      pitch: "Go in with the complete ritual. Skipping companions means skipping ~40% of compounded effect.",
    },
  };

  const primary = primaryByConcern[concern];
  const copy = goalCopy[goal];

  return {
    primaryHandle: primary.handle,
    primaryName: primary.name,
    primaryReason: primary.reason,
    ritualHandles,
    ritualHeadline: copy.headline,
    ritualSubcopy: copy.sub,
    protocol: protocolByGoal[goal],
    expectedTimeline: copy.timeline,
    bundlePitch: copy.pitch,
  };
}
