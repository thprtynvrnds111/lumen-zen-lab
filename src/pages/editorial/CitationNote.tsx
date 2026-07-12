import type { Citation } from "./citations";
import { pubmedHref } from "./citations";

/**
 * An inline evidence block for the editorial pages.
 *
 * Replaces the old "expert quote" sections, which paired an anonymous internal role
 * ("Clinical Advisor · Zential Pure") with a stock photo of a stranger. A reader could
 * not verify any of it. This can be verified in one click — and it always states what
 * the paper does not show, which is the part that makes the rest believable.
 */
export function CitationNote({ citation }: { citation: Citation }) {
  return (
    <section
      className="reveal ed-sec ed-citation"
      style={{
        padding: "36px 24px",
        borderTop: "1px solid var(--ed-line)",
        borderBottom: "1px solid var(--ed-line)",
      }}
    >
      <span className="meta-label">From the literature</span>
      <blockquote className="expert-quote" style={{ fontSize: "18px", margin: "14px 0 16px" }}>
        {citation.quote}
      </blockquote>
      <p className="attribution" style={{ marginBottom: "4px" }}>
        {citation.authors}, {citation.journal}, {citation.year}
      </p>
      <p className="ed-citation__design">{citation.design}</p>
      <p className="ed-citation__limit">
        <strong>What it does not show — </strong>
        {citation.limit}
      </p>
      {citation.quoteSource && <p className="ed-citation__note">{citation.quoteSource}</p>}
      {citation.disclosure && <p className="ed-citation__note">{citation.disclosure}</p>}
      <a
        className="ed-citation__verify"
        href={pubmedHref(citation.pmid)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Verify on PubMed · PMID {citation.pmid} ↗
      </a>
    </section>
  );
}
