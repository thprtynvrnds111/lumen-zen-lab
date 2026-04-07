import lifestyleImg from "@/assets/lifestyle-redlight.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function EditorialBreak() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1A1714' }}
    >
      <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[70vh]">
        {/* Image side */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={lifestyleImg}
            alt="Woman using Zential red light therapy device"
            className="w-full h-full object-cover"
            style={{ minHeight: '50vh' }}
          />
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1714]/40 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1714]/60 md:hidden" />
        </div>

        {/* Text side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 md:py-20">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#C6A07C' }}>
            Self-Optimization
          </p>
          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6" style={{ color: '#FAF7F3' }}>
            Your skin remembers<br />what you repeat.
          </h2>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#FAF7F3', opacity: 0.5 }}>
            Five minutes a day. Four clinical technologies. One system that works with your biology, not against it.
          </p>
        </div>
      </div>
    </section>
  );
}
