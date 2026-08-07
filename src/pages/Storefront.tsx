import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { SEO } from "@/components/SEO";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { FI_MODALITY_COUNT, FI_SESSION_MINUTES } from "@/data/instrumentFacts";

import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/storefront-belt-woman.png";
import heroMat from "@/assets/hero-restore-mat.webp";
import edBrandStory from "@/assets/editorial/morning-mug.webp";

import covenHero from "@/assets/coven/hero-fi-landscape.webp";
import covenPortrait from "@/assets/coven/hero-fi-portrait.webp";
import covenStill from "@/assets/coven/collection-still.webp";
import covenTexture from "@/assets/coven/texture-green.webp";
import covenBelt from "@/assets/coven/belt-bright.webp";

/**
 * / — homepage, Coven restyle (2026-08-07). Case-study grammar borrowed from
 * alexcoven.com/work/spritzi: white canvas, single grotesque family (Switzer),
 * small uppercase meta labels, colour delivered by bright high-key imagery on
 * green gradients, generous stacked media. All customer-facing copy carried
 * over VERBATIM from the previous Storefront (compliance-cleared set); only
 * presentation changed. Prices stay live via Shopify @inContext — same
 * fetch-and-hold-empty rule as before (no seeded EUR for US visitors).
 */

const WRAP = "mx-auto max-w-[1240px] px-6 md:px-10";
const LABEL = "font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]";
const EMERALD = "#0E7A54";
const PILL_ACTION =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86]";
const PILL_GHOST =
  "inline-flex items-center justify-center rounded-full border border-[rgba(20,20,20,0.22)] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:border-[#0E7A54] hover:text-[#0E7A54]";

