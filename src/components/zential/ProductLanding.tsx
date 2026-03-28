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
  Lock, CreditCard, ArrowRight,
} from "lucide-react";
import { PaymentBadges } from "@/components/zential/PaymentBadges";
import type { ProductConfig } from "@/data/productConfigs";

type BundleKey = "single" | "ritual-set" | "pro-set";

const bundles: { key: BundleKey; label: string; desc: string; addon: number; savePercent: number; saveAmount: number; badge?: string }[] = [
  { key: "single", label: "One-Time Purchase", desc: "Device only", addon: 0, savePercent: 0, saveAmount: 0 },
  { key: "ritual-set", label: "Ritual Set", desc: "Device + Collagen Gel", addon: 25, savePercent: 16, saveAmount: 10, badge: "Most Popular" },
  { key: "pro-set", label: "Pro Set", desc: "Device + Collagen Gel + PDRN Mask", addon: 49, savePercent: 20, saveAmount: 24, badge: "Best Value" },
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
    fetchProductByHandle(config.handle)
      .then(p => { setProduct(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, [config.handle]);

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

  const images = product?.images?.edges || [];
  const variants = product?.variants?.edges || [];
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
    // Switch to the variant's associated image if available
    const variantOptions = variants[idx]?.node?.selectedOptions || [];
    const variantColor = variantOptions.find((o: any) => o.name === "Color Classification")?.value;
    if (variantColor && images.length > 1) {
      // Images are ordered by variant position in Shopify
      setSelectedImage(idx < images.length ? idx : 0);
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
              price: gelVariant.price,
              quantity: 1,
              selectedOptions: gelVariant.selectedOptions || [],
            });
          }
        }
      } catch (e) {
        console.error("Failed to auto-add Collagen Face Gel:", e);
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
              price: maskVariant.price,
              quantity: 1,
              selectedOptions: maskVariant.selectedOptions || [],
            });
          }
        }
      } catch (e) {
        console.error("Failed to auto-add PDRN Mask:", e);
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
            <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Zential Pure</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">{config.name}</h1>
            <p className="text-muted-foreground text-lg mb-8">{config.subheadline}</p>

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
            {/* Color / Variant Selector */}
            {hasMultipleVariants && (
              <div className="mb-8">
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Color: <span className="text-foreground font-semibold">{colorLabelMap[variant?.selectedOptions?.find((o: any) => o.name === "Color Classification")?.value] || variant?.title}</span>
                </p>
                <div className="flex gap-3">
                  {variants.map((v: any, idx: number) => {
                    const colorVal = v.node.selectedOptions?.find((o: any) => o.name === "Color Classification")?.value || v.node.title;
                    const isSelected = idx === selectedVariantIdx;
                    return (
                      <button
                        key={v.node.id}
                        onClick={() => handleVariantChange(idx)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all text-sm ${isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-border"}`}
                      >
                        <span className={`w-5 h-5 rounded-full ${colorSwatchMap[colorVal] || "bg-muted"} ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`} />
                        <span className={isSelected ? "font-semibold text-foreground" : "text-muted-foreground"}>{colorLabelMap[colorVal] || colorVal}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}


            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-bold text-foreground">{sym}{bundlePrice.toFixed(2)}</span>
              {bundle.savePercent > 0 && (
                <span className="text-xs font-semibold tracking-wider uppercase text-emerald bg-emerald/10 px-2.5 py-1 rounded-full">Save {bundle.savePercent}%</span>
              )}
            </div>
            {savings > 0 && <p className="text-sm text-emerald mb-6">You save {sym}{savings.toFixed(2)}</p>}
            {savings === 0 && <div className="mb-6" />}

            {/* Bundle Selector */}
            <div className="space-y-3 mb-8">
              {bundles.map(opt => (
                <button key={opt.key} onClick={() => setSelectedBundle(opt.key)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative ${selectedBundle === opt.key ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-border"}`}>
                  {opt.badge && (
                    <span className={`absolute -top-2.5 right-4 text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full ${opt.badge === "Best Deal" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"}`}>
                      {opt.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{sym}{(basePrice + opt.addon).toFixed(2)}</p>
                      {opt.savePercent > 0 && <p className="text-xs text-emerald font-semibold">Save {opt.savePercent}%</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div ref={ctaRef}>
              <Button variant="ritual" size="xl" className="w-full text-sm" onClick={handleAdd} disabled={isCartLoading || !variant?.availableForSale}>
                {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : "Add To Ritual"}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-5 text-muted-foreground">
              {[
                { icon: RotateCcw, label: "30-Day Guarantee" },
                { icon: Lock, label: "Secure Checkout" },
                { icon: Truck, label: "7–10 Day Delivery" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-[11px] tracking-wide uppercase">
                  <b.icon size={13} /> {b.label}
                </div>
              ))}
            </div>

            <PaymentBadges className="mt-4" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SOCIAL PROOF (Trustpilot-style) ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          {/* Trustpilot-style header */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl font-bold text-foreground">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-emerald flex items-center justify-center">
                    <Star size={16} className="fill-emerald-foreground text-emerald-foreground" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on <span className="font-semibold text-foreground">2,847</span> verified reviews
            </p>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                {/* Stars row */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-emerald flex items-center justify-center">
                      <Star size={12} className="fill-emerald-foreground text-emerald-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-emerald flex items-center gap-1">
                      <Check size={10} /> Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROBLEM REFRAME ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/20">
            <img src={config.problemImage || config.beforeAfter.before} alt="Lifestyle" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">The Real Issue</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{config.problemReframe.headline}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {config.problemReframe.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <p className="font-semibold text-foreground">{config.problemReframe.closing}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TECHNOLOGY BREAKDOWN ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Four Technologies. One Device.</h2>
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

      {/* ── SECTION 5: THE RITUAL ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Your Ritual</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The 5-Minute Ritual</h2>
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

      {/* ── SECTION 6: BEFORE / AFTER ── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Consistent Use. Visible Structure.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img src={config.beforeAfter.before} alt="Before" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground">Before</p>
            </div>
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img src={config.beforeAfter.after} alt="After 4 Weeks" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground">After 4 Weeks</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/60 mt-6 max-w-md mx-auto">
            Results after consistent 4-week daily use. Individual results may vary. Images are unretouched.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: COMPARISON TABLE ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Compare</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why {config.name} Wins</h2>
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
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked</h2>
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

      {/* ── SECTION 9: FINAL CTA ── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Structure Is a Practice.</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">Start your daily ritual. Build the tone your skin was designed for.</p>
          <Button variant="ritual" size="xl" onClick={handleAdd} disabled={isCartLoading}>
            {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : "Begin My Ritual"}
          </Button>
          <div className="flex items-center justify-center gap-6 mt-6 text-muted-foreground">
            {[
              { icon: Shield, label: "30-Day Guarantee" },
              { icon: Truck, label: "Free Shipping · 7–10 Days" },
              { icon: CreditCard, label: "Secure Payment" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5 text-[11px] tracking-wide uppercase">
                <b.icon size={13} /> {b.label}
              </div>
            ))}
          </div>
          <PaymentBadges className="mt-4" />
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
            <Button variant="ritual" size="lg" onClick={handleAdd} disabled={isCartLoading} className="flex-shrink-0">
              {isCartLoading ? <Loader2 className="animate-spin" size={14} /> : "Add To Ritual"}
            </Button>
          </div>
        </div>
      </div>

      <ZentialFooter />
    </div>
  );
}
