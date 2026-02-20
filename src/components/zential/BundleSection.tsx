import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface BundleProduct {
  handle: string;
  name: string;
}

interface Bundle {
  title: string;
  subtitle: string;
  items: BundleProduct[];
  price: string;
  originalPrice: string;
  save: string;
  highlight: boolean;
}

const bundles: Bundle[] = [
  {
    title: "Sculpt Wand",
    subtitle: "One-Time Purchase",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
    ],
    price: "€69",
    originalPrice: "€69",
    save: "",
    highlight: false,
  },
  {
    title: "Sculpt Wand Ritual Set",
    subtitle: "Device + Collagen Gel",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Gel" },
    ],
    price: "€79",
    originalPrice: "€94",
    save: "16%",
    highlight: true,
  },
  {
    title: "Sculpt Wand Pro Set",
    subtitle: "Device + Collagen Gel + PDRN Mask",
    items: [
      { handle: "facial-beauty-tools-and-ems-beauty-equipment", name: "Sculpt Wand" },
      { handle: "medicube-collagen-elastic-jelly-moisturizing-cream", name: "Collagen Gel" },
      { handle: "collagen-eye-mask", name: "PDRN Mask" },
    ],
    price: "€93",
    originalPrice: "€117",
    save: "20%",
    highlight: false,
  },
];

export function BundleSection() {
  const [loadingBundle, setLoadingBundle] = useState<string | null>(null);
  const [addedBundle, setAddedBundle] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  const handleAddBundle = async (bundle: Bundle) => {
    setLoadingBundle(bundle.title);
    try {
      for (const bundleProduct of bundle.items) {
        const product = await fetchProductByHandle(bundleProduct.handle);
        if (!product) {
          toast.error(`Could not find ${bundleProduct.name}`);
          continue;
        }
        const variant = product.variants.edges[0]?.node;
        if (!variant) continue;

        await addItem({
          product: { node: product },
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        });
      }
      setAddedBundle(bundle.title);
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
    <section id="bundles" className="section-padding gradient-pearl">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Smart Bundles</p>
        <h2 className="text-3xl md:text-5xl font-semibold">Elevate Your Ritual.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {bundles.map(b => {
          const isLoading = loadingBundle === b.title;
          const isAdded = addedBundle === b.title;
          return (
            <div key={b.title} className={`glass-card p-8 relative ${b.highlight ? 'ring-2 ring-primary/30' : ''}`}>
              {b.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1 rounded-full">
                  Best Value
                </span>
              )}
              <h3 className="font-semibold text-lg mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{b.subtitle}</p>
              <ul className="space-y-2 mb-6">
                {b.items.map(item => (
                  <li key={item.handle} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" /> {item.name}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold">{b.price}</span>
                {b.save && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">{b.originalPrice}</span>
                    <span className="text-xs bg-emerald text-emerald-foreground px-2 py-0.5 rounded-full font-semibold">
                      Save {b.save}
                    </span>
                  </>
                )}
              </div>
              <Button
                variant={b.highlight ? "ritual" : "outline-ritual"}
                className="w-full"
                onClick={() => handleAddBundle(b)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin mr-2" size={14} />Adding...</>
                ) : isAdded ? (
                  <><Check size={14} className="mr-2" />Added!</>
                ) : (
                  "Add Bundle"
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
