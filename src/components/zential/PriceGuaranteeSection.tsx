import { useScrollReveal } from "@/hooks/useScrollReveal";

const comparisons = [
  { name: "Clinic session", price: "€150 each", label: "per visit", highlight: false },
  { name: "NuFACE Trinity", price: "€349", label: "one modality", highlight: false },
  { name: "Zential Pure", price: "€88", label: "four technologies", highlight: true },
];

export function PriceGuaranteeSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif italic text-3xl md:text-4xl mb-14" style={{ color: '#1A1714' }}>
          What €88 actually means
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {comparisons.map((c) => (
            <div
              key={c.name}
              className="rounded-xl p-7 transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: '#FFFFFF',
                border: c.highlight ? '2px solid #F69251' : '1px solid rgba(107,90,74,0.25)',
              }}
            >
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,23,20,0.5)' }}>{c.label}</p>
              <p className="font-serif text-lg font-bold mb-1" style={{ color: '#1A1714' }}>{c.name}</p>
              <p className="text-2xl font-medium" style={{ color: c.highlight ? '#F69251' : '#1A1714' }}>{c.price}</p>
            </div>
          ))}
        </div>
        <p className="font-serif italic text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(26,23,20,0.65)' }}>
          14-day return. Email us at info@zentialpure.com. We refund.<br />
          No forms. No photos. No return required.
        </p>
      </div>
    </section>
  );
}
