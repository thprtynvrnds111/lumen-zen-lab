import { useState } from "react";

export interface CarouselQuote {
  text: string;
  role: string;
  img: string;
}

export function QuoteCarousel({ quotes }: { quotes: CarouselQuote[] }) {
  const [i, setI] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const q = quotes[i];
  return (
    <section className="ed-sec ed-carousel" style={{ borderTop: "1px solid var(--ed-line)", borderBottom: "1px solid var(--ed-line)", padding: "36px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
        <span className="meta-label">Voices</span>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button className="car-btn" type="button" aria-label="Previous quote"
            onClick={() => setI((i - 1 + quotes.length) % quotes.length)}>←</button>
          <span className="car-counter">{pad(i + 1)} / {pad(quotes.length)}</span>
          <button className="car-btn" type="button" aria-label="Next quote"
            onClick={() => setI((i + 1) % quotes.length)}>→</button>
        </div>
      </div>
      <div style={{ minHeight: "168px" }} aria-live="polite" aria-atomic="true">
        <p className="expert-quote" style={{ fontSize: "20px", marginBottom: "18px" }}>{q.text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img className="portrait" src={q.img} alt="Portrait" width={44} height={44} loading="lazy" />
          <p className="attribution">{q.role}</p>
        </div>
      </div>
    </section>
  );
}
