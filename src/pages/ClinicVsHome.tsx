import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import edWalkStone from "@/assets/editorial/walk-stone.webp";

/**
 * /clinic-vs-home-facial-device — "The Method". Ported from the Claude Design
 * landing/clinic-vs-home-facial-device.html: honest clinic-vs-home comparison
 * (stats, comparison table, fair-to-the-clinic band, the maths, CTA).
 * Observational comparison + disclaimers — compliance clean. Canonical 12-min,
 * €88. Order links → /instruments/face-introducer.
 */

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";
const PILL_ACTION =
  "inline-flex items-center justify-center rounded-full bg-[#2ED8A8] px-[30px] py-4 font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86]";
const PILL_GHOST_DARK =
  "inline-flex items-center justify-center rounded-full border border-[rgba(20,20,20,0.22)] px-[30px] py-4 font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#141414] transition-colors hover:border-[#0E7A54] hover:text-[#0E7A54]";

const STATS = [
  { v: "€1,440", k: "Clinic facials\nyear one, average", warm: true },
  { v: "€88", k: "The Face Introducer\nonce, then nothing", warm: false },
  { v: "3 → 1", k: "Three modalities\none 12-min ritual", warm: false },
];

const ROWS: { rl: string; clinic: string; zp: string; win?: boolean }[] = [
  { rl: "Year-one cost", clinic: "~€1,440 (≈€120 × 12)", zp: "€88, once", win: true },
  { rl: "Year two onward", clinic: "~€1,440 / yr, again", zp: "€0", win: true },
  { rl: "Modalities / session", clinic: "Usually one, booked separately", zp: "Four, sequenced in one pass" },
  { rl: "Frequency", clinic: "Every few weeks", zp: "Daily, if you want it", win: true },
  { rl: "The appointment", clinic: "Booked, business hours, across town", zp: "12 minutes, whenever you are home" },
  { rl: "Operated by", clinic: "A trained aesthetician", zp: "You, guided by the Protocol Card" },
  { rl: "What drives results", clinic: "Peak intensity, occasional", zp: "Consistency, sustained", win: true },
];

const CLINIC_WINS = [
  "An expert read of your skin, in person, that adapts the treatment in real time.",
  "Higher peak intensity, safely supervised, for a single deep session.",
  "Hands-on work — extractions, massage, peels — a device cannot and should not do.",
  "The ritual of being cared for by someone else. That has its own value.",
];
const HOME_WINS = [
  "Frequency. The mechanisms we use reward consistency over occasional intensity.",
  "No calendar, no commute, no €120 deciding whether you go this month.",
  "The same three modalities, in the order tissue responds to them, every day.",
  "A cost that ends. €88 once, and the maths stops working against you.",
];
const MATH = [
  { l: "One clinic facial", sub: "European average", v: "~€120", clinic: true },
  { l: "A clinic year", sub: "≈ 12 sessions", v: "~€1,440", clinic: true },
  { l: "The Face Introducer", sub: "everything, once", v: "€88", clinic: false },
];

function Eyebrow({ num, children, tone = "meta" }: { num: string; children: string; tone?: "meta" | "dark" }) {
  const color = tone === "dark" ? "text-[#0E7A54]" : "text-[#8E8E8E]";
  return (
    <p className={`inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase ${color}`}>
      <span className="tabular-nums opacity-55">( {num} )</span>
      <span className="inline-block h-px w-[26px] bg-current opacity-40" />
      {children}
    </p>
  );
}

