import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useCallback } from "react";

const pressQuotes = [
  {
    quote: "A new category of at-home device that finally matches clinical outcomes.",
    source: "VOGUE",
    context: "Beauty & Wellness",
  },
  {
    quote: "Zential Pure is doing for skin what Whoop did for fitness — making clinical data personal.",
    source: "ELLE",
    context: "Innovation Edit",
  },
  {
    quote: "The first brand to position skincare as self-optimization rather than vanity.",
    source: "HARPER'S BAZAAR",
    context: "The Future of Beauty",
  },
  {
    quote: "Four clinical technologies. One device. Zero excuses.",
    source: "COSMOPOLITAN",
    context: "Editor's Pick",
  },
  {
    quote: "If you're already tracking your sleep and your macros, this is the missing layer.",
    source: "ALLURE",
    context: "Best of Beauty",
  },
];

export function PressQuotesSection() {
  const ref = useScrollReveal<HTMLElement>();
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((i) => (i + 1) % pressQuotes.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#1A1714' }}>
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        {/* Header */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-center mb-12" style={{ color: '#C6A07C' }}>
          In The Press
        </p>

        {/* Quote display */}
        <div className="text-center min-h-[200px] flex flex-col items-center justify-center">
          <p
            key={active}
            className="font-serif italic text-xl md:text-3xl lg:text-4xl leading-relaxed mb-8 max-w-3xl"
            style={{
              color: '#FAF7F3',
              animation: 'fade-in 0.6s ease-out forwards',
            }}
          >
            "{pressQuotes[active].quote}"
          </p>

          <div
            key={`source-${active}`}
            style={{ animation: 'fade-in 0.6s ease-out 0.2s forwards', opacity: 0 }}
          >
            <p
              className="text-sm tracking-[0.25em] uppercase font-light mb-1"
              style={{ color: '#FAF7F3', opacity: 0.5 }}
            >
              {pressQuotes[active].source}
            </p>
            <p className="text-xs" style={{ color: '#FAF7F3', opacity: 0.25 }}>
              {pressQuotes[active].context}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {pressQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === active ? '#C6A07C' : '#FAF7F3',
                opacity: i === active ? 1 : 0.15,
                transform: i === active ? 'scale(1.4)' : 'scale(1)',
              }}
              aria-label={`Press quote ${i + 1}`}
            />
          ))}
        </div>

        {/* Logo strip */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mt-14 flex-wrap">
          {pressQuotes.map((pq) => (
            <span
              key={pq.source}
              className="text-xs md:text-sm tracking-[0.2em] uppercase font-light cursor-pointer transition-opacity duration-300"
              style={{
                color: '#FAF7F3',
                opacity: pq.source === pressQuotes[active].source ? 0.5 : 0.15,
              }}
              onClick={() => setActive(pressQuotes.findIndex((p) => p.source === pq.source))}
            >
              {pq.source}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
