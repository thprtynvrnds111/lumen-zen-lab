import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef } from "react";
import { COPY, PDP_PATH, PRIZES, TIMING } from "./config";
import { ga4Event, pixelRevealEngaged, pixelViewContent } from "../reveal/tracking";
import { usePickRitual } from "./usePickRitual";

/* /pick — gamified discount lander for paid traffic (TOF educator campaign).
   Noindex, no site chrome. Three cards, three real tiers — the mechanic is
   the /reveal ritual grammar with a per-card prize instead of a shared gift
   stack. Campaign values live in ./config.ts. */

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
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      className={draw ? "zk-draw" : undefined}
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

export default function Pick() {
  const { phase, chosen, prize, order, ctaReady, restored, choose } = usePickRitual(
    (i, prizeIndex) => {
      ga4Event("pick_card_selected", {
        card_index: i,
        percent: PRIZES[prizeIndex].percent,
      });
      pixelRevealEngaged();
      vibrate(12);
    }
  );

  // Preserve incoming params (fbclid etc.) and append the revealed discount —
  // same continuity contract as the bridge funnel: PDP forwards ?discount=
  // into Shopify checkout.
  const ctaHref = useMemo(() => {
    if (!prize) return PDP_PATH;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    params.set("discount", prize.code);
    return `${PDP_PATH}?${params.toString()}`;
  }, [prize]);

  const prizeEventFired = useRef(false);

  useEffect(() => {
    // index.html ships a static `robots: index, follow` — flip it for this route.
    const staticRobots = document.querySelector('meta[name="robots"]:not([data-rh])');
    const prevRobots = staticRobots?.getAttribute("content") ?? null;
    staticRobots?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (staticRobots && prevRobots) staticRobots.setAttribute("content", prevRobots);
    };
  }, []);

  useEffect(() => {
    ga4Event("pick_page_view", {});
    pixelViewContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ctaReady && !restored && !prizeEventFired.current && prize) {
      prizeEventFired.current = true;
      ga4Event("pick_prize_revealed", { percent: prize.percent });
      vibrate(18);
    }
  }, [ctaReady, restored, prize]);

  return (
    <>
      <Helmet>
        <title>{COPY.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-400.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-600.woff2" crossOrigin="anonymous" />
      </Helmet>

      <div className={`zk-page ${restored ? "is-restored" : ""} ${phase === "flip" ? "is-focus" : ""}`}>
        <style>{css}</style>

        {/* atmosphere */}
        <div className="zk-vignette" aria-hidden="true" />
        <div className="zk-grain" aria-hidden="true" />

        <header className="zk-header">
          <div className="zk-brand">
            <FlowerMark size={22} stroke="#0E7A54" strokeWidth={2} />
            <p className="zk-eyebrow">{COPY.eyebrow}</p>
          </div>
          <div className="zk-headline-wrap">
            <h1 className={`zk-headline ${phase === "idle" ? "is-in" : "is-out"}`}>
              {COPY.headline1}
              <br />
              {COPY.headline2}
            </h1>
            <h1 className={`zk-headline zk-headline--after ${phase === "prize" ? "is-in" : "is-out"}`}>
              {COPY.headlineAfter}
            </h1>
          </div>
          <p className={`zk-sub ${phase === "idle" ? "is-in" : "is-out"}`}>
            {COPY.sub1}
            <br />
            {COPY.sub2}
          </p>
        </header>

        {/* JS-disabled fallback — the prerendered HTML carries this statically */}
        <noscript>
          <div className="zk-noscript">
            <p className="zk-noscript-line">
              The cards need JavaScript. The founding ten percent does not:
            </p>
            <a className="zk-cta" href={`${PDP_PATH}?discount=${PRIZES[0].code}`}>
              10% {COPY.prizeProduct}
            </a>
            <p className="zk-cta-note">{COPY.ctaNote}</p>
          </div>
        </noscript>

        <main className="zk-stage">
          {/* the three cards */}
          <div className={`zk-hand ${chosen !== null ? "is-locked" : ""}`} aria-live="polite">
            {[0, 1, 2].map((i) => {
              const state = chosen === null ? "idle" : chosen === i ? "chosen" : "passed";
              const cardPrize = PRIZES[order[i]];
              return (
                <button
                  key={i}
                  className={`zk-card zk-card--${i} is-${state}`}
                  onClick={() => choose(i)}
                  disabled={chosen !== null}
                  aria-label={`Card ${i + 1} of 3`}
                >
                  <span className="zk-card-glow" aria-hidden="true" />
                  <span className="zk-card-float">
                    <span className="zk-card-inner">
                      <span className="zk-face zk-face--back">
                        <FlowerMark size={72} stroke="rgba(14,122,84,0.75)" />
                        <span className="zk-face-wordmark">ZP</span>
                      </span>
                      <span className="zk-face zk-face--front">
                        <span className="zk-face-percent">−{cardPrize.percent}%</span>
                        <span className="zk-face-tagline">{cardPrize.detail}</span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* the prize */}
          {phase === "prize" && prize && (
            <div className="zk-prize" role="status">
              <p className="zk-prize-lead">{COPY.subAfter}</p>
              <div className="zk-prize-row" style={{ animationDelay: "100ms" }}>
                <span className="zk-prize-percent">−{prize.percent}%</span>
                <span className="zk-prize-body">
                  <span className="zk-prize-title">
                    {prize.percent}% {COPY.prizeProduct}
                  </span>
                  <span className="zk-prize-detail">{COPY.prizeAnchor}</span>
                </span>
              </div>

              {ctaReady && (
                <div className="zk-cta-wrap">
                  <a
                    className="zk-cta"
                    href={ctaHref}
                    onClick={() =>
                      ga4Event("pick_cta_click", { percent: prize.percent })
                    }
                  >
                    {COPY.cta}
                  </a>
                  <p className="zk-cta-note">{COPY.ctaNote}</p>
                  <p className="zk-cta-tagline">{COPY.footerAfter}</p>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="zk-footer">
          <p className={`zk-foot-line ${phase === "idle" ? "is-in" : "is-out"}`}>
            {COPY.footer}
          </p>
        </footer>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   The /reveal ritual grammar, re-set for a per-card prize. Same tempo, same
   palette, same flat elevation; only the card fronts and the prize block
   differ. Class prefix zk- keeps the two landers independent.
   ──────────────────────────────────────────────────────────────────────────── */

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

.zk-page {
  --teal: #2ED8A8;
  --dark: #141414;
  --emerald: #0E7A54;
  --muted: #8E8E8E;
  --line: rgba(20,20,20,0.12);
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: var(--dark);
  font-family: 'Switzer', 'Poppins', sans-serif;
  overflow-x: clip;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
}

/* ── atmosphere ─────────────────────────────────────────────── */
.zk-vignette {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background:
    radial-gradient(80% 50% at 50% 30%, rgba(46,216,168,0.06) 0%, transparent 70%);
}
.zk-grain {
  display: none;
  position: fixed; inset: 0; pointer-events: none; z-index: 2; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── entrances ──────────────────────────────────────────────── */
@keyframes zk-rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes zk-fade-only {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.zk-brand     { animation: zk-rise 600ms cubic-bezier(0,0,.2,1) backwards; }
.zk-headline  { animation: zk-rise 600ms cubic-bezier(0,0,.2,1) 120ms backwards; }
.zk-sub       { animation: zk-rise 600ms cubic-bezier(0,0,.2,1) 260ms backwards; }
.zk-foot-line { animation: zk-rise 600ms cubic-bezier(0,0,.2,1) 900ms backwards; }
.zk-headline--after { animation: none; }

/* ── header ─────────────────────────────────────────────────── */
.zk-header {
  position: relative; z-index: 3;
  padding: 40px 24px 0;
  text-align: center;
}
.zk-brand {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.zk-eyebrow {
  margin: 0;
  font-family: 'Switzer', 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.42em;
  color: var(--muted);
}
.zk-headline-wrap { position: relative; }
.zk-headline {
  margin: 0;
  font-family: 'Switzer', 'Poppins', sans-serif;
  font-weight: 300;
  font-size: clamp(30px, 8.5vw, 40px);
  line-height: 1.14;
  letter-spacing: -0.02em;
  color: var(--dark);
  transition: opacity 500ms cubic-bezier(.4,0,.2,1), transform 500ms cubic-bezier(.4,0,.2,1);
}
.zk-headline--after {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.zk-headline.is-out { opacity: 0; transform: translateY(-8px); pointer-events: none; }
.zk-headline.is-in  { opacity: 1; transform: translateY(0); transition-delay: 250ms; }
.zk-sub {
  margin: 16px 0 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: #5A5A5A;
  transition: opacity 400ms cubic-bezier(.4,0,.2,1);
}
.zk-sub.is-out { opacity: 0; pointer-events: none; }

/* the room dims while the card turns */
.zk-page::after {
  content: '';
  position: fixed; inset: 0; z-index: 2;
  background: #000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 700ms cubic-bezier(.4,0,.2,1);
}
.zk-page.is-focus::after { opacity: 0.12; }

/* ── stage / cards ──────────────────────────────────────────── */
.zk-stage {
  position: relative; z-index: 3;
  flex: 1;
  min-height: 480px;
}
.zk-hand {
  position: absolute; inset: 0;
  perspective: 1200px;
}
.zk-card {
  position: absolute;
  left: 50%; top: 190px;
  width: min(37vw, 160px);
  aspect-ratio: 2 / 3;
  padding: 0; border: 0; background: none; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 600ms cubic-bezier(.4,0,.2,1), opacity 600ms cubic-bezier(.4,0,.2,1);
  will-change: transform, opacity;
}
.zk-card:disabled { cursor: default; }
.zk-card:focus-visible { outline: none; }
.zk-card:focus-visible .zk-card-inner { outline: 2px solid var(--emerald); outline-offset: 4px; border-radius: 12px; }

/* the held hand — tight overlap, center card proud */
.zk-card--0 { transform: translate(-112%, -44%) rotate(-7deg); z-index: 1; }
.zk-card--1 { transform: translate(-50%, -54%) rotate(0deg);   z-index: 2; }
.zk-card--2 { transform: translate(12%, -44%) rotate(7deg);    z-index: 1; }

@keyframes zk-deal-0 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(-112%, -44%) rotate(-7deg); opacity: 1; } }
@keyframes zk-deal-1 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(-50%, -54%) rotate(0deg); opacity: 1; } }
@keyframes zk-deal-2 { from { transform: translate(-50%, -34%) rotate(0deg); opacity: 0; } to { transform: translate(12%, -44%) rotate(7deg); opacity: 1; } }
.zk-card--0 { animation: zk-deal-0 700ms cubic-bezier(0,0,.2,1) 350ms backwards; }
.zk-card--1 { animation: zk-deal-1 700ms cubic-bezier(0,0,.2,1) 500ms backwards; }
.zk-card--2 { animation: zk-deal-2 700ms cubic-bezier(0,0,.2,1) 650ms backwards; }
.zk-hand.is-locked .zk-card { animation: none; }

/* idle breathing */
.zk-card-float { display: block; width: 100%; height: 100%; transition: transform 150ms cubic-bezier(.4,0,.2,1); }
.zk-card:not(:disabled):active .zk-card-float {
  animation: none;
  transform: scale(0.97);
}

/* gold glint — light passes over the resting cards, one at a time */
.zk-face--back { overflow: hidden; }
.zk-face--back::after {
  content: '';
  position: absolute; inset: -20%;
  background: linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.7) 50%, rgba(14,122,84,0.12) 54%, transparent 62%);
  transform: translateX(-130%);
  animation: zk-glint 5200ms cubic-bezier(.4,0,.2,1) 2400ms infinite;
  pointer-events: none;
}
.zk-card--1 .zk-face--back::after { animation-delay: 3400ms; }
.zk-card--2 .zk-face--back::after { animation-delay: 4400ms; }
@keyframes zk-glint {
  0%   { transform: translateX(-130%); }
  14%  { transform: translateX(130%); }
  100% { transform: translateX(130%); }
}
.zk-hand.is-locked .zk-face--back::after { animation: none; opacity: 0; }
@keyframes zk-breathe {
  from { transform: translateY(0); }
  to   { transform: translateY(-5px); }
}
.zk-card .zk-card-float { animation: zk-breathe 3200ms ease-in-out 1400ms infinite alternate; }
.zk-card--1 .zk-card-float { animation-delay: 2000ms; }
.zk-card--2 .zk-card-float { animation-delay: 2600ms; }
.zk-hand.is-locked .zk-card-float { animation: none; }

@media (hover: hover) {
  .zk-card:not(:disabled):hover { transition-duration: 300ms; }
  .zk-card--0:not(:disabled):hover { transform: translate(-112%, -48%) rotate(-7deg); }
  .zk-card--1:not(:disabled):hover { transform: translate(-50%, -58%) rotate(0deg); }
  .zk-card--2:not(:disabled):hover { transform: translate(12%, -48%) rotate(7deg); }
}

/* the unchosen recede */
.zk-card.is-passed { opacity: 0; pointer-events: none; transition-duration: 900ms; }
.zk-card--0.is-passed { transform: translate(-126%, -30%) rotate(-12deg) scale(0.92); }
.zk-card--1.is-passed { transform: translate(-50%, -40%) rotate(0deg) scale(0.92); }
.zk-card--2.is-passed { transform: translate(26%, -30%) rotate(12deg) scale(0.92); }

/* the chosen centers, lifts, then flips */
.zk-card.is-chosen {
  transform: translate(-50%, -116%) rotate(0deg) scale(0.84);
  z-index: 3;
  transition-duration: 850ms;
}

.zk-card-inner {
  position: relative; display: block;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform ${TIMING.flip}ms cubic-bezier(.4,0,.2,1) ${TIMING.lift}ms;
  will-change: transform;
}
.zk-card.is-chosen .zk-card-inner { transform: rotateY(180deg); }

.zk-face {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid var(--line);
}
.zk-face::before {
  content: '';
  position: absolute; inset: 6px;
  border: 1px solid rgba(20,20,20,0.10);
  border-radius: 7px;
  pointer-events: none;
}
.zk-face--front {
  transform: rotateY(180deg);
}
.zk-face--front::before { border-color: rgba(46,216,168,0.35); }
.zk-face-wordmark {
  position: absolute; bottom: 12px;
  font-family: 'Switzer', 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--muted);
}
/* the rate, face up — the card's whole message */
.zk-face-percent {
  font-family: 'Switzer', 'Poppins', sans-serif;
  font-weight: 300;
  font-size: clamp(30px, 8vw, 40px);
  letter-spacing: -0.02em;
  color: var(--dark);
}
.zk-face-tagline {
  position: absolute; bottom: 12px;
  font-family: 'Switzer', 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 8px;
  letter-spacing: 0.22em;
  color: var(--emerald);
  white-space: nowrap;
}

/* teal glow — ignites as the card turns */
.zk-card-glow {
  position: absolute; inset: -40%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46,216,168,0.28) 0%, transparent 62%);
  opacity: 0;
  transition: opacity 700ms cubic-bezier(.4,0,.2,1) ${TIMING.lift + 200}ms;
  pointer-events: none;
}
.zk-card.is-chosen .zk-card-glow { opacity: 1; }

/* ── prize ──────────────────────────────────────────────────── */
.zk-prize {
  position: relative; z-index: 4;
  margin: 168px auto 0;
  width: min(88vw, 368px);
  display: flex; flex-direction: column;
  gap: 10px;
  padding-bottom: 24px;
}
.zk-prize-lead {
  margin: 0 0 4px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--emerald);
  animation: zk-fade-only 500ms cubic-bezier(0,0,.2,1) 100ms both;
}
.zk-prize-row {
  display: flex; align-items: center; gap: 16px;
  padding: 16px;
  border: 1px solid var(--line);
  border-left: 2px solid var(--emerald);
  border-radius: 0;
  background: #ffffff;
  opacity: 0;
  animation: zk-prize-in ${TIMING.prizeDur}ms cubic-bezier(0,0,.2,1) both;
}
@keyframes zk-prize-in {
  from { opacity: 0; transform: translateY(14px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.zk-prize-percent {
  font-family: 'Switzer', 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 32px;
  color: var(--emerald);
  animation: zk-ignite 900ms cubic-bezier(.4,0,.2,1) both;
  animation-delay: inherit;
}
@keyframes zk-ignite {
  0%   { color: var(--muted); }
  55%  { color: var(--muted); }
  100% { color: var(--emerald); }
}
.zk-prize-body { display: flex; flex-direction: column; gap: 2px; text-align: left; }
.zk-prize-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.45;
  color: var(--dark);
}
.zk-prize-detail {
  font-size: 11px;
  line-height: 1.45;
  color: #5A5A5A;
}

/* ── CTA ────────────────────────────────────────────────────── */
.zk-cta-wrap {
  position: relative;
  margin-top: 16px;
  text-align: center;
  animation: zk-prize-in 500ms cubic-bezier(0,0,.2,1) both;
}
.zk-cta-wrap::before {
  content: '';
  position: absolute; inset: -32px -24px;
  background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(46,216,168,0.22) 0%, transparent 70%);
  opacity: 0;
  animation: zk-halo 1600ms cubic-bezier(.4,0,.2,1) 300ms;
  pointer-events: none;
}
@keyframes zk-halo {
  0%   { opacity: 0; }
  35%  { opacity: 1; }
  100% { opacity: 0; }
}
.zk-cta {
  display: block;
  padding: 16px 24px;
  border-radius: 999px;
  background: var(--teal);
  color: var(--dark);
  font-family: 'Switzer', 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: transform 150ms cubic-bezier(.4,0,.2,1), background-color 150ms;
}
.zk-cta:active { transform: scale(0.98); }
.zk-cta:hover { background-color: #1BAF86; }
.zk-cta:focus-visible { outline: 2px solid var(--emerald); outline-offset: 3px; }
.zk-cta-note {
  margin: 12px 0 0;
  font-size: 11px;
  color: var(--muted);
}
.zk-cta-tagline {
  margin: 16px 0 0;
  font-family: 'Switzer', 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: var(--muted);
}

/* ── no-JS fallback ─────────────────────────────────────────── */
.zk-noscript {
  position: relative; z-index: 3;
  width: min(86vw, 360px);
  margin: 32px auto 0;
  display: flex; flex-direction: column;
  gap: 12px;
  text-align: center;
}
.zk-noscript-line {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #5A5A5A;
}

/* ── footer ─────────────────────────────────────────────────── */
.zk-footer {
  position: relative; z-index: 3;
  padding: 0 24px 32px;
  text-align: center;
}
.zk-foot-line {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--muted);
  transition: opacity 400ms;
}
.zk-foot-line.is-out { opacity: 0; pointer-events: none; }

/* ── reduced motion — the ritual becomes a sequence of fades ── */
@media (prefers-reduced-motion: reduce) {
  .zk-card, .zk-card-float, .zk-brand, .zk-headline, .zk-sub, .zk-foot-line,
  .zk-face--back::after, .zk-cta-wrap::before, .zk-prize-percent { animation: none !important; }
  .zk-headline, .zk-sub, .zk-foot-line { transition: opacity 400ms ease !important; transform: none !important; }
  .zk-card { transition: opacity 400ms ease !important; }
  .zk-card-inner { transition: none !important; }
  .zk-card.is-chosen .zk-card-inner { transform: none; }
  .zk-face--front { transform: none; opacity: 0; transition: opacity 400ms ease 200ms; }
  .zk-card.is-chosen .zk-face--front { opacity: 1; }
  .zk-card.is-chosen .zk-face--back { opacity: 0; transition: opacity 400ms ease 200ms; }
  .zk-card-glow { transition: opacity 400ms ease 200ms !important; }
  .zk-prize-row { animation-name: zk-fade-only !important; }
  .zk-cta-wrap { animation-name: zk-fade-only !important; }
  .zk-page::after { transition: none !important; }
}

/* ── restored session (back-button return) — no replay ─────── */
.zk-page.is-restored *,
.zk-page.is-restored *::before,
.zk-page.is-restored *::after { animation: none !important; transition: none !important; }
.zk-page.is-restored .zk-prize-row,
.zk-page.is-restored .zk-cta-wrap { opacity: 1 !important; }

/* ── short screens ──────────────────────────────────────────── */
@media (max-height: 700px) {
  .zk-header { padding-top: 24px; }
  .zk-brand { margin-bottom: 12px; }
  .zk-card { top: 150px; }
  .zk-card.is-chosen { transform: translate(-50%, -116%) rotate(0deg) scale(0.72); }
  .zk-prize { margin-top: 116px; }
  .zk-stage { min-height: 420px; }
}

/* ── desktop ────────────────────────────────────────────────── */
@media (min-width: 768px) {
  .zk-header { padding-top: 36px; }
  .zk-headline { font-size: 44px; }
  .zk-card { width: 184px; top: 190px; }
  .zk-card.is-chosen { transform: translate(-50%, -86%) rotate(0deg) scale(0.68); }
  .zk-prize { width: 400px; margin-top: 196px; }
  .zk-footer { padding-bottom: 20px; }
}
`;
