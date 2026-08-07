import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Activity, Flame, Moon, Sun } from "lucide-react";

const profiles = [
 {
  icon: Activity,
  color: "#0E7A54",
  label: "Performance Recovery",
  sub: "Athlete · Post-training · Hyrox / Marathon",
  tags: ["EMS", "Compression", "Red Light"],
  desc: "Accelerate muscle repair after heavy sessions. Reduces DOMS, flushes lactic acid, restores tissue.",
  href: "/product/pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager",
 },
 {
  icon: Moon,
  color: "#0E7A54",
  label: "Sleep Architecture",
  sub: "HRV-focused · Recovery score · Sleep stack",
  tags: ["Weighted", "Blackout", "Infrared"],
  desc: "Engineer your sleep environment. Deep pressure + light blocking + far-infrared for restorative sleep.",
  href: "/product/gravity-quilt-cotton-weighted-blanket",
 },
 {
  icon: Flame,
  color: "#0E7A54",
  label: "Tissue & Joint Protocol",
  sub: "Chronic pain · Fascia · Mobility",
  tags: ["Thermal", "Red Light", "Acupressure"],
  desc: "Target inflammation at the source. Infrared heat combined with photobiomodulation for joint recovery.",
  href: "/product/infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad",
 },
 {
  icon: Sun,
  color: "#0E7A54",
  label: "Face & Jaw Protocol",
  sub: "Microcurrent · EMS · Thermal",
  tags: ["Microcurrent", "EMS", "Thermal"],
  desc: "Clinical-grade facial remodelling. Stimulates collagen synthesis and lifts muscle tone at tissue depth.",
  href: "/product/face-introducer",
 },
];

export function SkinFitSection() {
 const [active, setActive] = useState<number | null>(null);
 const ref = useScrollReveal<HTMLElement>();

 return (
  <section
   ref={ref}
   className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28"
   style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(20,20,20,0.10)' }}
  >
   <div className="max-w-5xl mx-auto">
    <div className="text-center mb-14">
     <p className="text-[11px] font-medium tracking-[0.22em] uppercase mb-3" style={{ color: '#8E8E8E' }}>
     Find Your Protocol
     </p>
     <h2 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl" style={{ color: '#141414' }}>
      What are you optimising for?
     </h2>
     <p className="text-sm mt-3 max-w-sm mx-auto" style={{ color: '#8E8E8E' }}>
      Four distinct recovery stacks. Pick your signal.
     </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     {profiles.map((p, i) => {
      const Icon = p.icon;
      const isActive = active === i;
      return (
       <div
        key={p.label}
        className="rounded-none p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
        style={{
         backgroundColor: isActive ? `${p.color}12` : '#FFFFFF',
         border: isActive ? `1px solid ${p.color}60` : '1px solid rgba(20,20,20,0.10)',
         borderTop: `2px solid ${p.color}`,
        }}
        onClick={() => setActive(isActive ? null : i)}
       >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
         <div
          className="w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${p.color}18` }}
         >
          <Icon size={18} strokeWidth={1.5} style={{ color: p.color }} />
         </div>
         <div>
          <h3 className="font-sans font-medium tracking-[-0.01em] text-[16px] leading-snug" style={{ color: '#141414' }}>
           {p.label}
          </h3>
          <p className="text-[10px] tracking-[0.05em] mt-0.5" style={{ color: '#8E8E8E' }}>
           {p.sub}
          </p>
         </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
         {p.tags.map(tag => (
          <span
           key={tag}
           className="text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
           style={{ backgroundColor: `${p.color}18`, color: p.color }}
          >
           {tag}
          </span>
         ))}
        </div>

        {/* Description, revealed on click */}
        <div
         className="overflow-hidden transition-all duration-300"
         style={{ maxHeight: isActive ? '120px' : '0', opacity: isActive ? 1 : 0 }}
        >
         <p className="text-[12px] leading-relaxed mb-4" style={{ color: '#5A5A5A' }}>
          {p.desc}
         </p>
         <Link
          to={p.href}
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity duration-200 hover:opacity-75"
          style={{ color: p.color }}
          onClick={e => e.stopPropagation()}
         >
          View recommended device →
         </Link>
        </div>

        {/* Expand hint */}
        {!isActive && (
         <p className="text-[9px] tracking-[0.1em] uppercase mt-1" style={{ color: '#8E8E8E' }}>
          Tap to explore
         </p>
        )}
       </div>
      );
     })}
    </div>
   </div>
  </section>
 );
}
