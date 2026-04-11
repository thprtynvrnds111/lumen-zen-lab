import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ImageDividerProps {
  src: string;
  alt: string;
  quote?: string;
}

export function ImageDivider({ src, alt, quote }: ImageDividerProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: 'clamp(250px, 40vh, 450px)' }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        width={1080}
        height={450}
      />
      {quote && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <p className="font-serif italic text-xl md:text-3xl text-white text-center max-w-2xl leading-relaxed">
            {quote}
          </p>
        </div>
      )}
    </section>
  );
}
