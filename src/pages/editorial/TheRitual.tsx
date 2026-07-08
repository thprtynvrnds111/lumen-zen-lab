import { EditorialLayout } from "./EditorialLayout";
import { EditorialImageSlot } from "./EditorialImageSlot";
import { EditorialNewsletter } from "./EditorialNewsletter";

const PDP = "/instruments/restoration-belt?utm_source=pinterest&utm_medium=pin&utm_campaign=the-ritual";

export default function TheRitual() {
  return (
    <EditorialLayout
      slug="the-ritual"
      title="Ten quiet minutes. — Zential Pure Journal"
      description="Before the phone, before the noise. A warm instrument, a chair by the window, and nothing else on the schedule."
      ogImage="/og/editorial-the-ritual.jpg"
      publishedTime="2026-07-08"
      folio="( 01 / 05 )"
    >
      {/* HERO */}
      <section style={{ padding: "36px 24px 28px" }}>
        <p className="eyebrow" style={{ margin: 0 }}>( 01 ) &nbsp;·&nbsp; The Ritual</p>
        <h1 className="headline">Ten quiet minutes.</h1>
        <p className="deck">
          Before the phone, before the noise. A warm instrument, a chair by the window, and nothing
          else on the schedule.
        </p>
      </section>

      {/* IMAGE SLOT ritual-hero · 390×300 · ceramic mug in low warm morning window light, steam,
          linen · quiet, unhurried, no people's faces · never show the belt LED panel */}
      <EditorialImageSlot
        src="/editorial/morning-mug.webp"
        alt="Morning light on a ceramic mug"
        width={390}
        height={300}
        artDirection="ceramic mug in low warm morning window light, steam, linen; no faces; never show the belt LED panel"
        eager
      />

      {/* ESSAY OPENING */}
      <section className="reveal" style={{ padding: "36px 24px 8px" }}>
        <p className="body-copy">
          <span className="drop-cap">T</span>he morning has a texture. For ten minutes it belongs to
          no one. The Restoration Belt warms slowly against the lower back while the kettle does its
          own quiet work across the room.
        </p>
        <p className="body-copy">
          This is not a routine. A routine is something you get through. A ritual is something you
          return to. The difference is attention.
        </p>
      </section>

      {/* PULL QUOTE */}
      <section className="reveal" style={{ padding: "36px 24px" }}>
        <figure className="pull-quote" style={{ margin: 0 }}>
          <p>The instrument does not ask for effort. It asks for consistency.</p>
        </figure>
      </section>

      {/* MECHANISM */}
      <section className="reveal" style={{ padding: "8px 24px 36px", display: "flex", flexDirection: "column", gap: "22px" }}>
        <p className="eyebrow" style={{ margin: 0 }}>( 02 ) &nbsp;·&nbsp; Mechanism</p>
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
          Inside the belt, an inward-facing LED array delivers red light in the 630 to 660 nanometre
          range, paired with gentle thermal support. Published research associates these wavelengths
          with cellular energy processes in skin tissue.
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span className="badge">LED 630–660nm</span>
          <span className="badge">Thermal</span>
        </div>
        <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          Used as part of a daily ritual. Only the edge glow and the side control unit are visible in
          use.
        </p>
      </section>

      {/* IMAGE SLOT ritual-inline · 390×240 · waking hand in soft diffuse morning light on bed
          linen · warm, muted, calm · no product, no faces */}
      <EditorialImageSlot
        src="/editorial/waking-hand.webp"
        alt="A hand in soft morning light"
        width={390}
        height={240}
        artDirection="waking hand in soft diffuse morning light on bed linen; no product, no faces"
      />

      {/* SOFT CTA */}
      <section className="reveal" style={{ padding: "32px 24px", borderBottom: "1px solid var(--ed-line)" }}>
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
          The Restoration Belt is calibrated to a twelve-minute session. €180. Once.
        </p>
        <a className="soft-cta" href={PDP}>Read about the instrument →</a>
      </section>

      {/* EXPERT QUOTE */}
      <section className="reveal" style={{ padding: "36px 24px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <img className="portrait" src="/editorial/people/expert-1.webp" alt="Portrait" width={56} height={56} loading="lazy" />
        <p className="expert-quote">
          Consistency beats intensity. A short daily session, held at the same hour, is where the
          skin's own rhythm does the work.
        </p>
        <p className="attribution">Clinical Advisor · Zential Pure</p>
      </section>

      {/* END CTA (dark) */}
      <section style={{ background: "var(--ed-dark)", padding: "44px 24px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <p style={{ fontFamily: "var(--ed-font-serif)", fontStyle: "italic", fontSize: "28px", lineHeight: 1.25, color: "var(--ed-on-dark)", margin: 0 }}>
          Begin the ritual.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-on-dark-dim)", margin: 0 }}>
          Restoration Belt · €180 · Free EU shipping
        </p>
        <a className="btn btn--primary" href={PDP}>Order the Restoration Belt</a>
      </section>

      <EditorialNewsletter
        slug="the-ritual"
        copy="One letter a week on mechanism, ritual and the science of slow mornings."
      />
    </EditorialLayout>
  );
}
