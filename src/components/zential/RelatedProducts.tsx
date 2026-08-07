import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";

const ACCESSORY_HANDLES = ["restore-gel", "restore-pads"];

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
    <section className="section-padding bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">Complete Your Ritual</p>
          <h2 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl text-[#141414]">You May Also Need</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map(product => {
            const p = product.node;
            const img = p.images.edges[0]?.node;
            const price = p.priceRange.minVariantPrice;
            return (
              <Link
                key={p.id}
                to={`/product/${p.handle}`}
                className="group flex flex-col rounded-none overflow-hidden border border-[rgba(20,20,20,0.10)] bg-white hover:shadow-[0_18px_50px_rgba(20,20,20,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-[#F2F4F3]">
                  {img ? (
                    <img
                      src={`${img.url}&width=600`}
                      alt={img.altText || p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F2F4F3]" />
                  )}
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase font-semibold text-[#141414]">{p.title}</h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-sm font-medium tabular-nums text-[#141414]">{formatMoney(price.amount, price.currencyCode)}</span>
                    <span className="text-xs tracking-[0.12em] uppercase text-[#0E7A54] font-medium group-hover:underline underline-offset-2 transition-all">
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
