import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SafetyUsageSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-14 text-center">
          How to use it safely
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-5">Usage guide</h3>
            <ul className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              <li><span className="font-medium text-foreground">Session time:</span> 10 minutes per day</li>
              <li><span className="font-medium text-foreground">Frequency:</span> 5× per week</li>
              <li><span className="font-medium text-foreground">What you'll feel:</span> mild warmth, gentle tingling — both normal</li>
              <li>
                <span className="font-medium" style={{ color: '#9B5A2E' }}>What to stop for:</span>{" "}
                <span style={{ color: '#9B5A2E' }}>pain, redness lasting over 1 hour, broken skin in treatment area</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-5">Contraindications</h3>
            <ul className="space-y-3 text-sm" style={{ color: '#9B5A2E' }}>
              <li>Pregnancy</li>
              <li>Active implanted devices (pacemaker)</li>
              <li>Active skin infections or open wounds</li>
              <li>Epilepsy</li>
              <li>Under 18</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
