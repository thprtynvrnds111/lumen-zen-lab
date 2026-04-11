import ugcLifestyle from "@/assets/ugc-lifestyle-desk.webp";
import ugcLifestyleMobile from "@/assets/ugc-lifestyle-desk-400w.webp";
import ugc1 from "@/assets/ugc-unboxing-1.webp";
import ugc1Mobile from "@/assets/ugc-unboxing-1-400w.webp";
import ugc2 from "@/assets/ugc-unboxing-2.webp";
import ugc2Mobile from "@/assets/ugc-unboxing-2-400w.webp";
import unboxingFounder from "@/assets/unboxing-founder.webp";
import unboxingFounderMobile from "@/assets/unboxing-founder-400w.webp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const photos = [
  { src: ugcLifestyle, mobile: ugcLifestyleMobile, alt: "Woman at desk with Zential Pure device in warm evening light", caption: "Part of the routine" },
  { src: ugc1, mobile: ugc1Mobile, alt: "Customer unboxing Zential Pure device at home", caption: "Just arrived, ready to glow" },
  { src: unboxingFounder, mobile: unboxingFounderMobile, alt: "Founder packing Zential Pure orders", caption: "Packed with care by our team" },
  { src: ugc2, mobile: ugc2Mobile, alt: "Woman using Zential Pure red light device in bathroom mirror selfie", caption: "My evening ritual" },
];

export function UGCStrip() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="text-center mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: '#9B5A2E' }}>
          From Our Community
        </p>
        <h2 className="font-serif italic text-2xl md:text-3xl text-foreground">
          Real Moments. Real People.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {photos.map((p, i) => (
          <div key={i} className="group relative rounded-xl overflow-hidden" style={{ border: '1px solid #E4DFD8' }}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={p.src}
                srcSet={`${p.mobile} 400w, ${p.src} 800w`}
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={p.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
              <p className="text-white text-sm font-light leading-relaxed">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
