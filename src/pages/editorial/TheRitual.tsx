import { EditorialLayout } from "./EditorialLayout";
import { EditorialImageSlot } from "./EditorialImageSlot";
import { EditorialNewsletter } from "./EditorialNewsletter";
import { CitationNote } from "./CitationNote";
import { C_ADHERENCE } from "./citations";
import { usePdpLink } from "../../lib/pdpLink";

export default function TheRitual() {
  const PDP = usePdpLink("/instruments/restoration-belt", "the-ritual");
  return (
    <EditorialLayout
      slug="the-ritual"
      title="Ten quiet minutes. — Zential Pure Journal"
      description="Before the phone, before the noise. A warm instrument, a chair by the window, and nothing else on the schedule."
      ogImage="/og/editorial-the-ritual.jpg"
      publishedTime="2026-07-08"
      folio="( 01 / 05 )"
    >
      {/* HERO — text left, warm image right at desktop (ed-hero-grid) */}
      <div className="ed-hero-grid">
        <section className="ed-sec ed-hero" style={{ padding: "36px 24px 28px" }}>
          <p className="eyebrow" style={{ margin: 0 }}>( 01 ) &nbsp;·&nbsp; The Ritual</p>
          <h1 className="headline">Ten quiet minutes.</h1>
          <p className="deck">
            Before the phone, before the noise. A warm instrument, a chair by the window, and nothing
            else on the schedule.
          </p>
        </section>

        {/* IMAGE SLOT ritual-hero · 390×300 · aged hands cradling a warm ceramic mug in low morning
            window light, linen, honest skin texture · quiet, unhurried, no people's faces · never
            show the belt LED panel */}
        <EditorialImageSlot
          src="/editorial/ritual-hands.webp"
          alt="Aged hands cradling a warm ceramic mug in morning light"
          width={390}
          height={300}
          artDirection="aged hands cradling a warm ceramic mug in low morning window light, steam, linen, honest skin texture; no faces; never show the belt LED panel"
          className="ed-hero-img"
          eager
        />
      </div>

      {/* ESSAY OPENING */}
      <section className="reveal ed-sec ed-essay" style={{ padding: "36px 24px 8px" }}>
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
      <section className="reveal ed-sec ed-pull" style={{ padding: "36px 24px" }}>
        <figure className="pull-quote" style={{ margin: 0 }}>
          <p>The instrument does not ask for effort. It asks for consistency.</p>
        </figure>
      </section>

      {/* MECHANISM */}
      <section className="reveal ed-sec ed-mechanism" style={{ padding: "8px 24px 36px", display: "flex", flexDirection: "column", gap: "22px" }}>
        <p className="eyebrow" style={{ margin: 0 }}>( 02 ) &nbsp;·&nbsp; Mechanism</p>
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
          Inside the belt, an inward-facing LED array delivers red light in the 630 to 660 nanometre
          range, paired with gentle thermal support. Published research associates these wavelengths
          with cellular energy processes in skin tissue.
        </p>
        <div className="ed-mech-badges" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span className="badge">LED 630–660nm</span>
          <span className="badge">Thermal</span>
        </div>
        <p className="ed-mech-note" style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          Used as part of a daily ritual. Only the edge glow and the side control unit are visible in
          use.
        </p>
      </section>

      {/* IMAGE SLOT ritual-inline · 390×240 · Restoration Belt worn in calm evening light ·
          array inward — only edge glow + side control unit visible, never an outward panel */}
      <EditorialImageSlot
        src="/editorial/hero-redlight-belt.webp"
        alt="Restoration Belt worn, edge glow visible"
        width={390}
        height={240}
        artDirection="Restoration Belt worn on lower back in calm evening light; array faces inward — only edge glow + side control unit visible"
        className="ed-inline-img"
      />

      {/* SOFT CTA */}
      <section className="reveal ed-sec ed-softcta" style={{ padding: "32px 24px", borderBottom: "1px solid var(--ed-line)" }}>
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
          The Restoration Belt is calibrated to a twelve-minute session. €180. Once.
        </p>
        <a className="soft-cta" href={PDP}>Read about the instrument →</a>
      </section>

      {/* EVIDENCE — the ritual page's whole argument, measured: adherence is the variable. */}
      <CitationNote citation={C_ADHERENCE} />

      {/* END CTA */}
      <section className="ed-sec ed-cta" style={{ background: "#FFFFFF", borderTop: "1px solid var(--ed-line)", padding: "44px 24px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <p style={{ fontFamily: "var(--ed-font-sans)", fontWeight: 300, letterSpacing: "-0.02em", fontSize: "28px", lineHeight: 1.25, color: "var(--ed-dark)", margin: 0 }}>
          Begin the ritual.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
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
