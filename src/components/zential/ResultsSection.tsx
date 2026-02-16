import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import beforeImg2 from "@/assets/before2.jpg";
import afterImg2 from "@/assets/after2.jpg";
import beforeImg3 from "@/assets/before3.jpg";
import afterImg3 from "@/assets/after3.jpg";

export function ResultsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Real Transformations</p>
        <h2 className="text-3xl md:text-5xl font-semibold">See The Shift.</h2>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Top row: 2 pairs (4 cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="glass-card p-4 md:p-6 text-center">
            <img src={beforeImg} alt="Before treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Before</span>
          </div>
          <div className="glass-card p-4 md:p-6 text-center">
            <img src={afterImg} alt="After 21 days of treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">After 21 Days</span>
          </div>
          <div className="glass-card p-4 md:p-6 text-center">
            <img src={beforeImg2} alt="Before treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Before</span>
          </div>
          <div className="glass-card p-4 md:p-6 text-center">
            <img src={afterImg2} alt="After 21 days of treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">After 21 Days</span>
          </div>
        </div>

        {/* Bottom row: 1 pair centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6">
          <div className="col-start-1 md:col-start-2 glass-card p-4 md:p-6 text-center">
            <img src={beforeImg3} alt="Before treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Before</span>
          </div>
          <div className="glass-card p-4 md:p-6 text-center">
            <img src={afterImg3} alt="After 21 days of treatment" className="w-full aspect-[4/5] rounded-xl object-cover mb-3" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">After 21 Days</span>
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
