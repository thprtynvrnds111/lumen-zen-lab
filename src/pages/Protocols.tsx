import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/hero-redlight-belt.webp";
import heroMat from "@/assets/hero-restore-mat.webp";
import edSeatedCalm from "@/assets/editorial/seated-calm.webp";

/**
 * /protocols — "Three protocols. One system." Ported from the Claude Design
 * landing/protocols.html: each protocol is a sequence (timeline of steps) with
 * an instrument aside card. Real prices + real /instruments/:slug links.
 * Restoration Mat (Frequency Mat +) corrected to 660nm + far-infrared (no 850nm).
 */

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";

interface Step { n: string; verb: string; mod: string; min: string; body: string; }
interface Protocol {
  num: string;
  kicker: string;
  title: string;
  seqLabel: string;
  price: string;
  steps: Step[];
  img: string;
  imgAlt: string;
  instrument: string;
  modalities: string;
  cadence: string;
  to: string;
  begin: string;
}

const PROTOCOLS: Protocol[] = [
  {
    num: "01",
    kicker: "Skin & Face",
    title: "Face.",
    seqLabel: "12-minute sequence",
    price: "€88",
    steps: [
      { n: "01", verb: "Prime", mod: "Thermal", min: "2 min", body: "Controlled warmth raises surface temperature and relaxes the muscle — opening the field before any current is introduced." },
      { n: "02", verb: "Lift", mod: "Microcurrent", min: "4 min", body: "Sub-sensory current works the fine facial fibres and supports the skin's own energy production, where tone begins." },
      { n: "03", verb: "Contour", mod: "EMS", min: "3 min", body: "Electrical muscle stimulation engages the larger muscle beneath, training deeper contour over consistent use." },
    ],
    img: heroFace,
    imgAlt: "The Face Introducer in use",
    instrument: "The Face Introducer",
    modalities: "EMS · Microcurrent · Thermal · LED",
    cadence: "Daily · 12 minutes",
    to: "/instruments/face-introducer",
    begin: "Begin Protocol 01 · €88",
  },
  {
    num: "02",
    kicker: "Body & Circulation",
    title: "Body.",
    seqLabel: "15-minute sequence",
    price: "€180",
    steps: [
      { n: "01", verb: "Warm", mod: "Thermal contact", min: "2 min", body: "The contour wrap warms against the muscle, the cue that begins relaxing the tissue and softening the load it has been holding." },
      { n: "02", verb: "Penetrate", mod: "Near-Infrared · 850nm", min: "6 min", body: "Near-infrared reaches past the surface into deeper muscle tissue — the depth red light alone cannot carry to." },
      { n: "03", verb: "Circulate", mod: "Red 660nm + Compression", min: "5 min", body: "Red light and the wrap's steady compression together support local circulation, the body's own delivery system for recovery." },
      { n: "04", verb: "Settle", mod: "Cool-down", min: "2 min", body: "The array steps down and the warmth fades, closing the sequence without a hard stop." },
    ],
    img: heroBelt,
    imgAlt: "The Restoration Belt worn across the back",
    instrument: "The Restoration Belt",
    modalities: "Red 660nm · Near-IR 850nm · Thermal · Wrap",
    cadence: "After load · 15 minutes",
    to: "/instruments/restoration-belt",
    begin: "Begin Protocol 02 · €180",
  },
  {
    num: "03",
    kicker: "Sleep & Recovery",
    title: "Recovery.",
    seqLabel: "20-minute sequence",
    price: "€200",
    steps: [
      { n: "01", verb: "Settle", mod: "Lie flat · Thermal", min: "3 min", body: "You lie down on the array and gentle warmth begins the downshift — the cue the body reads as permission to stop bracing." },
      { n: "02", verb: "Saturate", mod: "Red 660nm + Far-Infrared", min: "14 min", body: "The array delivers red light and far-infrared warmth evenly across the back of the body — a wide field, not one spot at a time." },
      { n: "03", verb: "Restore", mod: "Wind-down", min: "3 min", body: "The light fades to nothing, timed for the evening so the sequence ends where sleep begins." },
    ],
    img: heroMat,
    imgAlt: "The Restoration Mat in use",
    instrument: "The Restoration Mat",
    modalities: "Red 660nm · Far-Infrared · Thermal",
    cadence: "Evening · 20 minutes",
    to: "/instruments/restoration-mat",
    begin: "Begin Protocol 03 · €200",
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const PILL_BRAND =
  "inline-flex w-full items-center justify-center rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#1A1714] transition-colors hover:bg-[#1BAF86]";
const PILL_ACTION =
  "inline-flex items-center justify-center rounded-full bg-[#F69251] px-[30px] py-4 font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#1A1714] transition-colors hover:bg-[#E87A38]";
const PILL_GHOST_DARK =
  "inline-flex items-center justify-center rounded-full border border-[rgba(247,244,240,0.28)] px-[30px] py-4 font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#F7F4F0] transition-colors hover:border-[#2ED8A8] hover:text-[#2ED8A8]";

export default function Protocols() {
  return (
    <PageShell
      title="Three Protocols. One system. | Zential Pure"
      description="Each Protocol is a sequence, not a shopping list. Face, Body, Recovery — the same instruments, kept in the order tissue responds to them."
      canonical="https://zentialpure.com/protocols"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={`relative ${WRAP} pt-[clamp(72px,10vw,118px)] pb-[clamp(54px,7vw,82px)]`}>
          <p className="flex items-baseline gap-3.5 font-sans text-[12px] tracking-[0.24em] uppercase text-[#F7F4F0]/45">
            Zential Pure · Protocols · <b className="font-serif italic text-[26px] tracking-normal text-[#2ED8A8]">( 01 – 03 )</b>
          </p>
          <h1 className="my-[22px] max-w-[13ch] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(44px,6vw,88px)]">
            Three protocols.<br />One <span className="text-[#2ED8A8]">system.</span>
          </h1>
          <p className="max-w-[540px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">
            Each Protocol is a sequence, not a shopping list. One price, no codes, no countdowns. The same instruments, kept in the order the body responds to them. The order is the product.
          </p>
        </div>
      </section>

      {/* ── PRINCIPLE ── */}
      <section className="bg-[#070A0E] py-[clamp(72px,10vw,120px)] text-[#F7F4F0]">
        <div className={`${WRAP} mx-auto max-w-[880px] text-center`}>
          <p className="font-serif italic text-[clamp(26px,3.4vw,44px)] leading-[1.18] tracking-[-0.01em] text-[#F7F4F0]">
            A device works because of its <span className="text-[#2ED8A8]">mechanism</span>.<br />A protocol works because of its <span className="text-[#2ED8A8]">order</span>.
          </p>
          <div className="mt-[26px] font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/45">Discipline is just order, kept</div>
        </div>
      </section>

      {/* ── PROTOCOLS ── */}
      <section className="bg-[#EDEAE6] py-[clamp(72px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          {PROTOCOLS.map((p, idx) => (
            <div key={p.num} className={idx > 0 ? "mt-[clamp(56px,8vw,96px)]" : ""}>
              <div className="grid grid-cols-1 items-end gap-6 border-b border-[rgba(26,23,20,0.12)] pb-[26px] md:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-3 font-sans text-[11px] tracking-[0.24em] uppercase text-[#6B5A4A]">
                    <span className="text-[#157A5C]">Protocol ( {p.num} )</span> · {p.kicker}
                  </div>
                  <h2 className="mt-3.5 font-serif italic font-normal text-[clamp(34px,4.4vw,56px)] leading-none tracking-[-0.02em] text-[#1A1714]">{p.title}</h2>
                </div>
                <div className="md:text-right">
                  <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5A4A]">{p.seqLabel}</div>
                  <div className="mt-1 font-serif italic text-[30px] leading-[1.1] text-[#1A1714]">{p.price} <small className="text-[14px] text-[#C6A07C]">once</small></div>
                </div>
              </div>

              <div className="mt-[38px] grid grid-cols-1 items-start gap-[clamp(36px,5vw,72px)] md:grid-cols-[1.35fr_1fr]">
                <ol className="relative m-0 list-none p-0 before:absolute before:left-[19px] before:top-3.5 before:bottom-3.5 before:w-px before:bg-[rgba(26,23,20,0.28)]">
                  {p.steps.map((s) => (
                    <li key={s.n} className="relative grid grid-cols-[40px_1fr] gap-[22px] pb-7 last:pb-0">
                      <span className="relative z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-[#157A5C] bg-[#EDEAE6] font-sans text-[13px] font-medium tabular-nums text-[#157A5C]">{s.n}</span>
                      <div className="pt-0.5">
                        <div className="mb-1.5 flex flex-wrap items-baseline gap-3.5">
                          <span className="font-serif italic text-[22px] tracking-[-0.01em] text-[#1A1714]">{s.verb}</span>
                          <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#6B5A4A]">{s.mod}</span>
                          <span className="ml-auto font-sans text-[11px] tabular-nums text-[#157A5C]">{s.min}</span>
                        </div>
                        <p className="m-0 max-w-[46ch] text-[14px] leading-[1.65] text-[#1A1714]/[0.66]">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <aside className="md:sticky md:top-[88px]">
                  <div className="mb-5 aspect-[16/10] overflow-hidden rounded-[14px] bg-white md:aspect-[4/5]">
                    <img src={p.img} alt={p.imgAlt} className="h-full w-full object-cover [filter:saturate(0.95)_brightness(0.97)]" />
                  </div>
                  <div className="rounded-[14px] border border-[rgba(26,23,20,0.12)] bg-white p-[26px] shadow-[0_18px_50px_rgba(26,23,20,0.08)]">
                    {[["Instrument", p.instrument], ["Modalities", p.modalities], ["Cadence", p.cadence]].map(([k, v], i) => (
                      <div key={k} className={i > 0 ? "mt-4 border-t border-[rgba(26,23,20,0.12)] pt-4" : ""}>
                        <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#6B5A4A]">{k}</div>
                        <div className="mt-0.5 text-[14px] text-[#1A1714]">{v}</div>
                      </div>
                    ))}
                    <Link to={p.to} className={`${PILL_BRAND} mt-[22px]`}>{p.begin}</Link>
                  </div>
                </aside>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="relative flex min-h-[clamp(360px,46vw,520px)] items-center overflow-hidden bg-[#1A1714]">
        <img src={edSeatedCalm} alt="Seated in calm morning light" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,0.7)_0%,rgba(7,10,14,0.32)_50%,rgba(7,10,14,0.55)_100%)]" />
        <div className={`relative z-[2] ${WRAP}`}>
          <p className="max-w-[16ch] font-serif italic text-[clamp(26px,3.6vw,46px)] leading-[1.16] text-[#F7F4F0]">The sum of its parts, kept in order.</p>
          <div className="mt-[22px] font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/55">Three vessels · three sequences · order kept</div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A1714] py-[clamp(72px,10vw,120px)] text-[#F7F4F0]">
        <div className={`${WRAP} mx-auto max-w-[760px] text-center`}>
          <p className="inline-flex items-center justify-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8]">
            <span className="tabular-nums opacity-55">( 04 )</span><span className="inline-block h-px w-[26px] bg-current opacity-40" /> Where to begin
          </p>
          <h2 className="my-5 font-serif italic font-normal text-[clamp(28px,3.4vw,44px)] text-[#F7F4F0]">Start with one sequence. The system follows.</h2>
          <p className="mx-auto mb-[34px] max-w-[540px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">
            Most people begin with the Face Protocol and add the others as the ritual settles. Every instrument carries the same 30-day money-back guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/instruments/face-introducer" className={PILL_ACTION}>Begin with the Face · €88</Link>
            <Link to="/instruments" className={PILL_GHOST_DARK}>See all instruments</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
