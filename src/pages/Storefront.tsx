import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import { fetchProductByHandle } from "@/lib/shopify";

import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/hero-redlight-belt.webp";
import heroMat from "@/assets/hero-restore-mat.webp";
import edThreshold from "@/assets/editorial/threshold.webp";
import edBrandStory from "@/assets/editorial/morning-mug.webp";

/**
 * / — homepage. Ported from the Claude Design landing/home.html (proof-forward:
 * hero stat row, four-technologies resonance section, instruments grid,
 * protocols, founder note, live clock).
 *
 * Stripped per founder decision: fabricated Trustpilot rating + per-product
 * star ratings + named "verified" testimonials + unverified journal citations +
 * invented bundle prices removed (pre-launch, FTC). Founder note kept but
 * rewritten as the real founder (Miguel Young-On) with a truthful statement,
 * not the design's invented clinician backstory. Real prices via Shopify.
 */

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const PILL_ACTION =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#F69251] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#1A1714] transition-colors hover:bg-[#E87A38]";
const PILL_GHOST_DARK =
  "inline-flex items-center justify-center rounded-full border border-[rgba(247,244,240,0.28)] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#F7F4F0] transition-colors hover:border-[#2ED8A8] hover:text-[#2ED8A8]";

interface Instrument { slug: string; title: string; desc: string; price: number; handle: string; img: string; }
const INSTRUMENTS: Instrument[] = [
  { slug: "face-introducer", title: "The Face Introducer", desc: "Four modalities for face and neck, in a twelve-minute ritual.", price: 88, handle: "lifting-and-tightening-face-introducer", img: heroFace },
  { slug: "restoration-belt", title: "The Restoration Belt", desc: "660nm and 850nm light, pressed to the muscle by a thermal wrap.", price: 280, handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device", img: heroBelt },
  { slug: "restoration-mat", title: "The Restoration Mat", desc: "A full-body bed of 660nm red light and far-infrared heat. You lie down; the array works.", price: 220, handle: "household-red-light-charging-vibrating-red-light-therapy-mat", img: heroMat },
];

// Cosmetic LED carries NO mechanism/nm/clinic claim (modality-naming-standard.md);
// clinical wavelength claims are reserved for the Red Light products.
const MODALITIES: { n: string; verb: string; title: string; body: string; to: string | null }[] = [
  { n: "01", verb: "Lift", title: "EMS", body: "Pulsed electrical stimulation engages the facial muscle, training tone the way resistance trains the body.", to: "/technology/ems" },
  { n: "02", verb: "Contour", title: "Microcurrent", body: "Sub-sensory current mirrors the body's own bioelectric signal rather than overriding it.", to: "/technology/microcurrent" },
  { n: "03", verb: "Prime", title: "Thermal", body: "Gentle, even warmth opens the tissue and primes circulation so the modalities that follow reach deeper.", to: "/technology/thermal" },
  { n: "04", verb: "Renew", title: "Cosmetic LED", body: "A soft visible-light component that closes the session. Part of the daily ritual, calm on the skin.", to: null },
];

const PROTOCOLS = [
  { n: "01", title: "The Face Protocol", body: "The Face Introducer, calibrated to a twelve-minute daily arc. Where most begin.", note: "€88" },
  { n: "02", title: "The Recovery Protocol", body: "Face Introducer paired with the Restoration Belt. Skin and body, the same standard.", note: "See the sequence →" },
  { n: "03", title: "The Full System", body: "All three instruments, sequenced. Face, recovery and full-body restoration as one ritual.", note: "See the sequence →" },
];

export default function Storefront() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [clock, setClock] = useState("");

  useEffect(() => {
    let active = true;
    INSTRUMENTS.forEach((it) => {
      fetchProductByHandle(it.handle)
        .then((p) => {
          const amt = p?.variants?.edges?.[0]?.node?.price?.amount;
          const n = amt ? parseFloat(amt) : NaN;
          if (active && !isNaN(n)) setPrices((prev) => ({ ...prev, [it.slug]: Math.round(n) }));
        })
        .catch(() => {});
    });
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Europe/Amsterdam" });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => { active = false; clearInterval(id); };
  }, []);

  const priceOf = (it: Instrument) => prices[it.slug] ?? it.price;

  return (
    <PageShell
      title="Zential Pure — Clinic precision, daily ritual"
      description="Four clinic modalities — EMS, microcurrent, thermal and cosmetic LED — in one 12-minute instrument. Clinic precision, calibrated to a daily ritual. €88."
      canonical="https://zentialpure.com/"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={`relative z-[3] ${WRAP}`}>
          <div className="grid items-stretch md:grid-cols-[1.02fr_0.98fr] md:min-h-[660px]">
            <div className="flex flex-col justify-center py-12 md:py-[84px] md:pr-14">
              <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8]">
                <span className="inline-block h-px w-[26px] bg-current opacity-40" /> Resonance Restoration
              </p>
              <h1 className="my-[18px] mt-[22px] max-w-[13ch] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(40px,5.2vw,80px)]">
                The Body Remembers its&nbsp;Frequency
              </h1>
              <p className="mb-[34px] max-w-[46ch] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-[#F7F4F0]/[0.82]">
                Four clinic modalities <b className="font-medium text-[#F7F4F0]">EMS, microcurrent, thermal and cosmetic LED</b> in one twelve-minute instrument. <span className="font-sans font-semibold text-[#2ED8A8]">€88. Once.</span>
              </p>
              <div className="mb-[30px] flex flex-wrap border-y border-[rgba(247,244,240,0.10)]">
                {[
                  { v: <>4</>, l: "Clinic modalities" },
                  { v: <>€88 <s className="font-light text-[0.7em] text-[#F7F4F0]/[0.34]">€1,440/yr</s></>, l: "vs clinic, per year" },
                  { v: <>12 min</>, l: "Daily ritual" },
                ].map((s, i) => (
                  <div key={s.l} className={`min-w-[120px] flex-1 py-5 pr-6 ${i > 0 ? "border-l border-[rgba(247,244,240,0.10)] pl-6" : ""}`}>
                    <div className="font-sans text-[clamp(22px,2vw,28px)] font-medium leading-none tabular-nums tracking-[-0.01em] text-[#F7F4F0]">{s.v}</div>
                    <div className="mt-[9px] font-sans text-[10px] tracking-[0.2em] uppercase text-[#F7F4F0]/[0.46]">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3.5">
                <Link to="/instruments/face-introducer" className={PILL_ACTION}>Order Face Introducer · €{priceOf(INSTRUMENTS[0])}</Link>
                <Link to="/protocols" className={PILL_GHOST_DARK}>Find your protocol</Link>
              </div>
            </div>
            <div className="relative order-first min-h-[54vh] overflow-hidden bg-[#0d0b09] md:order-none md:min-h-[660px]">
              <img src={heroFace} alt="The Face Introducer held to the neck, cosmetic LED active" className="absolute inset-0 h-full w-full object-cover [object-position:62%_30%] [filter:saturate(0.96)_brightness(0.96)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#1A1714_0%,rgba(26,23,20,0.2)_26%,transparent_46%),linear-gradient(180deg,transparent_60%,rgba(26,23,20,0.45)_100%)]" />
              <div className="absolute bottom-6 left-6 z-[2] flex items-center gap-2.5 font-sans text-[10px] tracking-[0.26em] uppercase text-[#F7F4F0]/[0.72] before:block before:h-px before:w-[22px] before:bg-[#2ED8A8]">The Face Introducer · one instrument</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section className="border-b border-[rgba(247,244,240,0.10)] bg-[#070A0E] text-[#F7F4F0]">
        <div className={WRAP}>
          <div className="flex flex-wrap items-stretch">
            {[["30-Day", " Protocol Guarantee"], ["Free", " EU Shipping"], [null, "Ships from "], ["Secure", " checkout"]].map(([b, t], i) => (
              <div key={i} className={`flex min-w-[200px] flex-1 items-center gap-3 py-[22px] ${i > 0 ? "border-l border-[rgba(247,244,240,0.10)] pl-[34px]" : ""}`}>
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#2ED8A8]" />
                <span className="font-sans text-[12px] text-[#F7F4F0]/[0.74]">
                  {i === 2 ? <>Ships from <b className="font-medium text-[#F7F4F0]">Rotterdam</b></> : <><b className="font-medium text-[#F7F4F0]">{b}</b>{t}</>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR TECHNOLOGIES ── */}
      <section className="relative overflow-hidden bg-[#070A0E] py-[clamp(80px,11vw,128px)] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={`relative ${WRAP}`}>
          <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#C6A07C]"><span className="inline-block h-px w-[26px] bg-current opacity-40" /> Four Technologies</p>
          <div className="mb-3.5 mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[16ch] font-serif italic font-normal text-[clamp(30px,4vw,52px)] leading-[1.04] text-[#F7F4F0]">One instrument.<br />Four clinic technologies.</h2>
            <p className="max-w-[30ch] text-right font-sans text-[12px] leading-[1.6] text-[#F7F4F0]/50">Each modality resolves into a single twelve-minute arc <b className="font-medium text-[#2ED8A8]">Lift, Contour, Prime, Renew</b> in sequence.</p>
          </div>
          <svg className="mt-12 block h-10 w-full overflow-visible" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
            <line x1="0" y1="20" x2="1000" y2="20" stroke="rgba(247,244,240,0.12)" strokeWidth="1" />
            <path d="M0,20 L110,20 Q125,20 125,8 Q125,20 140,20 L360,20 Q375,20 375,32 Q375,20 390,20 L610,20 Q625,20 625,8 Q625,20 640,20 L860,20 Q875,20 875,32 Q875,20 890,20 L1000,20" stroke="#2ED8A8" strokeWidth="1.5" fill="none" style={{ filter: "drop-shadow(0 0 5px rgba(46,216,168,.55))" }} />
            {[125, 375, 625, 875].map((cx) => <circle key={cx} cx={cx} cy="20" r="5" fill="#2ED8A8" stroke="#2ED8A8" />)}
          </svg>
          <div className="grid gap-px border border-t-0 border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.10)] sm:grid-cols-2 lg:grid-cols-4">
            {MODALITIES.map((m) => (
              <div key={m.title} className="flex flex-col bg-[#070A0E] px-7 pb-[30px] pt-[34px]">
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-sans text-[11px] font-semibold tracking-[0.12em] tabular-nums text-[#2ED8A8]">{m.n}</span>
                  <span className="font-serif italic text-[13px] tracking-[0.02em] text-[#F7F4F0]/55">{m.verb}</span>
                </div>
                <h3 className="mb-3 font-serif italic font-normal text-[23px] tracking-[-0.01em] text-[#F7F4F0]">{m.title}</h3>
                <p className="mb-5 text-[13.5px] leading-[1.66] text-[#F7F4F0]/[0.62]">{m.body}</p>
                {m.to ? (
                  <Link to={m.to} className="group mt-auto block border-t border-[rgba(247,244,240,0.10)] pt-[18px]">
                    <span className="mb-1.5 block font-sans text-[9px] tracking-[0.26em] uppercase text-[#F7F4F0]/40">Mechanism</span>
                    <span className="flex items-baseline gap-1.5 text-[12px] text-[#F7F4F0]/70 transition-colors group-hover:text-[#2ED8A8]">Read the mechanism <span className="text-[#2ED8A8] transition-transform group-hover:translate-x-[3px]">→</span></span>
                  </Link>
                ) : (
                  <div className="mt-auto border-t border-[rgba(247,244,240,0.10)] pt-[18px]">
                    <span className="mb-1.5 block font-sans text-[9px] tracking-[0.26em] uppercase text-[#F7F4F0]/40">About</span>
                    <span className="text-[12px] text-[#F7F4F0]/55">No clinical claim · part of the ritual</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERLUDE ── */}
      <section className="bg-[#F7F4F0] py-[clamp(64px,9vw,108px)] text-[#1A1714]">
        <div className={`${WRAP} mx-auto max-w-[900px] text-center`}>
          <div className="mx-auto mb-[30px] h-px w-10 bg-[#C6A07C] opacity-70" />
          <p className="font-serif italic text-[clamp(26px,3.4vw,44px)] leading-[1.2] tracking-[-0.01em] text-[#1A1714]">Daily ritual is not aspirational.<br />It is <span className="text-[#157A5C]">operational.</span></p>
        </div>
      </section>

      {/* ── INSTRUMENTS ── */}
      <section className="bg-[#EDEAE6] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={WRAP}>
          <div className="mb-[50px] max-w-[30ch]">
            <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#C6A07C]"><span className="inline-block h-px w-[26px] bg-current opacity-40" /> The Instruments</p>
            <h2 className="mt-[18px] font-serif italic font-normal text-[clamp(30px,4vw,52px)] leading-[1.05] text-[#1A1714]">Instruments, not devices.</h2>
          </div>
          <div className="grid gap-px border border-[rgba(26,23,20,0.12)] bg-[rgba(26,23,20,0.12)] md:grid-cols-3">
            {INSTRUMENTS.map((p) => (
              <Link key={p.slug} to={`/instruments/${p.slug}`} className="group flex flex-col bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_60px_rgba(26,23,20,0.12)]">
                <div className="relative aspect-[5/4] overflow-hidden bg-[#EDEAE6]">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col border-t-2 border-transparent px-[26px] pb-7 pt-[26px] transition-colors group-hover:border-[#2ED8A8]">
                  <h3 className="mb-2.5 font-serif italic font-normal text-[25px] tracking-[-0.01em] text-[#1A1714]">{p.title}</h3>
                  <p className="mb-[18px] text-[13.5px] leading-[1.6] text-[#1A1714]/60">{p.desc}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[rgba(26,23,20,0.12)] pt-[18px]">
                    <span className="font-sans text-[18px] font-semibold tabular-nums text-[#1A1714]">€{priceOf(p)} <small className="ml-1.5 font-sans text-[11px] font-normal tracking-[0.16em] uppercase text-[#C6A07C]">once</small></span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.16em] uppercase text-[#157A5C]">View <span className="transition-transform group-hover:translate-x-1">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL DIVIDER ── */}
      <section className="relative flex min-h-[clamp(360px,46vw,520px)] items-center overflow-hidden bg-[#1A1714]">
        <img src={edThreshold} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,0.7)_0%,rgba(7,10,14,0.32)_50%,rgba(7,10,14,0.55)_100%)]" />
        <div className={`relative z-[2] ${WRAP}`}>
          <p className="max-w-[16ch] font-serif italic text-[clamp(26px,3.6vw,46px)] leading-[1.16] text-[#F7F4F0]">Built for the woman who left the clinic but kept the standard.</p>
          <div className="mt-[22px] font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/55">The Clinic Dropout</div>
        </div>
      </section>

      {/* ── PROTOCOLS ── */}
      <section className="bg-[#1A1714] py-[clamp(80px,11vw,128px)] text-[#F7F4F0]">
        <div className={WRAP}>
          <div className="mb-[46px] flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#C6A07C]"><span className="inline-block h-px w-[26px] bg-current opacity-40" /> Protocols</p>
              <h2 className="mt-[18px] max-w-[14ch] font-serif italic font-normal text-[clamp(30px,4vw,52px)] leading-[1.05] text-[#F7F4F0]">Three protocols. One system.</h2>
            </div>
            <p className="max-w-[22ch] text-right font-serif italic text-[clamp(18px,2vw,24px)] leading-[1.3] text-[#C6A07C]">Bundles are not discounts. They are sequences.</p>
          </div>
          <div className="grid gap-px border border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.10)] md:grid-cols-3">
            {PROTOCOLS.map((p) => (
              <Link key={p.n} to="/protocols" className="flex min-h-[300px] flex-col bg-[#1A1714] px-8 pb-[34px] pt-[38px] transition-colors hover:bg-[#211c18]">
                <div className="mb-auto font-serif italic text-[40px] leading-none text-[#2ED8A8]">{p.n}</div>
                <h3 className="mb-3 mt-[30px] font-sans text-[13px] font-medium tracking-[0.16em] uppercase text-[#F7F4F0]">{p.title}</h3>
                <p className="mb-[18px] text-[13.5px] leading-[1.65] text-[#F7F4F0]/60">{p.body}</p>
                <span className="font-sans text-[15px] font-semibold tabular-nums text-[#F7F4F0]">{p.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER (real) ── */}
      <section className="bg-[#F7F4F0] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={WRAP}>
          <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#C6A07C]"><span className="inline-block h-px w-[26px] bg-current opacity-40" /> The Standard, Made Human</p>
          <div className="mt-9 grid items-start gap-7 sm:grid-cols-[130px_1fr] md:max-w-[680px]">
            <div className="aspect-[3/4] w-[130px] overflow-hidden rounded-[14px] bg-[#EDEAE6]">
              <img src={edBrandStory} alt="Zential Pure, Rotterdam" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="mb-4 font-sans text-[10px] tracking-[0.26em] uppercase text-[#6B5A4A]">From the founder</p>
              <p className="font-serif italic text-[19px] leading-[1.5] tracking-[-0.01em] text-[#1A1714]">Zential Pure started with one question: why does clinic-grade skin technology stay locked behind standing appointments and €120 sessions?</p>
              <p className="mt-3.5 font-serif italic text-[17px] leading-[1.5] text-[#1A1714]">So I built the instrument I wanted on my own counter — clinic precision, calibrated to a daily ritual you actually keep.</p>
              <div className="mt-5 flex items-baseline gap-2.5">
                <span className="font-serif italic text-[18px] text-[#1A1714]">Miguel Young-On</span>
                <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#6B5A4A]">Founder · Rotterdam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING + LIVE CLOCK ── */}
      <section className="relative overflow-hidden bg-[#070A0E] py-[clamp(80px,11vw,140px)] text-center text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={`relative ${WRAP}`}>
          <div className="mb-[34px] inline-flex items-center gap-3 rounded-full border border-[rgba(247,244,240,0.10)] bg-[#2ED8A8]/5 px-5 py-[11px]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#2ED8A8]" />
            <span className="font-sans text-[13px] font-medium tracking-[0.14em] tabular-nums text-[#2ED8A8]">{clock || "--:--:--"}</span>
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#F7F4F0]/50">· CET · live</span>
          </div>
          <h2 className="mx-auto mb-[34px] max-w-[18ch] font-serif italic font-normal text-[clamp(34px,5vw,68px)] leading-[1.08] tracking-[-0.015em] text-[#F7F4F0]">Clinic precision,<br />daily ritual.</h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/instruments/face-introducer" className={PILL_ACTION}>Order Face Introducer · €{priceOf(INSTRUMENTS[0])}</Link>
            <Link to="/protocols" className={PILL_GHOST_DARK}>Find your protocol</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
