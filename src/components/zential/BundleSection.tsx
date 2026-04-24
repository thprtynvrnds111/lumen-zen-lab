import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { Loader2, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface BundleProduct { handle: string; name: string; }
interface Bundle {
  title: string;
  tagline: string;
  items: BundleProduct[];
  price: string;
  originalPrice?: string;
  savePercent: string;
  saveAmount: string;
  highlight: boolean;
  ritualNote: string;
}

const bundles: Bundle[] = [
  {
    title: "The Essential",
    tagline: "Begin the practice",
    items: [{ handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" }],
    price: "€112",
    savePercent: "",
    saveAmount: "",
    highlight: false,
    ritualNote: "Device only · For those who already have their conductive base",
  },
  {
    title: "The Ritual",
    tagline: "Most chosen",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Conductive Gel" },
    ],
    price: "€137",
    originalPrice: "€147",
    savePercent: "Save 7%",
    saveAmount: "€10 off",
    highlight: true,
    ritualNote: "Everything you need to begin tonight · Ships ready-to-use",
  },
  {
    title: "The Pro",
    tagline: "Full protocol",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Conductive Gel" },
      { handle: "collagen-eye-mask", name: "PDRN Recovery Mask" },
    ],
    price: "€161",
    originalPrice: "€185",
    savePercent: "Save 13%",
    saveAmount: "€24 off",
    highlight: false,
    ritualNote: "Layered ritual · Best for visible results in 4 weeks",
  },
];

export function BundleSection() {
  const [loadingBundle, setLoadingBundle] = useState<string | null>(null);
  const [addedBundle, setAddedBundle] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const ref = useScrollReveal<HTMLElement>();

  const handleAddBundle = async (bundle: Bundle) => {
    setLoadingBundle(bundle.title);
    try {
      for (let i = 0; i < bundle.items.length; i++) {
        const bundleProduct = bundle.items[i];
        const product = await fetchProductByHandle(bundleProduct.handle);
        if (!product) { toast.error(`Could not find ${bundleProduct.name}`); continue; }
        const variant = product.variants.edges[0]?.node;
        if (!variant) continue;
        const itemPrice = i === 0
          ? { amount: bundle.price.replace("€", ""), currencyCode: "EUR" }
          : { amount: "0.00", currencyCode: "EUR" };
        await addItem({
          product,
          variantId: variant.id, variantTitle: variant.title, price: itemPrice, quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        });
      }
      setAddedBundle(bundle.title);
      toast.success(`${bundle.title} added to your ritual`, { position: "top-center" });
      setTimeout(() => setAddedBundle(null), 2000);
    } catch (e) {
      console.error("Failed to add bundle:", e);
      toast.error("Something went wrong. Please try again.");
    } finally { setLoadingBundle(null); }
  };

  return (
    <section
      ref={ref}
      id="bundles"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
      style={{ backgroundColor: '#FBF8F4' }}
    >
      {/* Editorial header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Build Your Ritual —</p>
        <h2 className="font-serif italic text-[34px] md:text-[48px] leading-[1.05] text-foreground tracking-tight mb-5">
          Three ways to begin.
        </h2>
        <p className="text-[15px] text-foreground/65 leading-relaxed">
          Each tier is a complete protocol — not an upsell. Choose the depth of practice that matches your skin's current chapter.
        </p>
      </div>

      {/* Bundle grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
        {bundles.map(b => {
          const isLoading = loadingBundle === b.title;
          const isAdded = addedBundle === b.title;
          return (
            <div
              key={b.title}
              className={`relative rounded-2xl p-8 md:p-9 transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                b.highlight
                  ? 'bg-[#2A211A] text-[#F7F1E8] shadow-2xl md:scale-[1.03]'
                  : 'bg-white border border-[#E8DDD0] hover:shadow-xl'
              }`}
            >
              {b.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full bg-[#C6A07C] text-white">
                  Most Chosen
                </span>
              )}

              {/* Tier label */}
              <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${b.highlight ? 'text-[#C6A07C]' : 'text-foreground/50'}`}>
                — {b.tagline} —
              </p>

              {/* Title */}
              <h3 className={`font-serif italic text-[28px] md:text-[32px] leading-[1] mb-6 ${b.highlight ? 'text-[#F7F1E8]' : 'text-foreground'}`}>
                {b.title}
              </h3>

              {/* Items list */}
              <ul className="space-y-3 mb-8 min-h-[108px]">
                {b.items.map((item, idx) => (
                  <li key={item.handle} className="flex items-start gap-3">
                    {idx > 0 && (
                      <Plus
                        size={12}
                        className={`mt-1.5 ${b.highlight ? 'text-[#C6A07C]' : 'text-[#9B5A2E]'}`}
                      />
                    )}
                    {idx === 0 && (
                      <span className={`mt-2 w-1 h-1 rounded-full ${b.highlight ? 'bg-[#C6A07C]' : 'bg-[#9B5A2E]'}`} />
                    )}
                    <span className={`text-sm ${b.highlight ? 'text-[#F7F1E8]/85' : 'text-foreground/80'}`}>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className={`h-px w-full mb-6 ${b.highlight ? 'bg-[#F7F1E8]/15' : 'bg-foreground/10'}`} />

              {/* Price block */}
              <div className="mb-2 flex items-baseline gap-3">
                <span className={`font-serif text-[36px] leading-none ${b.highlight ? 'text-[#F7F1E8]' : 'text-foreground'}`}>
                  {b.price}
                </span>
                {b.originalPrice && (
                  <span className={`text-sm line-through ${b.highlight ? 'text-[#F7F1E8]/40' : 'text-foreground/40'}`}>
                    {b.originalPrice}
                  </span>
                )}
              </div>
              {b.saveAmount ? (
                <p className={`text-xs tracking-[0.15em] uppercase mb-6 ${b.highlight ? 'text-[#C6A07C]' : 'text-[#9B5A2E]'}`}>
                  {b.saveAmount}
                </p>
              ) : (
                <p className="text-xs text-foreground/40 mb-6">One-time purchase</p>
              )}

              {/* Ritual note */}
              <p className={`text-[11px] leading-relaxed mb-7 mt-auto ${b.highlight ? 'text-[#F7F1E8]/55' : 'text-foreground/50'}`}>
                {b.ritualNote}
              </p>

              {/* CTA */}
              <button
                onClick={() => handleAddBundle(b)}
                disabled={isLoading}
                className={`w-full py-4 text-[11px] tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-50 ${
                  b.highlight
                    ? 'bg-[#F7F1E8] text-[#2A211A] hover:bg-white'
                    : 'bg-[#2A211A] text-[#F7F1E8] hover:bg-[#1A1714]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={13} />Adding</span>
                ) : isAdded ? (
                  <span className="flex items-center justify-center gap-2"><Check size={13} />Added to Ritual</span>
                ) : "Begin This Ritual"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom reassurance */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] tracking-[0.25em] uppercase text-foreground/55">
        <span>Free EU Shipping</span>
        <span className="hidden md:inline w-1 h-1 rounded-full bg-foreground/20" />
        <span>30-Day Guarantee</span>
        <span className="hidden md:inline w-1 h-1 rounded-full bg-foreground/20" />
        <span>2-Year Warranty</span>
      </div>
    </section>
  );
}
