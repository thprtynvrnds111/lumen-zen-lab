import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

interface Ingredient {
 name: string;
 latin: string;
 description: string;
 mechanism: string;
 accent: string;
}

interface SideCard {
 label: string;
 stat: string;
 description: string;
 source: string;
 bg?: string;
 labelColor?: string;
 statColor?: string;
 descColor?: string;
 sourceColor?: string;
}

const S = {
 dark: '#1A1714',
 teal: '#2ED8A8',
 terra: '#9B5A2E',
 ink: '#2A2420',
 bg: '#F7F4F0',
 cream: '#EDE8E0',
 muted: '#8A7F74',
 gold: '#C6A07C',
 lora: { fontFamily: "'Lora', serif" } as React.CSSProperties,
 dm: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
} as const;

const ingredients: Ingredient[] = [
 {
  name: 'Photobiomodulation',
  latin: '630–660nm Red Light · Near-Infrared',
  description:
   'At the correct wavelength, photons are absorbed by cytochrome c oxidase in the mitochondrial membrane. This initiates the electron transport chain, increasing ATP production by 40–150% in irradiated tissue. The skin uses this ATP for collagen synthesis, cellular repair, and inflammation resolution.',
  mechanism: 'Mechanism: ATP synthesis · Collagen I & III production · Anti-inflammatory',
  accent: S.dark,
 },
 {
  name: 'Microcurrent Therapy',
  latin: '1–400Hz · Sub-sensory Electrical Current',
  description:
   'Microcurrent at sub-sensory levels re-establishes the galvanic potential across cell membranes that declines with age and environmental stress. The current does not override the body\'s bioelectric field, it aligns with it, re-entraining the rhythm of cellular communication between fibroblasts, keratinocytes, and the extracellular matrix.',
  mechanism: 'Mechanism: Bioelectric entrainment · Fibroblast activation · ATP +500% in direct studies',
  accent: S.teal,
 },
 {
  name: 'EMS, Electrical Muscle Stimulation',
  latin: 'Neuromuscular Electrostimulation · Facial',
  description:
   'The 43 muscles of the face respond to electrical stimulation the same way skeletal muscle does. At low, controlled frequency, EMS causes muscle fiber contraction and relaxation in the sequence the nervous system uses naturally, training the tissue toward its baseline tone rather than overriding it.',
  mechanism: 'Mechanism: Neuromuscular re-education · Muscle tone · Facial volume support',
  accent: S.gold,
 },
];

const sideCards: SideCard[] = [
 {
  label: 'Clinical Reference',
  stat: '660nm',
  description: 'The wavelength at which absorption by cytochrome c oxidase is maximized. Documented in Karu et al., 1988, and replicated across 40+ subsequent studies.',
  source: 'PubMed PMID · 3266875',
 },
 {
  label: 'ATP Uplift',
  stat: '+500%',
  description: 'Documented ATP increase in tissue treated with microcurrent at therapeutic parameters. Not cosmetic. Metabolic.',
  source: 'Cheng et al. · 1982',
  bg: S.terra,
  labelColor: 'rgba(247,244,240,0.6)',
  descColor: 'rgba(247,244,240,0.5)',
 },
 {
  label: 'Protocol Insight',
  stat: '6 min',
  description: 'Minimum effective daily dose for photobiomodulation at 630–660nm. Below this, photon exposure is insufficient to initiate the full cascade. Above 20 minutes, no additional benefit observed.',
  source: 'Dosimetry Review · Laser Med Sci 2013',
 },
 {
  label: 'The Principle',
  stat: 'Consistency over intensity.',
  description: 'Six minutes daily for 90 days outperforms 60 minutes once a week. The tissue responds to rhythm, not intervention. This is why the protocol is daily. This is why the protocol is six minutes.',
  source: 'Zential Pure · Protocol Design Rationale',
  bg: '#2A2218',
  labelColor: S.gold,
  statColor: S.bg,
  descColor: 'rgba(247,244,240,0.55)',
  sourceColor: 'rgba(198,160,124,0.3)',
 },
];

