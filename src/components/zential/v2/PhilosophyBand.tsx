// Quiet philosophy band — single italic Lora line, centered, ample space.
// Used as breathing room between heavy sections.
// Now with hairline accents top + bottom for measurable presence.
export function PhilosophyBand({
  label = "Discipline ( 01 )",
  lines = [
    "A device works because of its mechanism.",
    "A protocol works because of its order.",
  ],
}: {
  label?: string;
  lines?: string[];
}) {
  return (
    <section className="relative bg-[#F7F4F0] px-6 py-32 md:py-48 overflow-hidden">
      {/* Hairline top accent — short teal mark, off-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[#2ED8A8] to-transparent" aria-hidden />

      <div className="max-w-3xl mx-auto text-center relative">
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
