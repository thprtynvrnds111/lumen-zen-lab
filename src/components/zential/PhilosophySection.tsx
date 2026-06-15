import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const S = {
 dark: '#1A1714',
 teal: '#2ED8A8',
 terra: '#9B5A2E',
 ink: '#2A2420',
 bg: '#F7F4F0',
 cream: '#EDE8E0',
 muted: '#8A7F74',
 lora: { fontFamily: "'Lora', serif" } as React.CSSProperties,
 dm: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
} as const;

const QUOTE = '"The body does not age. It accumulates interference. Remove the interference, restore the frequency, and the tissue returns to what it knows."';

function WordRevealQuote() {
 const [revealed, setRevealed] = useState(false);
 const quoteRef = useRef<HTMLBlockquoteElement>(null);
 const words = QUOTE.split(' ');

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
   { threshold: 0.4 }
  );
  if (quoteRef.current) observer.observe(quoteRef.current);
  return () => observer.disconnect();
 }, []);

 return (
  <blockquote
   ref={quoteRef}
   className={`word-reveal${revealed ? ' revealed' : ''}`}
   style={{
    fontFamily: "'Lora', serif",
    fontStyle: 'italic',
    fontSize: 'clamp(20px, 2vw, 30px)',
    lineHeight: 1.45,
    color: S.ink,
    fontWeight: 400,
    letterSpacing: '-0.01em',
    borderLeft: `3px solid ${S.teal}`,
    paddingLeft: 24,
   }}
  >
   {words.map((word, i) => (
    <span
     key={i}
     style={{ animationDelay: `${i * 42}ms` }}
    >
     {word}{i < words.length - 1 ? ' ' : ''}
    </span>
   ))}
  </blockquote>
 );
}

