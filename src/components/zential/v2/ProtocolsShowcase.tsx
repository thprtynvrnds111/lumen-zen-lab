import { Link } from "react-router-dom";
import { protocols } from "@/data/protocols";
import { useEffect, useRef, useState } from "react";

// Embeddable Protocols module for the homepage.
// 3 cards, full-bleed color, hover reveals an internal "0 → N min" sweep.
export function ProtocolsShowcase() {
 return (
  <section className="bg-[#F7F4F0] py-24 md:py-32 px-6 md:px-14">
   <div className="max-w-7xl">
    {/* Section label row */}
    <div className="flex items-baseline justify-between mb-12 md:mb-16">
     <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6B5A4A]">
      Section ( 01 ) · Protocols
     </p>
     <Link
      to="/protocols"
      className="group font-mono text-[10px] tracking-[0.2em] uppercase text-[#1A1714] hover:text-[#2ED8A8] transition-colors flex items-center gap-2"
     >
      See all
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
     </Link>
    </div>

    {/* Big headline + supporting line */}
    <div className="mb-16 md:mb-24 max-w-5xl">
     <h2
      className="font-[Lora] italic leading-[0.95] text-[#1A1714]"
      style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
     >
      Three Protocols.
      <br />
      <span className="text-[#1A1714]/40">One system.</span>
     </h2>
     <p className="mt-10 text-base md:text-lg text-[#1A1714]/70 max-w-xl">
      Bundles are not discounts. They are sequences.
      Each Protocol ships with a printed Protocol Card.
     </p>
    </div>

    {/* Card grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
     {protocols.map((p) => (
      <ProtocolCard key={p.slug} protocol={p} />
     ))}
    </div>
   </div>
  </section>
 );
}

function ProtocolCard({ protocol: p }: { protocol: typeof protocols[number] }) {
 const isDark = p.cardBg === "#1A1714";
 const head = isDark ? "#2ED8A8" : "#1A1714";
 const body = isDark ? "#F7F4F0" : "#1A1714";
 const meta = isDark ? "rgba(247,244,240,0.55)" : "#6B5A4A";
 const dim = isDark ? "rgba(247,244,240,0.15)" : "rgba(26,23,20,0.15)";

 const [hovered, setHovered] = useState(false);
 const [tick, setTick] = useState(0);
 const intervalRef = useRef<number | null>(null);

 useEffect(() => {
  if (hovered) {
   setTick(0);
   intervalRef.current = window.setInterval(() => {
    setTick((t) => {
     if (t >= p.sessionMinutes) return p.sessionMinutes;
     return t + 1;
    });
   }, 90);
  } else {
   if (intervalRef.current) window.clearInterval(intervalRef.current);
   setTick(0);
  }
  return () => {
   if (intervalRef.current) window.clearInterval(intervalRef.current);
  };
 }, [hovered, p.sessionMinutes]);

 return (
  <Link
   to={`/protocols/${p.slug}`}
   onMouseEnter={() => setHovered(true)}
   onMouseLeave={() => setHovered(false)}
   className="group block transition-transform duration-500 hover:translate-y-[-2px]"
  >
   <article
    style={{ backgroundColor: p.cardBg }}
    className="relative p-8 md:p-10 min-h-[380px] flex flex-col justify-between overflow-hidden"
   >
    {/* Top meta row */}
    <div className="flex items-baseline justify-between">
     <p
      className="font-mono text-[10px] tracking-[0.2em] uppercase"
      style={{ color: meta }}
     >
      Protocol ( {p.number} )
     </p>
     <p
      className="font-mono text-[10px] tracking-[0.16em] tabular-nums"
      style={{ color: head }}
     >
      {tick.toString().padStart(2, "0")} / {p.sessionMinutes
       .toString()
       .padStart(2, "0")} min
     </p>
    </div>

    {/* Body */}
    <div>
     <h3
      className="font-[Lora] italic text-6xl md:text-7xl leading-none mb-6"
      style={{ color: head }}
     >
      {p.title}.
     </h3>

     {/* Tick bar, fills as minute counter ticks */}
     <div className="mb-6 h-px w-full" style={{ backgroundColor: dim }}>
      <div
       className="h-full transition-all duration-100"
       style={{
        width: `${(tick / p.sessionMinutes) * 100}%`,
        backgroundColor: head,
       }}
      />
     </div>

     <p
      className="text-xs md:text-sm tracking-wide mb-2"
      style={{ color: body }}
     >
      {p.modalities}
     </p>
     <p
      className="font-mono text-xs tracking-wide"
      style={{ color: meta }}
     >
      {p.devices.length} devices · €{p.totalPrice}
     </p>
    </div>
   </article>
  </Link>
 );
}
