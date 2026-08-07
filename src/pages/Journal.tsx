import { useEffect, useState } from "react";
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
import { pubmedHref } from "./editorial/citations";
import { prefetch, prefetchAllWhenIdle } from "./editorial/routePrefetch";
import "@/styles/editorial.css";

const INTRO = "Skin science you can pin, verify, and practice.";

/* Coven restyle (2026-08-07): the jh-* skin in editorial.css is the old fog/serif
   grammar and is shared with the editorial hub pages, so the board's presentation
   moved inline to Tailwind (white canvas, Switzer light, ink + emerald/teal).
   Structure, copy and behaviour are unchanged; jh-card--nl is kept only for its
   .ed-newsletter padding override. */
const CARD = "relative break-inside-avoid overflow-hidden rounded-none mb-5 md:mb-[22px]";
const HAIRLINE_CARD =
  "bg-white border border-[rgba(20,20,20,0.10)] transition-transform duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(20,20,20,0.08)]";
const BODY = "flex flex-col gap-2 px-[22px] pt-5 pb-6";
const TOPIC = "text-[10.5px] tracking-[0.22em] uppercase text-[#0E7A54]";
const HEAD = "m-0 font-sans text-[20px] font-normal leading-[1.3] tracking-[-0.02em] text-[#141414]";
const DEK = "m-0 text-[13.5px] leading-[1.55] text-[#5A5A5A]";
const SAVE =
  "absolute top-3.5 right-3.5 z-[2] font-sans text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded-full transition-colors";
