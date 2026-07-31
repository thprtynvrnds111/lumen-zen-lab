import { useState } from "react";
import { Link } from "react-router-dom";
import { TrustpilotProof } from "@/components/zential/TrustpilotProof";

/**
 * ReceiptsSection — "Proof, not promises."
 *
 * Tabbed per-instrument proof: pick an instrument, see its receipts. The
 * receipts are ONLY things we can stand behind without an asterisk — specs,
 * price math, session shape — plus links to the journal citations (which state
 * what the research does NOT show) and the real Trustpilot line. No invented
 * reviews, no before/afters, no outcome claims (authenticity floor +
 * prohibited-claims.md). Every number here is verifiable on the PDP or in
 * knowledge/products/LIVE-CATALOG-TRUTH.md.
 */

interface Receipt {
  key: string;
  tab: string;
  headline: string;
  stats: { v: string; l: string }[];
  receipt: string;
  to: string;
}

const RECEIPTS: Receipt[] = [
  {
    key: "face-introducer",
    tab: "Face Introducer",
    headline: "Three clinic modalities. One instrument. €88, once.",
    stats: [
      { v: "3", l: "Modalities in one instrument" },
      { v: "12 min", l: "Daily session" },
      { v: "€0.24", l: "Per day, one year of daily use" },
    ],
    receipt:
      "A single clinic session using the same mechanism categories runs €80–120. The instrument costs €88 — about one session — and then the ritual is yours.",
    to: "/instruments/face-introducer",
  },
  {
    key: "restoration-belt",
    tab: "Restoration Belt",
    headline: "Two wavelengths, pressed to the muscle.",
    stats: [
      { v: "660 + 850nm", l: "Red + near-infrared" },
      { v: "15 min", l: "Worn, not scheduled" },
      { v: "≈ 2", l: "Clinic sessions, for the price, once" },
    ],
    receipt:
      "Light needs contact time, not effort. The thermal wrap holds both wavelengths against the muscle while you read, work, or do nothing at all.",
    to: "/instruments/restoration-belt",
  },
  {
    key: "restoration-mat",
    tab: "Restoration Mat",
    headline: "A wide array you lie down on.",
    stats: [
      { v: "660nm + FIR", l: "Red light + far-infrared heat" },
      { v: "20 min", l: "You lie down; the array works" },
      { v: "from €200", l: "Rolls flat when the session ends" },
    ],
    receipt:
      "A 100 × 40 cm field (or 120 × 40 cm) is the difference between treating a spot and closing the day. Twenty minutes, lying still, before sleep.",
    to: "/instruments/restoration-mat",
  },
];

export function ReceiptsSection() {
  const [active, setActive] = useState(0);
  const r = RECEIPTS[active];

  return (
    <section className="bg-[#F7F4F0] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <p className="inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase text-[#C6A07C]">
          <span className="inline-block h-px w-[26px] bg-current opacity-40" /> Receipts
        </p>
        <div className="mb-[42px] mt-[18px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[16ch] font-serif italic font-normal text-[clamp(30px,4vw,52px)] leading-[1.05] text-[#1A1714]">
            Proof, not promises.
          </h2>
          <p className="max-w-[32ch] text-right font-sans text-[12px] leading-[1.6] text-[#1A1714]/55">
            No before-and-afters. No invented reviews. Specs, price math and cited
            research — <b className="font-medium text-[#1A1714]">the receipts we can stand behind.</b>
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Pick an instrument">
          {RECEIPTS.map((it, i) => (
            <button
              key={it.key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors ${
                i === active
                  ? "bg-[#1A1714] text-[#F7F4F0]"
                  : "border border-[rgba(26,23,20,0.2)] text-[#1A1714]/70 hover:border-[#1A1714] hover:text-[#1A1714]"
              }`}
            >
              {it.tab}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="border border-[rgba(26,23,20,0.12)] bg-white px-7 py-9 md:px-10 md:py-11">
          <h3 className="max-w-[24ch] font-serif italic font-normal text-[clamp(22px,2.6vw,32px)] leading-[1.2] text-[#1A1714]">
            {r.headline}
          </h3>

          <div className="mt-8 flex flex-wrap border-y border-[rgba(26,23,20,0.12)]">
            {r.stats.map((s, i) => (
              <div
                key={s.l}
                className={`min-w-[160px] flex-1 py-6 pr-6 ${i > 0 ? "border-l border-[rgba(26,23,20,0.12)] pl-6" : ""}`}
              >
                <div className="font-sans text-[clamp(24px,2.4vw,34px)] font-medium leading-none tabular-nums tracking-[-0.01em] text-[#1A1714]">
                  {s.v}
                </div>
                <div className="mt-[9px] font-sans text-[10px] tracking-[0.2em] uppercase text-[#6B5A4A]">{s.l}</div>
              </div>
            ))}
          </div>

          <p className="mt-7 max-w-[58ch] text-[14.5px] leading-[1.7] text-[#1A1714]/70">{r.receipt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              to={r.to}
              className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.16em] uppercase text-[#157A5C] transition-colors hover:text-[#1BAF86]"
            >
              See the instrument <span aria-hidden>→</span>
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.16em] uppercase text-[#1A1714]/60 transition-colors hover:text-[#1A1714]"
            >
              Read the citations — including what they don't show <span aria-hidden>→</span>
            </Link>
            <TrustpilotProof variant="cart" />
          </div>
        </div>
      </div>
    </section>
  );
}
