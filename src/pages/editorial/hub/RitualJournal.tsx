import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { pixelViewContent } from "../tracking";
import { HubNewsletterForm } from "./HubNewsletterForm";
import { useReveal } from "./useReveal";
import {
  HUB_ARTICLES,
  HUB_CITATIONS,
  HUB_FILTERS,
  HUB_MODALITIES,
  type HubFilter,
} from "./hubData";
import { pubmedHref } from "../citations";
import "@/styles/editorial.css";
import "@/styles/editorial-hub.css";

const TITLE = "The Journal — Understand the mechanism. The benefit follows.";
const DESCRIPTION =
  "Essays on skin physiology, current, light and heat. Written for people who read the study before the review. No transformations promised. Mechanisms explained.";

/**
 * 1a — "The Ritual Journal": the editorial index at /editorial.
 * Design handoff: Zential Pure Journal, handoff-src/1a-ritual-journal.dc.html.
 * Warm fog ground, filterable article grid, four-modality science strip,
 * dark expert-quote carousel, newsletter band.
 */
export default function RitualJournal() {
  const [filter, setFilter] = useState<HubFilter>("All");
  const [quote, setQuote] = useState(0);
  const rootRef = useReveal<HTMLDivElement>([]);

  useEffect(() => {
    pixelViewContent("editorial-hub");
  }, []);

  const articles =
    filter === "All" ? HUB_ARTICLES.slice(0, 6) : HUB_ARTICLES.filter((a) => a.topic === filter);
  const paper = HUB_CITATIONS[quote];

  return (
    <div className="hub-root" ref={rootRef}>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        canonicalUrl="/editorial"
        ogImage="https://zentialpure.com/og/editorial-the-ritual.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Journal",
          description: DESCRIPTION,
          url: "https://zentialpure.com/editorial",
          publisher: { "@type": "Organization", name: "Zential Pure" },
        }}
      />

      <header className="hub-masthead">
        <Link to="/" className="hub-masthead__brand" aria-label="Zential Pure home">
          <img
            className="hub-masthead__logo"
            src="/editorial/logo/zential-logo-primary.png"
            alt=""
            width={22}
            height={22}
          />
          <span className="hub-masthead__wordmark">Zential Pure</span>
        </Link>
        <nav className="hub-nav" aria-label="Journal sections">
          <Link className="hub-nav--active" to="/editorial">
            Journal
          </Link>
          <Link to="/science">The Science</Link>
          <Link to="/protocols">Protocols</Link>
          <Link to="/instruments">Instruments</Link>
        </nav>
        <Link className="hub-btn hub-btn--outline" to="/instruments/face-introducer">
          Order the Face Introducer
        </Link>
      </header>

      <section className="hub-hero">
        <div className="hub-hero__text reveal">
          <span className="hub-eyebrow">( 01 ) · The Journal · Issue 07</span>
          <h1 className="hub-hero__head">Understand the mechanism. The benefit follows.</h1>
          <p className="hub-hero__dek">
            Essays on skin physiology, current, light and heat. Written for people who read the
            study before the review. No transformations promised. Mechanisms explained.
          </p>
          <div className="hub-hero__cta">
            <Link className="hub-btn hub-btn--brand" to="/editorial/clinical-issue">
              Read the issue
            </Link>
            <Link className="hub-textlink" to="/science">
              See the science
            </Link>
          </div>
        </div>
        <div className="hub-hero__imgwrap">
          <img src="/editorial/brand-story.webp" alt="Morning light on skin ritual" />
          <Link className="hub-hero__chip" to="/editorial/the-ritual">
            Featured · The 12-Minute Window
          </Link>
        </div>
      </section>

      <section className="hub-entries">
        <div className="hub-entries__head">
          <h2 className="hub-h2">Latest entries</h2>
          <div className="hub-filters" role="group" aria-label="Filter entries by topic">
            {HUB_FILTERS.map((t) => (
              <button
                key={t}
                className={t === filter ? "hub-chip hub-chip--active" : "hub-chip"}
                aria-pressed={t === filter}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="hub-grid">
          {articles.map((a) => (
            <Link className="hub-card reveal" key={a.title} to={a.link}>
              <div className="hub-card__imgwrap">
                <img src={a.img} alt={a.imgAlt} loading="lazy" width={400} height={200} />
              </div>
              <div className="hub-card__body">
                <span className="hub-card__meta">
                  <span className="hub-card__topic">{a.topic}</span>
                  <span className="hub-card__read">{a.read}</span>
                </span>
                <h3 className="hub-card__title">{a.title}</h3>
                <p className="hub-card__dek">{a.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-science">
        <div className="hub-science__intro reveal">
          <span className="hub-eyebrow hub-eyebrow--teal">( 02 ) · The Science</span>
          <h2 className="hub-science__head">Four modalities. One instrument.</h2>
          <p className="hub-science__dek">
            Each modality acts on a different layer of tissue. Together they are calibrated to a
            12-minute daily ritual. Mechanism first, then the claim.
          </p>
        </div>
        <div className="hub-modalities">
          {HUB_MODALITIES.map((m) => (
            <div className="hub-modality reveal" key={m.n}>
              <span className="hub-modality__n">{m.n}</span>
              <span className="hub-modality__badge">{m.name}</span>
              <p className="hub-modality__mech">
                <strong>Mechanism.</strong> {m.mech}
              </p>
              <p className="hub-modality__benefit">
                <strong>Visibly.</strong> {m.benefit}
              </p>
            </div>
          ))}
        </div>
        <p className="hub-science__folio">12 minutes. Daily. €88. Once.</p>
      </section>

      <section className="hub-experts">
        <div className="hub-experts__grid reveal">
          <div className="hub-experts__plate" aria-hidden>
            <span className="hub-experts__plate-year">{paper.year}</span>
            <span className="hub-experts__plate-journal">{paper.journal}</span>
            <span className="hub-experts__plate-pmid">PMID {paper.pmid}</span>
          </div>
          <div className="hub-experts__col" aria-live="polite">
            <span className="hub-eyebrow hub-eyebrow--on-dark">( 03 ) · From the literature</span>
            <blockquote className="hub-experts__quote">"{paper.quote}"</blockquote>
            <div>
              <div className="hub-experts__name">
                {paper.authors}, {paper.journal}, {paper.year}
              </div>
              <div className="hub-experts__role">{paper.design}</div>
            </div>
            <p className="hub-experts__limit">
              <strong>What it does not show — </strong>
              {paper.limit}
            </p>
            <a
              className="hub-experts__verify"
              href={pubmedHref(paper.pmid)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify on PubMed · PMID {paper.pmid} ↗
            </a>
            <div className="hub-experts__nav">
              <button
                className="hub-arrow"
                aria-label="Previous citation"
                onClick={() =>
                  setQuote((q) => (q + HUB_CITATIONS.length - 1) % HUB_CITATIONS.length)
                }
              >
                ←
              </button>
              <button
                className="hub-arrow"
                aria-label="Next citation"
                onClick={() => setQuote((q) => (q + 1) % HUB_CITATIONS.length)}
              >
                →
              </button>
              <span className="hub-experts__count">
                {quote + 1} / {HUB_CITATIONS.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-nl">
        <span className="hub-eyebrow">( 04 ) · The Protocol, weekly</span>
        <h2 className="hub-nl__head">One mechanism explained, every Sunday.</h2>
        <p className="hub-nl__dek">
          No launches. No offers. One piece of skin science you can verify, delivered before your
          morning ritual.
        </p>
        <HubNewsletterForm
          slug="hub"
          buttonLabel="Subscribe"
          confirmation="You are on the list. First mechanism arrives Sunday."
        />
      </section>
    </div>
  );
}
