import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import { fetchProductByHandle } from "@/lib/shopify";

import heroBelt from "@/assets/hero-redlight-belt.webp";
import heroFace from "@/assets/hero-neck-device.webp";
import heroMat from "@/assets/hero-restore-mat.webp";
import edWalkStone from "@/assets/editorial/walk-stone.webp";
import edThreshold from "@/assets/editorial/threshold.webp";

/**
 * /storefront — preview of the Claude Design storefront homepage
 * (ui_kits/storefront/Home.jsx), ported to the real stack: shared PageShell
 * chrome, real prices (live Shopify, config fallback), real links to the
 * /instruments editorial PDPs. Lives alongside the current / homepage for
 * side-by-side comparison before any swap.
 */

const WRAP = "mx-auto max-w-[1280px] px-6 md:px-14";

interface Instrument {
  id: string;
  slug: string;
  num: string;
  title: string;
  card: string;
  price: number;
  handle: string;
  img: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    id: "face-introducer",
    slug: "face-introducer",
    num: "01",
    title: "Face Introducer",
    card: "EMS, microcurrent, thermal and cosmetic LED in a twelve-minute ritual for face and neck.",
    price: 88,
    handle: "lifting-and-tightening-face-introducer",
    img: heroFace,
  },
  {
    id: "restoration-belt",
    slug: "restoration-belt",
    num: "02",
    title: "Restoration Belt",
    card: "660nm red and 850nm near-infrared light, pressed to the muscle by a thermal wrap. Worn close.",
    price: 280,
    handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
    img: heroBelt,
  },
  {
    id: "restoration-mat",
    slug: "restoration-mat",
    num: "03",
    title: "Restoration Mat",
    card: "660nm red light and far-infrared heat, full-body. You lie down, the array does the rest. Twenty minutes.",
    price: 220,
    handle: "household-red-light-charging-vibrating-red-light-therapy-mat",
    img: heroMat,
  },
];

const TECH = [
  { n: "01", t: "Microcurrent", d: "Sub-sensory current that stimulates ATP and tones facial muscle.", tag: "Lift" },
  { n: "02", t: "EMS", d: "Electrical muscle stimulation for deeper contour training.", tag: "Contour" },
  { n: "03", t: "Thermal", d: "Controlled warmth that primes tissue and supports absorption.", tag: "Prime" },
  { n: "04", t: "Cosmetic LED", d: "630–660nm light to support the skin's renewal cycle.", tag: "Renew" },
];

const PROTOCOLS = [
  { num: "01", title: "Lift", mods: "Microcurrent · EMS", devices: 2, min: 12, dark: true },
  { num: "02", title: "Restore", mods: "Thermal · Cosmetic LED", devices: 2, min: 10, dark: false },
  { num: "03", title: "Renew", mods: "All four modalities", devices: 3, min: 18, gold: true },
];

function Eyebrow({ num, children, tone = "meta" }: { num?: number; children: string; tone?: "meta" | "brand" | "dark" }) {
  const color = tone === "dark" ? "text-[#2ED8A8]" : tone === "brand" ? "text-[#157A5C]" : "text-[#6B5A4A]";
  return (
    <p className={`inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.26em] uppercase ${color}`}>
      {num != null && <span className="tabular-nums opacity-55">( {String(num).padStart(2, "0")} )</span>}
      <span className="inline-block h-px w-[24px] bg-current opacity-40" />
      {children}
    </p>
  );
}

const BADGE_TONE: Record<string, string> = {
  teal: "text-[#157A5C] border-[#2ED8A8]/40",
  gold: "text-[#9A7B57] border-[#C6A07C]/50",
};

