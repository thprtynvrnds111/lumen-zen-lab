import { EditorialLayout } from "../editorial/EditorialLayout";
import { EditorialNewsletter } from "../editorial/EditorialNewsletter";

/**
 * /breath/daily — where a breath practice actually fits in an ordinary day.
 *
 * Companion to /breath/techniques (which patterns exist) and /breath (the
 * pacer itself). This page answers "when", which is the question that decides
 * whether any of it survives past week one.
 */

interface Moment {
  when: string;
  what: string;
  why: string;
  cost: string;
}

const MOMENTS: Moment[] = [
  {
    when: "Before the phone",
    what: "Ninety seconds of slow breathing, still in bed or standing at the window.",
    why: "The first input of the day sets the tone for the hour after it. Notifications are a poor first input.",
    cost: "90 seconds",
  },
  {
    when: "At the desk, mid-morning",
    what: "Notice whether you are breathing at all. Many people hold their breath while reading email — screen apnea.",
    why: "You cannot correct a pattern you have not noticed. Noticing is most of the practice.",
    cost: "One breath",
  },
  {
    when: "Before you speak",
    what: "One deliberate exhale before answering, presenting, or replying to the message that annoyed you.",
    why: "It puts a gap between the trigger and the response. The gap is the whole benefit.",
    cost: "3 seconds",
  },
  {
    when: "Every wait",
    what: "The kettle, the elevator, the loading screen — one slow breath instead of reaching for the phone.",
    why: "An ordinary day contains dozens of these. Habit-stacking onto waits requires no new time at all.",
    cost: "Free",
  },
  {
    when: "The end of the workday",
    what: "Five minutes of even breathing to mark the boundary the commute used to mark.",
    why: "Working from home removed the transition between roles. Something has to hold that line.",
    cost: "5 minutes",
  },
  {
    when: "Before sleep",
    what: "Long-exhale breathing, lights low, screen already down.",
    why: "A downshift signal at the end of the day, done at the same time each night so the body learns to expect it.",
    cost: "5–10 minutes",
  },
];

export default function BreathDaily() {
  return (
    <EditorialLayout
      slug="breath-daily"
      title="Where Breathwork Fits in an Ordinary Day — Zential Pure"
      description="Six moments in a normal day where a breath practice fits without new time: before the phone, at the desk, before you speak, in every wait, at the end of work, before sleep."
      ogImage="/og/editorial-the-ritual.jpg"
      publishedTime="2026-07-28"
      folio="( breath / daily )"
    >
      <section className="ed-sec ed-hero" style={{ padding: "36px 24px 28px" }}>
        <p className="eyebrow" style={{ margin: 0 }}>( 01 ) &nbsp;·&nbsp; The Breath</p>
        <h1 className="headline">You do not need twenty free minutes.</h1>
        <p className="deck">
          Most breathing practices fail on scheduling, not on technique. Here are six moments an
          ordinary day already contains, and what fits inside each one.
        </p>
      </section>

      <section className="reveal ed-sec ed-essay" style={{ padding: "8px 24px 24px" }}>
        <p className="body-copy">
          A practice that needs a free half hour competes with everything else in your day and loses.
          A practice attached to something you already do — the kettle, the commute that is now a
          hallway, the moment before you answer — has nothing to compete with.
        </p>
      </section>

      {MOMENTS.map((m, i) => (
        <section
          key={m.when}
          className="reveal ed-sec"
          style={{
            padding: "26px 24px",
            borderTop: "1px solid var(--ed-line)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p className="eyebrow" style={{ margin: 0 }}>
            ( 0{i + 2} ) &nbsp;·&nbsp; {m.cost}
          </p>
          <h2 className="headline" style={{ fontSize: "24px", margin: 0 }}>
            {m.when}
          </h2>
          <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
            {m.what}
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--ed-grey)", margin: 0 }}>
            {m.why}
          </p>
        </section>
      ))}

      <section
        className="reveal ed-sec"
        style={{ padding: "32px 24px", borderTop: "1px solid var(--ed-line)" }}
      >
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
          Pick one moment. Not six. The one you are most likely to actually hit tomorrow.
        </p>
        <a className="soft-cta" href="/breath/techniques">
          See the patterns and their limits →
        </a>
      </section>

      <section
        className="ed-sec ed-cta"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid var(--ed-line)",
          padding: "44px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--ed-font-sans)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            fontSize: "28px",
            lineHeight: 1.25,
            color: "var(--ed-dark)",
            margin: 0,
          }}
        >
          One moment. Tomorrow.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          The guided pacer is free in the browser — no account, no download.
        </p>
        <a className="btn btn--primary" href="/breath">
          Open the breath tool
        </a>
      </section>

      <EditorialNewsletter
        slug="breath-daily"
        copy="One letter a week on mechanism, ritual and the science of slow mornings."
      />
    </EditorialLayout>
  );
}
