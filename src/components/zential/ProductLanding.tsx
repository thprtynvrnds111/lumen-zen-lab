import { useEffect, useState, useRef } from "react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/zential/Header";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { toast } from "sonner";
import {
  Loader2, Shield, Truck, RotateCcw, Star, Check, X,
  Lock, CreditCard, ArrowRight, ExternalLink, AlertTriangle, Heart,
} from "lucide-react";
import { PaymentBadges } from "@/components/zential/PaymentBadges";
import { RelatedProducts } from "@/components/zential/RelatedProducts";
import { ScarcityBanner } from "@/components/zential/ScarcityBanner";
import type { ProductConfig } from "@/data/productConfigs";

type BundleKey = "single" | "ritual-set" | "pro-set";

const bundles: { key: BundleKey; label: string; desc: string; addon: number; savePercent: number; saveAmount: number; badge?: string }[] = [
  { key: "single", label: "Device Only", desc: "One-time purchase", addon: 0, savePercent: 0, saveAmount: 0 },
  { key: "ritual-set", label: "Ritual Set", desc: "Device + Collagen Gel", addon: 25, savePercent: 16, saveAmount: 10, badge: "Most Popular" },
  { key: "pro-set", label: "Pro Set", desc: "Device + Gel & PDRN Mask", addon: 49, savePercent: 20, saveAmount: 24, badge: "Best Value" },
];

interface Props {
  config: ProductConfig;
}

