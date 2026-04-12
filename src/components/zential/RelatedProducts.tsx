import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const ACCESSORY_HANDLES = ["medicube-collagen-elastic-jelly-moisturizing-cream", "collagen-eye-mask"];

interface Props {
  currentHandle: string;
}

export function RelatedProducts({ currentHandle }: Props) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetchProducts(20).then(all => {
      const filtered = all
        .filter(p => p.node.handle !== currentHandle && !ACCESSORY_HANDLES.includes(p.node.handle))
        .slice(0, 3);
      setProducts(filtered);
    }).catch(() => {});
  }, [currentHandle]);

  if (products.length === 0) return null;

  return (
    <section className="section-padding gradient-pearl">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Complete Your Ritual</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">You May Also Need</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map(product => {
            const p = product.node;
            const img = p.images.edges[0]?.node;
            const price = p.priceRange.minVariantPrice;
            const sym = price.currencyCode === "EUR" ? "€" : price.currencyCode;
            return (
              <Link
                key={p.id}
                to={`/product/${p.handle}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-border/40 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-secondary/20">
                  {img ? (
                    <img
                      src={`${img.url}&width=600`}
                      alt={img.altText || p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary/30" />
                  )}
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.15em] uppercase font-semibold text-foreground">{p.title}</h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-sm font-medium text-foreground">{sym}{parseFloat(price.amount).toFixed(2)}</span>
                    <span className="text-xs tracking-[0.12em] uppercase text-accent font-medium group-hover:underline underline-offset-2 transition-all">
                      View Device →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