function parseStatParts(stat: string) {
 const match = stat.match(/^([+]?)(\d+(?:\.\d+)?)(.*)/);
 if (!match) return null;
 return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStat({ stat, statColor }: { stat: string; statColor?: string }) {
 const parts = parseStatParts(stat);
 const [count, setCount] = useState(0);
 const [started, setStarted] = useState(false);
 const elRef = useRef<HTMLParagraphElement>(null);

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => { if (entry.isIntersecting) setStarted(true); },
   { threshold: 0.5 }
  );
  if (elRef.current) observer.observe(elRef.current);
  return () => observer.disconnect();
 }, []);

 useEffect(() => {
  if (!started || !parts) return;
  let startTs = 0;
  const duration = 1600;
  const step = (ts: number) => {
   if (!startTs) startTs = ts;
   const progress = Math.min((ts - startTs) / duration, 1);
   const eased = 1 - Math.pow(1 - progress, 3);
   setCount(Math.round(eased * parts.num));
   if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
 }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

 const isLong = stat.length > 6;

 return (
  <p
   ref={elRef}
   style={{
    fontFamily: "'Lora', serif",
    fontStyle: 'italic',
    fontSize: isLong ? 24 : 40,
    fontWeight: 400,
    color: statColor ?? S.bg,
    lineHeight: isLong ? 1.3 : 1,
    marginBottom: 8,
   }}
  >
   {parts ? `${parts.prefix}${count}${parts.suffix}` : stat}
  </p>
 );
}

function IconCircle({ accent, delay = 0 }: { accent: string; delay?: number }) {
 const ringColor = accent === S.dark || accent === S.ink ? S.teal : accent;
 return (
  <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
   {/* Orbital ring */}
   <div
    aria-hidden
    style={{
     position: 'absolute',
     inset: -10,
     borderRadius: '50%',
     border: '1px solid transparent',
     borderTopColor: ringColor,
     borderRightColor: `${ringColor}55`,
     opacity: 0.5,
     animation: 'orbital-ring 20s linear infinite',
     animationDelay: `${delay * -7}s`,
     pointerEvents: 'none',
    }}
   />
   {/* Circle */}
   <div
    style={{
     width: 88,
     height: 88,
     borderRadius: '50%',
     backgroundColor: accent,
     position: 'relative',
     overflow: 'hidden',
     animation: 'cell-breathe 5s ease-in-out infinite',
     animationDelay: `${delay * 1.65}s`,
    }}
   >
    <div
     style={{
      position: 'absolute',
      inset: 8,
      borderRadius: '50%',
      border: '1px solid rgba(247,244,240,0.15)',
     }}
    />
   </div>
  </div>
 );
}

export function ScienceSection() {
 const ref = useScrollReveal<HTMLElement>();

 return (
  <section
   ref={ref}
   id="science"
   className="relative overflow-hidden"
   style={{ backgroundColor: S.cream, padding: '96px 0' }}
  >
   {/* Watermark */}
   <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
    aria-hidden
    style={{
     ...S.lora,
     fontStyle: 'italic',
     fontSize: 'clamp(60px,10vw,120px)',
     fontWeight: 700,
     color: 'rgba(42,36,32,0.025)',
     whiteSpace: 'nowrap',
     transform: 'rotate(-20deg)',
    }}
   >
    INGREDIENT INTELLIGENCE
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-0 lg:gap-20 px-10 md:px-14 lg:px-16 relative z-10">

    {/* ── Left: Ingredient cards ── */}
    <div>
     <div className="flex items-center gap-4 mb-6">
      <span style={{ width: 40, height: 1, backgroundColor: S.teal, display: 'block' }} />
      <span style={{ ...S.dm, fontWeight: 400, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: S.teal }}>
       Section Three · Science
      </span>
     </div>

     <h2 style={{
      ...S.lora,
      fontStyle: 'italic',
      fontSize: 'clamp(32px, 3.5vw, 54px)',
      fontWeight: 400,
      color: S.ink,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: 48,
     }}>
      What works<br />inside the tissue.
     </h2>

     {ingredients.map((ing, i) => (
      <div
       key={ing.name}
       className="grid grid-cols-[88px_1fr] gap-8 py-10"
       style={{
        borderTop: '1px solid rgba(42,36,32,0.1)',
        ...(i === ingredients.length - 1 ? { borderBottom: '1px solid rgba(42,36,32,0.1)' } : {}),
       }}
      >
       <IconCircle accent={ing.accent} delay={i} />

       <div>
        <h3 style={{ ...S.lora, fontStyle: 'italic', fontSize: 21, fontWeight: 400, color: S.ink, marginBottom: 6 }}>
         {ing.name}
        </h3>
        <p style={{ ...S.dm, fontWeight: 200, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: S.muted, marginBottom: 14 }}>
         {ing.latin}
        </p>
        <p style={{ ...S.dm, fontWeight: 300, fontSize: 13.5, lineHeight: 1.8, color: S.ink, marginBottom: 12 }}>
         {ing.description}
        </p>
        <p style={{ ...S.dm, fontWeight: 400, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.teal }}>
         {ing.mechanism}
        </p>
       </div>
      </div>
     ))}
    </div>

    {/* ── Right: Sidebar stat cards ── */}
    <div className="flex flex-col gap-1 pt-8 lg:pt-[152px]">
     {sideCards.map(card => (
      <div
       key={card.stat}
       style={{
        backgroundColor: card.bg ?? S.dark,
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
       }}
      >
       {/* Decorative circle */}
       <div
        style={{
         position: 'absolute',
         top: -28,
         right: -28,
         width: 90,
         height: 90,
         borderRadius: '50%',
         backgroundColor: S.teal,
         opacity: 0.05,
         pointerEvents: 'none',
        }}
       />

       <p style={{ ...S.dm, fontWeight: 400, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: card.labelColor ?? S.teal, marginBottom: 12 }}>
        {card.label}
       </p>
       <AnimatedStat stat={card.stat} statColor={card.statColor} />
       <p style={{ ...S.dm, fontWeight: 300, fontSize: 12, lineHeight: 1.65, color: card.descColor ?? 'rgba(247,244,240,0.55)', marginBottom: 14 }}>
        {card.description}
       </p>
       <p style={{ ...S.dm, fontWeight: 400, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: card.sourceColor ?? 'rgba(247,244,240,0.2)' }}>
        {card.source}
       </p>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}
