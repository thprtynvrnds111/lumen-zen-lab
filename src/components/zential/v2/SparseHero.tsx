import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Homepage hero in the Protocols aesthetic.
// Sparse. Italic Lora. Parenthetical numeric. Single full-bleed band.
export function SparseHero() {
 const [seconds, setSeconds] = useState(0);

 useEffect(() => {
  // Quiet 0→10 minute counter that loops, signaling the protocol cadence.
  const id = setInterval(() => {
   setSeconds((s) => (s + 1) % 11);
  }, 1500);
  return () => clearInterval(id);
 }, []);

 return (
  <section className="relative bg-[#1A1714] text-[#F7F4F0] overflow-hidden">
   {/* Sparse meta line */}
   <div className="px-6 md:px-14 pt-16 md:pt-24">
    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#F7F4F0]/45">
     Zential Pure · Rotterdam · Edition 2026
    </p>
   </div>

   {/* Hero band */}
   <div className="px-6 md:px-14 py-24 md:py-40 max-w-7xl">
    <h1
     className="font-[Lora] italic leading-[0.9] text-[#F7F4F0]"
     style={{ fontSize: "clamp(4rem, 13vw, 13rem)" }}
    >
     Clinic
     <br />
     precision.
     <br />
     <span className="text-[#2ED8A8]">Daily ritual.</span>
    </h1>

    <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16">
     <p
      className="text-base md:text-xl text-[#F7F4F0]/70 max-w-md leading-relaxed"
     >
      Four modalities. Three Protocols.
      One ten-minute sequence the brand was built around.
     </p>

     {/* Kinetic counter, small, restrained */}
     <div className="flex items-baseline gap-3">
      <span
       className="font-mono text-xs tracking-[0.2em] uppercase text-[#F7F4F0]/40"
      >
       Session
      </span>
      <span
       className="font-[Lora] italic text-5xl md:text-7xl leading-none text-[#2ED8A8] tabular-nums"
      >
       {seconds.toString().padStart(2, "0")}
      </span>
      <span
       className="font-mono text-xs tracking-[0.16em] text-[#F7F4F0]/40"
      >
       min
      </span>
     </div>
    </div>

    {/* Two-action footer */}
    <div className="mt-20 md:mt-32 flex flex-col sm:flex-row gap-6 items-start">
     <Link
      to="/protocols"
      className="inline-block bg-[#F7F4F0] text-[#1A1714] px-10 py-5 text-xs tracking-[0.18em] uppercase hover:bg-[#2ED8A8] transition-colors"
     >
      See the Protocols →
     </Link>
     <Link
      to="/#devices"
      className="inline-block border-b border-[#F7F4F0]/40 pb-1 text-xs tracking-[0.18em] uppercase text-[#F7F4F0]/70 hover:text-[#2ED8A8] hover:border-[#2ED8A8] transition-colors"
     >
      Browse the devices
     </Link>
    </div>
   </div>

   {/* Bottom band, clinical strip */}
   <div className="border-t border-[#F7F4F0]/10 px-6 md:px-14 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
     { label: "Modalities", value: "EMS · MC · Th · LED" },
     { label: "Session", value: "10–20 min" },
     { label: "Consumables", value: "None" },
     { label: "Shipping", value: "Free, EU" },
    ].map((it) => (
     <div key={it.label} className="space-y-2">
      <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#F7F4F0]/40">
       {it.label}
      </p>
      <p className="font-mono text-xs md:text-sm text-[#F7F4F0]/85 tracking-wide">
       {it.value}
      </p>
     </div>
    ))}
   </div>
  </section>
 );
}
