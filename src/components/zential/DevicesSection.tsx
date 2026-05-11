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
    "eye-massage": "Red light and thermal care for tired eyes",
    "color-light-import-micro-current-vibration-massager": "Full-face frequency facial for glow and clarity",
    "facial-beauty-tools-and-ems-beauty-equipment": "Precision contour wand for cheek and jaw lift",
    "lifting-and-tightening-face-introducer": "Deep infusion for plump, hydrated skin",
    "portable-ems-microcurrent-facial-beauty-device": "Advanced EMS & microcurrent facial purification",
    "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": "EMS sculpting with dual-wavelength LED",
    "breath-seal": "Medical-grade nasal breathing tape",
    "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers": "3D contoured blackout sleep mask",
    "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "80W dual-wavelength full-body red light panel",
    "household-red-light-charging-vibrating-red-light-therapy-mat": "Infrared heat and red light recovery mat",
    "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": "Sequential compression for leg recovery",
    "electric-foam-roller-muscle-relaxation-fitness-yoga-column": "Percussive vibration for fascia release",
    "gravity-quilt-cotton-weighted-blanket": "7kg cotton weighted blanket for deep sleep",
    "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow": "6,210-point acupressure mat and pillow",
    "led-beauty-lamp-red-light-therapy-lamp-desktop-stand": "Desktop 660nm red light therapy lamp",
    "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": "USB thermal wrap for joint protocol",
    "portable-home-use-charging-red-light-therapy-blanket-far-infrared": "Full-body far-infrared sauna blanket",
    "household-full-body-moisture-removing-infrared-sauna-blanket": "Compact packable infrared sauna blanket",
    "null-1777641441133": "Wearable 360-node infrared LED belt",
    "red-light-therapy-belt-infrared-hot-compress-phototherapy": "USB thermal pad for joint recovery",
  };

  const TECH_TAGS: Record<string, string[]> = {
    "body-lift": ["EMS", "Lift"],
    "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": ["LED", "Pulse"],
    "electric-guasha-massager": ["Microcurrent", "Sculpt"],
    "electric-micro-current": ["Microcurrent", "EMS"],
    "eye-massage": ["Red Light", "Thermal"],
    "color-light-import-micro-current-vibration-massager": ["LED", "Freq"],
    "facial-beauty-tools-and-ems-beauty-equipment": ["EMS", "Contour"],
    "lifting-and-tightening-face-introducer": ["Red Light", "EMS", "Thermal"],
    "portable-ems-microcurrent-facial-beauty-device": ["EMS", "Microcurrent"],
    "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": ["LED", "EMS"],
  };

  const SORT_ORDER = [
    "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
    "body-lift",
    "lifting-and-tightening-face-introducer",
    "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening",
    "portable-ems-microcurrent-facial-beauty-device",
    "facial-beauty-tools-and-ems-beauty-equipment",
    "electric-guasha-massager",
    "eye-massage",
    "electric-micro-current",
    "color-light-import-micro-current-vibration-massager",
  ];

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
    toast.success("Added to your ritual", { position: "top-center" });
  };

  return (
    <section ref={ref} id="devices" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#070A0E' }}>
      <BubbleBackground />
      <div className="text-center mb-14 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#E87040' }}>The Collection</p>
        <h2 className="font-serif italic text-3xl md:text-4xl" style={{ color: '#EAE7E0' }}>The Protocol Stack</h2>
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

                {/* Card info — biohacking instrument readout */}
                <div
                  className="flex flex-col p-5 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Protocol tags */}
                  {TECH_TAGS[product.node.handle] && (
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {TECH_TAGS[product.node.handle].map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] tracking-[0.18em] uppercase font-medium px-2 py-[3px] rounded-sm"
                          style={{
                            backgroundColor: 'rgba(232,112,64,0.1)',
                            color: '#E87040',
                            border: '1px solid rgba(232,112,64,0.22)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Device name */}
                  <h3
                    className="font-serif italic text-[16px] leading-snug mb-1.5 transition-colors duration-300 group-hover:text-white"
                    style={{ color: '#EAE7E0' }}
                  >
                    {product.node.title}
                  </h3>

                  {/* Function descriptor */}
                  <p
                    className="text-[11.5px] leading-relaxed line-clamp-1 mb-4"
                    style={{ color: 'rgba(234,231,224,0.75)', letterSpacing: '0.01em' }}
                  >
                    {SUBTITLES[product.node.handle] || "Recovery protocol device"}
                  </p>

                  {/* Price + CTA */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-[16px] font-semibold" style={{ color: '#EAE7E0' }}>
                      {price.currencyCode === "EUR" ? "€" : price.currencyCode}{Math.round(parseFloat(price.amount))}
                    </span>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      disabled={isCartLoading}
                      aria-label={`Add ${product.node.title} to bag`}
                      className="text-[10px] tracking-[0.18em] uppercase font-medium px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      style={{ backgroundColor: '#E87040', boxShadow: '0 0 16px rgba(232,112,64,0.3)' }}
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