const SAVE_VARIANT: Record<"image" | "fact" | "quote", string> = {
  image: "font-semibold bg-[#2ED8A8] text-[#141414] hover:bg-[#1BAF86]",
  fact: "font-medium border border-[rgba(20,20,20,0.22)] bg-transparent text-[#141414] hover:border-[#0E7A54] hover:text-[#0E7A54]",
  quote:
    "font-medium border border-[rgba(20,20,20,0.22)] bg-white/80 text-[#141414] hover:border-[#0E7A54] hover:text-[#0E7A54]",
};
const CHIP =
  "cursor-pointer font-sans text-[11px] tracking-[0.18em] uppercase px-[18px] py-[9px] rounded-full border transition-colors";

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
      className={`${SAVE} ${SAVE_VARIANT[variant]}`}
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
        <article className={`${CARD} ${HAIRLINE_CARD}`}>
          <div className="relative">
            <img
              src={card.image}
              alt={card.imgAlt}
              loading="lazy"
              style={{ height: card.imgH }}
              className="block w-full object-cover"
            />
            <SaveLink link={card.link} description={card.headline} variant="image" />
          </div>
          <Link to={card.link} className={BODY} {...prefetch(card.link)}>
            <span className={TOPIC}>{card.category}</span>
            <h3 className={HEAD}>{card.headline}</h3>
            <p className={DEK}>{card.body}</p>
          </Link>
        </article>
      );

    case "text":
      return (
        <article className={`${CARD} ${HAIRLINE_CARD}`}>
          <SaveLink link={card.link} description={card.headline} variant="fact" />
          <Link to={card.link} className={`${BODY} pt-[26px]`} {...prefetch(card.link)}>
            <span className={TOPIC}>{card.meta}</span>
            <h3 className={HEAD}>{card.headline}</h3>
            <p className={DEK}>{card.body}</p>
            <span className="mt-1 text-[11px] tracking-[0.16em] uppercase text-[#8E8E8E]">Read the entry &rarr;</span>
          </Link>
        </article>
      );

    case "citation": {
      const c = card.citation;
      return (
        <article className={`${CARD} ${HAIRLINE_CARD} px-[26px] py-[30px]`}>
          <SaveLink link={card.link} description={card.takeaway} variant="quote" />
          <span
            className="mt-1.5 block font-sans font-light text-[44px] leading-[0.4] text-[#0E7A54]"
            aria-hidden
          >
            &ldquo;
          </span>
          <Link to={card.link} className="mt-3.5 flex flex-col gap-3.5" {...prefetch(card.link)}>
            <blockquote className="m-0 font-sans font-light text-[19px] leading-[1.45] tracking-[-0.02em] text-[#141414]">
              {c.quote}
            </blockquote>
            <p className="m-0 text-[13.5px] leading-[1.6] text-[#5A5A5A]">{card.takeaway}</p>
            <span className="flex flex-col gap-1 border-t border-[rgba(20,20,20,0.10)] pt-3.5">
              <span className="text-[12.5px] font-semibold leading-[1.4] text-[#0E7A54]">
                {c.authors}, {c.journal}, {c.year}
              </span>
              {/* Never uppercase this line — it carries µA units (see journalHub.test). */}
              <span className="text-[11px] tracking-[0.04em] leading-[1.55] text-[#8E8E8E]">{c.design}</span>
            </span>
          </Link>
          <p className="mt-4 border-l border-[#0E7A54] py-1 pl-4 text-[12.5px] leading-[1.65] text-[#5A5A5A]">
            <span className="mb-[5px] block text-[9.5px] font-semibold tracking-[0.22em] uppercase text-[#0E7A54]">
              What it does not show
            </span>
            {c.limit}
          </p>
          <a
            className="mt-3.5 inline-block border-b border-[rgba(20,20,20,0.15)] pb-[3px] text-[11px] tracking-[0.14em] uppercase text-[#8E8E8E] transition-colors hover:border-[#0E7A54] hover:text-[#0E7A54]"
            href={pubmedHref(c.pmid)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify on PubMed · PMID {c.pmid} ↗
          </a>
        </article>
      );
    }

    case "fact":
      return (
        <article className={`${CARD} ${HAIRLINE_CARD}`}>
          <SaveLink link={card.link} description={`${card.stat}. ${card.body}`} variant="fact" />
          <Link to={card.link} className="flex flex-col gap-3 px-[26px] pb-7 pt-[30px]" {...prefetch(card.link)}>
            <span className={TOPIC}>{card.category}</span>
            <span className="font-sans font-light text-[52px] leading-none tracking-[-0.03em] text-[#0E7A54] [font-variant-numeric:tabular-nums]">
              {card.stat}
            </span>
            <p className="m-0 text-[14px] leading-[1.6] text-[#5A5A5A]">{card.body}</p>
          </Link>
        </article>
      );

    case "newsletter":
      return (
        <article className={`${CARD} jh-card--nl border border-[rgba(20,20,20,0.10)] bg-white`}>
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

  // Warm every destination chunk while the reader is still reading the board, so a
  // card click renders immediately instead of waiting on a lazy import.
  useEffect(prefetchAllWhenIdle, []);

  const visible = filter === "All" ? JOURNAL_CARDS : JOURNAL_CARDS.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <SEO
        title="The Journal — Zential Pure"
        description={INTRO}
        canonicalUrl="/journal"
      />

      <header className="flex items-center justify-between gap-3 border-b border-[rgba(20,20,20,0.10)] px-5 py-4 md:px-10 md:py-5 lg:px-12">
        <Link to="/" className="inline-flex" aria-label="Zential Pure — home">
          <img src="/editorial/logo/zential-logo-primary.png" alt="Zential Pure" className="block h-5 w-auto" />
        </Link>
        <span className="hidden text-center text-[11px] tracking-[0.35em] uppercase text-[#8E8E8E] md:block">
          The Journal · Save what you will actually use
        </span>
        <a
          className="flex-none rounded-full bg-[#2ED8A8] px-4 py-[9px] font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86]"
          href={pinterestSaveHref("/journal", `Zential Pure. ${INTRO}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Save the board
        </a>
      </header>

      <section className="flex flex-col items-center gap-4 px-5 pt-10 pb-2 text-center md:px-10 md:pt-[52px] lg:px-12 lg:pt-14">
        <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#0E7A54]">( 01 ) &nbsp;·&nbsp; The board</p>
        <h1 className="m-0 max-w-[22ch] font-sans font-light text-[34px] leading-[1.06] tracking-[-0.025em] text-[#141414] md:text-[44px] lg:text-[48px]">
          {INTRO}
        </h1>
        <div className="mt-1 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter the board">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${CHIP}${
                filter === f
                  ? " border-[#141414] bg-[#141414] text-white"
                  : " border-[rgba(20,20,20,0.22)] bg-transparent text-[#5A5A5A] hover:border-[#0E7A54] hover:text-[#0E7A54]"
              }`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <div className="columns-1 gap-5 px-5 pt-8 pb-14 md:columns-2 md:gap-[22px] md:px-10 md:pt-10 md:pb-[60px] min-[1100px]:columns-3 lg:px-12">
        {visible.map((card) => (
          <PinCard key={card.id} card={card} />
        ))}
      </div>

      <EditorialNewsletter
        slug="journal"
        heading="The Sunday Protocol"
        copy="One mechanism, every Sunday. No launches. No offers. One piece of skin science you can verify."
      />

      <footer className="flex flex-col gap-1.5 border-t border-[rgba(20,20,20,0.10)] bg-white px-5 py-6 text-[11px] tracking-[0.22em] uppercase text-[#8E8E8E] md:flex-row md:items-center md:justify-between md:px-10 md:py-7 lg:px-12">
        <span>Zential Pure · Clinic precision. Daily ritual.</span>
        <span>Free EU shipping · Tracked delivery</span>
      </footer>
    </div>
  );
}