export function PhilosophySection() {
 const ref = useScrollReveal<HTMLElement>();

 return (
  <section ref={ref} className="overflow-hidden" style={{ backgroundColor: S.bg }}>

   {/* ── Intro: 5/3 grid ── */}
   <div
    className="grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-0 md:gap-20 px-10 md:px-14 lg:px-16 pb-16 md:pb-24"
    style={{ paddingTop: 100 }}
   >
    <div>
     <div className="flex items-center gap-4 mb-7">
      <span
       className="block"
       style={{ width: 40, height: 1, backgroundColor: S.teal }}
      />
      <span style={{ ...S.dm, fontWeight: 400, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: S.teal }}>
       Section One · Philosophy
      </span>
     </div>

     <h2 style={{
      ...S.lora,
      fontStyle: 'italic',
      fontSize: 'clamp(38px, 4.5vw, 68px)',
      lineHeight: 1.05,
      color: S.ink,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      marginBottom: 40,
     }}>
      The Resonance Restoration Philosophy
     </h2>

     <p style={{ ...S.dm, fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: S.ink, maxWidth: 500 }}>
      Every living system oscillates. The pendulum swings inward then outward, light then shadow,
      contraction then expansion. Walter Russell observed that the universe speaks in octaves, that
      matter itself is frequency made visible, that what we call decline is merely a phase of the wave
      pulling toward its return. Your skin is no different.
     </p>
    </div>

    <div className="hidden md:flex items-start justify-end pt-4">
     <span style={{
      ...S.lora,
      fontStyle: 'italic',
      fontSize: 180,
      lineHeight: 0.85,
      color: 'rgba(42,36,32,0.04)',
      fontWeight: 400,
      userSelect: 'none',
     }}>
      I
     </span>
    </div>
   </div>

   {/* ── 3-column essay body ── */}
   <div
    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 px-10 md:px-14 lg:px-16 pb-0"
    style={{ borderTop: '1px solid rgba(42,36,32,0.08)', paddingTop: 52, position: 'relative' }}
   >
    {/* Vertical rule between col 1 and 2 */}
    <div
     className="hidden md:block absolute top-0 bottom-0 w-px"
     style={{ left: 'calc(33.333% + 4rem - 24px)', backgroundColor: 'rgba(42,36,32,0.08)' }}
    />

    {/* Col 1, dropcap */}
    <div>
     <p className="essay-dropcap" style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink, marginBottom: 20 }}>
      Modern life is a disruption engine. Blue light at 11pm. Cortisol before 8am. Nutrient-stripped
      food that mimics nourishment without completing it. These are not cosmetic problems. They are
      frequency problems. The tissue of your skin, dermis, fascia, muscle, responds to electromagnetic
      input the way a tuning fork responds to its match: with resonance, or with silence.
     </p>
     <p style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink, marginBottom: 20 }}>
      What Russell understood, and what clinical photobiomodulation research now confirms, is that energy
      at specific frequencies does not merely stimulate cells, it reminds them. Cellular memory is not
      metaphor. Mitochondria have photoreceptors. At 630–660nm, red light wavelengths penetrate to the
      basal layer and initiate ATP synthesis, the same energy currency used in every repair cycle the
      body already knows how to run.
     </p>
     <p style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink }}>
      The skin has not forgotten how to restore itself. It has simply been denied the signal.
     </p>
    </div>

    {/* Col 2, pull quote */}
    <div className="flex flex-col justify-center py-10">
     <WordRevealQuote />
     <cite style={{ ...S.dm, fontWeight: 400, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: S.muted, paddingLeft: 27, marginTop: 16 }}>
      Resonance Restoration · Core Principle
     </cite>
    </div>

    {/* Col 3, continuation */}
    <div>
     <p style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink, marginBottom: 20 }}>
      The pendulum of cellular health swings between anabolism and catabolism, building and clearing,
      synthesis and apoptosis. In youth, this rhythm is precise. With age, environmental stress, and
      chronic cortisol, the pendulum slows. Not stops. Slows. The octave drops.
     </p>
     <p style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink, marginBottom: 20 }}>
      Microcurrent at 1–400Hz works with the bioelectric field your body generates naturally. Not against
      it. Not replacing it. The current introduced by the instrument aligns with the body's own electrical
      gradient, re-entraining the rhythm the way a conductor re-establishes tempo in an orchestra that
      has drifted off beat.
     </p>
     <p style={{ ...S.dm, fontWeight: 300, fontSize: 14.5, lineHeight: 1.85, color: S.ink }}>
      EMS, electrical muscle stimulation, operates at a different register of the same principle.
      Facial muscles, like any muscle, respond to the signal. With consistent use, the response compounds.
      Not transformation. Not erasure. Return. The face you know, more fully present.
     </p>
    </div>
   </div>

   {/* ── Full-bleed dark break ── */}
   <div
    className="grid grid-cols-1 md:grid-cols-2 gap-16 px-10 md:px-14 lg:px-16 py-20 md:py-24 relative"
    style={{ backgroundColor: S.dark, marginTop: 80 }}
   >
    {/* Grain */}
    <div
     className="absolute inset-0 pointer-events-none"
     style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'repeat',
      backgroundSize: '160px 160px',
      opacity: 0.04,
      mixBlendMode: 'overlay',
      zIndex: 0,
     }}
     aria-hidden
    />
    <div style={{ position: 'relative', zIndex: 1 }}>
     <h3 style={{
      ...S.lora,
      fontStyle: 'italic',
      fontSize: 'clamp(30px, 3.5vw, 52px)',
      lineHeight: 1.15,
      color: S.bg,
      fontWeight: 400,
      letterSpacing: '-0.02em',
     }}>
      "This is not beauty.<br />
      This is{' '}
      <span style={{ color: S.teal, fontStyle: 'normal' }}>physics</span>.<br />
      Applied to living tissue<br />
      that already knows<br />
      the answer."
     </h3>
    </div>

    <div style={{ ...S.dm, fontWeight: 300, fontSize: 14, lineHeight: 1.9, color: 'rgba(247,244,240,0.6)', position: 'relative', zIndex: 1 }}>
     <p style={{ marginBottom: 18 }}>
      Russell's cosmogony described matter as compressed light, wavelengths of such high frequency they
      appear solid. Skin, in this framework, is not surface. It is condensed frequency. To treat it
      cosmetically is to mistake the map for the territory.
     </p>
     <p style={{ marginBottom: 18 }}>
      Zential Pure was not built around products. It was built around a protocol, a sequenced, daily
      practice that delivers specific electromagnetic and thermal inputs to living tissue in the order
      and duration that clinical evidence supports.
     </p>
     <p style={{ marginBottom: 18 }}>
      Six minutes. Not forty. Not once a week. Daily, consistent, precise. The discipline is the
      mechanism. The ritual is the science made embodied.
     </p>
     <p>
      We do not promise transformation. We restore access to the return that was always available to you.
     </p>
    </div>
   </div>
  </section>
 );
}
