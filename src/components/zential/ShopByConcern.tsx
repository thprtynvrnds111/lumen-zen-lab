import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const concerns = [
  {
    label: "Lift & Contour",
    sub: "Cheekbones, jawline, neck",
    devices: "Sculpt Wand · Frequency Wand Pro · Face Introducer",
    handle: "facial-beauty-tools-and-ems-beauty-equipment",
    tone: "from-[#E8DCCB] to-[#D9C7B0]",
  },
  {
    label: "Tone & Glow",
    sub: "Daily microcurrent and clarity",
    devices: "Skin Pulse · Frequency Wand · Gua Sha Frequency",
    handle: "electric-micro-current",
    tone: "from-[#EAD9C6] to-[#D6BFA3]",
  },
  {
    label: "Eyes & Fine Lines",
    sub: "Brighten, smooth, restore",
    devices: "Eye Activator · Frame Pulse",
    handle: "eye-massage",
    tone: "from-[#E5D5C0] to-[#CDB294]",
  },
  {
    label: "Body & Tissue",
    sub: "Firm, sculpt, recover",
    devices: "Body Lift",
    handle: "body-lift",
    tone: "from-[#DECDB6] to-[#C4A685]",
  },
];

export function ShopByConcern() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="px-6 md:px-12 lg:px-20 py-20 md:py-28"
      style={{ backgroundColor: '#F7F4F0' }}
      aria-label="Shop by concern"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6" style={{ backgroundColor: '#9B5A2E', opacity: 0.45 }} />
              <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: '#9B5A2E' }}>
                Find your ritual
              </p>
            </div>
            <h2
              className="font-serif italic text-[34px] md:text-5xl leading-[1.05] tracking-[-0.01em] text-balance"
              style={{ color: '#2A211A' }}
            >
              Begin where your skin asks for it.
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-sm leading-relaxed" style={{ color: '#6B5A4A' }}>
            Four concerns. One coordinated system. Choose the entry point that mirrors your skin today, then build the ritual from there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {concerns.map((c) => (
            <Link
              key={c.label}
              to={`/product/${c.handle}`}
              className="group relative overflow-hidden rounded-[20px] aspect-[3/4] flex flex-col justify-between p-6 transition-all duration-500 hover:-translate-y-1"
              style={{ boxShadow: '0 1px 2px rgba(42,33,26,0.04), 0 12px 40px -20px rgba(42,33,26,0.18)' }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${c.tone} transition-transform duration-700 group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.0) 50%, rgba(42,33,26,0.18) 100%)' }} />

              <div className="relative">
                <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#5A3F25' }}>
                  Concern
                </p>
              </div>

              <div className="relative">
                <h3
                  className="font-serif italic text-2xl md:text-[28px] leading-[1.1] mb-1.5"
                  style={{ color: '#2A211A' }}
                >
                  {c.label}
                </h3>
                <p className="text-[12px] mb-4" style={{ color: '#3F3024' }}>
                  {c.sub}
                </p>
                <div className="h-px w-full mb-4" style={{ backgroundColor: 'rgba(42,33,26,0.18)' }} />
                <div className="flex items-end justify-between gap-3">
                  <p className="text-[11px] leading-snug" style={{ color: '#3F3024' }}>
                    {c.devices}
                  </p>
                  <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ backgroundColor: '#2A211A' }}>
                    <ArrowUpRight size={15} className="text-white" strokeWidth={1.6} />
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
