import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  {
    name: "EMS",
    param: "Pulse width 250μs",
    mechanism: "Stronger pulses engage the facial muscle directly. The basis of trained lift and definition.",
    href: "/technology/ems",
  },
  {
    name: "Microcurrent",
    param: "200–400μA",
    mechanism: "Low current at the threshold the muscle responds to. The same principle as professional facial toning.",
    href: "/technology/microcurrent",
  },
  {
    name: "Thermal",
    param: "40–42°C",
    mechanism: "Gentle heat opens microcirculation and primes the skin to take in what follows.",
    href: "/technology/thermal",
  },
];

export function TechCardsSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="technology" className="relative px-6 md:px-12 lg:px-20 py-12 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif italic text-3xl md:text-4xl mb-8 md:mb-14 text-center" style={{ color: '#1A1714' }}>
          The four technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div
              key={c.name}
              className="rounded-lg p-7 md:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(107,90,74,0.25)' }}
            >
              <h3 className="font-serif text-xl font-bold mb-1" style={{ color: '#1A1714' }}>{c.name}</h3>
              <p className="text-xs font-medium mb-4" style={{ color: '#F69251' }}>{c.param}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(26,23,20,0.7)' }}>{c.mechanism}</p>
              <Link to={c.href} className="text-xs font-medium hover:underline" style={{ color: '#F69251' }}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