export default function ClinicVsHome() {
  return (
    <PageShell
      title="Clinic vs. Home · The Method | Zential Pure"
      description="A clinic facial costs about €1,440 a year. The Face Introducer is €88, once. The same three modalities — the difference is the calendar, not the mechanism. The honest comparison."
      canonical="https://zentialpure.com/clinic-vs-home-facial-device"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white text-[#141414]">
        <div className={`relative ${WRAP} pt-[clamp(72px,10vw,118px)] pb-[clamp(54px,7vw,84px)]`}>
          <Eyebrow num="00" tone="dark">The Method · Clinic vs. Home</Eyebrow>
          <h1 className="my-6 max-w-[15ch] font-sans font-light tracking-[-0.03em] leading-[1.04] text-[#141414] text-[clamp(44px,6vw,86px)]">
            You didn't quit the results.<br />You quit the <span className="text-[#0E7A54]">commute.</span>
          </h1>
          <p className="mb-[38px] max-w-[560px] text-[17px] leading-[1.75] text-[#5A5A5A]">
            The clinic facial works. So does the cost, the booking, the drive across town. The Face Introducer takes the same three modalities and removes everything that wasn't the treatment. Here is the honest comparison — including what the clinic still does better.
          </p>
          <div className="grid max-w-[640px] grid-cols-1 gap-px border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.10)] sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.k} className="bg-white px-7 py-[26px]">
                <div className={`font-sans font-light text-[clamp(30px,3.6vw,42px)] leading-none tracking-[-0.01em] ${s.warm ? "text-[#5A5A5A]" : "text-[#0E7A54]"}`}>{s.v}</div>
                <div className="mt-3 whitespace-pre-line font-sans text-[10px] leading-[1.5] tracking-[0.2em] uppercase text-[#8E8E8E]">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,120px)] text-[#141414]">
        <div className={WRAP}>
          <Eyebrow num="01">Side by side</Eyebrow>
          <h2 className="mb-8 mt-3.5 max-w-[18ch] font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,44px)] text-[#141414]">The same treatment, two very different years.</h2>
          <div className="overflow-hidden rounded-none border border-[rgba(20,20,20,0.10)] bg-white">
            <div className="hidden grid-cols-[1.1fr_1fr_1fr] border-b border-[rgba(20,20,20,0.10)] bg-white md:grid">
              <div className="px-[26px] py-6" />
              <div className="px-[26px] py-6">
                <div className="font-sans font-light text-[24px] text-[#141414]">The Clinic</div>
                <div className="mt-1.5 font-sans text-[10px] tracking-[0.16em] uppercase text-[#8E8E8E]">Per visit, booked</div>
              </div>
              <div className="border-x border-[rgba(20,20,20,0.10)] bg-[#F4FBF8] px-[26px] py-6">
                <div className="font-sans font-medium text-[24px] text-[#0E7A54]">The Face Introducer</div>
                <div className="mt-1.5 font-sans text-[10px] tracking-[0.16em] uppercase text-[#8E8E8E]">At your sink, daily</div>
              </div>
            </div>
            {ROWS.map((r) => (
              <div key={r.rl} className="grid grid-cols-1 border-t border-[rgba(20,20,20,0.10)] first:border-t-0 md:grid-cols-[1.1fr_1fr_1fr]">
                <div className="bg-white px-[26px] py-4 font-sans text-[11px] tracking-[0.16em] uppercase text-[#8E8E8E] md:bg-transparent md:py-[22px]">{r.rl}</div>
                <div className="px-[26px] py-3 text-[15px] leading-[1.4] text-[#5A5A5A] md:py-[22px]">
                  <span className="mb-1 block font-sans text-[9px] tracking-[0.2em] uppercase text-[#8E8E8E] md:hidden">Clinic</span>{r.clinic}
                </div>
                <div className="border-[rgba(20,20,20,0.10)] bg-[#F4FBF8] px-[26px] py-3 text-[15px] leading-[1.4] md:border-x md:py-[22px]">
                  <span className="mb-1 block font-sans text-[9px] tracking-[0.2em] uppercase text-[#8E8E8E] md:hidden">Face Introducer</span>
                  <span className={r.win ? "font-medium text-[#0E7A54]" : "text-[#141414]"}>{r.zp}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-[30px] max-w-[640px] text-xs leading-[1.6] text-[#141414]/50">
            Clinic figure is an average of European microcurrent / LED facial pricing at roughly €120 a session, twelve sessions a year. Your local pricing will vary. The Face Introducer supports the skin's own processes; it is not a medical device and does not replace professional care.
          </p>
        </div>
      </section>

      {/* ── FAIR TO THE CLINIC ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,120px)] text-[#141414]">
        <div className={WRAP}>
          <Eyebrow num="02" tone="dark">The honest part</Eyebrow>
          <h2 className="mb-5 mt-3.5 max-w-[20ch] font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,44px)] text-[#141414]">We are not telling you to cancel everything.</h2>
          <p className="mb-[38px] max-w-[600px] text-[17px] leading-[1.75] text-[#5A5A5A]">
            A device that replaced expert hands would be lying to you. Here is the real division of labour — what the room still does better, and what daily practice does that no appointment can.
          </p>
          <div className="grid grid-cols-1 gap-px border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.10)] md:grid-cols-2">
            {[
              { h: "What the clinic still wins", items: CLINIC_WINS, dot: "bg-[#8E8E8E]", head: "text-[#8E8E8E]" },
              { h: "What daily practice wins", items: HOME_WINS, dot: "bg-[#2ED8A8]", head: "text-[#0E7A54]" },
            ].map((col) => (
              <div key={col.h} className="bg-white px-9 py-10">
                <h3 className={`mb-5 font-sans font-light tracking-[-0.01em] text-[23px] ${col.head}`}>{col.h}</h3>
                <ul className="m-0 list-none p-0">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3.5 border-b border-[rgba(20,20,20,0.10)] py-3 text-[14px] leading-[1.6] text-[#5A5A5A] last:border-b-0">
                      <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${col.dot}`} />{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-[30px] max-w-[640px] text-xs leading-[1.6] text-[#8E8E8E]">
            Many of our members keep an occasional clinic visit and run the daily ritual between them. The instrument is built to complement professional care, not to argue with it.
          </p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="relative flex min-h-[clamp(360px,46vw,520px)] items-center overflow-hidden bg-[#1A1714]">
        <img src={edWalkStone} alt="Calm movement in warm light" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,0.7)_0%,rgba(7,10,14,0.32)_50%,rgba(7,10,14,0.55)_100%)]" />
        <div className={`relative z-[2] ${WRAP}`}>
          <p className="max-w-[16ch] font-sans font-light tracking-[-0.025em] text-[clamp(26px,3.6vw,46px)] leading-[1.16] text-[#F7F4F0]">Built for the woman who left the clinic but kept the standard.</p>
          <div className="mt-[22px] font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/55">The Method · Clinic precision, daily ritual</div>
        </div>
      </section>

      {/* ── THE MATH ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,120px)] text-[#141414]">
        <div className={WRAP}>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow num="03">The maths</Eyebrow>
              <h2 className="my-5 font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,44px)] text-[#141414]">The instrument pays for itself before the first month is out.</h2>
              <p className="text-[17px] leading-[1.75] text-[#141414]/[0.66]">One clinic session is more than the whole instrument. Run the numbers across a single year and the comparison stops being close.</p>
              <p className="mt-[18px] text-[17px] leading-[1.75] text-[#141414]/[0.66]">After that, the clinic keeps billing. The Face Introducer keeps working, for nothing.</p>
            </div>
            <div className="overflow-hidden rounded-none border border-[rgba(20,20,20,0.10)] bg-white shadow-[0_18px_50px_rgba(20,20,20,0.06)]">
              {MATH.map((m) => (
                <div key={m.l} className="flex items-baseline justify-between border-b border-[rgba(20,20,20,0.10)] px-7 py-5 last:border-b-0">
                  <span className="text-[14px] text-[#141414]">{m.l}<small className="mt-0.5 block font-sans text-[10px] tracking-[0.14em] uppercase text-[#8E8E8E]">{m.sub}</small></span>
                  <span className={`font-sans font-light text-[26px] ${m.clinic ? "text-[#5A5A5A]" : "text-[#141414]"}`}>{m.v}</span>
                </div>
              ))}
              <div className="flex items-baseline justify-between bg-[#F4FBF8] px-7 py-5">
                <span className="text-[14px] text-[#141414]">Year-one difference<small className="mt-0.5 block font-sans text-[10px] tracking-[0.14em] uppercase text-[#8E8E8E]">in your favour</small></span>
                <span className="font-sans font-light text-[34px] text-[#0E7A54]">~€1,352</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,120px)] text-[#141414]">
        <div className={`${WRAP} mx-auto max-w-[760px] text-center`}>
          <p className="inline-flex items-center justify-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#0E7A54]">
            <span className="tabular-nums opacity-55">( 04 )</span><span className="inline-block h-px w-[26px] bg-current opacity-40" /> Bring it home
          </p>
          <h2 className="my-5 font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,44px)] text-[#141414]">The mechanism is the same. The maths is yours.</h2>
          <p className="mx-auto mb-[34px] max-w-[560px] text-[17px] leading-[1.75] text-[#5A5A5A]">
            Three clinic modalities, a twelve-minute ritual, and a 30-day money-back guarantee. If it does not earn its place in a month, send it back for a full refund.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/instruments/face-introducer" className={PILL_ACTION}>Order the Face Introducer · €88</Link>
            <Link to="/instruments" className={PILL_GHOST_DARK}>See all instruments</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
