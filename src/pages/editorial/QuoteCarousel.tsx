import { useState } from "react";
import type { Citation } from "./citations";
import { pubmedHref } from "./citations";

/**
 * Citation carousel. Formerly a carousel of three "voices" — unnamed roles over stock
 * portraits of strangers, saying things no one could check. It now cycles real papers:
 * the verbatim finding, the study design, the honest limit, and a PMID.
 */
export function QuoteCarousel({ citations }: { citations: Citation[] }) {
  const [i, setI] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const c = citations[i];
  return (
    <section className="ed-sec ed-carousel" style={{ borderTop: "1px solid var(--ed-line)", borderBottom: "1px solid var(--ed-line)", padding: "36px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
        <span className="meta-label">From the literature</span>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button className="car-btn" type="button" aria-label="Previous citation"
            onClick={() => setI((i - 1 + citations.length) % citations.length)}>←</button>
          <span className="car-counter">{pad(i + 1)} / {pad(citations.length)}</span>
          <button className="car-btn" type="button" aria-label="Next citation"
            onClick={() => setI((i + 1) % citations.length)}>→</button>
        </div>
      </div>
      <div style={{ minHeight: "168px" }} aria-live="polite" aria-atomic="true">
        <blockquote className="expert-quote" style={{ fontSize: "20px", margin: "0 0 16px" }}>{c.quote}</blockquote>
        <p className="attribution" style={{ marginBottom: "4px" }}>
          {c.authors}, {c.journal}, {c.year}
        </p>
        <p className="ed-citation__design">{c.design}</p>
        <p className="ed-citation__limit">
          <strong>What it does not show — </strong>
          {c.limit}
        </p>
        <a className="ed-citation__verify" href={pubmedHref(c.pmid)} target="_blank" rel="noopener noreferrer">
          Verify on PubMed · PMID {c.pmid} ↗
        </a>
      </div>
    </section>
  );
}
