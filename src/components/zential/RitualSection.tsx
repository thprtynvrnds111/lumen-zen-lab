import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

const steps = [
  { num: "01", title: "Cleanse", desc: "Start with a clean canvas" },
  { num: "02", title: "Apply Gel", desc: "Enhance conductivity for optimal results" },
  { num: "03", title: "Glide Upward", desc: "Follow natural facial contours" },
  { num: "04", title: "Pause", desc: "Let the frequency work" },
  { num: "05", title: "Repeat Daily", desc: "Consistency creates transformation" },
];

export function RitualSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="ritual" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#EDE9E3' }}>
      <BubbleBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#9B5A2E' }}>The Ritual</p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-foreground">5 Minutes. Every Day.</h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6 items-start group cursor-default">
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full border flex items-center justify-center text-xs font-medium transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                  style={{ borderColor: '#C6A07C', color: '#9B5A2E' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C6A07C';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#9B5A2E';
                  }}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && <div className="w-px h-10" style={{ backgroundColor: '#D8D3CC' }} />}
              </div>
              <div className="pb-6 pt-2.5 transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="font-serif text-base font-bold text-foreground mb-0.5 transition-colors duration-300 group-hover:text-[#9B5A2E]">{step.title}</h3>
                <p className="text-sm text-foreground/60 transition-opacity duration-300 group-hover:opacity-100">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-serif italic text-lg text-foreground/50 max-w-md mx-auto">
            "Transformation comes from repetition, not force."
          </p>
        </div>
      </div>
    </section>
  );
}
