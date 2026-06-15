import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { ImageDivider } from "@/components/zential/ImageDivider";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { protocols } from "@/data/protocols";
import { useEffect, useState } from "react";
import editorialVessels from "@/assets/editorial/three-vessels.webp";
import editorialSeated from "@/assets/editorial/seated-calm.webp";

const Protocols = () => {
 const [scrollPct, setScrollPct] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
   const max = document.documentElement.scrollHeight - window.innerHeight;
   const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
   setScrollPct(pct);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <div className="min-h-screen bg-[#F7F4F0] text-[#1A1714]">
   <SEO
    title="Protocols, Zential Pure"
    description="Three Protocols. Three sequences. The system, not the list."
    canonical="https://zentialpure.com/protocols"
   />
   <AnnouncementBar />
   <Header />

   {/* Sticky left indicator, hidden during hero, fades in mid-scroll, fades out at footer */}
   <div
    className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-3 pointer-events-none transition-opacity duration-500"
    style={{
     opacity:
      scrollPct < 0.04 ? 0
      : scrollPct < 0.10 ? (scrollPct - 0.04) / 0.06
      : scrollPct > 0.92 ? 0
      : scrollPct > 0.85 ? 1 - (scrollPct - 0.85) / 0.07
      : 1,
    }}
    aria-hidden
   >
    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5A4A]">
     Protocols
    </div>
    <div
     className="font-[Lora] italic leading-none"
     style={{ fontSize: "4rem", color: "#1A1714" }}
    >
     ( 0103 )
    </div>
    <div className="mt-4 w-1 h-32 bg-[#1A1714]/10 overflow-hidden">
     <div
      className="w-full bg-[#2ED8A8]"
      style={{
       height: "100%",
       transform: `scaleY(${scrollPct})`,
       transformOrigin: "top",
       transition: "transform 0.1s linear",
      }}
     />
    </div>
   </div>

   {/* Hero band */}
   <section className="px-6 md:pl-32 pt-20 pb-24 md:pt-36 md:pb-32 max-w-6xl">
    <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-10">
     Zential Pure · Protocols · Edition 2026
    </p>
    <h1
     className="font-[Lora] italic leading-[0.95] mb-10 max-w-4xl text-[#1A1714]"
     style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
    >
     Three Protocols.
     <br />
     <span className="text-[#1A1714]/40">One system.</span>
    </h1>
    <p className="text-base md:text-xl text-[#1A1714]/75 max-w-xl leading-relaxed">
     Each Protocol is a sequence, not a shopping list.
     One price. No codes, no countdowns. The sum of its parts, kept in order.
    </p>
   </section>

   {/* Editorial break, three vessels (ritual order) */}
   <ImageDivider
    src={editorialVessels}
    alt=""
    quote="Three vessels. Three sequences. Order kept."
   />

   {/* Protocol grid */}
   <section className="px-6 md:pl-32 pt-24 md:pt-32 pb-32 max-w-6xl">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
     {protocols.map((p, idx) => (
      <Link
       key={p.slug}
       to={`/protocols/${p.slug}`}
       className="group block"
      >
       <article className="relative overflow-hidden rounded-2xl min-h-[440px] md:min-h-[520px] flex flex-col justify-end">
        {/* Hero product image */}
        <img
         src={`${p.squareImageUrl}&width=1000`}
         srcSet={`${p.squareImageUrl}&width=600 600w, ${p.squareImageUrl}&width=1000 1000w`}
         sizes="(max-width: 768px) 100vw, 33vw"
         alt={`${p.title} protocol`}
         loading={idx === 0 ? "eager" : "lazy"}
         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/80" />

        {/* Top row, outcome chip + index */}
        <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between">
         <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-white/90 text-[#1A1714] backdrop-blur-sm">
          {p.outcomeLabel}
         </span>
         <span className="font-mono text-[10px] tracking-[0.16em] tabular-nums text-white/70">
          {String(idx + 1).padStart(2, "0")} / {protocols.length.toString().padStart(2, "0")}
         </span>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 p-6 md:p-7 text-white">
         <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/65 mb-2">
          Protocol ( {p.number} )
         </p>
         <h2
          className="font-[Lora] italic leading-none mb-3"
          style={{ fontSize: "clamp(2.75rem, 7vw, 3.5rem)" }}
         >
          {p.title}.
         </h2>
         <p className="text-[11px] md:text-xs tracking-wide text-white/80 mb-4">
          {p.modalities}
         </p>
         <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] md:text-xs text-white/90">
           {p.categoryHandles.length} devices · from €{p.fromPrice}
          </span>
          <span className="w-9 h-9 rounded-full bg-[#2ED8A8] text-[#0F0E0D] grid place-items-center text-xl leading-none transition-transform duration-300 group-hover:scale-110">
           +
          </span>
         </div>
        </div>
       </article>
      </Link>
     ))}
    </div>
   </section>

   {/* Editorial break, seated calm (the after) */}
   <ImageDivider
    src={editorialSeated}
    alt=""
    quote="Discipline is just order, kept."
   />

   {/* Philosophy band, quiet closer */}
   <section className="px-6 py-20 md:py-28 max-w-3xl mx-auto text-center">
    <div className="inline-flex items-center gap-3 mb-10">
     <span className="block w-12 h-px bg-[#1A1714]/20" />
     <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#6B5A4A]">
      Discipline
     </span>
     <span className="block w-12 h-px bg-[#1A1714]/20" />
    </div>
    <p className="font-[Lora] italic text-2xl md:text-4xl leading-[1.35] text-[#1A1714]">
     A device works because of its mechanism.
     <br />
     <span className="text-[#1A1714]/65">
      A protocol works because of its order.
     </span>
    </p>
   </section>

   <SparseFooter />
  </div>
 );
};

export default Protocols;
