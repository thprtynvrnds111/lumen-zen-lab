import { useScrollReveal } from "@/hooks/useScrollReveal";
import expert1 from "@/assets/expert-1.webp";
import expert2 from "@/assets/expert-2.webp";
import expert3 from "@/assets/expert-3.webp";

const experts = [
  {
    image: expert1,
    name: "Dr. Rajani Katta, MD",
    title: "Dermatology Advisor",
    credentials: "Board-Certified Dermatologist",
    quote: "Dr. Katta is a board-certified dermatologist, professor, and author specializing in skin aging, diet, and evidence-based skincare. Her work focuses on the three key processes that age the skin: oxidation, inflammation, and glycation — and how targeted daily rituals can counteract them.",
    source: "Credentials verified at doctorkatta.com",
    isQuote: false,
  },
  {
    image: expert2,
    name: "Dr. Michael R. Hamblin, PhD",
    title: "Photobiomodulation Research",
    credentials: "Harvard Medical School / MGH",
    quote: "It's stimulating collagen synthesis. I think that is the main thing. These fine lines and wrinkles will look smoother if you can stimulate some collagen synthesis in the skin, in the dermis.",
    source: "— Dr. Michael R. Hamblin, Associate Professor of Dermatology, Harvard Medical School. Via The Energy Blueprint interview.",
    isQuote: true,
  },
  {
    image: expert3,
    name: "Dr. Pinar Avci, MD",
    title: "Cellular Biology",
    credentials: "Wellman Center for Photomedicine, Harvard",
    quote: "Photons are absorbed by mitochondrial chromophores in skin cells. Consequently, ATP, blood flow, and diverse signaling pathways get activated. Stem cells can be activated, allowing increased tissue repair and healing.",
    source: "— Avci et al., 2013, PubMed PMC4126803",
    isQuote: true,
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
                  width={600}
                  height={600}
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
              <p className="font-serif italic text-sm leading-relaxed text-foreground/60 mb-2">
                {expert.isQuote ? `"${expert.quote}"` : expert.quote}
              </p>
              <p className="text-[9px] tracking-wide text-foreground/30 leading-relaxed">
                {expert.source}
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
