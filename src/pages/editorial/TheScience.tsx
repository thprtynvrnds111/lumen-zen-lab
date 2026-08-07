import { EditorialLayout } from "./EditorialLayout";
import { EditorialImageSlot } from "./EditorialImageSlot";
import { EditorialNewsletter } from "./EditorialNewsletter";
import { CitationNote } from "./CitationNote";
import { C_DOSE } from "./citations";
import { usePdpLink } from "../../lib/pdpLink";

const MECHANISMS = [
  {
    n: "( 01 )",
    label: "Absorption",
    body: "Light at 660 nanometres penetrates the upper layers of skin, where it is absorbed by cytochrome c oxidase, an enzyme in the mitochondrial respiratory chain.",
    ref: 1,
  },
  {
    n: "( 02 )",
    label: "Energy",
    body: "Absorption is associated in published studies with increased ATP production, the energy currency cells use for maintenance and renewal.",
    ref: 2,
  },
  {
    n: "( 03 )",
    label: "Signal",
    body: "Researchers describe this as photobiomodulation. Light as a signal to tissue, not a treatment applied onto it.",
    ref: 3,
  },
];

export default function TheScience() {
  const PDP = usePdpLink("/instruments/restoration-belt", "the-science");
  return (
    <EditorialLayout
      slug="the-science"
      title="What 660nm actually does. — Zential Pure Journal"
      description="A short, annotated reading of the published research on red light and skin tissue. Mechanism first. Claims last, if at all."
      ogImage="/og/editorial-the-science.jpg"
      publishedTime="2026-07-08"
      folio="( 04 / 05 )"
      pageVariant="white"
    >
      {/* JOURNAL HERO */}
      <section className="ed-sec ed-hero ed-hero--journal" style={{ padding: "36px 24px 30px", borderBottom: "1px solid var(--ed-line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <span className="masthead__tag" style={{ letterSpacing: "0.28em" }}>Mechanism Review</span>
          <span className="masthead__tag" style={{ letterSpacing: "0.28em" }}>No. 04</span>
        </div>
        <h1 className="headline" style={{ fontSize: "40px", lineHeight: 1.12, marginTop: 0 }}>
          What 660nm actually does.
        </h1>
        <p className="deck">
          A short, annotated reading of the published research on red light and skin tissue.
          Mechanism first. Claims last, if at all.
        </p>
      </section>

      {/* ANNOTATED SECTIONS */}
      <section className="reveal ed-sec ed-mechlist" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: "28px" }}>
        {MECHANISMS.map((m) => (
          <div key={m.label} className="ed-mech-item" style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "14px" }}>
            <span style={{ fontSize: "11px", color: "var(--ed-grey-warm)", letterSpacing: "0.1em", paddingTop: "4px" }}>{m.n}</span>
            <div>
              <p style={{ fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ed-teal-deep)", fontWeight: 500, margin: "0 0 8px" }}>
                {m.label}
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                {m.body}
                <sup style={{ color: "var(--ed-teal-deep)", fontSize: "11px" }}> {m.ref}</sup>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* PRODUCT FIGURE */}
      <section className="ed-sec ed-figure-dark" style={{ background: "#FFFFFF", borderTop: "1px solid var(--ed-line)", padding: "36px 24px" }}>
        {/* IMAGE SLOT science-fig1 · 342×260 · Restoration Belt on dark surface, ONLY edge glow +
            side control unit visible (LED array faces inward — never an outward-facing panel) */}
        <EditorialImageSlot
          src="/editorial/hero-redlight-belt.webp"
          alt="Restoration Belt, edge glow and side control unit"
          width={342}
          height={260}
          artDirection="Restoration Belt on dark surface; ONLY edge glow + side control unit visible; LED array faces inward — never an outward-facing panel; clinical-dark, teal edge light"
          className="science-fig"
        />
        <p style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ed-teal-deep)", margin: "20px 0 10px" }}>
          Fig. 1 · Restoration Belt
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--ed-grey)", margin: "0 0 18px" }}>
          The array faces inward. In use, only the edge glow and the side control unit are visible.
          630 to 660nm, calibrated to a twelve-minute session.
        </p>
        <a className="soft-cta" style={{ color: "var(--ed-teal-deep)" }} href={PDP}>Read about the instrument →</a>
      </section>

      {/* EVIDENCE — the dose ceiling. More light is not more result. */}
      <CitationNote citation={C_DOSE} />

      {/* FOOTNOTES */}
      <section className="ed-sec ed-notes" style={{ padding: "28px 24px", borderBottom: "1px solid var(--ed-line)" }}>
        <p className="meta-label" style={{ margin: "0 0 14px" }}>References</p>
        <p style={{ fontSize: "12px", lineHeight: 1.7, color: "var(--ed-grey)", margin: 0 }}>
          1. Hamblin, M. Mechanisms of low level light therapy. 2017.
          <br />
          2. de Freitas &amp; Hamblin. Proposed mechanisms of photobiomodulation. 2016.
          <br />
          3. Anders et al. Low-level light/laser therapy versus photobiomodulation therapy. 2015.
        </p>
      </section>

      {/* END CTA */}
      <section className="ed-sec ed-cta" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontFamily: "var(--ed-font-sans)", fontWeight: 300, letterSpacing: "-0.02em", fontSize: "26px", lineHeight: 1.25, margin: 0 }}>
          Mechanism, at home.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          Restoration Belt · €180. Once.
        </p>
        <a className="btn btn--primary" href={PDP}>Order the Restoration Belt</a>
      </section>

      <EditorialNewsletter slug="the-science" copy="The research we read this week, summarised without hype." />
    </EditorialLayout>
  );
}
