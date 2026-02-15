const steps = [
  { num: "01", title: "Cleanse", desc: "Start with a clean canvas" },
  { num: "02", title: "Apply Conductive Gel", desc: "Enhance conductivity for optimal results" },
  { num: "03", title: "Glide Upward", desc: "Follow natural facial contours" },
  { num: "04", title: "Pause in Stillness", desc: "Let the frequency work" },
  { num: "05", title: "Repeat Daily", desc: "Consistency creates transformation" },
];

export function RitualSection() {
  return (
    <section id="ritual" className="section-padding">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">The Ritual</p>
        <h2 className="text-3xl md:text-5xl font-semibold">5 Minutes. Every Day.</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-0">
        {steps.map((step, i) => (
          <div key={step.num} className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {step.num}
              </div>
              {i < steps.length - 1 && <div className="w-px h-12 bg-border" />}
            </div>
            <div className="pb-8">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="font-serif italic text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto">
          "Transformation comes from repetition, not force."
        </p>
      </div>
    </section>
  );
}