export function ProductLanding({ config }: Props) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState<BundleKey>("ritual-set");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    setLoading(true);
    (async () => {
      let p = await fetchProductByHandle(config.handle).catch(() => null);
      if (!p && config.purchaseHandle) {
        p = await fetchProductByHandle(config.purchaseHandle).catch(() => null);
      }
      setProduct(p);
      setLoading(false);
    })();
  }, [config.handle, config.purchaseHandle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-muted-foreground" size={32} />
    </div>
  );

  const shopifyImages = product?.images?.edges || [];
  const images = shopifyImages.length > 0
    ? shopifyImages
    : (config.fallbackImage ? [{ node: { url: config.fallbackImage, altText: config.name } }] : []);
  const variants = product?.variants?.edges || [];
  const meta = (product?.metafields || []).filter(Boolean).reduce((acc: Record<string, string>, mf: any) => {
    if (mf?.key) acc[mf.key] = mf.value;
    return acc;
  }, {});
  const hasMultipleVariants = variants.length > 1;
  const variant = variants[selectedVariantIdx]?.node || variants[0]?.node;
  const basePrice = parseFloat(variant?.price?.amount || "84");
  const currency = variant?.price?.currencyCode || "EUR";
  const sym = currency === "EUR" ? "€" : currency;

  // Color label mapping (Shopify uses "Pink" but we display "Rose")
  const colorLabelMap: Record<string, string> = { Pink: "Rose", Silver: "Silver" };
  const colorSwatchMap: Record<string, string> = { Pink: "bg-pink-300", Silver: "bg-gray-300" };

  const handleVariantChange = (idx: number) => {
    setSelectedVariantIdx(idx);
    // Switch to the variant's associated image by matching the variant image URL
    const variantImage = variants[idx]?.node?.image;
    if (variantImage?.url && images.length > 1) {
      const matchIdx = images.findIndex((img: any) => img.node.url === variantImage.url);
      setSelectedImage(matchIdx >= 0 ? matchIdx : 0);
    }
  };

  const bundle = bundles.find(b => b.key === selectedBundle)!;
  const bundlePrice = basePrice + bundle.addon;
  const savings = bundle.saveAmount;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: { amount: bundlePrice.toFixed(2), currencyCode: currency },
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    // Meta Pixel: AddToCart
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: config.name,
        content_ids: [variant.id],
        content_type: 'product',
        value: bundlePrice,
        currency: currency,
      });
    }

    // Auto-add Collagen Face Gel for Ritual Set and Pro Set
    if (selectedBundle === "ritual-set" || selectedBundle === "pro-set") {
      try {
        const gelProduct = await fetchProductByHandle("medicube-collagen-elastic-jelly-moisturizing-cream");
        if (gelProduct) {
          const gelVariant = gelProduct.variants?.edges?.[0]?.node;
          if (gelVariant) {
            await addItem({
              product: { node: gelProduct },
              variantId: gelVariant.id,
              variantTitle: gelVariant.title,
              price: { amount: "0.00", currencyCode: currency },
              quantity: 1,
              selectedOptions: gelVariant.selectedOptions || [],
            });
          } else {
            toast.error("Collagen Gel couldn't be added — please add it manually.", { position: "top-center" });
          }
        } else {
          toast.error("Collagen Gel couldn't be added — please add it manually.", { position: "top-center" });
        }
      } catch (e) {
        console.error("Failed to auto-add Collagen Face Gel:", e);
        toast.error("Collagen Gel couldn't be added — please add it manually.", { position: "top-center" });
      }
    }

    // Auto-add PDRN Mask for Pro Set
    if (selectedBundle === "pro-set") {
      try {
        const maskProduct = await fetchProductByHandle("collagen-eye-mask");
        if (maskProduct) {
          const maskVariant = maskProduct.variants?.edges?.[0]?.node;
          if (maskVariant) {
            await addItem({
              product: { node: maskProduct },
              variantId: maskVariant.id,
              variantTitle: maskVariant.title,
              price: { amount: "0.00", currencyCode: currency },
              quantity: 1,
              selectedOptions: maskVariant.selectedOptions || [],
            });
          } else {
            toast.error("PDRN Mask couldn't be added — please add it manually.", { position: "top-center" });
          }
        } else {
          toast.error("PDRN Mask couldn't be added — please add it manually.", { position: "top-center" });
        }
      } catch (e) {
        console.error("Failed to auto-add PDRN Mask:", e);
        toast.error("PDRN Mask couldn't be added — please add it manually.", { position: "top-center" });
      }
    }

    const messages: Record<BundleKey, string> = {
      single: "Added to your ritual",
      "ritual-set": "Device + Collagen Gel added to your ritual",
      "pro-set": "Device + Gel + Mask added to your ritual",
    };
    toast.success(messages[selectedBundle], { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      {/* ── SECTION 1: ABOVE THE FOLD ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 group cursor-zoom-in">
              {images[selectedImage] ? (
                <img src={images[selectedImage].node.url} alt={config.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image available</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img: any, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === selectedImage ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-foreground/40" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">Zential Pure</p>
            </div>
            <h1 className="font-serif italic text-[34px] md:text-[44px] lg:text-[52px] leading-[1.05] text-foreground mb-4 tracking-tight">{config.name}</h1>
            <p className="text-foreground/65 text-[15px] md:text-base leading-relaxed mb-8 max-w-md">{config.subheadline}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {config.benefits.map(b => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <b.icon size={15} className="text-accent" />
                  </div>
                  {b.label}
                </div>
              ))}
            </div>



            {/* Bundle Selector – top buttons, single source of truth */}
            {!config.isAccessory && (
              <div className="mb-6">
                <div className="flex gap-3">
                  {bundles.map(opt => {
                    const isSelected = selectedBundle === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => setSelectedBundle(opt.key)}
                        className={`relative flex-1 text-center px-3 py-3 rounded-xl border-2 transition-all text-sm ${isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-border"}`}
                      >
                        {opt.badge && (
                          <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${opt.badge === "Best Value" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"}`}>
                            {opt.badge}
                          </span>
                        )}
                        <span className={`block text-xs font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>{opt.label}</span>
                        <span className={`block text-[10px] mt-0.5 ${isSelected ? "text-foreground/70" : "text-muted-foreground/60"}`}>{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif text-[34px] md:text-[40px] leading-none text-foreground">{sym}{bundlePrice.toFixed(2)}</span>
              {bundle.savePercent > 0 && (
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-emerald bg-emerald/10 px-2.5 py-1 rounded-full">Save {bundle.savePercent}%</span>
              )}
            </div>
            {savings > 0 && <p className="text-sm text-emerald mb-6">You save {sym}{savings.toFixed(2)}</p>}
            {savings === 0 && <div className="mb-6" />}

            {meta.trust_statement && (
              <p className="text-xs text-muted-foreground/70 italic text-center mb-4 leading-relaxed">
                "{meta.trust_statement}"
              </p>
            )}

            <ScarcityBanner signal={meta.inventory_signal} />

            <div ref={ctaRef}>
              <button
                onClick={handleAdd}
                disabled={isCartLoading || !variant?.availableForSale}
                className="w-full bg-[#2A211A] hover:bg-[#1A1410] text-white rounded-full uppercase tracking-[0.18em] text-[11px] font-medium py-5 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : "Add To Ritual"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-5 text-muted-foreground">
              {[
                { icon: RotateCcw, label: "30-Day Guarantee" },
                { icon: Lock, label: "Secure Checkout" },
                { icon: Truck, label: "3–7 Day EU Delivery" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-[11px] tracking-wide uppercase">
                  <b.icon size={13} /> {b.label}
                </div>
              ))}
            </div>

            <PaymentBadges className="mt-4" />

            {/* By the numbers — micro trust strip */}
            <div className="mt-8 pt-6 border-t border-foreground/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="font-serif italic text-2xl text-foreground leading-none">4</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Clinical<br/>Modalities</p>
              </div>
              <div className="border-x border-foreground/10">
                <p className="font-serif italic text-2xl text-foreground leading-none">30</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Day<br/>Guarantee</p>
              </div>
              <div>
                <p className="font-serif italic text-2xl text-foreground leading-none">2yr</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/55 mt-1.5">Device<br/>Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCIENCE STRIP (metafields) ── */}
      {(meta.mechanism_primary || meta.mechanism_benefit) && (
        <section className="py-14 bg-foreground text-background">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
            {meta.mechanism_primary && (
              <p className="text-base md:text-lg leading-relaxed opacity-90">{meta.mechanism_primary}</p>
            )}
            {meta.mechanism_benefit && (
              <p className="text-sm md:text-base leading-relaxed opacity-60">{meta.mechanism_benefit}</p>
            )}
            {meta.guarantee_block && (
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 pt-2">{meta.guarantee_block}</p>
            )}
          </div>
        </section>
      )}

      {/* ── RITUAL INSTRUCTIONS (metafield) ── */}
      {meta.ritual_instructions && (
        <section className="py-12 px-6 bg-secondary/20">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4 text-center">Your Protocol</p>
            <div className="glass-card p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-[1.9] whitespace-pre-line">{meta.ritual_instructions}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 2: TRUST INSTEAD OF REVIEWS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#FBF8F4' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Why You Can Trust This —</p>
            <h2 className="font-serif italic text-[32px] md:text-[46px] leading-[1.05] text-foreground tracking-tight mb-5">
              We launched in 2026.<br/>We won't fabricate reviews.
            </h2>
            <p className="text-[15px] text-foreground/65 leading-relaxed">
              Instead, here's what we offer in their place — concrete, verifiable, and refundable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { eyebrow: "Evidence", title: "Peer-reviewed studies", body: "Every modality on this device — red light, microcurrent, EMS, thermal — is referenced to published clinical research. We link the actual papers below.", cta: "See studies →" },
              { eyebrow: "Guarantee", title: "30 days. No conditions.", body: "Use it nightly for 30 days. If your skin doesn't show change, we refund you in full. No restocking fee, no questionnaire, no friction.", cta: "Read policy →" },
              { eyebrow: "Manufacturing", title: "Medical-grade build", body: "FDA-cleared modalities, CE-marked construction, 2-year hardware warranty. The device itself is the proof — not borrowed credibility.", cta: "Learn more →" },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-[#E8DDD0] hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B5A2E] mb-5">— {card.eyebrow} —</p>
                <h3 className="font-serif italic text-[24px] leading-[1.1] text-foreground mb-4">{card.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed mb-6">{card.body}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/70 hover:text-foreground transition-colors cursor-default">{card.cta}</p>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-lg md:text-xl text-foreground/55 text-center max-w-xl mx-auto leading-relaxed mt-14">
            "Honest beats inflated. The device works, or your money comes back."
          </p>
        </div>
      </section>

      {/* ── SECTION 3: PROBLEM REFRAME ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/20">
            <img src={config.problemImage || config.beforeAfter.before} alt="Lifestyle" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-foreground/40" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60">The Real Issue</p>
            </div>
            <h2 className="font-serif italic text-[30px] md:text-[42px] leading-[1.05] text-foreground mb-6 tracking-tight">{config.problemReframe.headline}</h2>
            <div className="space-y-4 text-foreground/65 leading-relaxed">
              {config.problemReframe.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <p className="font-medium text-foreground">{config.problemReframe.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TECHNOLOGY BREAKDOWN ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Technology —</p>
            <h2 className="font-serif italic text-[32px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">Four technologies. One device.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {config.techCards.map(card => (
              <div key={card.title} className="glass-card p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4b: WE SHOW OUR WORK ── */}
      {config.studyCards && config.studyCards.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#1a1714' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#C6A07C' }}>Transparency</p>
              <h2 className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-2xl mx-auto leading-snug mb-4">
                Every brand in this category will tell you they're science-backed. Here's ours.
              </h2>
              <p className="text-sm text-white/50 max-w-lg mx-auto">
                We link the actual studies. Read them, or don't — but they're there.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
              {config.studyCards.map((study, i) => (
                <a
                  key={i}
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={{ backgroundColor: '#231f1b', borderColor: '#3a3530' }}
                >
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: '#C6A07C' }}>{study.technology}</p>
                  <h3 className="text-sm font-semibold text-white/90 mb-2 leading-relaxed">{study.studyTitle}</h3>
                  <p className="text-xs text-white/40 mb-4">{study.journal}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium group-hover:underline" style={{ color: '#C6A07C' }}>
                    Read study <ExternalLink size={11} />
                  </span>
                </a>
              ))}
            </div>
            <p className="font-serif italic text-lg md:text-xl text-white/70 text-center max-w-xl mx-auto leading-relaxed">
              "The device works or you get your money back. That's the whole offer."
            </p>
          </div>
        </section>
      )}

      {/* ── SECTION 4c: SAFETY & USAGE ── */}
      {config.contraindications && config.contraindications.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#f9f7f4' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#C6A07C' }}>Before You Begin</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who should not use this device</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto mb-12">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle size={16} style={{ color: '#C6A07C' }} />
                  <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">Contraindications</h3>
                </div>
                <ul className="space-y-3">
                  {config.contraindications.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                      <X size={14} className="text-destructive/60 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {config.normalSensations && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Heart size={16} className="text-accent" />
                    <h3 className="font-semibold text-foreground text-sm tracking-wide uppercase">Normal Sensations</h3>
                  </div>
                  <ul className="space-y-3">
                    {config.normalSensations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                        <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {config.sessionInfo && (
              <p className="text-center text-xs text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
                {config.sessionInfo}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── SECTION 5: THE RITUAL ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Your Ritual —</p>
            <h2 className="font-serif italic text-[32px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">The five-minute ritual.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.ritualSteps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl font-bold text-primary">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                {i < config.ritualSteps.length - 1 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <ArrowRight size={20} className="text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: MECHANISM TIMELINE ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Consistent Use —</p>
            <h2 className="font-serif italic text-[32px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">What the mechanism produces.</h2>
            <p className="text-foreground/60 mt-5 max-w-sm mx-auto text-sm leading-relaxed">
              Results are individual. These are the biological processes at work with daily use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                week: "Week 1–2",
                heading: "Cellular activation",
                body: "Red light at 630–660nm begins stimulating ATP production. Microcurrent re-establishes neuromuscular pathways. Skin texture and morning puffiness typically respond first.",
              },
              {
                week: "Week 3–4",
                heading: "Structural engagement",
                body: "EMS stimulation reaches deeper muscle fibres. Collagen synthesis is measurably underway. Facial contours may begin to feel firmer along the jawline and cheekbones.",
              },
              {
                week: "Week 5+",
                heading: "Sustained frequency",
                body: "The skin's own systems are now working with the protocol. Thermal delivery enhances absorption each session. Results compound with continued consistency.",
              },
            ].map((t, i) => (
              <div key={i} className="glass-card p-8 text-center">
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-3">{t.week}</p>
                <h3 className="text-lg font-semibold text-foreground mb-3">{t.heading}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-muted-foreground/50 mt-8 max-w-md mx-auto">
            Descriptions reflect mechanisms supported by clinical literature, not guaranteed outcomes. Individual results vary.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: COMPARISON TABLE ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Compare —</p>
            <h2 className="font-serif italic text-[32px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">Why {config.name}.</h2>
          </div>
          <div className="glass-card overflow-hidden max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="p-4 text-left text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold" />
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-primary font-semibold">{config.name}</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Clinic</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Creams</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Generic Devices</th>
                </tr>
              </thead>
              <tbody>
                {config.comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0">
                    <td className="p-4 font-medium text-foreground">{row.feature}</td>
                    {(["zential", "clinic", "creams", "generic"] as const).map(col => {
                      const val = row[col];
                      return (
                        <td key={col} className="p-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? <Check size={16} className="text-accent mx-auto" /> : <X size={16} className="text-destructive/50 mx-auto" />
                          ) : (
                            <span className={col === "zential" ? "font-semibold text-foreground" : "text-muted-foreground"}>{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-4">— Questions —</p>
            <h2 className="font-serif italic text-[32px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">Frequently asked.</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {config.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <RelatedProducts currentHandle={config.handle} />

      {/* ── SECTION 9: FINAL CTA ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: '#1A1714' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">— The Promise —</p>
          <h2 className="font-serif italic text-[36px] md:text-[56px] leading-[1.05] text-white mb-6 tracking-tight">30 days. Full refund.<br/>No questions.</h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">Email info@zentialpure.com. We refund. No forms, no photos, no return required.</p>
          <button
            onClick={handleAdd}
            disabled={isCartLoading}
            className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-[#1A1714] rounded-full uppercase tracking-[0.18em] text-[11px] font-medium px-12 py-5 transition-all duration-300 disabled:opacity-50"
          >
            {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : "Begin My Ritual"}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-white/50">
            {[
              { icon: Shield, label: "30-Day Guarantee" },
              { icon: Truck, label: "Free EU Shipping" },
              { icon: CreditCard, label: "Secure Payment" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase">
                <b.icon size={13} /> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-2xl">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {images[0] && <img src={images[0].node.url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />}
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{config.name}</p>
                <p className="text-xs text-muted-foreground">
                  {sym}{bundlePrice.toFixed(2)}
                  {bundle.savePercent > 0 && <span className="ml-1.5 text-emerald">Save {bundle.savePercent}%</span>}
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              disabled={isCartLoading}
              className="flex-shrink-0 bg-[#2A211A] hover:bg-[#1A1410] text-white rounded-full uppercase tracking-[0.18em] text-[10px] font-medium px-6 py-3.5 transition-all disabled:opacity-50"
            >
              {isCartLoading ? <Loader2 className="animate-spin" size={14} /> : "Add To Ritual"}
            </button>
          </div>
        </div>
      </div>

      <ZentialFooter />
    </div>
  );
}
