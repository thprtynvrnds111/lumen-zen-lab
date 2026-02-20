import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, Star } from "lucide-react";

export function DevicesSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);

  const HIDDEN_HANDLES = ["medicube-collagen-elastic-jelly-moisturizing-cream", "collagen-eye-mask"];

  useEffect(() => {
    fetchProducts(12).then(p => {
      setProducts(p.filter(pr => !HIDDEN_HANDLES.includes(pr.node.handle)));
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
    <section id="devices" className="section-padding bg-background">
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">The Collection</p>
        <h2 className="text-2xl md:text-4xl font-light tracking-wide text-foreground">Our Devices</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" size={32} /></div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => {
            const img = product.node.images.edges[0]?.node;
            const price = product.node.priceRange.minVariantPrice;
            const productUrl = `/product/${product.node.handle}`;

            return (
              <Link
                key={product.node.id}
                to={productUrl}
                className="group flex flex-col bg-card rounded-xl overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow duration-500"
                style={{ minHeight: 480 }}
              >
                {/* Image — 75% of card */}
                <div className="relative flex-[3] overflow-hidden bg-secondary/20">
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>

                {/* Content — 25% */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#9A9794" stroke="none" />
                    ))}
                  </div>

                  <h3 className="text-[13px] tracking-[0.15em] uppercase font-medium text-foreground leading-snug mb-1">
                    {product.node.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1 mb-4">
                    Professional-grade skincare technology
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-normal text-foreground tracking-wide">
                      {price.currencyCode === "EUR" ? "€" : price.currencyCode}{parseFloat(price.amount).toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      disabled={isCartLoading}
                      className="text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors duration-300 disabled:opacity-50"
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
