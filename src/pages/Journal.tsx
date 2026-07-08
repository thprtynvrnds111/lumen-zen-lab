import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EditorialNewsletter } from "./editorial/EditorialNewsletter";
import {
  JOURNAL_CARDS,
  FILTERS,
  pinterestSaveHref,
  type Filter,
  type JournalCard,
} from "./editorial/journalCards";
import "@/styles/editorial.css";

const INTRO = "Skin science you can pin, verify, and practice.";

/** Pinterest save-intent pill. Plain link, no SDK — opens the save dialog. */
function SaveLink({
  link,
  description,
  variant,
}: {
  link: string;
  description: string;
  variant: "image" | "fact" | "quote";
}) {
  return (
    <a
      className={`jh-save jh-save--${variant}`}
      href={pinterestSaveHref(link, description)}
      target="_blank"
      rel="noopener noreferrer"
    >
      Save
    </a>
  );
}

function PinCard({ card }: { card: JournalCard }) {
  switch (card.kind) {
    case "image":
      return (
        <article className="jh-card jh-card--image">
          <div className="jh-imgwrap">
            <img src={card.image} alt={card.imgAlt} loading="lazy" style={{ height: card.imgH }} />
            <SaveLink link={card.link} description={card.headline} variant="image" />
          </div>
          <Link to={card.link} className="jh-body">
            <span className="jh-topic">{card.category}</span>
            <h3 className="jh-head">{card.headline}</h3>
            <p className="jh-dek">{card.body}</p>
          </Link>
        </article>
      );

    case "text":
      return (
        <article className="jh-card jh-card--text">
          <SaveLink link={card.link} description={card.headline} variant="fact" />
          <Link to={card.link} className="jh-body">
            <span className="jh-meta">{card.meta}</span>
            <h3 className="jh-head">{card.headline}</h3>
            <p className="jh-dek">{card.body}</p>
            <span className="jh-read">Read the entry &rarr;</span>
          </Link>
        </article>
      );

    case "quote":
      return (
        <article className="jh-card jh-card--quote">
          <SaveLink link={card.link} description={card.quote} variant="quote" />
          <span className="jh-quotemark" aria-hidden>
            &ldquo;
          </span>
          <Link to={card.link} className="jh-quote-body">
            <blockquote className="jh-quote">{card.quote}</blockquote>
            <span className="jh-quote-attr">
              <img className="jh-portrait" src={card.image} alt={card.name} loading="lazy" />
              <span className="jh-quote-who">
                <span className="jh-quote-name">{card.name}</span>
                <span className="jh-quote-role">{card.role}</span>
              </span>
            </span>
          </Link>
        </article>
      );

    case "fact":
      return (
        <article className="jh-card jh-card--fact">
          <SaveLink link={card.link} description={`${card.stat} — ${card.body}`} variant="fact" />
          <Link to={card.link} className="jh-body">
            <span className="jh-topic">{card.category}</span>
            <span className="jh-stat">{card.stat}</span>
            <p className="jh-dek jh-dek--fact">{card.body}</p>
          </Link>
        </article>
      );

    case "newsletter":
      return (
        <article className="jh-card jh-card--nl">
          <EditorialNewsletter
            slug="journal"
            heading="The Protocol, weekly"
            copy="One mechanism, every Sunday. Pin it for later. No launches. No offers. One piece of skin science you can verify."
          />
        </article>
      );
  }
}

export default function Journal() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = filter === "All" ? JOURNAL_CARDS : JOURNAL_CARDS.filter((c) => c.category === filter);

  return (
    <div className="jh-root">
      <SEO
        title="The Journal — Zential Pure"
        description={INTRO}
        canonicalUrl="/journal"
      />

      <header className="jh-masthead">
        <Link to="/" className="jh-brand" aria-label="Zential Pure — home">
          <img src="/editorial/logo/zential-logo-primary.png" alt="Zential Pure" />
        </Link>
        <span className="jh-masthead-tag">The Journal · Save what you will actually use</span>
        <a
          className="jh-follow"
          href={pinterestSaveHref("/journal", `Zential Pure — ${INTRO}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Save the board
        </a>
      </header>

      <section className="jh-hero">
        <p className="eyebrow eyebrow--teal-light">( 01 ) &nbsp;·&nbsp; The board</p>
        <h1 className="jh-hero-head">{INTRO}</h1>
        <div className="jh-filters" role="group" aria-label="Filter the board">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`jh-chip${filter === f ? " jh-chip--active" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <div className="jh-masonry">
        {visible.map((card) => (
          <PinCard key={card.id} card={card} />
        ))}
      </div>

      <EditorialNewsletter
        slug="journal"
        heading="The Sunday Protocol"
        copy="One mechanism, every Sunday. No launches. No offers. One piece of skin science you can verify."
      />

      <footer className="jh-footer">
        <span>Zential Pure · Clinic precision. Daily ritual.</span>
        <span>Free EU shipping · Ships from Rotterdam</span>
      </footer>
    </div>
  );
}
