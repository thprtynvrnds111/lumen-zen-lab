import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const FLAGSHIP_HANDLES = ["body-lift", "frame-pulse-activator", "eye-activator"];

const FLAGSHIP_BENEFITS: Record<string, string> = {
  "body-lift": "Sculpt, lift & define facial contours with clinical-grade microcurrent technology. Visible results in 14 days.",
  "frame-pulse-activator": "Targeted eye therapy glasses combining EMS & red light to reduce puffiness, dark circles & fine lines.",
  "eye-activator": "Rose gold precision eye massage with thermal therapy. Depuffs, firms & brightens the delicate eye area.",
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

  const flagshipProducts = FLAGSHIP_HANDLES
    .map(handle => products.find(p => p.node.handle === handle))
    .filter(Boolean) as ShopifyProduct[];

  const remainingProducts = products.filter(
    p => !FLAGSHIP_HANDLES.includes(p.node.handle)
  );

  return (
    <section id="devices" className="section-padding">
      {/* Flagship Header */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Signature Collection</p>
        <h2 className="text-3xl md:text-5xl font-semibold text-balance">Your Devices</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" size={32} /></div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found</p>
      ) : (
        <>
          {/* Flagship Products — Large Feature Cards */}
          {flagshipProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {flagshipProducts.map(product => {
                const img = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                const benefit = FLAGSHIP_BENEFITS[product.node.handle] || product.node.description;
                return (
                  <div key={product.node.id} className="group glass-card overflow-hidden flex flex-col">
                    <Link
                      to={`/product/${product.node.handle}`}
                      className="block aspect-[3/4] relative overflow-hidden bg-secondary/30"
                    >
                      {img && (
                        <img
                          src={img.url}
                          alt={img.altText || product.node.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-semibold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                        {benefit}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                        </span>
                        <Button
                          variant="ritual"
                          size="lg"
                          onClick={() => handleAdd(product)}
                          disabled={isCartLoading}
                        >
                          Add to Ritual
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Rest of Collection */}
          {remainingProducts.length > 0 && (
            <>
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Complete Your Ritual</p>
                <h3 className="text-2xl md:text-3xl font-semibold">The Full Collection</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {remainingProducts.map(product => {
                  const img = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  return (
                    <div key={product.node.id} className="group glass-card overflow-hidden">
                      <Link to={`/product/${product.node.handle}`} className="block aspect-square relative overflow-hidden bg-secondary/30">
                        {img && (
                          <img src={img.url} alt={img.altText || product.node.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </Link>
                      <div className="p-5">
                        <Link to={`/product/${product.node.handle}`}>
                          <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{product.node.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.node.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</span>
                          <Button variant="ritual" size="sm" onClick={() => handleAdd(product)} disabled={isCartLoading}>
                            Add to Ritual
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
