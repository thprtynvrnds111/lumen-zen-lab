import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";

/**
 * "The System" — all three instruments in one purchase. Adds the three SKUs to
 * the Shopify cart and sends the visitor to checkout.
 *
 * FOUNDING DISCOUNT: realising a bundle price below the €588 sum requires a real
 * Shopify discount. Create an automatic discount (or a code) that triggers on
 * the three-instrument combo, then set BUNDLE_CODE + BUNDLE_PRICE below. Until
 * then the bundle is honestly sold at the full combined price — no fake markdown.
 */

const SYSTEM = [
  { name: "The Face Introducer", price: 88, handle: "lifting-and-tightening-face-introducer", to: "/instruments/face-introducer" },
  { name: "The Restoration Belt", price: 280, handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device", to: "/instruments/restoration-belt" },
  { name: "The Restoration Mat", price: 220, handle: "household-red-light-charging-vibrating-red-light-therapy-mat", to: "/instruments/restoration-mat" },
];

const FULL_PRICE = SYSTEM.reduce((s, i) => s + i.price, 0); // €588

// Set to a real Shopify discount code (and the resulting price) to switch on
// founding bundle pricing. Leave BUNDLE_CODE empty to sell at full price.
const BUNDLE_CODE = "";
const BUNDLE_PRICE: number | null = null; // e.g. 499 once the Shopify discount exists

const WRAP = "mx-auto w-[min(1180px,92vw)]";

export function SystemBundle() {
  const addItem = useCartStore((s) => s.addItem);
  const [busy, setBusy] = useState(false);

  async function claimSystem() {
    if (busy) return;
    setBusy(true);
    try {
      for (const inst of SYSTEM) {
        const p = await fetchProductByHandle(inst.handle);
        const variant = p?.variants?.edges?.[0]?.node;
        if (!p || !variant) continue;
        await addItem({
          product: { node: p.node },
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        });
      }
      let url = useCartStore.getState().getCheckoutUrl();
      if (url && BUNDLE_CODE) {
        url += (url.includes("?") ? "&" : "?") + "discount=" + encodeURIComponent(BUNDLE_CODE);
      }
      if (url) window.location.href = url;
    } finally {
      setBusy(false);
    }
  }

  const hasFounding = BUNDLE_CODE && BUNDLE_PRICE != null;

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
                <li key={i.handle} className="flex items-center justify-between border-b border-[rgba(247,244,240,0.08)] pb-2.5 font-sans text-[13px]">
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
