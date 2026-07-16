import heroImage0 from "@/assets/hero-restore-mat.webp";
import heroImage1 from "@/assets/hero-redlight-belt.webp";
import heroImage2 from "@/assets/hero-neck-device.webp";
import heroImage3 from "@/assets/hero-lifestyle-2.webp";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const heroImages = [heroImage0, heroImage1, heroImage2, heroImage3];

const S = {
 ink: '#1A1714',
 teal: '#2ED8A8',    // bright accent, fills, dots
 tealDeep: '#157A5C',  // teal that reads on a light background (text/contrast)
 cream: '#F7F4F0',
 // light, airy ground with a faint teal wash (Nurosym-calm, not flat)
 bg: 'linear-gradient(165deg, #F1F5F3 0%, #F7F4F0 48%, #E9F3EE 100%)',
 lora: { fontFamily: "'Lora', serif" } as React.CSSProperties,
 dm: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
} as const;

export function HeroSection() {
 const [visible, setVisible] = useState(false);
 const [currentImage, setCurrentImage] = useState(0);
 const [isTransitioning, setIsTransitioning] = useState(false);
 const { t } = useTranslation('home');

 // Cursor glow, lerped rAF
 const sectionRef = useRef<HTMLElement>(null);
 const glowRef = useRef<HTMLDivElement>(null);
 const cursorTarget = useRef({ x: -9999, y: -9999 });
 const cursorLerped = useRef({ x: -9999, y: -9999 });
 const frameRef = useRef<number>();

 useEffect(() => {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const tick = () => {
   cursorLerped.current.x = lerp(cursorLerped.current.x, cursorTarget.current.x, 0.07);
   cursorLerped.current.y = lerp(cursorLerped.current.y, cursorTarget.current.y, 0.07);
   if (glowRef.current) {
    const { x, y } = cursorLerped.current;
    glowRef.current.style.background =
     `radial-gradient(circle 540px at ${x}px ${y}px, rgba(46,216,168,0.10) 0%, rgba(46,216,168,0.04) 42%, transparent 72%)`;
   }
   frameRef.current = requestAnimationFrame(tick);
  };
  frameRef.current = requestAnimationFrame(tick);
  return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
 }, []);

 const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
  const rect = sectionRef.current?.getBoundingClientRect();
  if (!rect) return;
  cursorTarget.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
 }, []);

 useEffect(() => { setVisible(true); }, []);

 const cycleImage = useCallback(() => {
  setIsTransitioning(true);
  setTimeout(() => {
   setCurrentImage(prev => (prev + 1) % heroImages.length);
   setIsTransitioning(false);
  }, 600);
 }, []);

 useEffect(() => {
  const interval = setInterval(cycleImage, 5000);
  return () => clearInterval(interval);
 }, [cycleImage]);

 const reveal = {
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(24px)',
  transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s',
 };

 return (
  <section
   ref={sectionRef}
   onMouseMove={handleMouseMove}
   className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden"
   style={{ background: S.bg, minHeight: '100dvh' }}
   aria-label="Hero, Zential Pure"
  >
   {/* Cursor glow */}
   <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden />

   {/* Film grain, subtle paper texture on the light ground */}
   <div
    className="absolute inset-0 pointer-events-none"
    style={{
     zIndex: 2,
     backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
     backgroundRepeat: 'repeat',
     backgroundSize: '160px 160px',
     opacity: 0.06,
     mixBlendMode: 'multiply',
    }}
    aria-hidden
   />

   {/* ── Left: Cover content ── */}
   <div className="flex flex-col justify-between px-10 md:px-14 lg:px-16 py-12 md:py-14 relative" style={{ zIndex: 10 }}>

    {/* Spacer, replaces removed masthead height so title sits at correct position */}
    <div style={{ height: 48 }} aria-hidden />

    {/* Title block */}
    <div style={reveal}>
     <p style={{ ...S.dm, fontWeight: 400, fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: S.tealDeep, marginBottom: 28 }}>
      {t('hero.eyebrow', 'Resonance Restoration')}
     </p>

     <h1 style={{
      ...S.lora,
      fontStyle: 'italic',
      fontSize: 'clamp(44px, 5vw, 80px)',
      lineHeight: 1.03,
      color: S.ink,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      marginBottom: 28,
     }}>
      {t('hero.line1', 'The Body')}<br />
      {t('hero.line2', 'Remembers')}<br />
      <span style={{ color: S.tealDeep }}>{t('hero.line3', 'its Frequency.')}</span>
     </h1>

     <p style={{ ...S.dm, fontWeight: 400, fontSize: 15, lineHeight: 1.7, color: 'rgba(26,23,20,0.66)', maxWidth: 460, letterSpacing: '0.005em', marginBottom: 32 }}>
      {t('hero.subhead', 'A four-modality at-home instrument calibrated to clinic protocols. EMS, Microcurrent, Thermal and Cosmetic LED in a single 12-minute ritual. Built for the woman who left the clinic but kept the standard.')}
     </p>

     {/* Proof strip, 3 numeric anchors */}
     <div
      className="grid grid-cols-3 mb-9"
      style={{
       maxWidth: 540,
       borderTop: '1px solid rgba(26,23,20,0.12)',
       borderBottom: '1px solid rgba(26,23,20,0.12)',
      }}
     >
      {[
       { n: t('hero.proof.modalities.value', '4'), lbl: t('hero.proof.modalities.label', 'Clinical\nmodalities') },
       { n: t('hero.proof.price.value', '€88'), lbl: t('hero.proof.price.label', 'vs €1,440 / yr\nclinic average') },
       { n: t('hero.proof.guarantee.value', '30 days'), lbl: t('hero.proof.guarantee.label', 'Protocol\nguarantee') },
      ].map((row, i, arr) => (
       <div
        key={row.lbl}
        style={{
         padding: '18px 4px 18px 0',
         borderRight: i === arr.length - 1 ? 'none' : '1px solid rgba(26,23,20,0.12)',
        }}
       >
        <div style={{ ...S.lora, fontStyle: 'italic', fontWeight: 400, fontSize: 34, lineHeight: 1, color: S.tealDeep, marginBottom: 7, letterSpacing: '-0.01em' }}>
         {row.n}
        </div>
        <div style={{ ...S.dm, fontWeight: 400, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,23,20,0.5)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
         {row.lbl}
        </div>
       </div>
      ))}
     </div>

     {/* CTAs, filled-teal primary, outlined secondary */}
     <div className="flex flex-col min-[480px]:flex-row gap-3 max-w-md mb-6">
      <button
       className="flex-1 py-4 px-6 transition-all duration-300"
       style={{
        ...S.dm,
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: S.ink,
        border: `1px solid ${S.teal}`,
        backgroundColor: S.teal,
       }}
       onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
        (e.currentTarget as HTMLElement).style.color = S.tealDeep;
       }}
       onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = S.teal;
        (e.currentTarget as HTMLElement).style.color = S.ink;
       }}
       onClick={() => document.getElementById('devices')?.scrollIntoView({ behavior: 'smooth' })}
      >
       {t('hero.ctaPrimaryWithPrice', 'Order Face Introducer · €88')}
      </button>
      <Link
       to="/quiz"
       className="flex-1 py-4 px-6 text-center transition-all duration-300"
       style={{
        ...S.dm,
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: S.ink,
        border: '1px solid rgba(26,23,20,0.28)',
        backgroundColor: 'transparent',
       }}
       onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = S.tealDeep;
        (e.currentTarget as HTMLElement).style.color = S.tealDeep;
       }}
       onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,23,20,0.28)';
        (e.currentTarget as HTMLElement).style.color = S.ink;
       }}
      >
       {t('hero.ctaSecondary', 'Find Your Protocol')}
      </Link>
     </div>

     {/* Trust micro-row, teal dots */}
     <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
      {[
       t('hero.trust.shipping', 'Free EU shipping'),
       t('hero.trust.guarantee', '30-Day Protocol Guarantee'),
       t('hero.trust.tracked', 'Tracked shipping'),
      ].map(label => (
       <span key={label} className="flex items-center gap-2" style={{ ...S.dm, fontWeight: 400, fontSize: 11, color: 'rgba(26,23,20,0.5)' }}>
        <span style={{ display: 'inline-block', width: 5, height: 5, backgroundColor: S.teal, borderRadius: '50%' }} aria-hidden />
        {label}
       </span>
      ))}
     </div>
    </div>

    {/* Footer */}
    <div className="flex items-end justify-between">
     <span style={{ ...S.dm, fontWeight: 400, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,23,20,0.28)' }}>
      Issue 001 · Spring 2025 · zentialpure.com
     </span>
     <span style={{ ...S.lora, fontStyle: 'italic', fontSize: 48, color: 'rgba(26,23,20,0.08)', fontWeight: 400, lineHeight: 1 }}>
      01
     </span>
    </div>
   </div>

   {/* ── Right: Editorial image ── */}
   <div className="relative overflow-hidden min-h-[60vh] md:min-h-0 order-first md:order-last">
    {heroImages.map((src, i) => (
     <img
      key={i}
      src={src}
      alt={i === 0 ? 'Red light therapy mat restoration ritual' : 'Zential Pure ritual'}
      className="absolute inset-0 w-full h-full object-cover"
      {...(i === 0 ? { fetchPriority: 'high' as any, loading: 'eager' as const } : { loading: 'lazy' as const })}
      style={{
       opacity: currentImage === i ? (isTransitioning ? 0 : 1) : 0,
       transition: 'opacity 0.6s ease-in-out',
      }}
     />
    ))}

    {/* Left bleed into the light ground */}
    <div
     className="absolute inset-0 pointer-events-none hidden md:block"
     style={{ background: 'linear-gradient(to right, #F7F4F0 0%, transparent 14%)' }}
    />
    {/* Bottom bleed on mobile */}
    <div
     className="absolute inset-0 pointer-events-none md:hidden"
     style={{ background: 'linear-gradient(to top, #F7F4F0 0%, transparent 32%)' }}
    />
    {/* Soft teal atmospheric tint */}
    <div
     className="absolute inset-0 pointer-events-none"
     style={{ background: 'linear-gradient(135deg, transparent 55%, rgba(46,216,168,0.14) 100%)' }}
    />
    {/* Clinical scan line */}
    <div className="scan-line-wrap hidden md:block" aria-hidden>
     <div className="scan-line" />
    </div>

    {/* Vertical caption */}
    <div
     className="absolute top-12 right-10 hidden md:block"
     style={{
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
      transform: 'rotate(180deg)',
      ...S.dm,
      fontWeight: 400,
      fontSize: 9,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.6)',
     }}
    >
     Campaign I · Resonance Series
    </div>

    {/* Format tag */}
    <div
     className="absolute bottom-12 left-10 hidden md:block"
     style={{ ...S.dm, fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}
    >
     4×5 · Editorial
    </div>
   </div>
  </section>
 );
}
