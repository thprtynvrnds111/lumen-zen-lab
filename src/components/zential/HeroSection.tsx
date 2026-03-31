import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ritual-v2.jpg";
import { Sun, Zap, Activity, Flame } from "lucide-react";

const modalities = [
  { icon: Sun, label: "Red Light" },
  { icon: Zap, label: "Microcurrent" },
  { icon: Activity, label: "EMS" },
  { icon: Flame, label: "Thermal" },
];

export function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex flex-col md:flex-row" style={{ backgroundColor: '#F7F4F0' }}>
      {/* Left — Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Zential beauty device" className="w-full h-full object-cover" />
      </div>

      {/* Right — Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center px-8 md:px-16 pb-12 md:pb-0">
        {/* Tagline */}
        <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground mb-10 text-center md:text-left">
          Clinic Precision.<br />Daily Ritual.
        </h1>

        {/* Modality icons */}
        <div className="flex items-center gap-5 md:gap-7 mb-10">
          {modalities.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-2">
              <m.icon size={22} strokeWidth={1.3} style={{ color: '#C6A07C' }} />
              <span className="text-[11px] md:text-xs font-medium tracking-wide" style={{ color: '#9B5A2E' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>



        {/* CTAs */}
        <div className="flex flex-col min-[480px]:flex-row gap-3 w-full max-w-sm">
          <button
            className="flex-1 py-3 px-6 text-sm font-medium text-white rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C6A07C' }}
            onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Order Now
          </button>
          <button
            className="flex-1 py-3 px-6 text-sm font-medium rounded-md border transition-colors hover:bg-black/[0.03]"
            style={{ borderColor: '#C6A07C', color: '#9B5A2E' }}
            onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How It Works →
          </button>
        </div>
      </div>
    </section>
  );
}
