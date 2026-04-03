import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

export function DevicesSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);
  const ref = useScrollReveal<HTMLElement>();

  const HIDDEN_HANDLES = ["medicube-collagen-elastic-jelly-moisturizing-cream", "collagen-eye-mask"];

  const SUBTITLES: Record<string, string> = {
    "body-lift": "Lift, firm and smooth skin",
    "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": "Light therapy for brighter, rested eyes",
    "electric-guasha-massager": "Microcurrent sculpting Gua Sha facial",
    "electric-micro-current": "Daily microcurrent toning for lifted contours",
    "eye-massage": "Targeted microcurrent and light for tired eyes",
    "color-light-import-micro-current-vibration-massager": "Full-face frequency facial for glow and clarity",
    "facial-beauty-tools-and-ems-beauty-equipment": "Precision contour wand for cheek and jaw lift",
    "lifting-and-tightening-face-introducer": "Deep infusion for plump, hydrated skin",
  };

  const SORT_ORDER = [
    "lifting-and-tightening-face-introducer",
    "body-lift",
    "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
    "facial-beauty-tools-and-ems-beauty-equipment",
    "electric-guasha-massager",
    "eye-massage",
    "electric-micro-current",
    "color-light-import-micro-current-vibration-massager",
  ];

  useEffect(() => {
    fetchProducts(12).then(p => {
      const filtered = p.filter(pr => !HIDDEN_HANDLES.includes(pr.node.handle));
      filtered.sort((a, b) => {
        const idxA = SORT_ORDER.indexOf(a.node.handle);
        const idxB = SORT_ORDER.indexOf(b.node.handle);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      });
      setProducts(filtered);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
    toast.success("Added to your ritual", { position: "top-center" });
  };

  return (
    <section ref={ref} id="devices" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="text-center mb-14 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#9B5A2E' }}>The Collection</p>
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground">Our Devices</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-foreground/30" size={28} /></div>
      ) : products.length === 0 ? (
        <p className="text-center text-foreground/50 text-sm">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          {products.map(product => {
            const img = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const productUrl = `/product/${product.node.handle}`;

            return (
              <Link
                key={product.node.id}
                to={productUrl}
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8', minHeight: 460 }}
              >
                <div className="relative flex-[3] overflow-hidden">
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <div className="flex-1 flex flex-col justify-between p-6">
                  <h3 className="text-xs tracking-[0.15em] uppercase font-medium text-foreground leading-snug mb-1">
                    {product.node.title}
                  </h3>
                  <p className="text-[11px] text-foreground/50 leading-relaxed line-clamp-1 mb-4">
                    {SUBTITLES[product.node.handle] || "Professional-grade skincare technology"}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-foreground">
                      {price.currencyCode === "EUR" ? "€" : price.currencyCode}{parseFloat(price.amount).toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      disabled={isCartLoading}
                      className="text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-md hover:scale-105 disabled:opacity-50"
                      style={{ backgroundColor: '#C6A07C' }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
