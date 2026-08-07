import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import { SystemBundle } from "@/components/zential/SystemBundle";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/storefront-belt-woman.png";
import heroMat from "@/assets/hero-restore-mat.webp";

/**
 * /instruments — "Three Instruments" hub.
 * Ported from the Claude Design prototype (landing/index.html) onto the real
 * storefront: shared PageShell chrome, repo tokens, real PDP links + prices.
 * Display names: Restoration Belt (€180, belt handle) and Restoration Mat
 * (€200, mat handle). Shopify product titles now match these names.
 */

interface Instrument {
  protocol: string;
  name: string;
  blurb: string;
  handle: string;
  to: string;
  img: string;
  alt: string;
  imgPos?: string;
}

const INSTRUMENTS: Instrument[] = [
  {
    protocol: "Protocol 01",
    name: "The Face Introducer",
    blurb:
      "Three clinic modalities — EMS, microcurrent and thermal — in a twelve-minute ritual for face and neck.",
    handle: "face-introducer",
    to: "/instruments/face-introducer",
    img: heroFace,
    alt: "The Face Introducer",
  },
  {
    protocol: "Protocol 02",
    name: "The Restoration Belt",
    blurb:
      "660nm red and 850nm near-infrared light, pressed to the muscle by a thermal wrap. Recovery, worn close. Fifteen minutes.",
    handle: "restoration-belt",
    to: "/instruments/restoration-belt",
    img: heroBelt,
    alt: "The Restoration Belt worn across the lower back, red light through the array",
    imgPos: "50% 64%",
  },
  {
    protocol: "Protocol 03",
    name: "The Restoration Mat",
    blurb:
      "A 100 × 40 cm bed of 660nm red light and far-infrared heat — 120 × 40 cm in the longer size. You lie down, the array does the rest. Twenty horizontal minutes.",
    handle: "the-restoration-mat",
    to: "/instruments/restoration-mat",
    img: heroMat,
    alt: "The Restoration Mat",
  },
];

export default function Instruments() {
  // Market-aware formatted price per instrument, held empty until the live
  // Shopify (@inContext) price resolves so a US visitor never sees a euro symbol
  // on a USD amount — an em-dash placeholder shows until then.
  const [prices, setPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    INSTRUMENTS.forEach((it) => {
      const load = (attempt: number) => {
        fetchProductByHandle(it.handle)
          .then((p) => {
            const priceObj = p?.variants?.edges?.[0]?.node?.price;
            const n = priceObj?.amount ? parseFloat(priceObj.amount) : NaN;
            if (active && !isNaN(n)) {
              setPrices((prev) => ({ ...prev, [it.handle]: formatMoney(Math.round(n), priceObj!.currencyCode) }));
            } else if (active && isNaN(n) && attempt === 0) {
              load(1);
            }
          })
          .catch(() => { if (active && attempt === 0) load(1); });
      };
      load(0);
    });
    return () => { active = false; };
  }, []);

  // Market-correct price once resolved; null until then — callers omit the
  // price segment while null so a card never shows an empty price token.
  const priceOf = (it: Instrument): string | null => prices[it.handle] ?? null;

  return (
    <PageShell
      title="The Instruments · Zential Pure"
      description="Three instruments. One system. Clinic precision, calibrated to a daily ritual."
      canonical="https://zentialpure.com/instruments"
      hideHero
    >
      <section className="relative overflow-hidden bg-white text-[#141414]">
        <div className="relative mx-auto max-w-[1180px] px-6 md:px-10 pt-[clamp(72px,11vw,128px)] pb-[clamp(40px,6vw,64px)]">
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
            <span className="tabular-nums opacity-55">( 00 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The Instruments
          </p>
          <h1 className="my-[22px] max-w-[16ch] font-sans font-light tracking-[-0.03em] leading-[1.02] text-[#141414] text-[clamp(42px,6vw,84px)]">
            Three instruments.
            <br />
            One <span className="text-[#0E7A54]">system.</span>
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.75] text-[#5A5A5A]">
            Clinic-grade light and current, dosed for the part of the body each
            one serves and calibrated to a ritual you can actually keep. Choose
            where to begin.
          </p>
        </div>

        <div className="relative mx-auto max-w-[1180px] px-6 md:px-10 mt-[clamp(44px,6vw,72px)] pb-[clamp(72px,11vw,128px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-[rgba(20,20,20,0.10)] bg-[rgba(20,20,20,0.10)]">
            {INSTRUMENTS.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="group flex flex-col bg-white transition-colors duration-300 hover:bg-[#FCFEFD]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    loading="lazy"
                    style={item.imgPos ? { objectPosition: item.imgPos } : undefined}
                    className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,20,20,0.55)_100%)]" />
                  <span className="absolute left-5 top-[18px] z-[2] font-sans text-[10px] tracking-[0.28em] uppercase text-white/80">
                    {item.protocol}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-7 pb-8 pt-[30px]">
                  <h2 className="mb-3 font-sans font-light tracking-[-0.02em] text-[28px] text-[#141414]">
                    {item.name}
                  </h2>
                  <p className="mb-[22px] text-sm leading-[1.65] text-[#5A5A5A]">
                    {item.blurb}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-[rgba(20,20,20,0.10)] pt-5">
                    <span className="font-sans font-medium tabular-nums text-[20px] text-[#141414]">
                      {priceOf(item) && <>{priceOf(item)} <small className="text-sm text-[#8E8E8E]">once</small></>}
                    </span>
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-[#0E7A54]">
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

      {/* #system is the deep-link target for the link-in-bio System tile
          (scripts/links/tiles.mjs). scroll-mt clears the fixed header. */}
      <div id="system" className="scroll-mt-24">
        <SystemBundle />
      </div>
    </PageShell>
  );
}
