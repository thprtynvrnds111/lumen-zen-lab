import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
            return (
              <div key={product.node.id} className="group glass-card overflow-hidden">
                <Link to={productUrl} className="block aspect-square relative overflow-hidden bg-secondary/30">
                  {img && (
                    <img src={img.url} alt={img.altText || product.node.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <div className="p-5">
                  <Link to={productUrl}>
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
      )}
    </section>
  );
}
