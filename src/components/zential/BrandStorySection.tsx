import { useScrollReveal } from "@/hooks/useScrollReveal";
import brandStoryImg from "@/assets/brand-story.webp";

export function BrandStorySection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="flex flex-col md:flex-row min-h-[60vh]">
        {/* Content side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 md:py-20 order-2 md:order-1">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#9B5A2E' }}>
            Our Story
          </p>

          <h2 className="font-serif italic text-3xl md:text-4xl text-foreground leading-[1.15] mb-6">
            Born from a question:<br />
            <span style={{ color: '#9B5A2E' }}>why can't I do this at home?</span>
          </h2>

          <p className="text-sm leading-relaxed text-foreground/60 mb-6 max-w-md">
            After years of clinic appointments, expensive treatments, and inconsistent results — 
            we asked ourselves: what if the clinical technologies dermatologists rely on 
            could be engineered for daily self-use? Not simplified. Not watered down. 
            Properly calibrated for the biology of consistent, at-home application.
          </p>

          <p className="text-sm leading-relaxed text-foreground/60 mb-8 max-w-md">
            That question became Zential Pure — a system built around the same four modalities 
            clinics use (red light, microcurrent, EMS, thermal), engineered into devices 
            designed for a five-minute daily ritual. Because transformation doesn't come 
            from one appointment. It comes from what you repeat.
          </p>

          {/* Values */}
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {[
              { label: "Clinical-Grade", desc: "Technology" },
              { label: "Daily-Use", desc: "Engineering" },
              { label: "Transparent", desc: "Science" },
              { label: "Zero", desc: "Compromise" },
            ].map((v) => (
              <div key={v.label} className="border-t pt-3" style={{ borderColor: '#D8D3CC' }}>
                <p className="text-xs font-medium text-foreground">{v.label}</p>
                <p className="text-[10px] text-foreground/40 uppercase tracking-wider">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="w-full md:w-1/2 relative order-1 md:order-2">
          <img
            src={brandStoryImg}
            alt="Zential Pure device in lifestyle setting"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1080}
            height={720}
            style={{ minHeight: '50vh' }}
          />
        </div>
      </div>
    </section>
  );
}
