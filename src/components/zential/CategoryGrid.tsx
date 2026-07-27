import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Canonical modality strings per handle (modality-naming-standard.md).
// Red Light Therapy only for the Belt/Mat. The Face Introducer is NOT a light-therapy
// device — its LED is a mode indicator, not a modality (operator-verified 2026-07-27).
const MODALITY_BY_HANDLE: Record<string, string> = {
  "lifting-and-tightening-face-introducer": "EMS · Microcurrent · Thermal",
  "electric-guasha-massager": "Microcurrent · Gua Sha",
  "electric-micro-current": "Daily Microcurrent",
  "facial-beauty-tools-and-ems-beauty-equipment": "Jaw Toning EMS",
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool":
    "Red Light Therapy · Microcurrent",
  "portable-ems-microcurrent-facial-beauty-device": "EMS · Microcurrent",
  "medicube-collagen-elastic-jelly-moisturizing-cream": "Conductive Gel",
  "collagen-eye-mask": "Under-Eye Collagen",
  "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "Red Light Therapy · NIR",
  "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": "Sequential Compression",
  "household-red-light-charging-vibrating-red-light-therapy-mat": "Red Light Therapy · Vibration",
  "the-restoration-mat": "Far-Infrared · Red Light Therapy",
  "red-light-therapy-belt-infrared-hot-compress-phototherapy": "Red Light Therapy · Thermal",
  "led-beauty-lamp-red-light-therapy-lamp-desktop-stand": "Red Light Therapy · Desktop",
  "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow":
    "Acupressure",
  "electric-foam-roller-muscle-relaxation-fitness-yoga-column": "Percussion · Vibration",
  "gravity-quilt-cotton-weighted-blanket": "Deep-Pressure · Weighted",
  "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers":
    "Blackout · Contoured",
  "white-noise-sleep-aid-machine": "White Noise · Sound",
  "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": "Thermal · Infrared",
};

export function CategoryGrid({ handles }: { handles: string[] }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    fetchProducts(50)
      .then((all) => {
        const byHandle = new Map(all.map((p) => [p.node.handle, p]));
        const ordered = handles
          .map((h) => byHandle.get(h))
          .filter((p): p is ShopifyProduct => Boolean(p));
        setProducts(ordered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [handles]);

  const handleAdd = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to bag", { position: "top-center" });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#1A1714]/30" size={26} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-[#1A1714]/50 text-sm py-10">
        Devices load from the live catalog.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => {
        const img = product.node.images.edges[0]?.node;
        const price = product.node.priceRange.minVariantPrice;
        const modality = MODALITY_BY_HANDLE[product.node.handle] || "";
        return (
          <Link
            key={product.node.id}
            to={`/product/${product.node.handle}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1A1714]/8 transition-all duration-500 hover:-translate-y-1 hover:border-[#1A1714]/20"
          >
            <div className="relative aspect-square bg-[#F3F0EC] overflow-hidden">
              {img && (
                <img
                  src={`${img.url}&width=600`}
                  srcSet={`${img.url}&width=300 300w, ${img.url}&width=600 600w`}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  alt={img.altText || product.node.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
            </div>
            <div className="flex flex-col flex-1 p-4 pt-3.5">
              {modality && (
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#9A958F] mb-1.5 leading-tight">
                  {modality}
                </p>
              )}
              <h3 className="font-[Lora] italic text-[17px] leading-tight text-[#1A1714] mb-3">
                {product.node.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-[15px] font-semibold text-[#1A1714]">
                  {formatMoney(price.amount, price.currencyCode)}
                </span>
                <button
                  onClick={(e) => handleAdd(e, product)}
                  disabled={isCartLoading}
                  aria-label={`Add ${product.node.title} to bag`}
                  className="w-9 h-9 rounded-full bg-[#1A1714] text-[#F7F4F0] grid place-items-center text-lg leading-none transition-colors duration-300 hover:bg-[#2ED8A8] hover:text-[#1A1714] disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
