import { useEffect, useState } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { buyUrl } from "@/lib/checkout";
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
    desc: "EMS, microcurrent and thermal. Face and neck.",
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

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";

/**
 * Prices come from the Storefront API so US visitors resolve to USD, and that
 * fetch cannot run during prerender.
 *
 * This file used to seed the EUR home-market list prices so the prerendered
 * HTML always carried an amount. That was reverted on 2026-08-01 (operator
 * decision): market.ts serves USD to the US, so a seed shows €399 to a US
 * visitor — and permanently, not for one paint frame, whenever the fetch fails.
 * Never showing a wrong currency wins over always showing a number.
 *
 * The original objection to seeding `null` was that the hero CTA degraded to
 * "Claim the System — " with no amount. That is fixed properly here: callers
 * omit the whole price segment while it is null, so the button reads a clean
 * "Claim the System" and gains "— $399" once the live figure lands.
 *
 * Trade-off accepted: the prerendered HTML carries no price, so crawlers read
 * the catalog from llms.txt / products.md instead of this page.
 */

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

  // null until the live, market-correct figure resolves; every caller omits its
  // element while null so nothing renders a dangling "—" or a bare "save ".
  const fmt = (n?: number): string | null => (typeof n === "number" ? formatMoney(n, currency) : null);

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
    window.location.href = buyUrl(CHECKOUT_PERMALINK);
  }

  return (
    <PageShell
      title="The System · All three instruments | Zential Pure"
      description="The Face Introducer, Restoration Belt and Restoration Mat — all three instruments, one purchase. €399 founding bundle. 30-day money-back guarantee and a 1-year warranty."
      canonical="https://zentialpure.com/instruments/the-system"
      hideHero
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white text-[#141414]">
        <div className={`${WRAP} py-[clamp(72px,11vw,128px)]`}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
            <span className="tabular-nums opacity-55">( 00 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The System
          </p>
          <h1 className="my-[22px] max-w-[16ch] font-sans font-light tracking-[-0.03em] leading-[1.02] text-[#141414] text-[clamp(42px,6vw,84px)]">
            All three instruments.
            <br />
            The whole day,{" "}
            <span className="text-[#0E7A54]">covered.</span>
          </h1>
          <p className="max-w-[540px] text-[17px] leading-[1.75] text-[#5A5A5A]">
            Face in the morning, body after the work, full rest at night. The
            complete protocol, in one purchase.
          </p>

          {/* ── PRICE CARD ── */}
          <div className="mt-[42px] max-w-[480px] rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-[clamp(28px,3vw,44px)] shadow-[0_18px_50px_rgba(20,20,20,0.06)]">
            {fmt(componentSum || undefined) && (
              <div className="font-sans text-[12px] text-[#8E8E8E] line-through">
                {fmt(componentSum || undefined)}
              </div>
            )}
            {fmt(bundlePrice ?? undefined) && (
              <div className="mt-1 font-sans font-light tracking-[-0.02em] tabular-nums text-[56px] leading-none text-[#141414]">
                {fmt(bundlePrice ?? undefined)}
              </div>
            )}
            <div className="mt-1 font-sans text-[15px] font-medium text-[#0E7A54]">
              Founding bundle{fmt(savings ?? undefined) && <> · save {fmt(savings ?? undefined)}</>}
            </div>
            <button
              onClick={claim}
              disabled={busy}
              className="mt-6 w-full rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[13px] font-medium tracking-[0.04em] text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-60"
            >
              {busy ? "Adding the System…" : "Claim the System"}
            </button>
            <p className="mt-3 text-center font-sans text-[11px] text-[#8E8E8E]">
              30-day money-back guarantee, then a 1-year warranty, on every instrument.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(76px,10vw,120px)] text-[#141414]">
        <div className={WRAP}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
            <span className="tabular-nums opacity-55">( 01 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            What's included
          </p>
          <h2 className="mt-5 font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#141414]">
            Three instruments. Six inputs.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-[#5A5A5A]">
            Each instrument works alone — together they cover the whole day. EMS,
            microcurrent, thermal, red light, near-infrared, and
            far-infrared. The complete protocol, in one purchase.
          </p>
          <div className="mt-10 space-y-6">
            {INSTRUMENTS.map((inst) => (
              <a
                key={inst.href}
                href={inst.href}
                className="group flex flex-col gap-2 rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-6 transition-colors hover:border-[#0E7A54]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-sans font-medium text-[18px] tracking-[-0.01em] text-[#141414] group-hover:text-[#0E7A54]">
                    {inst.name}
                  </span>
                  <span className="shrink-0 tabular-nums font-sans font-medium text-[16px] text-[#141414]">
                    {fmt(instrumentPrices[inst.handle])}
                  </span>
                </div>
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-[#8E8E8E]">
                  {inst.time}
                </span>
                <p className="text-[14px] leading-[1.65] text-[#5A5A5A]">
                  {inst.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE RITUAL ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,112px)] text-[#141414]">
        <div className={WRAP}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
            <span className="tabular-nums opacity-55">( 02 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            The daily sequence
          </p>
          <h2 className="mt-5 max-w-[18ch] font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#141414]">
            One ordinary day, covered.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "Morning",
                time: "12 minutes",
                with: "The Face Introducer",
                body: "EMS and microcurrent lift while the coffee brews, thermal follows — twelve minutes, your own hands, before you even leave the house.",
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
                className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-[clamp(24px,3vw,36px)]"
              >
                <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#0E7A54]">
                  {step.n}
                </span>
                <div className="mt-3 font-sans font-medium text-[19px] tracking-[-0.01em] leading-snug text-[#141414]">
                  {step.with}
                </div>
                <span className="mt-1.5 block font-sans text-[11px] text-[#8E8E8E]">
                  {step.time}
                </span>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#5A5A5A]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="bg-[#F4FBF8] py-[clamp(64px,8vw,96px)] text-[#141414]">
        <div className={`${WRAP} max-w-[720px] text-center`}>
          <p className="inline-flex items-center gap-[14px] font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
            <span className="tabular-nums opacity-55">( 03 )</span>
            <span className="inline-block h-px w-[26px] bg-current opacity-40" />
            Guarantee
          </p>
          <h2 className="mt-5 font-sans font-light tracking-[-0.025em] text-[clamp(28px,3.4vw,42px)] leading-[1.1]">
            Thirty days, all three instruments.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#5A5A5A]">
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
                // "B.V." removed 2026-08-01: the Handelsregister record (KvK 96597569,
                // read live) shows the rechtsvorm is an eenmanszaak, not a besloten
                // vennootschap. Inviting customers to look us up while stating a legal
                // form we do not hold is the worst version of that error. The KvK
                // number is the verifiable fact and does the same trust work.
                title: "Registered Dutch business",
                body: "Zential Pure, KvK 96597569 — look us up in the Dutch business register. Real business, real address, real support.",
              },
              {
                title: "1-Year Warranty",
                body: "Every instrument covered for twelve months from delivery against manufacturing defects and failure in normal use. We cover shipping both ways. No registration required.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-6">
                <h3 className="font-sans text-[13px] font-medium tracking-[0.04em] text-[#141414]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.65] text-[#5A5A5A]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,112px)] text-[#141414]">
        <div className={`${WRAP} text-center`}>
          <h2 className="font-sans font-light tracking-[-0.025em] text-[clamp(28px,4vw,48px)] leading-[1.08]">
            The System
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] text-[#5A5A5A]">
            Three instruments, one purchase. Founding bundle price held for the
            first hundred.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={claim}
              disabled={busy}
              className="rounded-full bg-[#2ED8A8] px-10 py-5 font-sans text-[14px] font-medium tracking-[0.04em] text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-60"
            >
              {busy
                ? "Adding the System…"
                : "Claim the System" + (fmt(bundlePrice ?? undefined) ? ` — ${fmt(bundlePrice ?? undefined)}` : "")}
            </button>
          </div>
          <p className="mt-4 text-center font-sans text-[11px] text-[#8E8E8E]">
            30-day money-back guarantee, then a 1-year warranty. Ships in 2–3 working days. Tracked to your door.
          </p>
        </div>
      </section>
    </PageShell>
  );
}