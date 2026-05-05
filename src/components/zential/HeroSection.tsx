import heroImage0 from "@/assets/hero-neck-device.png";
import heroImage1 from "@/assets/hero-ritual-v2.webp";
import heroImage2 from "@/assets/hero-lifestyle-2.webp";
import heroImage3 from "@/assets/hero-lifestyle-3.webp";
import { Sun, Zap, Activity, Flame, Star } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const modalities = [
  { icon: Sun, label: "Red Light" },
  { icon: Zap, label: "Microcurrent" },
  { icon: Activity, label: "EMS" },
  { icon: Flame, label: "Thermal" },
];

const heroImages = [heroImage0, heroImage1, heroImage2, heroImage3];

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
    <section className="flex flex-col md:flex-row md:min-h-[calc(100vh-88px)] bg-background">
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
            {...(i === 0 ? { fetchpriority: "high" as any, loading: "eager" as const } : { loading: "lazy" as const })}
            style={{
              opacity: currentImage === i ? (isTransitioning ? 0 : 1) : 0,
              transition: 'opacity 0.6s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Right — Content */}
      <div className="w-full md:w-[45%] flex flex-col items-center md:items-start justify-center px-8 md:px-16 lg:px-20 py-14 md:py-16">
        <div
          className="flex items-center gap-3 mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}
        >
          <span className="h-px w-6" style={{ backgroundColor: '#e8e8ed' }} />
          <p className="text-muted-foreground text-[10px] md:text-[11px] tracking-[0.32em] uppercase">
            At-Home Facial Technology
          </p>
        </div>

        <h1
          className="font-sans font-bold text-[40px] md:text-[56px] lg:text-[68px] leading-[1.04] tracking-tight text-foreground mb-5 text-center md:text-left text-balance"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
          }}
        >
          Clinic Precision.<br />Daily Ritual.
        </h1>

        <p
          className="text-muted-foreground text-[15px] md:text-base leading-relaxed max-w-md mb-8 text-center md:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s ease-out 0.45s, transform 0.8s ease-out 0.45s',
          }}
        >
          Four clinically inspired technologies in one quiet ritual. Designed for visible firmness, tone and lift — five minutes a day, in your own bathroom.
        </p>

        {/* Social proof */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.55s, transform 0.7s ease-out 0.55s',
          }}
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f69251" style={{ color: '#f69251' }} />
            ))}
          </div>
          <span className="text-muted-foreground text-xs tracking-wide">
            4.9 / 5 — rated by our community
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col min-[480px]:flex-row gap-3 w-full max-w-md mb-9"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.7s, transform 0.7s ease-out 0.7s',
          }}
        >
          <button
            className="flex-1 py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: '#f69251', color: '#000000', boxShadow: 'rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.02) 0px 4px 8px' }}
            onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop the Ritual
          </button>
          <Link
            to="/quiz"
            className="flex-1 py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5 text-center"
            style={{ borderColor: '#1d1d1f', color: '#1d1d1f', backgroundColor: 'transparent' }}
          >
            Take the 60s Quiz
          </Link>
        </div>

        {/* Modality strip — editorial */}
        <div
          className="w-full max-w-md pt-6 border-t"
          style={{
            borderColor: 'hsl(240 9% 92%)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease-out 0.85s, transform 0.8s ease-out 0.85s',
          }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3 text-center md:text-left" style={{ color: '#636363' }}>
            Four technologies. One ritual.
          </p>
          <div className="flex items-center justify-between md:justify-start md:gap-7">
            {modalities.map((m) => (
              <div key={m.label} className="flex flex-col items-center md:items-start gap-1.5">
                <m.icon size={18} strokeWidth={1.3} style={{ color: '#1d1d1f' }} />
                <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase" style={{ color: '#1d1d1f' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
