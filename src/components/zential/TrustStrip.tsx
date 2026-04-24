import { ShieldCheck, Truck, Sparkles, Microscope } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "30-Day Ritual Guarantee",
    sub: "Try it for a full cycle. Refund if it isn't yours.",
  },
  {
    icon: Truck,
    title: "Complimentary EU Shipping",
    sub: "Free over €75. Delivered in 3–7 business days.",
  },
  {
    icon: Microscope,
    title: "Clinically Inspired Modalities",
    sub: "Red light, microcurrent, EMS and thermal — in one device family.",
  },
  {
    icon: Sparkles,
    title: "Designed for Daily Use",
    sub: "Five-minute rituals. Engineered for consistency, not novelty.",
  },
];

export function TrustStrip() {
  return (
    <section
      className="border-y"
      style={{ backgroundColor: '#FBF8F4', borderColor: 'rgba(155,90,46,0.12)' }}
      aria-label="Trust signals"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-10">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-3.5">
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(198,160,124,0.14)' }}
              >
                <it.icon size={16} strokeWidth={1.4} style={{ color: '#9B5A2E' }} />
              </div>
              <div className="min-w-0">
                <p
                  className="text-[12px] md:text-[13px] tracking-[0.04em] font-medium leading-tight mb-1"
                  style={{ color: '#2A211A' }}
                >
                  {it.title}
                </p>
                <p
                  className="text-[11px] md:text-[12px] leading-snug"
                  style={{ color: '#6B5A4A' }}
                >
                  {it.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
