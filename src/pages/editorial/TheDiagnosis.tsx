import { EditorialLayout } from "./EditorialLayout";
import { EditorialImageSlot } from "./EditorialImageSlot";
import { EditorialNewsletter } from "./EditorialNewsletter";
import { QuoteCarousel } from "./QuoteCarousel";
import { C_ADHERENCE, C_EMS, C_MICROCURRENT } from "./citations";
import { usePdpLink } from "../../lib/pdpLink";

/**
 * The three papers this page's argument actually rests on. This was three invented
 * "voices" over stock portraits — a reader could not check a word of it.
 */
const CITATIONS = [C_MICROCURRENT, C_EMS, C_ADHERENCE];

export default function TheDiagnosis() {
  const PDP = usePdpLink("/instruments/face-introducer", "the-diagnosis");
  return (
    <EditorialLayout
      slug="the-diagnosis"
      title="Why your skin stopped listening. — Zential Pure Journal"
      description="Twelve products on the shelf and the same face in the mirror. The problem is not the ingredients. It is the signal."
      ogImage="/og/editorial-the-diagnosis.jpg"
      publishedTime="2026-07-08"
      folio="( 02 / 05 )"
      mastheadVariant="dark"
    >
      {/* DARK HERO (masthead already dark via layout; hero ground continues it) */}
      <div style={{ background: "var(--ed-dark)", marginTop: "-1px" }}>
        <section className="ed-sec ed-hero ed-hero--dark" style={{ padding: "40px 24px 44px" }}>
          <span className="eyebrow eyebrow--teal">The Diagnosis</span>
          <h1 className="headline" style={{ fontSize: "42px", lineHeight: 1.1, color: "var(--ed-on-dark)" }}>
            Why your skin stopped listening.
          </h1>
          <p className="deck" style={{ color: "var(--ed-on-dark-dim)" }}>
            Twelve products on the shelf and the same face in the mirror. The problem is not the
            ingredients. It is the signal.
          </p>
        </section>
      </div>

      {/* IMAGE SLOT diagnosis-hero · 390×280 · seated figure in calm natural side light, back or
          profile, contemplative · still, warm-muted, editorial · no product, no direct gaze */}
      <EditorialImageSlot
        src="/editorial/seated-calm.webp"
        alt="Seated figure in calm light"
        width={390}
        height={280}
        artDirection="seated figure in calm natural side light, back or profile, contemplative; no product, no direct gaze"
        className="ed-band-img"
        eager
      />

      {/* ESSAY */}
      <section className="reveal ed-sec ed-essay" style={{ padding: "36px 24px 8px" }}>
        <p className="body-copy">
          <span className="drop-cap">S</span>kin is an electrical organ before it is a chemical one.
          Every cream on your shelf speaks chemistry. Almost nothing you own speaks current,
          frequency or warmth. That is the gap.
        </p>
        <p className="body-copy">
          Clinics have known this for decades. Microcurrent, EMS and thermal work are
          the standard toolkit of a professional facial. The Face Introducer folds all four into one
          instrument.
        </p>
      </section>

      {/* MODALITY STRIP */}
      <section className="reveal ed-sec ed-modalities" style={{ padding: "32px 24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <span className="badge">EMS</span>
        <span className="badge">Microcurrent</span>
        <span className="badge">Thermal</span>
        <span className="badge">LED 630–660nm</span>
      </section>

      {/* PRODUCT FIGURE + SOFT CTA */}
      <section className="reveal ed-sec ed-figure" style={{ padding: "0 24px 36px" }}>
        {/* IMAGE SLOT diagnosis-product · 342×260 · Face Introducer held or resting in warm natural
            light, real environment (NOT product-on-white) · warm, precise, calm */}
        <EditorialImageSlot
          src="/editorial/hero-face-introducer.webp"
          alt="Face Introducer instrument"
          width={342}
          height={260}
          artDirection="Face Introducer held or resting in warm natural light, real environment, NOT product-on-white"
          className="ed-figure-img"
        />
        <p className="body-copy" style={{ fontSize: "15px", lineHeight: 1.7, margin: "18px 0 14px" }}>
          Three modalities, calibrated to a twelve-minute daily ritual. €88. Once.
        </p>
        <a className="soft-cta" href={PDP}>Read about the instrument →</a>
      </section>

      <QuoteCarousel citations={CITATIONS} />

      {/* END CTA */}
      <section className="ed-sec ed-cta" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontFamily: "var(--ed-font-serif)", fontStyle: "italic", fontSize: "26px", lineHeight: 1.25, margin: 0 }}>
          Speak the skin's language.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          Face Introducer · €88 — €74.80 with the ritual code, applied for you.
        </p>
        <a
          className="btn btn--primary"
          href="/f/face-introducer?utm_source=editorial&utm_medium=site&utm_campaign=the-diagnosis"
        >
          Order the Face Introducer — €74.80
        </a>
        <a style={{ fontSize: "13px", color: "var(--ed-grey)" }} href={PDP}>
          Prefer the full specification? See the product page
        </a>
      </section>

      <EditorialNewsletter slug="the-diagnosis" copy="One letter a week. Mechanism before benefit, always." variant="dark" />
    </EditorialLayout>
  );
}
