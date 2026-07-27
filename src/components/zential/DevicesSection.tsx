import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";
import { useTranslation } from "react-i18next";

const HIDDEN_HANDLES = ["medicube-collagen-elastic-jelly-moisturizing-cream", "collagen-eye-mask"];

const TECH_TAGS: Record<string, string[]> = {
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": ["LED", "Pulse"],
  "electric-guasha-massager": ["Microcurrent", "Sculpt"],
  "electric-micro-current": ["Microcurrent", "EMS"],
  "eye-massage": ["Red Light", "Thermal"],
  "color-light-import-micro-current-vibration-massager": ["LED", "Freq"],
  "facial-beauty-tools-and-ems-beauty-equipment": ["EMS", "Contour"],
  "lifting-and-tightening-face-introducer": ["Microcurrent", "EMS", "Thermal"],
  "portable-ems-microcurrent-facial-beauty-device": ["EMS", "Microcurrent"],
};

const SORT_ORDER = [
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
  "lifting-and-tightening-face-introducer",
  "portable-ems-microcurrent-facial-beauty-device",
  "facial-beauty-tools-and-ems-beauty-equipment",
  "electric-guasha-massager",
  "eye-massage",
  "electric-micro-current",
  "color-light-import-micro-current-vibration-massager",
  "white-noise-sleep-aid-machine",
];

export function DevicesSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation('home');

  const subtitles = t('devices.subtitles', { returnObjects: true }) as Record<string, string>;

  useEffect(() => {
    fetchProducts(50).then(p => {
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
    toast.success(t('devices.addedToast'), { position: "top-center" });
  };

  return (
    <section ref={ref} id="devices" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#070A0E' }}>
      <BubbleBackground />
      <div className="text-center mb-14 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#E87040' }}>{t('devices.eyebrow')}</p>
        <h2 className="font-serif italic text-3xl md:text-4xl" style={{ color: '#EAE7E0' }}>{t('devices.title')}</h2>
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
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{ backgroundColor: '#111820', border: '1px solid rgba(255,255,255,0.07)', minHeight: 460, boxShadow: '0 0 0 0 rgba(232,112,64,0)' }}
                onMouseEnter={e => (e.currentTarget.style.border = '1px solid rgba(232,112,64,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)')}
              >
                <div className="relative flex-[3] overflow-hidden">
                  {img && (
                    <img
                      src={`${img.url}&width=800`}
                      srcSet={`${img.url}&width=400 400w, ${img.url}&width=800 800w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      alt={img.altText || product.node.title}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex flex-col p-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  {TECH_TAGS[product.node.handle] && (
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {TECH_TAGS[product.node.handle].map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] tracking-[0.18em] uppercase font-medium px-2 py-[3px] rounded-sm"
                          style={{ backgroundColor: 'rgba(232,112,64,0.1)', color: '#E87040', border: '1px solid rgba(232,112,64,0.22)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3
                    className="font-serif italic text-[16px] leading-snug mb-1.5 transition-colors duration-300 group-hover:text-white"
                    style={{ color: '#EAE7E0' }}
                  >
                    {product.node.title}
                  </h3>

                  <p
                    className="text-[11.5px] leading-relaxed line-clamp-1 mb-4"
                    style={{ color: 'rgba(234,231,224,0.75)', letterSpacing: '0.01em' }}
                  >
                    {subtitles[product.node.handle] || "Recovery protocol device"}
                  </p>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[16px] font-semibold" style={{ color: '#EAE7E0' }}>
                      {formatMoney(price.amount, price.currencyCode)}
                    </span>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      disabled={isCartLoading}
                      aria-label={`Add ${product.node.title} to bag`}
                      className="text-[10px] tracking-[0.18em] uppercase font-medium px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      style={{ backgroundColor: '#E87040', boxShadow: '0 0 16px rgba(232,112,64,0.3)' }}
                    >
                      {t('devices.addToCart')}
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
