import heroImage1 from "@/assets/hero-ritual-v2.webp";
import heroImage2 from "@/assets/hero-lifestyle-2.webp";
import heroImage3 from "@/assets/hero-lifestyle-3.webp";
import { Sun, Zap, Activity, Flame, Star } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const modalities = [
  { icon: Sun, label: "Red Light" },
  { icon: Zap, label: "Microcurrent" },
  { icon: Activity, label: "EMS" },
  { icon: Flame, label: "Thermal" },
];

const heroImages = [heroImage1, heroImage2, heroImage3];

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const cycleImage = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
      setIsTransitioning(false);
    }, 600);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleImage, 5000);
    return () => clearInterval(interval);
  }, [cycleImage]);

  return (
    <section className="flex flex-col md:flex-row md:min-h-[calc(100vh-88px)]" style={{ backgroundColor: '#F7F4F0' }}>
      {/* Left — Image */}
      <div
        className="w-full md:w-[55%] relative overflow-hidden h-[60vh] md:h-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(1.03)',
          transition: 'opacity 1s ease-out, transform 1.2s ease-out',
        }}
      >
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Zential beauty device"
            width={1080}
            height={1296}
            className="absolute inset-0 w-full h-full object-cover"
            {...(i === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
            style={{
              opacity: currentImage === i ? (isTransitioning ? 0 : 1) : 0,
              transition: 'opacity 0.6s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Right — Content */}
      <div className="w-full md:w-[45%] flex flex-col items-center md:items-start justify-center px-8 md:px-16 py-12 md:py-16">
        <p
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 text-center md:text-left"
          style={{
            color: '#9B5A2E',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}
        >
          Know your skin. Work with it.
        </p>
        <h1
          className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground mb-6 text-center md:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
          }}
        >
          Clinic Precision.<br />Daily Ritual.
        </h1>

        {/* Social proof */}
        <div
          className="flex items-center gap-1.5 mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.55s, transform 0.7s ease-out 0.55s',
          }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#C6A07C" strokeWidth={0} style={{ color: '#C6A07C' }} />
            ))}
          </div>
           <span className="text-xs text-foreground/50 ml-1">4.9 / 5</span>
        </div>

        {/* Modality icons */}
        <div
          className="flex items-center gap-5 md:gap-7 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.7s, transform 0.7s ease-out 0.7s',
          }}
        >
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
        <div
          className="flex flex-col min-[480px]:flex-row gap-3 w-full max-w-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.9s, transform 0.7s ease-out 0.9s',
          }}
        >
          <button
            className="flex-1 py-3.5 px-6 text-sm font-medium text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: '#C6A07C', boxShadow: '0 4px 14px rgba(198,160,124,0.3)' }}
            onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Devices
          </button>
          <button
            className="flex-1 py-3.5 px-6 text-sm font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: '#C6A07C', color: '#9B5A2E', backgroundColor: 'transparent' }}
            onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
