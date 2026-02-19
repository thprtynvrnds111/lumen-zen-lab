import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

/* ── Per-product metadata for card display ── */
const cardMeta: Record<string, { tagline: string; benefits: string[] }> = {
  "body-lift": {
    tagline: "Microcurrent Lift for Daily Structure",
    benefits: ["Microcurrent Lift", "Red Light Therapy", "Lymphatic Activation"],
  },
  "lifting-and-tightening-face-introducer": {
    tagline: "Multi-Frequency Facial Sculptor",
    benefits: ["EMS Sculpting", "LED Therapy", "Ion Infusion"],
  },
  "eye-massage": {
    tagline: "Targeted Periorbital Microcurrent",
    benefits: ["Under-Eye Depuffing", "Red Light Repair", "Serum Penetration"],
  },
  "color-light-import-micro-current-vibration-massager": {
    tagline: "High-Frequency Skin Purifier",
    benefits: ["High Frequency", "Antibacterial", "Collagen Boost"],
  },
  "electric-guasha-massager": {
    tagline: "Microcurrent Gua Sha Sculpting",
    benefits: ["Sculpting Contour", "Microcurrent", "Lymphatic Drainage"],
  },
  "sculpt-wand": {
    tagline: "Precision Sculpting Wand",
    benefits: ["Facial Sculpting", "Microcurrent", "Sonic Vibration"],
  },
  "microcurrent-sculpt-wand": {
    tagline: "Advanced Microcurrent Roller",
    benefits: ["Deep Stimulation", "Facial Toning", "Serum Boost"],
  },
  "frame-pulse-activator": {
    tagline: "3D Orbital Light Therapy",
    benefits: ["Red Light", "Eye Contour", "Hands-Free Design"],
  },
  "skin-pulse": {
    tagline: "Deep Pulse Skin Renewal",
    benefits: ["Pulse Technology", "Collagen Support", "Skin Density"],
  },
  "medicube-collagen-elastic-jelly-moisturizing-cream": {
    tagline: "Device-Optimised Conductive Gel",
    benefits: ["Collagen Peptides", "Deep Hydration", "Conductivity"],
  },
  "medicube-pdrn-collagen-eye-zone-mask": {
    tagline: "PDRN-Infused Eye Recovery Pads",
    benefits: ["PDRN Complex", "Eye Zone Care", "Collagen Boost"],
  },
};

const defaultMeta = {
  tagline: "Professional-Grade Skincare",
  benefits: ["Clinical Results", "Daily Ritual", "Premium Build"],
};

export function DevicesSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    fetchProducts(12).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleAdd = async (product: ShopifyProduct) => {
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
    toast.success("Added to your ritual", { position: "top-center" });
  };

  return (
    <section id="devices" className="section-padding">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Signature Collection</p>
        <h2 className="text-3xl md:text-5xl font-semibold text-balance">Your Devices</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" size={32} /></div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => {
            const img = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const productUrl = `/product/${product.node.handle}`;
            const meta = cardMeta[product.node.handle] || defaultMeta;

            return (
              <div key={product.node.id} className="group glass-card overflow-hidden flex flex-col">
                {/* Image */}
                <Link to={productUrl} className="block aspect-square relative overflow-hidden bg-secondary/30">
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <Link to={productUrl}>
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground italic mb-4 line-clamp-1">
                    {meta.tagline}
                  </p>

                  {/* Benefit Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {meta.benefits.map(b => (
                      <span
                        key={b}
                        className="text-[10px] tracking-[0.08em] uppercase font-medium text-muted-foreground bg-secondary/60 px-2.5 py-1 rounded-full"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA — pushed to bottom */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      <span className="text-sm font-semibold mr-0.5">
                        {price.currencyCode === "EUR" ? "€" : price.currencyCode}
                      </span>
                      {parseFloat(price.amount).toFixed(2)}
                    </span>
                    <Button variant="ritual" size="sm" onClick={() => handleAdd(product)} disabled={isCartLoading}>
                      Add to Ritual
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
