import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

const cards = [
  {
    name: "Red Light",
    param: "630–660nm wavelength",
    mechanism: "Stimulates collagen synthesis in dermal fibroblasts, delivering a youthful glow after running when your skin needs repair.",
    href: "/technology/red-light",
  },
  {
    name: "Microcurrent",
    param: "Frequency: 200–400μA",
    mechanism: "Increases ATP production to firm facial muscles, perfect for toning after a long day behind the screen.",
    href: "/technology/microcurrent",
  },
  {
    name: "EMS",
    param: "Pulse width: 250μs",
    mechanism: "Re-educates muscle memory for a visible lift, ideal post-workout to sculpt and define your contours.",
    href: "/technology/ems",
  },
  {
    name: "Thermal",
    param: "40–42°C thermal",
    mechanism: "Enhances product absorption and microcirculation, maximizing serum efficacy right after cleansing for deeper nourishment.",
    href: "/technology/thermal",
  },
];

export function TechCardsSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="technology" className="relative px-6 md:px-12 lg:px-20 py-12 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-8 md:mb-14 text-center">
          The science behind it
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div
              key={c.name}
              className="rounded-lg p-7 md:p-8 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}
            >
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">{c.name}</h3>
              <p className="text-xs font-medium mb-4" style={{ color: '#C6A07C' }}>{c.param}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">{c.mechanism}</p>
              <Link to={c.href} className="text-xs font-medium hover:underline" style={{ color: '#9B5A2E' }}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
