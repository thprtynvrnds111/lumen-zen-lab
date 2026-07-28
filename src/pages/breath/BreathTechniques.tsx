import { EditorialLayout } from "../editorial/EditorialLayout";
import { EditorialNewsletter } from "../editorial/EditorialNewsletter";

/**
 * /breath/techniques — a reference card for the named breathing patterns.
 *
 * Built as a save-and-return page, not an essay: every pattern states its
 * count, what it is used for, and its honest limit. No pattern is claimed to
 * treat anything; the framing throughout is "practice", never "treatment".
 */

interface Technique {
  name: string;
  count: string;
  use: string;
  how: string[];
  limit: string;
}

const TECHNIQUES: Technique[] = [
  {
    name: "The physiological sigh",
    count: "2 inhales · 1 long exhale",
    use: "The fastest of these to do, and the easiest to remember when you are already tense.",
    how: [
      "Inhale through the nose until the lungs feel comfortably full.",
      "Add a second, shorter inhale on top of the first.",
      "Let a slow, long exhale out through the mouth.",
      "One to three rounds is the whole practice.",
    ],
    limit:
      "Researchers have studied cyclic sighing as a voluntary way to influence arousal. It is a practice, not a treatment, and it does not resolve the thing that made you tense.",
  },
  {
    name: "Box breathing",
    count: "4 · 4 · 4 · 4",
    use: "Steadiness. A cadence even enough to give a racing mind one job.",
    how: [
      "Inhale for four counts.",
      "Hold for four.",
      "Exhale for four.",
      "Hold empty for four, then repeat.",
    ],
    limit:
      "The holds can feel like effort if you are already short of breath. Drop to a three-count, or use a long-exhale pattern instead.",
  },
  {
    name: "4-7-8 breathing",
    count: "Inhale 4 · hold 7 · exhale 8",
    use: "Winding down. The long exhale is the point; the numbers are the scaffolding.",
    how: [
      "Inhale quietly through the nose for four counts.",
      "Hold for seven.",
      "Exhale through the mouth for eight, unhurried.",
      "Four rounds is a common starting dose.",
    ],
    limit:
      "The counts are a ratio, not a prescription. If eight is uncomfortable, halve every number and keep the shape.",
  },
  {
    name: "Resonance breathing",
    count: "≈ 6 breaths per minute",
    use: "A sustained pace to sit in for five or ten minutes rather than a quick reset.",
    how: [
      "Inhale for about five seconds.",
      "Exhale for about five seconds.",
      "No holds. Keep it even and unforced.",
      "Five to ten minutes is a normal session.",
    ],
    limit:
      "The exact rate that suits a person varies. Anywhere near this pace is close enough — chasing a precise number defeats the purpose.",
  },
  {
    name: "The single exhale",
    count: "1 breath",
    use: "Before you speak, answer, or open the message. The smallest usable version.",
    how: [
      "Notice you are about to react.",
      "Let one deliberate exhale out first.",
      "Then continue.",
    ],
    limit:
      "It changes the next few seconds, not your week. That is still worth more than the practice you keep meaning to start.",
  },
];

export default function BreathTechniques() {
  return (
    <EditorialLayout
      slug="breath-techniques"
      title="Breathing Techniques: 5 Patterns, With Their Limits — Zential Pure"
      description="The physiological sigh, box breathing, 4-7-8, resonance breathing and the single exhale — what each count is, what it is used for, and what it does not do."
      ogImage="/og/editorial-the-ritual.jpg"
      publishedTime="2026-07-28"
      folio="( breath / techniques )"
    >
      <section className="ed-sec ed-hero" style={{ padding: "36px 24px 28px" }}>
        <p className="eyebrow" style={{ margin: 0 }}>( 01 ) &nbsp;·&nbsp; The Breath</p>
        <h1 className="headline">Five patterns, and what each one is for.</h1>
        <p className="deck">
          Every named breathing technique is a count wrapped around one idea: give the mind a job,
          and lengthen the exhale. Here they are side by side, with the part usually left out — what
          each one does not do.
        </p>
      </section>

      <section className="reveal ed-sec ed-essay" style={{ padding: "8px 24px 24px" }}>
        <p className="body-copy">
          None of these is better than the others. They differ in how long they take and in which
          state they suit. Pick by the moment you are in, not by which one has the best name.
        </p>
      </section>

      {TECHNIQUES.map((t, i) => (
        <section
          key={t.name}
          className="reveal ed-sec"
          style={{
            padding: "28px 24px",
            borderTop: "1px solid var(--ed-line)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <p className="eyebrow" style={{ margin: 0 }}>
            ( 0{i + 2} ) &nbsp;·&nbsp; {t.count}
          </p>
          <h2 className="headline" style={{ fontSize: "26px", margin: 0 }}>
            {t.name}
          </h2>
          <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
            {t.use}
          </p>
          <ol
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "var(--ed-ink)",
            }}
          >
            {t.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.65,
              color: "var(--ed-grey)",
              margin: 0,
              borderLeft: "2px solid var(--ed-line)",
              paddingLeft: "12px",
            }}
          >
            <strong>The limit:</strong> {t.limit}
          </p>
        </section>
      ))}

      <section
        className="reveal ed-sec"
        style={{ padding: "32px 24px", borderTop: "1px solid var(--ed-line)" }}
      >
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
          Reading a count is not the same as holding one. The pacer runs all of these for you, free,
          in the browser — no account, no app.
        </p>
        <a className="soft-cta" href="/breath">
          Open the guided pacer →
        </a>
      </section>

      <section
        className="ed-sec ed-cta ed-cta--dark"
        style={{
          background: "var(--ed-dark)",
          padding: "44px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--ed-font-serif)",
            fontStyle: "italic",
            fontSize: "28px",
            lineHeight: 1.25,
            color: "var(--ed-on-dark)",
            margin: 0,
          }}
        >
          Start with the free one.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-on-dark-dim)", margin: 0 }}>
          Two weeks of one pattern at a fixed time each day. If that appointment holds, the rest is
          worth considering.
        </p>
        <a className="btn btn--primary" href="/breath">
          Open the breath tool
        </a>
      </section>

      <EditorialNewsletter
        slug="breath-techniques"
        copy="One letter a week on mechanism, ritual and the science of slow mornings."
      />
    </EditorialLayout>
  );
}
