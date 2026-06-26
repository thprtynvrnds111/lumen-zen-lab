import { useState } from "react";
import { safeCheckoutUrl } from "@/lib/checkout";

/**
 * "The System" — all three instruments in one purchase. Backed by a real Shopify
 * bundle product (SKU ZP-SYSTEM-BUNDLE, €499) and sold through a Shopify cart
 * permalink, so checkout works end-to-end without a discount-code scope.
 *
 * Fulfilment note: an order for this bundle is one line item — ship all three
 * instruments (Face Introducer + Restoration Belt + Restoration Mat) and adjust
 * component inventory manually. To change the price, edit the bundle product in
 * Shopify admin and update BUNDLE_PRICE here.
 */

const SYSTEM = [
  { name: "The Face Introducer", price: 88, to: "/instruments/face-introducer" },
  { name: "The Restoration Belt", price: 280, to: "/instruments/restoration-belt" },
  { name: "The Restoration Mat", price: 220, to: "/instruments/restoration-mat" },
];

const FULL_PRICE = SYSTEM.reduce((s, i) => s + i.price, 0); // €588
const BUNDLE_PRICE = 499;

// Live Shopify bundle variant (product: the-system-founding-bundle).
const BUNDLE_VARIANT_ID = "53870945567063";
const CHECKOUT_BASE = "https://checkout.zentialpure.com";
const BUNDLE_PERMALINK = `${CHECKOUT_BASE}/cart/${BUNDLE_VARIANT_ID}:1`;

const WRAP = "mx-auto w-[min(1180px,92vw)]";

export function SystemBundle() {
  const [busy, setBusy] = useState(false);

  function claimSystem() {
    if (busy) return;
    setBusy(true);
    const w = window as unknown as { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };
    if (w.fbq) w.fbq("track", "AddToCart", { content_name: "The System Bundle", value: BUNDLE_PRICE, currency: "EUR" });
    if (w.gtag) w.gtag("event", "add_to_cart", { item_name: "The System Bundle", value: BUNDLE_PRICE, currency: "EUR" });
    window.location.href = safeCheckoutUrl(BUNDLE_PERMALINK);
  }

  const hasFounding = true;

  return (
    <section className="bg-[#1A1714] py-[clamp(72px,10vw,116px)] text-[#F7F4F0]">
      <div className={WRAP}>
        <div className="grid items-center gap-10 rounded-[16px] border border-[rgba(247,244,240,0.10)] bg-[#070A0E] p-[clamp(28px,4vw,56px)] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#2ED8A8]">The System</div>
            <h2 className="mt-4 font-serif italic font-normal text-[clamp(28px,3.6vw,44px)] leading-[1.08] text-[#F7F4F0]">
              All three instruments. The whole day, covered.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-[#F7F4F0]/[0.62]">
              Face in the morning, body after the work, full rest at night. The complete protocol, in one purchase.
            </p>
            <ul className="mt-6 space-y-2.5">
              {SYSTEM.map((i) => (
                <li key={i.to} className="flex items-center justify-between border-b border-[rgba(247,244,240,0.08)] pb-2.5 font-sans text-[13px]">
                  <a href={i.to} className="text-[#F7F4F0]/80 hover:text-[#2ED8A8]">{i.name}</a>
                  <span className="tabular-nums text-[#F7F4F0]/55">€{i.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-[rgba(247,244,240,0.10)] bg-[#1A1714] p-[clamp(26px,3vw,40px)]">
            {hasFounding ? (
              <>
                <div className="font-sans text-[12px] text-[#F7F4F0]/45 line-through">€{FULL_PRICE}</div>
                <div className="mt-1 font-serif italic text-[56px] leading-none text-[#F7F4F0]">€{BUNDLE_PRICE}</div>
                <div className="mt-1 font-serif italic text-[18px] text-[#C6A07C]">Founding bundle · save €{FULL_PRICE - (BUNDLE_PRICE as number)}</div>
              </>
            ) : (
              <>
                <div className="font-serif italic text-[56px] leading-none text-[#F7F4F0]">€{FULL_PRICE}</div>
                <div className="mt-1 font-serif italic text-[18px] text-[#C6A07C]">All three · once</div>
              </>
            )}
            <button
              onClick={claimSystem}
              disabled={busy}
              className="mt-6 w-full rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[13px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Adding the System…" : "Claim the System"}
            </button>
            <p className="mt-3 text-center font-sans text-[11px] text-[#F7F4F0]/45">30-day protocol guarantee on every instrument.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
