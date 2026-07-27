import { useEffect, useState } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { safeCheckoutUrl } from "@/lib/checkout";
import { trackAddToCart } from "@/lib/google-tracking";

/**
 * /instruments/the-system — The System bundle product page.
 *
 * Backed by the live Shopify bundle product (the-system-founding-bundle, variant
 * 53870945567063) via a cart permalink. Prices resolve from Shopify @inContext so
 * US visitors see USD, EU visitors see EUR — no hardcoded amounts in the hero.
 *
 * The page is deliberately simple: the Instruments hub already sells individuals
 * and cross-sells up. This page exists so that:
 *   1. Links to "The System" land on a real page (not a redirect)
 *   2. Bots get a proper SEO shell (title, description, canonical)
 *   3. Customers who arrive with purchase intent land directly on the bundle CTA
 */

const BUNDLE_HANDLE = "the-system-founding-bundle";
const BUNDLE_VARIANT_ID = "53870945567063";
const CHECKOUT_PERMALINK = `https://checkout.zentialpure.com/cart/${BUNDLE_VARIANT_ID}:1`;

const INSTRUMENTS = [
  {
    name: "The Face Introducer",
    handle: "lifting-and-tightening-face-introducer",
    href: "/instruments/face-introducer",
    time: "12 min · morning",
    desc: "EMS, microcurrent, thermal and cosmetic LED. Face and neck.",
  },
  {
    name: "The Restoration Belt",
    handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
    href: "/instruments/restoration-belt",
    time: "15 min · after the work",
    desc: "660nm red + 850nm near-infrared under a thermal wrap. Waist, shoulders, wherever the day settled.",
  },
  {
    name: "The Restoration Mat",
    handle: "the-restoration-mat",
    href: "/instruments/restoration-mat",
    time: "20 min · night",
    desc: "100 × 40 cm field of 660nm red light and far-infrared heat. You lie down, the array does the rest.",
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";

export default function InstrumentSystem() {
  const [busy, setBusy] = useState(false);
  const [currency, setCurrency] = useState("EUR");
  const [bundlePrice, setBundlePrice] = useState<number | null>(null);
  const [instrumentPrices, setInstrumentPrices] = useState<Record<string, number>>({});

  // Fetch live Shopify prices for the bundle and each instrument
  useEffect(() => {
    let active = true;
    const handles = [BUNDLE_HANDLE, ...INSTRUMENTS.map((i) => i.handle)];
    handles.forEach((handle) => {
      fetchProductByHandle(handle)
        .then((p) => {
          if (!active) return;
          const priceObj = p?.variants?.edges?.[0]?.node?.price;
          const n = priceObj?.amount ? parseFloat(priceObj.amount) : NaN;
          if (!isNaN(n)) {
            const ccy = priceObj!.currencyCode;
            if (handle === BUNDLE_HANDLE) {
              setBundlePrice(Math.round(n));
              setCurrency(ccy);
            } else {
              setInstrumentPrices((prev) => ({ ...prev, [handle]: Math.round(n) }));
            }
          }
        })
        .catch(() => {});
    });
    return () => { active = false; };
  }, []);

  const fmt = (n?: number) => (typeof n === "number" ? formatMoney(n, currency) : "—");

  const componentSum = INSTRUMENTS.reduce(
    (sum, i) => sum + (instrumentPrices[i.handle] ?? 0),
    0,
  );
  const savings =
    bundlePrice !== null && componentSum > 0
      ? componentSum - bundlePrice
      : null;

  function claim() {
    if (busy) return;
    setBusy(true);
    if (typeof bundlePrice === "number") {
      trackAddToCart({
        id: BUNDLE_HANDLE,
        name: "The System Bundle",
        price: bundlePrice,
        currency,
      });
    }
    window.location.href = safeCheckoutUrl(CHECKOUT_PERMALINK);
  }

  return (
    <PageShell
      title="The System · All three instruments | Zential Pure"
      description="The Face Introducer, Restoration Belt and Restoration Mat — all three instruments, one purchase. €399 founding bundle. 30-day money-back guarantee."
      canonical="https://zentialpure.com/instruments/the-system"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }}
          aria-hidden
        />
        <div className={`${WRAP} py-[clamp(72px,11vw,128px)]`}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8]">
            <span className="tabular-nums opacity-55">( 00 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The System
          </p>
          <h1 className="my-[22px] max-w-[16ch] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(42px,6vw,84px)]">
            All three instruments.
            <br />
            The whole day,{" "}
            <span className="text-[#2ED8A8]">covered.</span>
          </h1>
          <p className="max-w-[540px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">
            Face in the morning, body after the work, full rest at night. The
            complete protocol, in one purchase.
          </p>

          {/* ── PRICE CARD ── */}
          <div className="mt-[42px] max-w-[480px] rounded-[16px] border border-[rgba(247,244,240,0.10)] bg-[#070A0E] p-[clamp(28px,3vw,44px)]">
            <div className="font-sans text-[12px] text-[#F7F4F0]/45 line-through">
              {fmt(componentSum || undefined)}
            </div>
            <div className="mt-1 font-serif italic text-[56px] leading-none text-[#F7F4F0]">
              {fmt(bundlePrice ?? undefined)}
            </div>
            <div className="mt-1 font-serif italic text-[18px] text-[#C6A07C]">
              Founding bundle · save {fmt(savings ?? undefined)}
            </div>
            <button
              onClick={claim}
              disabled={busy}
              className="mt-6 w-full rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[13px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Adding the System…" : "Claim the System"}
            </button>
            <p className="mt-3 text-center font-sans text-[11px] text-[#F7F4F0]/45">
              30-day money-back guarantee on every instrument.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="bg-[#EDEAE6] py-[clamp(76px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase text-[#6B5A4A]">
            <span className="tabular-nums opacity-55">( 01 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            What's included
          </p>
          <h2 className="mt-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#1A1714]">
            Three instruments. Seven inputs.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-[#1A1714]/[0.66]">
            Each instrument works alone — together they cover the whole day. EMS,
            microcurrent, thermal, cosmetic LED, red light, near-infrared, and
            far-infrared. The complete protocol, in one purchase.
          </p>
          <div className="mt-10 space-y-6">
            {INSTRUMENTS.map((inst) => (
              <a
                key={inst.href}
                href={inst.href}
                className="group flex flex-col gap-2 rounded-[12px] border border-[rgba(26,23,20,0.10)] bg-white p-6 transition-colors hover:border-[#C6A07C]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif italic text-[20px] text-[#1A1714] group-hover:text-[#C6A07C]">
                    {inst.name}
                  </span>
                  <span className="shrink-0 tabular-nums font-serif italic text-[18px] text-[#C6A07C]">
                    {fmt(instrumentPrices[inst.handle])}
                  </span>
                </div>
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-[#1A1714]/45">
                  {inst.time}
                </span>
                <p className="text-[14px] leading-[1.65] text-[#1A1714]/[0.6]">
                  {inst.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE RITUAL ── */}
      <section className="bg-[#1A1714] py-[clamp(72px,10vw,112px)] text-[#F7F4F0]">
        <div className={WRAP}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8]">
            <span className="tabular-nums opacity-55">( 02 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The daily sequence
          </p>
          <h2 className="mt-5 max-w-[18ch] font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#F7F4F0]">
            One ordinary day, covered.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "Morning",
                time: "12 minutes",
                with: "The Face Introducer",
                body: "EMS and microcurrent lift while the coffee brews. Thermal and cosmetic LED follow — a clinic-grade facial, your own hands, before you even leave the house.",
              },
              {
                n: "Evening",
                time: "15 minutes",
                with: "The Restoration Belt",
                body: "Cordless. Worn where the day settled — lower back, shoulders. 660nm red at the surface, 850nm near-infrared deeper. Warmth carries the light to the muscle.",
              },
              {
                n: "Night",
                time: "20 minutes",
                with: "The Restoration Mat",
                body: "Lie down. A field of 660nm red light and far-infrared heat covers your back. Twenty horizontal minutes while the nervous system shifts from done to recovered.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-[12px] border border-[rgba(247,244,240,0.10)] bg-[#070A0E] p-[clamp(24px,3vw,36px)]"
              >
                <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#2ED8A8]">
                  {step.n}
                </span>
                <div className="mt-3 font-serif italic text-[22px] leading-snug text-[#F7F4F0]">
                  {step.with}
                </div>
                <span className="mt-1.5 block font-sans text-[11px] text-[#F7F4F0]/45">
                  {step.time}
                </span>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#F7F4F0]/[0.6]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="bg-[#EDEAE6] py-[clamp(64px,8vw,96px)] text-[#1A1714]">
        <div className={`${WRAP} max-w-[720px] text-center`}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase text-[#6B5A4A]">
            <span className="tabular-nums opacity-55">( 03 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            Guarantee
          </p>
          <h2 className="mt-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1]">
            Thirty days, all three instruments.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#1A1714]/[0.66]">
            Use the full system for thirty days. If it's not for you, send everything
            back for a full refund. No forms, no photos — just email us and we handle
            the rest. Returnable to Rotterdam.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {[
              {
                title: "CE Marked",
                body: "Meets EU safety, health and environmental requirements for consumer electronics — Declaration of Conformity on file.",
              },
              {
                title: "EU Company · Netherlands",
                body: "Zential Pure B.V. — look us up in the Dutch business register. Real company, real address, real support.",
              },
              {
                title: "2-Year Warranty",
                body: "Every instrument covered for two years against manufacturing fault. Register within thirty days.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[10px] border border-[rgba(26,23,20,0.10)] bg-white p-6">
                <h3 className="font-sans text-[13px] font-medium tracking-[0.04em] text-[#1A1714]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.65] text-[#1A1714]/[0.6]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="bg-[#070A0E] py-[clamp(72px,10vw,112px)] text-[#F7F4F0]">
        <div className={`${WRAP} text-center`}>
          <h2 className="font-serif italic font-normal text-[clamp(28px,4vw,48px)] leading-[1.08]">
            The System
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] text-[#F7F4F0]/[0.6]">
            Three instruments, one purchase. Founding bundle price held for the
            first hundred.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={claim}
              disabled={busy}
              className="rounded-full bg-[#2ED8A8] px-10 py-5 font-sans text-[14px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Adding the System…" : "Claim the System — " + fmt(bundlePrice ?? undefined)}
            </button>
          </div>
          <p className="mt-4 text-center font-sans text-[11px] text-[#F7F4F0]/40">
            30-day money-back guarantee. Ships in 2–3 working days. Tracked to your door.
          </p>
        </div>
      </section>
    </PageShell>
  );
}