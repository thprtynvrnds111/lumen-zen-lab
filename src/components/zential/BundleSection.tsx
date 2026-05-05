import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { Loader2, Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Real Shopify prices (verified via Storefront API)
const DEVICE_PRICE = 88;
const GEL_PRICE = 18;
const MASK_PRICE = 18;

interface BundleItem { handle: string; name: string; }
interface Bundle {
  key: string;
  title: string;
  tagline: string;
  items: BundleItem[];
  total: number;
  highlight: boolean;
  ritualNote: string;
}

// Face Introducer is the hero instrument — highest conversion potential
const bundles: Bundle[] = [
  {
    key: "essential",
    title: "The Essential",
    tagline: "Begin the practice",
    items: [{ handle: "lifting-and-tightening-face-introducer", name: "Face Introducer" }],
    total: DEVICE_PRICE,
    highlight: false,
    ritualNote: "Device only · For those who already have their conductive base",
  },
  {
    key: "ritual",
    title: "The Ritual",
    tagline: "Most chosen",
    items: [
      { handle: "lifting-and-tightening-face-introducer", name: "Face Introducer" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Conductive Gel" },
    ],
    total: DEVICE_PRICE + GEL_PRICE,
    highlight: true,
    ritualNote: "Everything you need to begin tonight · Ships ready-to-use",
  },
  {
    key: "pro",
    title: "The Pro",
    tagline: "Full protocol",
    items: [
      { handle: "lifting-and-tightening-face-introducer", name: "Face Introducer" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Conductive Gel" },
      { handle: "collagen-eye-mask", name: "PDRN Recovery Pads" },
    ],
    total: DEVICE_PRICE + GEL_PRICE + MASK_PRICE,
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
    setLoadingBundle(bundle.key);
    try {
      for (const bundleItem of bundle.items) {
        const fetched = await fetchProductByHandle(bundleItem.handle);
        const raw = fetched?.node;
        if (!raw) { toast.error(`Could not find ${bundleItem.name}`); continue; }
        const variant = raw.variants?.edges?.[0]?.node;
        if (!variant) { toast.error(`No variant for ${bundleItem.name}`); continue; }
        await addItem({
          product: { node: raw },
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        });
      }
      setAddedBundle(bundle.key);
      toast.success(`${bundle.title} added to your ritual`, { position: "top-center" });
      setTimeout(() => setAddedBundle(null), 2000);
    } catch (e) {
      console.error("Failed to add bundle:", e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingBundle(null);
    }
  };

  return (
    <section
      ref={ref}
      id="bundles"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32"
      style={{ backgroundColor: '#FBF8F4' }}
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Begin with the Face Introducer —</p>
        <h2 className="font-serif italic text-[34px] md:text-[48px] leading-[1.05] text-foreground tracking-tight mb-5">
          Three ways to begin.
        </h2>
        <p className="text-[15px] text-foreground/65 leading-relaxed">
          Each tier is a complete protocol — not an upsell. Choose the depth of practice that matches your skin's current chapter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
        {bundles.map(b => {
          const isLoading = loadingBundle === b.key;
          const isAdded = addedBundle === b.key;
          return (
            <div
              key={b.key}
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

              <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${b.highlight ? 'text-[#C6A07C]' : 'text-foreground/50'}`}>
                — {b.tagline} —
              </p>

              <h3 className={`font-serif italic text-[28px] md:text-[32px] leading-[1] mb-6 ${b.highlight ? 'text-[#F7F1E8]' : 'text-foreground'}`}>
                {b.title}
              </h3>

              <ul className="space-y-3 mb-8 min-h-[108px]">
                {b.items.map((item, idx) => (
                  <li key={item.handle} className="flex items-start gap-3">
                    {idx > 0 ? (
                      <Plus size={12} className={`mt-1.5 flex-shrink-0 ${b.highlight ? 'text-[#C6A07C]' : 'text-[#9B5A2E]'}`} />
                    ) : (
                      <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${b.highlight ? 'bg-[#C6A07C]' : 'bg-[#9B5A2E]'}`} />
                    )}
                    <span className={`text-sm ${b.highlight ? 'text-[#F7F1E8]/85' : 'text-foreground/80'}`}>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={`h-px w-full mb-6 ${b.highlight ? 'bg-[#F7F1E8]/15' : 'bg-foreground/10'}`} />

              <div className="mb-2">
                <span className={`font-serif text-[36px] leading-none ${b.highlight ? 'text-[#F7F1E8]' : 'text-foreground'}`}>
                  €{b.total}
                </span>
              </div>
              <p className={`text-xs mb-6 ${b.highlight ? 'text-[#F7F1E8]/40' : 'text-foreground/40'}`}>
                {b.items.length === 1 ? 'One-time purchase' : `${b.items.length} items · Free EU shipping`}
              </p>

              <p className={`text-[11px] leading-relaxed mb-7 mt-auto ${b.highlight ? 'text-[#F7F1E8]/55' : 'text-foreground/50'}`}>
                {b.ritualNote}
              </p>

              <button
                onClick={() => handleAddBundle(b)}
                disabled={isLoading || isAdded}
                className={`w-full py-4 text-[11px] tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-50 ${
                  b.highlight
                    ? 'bg-[#F7F1E8] text-[#2A211A] hover:bg-white'
                    : 'bg-[#2A211A] text-[#F7F1E8] hover:bg-[#1A1714]'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={13} /> Adding
                  </span>
                ) : isAdded ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={13} /> Added to Ritual
                  </span>
                ) : "Begin This Ritual"}
              </button>
            </div>
          );
        })}
      </div>

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
