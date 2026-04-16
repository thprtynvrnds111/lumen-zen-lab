import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

const comparisons = [
  { name: "Clinic session", price: "€150 each", label: "per visit", highlight: false },
  { name: "NuFACE Trinity", price: "€349", label: "one modality", highlight: false },
  { name: "Zential Pure", price: "€84", label: "four technologies", highlight: true },
];

export function PriceGuaranteeSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-14">
          What €84 actually means
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {comparisons.map((c) => (
            <div
              key={c.name}
              className="rounded-xl p-7 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: c.highlight ? '#FAF7F3' : '#EFEBE5',
                border: c.highlight ? '2px solid #C6A07C' : '1px solid #E4DFD8',
              }}
            >
              <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">{c.label}</p>
              <p className="font-serif text-lg font-bold text-foreground mb-1">{c.name}</p>
              <p className="text-2xl font-medium text-foreground">{c.price}</p>
            </div>
          ))}
        </div>
        <p className="font-serif italic text-lg text-foreground/70 max-w-md mx-auto leading-relaxed">
          30-day return. Email us at info@zentialpure.com. We refund.<br />
          No forms. No photos. No return required.
        </p>
      </div>
    </section>
  );
}
