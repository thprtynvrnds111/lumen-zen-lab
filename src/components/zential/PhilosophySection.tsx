import { useScrollReveal } from "@/hooks/useScrollReveal";
import philosophyImg from "@/assets/philosophy-portrait-new.png";

export function PhilosophySection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: '#1A1714' }}>
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Image side */}
        <div className="w-full md:w-5/12 relative">
          <img
            src={philosophyImg}
            alt="Woman with clear skin, contemplative"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ minHeight: '50vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1714]/60 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1714]/80 md:hidden" />
        </div>

        {/* Content side */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <p className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: '#C6A07C' }}>
            A New Category
          </p>

          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8" style={{ color: '#FAF7F3' }}>
            This is not a beauty brand<br />that uses science.
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-6 max-w-lg" style={{ color: '#FAF7F3', opacity: 0.6 }}>
            Zential Pure is a self-optimization brand that happens to work on your face. 
            We don't sell devices. We sell a practice.
          </p>

          <p className="text-sm leading-relaxed mb-10 max-w-lg" style={{ color: '#FAF7F3', opacity: 0.4 }}>
            The women who use Zential already track their sleep, already understand cortisol, 
            already know what mitochondria do. They've been to the dermatologist and left thinking: 
            there should be a version of this I can do myself, every day, without booking an appointment 
            every six weeks.
          </p>

          {/* Category definition */}
          <div className="border-l-2 pl-6 mb-10" style={{ borderColor: '#C6A07C' }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#C6A07C' }}>
              The Category We Own
            </p>
            <h3 className="font-serif italic text-xl md:text-2xl" style={{ color: '#FAF7F3' }}>
              Skin Intelligence
            </h3>
            <p className="text-sm mt-2" style={{ color: '#FAF7F3', opacity: 0.5 }}>
              The practice of understanding what your skin is actually doing — and giving it the right inputs, consistently.
            </p>
          </div>

          {/* Brand peers */}
          <div className="flex items-center gap-8 md:gap-12">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#FAF7F3', opacity: 0.25 }}>
              Think
            </p>
            {["WHOOP", "EIGHT SLEEP", "AG1"].map((brand) => (
              <span
                key={brand}
                className="text-xs md:text-sm tracking-[0.15em] font-light"
                style={{ color: '#FAF7F3', opacity: 0.2 }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
