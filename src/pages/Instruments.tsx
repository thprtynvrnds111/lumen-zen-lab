import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import { SystemBundle } from "@/components/zential/SystemBundle";
import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/hero-redlight-belt.webp";
import heroMat from "@/assets/hero-restore-mat.webp";

/**
 * /instruments — "Three Instruments" hub.
 * Ported from the Claude Design prototype (landing/index.html) onto the real
 * storefront: shared PageShell chrome, repo tokens, real PDP links + prices.
 * Display names use the design rebrand (Restoration Belt / Mat); the underlying
 * SKUs are Flux Panel (€280) and Frequency Mat + (€220).
 */

interface Instrument {
  protocol: string;
  name: string;
  blurb: string;
  price: string;
  to: string;
  img: string;
  alt: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    protocol: "Protocol 01",
    name: "The Face Introducer",
    blurb:
      "Four clinic modalities — EMS, microcurrent, thermal and cosmetic LED — in a twelve-minute ritual for face and neck.",
    price: "€88",
    to: "/instruments/face-introducer",
    img: heroFace,
    alt: "The Face Introducer",
  },
  {
    protocol: "Protocol 02",
    name: "The Restoration Belt",
    blurb:
      "660nm red and 850nm near-infrared light, pressed to the muscle by a thermal wrap. Recovery, worn close. Fifteen minutes.",
    price: "€280",
    to: "/instruments/restoration-belt",
    img: heroBelt,
    alt: "The Restoration Belt",
  },
  {
    protocol: "Protocol 03",
    name: "The Restoration Mat",
    blurb:
      "A full-body bed of 660nm red light and far-infrared heat. You lie down, the array does the rest. Twenty horizontal minutes.",
    price: "€220",
    to: "/instruments/restoration-mat",
    img: heroMat,
    alt: "The Restoration Mat",
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Instruments() {
  return (
    <PageShell
      title="The Instruments · Zential Pure"
      description="Three instruments. One system. Clinic precision, calibrated to a daily ritual."
      canonical="https://zentialpure.com/instruments"
      hideHero
    >
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1180px] px-6 md:px-10 pt-[clamp(72px,11vw,128px)] pb-[clamp(40px,6vw,64px)]">
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8]">
            <span className="tabular-nums opacity-55">( 00 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The Instruments
          </p>
          <h1 className="my-[22px] max-w-[16ch] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(42px,6vw,84px)]">
            Three instruments.
            <br />
            One <span className="text-[#2ED8A8]">system.</span>
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">
            Clinic-grade light and current, dosed for the part of the body each
            one serves and calibrated to a ritual you can actually keep. Choose
            where to begin.
          </p>
        </div>

        <div className="relative mx-auto max-w-[1180px] px-6 md:px-10 mt-[clamp(44px,6vw,72px)] pb-[clamp(72px,11vw,128px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-[#2A2420] bg-[#2A2420]">
            {INSTRUMENTS.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="group flex flex-col bg-[#1A1714] transition-colors duration-300 hover:bg-[#1f1b17]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover [filter:saturate(0.94)_brightness(0.92)] transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(26,23,20,0.6)_100%)]" />
                  <span className="absolute left-5 top-[18px] z-[2] font-sans text-[10px] tracking-[0.28em] uppercase text-[#F7F4F0]/70">
                    {item.protocol}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-7 pb-8 pt-[30px]">
                  <h2 className="mb-3 font-serif italic font-normal tracking-[-0.01em] text-[30px] text-[#F7F4F0]">
                    {item.name}
                  </h2>
                  <p className="mb-[22px] text-sm leading-[1.65] text-[#F7F4F0]/60">
                    {item.blurb}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#2A2420] pt-5">
                    <span className="font-serif italic text-[26px] text-[#F7F4F0]">
                      {item.price} <small className="text-sm text-[#C6A07C]">once</small>
                    </span>
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-[#2ED8A8]">
                      View instrument
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SystemBundle />
    </PageShell>
  );
}
