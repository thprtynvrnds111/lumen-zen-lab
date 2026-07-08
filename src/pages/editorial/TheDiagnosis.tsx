import { EditorialLayout } from "./EditorialLayout";
import { EditorialImageSlot } from "./EditorialImageSlot";
import { EditorialNewsletter } from "./EditorialNewsletter";
import { QuoteCarousel } from "./QuoteCarousel";

const PDP = "/instruments/face-introducer?utm_source=pinterest&utm_medium=pin&utm_campaign=the-diagnosis";

const QUOTES = [
  {
    text: "Most home devices fail because they are single-modality. The clinic result comes from stacking signals in one session.",
    role: "Clinical Advisor · Zential Pure",
    img: "/editorial/people/expert-1.webp",
  },
  {
    text: "I stopped recommending twelve-step routines years ago. One instrument, one ritual, held daily. That is the honest protocol.",
    role: "Aesthetic Practitioner",
    img: "/editorial/people/expert-2.webp",
  },
  {
    text: "The research on microcurrent is older than most people think. What changed is that the output is now safe to hold at home.",
    role: "Research Lead · Zential Pure",
    img: "/editorial/people/expert-3.webp",
  },
];

export default function TheDiagnosis() {
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
          Clinics have known this for decades. Microcurrent, EMS, thermal work and cosmetic LED are
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
          Four modalities, calibrated to a twelve-minute daily ritual. €88. Once.
        </p>
        <a className="soft-cta" href={PDP}>Read about the instrument →</a>
      </section>

      <QuoteCarousel quotes={QUOTES} />

      {/* END CTA */}
      <section className="ed-sec ed-cta" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontFamily: "var(--ed-font-serif)", fontStyle: "italic", fontSize: "26px", lineHeight: 1.25, margin: 0 }}>
          Speak the skin's language.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ed-grey)", margin: 0 }}>
          Face Introducer · €88. Once.
        </p>
        <a className="btn btn--primary" href={PDP}>Order the Face Introducer</a>
      </section>

      <EditorialNewsletter slug="the-diagnosis" copy="One letter a week. Mechanism before benefit, always." variant="dark" />
    </EditorialLayout>
  );
}
