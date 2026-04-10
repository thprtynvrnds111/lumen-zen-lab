import { useScrollReveal } from "@/hooks/useScrollReveal";
import expert1 from "@/assets/expert-1.jpg";
import expert2 from "@/assets/expert-2.jpg";
import expert3 from "@/assets/expert-3.jpg";

const experts = [
  {
    image: expert1,
    name: "Dr. Elena Marchetti",
    title: "Dermatology Advisor",
    credentials: "MD, Board-Certified Dermatologist",
    quote: "The combination of microcurrent and red light at these frequencies mirrors what we achieve in-clinic — but with the consistency advantage of daily home use.",
  },
  {
    image: expert2,
    name: "Prof. Henrik Lund",
    title: "Biomedical Engineering",
    credentials: "PhD, Bioelectrical Systems",
    quote: "What sets this apart is the frequency calibration. Each modality is tuned to the specific cellular response threshold — not just emitting energy, but directing it.",
  },
  {
    image: expert3,
    name: "Dr. Sofia Chen",
    title: "Cellular Biology",
    credentials: "PhD, Mitochondrial Research",
    quote: "EMS and thermal therapy work synergistically at the cellular level. The thermal element increases membrane permeability, amplifying the electrical stimulus.",
  },
];

export function ExpertsSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="section-padding" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: '#9B5A2E' }}>
            The Minds Behind The System
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-4">
            Science. Proof. Precision.
          </h2>
          <p className="text-sm text-foreground/50 max-w-md mx-auto">
            Our technology is developed alongside leading researchers in dermatology, bioelectrical systems, and cellular biology.
          </p>
        </div>

        {/* Expert cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {experts.map((expert) => (
            <div key={expert.name} className="group">
              {/* Photo */}
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={640}
                  height={640}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm">{expert.name}</p>
                  <p className="text-white/60 text-xs">{expert.credentials}</p>
                </div>
              </div>

              {/* Info */}
              <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: '#C6A07C' }}>
                {expert.title}
              </p>
              <p className="font-serif italic text-sm leading-relaxed text-foreground/60">
                "{expert.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="py-3 px-8 text-sm font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: '#C6A07C', color: '#9B5A2E' }}
            onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Technology
          </button>
        </div>
      </div>
    </section>
  );
}
