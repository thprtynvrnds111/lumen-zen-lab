export function ResultsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Real Transformations</p>
        <h2 className="text-3xl md:text-5xl font-semibold">See The Shift.</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 text-center">
            <div className="w-full aspect-[4/5] rounded-xl bg-secondary/50 mb-4 flex items-center justify-center">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Before</span>
            </div>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="w-full aspect-[4/5] rounded-xl bg-secondary/50 mb-4 flex items-center justify-center">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">After 21 Days</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="font-serif italic text-xl md:text-2xl text-muted-foreground max-w-md mx-auto mb-2">
            "I stopped booking facials. This became my ritual."
          </p>
          <p className="text-xs tracking-[0.1em] uppercase text-accent">Verified · After 21 days</p>
        </div>
      </div>
    </section>
  );
}
