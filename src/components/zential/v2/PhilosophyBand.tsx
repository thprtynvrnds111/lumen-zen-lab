// Quiet philosophy band, single italic Lora line, centered, ample space.
// Used as breathing room between heavy sections.
// Now with hairline accents top + bottom for measurable presence.
// Optional bgImage adds a low-opacity editorial wash for atmospheric depth.
export function PhilosophyBand({
 label = "Discipline ( 01 )",
 lines = [
  "A device works because of its mechanism.",
  "A protocol works because of its order.",
 ],
 bgImage,
}: {
 label?: string;
 lines?: string[];
 bgImage?: string;
}) {
 return (
  <section className="relative bg-[#F7F4F0] px-6 py-20 md:py-28 overflow-hidden">
   {bgImage && (
    <>
     <img
      src={bgImage}
      alt=""
      aria-hidden
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ opacity: 0.32, filter: "saturate(0.6) contrast(0.98)" }}
     />
     <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, rgba(247,244,240,0.55) 0%, rgba(247,244,240,0.7) 100%)" }}
     />
    </>
   )}

   {/* Hairline top accent, short teal mark, off-center */}
   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#2ED8A8] to-transparent" aria-hidden />

   <div className="max-w-3xl mx-auto text-center relative" style={{ zIndex: 2 }}>
    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6B5A4A] mb-10">
     {label}
    </p>

    <div className="font-[Lora] italic text-2xl md:text-4xl leading-[1.35] text-[#1A1714] space-y-3">
     {lines.map((l, i) => (
      <p
       key={i}
       className={
        i === lines.length - 1 && lines.length > 1
         ? "text-[#1A1714]/65"
         : ""
       }
      >
       {l}
      </p>
     ))}
    </div>

    {/* Quiet bottom mark */}
    <div className="mt-12 inline-flex items-center gap-3">
     <span className="block w-8 h-px bg-[#1A1714]/20" />
     <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#6B5A4A]">
      Zential Pure
     </span>
     <span className="block w-8 h-px bg-[#1A1714]/20" />
    </div>
   </div>

   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[#2ED8A8] via-[#2ED8A8]/30 to-transparent" aria-hidden />
  </section>
 );
}
