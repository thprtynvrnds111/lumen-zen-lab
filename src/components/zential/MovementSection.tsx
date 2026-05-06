import { useScrollReveal } from "@/hooks/useScrollReveal";

const STACK = [
  { category: "Sleep", brand: "Eight Sleep" },
  { category: "Nutrition", brand: "AG1" },
  { category: "Performance", brand: "Whoop" },
  { category: "Skin", brand: "Zential Pure", active: true },
];

export function MovementSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF7F3" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-8" style={{ backgroundColor: "#C6A07C", opacity: 0.6 }} />
          <p
            className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase"
            style={{ color: "#C6A07C" }}
          >
            Skin Intelligence
          </p>
          <span className="h-px w-8" style={{ backgroundColor: "#C6A07C", opacity: 0.6 }} />
        </div>

        {/* Headline */}
        <h2
          className="font-serif italic text-[38px] md:text-[58px] lg:text-[64px] leading-[1.04] tracking-[-0.01em] mb-8 text-balance"
          style={{ color: "#1A1714" }}
        >
          You already track everything.<br className="hidden md:block" />
          Your skin is next.
        </h2>

        {/* Body */}
        <p
          className="text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-16"
          style={{ color: "#1A1714", opacity: 0.6 }}
        >
          The most optimized people on earth don't leave anything to chance.
          Sleep, nutrition, performance. Each one has its category leader.
          Zential is building the same category for skin.
          Not skincare. Skin Intelligence.
        </p>

        {/* Stack row */}
        <div
          className="inline-grid grid-cols-2 md:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden border"
          style={{ borderColor: "rgba(26,23,20,0.1)" }}
        >
          {STACK.map((item) => (
            <div
              key={item.category}
              className="flex flex-col items-center justify-center px-6 py-6 md:py-7 gap-1.5"
              style={{
                backgroundColor: item.active ? "#1A1714" : "#F0EDE8",
              }}
            >
              <span
                className="text-[9px] tracking-[0.3em] uppercase font-medium"
                style={{ color: item.active ? "#C6A07C" : "rgba(26,23,20,0.4)" }}
              >
                {item.category}
              </span>
              <span
                className="text-[13px] md:text-[14px] font-medium tracking-wide"
                style={{ color: item.active ? "#FAF7F3" : "rgba(26,23,20,0.55)" }}
              >
                {item.brand}
              </span>
            </div>
          ))}
        </div>

        {/* Manifesto pull quote */}
        <blockquote
          className="font-serif italic text-[20px] md:text-[26px] leading-[1.45] max-w-2xl mx-auto mb-6"
          style={{ color: "#1A1714", opacity: 0.82 }}
        >
          "This isn't about looking younger.<br className="hidden md:block" />
          It's about taking your skin as seriously<br className="hidden md:block" />
          as everything else you already optimise."
        </blockquote>

        <p
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "#C6A07C" }}
        >
The Zential Movement
        </p>

      </div>
    </section>
  );
}
