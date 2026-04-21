import { useScrollReveal } from "@/hooks/useScrollReveal";
import poster1 from "@/assets/tutorial-step-1.png";
import poster2 from "@/assets/lifestyle-redlight.webp";
import poster3 from "@/assets/hero-ritual-v2.webp";

const tutorials = [
  {
    poster: poster1,
    eyebrow: "Step 01",
    title: "Cleanse & Prep",
    duration: "0:45",
  },
  {
    poster: poster2,
    eyebrow: "Step 02",
    title: "Activate the Device",
    duration: "1:10",
  },
  {
    poster: poster3,
    eyebrow: "Step 03",
    title: "Glide & Sculpt",
    duration: "1:30",
  },
];

export function TutorialStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F7F4F0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#9B5A2E" }}
          >
            The Ritual, In Motion
          </p>
          <h2
            className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
            style={{ color: "#2A211A" }}
          >
            How It Works
          </h2>
          <p
            className="mt-4 text-sm md:text-base max-w-xl mx-auto"
            style={{ color: "#6B5A4A" }}
          >
            Three short tutorials. Under four minutes total. Everything you need to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tutorials.map((t, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] text-left transition-all duration-500 hover:-translate-y-1"
              style={{
                boxShadow: "0 8px 30px rgba(74,55,40,0.08)",
              }}
            >
              <img
                src={t.poster}
                alt={t.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(42,33,26,0) 40%, rgba(42,33,26,0.65) 100%)",
                }}
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-1.5"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {t.eyebrow}
                </p>
                <h3
                  className="font-serif italic text-xl md:text-2xl leading-tight"
                  style={{ color: "#FFFFFF" }}
                >
                  {t.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
