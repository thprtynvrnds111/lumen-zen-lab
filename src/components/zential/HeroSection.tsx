import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ritual.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury beauty ritual devices on marble surface" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-subtle-glow"
        style={{ background: 'radial-gradient(circle, hsl(343 44% 60% / 0.2), transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 section-padding max-w-2xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-background mb-6 text-balance">
          Clinic Precision.<br />Daily Ritual.
        </h1>
        <p className="text-lg md:text-xl text-background/80 font-light leading-relaxed mb-10 max-w-lg">
          Lift. Sculpt. Stimulate collagen.<br />
          Without appointments. Without needles.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="ritual" size="xl" asChild>
            <a href="#devices">Start Your Ritual</a>
          </Button>
          <Button variant="outline-ritual" size="xl" className="border-background/30 text-background hover:bg-background/10" asChild>
            <a href="#science">Discover The Science</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
