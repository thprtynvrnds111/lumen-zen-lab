import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { pixelViewContent } from "../tracking";
import { HubNewsletterForm } from "./HubNewsletterForm";
import { useReveal } from "./useReveal";
import { HUB_EXPERTS, HUB_MODALITIES, ISSUE_INDEX } from "./hubData";
import "@/styles/editorial.css";
import "@/styles/editorial-hub.css";

const TITLE = "The Clinical Issue — The skin is an electrical organ.";
const DESCRIPTION =
  "This issue examines what happens when you pass a calibrated microcurrent through living tissue, why 630 nanometres matters, and how heat changes what your serum can do. Every claim links to its study.";

/**
 * 1b — "The Clinical Issue" at /editorial/clinical-issue.
 * Design handoff: Zential Pure Journal, handoff-src/1b-clinical-issue.dc.html.
 * Dark dossier cover on near-black, spec-sheet mechanism table, full-bleed
 * pull-quote divider, three clinicians on record, split newsletter band.
 */
export default function ClinicalIssue() {
  const rootRef = useReveal<HTMLDivElement>([]);

  useEffect(() => {
    pixelViewContent("editorial-clinical-issue");
  }, []);

  return (
    <div className="hub-root hub-root--dark" ref={rootRef}>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        ogType="article"
        ogImage="https://zentialpure.com/og/editorial-the-science.jpg"
        canonicalUrl="/editorial/clinical-issue"
        publishedTime="2026-07-09"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: "2026-07-09",
          author: { "@type": "Organization", name: "Zential Pure" },
          publisher: { "@type": "Organization", name: "Zential Pure" },
          mainEntityOfPage: "https://zentialpure.com/editorial/clinical-issue",
        }}
      />

      <section className="issue-cover">
        <header className="issue-masthead">
          <Link to="/" className="issue-masthead__brand" aria-label="Zential Pure home">
            <img src="/editorial/logo/zential-mark-teal.png" alt="" width={20} height={20} />
            <span className="issue-masthead__wordmark">Zential Pure</span>
          </Link>
          <span className="issue-masthead__tag">The Journal · A dossier on skin instrumentation</span>
          <span className="issue-masthead__no">No. 07</span>
        </header>
        <div className="issue-cover__grid">
          <div className="issue-cover__text reveal">
            <span className="issue-cover__eyebrow">Protocol ( 07 ) · Current, light, heat</span>
            <h1 className="issue-cover__head">The skin is an electrical organ.</h1>
            <p className="issue-cover__dek">
              This issue examines what happens when you pass a calibrated microcurrent through
              living tissue, why 630 nanometres matters, and how heat changes what your serum can
              do. Every claim links to its study.
            </p>
            <div className="issue-index">
              {ISSUE_INDEX.map((ix) => (
                <div className="issue-index__item" key={ix.n}>
                  <span className="issue-index__n">{ix.n}</span>
                  <span className="issue-index__t">{ix.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="issue-cover__figure reveal">
            <img
              src="/editorial/hero-neck-device.webp"
              alt="Face Introducer instrument"
              width={1280}
              height={1280}
            />
            <div className="issue-cover__badges">
              {["EMS", "Microcurrent", "Thermal", "LED"].map((b) => (
                <span className="issue-badge" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="issue-table">
        <div className="issue-table__grid">
          <div className="issue-table__intro reveal">
            <span className="hub-eyebrow hub-eyebrow--teal">( 01 ) · Mechanism file</span>
            <h2 className="issue-table__head">Read it like a spec sheet.</h2>
            <p className="issue-table__dek">
              Mechanism, then benefit, then claim. If a row cannot cite its study, it does not
              ship.
            </p>
            <Link className="hub-btn hub-btn--brand" to="/science">
              See the studies
            </Link>
          </div>
          <div className="issue-rows reveal">
            {HUB_MODALITIES.map((m) => (
              <div className="issue-row" key={m.n}>
                <span className="issue-row__n">{m.n}</span>
                <span className="issue-row__name">{m.name}</span>
                <p className="issue-row__mech">{m.mech}</p>
                <p className="issue-row__benefit">{m.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="issue-divider">
        <img src="/editorial/walk-stone.webp" alt="Morning walk on stone" loading="lazy" />
        <blockquote>"Bundles are not discounts. They are sequences."</blockquote>
      </section>

      <section className="issue-experts">
        <div className="issue-experts__head reveal">
          <div>
            <span className="hub-eyebrow hub-eyebrow--on-dark">( 02 ) · Expert testimony</span>
            <h2 className="issue-experts__title" style={{ marginTop: 14 }}>
              Three clinicians, on record.
            </h2>
          </div>
          <span className="issue-experts__note">Statements, not endorsements</span>
        </div>
        <div className="issue-experts__grid">
          {HUB_EXPERTS.map((ex) => (
            <figure className="issue-expert reveal" key={ex.name}>
              <img src={ex.img} alt={ex.name} loading="lazy" width={400} height={240} />
              <figcaption>
                <blockquote>"{ex.quote}"</blockquote>
                <div className="issue-expert__attr">
                  <span className="issue-expert__name">{ex.name}</span>
                  <span className="issue-expert__role">{ex.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="issue-nl">
        <div className="issue-nl__text reveal">
          <span className="hub-eyebrow">( 03 ) · The dossier, by email</span>
          <h2 className="issue-nl__head">Each issue, before it is published.</h2>
          <p className="issue-nl__dek">
            Subscribers read the mechanism files a week early and receive the citation list as a
            PDF. Unsubscribe is one click, forever.
          </p>
        </div>
        <div>
          <HubNewsletterForm
            slug="clinical-issue"
            buttonLabel="Join the reading list"
            confirmation="Confirmed. Issue No. 08 reaches you first."
          />
        </div>
      </section>
    </div>
  );
}
