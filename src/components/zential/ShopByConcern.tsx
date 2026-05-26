import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/shopify";

const concerns = [
  {
    label: "Face Protocol",
    sub: "EMS lift, contour, microcurrent stack",
    devices: "Sculpt Wand · Freq. Wand Pro · Face Introducer",
    handle: "facial-beauty-tools-and-ems-beauty-equipment",
    accent: "#E87040",
    glow: "rgba(232,112,64,0.12)",
    border: "rgba(232,112,64,0.3)",
  },
  {
    label: "Red Light Therapy",
    sub: "660–850nm full-body photobiomodulation",
    devices: "Red Light Belt · Red Light Mat",
    handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
    accent: "#E83828",
    glow: "rgba(232,56,40,0.1)",
    border: "rgba(232,56,40,0.28)",
  },
  {
    label: "Frequency Stack",
    sub: "Daily microcurrent & cellular activation",
    devices: "Skin Pulse · Frequency Wand · Gua Sha",
    handle: "electric-micro-current",
    accent: "#2ED8A8",
    glow: "rgba(46,216,168,0.1)",
    border: "rgba(46,216,168,0.28)",
  },
  {
    label: "Eye Recovery",
    sub: "LED pulse, thermal repair",
    devices: "Eye Activator · Frame Pulse",
    handle: "eye-massage",
    accent: "#60A8F8",
    glow: "rgba(96,168,248,0.1)",
    border: "rgba(96,168,248,0.28)",
  },
  {
    label: "Body Protocol",
    sub: "EMS sculpt, compression, fascia release",
    devices: "Body Lift · Foam Roller · Leg Massager",
    handle: "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
    accent: "#C6A07C",
    glow: "rgba(198,160,124,0.1)",
    border: "rgba(198,160,124,0.28)",
  },
  {
    label: "Recovery & Sleep",
    sub: "Pressure therapy, infrared, deep rest",
    devices: "Acupressure Mat · Sauna Blanket · Weighted Blanket",
    handle: "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.28)",
  },
];

export function ShopByConcern() {
  const ref = useScrollReveal<HTMLElement>();
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProducts(50).then(products => {
      const map: Record<string, string> = {};
      concerns.forEach(c => {
        const match = products.find(p => p.node.handle === c.handle);
        const url = match?.node.images.edges[0]?.node.url;
        if (url) map[c.handle] = url;
      });
      setImages(map);
    }).catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="px-6 md:px-12 lg:px-20 py-20 md:py-28"
      style={{ backgroundColor: '#070A0E' }}
      aria-label="Find your protocol"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6" style={{ backgroundColor: '#E87040', opacity: 0.6 }} />
              <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: '#E87040' }}>
                Find your protocol
              </p>
            </div>
            <h2
              className="font-serif italic text-[34px] md:text-5xl leading-[1.05] tracking-[-0.01em] text-balance"
              style={{ color: '#EAE7E0' }}
            >
              Start where it matters.
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-sm leading-relaxed" style={{ color: 'rgba(234,231,224,0.55)' }}>
            Four protocols. One optimization system. Start where your body signals — then layer from there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {concerns.map((c) => (
            <Link
              key={c.label}
              to={(c as any).to ?? `/product/${c.handle}`}
              className="group relative overflow-hidden rounded-[20px] flex flex-col p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: '#111820',
                border: `1px solid ${c.border}`,
                boxShadow: `0 0 0 0 ${c.glow}`,
                minHeight: 420,
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${c.glow}`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${c.glow}`)}
            >
              {/* Radial glow bg */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 30%, ${c.glow} 0%, transparent 70%)` }}
              />

              {/* Top: Protocol badge */}
              <div className="relative flex-shrink-0">
                <span
                  className="text-[9px] tracking-[0.25em] uppercase font-medium px-2 py-[3px] rounded-sm"
                  style={{ backgroundColor: c.glow, color: c.accent, border: `1px solid ${c.border}` }}
                >
                  Protocol
                </span>
              </div>

              {/* Middle: Product image */}
              <div className="relative flex-1 flex items-center justify-center py-5">
                {images[c.handle] ? (
                  <img
                    src={`${images[c.handle]}&width=300`}
                    alt={c.label}
                    width={140}
                    height={140}
                    className="w-[140px] h-[140px] object-contain transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: `drop-shadow(0 8px 24px ${c.accent}55)` }}
                  />
                ) : (
                  <div className="w-[140px] h-[140px] rounded-full animate-pulse" style={{ backgroundColor: '#1C2533' }} />
                )}
              </div>

              {/* Bottom: Text + CTA */}
              <div className="relative flex-shrink-0">
                <h3
                  className="font-serif italic text-2xl md:text-[26px] leading-[1.1] mb-1.5"
                  style={{ color: '#EAE7E0' }}
                >
                  {c.label}
                </h3>
                <p className="text-[12px] mb-4" style={{ color: 'rgba(234,231,224,0.55)' }}>
                  {c.sub}
                </p>
                <div className="h-px w-full mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />
                <div className="flex items-end justify-between gap-3">
                  <p className="text-[11px] leading-snug" style={{ color: 'rgba(234,231,224,0.45)' }}>
                    {c.devices}
                  </p>
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ backgroundColor: c.accent }}
                  >
                    <ArrowUpRight size={15} color="#000" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
