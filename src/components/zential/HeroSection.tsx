import { Button } from "@/components/ui/button";
import heroDevice from "@/assets/hero-device.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, hsl(343 44% 60% / 0.12), hsl(28 23% 88% / 0.08), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background:
              "linear-gradient(to top, hsl(30 27% 95%), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 section-padding w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left – Copy */}
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-semibold">
            Clinical Precision Technology
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-6 text-balance">
            Clinic Precision.<br />Daily Ritual.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
            Lift. Sculpt. Stimulate collagen.<br />
            Without appointments. Without needles.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="ritual" size="xl" asChild>
              <a href="#devices">Start Your Ritual</a>
            </Button>
            <Button variant="outline-ritual" size="xl">
              Discover The Science
            </Button>
          </div>
        </div>

        {/* Right – Product Showcase */}
        <div className="relative flex items-center justify-center">
          {/* Rainbow iridescence arcs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full opacity-40 animate-subtle-glow"
              style={{
                background:
                  "conic-gradient(from 120deg, hsl(343 44% 60% / 0.15), hsl(165 35% 63% / 0.12), hsl(40 60% 70% / 0.1), hsl(280 40% 70% / 0.08), hsl(343 44% 60% / 0.15))",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Soft light rays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-[300px] h-[600px] md:w-[400px] md:h-[700px] opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(30 50% 90% / 0.6), transparent 70%)",
              }}
            />
          </div>

          {/* Floating candle elements */}
          <div className="absolute bottom-8 left-4 md:left-8 flex flex-col items-center gap-1 opacity-50">
            <div
              className="w-2 h-3 rounded-full animate-subtle-glow"
              style={{
                background:
                  "radial-gradient(circle, hsl(35 90% 65%), hsl(25 80% 50%))",
                boxShadow: "0 0 12px 4px hsl(35 90% 65% / 0.4)",
              }}
            />
            <div className="w-3 h-10 rounded-sm bg-secondary/60" />
          </div>
          <div className="absolute bottom-12 right-8 md:right-16 flex flex-col items-center gap-1 opacity-40">
            <div
              className="w-1.5 h-2.5 rounded-full animate-subtle-glow"
              style={{
                background:
                  "radial-gradient(circle, hsl(35 90% 65%), hsl(25 80% 50%))",
                boxShadow: "0 0 10px 3px hsl(35 90% 65% / 0.35)",
                animationDelay: "1s",
              }}
            />
            <div className="w-2.5 h-8 rounded-sm bg-secondary/50" />
          </div>
          <div className="absolute top-20 right-4 flex flex-col items-center gap-1 opacity-30">
            <div
              className="w-1.5 h-2 rounded-full animate-subtle-glow"
              style={{
                background:
                  "radial-gradient(circle, hsl(35 90% 65%), hsl(25 80% 50%))",
                boxShadow: "0 0 8px 2px hsl(35 90% 65% / 0.3)",
                animationDelay: "2s",
              }}
            />
            <div className="w-2 h-6 rounded-sm bg-secondary/40" />
          </div>

          {/* Hero device image */}
          <img
            src={heroDevice}
            alt="ZENTIAL PURE Ritual Device — microcurrent and LED therapy"
            className="relative z-10 h-[450px] md:h-[550px] lg:h-[600px] w-auto object-contain drop-shadow-2xl"
            style={{
              filter:
                "drop-shadow(0 20px 40px hsl(343 44% 60% / 0.15)) drop-shadow(0 0 80px hsl(30 27% 95% / 0.3))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
