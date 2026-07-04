import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { COPY, CTA_HREF, GIFTS, TIMING } from "./config";
import { ga4Event, pixelRevealEngaged, pixelViewContent } from "./tracking";
import { useRevealRitual } from "./useRevealRitual";

/* ────────────────────────────────────────────────────────────────────────────
   /reveal — gift-reveal ritual lander (paid Meta traffic)
   Standalone: no site nav, no footer, noindex.
   Campaign values live in ./config.ts — edit nothing here per campaign.
   ──────────────────────────────────────────────────────────────────────────── */

/* The Zential flower mark — four overlapping ellipses at 0/45/90/135°. */
function FlowerMark({
  size,
  stroke,
  strokeWidth = 1.25,
  draw = false,
}: {
  size: number;
  stroke: string;
  strokeWidth?: number;
  /** true = petals draw themselves in when the card is chosen */
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      className={draw ? "zr-draw" : undefined}
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="32"
          rx="20"
          ry="12"
          pathLength={100}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={stroke}
          fillOpacity="0.05"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="2.25" fill={stroke} />
    </svg>
  );
}

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    /* haptics are a garnish, never a dependency */
  }
}

export default function Reveal() {
  const { phase, chosen, ctaReady, restored, choose } = useRevealRitual((i) => {
    ga4Event("card_selected", { card_index: i });
    pixelRevealEngaged();
    vibrate(12);
  });
  const giftsEventFired = useRef(false);

  // reward haptics — one soft tick as each gift lands, one as the CTA arrives
  useEffect(() => {
    if (phase === "gifts" && !restored) {
      vibrate([10, TIMING.giftStagger - 10, 10, TIMING.giftStagger - 10, 10]);
    }
  }, [phase, restored]);
  useEffect(() => {
    if (ctaReady && !restored) vibrate(18);
  }, [ctaReady, restored]);

  useEffect(() => {
    ga4Event("reveal_page_view");
    pixelViewContent();
    // index.html ships a static `robots: index, follow` — Helmet appends a second
    // tag rather than replacing it, so flip the static one for this route too.
    const staticRobots = document.querySelector('meta[name="robots"]:not([data-rh])');
    const prevRobots = staticRobots?.getAttribute("content") ?? null;
    staticRobots?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (staticRobots && prevRobots) staticRobots.setAttribute("content", prevRobots);
    };
  }, []);

  useEffect(() => {
    if (ctaReady && !restored && !giftsEventFired.current) {
      giftsEventFired.current = true;
      ga4Event("gifts_revealed");
    }
  }, [ctaReady, restored]);

  return (
    <div className={`zr-page ${restored ? "is-restored" : ""} ${phase === "flip" ? "is-focus" : ""}`}>
      <Helmet>
        <title>{COPY.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#1A1714" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-400.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-600.woff2" crossOrigin="anonymous" />
      </Helmet>

      <style>{css}</style>

      {/* atmosphere */}
      <div className="zr-vignette" aria-hidden="true" />
      <div className="zr-grain" aria-hidden="true" />

      <header className="zr-header">
        <div className="zr-brand">
          <FlowerMark size={22} stroke="#C6A07C" strokeWidth={2} />
          <p className="zr-eyebrow">{COPY.eyebrow}</p>
        </div>
        <div className="zr-headline-wrap">
          <h1 className={`zr-headline ${phase === "idle" ? "is-in" : "is-out"}`}>
            {COPY.headline1}
            <br />
            {COPY.headline2}
          </h1>
          <h1 className={`zr-headline zr-headline--after ${phase === "gifts" ? "is-in" : "is-out"}`}>
            {COPY.headlineAfter}
          </h1>
        </div>
        <p className={`zr-sub ${phase === "idle" ? "is-in" : "is-out"}`}>
          {COPY.sub1}
          <br />
          {COPY.sub2}
        </p>
      </header>

      {/* JS-disabled fallback — the prerendered HTML carries this statically */}
      <noscript>
        <div className="zr-noscript">
          {GIFTS.map((g) => (
            <div className="zr-gift" key={g.num} style={{ opacity: 1, animation: "none" }}>
              <span className="zr-gift-num">{g.num}</span>
              <span className="zr-gift-title">{g.title}</span>
            </div>
          ))}
          <a className="zr-cta" href={CTA_HREF} style={{ marginTop: "16px" }}>
            {COPY.cta}
          </a>
          <p className="zr-cta-note">{COPY.ctaNote}</p>
        </div>
      </noscript>

      <main className="zr-stage">
        {/* the three cards */}
        <div className={`zr-hand ${chosen !== null ? "is-locked" : ""}`} aria-live="polite">
          {[0, 1, 2].map((i) => {
            const state =
              chosen === null ? "idle" : chosen === i ? "chosen" : "passed";
            return (
              <button
                key={i}
                className={`zr-card zr-card--${i} is-${state}`}
                onClick={() => choose(i)}
                disabled={chosen !== null}
                aria-label={`Card ${i + 1} of 3`}
              >
                <span className="zr-card-glow" aria-hidden="true" />
                <span className="zr-card-float">
                  <span className="zr-card-inner">
                    <span className="zr-face zr-face--back">
                      <FlowerMark size={72} stroke="rgba(198,160,124,0.85)" />
                      <span className="zr-face-wordmark">ZP</span>
                    </span>
                    <span className="zr-face zr-face--front">
                      <FlowerMark size={72} stroke="#2ED8A8" strokeWidth={1.5} draw />
                      <span className="zr-face-tagline">{COPY.cardFrontLine}</span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* the gift stack */}
        {phase === "gifts" && (
          <div className="zr-gifts" role="status">
            <p className="zr-gifts-lead">{COPY.subAfter}</p>
            {GIFTS.map((g, i) => (
              <div
                className="zr-gift"
                key={g.num}
                style={{ animationDelay: `${i * TIMING.giftStagger}ms` }}
              >
                <span className="zr-gift-num">{g.num}</span>
                <span className="zr-gift-title">{g.title}</span>
              </div>
            ))}

            {ctaReady && (
              <div className="zr-cta-wrap">
                <a
                  className="zr-cta"
                  href={CTA_HREF}
                  onClick={() => ga4Event("reveal_cta_click")}
                >
                  {COPY.cta}
                </a>
                <p className="zr-cta-note">{COPY.ctaNote}</p>
                <p className="zr-cta-tagline">{COPY.footerAfter}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="zr-footer">
        <p className={`zr-foot-line ${phase === "idle" ? "is-in" : "is-out"}`}>
          {COPY.footer}
        </p>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

const css = `
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins-400.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins-500.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins-600.woff2') format('woff2');
  font-weight: 600; font-style: normal; font-display: swap;
}

.zr-page {
  --teal: #2ED8A8;
  --dark: #1A1714;
  --gold: #C6A07C;
  --terra: #9B5A2E;
  --cream: #F7F4F0;
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--dark);
  color: var(--cream);
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  overscroll-behavior: none;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
}

/* ── atmosphere ─────────────────────────────────────────────── */
.zr-vignette {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background:
    radial-gradient(120% 90% at 50% 38%, transparent 40%, rgba(0,0,0,0.42) 100%),
    radial-gradient(80% 50% at 50% 30%, rgba(198,160,124,0.06) 0%, transparent 70%);
}
.zr-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 2; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── entrances ──────────────────────────────────────────────── */
@keyframes zr-rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes zr-fade-only {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.zr-brand     { animation: zr-rise 600ms cubic-bezier(0,0,.2,1) backwards; }
.zr-headline  { animation: zr-rise 600ms cubic-bezier(0,0,.2,1) 120ms backwards; }
.zr-sub       { animation: zr-rise 600ms cubic-bezier(0,0,.2,1) 260ms backwards; }
.zr-foot-line { animation: zr-rise 600ms cubic-bezier(0,0,.2,1) 900ms backwards; }
.zr-headline--after { animation: none; }

/* ── header ─────────────────────────────────────────────────── */
.zr-header {
  position: relative; z-index: 3;
  padding: 40px 24px 0;
  text-align: center;
}
.zr-brand {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.zr-eyebrow {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 0.42em;
  color: var(--gold);
}
.zr-headline-wrap { position: relative; }
.zr-headline {
  margin: 0;
  font-family: 'Lora', serif;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(30px, 8.5vw, 40px);
  line-height: 1.18;
  letter-spacing: 0.01em;
  color: var(--cream);
  transition: opacity 500ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.4,0,.2,1);
}
.zr-headline--after {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.zr-headline.is-out { opacity: 0; transform: translateY(-8px); pointer-events: none; }
.zr-headline.is-in  { opacity: 1; transform: translateY(0); transition-delay: 250ms; }
.zr-sub {
  margin: 16px 0 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(247,244,240,0.55);
  transition: opacity 400ms cubic-bezier(.4,0,.2,1);
}
.zr-sub.is-out { opacity: 0; pointer-events: none; }

/* the room dims while the card turns — cinema, not spotlight */
.zr-page::after {
  content: '';
  position: fixed; inset: 0; z-index: 2;
  background: #000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 700ms cubic-bezier(.4,0,.2,1);
}
.zr-page.is-focus::after { opacity: 0.3; }

/* ── stage / cards ──────────────────────────────────────────── */
.zr-stage {
  position: relative; z-index: 3;
  flex: 1;
  min-height: 480px;
}
.zr-hand {
  position: absolute; inset: 0;
  perspective: 1200px;
}
.zr-card {
  position: absolute;
  left: 50%; top: 38%;
  width: min(37vw, 160px);
  aspect-ratio: 2 / 3;
  padding: 0; border: 0; background: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 600ms cubic-bezier(.4,0,.2,1), opacity 600ms cubic-bezier(.4,0,.2,1);
  will-change: transform, opacity;
}
.zr-card:disabled { cursor: default; }
.zr-card:focus-visible { outline: none; }
.zr-card:focus-visible .zr-card-inner { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 12px; }

/* the held hand — tight overlap, center card proud */
.zr-card--0 { transform: translate(-112%, -44%) rotate(-7deg); z-index: 1; }
.zr-card--1 { transform: translate(-50%, -54%) rotate(0deg);   z-index: 2; }
.zr-card--2 { transform: translate(12%, -44%) rotate(7deg);    z-index: 1; }

/* the cards are dealt onto the table on arrival */
@keyframes zr-deal-0 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(-112%, -44%) rotate(-7deg); opacity: 1; } }
@keyframes zr-deal-1 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(-50%, -54%) rotate(0deg); opacity: 1; } }
@keyframes zr-deal-2 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(12%, -44%) rotate(7deg); opacity: 1; } }
.zr-card--0 { animation: zr-deal-0 700ms cubic-bezier(0,0,.2,1) 350ms backwards; }
.zr-card--1 { animation: zr-deal-1 700ms cubic-bezier(0,0,.2,1) 500ms backwards; }
.zr-card--2 { animation: zr-deal-2 700ms cubic-bezier(0,0,.2,1) 650ms backwards; }
.zr-hand.is-locked .zr-card { animation: none; }

/* idle breathing — the hand is alive, barely */
.zr-card-float { display: block; width: 100%; height: 100%; transition: transform 150ms cubic-bezier(.4,0,.2,1); }

/* press feedback — the card gives under the thumb */
.zr-card:not(:disabled):active .zr-card-float {
  animation: none;
  transform: scale(0.97);
}

/* gold glint — light passes over the resting cards, one at a time */
.zr-face--back { overflow: hidden; }
.zr-face--back::after {
  content: '';
  position: absolute; inset: -20%;
  background: linear-gradient(105deg, transparent 42%, rgba(251,249,246,0.55) 50%, rgba(198,160,124,0.25) 54%, transparent 62%);
  transform: translateX(-130%);
  animation: zr-glint 5200ms cubic-bezier(.4,0,.2,1) 2400ms infinite;
  pointer-events: none;
}
.zr-card--1 .zr-face--back::after { animation-delay: 3400ms; }
.zr-card--2 .zr-face--back::after { animation-delay: 4400ms; }
@keyframes zr-glint {
  0%   { transform: translateX(-130%); }
  14%  { transform: translateX(130%); }
  100% { transform: translateX(130%); }
}
.zr-hand.is-locked .zr-face--back::after { animation: none; opacity: 0; }
@keyframes zr-breathe {
  from { transform: translateY(0); }
  to   { transform: translateY(-5px); }
}
.zr-card .zr-card-float { animation: zr-breathe 3200ms ease-in-out 1400ms infinite alternate; }
.zr-card--1 .zr-card-float { animation-delay: 2000ms; }
.zr-card--2 .zr-card-float { animation-delay: 2600ms; }
.zr-hand.is-locked .zr-card-float { animation: none; }

/* desktop hover — the card leans toward the hand that hovers it */
@media (hover: hover) {
  .zr-card:not(:disabled):hover { transition-duration: 300ms; }
  .zr-card--0:not(:disabled):hover { transform: translate(-112%, -48%) rotate(-7deg); }
  .zr-card--1:not(:disabled):hover { transform: translate(-50%, -58%) rotate(0deg); }
  .zr-card--2:not(:disabled):hover { transform: translate(12%, -48%) rotate(7deg); }
}

/* the unchosen recede — they settle back to the table, slowly */
.zr-card.is-passed { opacity: 0; pointer-events: none; transition-duration: 900ms; }
.zr-card--0.is-passed { transform: translate(-126%, -30%) rotate(-12deg) scale(0.92); }
.zr-card--1.is-passed { transform: translate(-50%, -40%) rotate(0deg) scale(0.92); }
.zr-card--2.is-passed { transform: translate(26%, -30%) rotate(12deg) scale(0.92); }

/* the chosen centers, lifts, then flips */
.zr-card.is-chosen {
  transform: translate(-50%, -116%) rotate(0deg) scale(0.84);
  z-index: 3;
  transition-duration: 850ms;
}

.zr-card-inner {
  position: relative; display: block;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform ${TIMING.flip}ms cubic-bezier(.4,0,.2,1) ${TIMING.lift}ms;
  will-change: transform;
}
.zr-card.is-chosen .zr-card-inner { transform: rotateY(180deg); }

.zr-face {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
  background: linear-gradient(162deg, #FBF9F6 0%, var(--cream) 46%, #EFE8DE 100%);
  border: 1px solid rgba(198,160,124,0.85);
}
.zr-face::before {
  content: '';
  position: absolute; inset: 6px;
  border: 1px solid rgba(198,160,124,0.4);
  border-radius: 7px;
  pointer-events: none;
}
.zr-face--front {
  transform: rotateY(180deg);
}
.zr-face--front::before { border-color: rgba(46,216,168,0.35); }
.zr-face-wordmark {
  position: absolute; bottom: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--gold);
}
.zr-face-tagline {
  position: absolute; bottom: 12px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 8px;
  letter-spacing: 0.22em;
  color: var(--terra);
  white-space: nowrap;
}

/* the mark draws itself once the card has turned — the reveal's second beat */
.zr-draw ellipse { stroke-dasharray: 100; stroke-dashoffset: 100; fill-opacity: 0; }
.zr-draw circle  { opacity: 0; }
.zr-card.is-chosen .zr-draw ellipse {
  animation: zr-draw-stroke 700ms cubic-bezier(.4,0,.2,1) forwards, zr-fill-in 400ms ease 1150ms forwards;
}
.zr-card.is-chosen .zr-draw ellipse:nth-of-type(1) { animation-delay: 560ms, 1150ms; }
.zr-card.is-chosen .zr-draw ellipse:nth-of-type(2) { animation-delay: 660ms, 1150ms; }
.zr-card.is-chosen .zr-draw ellipse:nth-of-type(3) { animation-delay: 760ms, 1150ms; }
.zr-card.is-chosen .zr-draw ellipse:nth-of-type(4) { animation-delay: 860ms, 1150ms; }
.zr-card.is-chosen .zr-draw circle { animation: zr-fade-only 300ms ease 1250ms forwards; }
@keyframes zr-draw-stroke { to { stroke-dashoffset: 0; } }
@keyframes zr-fill-in { to { fill-opacity: 0.05; } }

/* teal glow — ignites as the card turns */
.zr-card-glow {
  position: absolute; inset: -40%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46,216,168,0.28) 0%, transparent 62%);
  opacity: 0;
  transition: opacity 700ms cubic-bezier(.4,0,.2,1) ${TIMING.lift + 200}ms;
  pointer-events: none;
}
.zr-card.is-chosen .zr-card-glow { opacity: 1; }

/* ── gifts ──────────────────────────────────────────────────── */
.zr-gifts {
  position: absolute;
  left: 50%; top: 40%;
  transform: translateX(-50%);
  width: min(86vw, 360px);
  display: flex; flex-direction: column;
  gap: 12px;
}
.zr-gifts-lead {
  margin: 0 0 4px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(46,216,168,0.75);
  animation: zr-fade-only 500ms cubic-bezier(0,0,.2,1) 100ms both;
}
.zr-gift {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 20px;
  border: 1px solid rgba(198,160,124,0.35);
  border-left: 2px solid var(--terra);
  border-radius: 4px;
  background: rgba(247,244,240,0.03);
  opacity: 0;
  animation: zr-gift-in ${TIMING.giftDur}ms cubic-bezier(0,0,.2,1) both;
}
@keyframes zr-gift-in {
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.zr-gift-num {
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--gold);
  animation: zr-ignite 900ms cubic-bezier(.4,0,.2,1) both;
  animation-delay: inherit;
}
/* each number lands teal, then settles to gold — the hit, then the calm */
@keyframes zr-ignite {
  0%   { color: var(--teal); }
  55%  { color: var(--teal); }
  100% { color: var(--gold); }
}
.zr-gift-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 1.45;
  color: var(--cream);
}

/* ── CTA ────────────────────────────────────────────────────── */
.zr-cta-wrap {
  position: relative;
  margin-top: 16px;
  text-align: center;
  animation: zr-gift-in 500ms cubic-bezier(0,0,.2,1) both;
}
/* one exhale of teal light behind the CTA as it arrives — once, then still */
.zr-cta-wrap::before {
  content: '';
  position: absolute; inset: -32px -24px;
  background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(46,216,168,0.22) 0%, transparent 70%);
  opacity: 0;
  animation: zr-halo 1600ms cubic-bezier(.4,0,.2,1) 300ms;
  pointer-events: none;
}
@keyframes zr-halo {
  0%   { opacity: 0; }
  35%  { opacity: 1; }
  100% { opacity: 0; }
}
.zr-cta {
  display: block;
  padding: 16px 24px;
  border-radius: 4px;
  background: var(--teal);
  color: var(--dark);
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 150ms cubic-bezier(.4,0,.2,1), background-color 150ms;
}
.zr-cta:active { transform: scale(0.98); }
.zr-cta:hover { background-color: #29C99B; }
.zr-cta:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
.zr-cta-note {
  margin: 12px 0 0;
  font-size: 11px;
  color: rgba(247,244,240,0.45);
}
.zr-cta-tagline {
  margin: 16px 0 0;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(198,160,124,0.8);
}

/* ── no-JS fallback ─────────────────────────────────────────── */
.zr-noscript {
  position: relative; z-index: 3;
  width: min(86vw, 360px);
  margin: 32px auto 0;
  display: flex; flex-direction: column;
  gap: 12px;
  text-align: center;
}

/* ── footer ─────────────────────────────────────────────────── */
.zr-footer {
  position: relative; z-index: 3;
  padding: 0 24px 32px;
  text-align: center;
}
.zr-foot-line {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: rgba(198,160,124,0.6);
  transition: opacity 400ms;
}
.zr-foot-line.is-out { opacity: 0; pointer-events: none; }

/* ── reduced motion — the ritual becomes a sequence of fades ── */
@media (prefers-reduced-motion: reduce) {
  .zr-card, .zr-card-float, .zr-brand, .zr-headline, .zr-sub, .zr-foot-line,
  .zr-face--back::after, .zr-cta-wrap::before, .zr-gift-num { animation: none !important; }
  .zr-headline, .zr-sub, .zr-foot-line { transition: opacity 400ms ease !important; transform: none !important; }
  .zr-card { transition: opacity 400ms ease !important; }
  .zr-card-inner { transition: none !important; }
  .zr-card.is-chosen .zr-card-inner { transform: none; }
  .zr-face--front { transform: none; opacity: 0; transition: opacity 400ms ease 200ms; }
  .zr-card.is-chosen .zr-face--front { opacity: 1; }
  .zr-card.is-chosen .zr-face--back { opacity: 0; transition: opacity 400ms ease 200ms; }
  .zr-card-glow { transition: opacity 400ms ease 200ms !important; }
  .zr-gift { animation-name: zr-fade-only !important; }
  .zr-cta-wrap { animation-name: zr-fade-only !important; }
  .zr-draw ellipse { animation: none !important; stroke-dashoffset: 0; fill-opacity: 0.05; }
  .zr-draw circle { animation: none !important; opacity: 1; }
  .zr-page::after { transition: none !important; }
}

/* ── restored session (back-button return) — no replay ─────── */
.zr-page.is-restored *,
.zr-page.is-restored *::before,
.zr-page.is-restored *::after { animation: none !important; transition: none !important; }
.zr-page.is-restored .zr-gift,
.zr-page.is-restored .zr-cta-wrap { opacity: 1 !important; }
.zr-page.is-restored .zr-draw ellipse { stroke-dashoffset: 0; fill-opacity: 0.05; }
.zr-page.is-restored .zr-draw circle { opacity: 1; }

/* ── desktop ────────────────────────────────────────────────── */
@media (min-width: 768px) {
  .zr-header { padding-top: 64px; }
  .zr-headline { font-size: 44px; }
  .zr-card { width: 184px; }
  .zr-gifts { width: 400px; }
}
`;
