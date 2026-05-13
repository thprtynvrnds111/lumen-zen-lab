import heroImage0 from "@/assets/hero-neck-device.png";
import heroImage1 from "@/assets/hero-ritual-v2.webp";
import heroImage2 from "@/assets/hero-lifestyle-2.webp";
import heroImage3 from "@/assets/hero-lifestyle-3.webp";
import { Sun, Zap, Activity, Flame, Star } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const modalities = [
  { icon: Sun, label: "Red Light", color: "#E84040", sub: "photobiomodulation" },
  { icon: Zap, label: "Microcurrent", color: "#4080FF", sub: "bioelectrical" },
  { icon: Activity, label: "EMS", color: "#E87040", sub: "neuromuscular" },
  { icon: Flame, label: "Thermal", color: "#E8A040", sub: "heat shock" },
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
    <section className="flex flex-col md:flex-row md:min-h-[calc(100vh-88px)]" style={{ backgroundColor: '#070A0E' }}>
      {/* Left — Image: always visible for LCP, no JS-gated opacity */}
      <div
        className="w-full md:w-[55%] relative overflow-hidden h-[60vh] md:h-auto"
      >
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Zential recovery device"
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
      <div
        className="w-full md:w-[45%] flex flex-col items-center md:items-start justify-center px-8 md:px-16 lg:px-20 py-14 md:py-16"
        style={{ backgroundColor: '#070A0E' }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}
        >
          <span className="h-px w-6" style={{ backgroundColor: 'rgba(234,231,224,0.25)' }} />
          <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase" style={{ color: 'rgba(234,231,224,0.5)' }}>
            Human Performance Stack
          </p>
        </div>

        {/* Headline */}
        <h1
          className="font-sans font-bold text-[40px] md:text-[56px] lg:text-[68px] leading-[1.04] tracking-tight mb-5 text-center md:text-left text-balance"
          style={{
            color: '#EAE7E0',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
          }}
        >
          Optimize Your<br />Biology.
        </h1>

        {/* Italic subline */}
        <p
          className="font-serif italic text-[14px] md:text-[15px] mb-5 text-center md:text-left"
          style={{
            color: '#E87040',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease-out 0.38s, transform 0.8s ease-out 0.38s',
          }}
        >
          Four technologies. One daily protocol. Measurable output.
        </p>

        {/* Body copy */}
        <p
          className="text-[15px] md:text-base leading-relaxed max-w-md mb-8 text-center md:text-left"
          style={{
            color: 'rgba(234,231,224,0.65)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s ease-out 0.52s, transform 0.8s ease-out 0.52s',
          }}
        >
          Red light therapy, microcurrent, EMS, and infrared — the same technologies used in elite performance labs, now engineered into your daily stack.
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
              <Star key={i} size={14} fill="#E87040" style={{ color: '#E87040' }} />
            ))}
          </div>
          <span className="text-xs tracking-wide" style={{ color: 'rgba(234,231,224,0.5)' }}>
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
            style={{ backgroundColor: '#E87040', color: '#ffffff', boxShadow: '0 0 24px rgba(232,112,64,0.25)' }}
            onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop the Protocol
          </button>
          <Link
            to="/quiz"
            className="flex-1 py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5 text-center"
            style={{ borderColor: 'rgba(234,231,224,0.25)', color: '#EAE7E0', backgroundColor: 'transparent' }}
          >
            Take the 60s Quiz
          </Link>
        </div>

        {/* Trust strip */}
        <div
          className="flex flex-wrap gap-x-5 gap-y-1.5 mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease-out 0.78s, transform 0.7s ease-out 0.78s',
          }}
        >
          {['Free EU Shipping', '30-Day Guarantee', 'Lab-Grade Technology'].map(label => (
            <span key={label} className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(234,231,224,0.45)' }}>
              <span style={{ color: '#E87040', fontSize: 13 }}>✓</span>
              {label}
            </span>
          ))}
        </div>

        {/* Modality cards */}
        <div
          className="w-full max-w-md pt-6"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease-out 0.85s, transform 0.8s ease-out 0.85s',
          }}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 text-center md:text-left" style={{ color: 'rgba(234,231,224,0.35)' }}>
            Four protocols. One stack.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {modalities.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center gap-2 rounded-xl py-3 px-1"
                style={{ backgroundColor: '#111820', border: `1px solid ${m.color}28`, borderTop: `2px solid ${m.color}` }}
              >
                <m.icon size={16} strokeWidth={1.5} style={{ color: m.color }} />
                <span className="text-[9px] tracking-[0.12em] uppercase text-center" style={{ color: '#EAE7E0' }}>
                  {m.label}
                </span>
                <span className="text-[8px] tracking-wide" style={{ color: 'rgba(234,231,224,0.6)' }}>
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
