import { useEffect, useRef, useState } from "react";
import testimonialSarah from "@/assets/testimonial-sarah.jpg";
import testimonialMarie from "@/assets/testimonial-marie.jpg";
import testimonialElena from "@/assets/testimonial-elena.jpg";
import testimonialJulia from "@/assets/testimonial-julia.jpg";
import testimonialAnna from "@/assets/testimonial-anna.jpg";

const testimonials = [
  { name: "Sarah M.", timeline: "After 14 Days", quote: "My jawline looks sculpted. I can't believe this is from a home device.", img: testimonialSarah },
  { name: "Marie L.", timeline: "After 30 Days", quote: "The glow is real. People keep asking what I changed.", img: testimonialMarie },
  { name: "Elena R.", timeline: "After 21 Days", quote: "I stopped booking facials. This became my ritual.", img: testimonialElena },
  { name: "Julia K.", timeline: "After 14 Days", quote: "Clinical precision at home. I'm never going back.", img: testimonialJulia },
  { name: "Anna B.", timeline: "After 21 Days", quote: "My skin texture transformed. It feels like silk.", img: testimonialAnna },
];

export function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      if (!paused) el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    }, 30);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Verified Experiences</p>
        <h2 className="text-3xl md:text-4xl font-semibold">Trusted by Thousands</h2>
      </div>
      <div ref={scrollRef} className="overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex gap-6" style={{ width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="glass-card p-8 w-[340px] flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    style={
                      t.name === "Elena R." ? { objectPosition: "center", transform: "scale(1.4)" } :
                      t.name === "Anna B." ? { objectPosition: "60% center", transform: "scale(1.4)" } :
                      undefined
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-accent">{t.timeline}</p>
                </div>
              </div>
              <p className="font-serif italic text-lg leading-relaxed text-foreground/80">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
