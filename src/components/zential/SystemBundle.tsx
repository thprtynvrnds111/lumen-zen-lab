import { useEffect, useState } from "react";
import { buyUrl } from "@/lib/checkout";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { trackAddToCart } from "@/lib/google-tracking";

/**
 * "The System" — all three instruments in one purchase. Backed by a real Shopify
 * bundle product (SKU ZP-SYSTEM-BUNDLE) and sold through a Shopify cart
 * permalink, so checkout works end-to-end without a discount-code scope.
 *
 * Prices are API-driven: the bundle price, the per-instrument line items, and
 * the struck-through "sum of parts" all come from the live Shopify (@inContext)
 * price so the card renders whatever Shopify says, in the visitor's own currency.
 * No hardcoded euro amounts — an em-dash shows until the live price resolves.
 *
 * Fulfilment note: an order for this bundle is one line item — ship all three
 * instruments (Face Introducer + Restoration Belt + Restoration Mat) and adjust
 * component inventory manually. To change the price, edit the bundle product in
 * Shopify admin; this component reflects it automatically.
 */

const SYSTEM = [
  { name: "The Face Introducer", handle: "face-introducer", to: "/instruments/face-introducer" },
  { name: "The Restoration Belt", handle: "restoration-belt", to: "/instruments/restoration-belt" },
  { name: "The Restoration Mat", handle: "the-restoration-mat", to: "/instruments/restoration-mat" },
];

const BUNDLE_HANDLE = "the-system-founding-bundle";

// Live Shopify bundle variant (product: the-system-founding-bundle).
const BUNDLE_VARIANT_ID = "53870945567063";
const CHECKOUT_BASE = "https://checkout.zentialpure.com";
const BUNDLE_PERMALINK = `${CHECKOUT_BASE}/cart/${BUNDLE_VARIANT_ID}:1`;

const WRAP = "mx-auto w-[min(1180px,92vw)]";

export function SystemBundle() {
  const [busy, setBusy] = useState(false);
  // Live prices keyed by Shopify handle, plus the market currency they resolved
  // in. Deliberately NOT seeded with the EUR list prices: market.ts serves USD
  // to the US, so a seed renders €399 to a US visitor — and permanently if the
  // fetch fails. Operator decision 2026-08-01: never show a wrong currency, and
  // accept that the prerendered HTML carries no price. Callers omit the whole
  // price element until the live, market-correct figure resolves.
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    let active = true;
    [...SYSTEM.map((s) => s.handle), BUNDLE_HANDLE].forEach((handle) => {
      fetchProductByHandle(handle)
        .then((p) => {
          const priceObj = p?.variants?.edges?.[0]?.node?.price;
          const n = priceObj?.amount ? parseFloat(priceObj.amount) : NaN;
          if (active && !isNaN(n)) {
            setPrices((prev) => ({ ...prev, [handle]: Math.round(n) }));
            if (priceObj?.currencyCode) setCurrency(priceObj.currencyCode);
          }
        })
        .catch(() => {});
    });
    return () => { active = false; };
  }, []);

  const bundleAmount = prices[BUNDLE_HANDLE];
  const componentAmounts = SYSTEM.map((s) => prices[s.handle]);
  const allComponentsKnown = componentAmounts.every((a) => typeof a === "number");
  const fullAmount = allComponentsKnown ? componentAmounts.reduce((sum, a) => sum + a, 0) : undefined;
  const savingsAmount =
    typeof fullAmount === "number" && typeof bundleAmount === "number" ? fullAmount - bundleAmount : undefined;

  // null until the market-correct figure lands; every caller omits its element
  // while null so nothing renders a dangling "—" or a bare "save ".
  const fmt = (n?: number): string | null => (typeof n === "number" ? formatMoney(n, currency) : null);

  function claimSystem() {
    if (busy) return;
    setBusy(true);
    const w = window as unknown as { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };
    const priced = typeof bundleAmount === "number";
    if (w.fbq) w.fbq("track", "AddToCart", { content_name: "The System Bundle", ...(priced ? { value: bundleAmount, currency } : {}) });
    if (w.gtag) w.gtag("event", "add_to_cart", { item_name: "The System Bundle", ...(priced ? { value: bundleAmount, currency } : {}) });
    // Google Ads (dormant unless VITE_GOOGLE_ADS_ID is set)
    if (priced) trackAddToCart({ id: BUNDLE_HANDLE, name: "The System Bundle", price: bundleAmount, currency });
    window.location.href = buyUrl(BUNDLE_PERMALINK);
  }

  const hasFounding = true;

  return (
    <section className="border-t border-[rgba(20,20,20,0.10)] bg-white py-[clamp(72px,10vw,116px)] text-[#141414]">
      <div className={WRAP}>
        <div className="grid items-center gap-10 rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-[clamp(28px,4vw,56px)] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">The System</div>
            <h2 className="mt-4 font-sans font-light text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.025em] text-[#141414]">
              All three instruments. The whole day, covered.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-[#5A5A5A]">
              Face in the morning, body after the work, full rest at night. The complete protocol, in one purchase.
            </p>
            <ul className="mt-6 space-y-2.5">
              {SYSTEM.map((i) => (
                <li key={i.to} className="flex items-center justify-between border-b border-[rgba(20,20,20,0.10)] pb-2.5 font-sans text-[13px]">
                  <a href={i.to} className="text-[#141414] transition-colors hover:text-[#0E7A54]">{i.name}</a>
                  <span className="tabular-nums text-[#5A5A5A]">{fmt(prices[i.handle])}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-[clamp(26px,3vw,40px)]">
            {hasFounding ? (
              <>
                {fmt(fullAmount) && <div className="font-sans text-[12px] text-[#8E8E8E] line-through">{fmt(fullAmount)}</div>}
                {fmt(bundleAmount) && <div className="mt-1 font-sans font-light text-[56px] leading-none tracking-[-0.02em] text-[#141414]">{fmt(bundleAmount)}</div>}
                <div className="mt-1 font-sans text-[13px] font-medium tracking-[0.02em] text-[#0E7A54]">Founding bundle{fmt(savingsAmount) && <> · save {fmt(savingsAmount)}</>}</div>
              </>
            ) : (
              <>
                {fmt(fullAmount) && <div className="font-sans font-light text-[56px] leading-none tracking-[-0.02em] text-[#141414]">{fmt(fullAmount)}</div>}
                <div className="mt-1 font-sans text-[13px] font-medium tracking-[0.02em] text-[#0E7A54]">All three · once</div>
              </>
            )}
            <button
              onClick={claimSystem}
              disabled={busy}
              data-atc-beacon=""
              data-beacon-slug="the-system"
              data-beacon-placement="system-bundle"
              className="mt-6 w-full rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-60"
            >
              {busy ? "Adding the System…" : "Claim the System"}
            </button>
            <p className="mt-3 text-center font-sans text-[11px] text-[#8E8E8E]">30-day money-back guarantee on every instrument.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
