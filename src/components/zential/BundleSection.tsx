import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

interface BundleProduct { handle: string; name: string; }
interface Bundle { title: string; subtitle: string; items: BundleProduct[]; price: string; savePercent: string; saveAmount: string; highlight: boolean; }

const bundles: Bundle[] = [
  {
    title: "Sculpt Wand",
    subtitle: "One-Time Purchase",
    items: [{ handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" }],
    price: "€112", savePercent: "", saveAmount: "", highlight: false,
  },
  {
    title: "Sculpt Wand Ritual Set",
    subtitle: "Device + Collagen Gel",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Gel" },
    ],
    price: "€137", savePercent: "16%", saveAmount: "€10", highlight: true,
  },
  {
    title: "Sculpt Wand Pro Set",
    subtitle: "Device + Collagen Gel + PDRN Mask",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Gel" },
      { handle: "collagen-eye-mask", name: "PDRN Mask" },
    ],
    price: "€161", savePercent: "20%", saveAmount: "€24", highlight: false,
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
      for (const bundleProduct of bundle.items) {
        const product = await fetchProductByHandle(bundleProduct.handle);
        if (!product) { toast.error(`Could not find ${bundleProduct.name}`); continue; }
        const variant = product.variants.edges[0]?.node;
        if (!variant) continue;
        await addItem({
          product: { node: product },
          variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1,
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
    <section ref={ref} id="bundles" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="text-center mb-14 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#9B5A2E' }}>Smart Bundles</p>
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground">Elevate Your Ritual</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
        {bundles.map(b => {
          const isLoading = loadingBundle === b.title;
          const isAdded = addedBundle === b.title;
          return (
            <div
              key={b.title}
              className="rounded-xl p-7 relative transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: b.highlight ? '#FAF7F3' : '#EFEBE5',
                border: b.highlight ? '2px solid #C6A07C' : '1px solid #E4DFD8',
              }}
            >
              {b.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase text-white px-4 py-1 rounded-full" style={{ backgroundColor: '#C6A07C' }}>
                  Best Value
                </span>
              )}
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">{b.title}</h3>
              <p className="text-xs text-foreground/50 mb-5">{b.subtitle}</p>
              <ul className="space-y-2 mb-6">
                {b.items.map(item => (
                  <li key={item.handle} className="text-sm text-foreground/70 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C6A07C' }} /> {item.name}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-bold text-foreground">{b.price}</span>
                {b.savePercent && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#C6A07C20', color: '#9B5A2E' }}>
                    Save {b.savePercent}
                  </span>
                )}
              </div>
              {b.saveAmount && <p className="text-xs font-medium mb-6" style={{ color: '#9B5A2E' }}>You save {b.saveAmount}</p>}
              {!b.saveAmount && <div className="mb-6" />}
              <button
                onClick={() => handleAddBundle(b)}
                disabled={isLoading}
                className={`w-full py-3 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 ${b.highlight ? 'text-white' : ''}`}
                style={{
                  backgroundColor: b.highlight ? '#C6A07C' : 'transparent',
                  border: b.highlight ? 'none' : '1px solid #C6A07C',
                  color: b.highlight ? '#fff' : '#9B5A2E',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={14} />Adding...</span>
                ) : isAdded ? (
                  <span className="flex items-center justify-center gap-2"><Check size={14} />Added!</span>
                ) : "Add Bundle"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