export default function Storefront() {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    INSTRUMENTS.forEach((it) => {
      fetchProductByHandle(it.handle)
        .then((p) => {
          const amt = p?.variants?.edges?.[0]?.node?.price?.amount;
          const n = amt ? parseFloat(amt) : NaN;
          if (active && !isNaN(n)) setPrices((prev) => ({ ...prev, [it.id]: Math.round(n) }));
        })
        .catch(() => {});
    });
    return () => { active = false; };
  }, []);

  const priceOf = (it: Instrument) => prices[it.id] ?? it.price;

  return (
    <PageShell
      title="Zential Pure — The Storefront"
      description="Clinic precision, daily ritual. Four-modality at-home instruments calibrated to clinic protocols."
      canonical="https://zentialpure.com/storefront"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="grid items-stretch overflow-hidden md:grid-cols-2 md:min-h-[620px] bg-[linear-gradient(165deg,#F1F5F3_0%,#F7F4F0_48%,#E9F3EE_100%)]">
        <div className="flex flex-col justify-center px-6 py-14 md:px-14">
          <Eyebrow tone="brand">Resonance Restoration</Eyebrow>
          <h1 className="mb-[26px] mt-6 font-serif italic font-normal tracking-[-0.02em] leading-[1.03] text-[#1A1714] text-[clamp(40px,4.4vw,68px)]">
            The Body<br />Remembers<br /><span className="text-[#157A5C]">its Frequency.</span>
          </h1>
          <p className="mb-[30px] max-w-[440px] text-[15px] leading-[1.7] text-[#1A1714]/[0.66]">
            A four-modality at-home instrument calibrated to clinic protocols. EMS, Microcurrent, Thermal and Cosmetic LED in a single 12-minute ritual.
          </p>
          <div className="mb-[30px] grid max-w-[500px] grid-cols-3 border-y border-[rgba(26,23,20,0.12)]">
            {[
              { n: "4", l: "Clinical\nmodalities" },
              { n: "€88", l: "vs €1,440 / yr\nclinic average" },
              { n: "30 days", l: "Protocol\nguarantee" },
            ].map((r, i) => (
              <div key={r.l} className={`px-1 py-4 ${i < 2 ? "border-r border-[rgba(26,23,20,0.12)]" : ""}`}>
                <div className="mb-[7px] font-serif italic text-[32px] leading-none tracking-[-0.01em] text-[#157A5C]">{r.n}</div>
                <div className="whitespace-pre-line font-sans text-[10px] leading-[1.5] tracking-[0.22em] uppercase text-[#1A1714]/50">{r.l}</div>
              </div>
            ))}
          </div>
          <div className="mb-[22px] flex max-w-[460px] flex-col gap-3 sm:flex-row">
            <Link to="/instruments/face-introducer" className="flex-1 inline-flex items-center justify-center bg-[#F69251] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#1A1714] transition-colors hover:bg-[#E87A38]">
              Order Face Introducer · €{priceOf(INSTRUMENTS[0])}
            </Link>
            <Link to="/quiz" className="flex-1 inline-flex items-center justify-center border border-[rgba(26,23,20,0.28)] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#1A1714] transition-colors hover:border-[#157A5C] hover:text-[#157A5C]">
              Find Your Protocol
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Free EU shipping", "30-Day Protocol Guarantee", "Ships from Rotterdam"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 font-sans text-[11px] text-[#1A1714]/50">
                <span className="h-[5px] w-[5px] rounded-full bg-[#2ED8A8]" />{t}
              </span>
            ))}
          </div>
        </div>
        <div className="relative order-first min-h-[44vh] overflow-hidden md:order-none">
          <img src={heroBelt} alt="Red light restoration ritual" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#F7F4F0_0%,transparent_14%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_55%,rgba(46,216,168,0.14)_100%)]" />
          <div className="absolute bottom-7 left-7 font-sans text-[9px] tracking-[0.25em] uppercase text-white/75">Campaign I · Resonance Series</div>
        </div>
      </section>

      {/* ── TECH CARDS ── */}
      <section className="bg-[#F7F4F0] py-24">
        <div className={WRAP}>
          <Eyebrow num={1}>Four technologies</Eyebrow>
          <h2 className="mb-12 mt-3.5 font-serif italic font-normal text-[40px] tracking-[-0.01em] text-[#1A1714]">One instrument.</h2>
          <div className="grid gap-px border border-[rgba(26,23,20,0.12)] bg-[rgba(26,23,20,0.12)] sm:grid-cols-2 lg:grid-cols-4">
            {TECH.map((m) => (
              <div key={m.t} className="flex min-h-[220px] flex-col justify-between bg-[#F7F4F0] px-[26px] py-8">
                <div className="font-sans text-[11px] tracking-[0.2em] text-[#6B5A4A]">{m.n}</div>
                <div>
                  <span className="mb-3.5 inline-flex items-center rounded-full border border-[#2ED8A8]/40 px-3 py-1 font-sans text-[10px] tracking-[0.14em] uppercase text-[#157A5C]">{m.tag}</span>
                  <h3 className="mb-2.5 font-serif italic font-normal text-[26px] text-[#1A1714]">{m.t}</h3>
                  <p className="text-[13px] leading-[1.6] text-[#888480]">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUMENTS ── */}
      <section id="devices" className="bg-[#1A1714] py-28">
        <div className={WRAP}>
          <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-4">
            <Eyebrow num={2} tone="dark">The Instruments</Eyebrow>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F7F4F0]/40">Three instruments · one system</span>
          </div>
          <h2 className="mb-14 font-serif italic font-normal text-[clamp(36px,4.4vw,58px)] leading-[1.04] tracking-[-0.02em] text-[#F7F4F0]">
            Instruments, not devices.
          </h2>
          <div className="grid gap-px border border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.10)] md:grid-cols-3">
            {INSTRUMENTS.map((p) => (
              <Link key={p.id} to={`/instruments/${p.slug}`} className="group flex flex-col bg-[#1A1714] transition-colors duration-300 hover:bg-[#1f1b17]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover [filter:saturate(0.94)_brightness(0.92)] transition-transform duration-[600ms] group-hover:scale-[1.05]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(26,23,20,0.6)_100%)]" />
                  <span className="absolute left-[18px] top-4 font-sans text-[9px] tracking-[0.28em] uppercase text-[#F7F4F0]/70">Protocol {p.num}</span>
                </div>
                <div className="flex flex-1 flex-col px-[26px] pb-[30px] pt-7">
                  <h3 className="mb-3 font-serif italic font-normal text-[28px] tracking-[-0.01em] text-[#F7F4F0]">{p.title}</h3>
                  <p className="mb-[22px] text-[13px] leading-[1.65] text-[#F7F4F0]/60">{p.card}</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[rgba(247,244,240,0.10)] pt-[18px]">
                    <span className="font-serif italic text-[24px] text-[#F7F4F0]">€{priceOf(p)} <span className="text-[13px] text-[#C6A07C]">once</span></span>
                    <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#2ED8A8]">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="relative h-[360px] overflow-hidden">
        <img src={edWalkStone} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(26,23,20,0.32)]" />
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <p className="max-w-[760px] text-center font-serif italic font-normal text-[clamp(24px,3vw,38px)] leading-[1.25] text-[#F7F4F0]">
            Built for the woman who left the clinic but kept the standard.
          </p>
        </div>
      </section>

      {/* ── PROTOCOLS ── */}
      <section className="bg-[#EDEAE6] py-28">
        <div className={WRAP}>
          <div className="mb-14 flex items-baseline justify-between">
            <Eyebrow num={1}>Protocols</Eyebrow>
            <Link to="/protocols" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1A1714] hover:text-[#157A5C]">See all →</Link>
          </div>
          <h2 className="mb-4 font-serif italic font-normal text-[clamp(48px,7vw,96px)] leading-[0.95] text-[#1A1714]">
            Three Protocols.<br /><span className="text-[#1A1714]/40">One system.</span>
          </h2>
          <p className="mb-16 max-w-[480px] text-[16px] text-[#1A1714]/70">
            Bundles are not discounts. They are sequences. Each Protocol ships with a printed Protocol Card.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {PROTOCOLS.map((c) => {
              const bg = c.dark ? "bg-[#1A1714]" : c.gold ? "bg-[#C6A07C]" : "bg-[#F7F4F0]";
              const head = c.dark ? "text-[#2ED8A8]" : "text-[#1A1714]";
              const meta = c.dark ? "text-[#F7F4F0]/55" : "text-[#6B5A4A]";
              const body = c.dark ? "text-[#F7F4F0]" : "text-[#1A1714]";
              const rule = c.dark ? "bg-[rgba(247,244,240,0.15)]" : "bg-[rgba(26,23,20,0.15)]";
              return (
                <Link key={c.title} to="/protocols" className={`flex min-h-[360px] flex-col justify-between p-9 ${bg} transition-transform duration-300 hover:-translate-y-[3px]`}>
                  <div className="flex justify-between">
                    <span className={`font-sans text-[10px] tracking-[0.2em] uppercase ${meta}`}>Protocol ( {c.num} )</span>
                    <span className={`font-sans text-[10px] tracking-[0.16em] tabular-nums ${head}`}>{c.min} min</span>
                  </div>
                  <div>
                    <h3 className={`mb-6 font-serif italic font-normal text-[64px] leading-none ${head}`}>{c.title}.</h3>
                    <div className={`mb-[22px] h-px ${rule}`} />
                    <p className={`mb-1.5 text-[13px] ${body}`}>{c.mods}</p>
                    <p className={`font-sans text-[12px] ${meta}`}>{c.devices} instruments · See protocol →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="relative h-[360px] overflow-hidden">
        <img src={edThreshold} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(26,23,20,0.32)]" />
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <p className="max-w-[760px] text-center font-serif italic font-normal text-[clamp(24px,3vw,38px)] leading-[1.25] text-[#F7F4F0]">
            Daily ritual is not aspirational. It is operational.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