interface Instrument { slug: string; title: string; desc: string; price: number; handle: string; img: string; }
const INSTRUMENTS: Instrument[] = [
  { slug: "face-introducer", title: "The Face Introducer", desc: "Three modalities for face and neck, in a twelve-minute ritual.", price: 88, handle: "lifting-and-tightening-face-introducer", img: heroFace },
  { slug: "restoration-belt", title: "The Restoration Belt", desc: "660nm and 850nm light, pressed to the muscle by a thermal wrap.", price: 180, handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device", img: heroBelt },
  { slug: "restoration-mat", title: "The Restoration Mat", desc: "A 100 × 40 cm bed of 660nm red light and far-infrared heat — 120 × 40 cm in the longer size. You lie down; the array works.", price: 200, handle: "the-restoration-mat", img: heroMat },
];

// FI modalities are EMS, microcurrent and thermal only. The device's LED is a mode
// indicator, not a treatment modality (operator-verified on the physical device 2026-07-27).
// Never name LED/light therapy as an FI modality (modality-naming-standard.md);
// clinical wavelength claims are reserved for the Red Light products.
const MODALITIES: { n: string; verb: string; title: string; body: string; to: string | null }[] = [
  { n: "01", verb: "Lift", title: "EMS", body: "Pulsed electrical stimulation engages the facial muscle, training tone the way resistance trains the body.", to: "/technology/ems" },
  { n: "02", verb: "Contour", title: "Microcurrent", body: "Sub-sensory current mirrors the body's own bioelectric signal rather than overriding it.", to: "/technology/microcurrent" },
  { n: "03", verb: "Prime", title: "Thermal", body: "Gentle, even warmth opens the tissue and primes circulation so the modalities that follow reach deeper.", to: "/technology/thermal" },
];

const CLOCK_FMT = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Europe/Amsterdam" });

const PROTOCOLS = [
  { n: "01", title: "The Face Protocol", body: "The Face Introducer, calibrated to a twelve-minute daily arc. Where most begin.", note: "€88" },
  { n: "02", title: "The Recovery Protocol", body: "Face Introducer paired with the Restoration Belt. Skin and body, the same standard.", note: "See the sequence →" },
  { n: "03", title: "The Full System", body: "All three instruments, sequenced. Face, targeted recovery and wide-field restoration as one ritual.", note: "See the sequence →" },
];

export default function Storefront() {
  // Market-aware formatted price string per instrument. Held empty until the
  // live Shopify (@inContext) price resolves so a US visitor never sees a euro
  // symbol on an amount that is actually USD — the placeholder shows instead.
  // Do NOT seed this with the EUR list price: market.ts serves USD to the US,
  // so a seed renders €88 to a US visitor, permanently if the fetch fails.
  const [prices, setPrices] = useState<Record<string, string>>({});
  // Seeded with the real time so the badge never paints "--:--:--".
  const [clock, setClock] = useState(() => CLOCK_FMT.format(new Date()));

  useEffect(() => {
    let active = true;
    INSTRUMENTS.forEach((it) => {
      const load = (attempt: number) => {
        fetchProductByHandle(it.handle)
          .then((p) => {
            const priceObj = p?.variants?.edges?.[0]?.node?.price;
            const n = priceObj?.amount ? parseFloat(priceObj.amount) : NaN;
            if (active && !isNaN(n)) {
              setPrices((prev) => ({ ...prev, [it.slug]: formatMoney(Math.round(n), priceObj!.currencyCode) }));
            } else if (active && isNaN(n) && attempt === 0) {
              load(1);
            }
          })
          .catch(() => { if (active && attempt === 0) load(1); });
      };
      load(0);
    });
    const id = setInterval(() => setClock(CLOCK_FMT.format(new Date())), 1000);
    return () => { active = false; clearInterval(id); };
  }, []);

  // Formatted, market-correct price once resolved; null until then. Callers
  // must omit the whole price segment while null — a CTA never renders a
  // dangling "· —" or any other empty price token.
  const priceOf = (it: Instrument): string | null => prices[it.slug] ?? null;

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <SEO
        title="Zential Pure — Clinic precision, daily ritual"
        description="Three clinic modalities — EMS, microcurrent and thermal — in one 12-minute instrument. Clinic precision, calibrated to a daily ritual. €88."
        canonicalUrl="https://zentialpure.com/"
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* ── HERO — statement + case-study meta row ── */}
        <section className="bg-white">
          <div className={`${WRAP} pt-[clamp(56px,9vw,120px)] pb-[clamp(40px,6vw,72px)]`}>
            <p className={LABEL}>Zential Pure · Resonance Restoration</p>
            <h1 className="mt-6 max-w-[15ch] font-sans font-light text-[clamp(44px,6.4vw,92px)] leading-[0.98] tracking-[-0.03em] text-[#141414]">
              The Body Remembers its Frequency
            </h1>
            <div className="mt-[clamp(36px,5vw,64px)] grid gap-8 border-t border-[rgba(20,20,20,0.10)] pt-8 md:grid-cols-[1fr_1fr_1.6fr]">
              <div>
                <p className={LABEL}>Brand</p>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-[#141414]">Zential Pure · Rotterdam</p>
              </div>
              <div>
                <p className={LABEL}>System</p>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-[#141414]">{FI_MODALITY_COUNT} clinic modalities · {FI_SESSION_MINUTES}-minute ritual</p>
              </div>
              <div>
                <p className={LABEL}>Description</p>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.6] text-[#5A5A5A]">
                  Three clinic modalities <b className="font-medium text-[#141414]">EMS, microcurrent and thermal</b> in a twelve-minute ritual. <span className="font-semibold" style={{ color: EMERALD }}>€88. Once.</span>
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <Link to="/instruments/face-introducer" className={PILL_ACTION}>Order Face Introducer{priceOf(INSTRUMENTS[0]) && <> · {priceOf(INSTRUMENTS[0])}</>}</Link>
                  <Link to="/protocols" className="font-sans text-[12px] tracking-[0.22em] uppercase transition-colors hover:text-[#1BAF86]" style={{ color: EMERALD }}>Find your protocol</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Full-bleed hero still */}
          <div className="relative overflow-hidden">
            <img
              src={covenHero}
              alt="The Face Introducer standing on a reflective table against a green studio gradient"
              className="h-[clamp(340px,58vw,720px)] w-full object-cover"
              fetchPriority="high"
            />
            <Link
              to="/editorial/the-ritual"
              className="absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-[#141414] backdrop-blur transition-colors hover:bg-white"
            >
              Featured · The 12-Minute Window
            </Link>
          </div>
        </section>

        {/* ── TRUST LINE — single hairline row ── */}
        <section className="border-b border-[rgba(20,20,20,0.10)] bg-white">
          <div className={WRAP}>
            <div className="flex flex-wrap items-stretch">
              {[["30-Day", " Money-Back Guarantee"], ["Free", " EU Shipping"], ["Tracked", " shipping"], ["Secure", " checkout"]].map(([b, t], i) => (
                <div key={i} className={`flex min-w-[180px] flex-1 items-center gap-3 py-5 ${i > 0 ? "border-l border-[rgba(20,20,20,0.10)] pl-8" : ""}`}>
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#2ED8A8]" />
                  <span className="font-sans text-[12px] text-[#5A5A5A]">
                    <b className="font-medium text-[#141414]">{b}</b>{t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THREE TECHNOLOGIES — numbered hairline rows ── */}
        <section className="bg-white py-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={LABEL}>Three Technologies</p>
                <h2 className="mt-5 max-w-[18ch] font-sans font-light text-[clamp(30px,4vw,54px)] leading-[1.04] tracking-[-0.025em] text-[#141414]">One instrument. Three clinic technologies.</h2>
              </div>
              <p className="max-w-[30ch] text-right font-sans text-[13px] leading-[1.6] text-[#8E8E8E]">Each modality resolves into a single twelve-minute arc <b className="font-medium" style={{ color: EMERALD }}>Lift, Contour, Prime</b> in sequence.</p>
            </div>
            <div className="border-t border-[rgba(20,20,20,0.10)]">
              {MODALITIES.map((m) => (
                <Link
                  key={m.title}
                  to={m.to ?? "/science"}
                  className="group grid items-baseline gap-3 border-b border-[rgba(20,20,20,0.10)] py-7 transition-colors hover:bg-[#F4FBF8] md:grid-cols-[72px_120px_1fr_auto] md:gap-8 md:px-4"
                >
                  <span className="font-sans text-[13px] font-semibold tabular-nums" style={{ color: EMERALD }}>{m.n}</span>
                  <span className="font-sans text-[13px] tracking-[0.12em] uppercase text-[#8E8E8E]">{m.verb}</span>
                  <div>
                    <h3 className="font-sans text-[clamp(20px,2.2vw,28px)] font-normal tracking-[-0.02em] text-[#141414]">{m.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.66] text-[#5A5A5A]">{m.body}</p>
                  </div>
                  <span className="hidden font-sans text-[12px] tracking-[0.16em] uppercase text-[#8E8E8E] transition-colors group-hover:text-[#0E7A54] md:block">
                    Read the mechanism <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── STACKED MEDIA — case-study pair ── */}
        <section className="bg-white pb-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <div className="grid gap-5 md:grid-cols-[1fr_1.1fr] md:gap-6">
              <figure>
                <div className="overflow-hidden">
                  <img src={covenPortrait} alt="The Face Introducer floating between eucalyptus sprigs and suspended water droplets" className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                </div>
                <figcaption className={`mt-3.5 ${LABEL}`}>The Face Introducer · Studio still</figcaption>
              </figure>
              <figure className="md:mt-[clamp(48px,7vw,110px)]">
                <div className="overflow-hidden">
                  <img src={covenStill} alt="The Face Introducer beside a sparkling glass of iced water with a green leaf" className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                </div>
                <figcaption className={`mt-3.5 ${LABEL}`}>Twelve minutes · Once a day</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── INSTRUMENTS ── */}
        <section className="bg-white pb-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <div className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-6 border-t border-[rgba(20,20,20,0.10)] pt-10">
              <div>
                <p className={LABEL}>The Instruments</p>
                <h2 className="mt-5 font-sans font-light text-[clamp(30px,4vw,54px)] leading-[1.05] tracking-[-0.025em] text-[#141414]">Instruments, not devices.</h2>
              </div>
              <Link to="/instruments" className="font-sans text-[12px] tracking-[0.2em] uppercase transition-colors hover:text-[#1BAF86]" style={{ color: EMERALD }}>All instruments →</Link>
            </div>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
              {INSTRUMENTS.map((p) => (
                <Link key={p.slug} to={`/instruments/${p.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F2F4F3]">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-1 flex-col pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-sans text-[19px] font-medium tracking-[-0.015em] text-[#141414]">{p.title}</h3>
                      <span className="font-sans text-[15px] font-semibold tabular-nums text-[#141414]">{priceOf(p)}</span>
                    </div>
                    <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[#5A5A5A]">{p.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.18em] uppercase transition-colors group-hover:text-[#1BAF86]" style={{ color: EMERALD }}>
                      View <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEXTURE INTERLUDE — full-bleed, statement over image ── */}
        <section className="relative flex min-h-[clamp(300px,42vw,520px)] items-center overflow-hidden">
          <img src={covenTexture} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,40,28,0.45),rgba(6,40,28,0.05))]" />
          <div className={`relative z-[2] ${WRAP}`}>
            <p className="max-w-[18ch] font-sans font-light text-[clamp(28px,4.2vw,56px)] leading-[1.08] tracking-[-0.025em] text-white">
              Daily ritual is not aspirational. It is operational.
            </p>
          </div>
        </section>

        {/* ── RESTORATION — belt still + copy ── */}
        <section className="bg-white py-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <div className="grid items-end gap-10 md:grid-cols-[1fr_320px]">
              <figure className="overflow-hidden">
                <img src={covenBelt} alt="The Restoration Belt glowing red on a pale-green reflective studio surface" className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
              </figure>
              <div className="pb-2">
                <p className={LABEL}>Restoration</p>
                <h2 className="mt-4 font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.02em] text-[#141414]">Skin and body, the same standard.</h2>
                <p className="mt-4 text-[14px] leading-[1.66] text-[#5A5A5A]">660nm and 850nm light, pressed to the muscle by a thermal wrap.</p>
                <Link to="/instruments/restoration-belt" className="mt-6 inline-flex items-center gap-1.5 font-sans text-[12px] tracking-[0.18em] uppercase transition-colors hover:text-[#1BAF86]" style={{ color: EMERALD }}>
                  The Restoration Belt <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROTOCOLS — three minimal columns ── */}
        <section className="bg-[#F4FBF8] py-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <div className="mb-[clamp(36px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={LABEL}>Protocols</p>
                <h2 className="mt-5 max-w-[16ch] font-sans font-light text-[clamp(30px,4vw,54px)] leading-[1.05] tracking-[-0.025em] text-[#141414]">Three protocols. One system.</h2>
              </div>
              <p className="max-w-[24ch] text-right font-sans text-[14px] leading-[1.5] text-[#8E8E8E]">Bundles are not discounts. They are sequences.</p>
            </div>
            <div className="grid gap-px border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.10)] md:grid-cols-3">
              {PROTOCOLS.map((p) => (
                <Link key={p.n} to="/protocols" className="flex min-h-[240px] flex-col bg-white px-8 pb-8 pt-9 transition-colors hover:bg-[#FCFEFD]">
                  <div className="font-sans text-[15px] font-semibold tabular-nums" style={{ color: EMERALD }}>{p.n}</div>
                  <h3 className="mb-3 mt-8 font-sans text-[17px] font-medium tracking-[-0.01em] text-[#141414]">{p.title}</h3>
                  <p className="mb-5 text-[13.5px] leading-[1.65] text-[#5A5A5A]">{p.body}</p>
                  <span className="mt-auto font-sans text-[14px] font-semibold tabular-nums text-[#141414]">{p.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUNDER (real) ── */}
        <section className="bg-white py-[clamp(72px,10vw,120px)]">
          <div className={WRAP}>
            <p className={LABEL}>The Standard, Made Human</p>
            <div className="mt-9 grid items-start gap-7 sm:grid-cols-[130px_1fr] md:max-w-[680px]">
              <div className="aspect-[3/4] w-[130px] overflow-hidden bg-[#F2F4F3]">
                <img src={edBrandStory} alt="Zential Pure, Rotterdam" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className={`mb-4 ${LABEL}`}>Why we exist</p>
                <p className="text-[17px] leading-[1.6] tracking-[-0.01em] text-[#141414]">Zential Pure started with one question: why does clinic-grade skin technology stay locked behind standing appointments and €120 sessions?</p>
                {/* No "designed/specified/calibrated in Rotterdam" — see
                    LIVE-CATALOG-TRUTH.md:146-148. We select and standardise
                    instruments; we do not engineer or manufacture them. */}
                <p className="mt-3.5 text-[15px] leading-[1.6] text-[#5A5A5A]">So we put the instrument we wanted on our own counter — chosen against a clinic standard, tuned to a daily ritual you actually keep.</p>
                {/* Signed by name from 2026-08-01 on the operator's instruction, reversing the
                    2026-07-11 brand-only signature decision. "Miguel" is a signature; the legal
                    identity (M.G. Young-On, KvK, BTW) lives in the footer and entity.html and
                    the two are not interchangeable. */}
                <div className="mt-5 flex items-baseline gap-2.5">
                  <span className="font-sans text-[16px] font-medium text-[#141414]">Miguel</span>
                  <span className={LABEL}>Founder, Zential Pure · Rotterdam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING + LIVE CLOCK ── */}
        <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(80px,11vw,140px)] text-center">
          <div className={WRAP}>
            <div className="mb-[34px] inline-flex items-center gap-3 rounded-full border border-[rgba(20,20,20,0.12)] px-5 py-[11px]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#2ED8A8]" />
              <span className="font-sans text-[13px] font-medium tracking-[0.14em] tabular-nums" style={{ color: EMERALD }}>{clock}</span>
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#8E8E8E]">· CET · live</span>
            </div>
            <h2 className="mx-auto mb-[34px] max-w-[16ch] font-sans font-light text-[clamp(36px,5.4vw,76px)] leading-[1.02] tracking-[-0.03em] text-[#141414]">Clinic precision, daily ritual.</h2>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link to="/instruments/face-introducer" className={PILL_ACTION}>Order Face Introducer{priceOf(INSTRUMENTS[0]) && <> · {priceOf(INSTRUMENTS[0])}</>}</Link>
              <Link to="/protocols" className={PILL_GHOST}>Find your protocol</Link>
            </div>
          </div>
        </section>
      </main>
      <SparseFooter />
    </div>
  );
}
