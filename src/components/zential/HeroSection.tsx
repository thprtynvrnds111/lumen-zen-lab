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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Zential beauty device" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding max-w-2xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-background mb-8 text-balance">
          Clinic Precision.<br />Daily Ritual.
        </h1>

        {/* Modality icons */}
        <div className="flex items-center gap-6 md:gap-8 mb-8">
          {modalities.map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <m.icon size={18} className="text-background/70" strokeWidth={1.5} />
              <span className="text-xs md:text-sm text-background/80 tracking-wide">{m.label}</span>
              {i < modalities.length - 1 && (
                <span className="text-background/30 ml-4 hidden sm:inline">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Price */}
        <p className="text-2xl md:text-3xl font-semibold text-background mb-8">€84</p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Button variant="ritual" size="xl" asChild>
            <a href="#devices">Order Now</a>
          </Button>
          <Button variant="outline-ritual" size="xl" className="border-background/30 text-background hover:bg-background/10" asChild>
            <a href="#science">How It Works →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
