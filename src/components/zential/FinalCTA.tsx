import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FinalCTA() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1A1714' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #C6A07C 0%, transparent 50%), radial-gradient(circle at 80% 70%, #C6A07C 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-8" style={{ backgroundColor: '#C6A07C', opacity: 0.5 }} />
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase" style={{ color: '#C6A07C' }}>
            Begin the practice
          </p>
          <span className="h-px w-8" style={{ backgroundColor: '#C6A07C', opacity: 0.5 }} />
        </div>

        <h2
          className="font-serif italic text-[40px] md:text-6xl lg:text-[68px] leading-[1.02] tracking-[-0.01em] mb-6 text-balance"
          style={{ color: '#FAF7F3' }}
        >
          Your skin keeps a record.<br className="hidden md:block" /> Make it a good one.
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#FAF7F3', opacity: 0.65 }}
        >
          Five minutes a day. Compounded over months. The same logic clinics use, on the schedule that fits your actual life.
        </p>

        <div className="flex flex-col min-[480px]:flex-row gap-3 justify-center mb-12">
          <button
            onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: '#FAF7F3', color: '#1A1714', boxShadow: '0 4px 18px rgba(0,0,0,0.25)' }}
          >
            Shop the Ritual
          </button>
          <button
            onClick={() => document.getElementById('bundle')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(250,247,243,0.35)', color: '#FAF7F3', backgroundColor: 'transparent' }}
          >
            Build Your Set
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 max-w-2xl mx-auto pt-10 border-t" style={{ borderColor: 'rgba(250,247,243,0.12)' }}>
          {[
            { icon: ShieldCheck, label: '30-Day Guarantee' },
            { icon: Truck, label: 'Free EU Shipping over €75' },
            { icon: RotateCcw, label: 'Easy Returns' },
          ].map((it) => (
            <div key={it.label} className="flex items-center justify-center gap-2.5">
              <it.icon size={16} strokeWidth={1.4} style={{ color: '#C6A07C' }} />
              <span className="text-[12px] tracking-wide" style={{ color: '#FAF7F3', opacity: 0.75 }}>
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
