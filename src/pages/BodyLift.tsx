import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/zential/Header";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { toast } from "sonner";
import {
  Loader2, Shield, Truck, RotateCcw, Star, Check, X, ArrowUp,
  Sparkles, Flame, Heart, Brain, Sun, Zap, Waves, ThermometerSun,
  CreditCard, Lock
} from "lucide-react";

import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import before2Img from "@/assets/before2.jpg";
import after2Img from "@/assets/after2.jpg";

type VariantOption = "single" | "ritual-set" | "pro-set";

const bundleOptions: { key: VariantOption; label: string; desc: string; multiplier: number; discount: number; badge?: string }[] = [
  { key: "single", label: "One-Time Purchase", desc: "Single Body Lift device", multiplier: 1, discount: 0 },
  { key: "ritual-set", label: "Ritual Set", desc: "Device + Conductive Serum", multiplier: 1, discount: 15, badge: "Most Popular" },
  { key: "pro-set", label: "2-Device Professional Set", desc: "Two devices for home & travel", multiplier: 2, discount: 25, badge: "Best Deal" },
];

const testimonials = [
  { name: "Sarah, 32", text: "Week 3 and my jawline feels structured. This is part of my morning now." },
  { name: "Elena, 45", text: "No needles. No clinic. Just consistency. My skin feels firmer than it has in years." },
  { name: "Maya, 38", text: "This feels like owning my structure. I finally trust a device." },
];

const scienceCards = [
  { icon: Sun, title: "Red Light", desc: "Stimulates collagen response at the cellular level, supporting skin density and elasticity over time." },
  { icon: Zap, title: "Microcurrent", desc: "Activates facial muscle tone through gentle electrical stimulation, encouraging natural lift and definition." },
  { icon: ThermometerSun, title: "Thermal Support", desc: "Enhances circulation and nutrient delivery, warming tissue for optimal absorption and recovery." },
  { icon: Waves, title: "Sonic Pulse", desc: "Encourages lymphatic drainage and reduces fluid retention for a sculpted, depuffed appearance." },
];

const ritualSteps = [
  { step: "01", title: "Apply", desc: "Cleanse skin. Apply a thin layer of conductive serum to the treatment area." },
  { step: "02", title: "Glide", desc: "Turn on your Body Lift. Glide upward along the jawline, cheeks, and forehead. 5 minutes." },
  { step: "03", title: "Breathe", desc: "Pause. Let the frequency settle. Repeat your ritual daily for structural results." },
];

const comparisonRows = [
  { feature: "Cost over 6 months", bodyLift: "One-time €84", clinic: "€1,200+", creams: "€300+", generic: "€40–€60" },
  { feature: "Appointments needed", bodyLift: "None", clinic: "12+ visits", creams: "None", generic: "None" },
  { feature: "Long-term structural support", bodyLift: true, clinic: true, creams: false, generic: false },
  { feature: "Pain or downtime", bodyLift: false, clinic: true, creams: false, generic: false },
  { feature: "Professional-grade control", bodyLift: true, clinic: true, creams: false, generic: false },
  { feature: "Daily ritual integration", bodyLift: true, clinic: false, creams: true, generic: true },
];

const faqs = [
  { q: "How long until I see results?", a: "Most users notice improved skin texture within 2 weeks of consistent daily use. Structural lift and toning typically become visible after 3 to 4 weeks. Consistency is the key variable." },
  { q: "Can I use it daily?", a: "Yes. Body Lift is designed for daily use. We recommend 5-minute sessions as part of your morning or evening ritual. Start at the lowest intensity and increase gradually." },
  { q: "Is it safe for all skin types?", a: "Body Lift is designed for all skin types. Start at the lowest setting if you have sensitive skin. If you experience persistent irritation, reduce frequency and consult your dermatologist." },
  { q: "Who should not use this device?", a: "Do not use if you have a pacemaker, are pregnant, have active skin infections, epilepsy, or metal implants in the treatment area. Always consult your physician if you have a medical condition." },
  { q: "What serum works best?", a: "Any water-based conductive serum or gel works well. Avoid oil-based products as they can interfere with conductivity. Our Ritual Set includes a specially formulated conductive serum." },
  { q: "What is your guarantee?", a: "We offer a 30-Day Ritual Guarantee. If you don't feel visible improvement within 30 days of consistent daily use, contact us for a full refund. No friction, no pressure." },
];

export default function BodyLift() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState<VariantOption>("ritual-set");
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    fetchProductByHandle("body-lift")
      .then(p => { setProduct(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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
  const variant = product?.variants?.edges?.[0]?.node;
  const basePrice = parseFloat(variant?.price?.amount || "84");
  const currency = variant?.price?.currencyCode || "EUR";

  const bundle = bundleOptions.find(b => b.key === selectedBundle)!;
  const totalPrice = basePrice * bundle.multiplier;
  const discountedPrice = totalPrice * (1 - bundle.discount / 100);
  const savings = totalPrice - discountedPrice;

  const handleAdd = async () => {
    if (!variant) return;
    const qty = bundle.multiplier;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: { amount: discountedPrice.toFixed(2), currencyCode: currency },
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your ritual", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      {/* ─── 1. ABOVE THE FOLD ─── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-16 items-start">
          {/* LEFT: Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/20 group cursor-zoom-in">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || "Body Lift"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${i === selectedImage ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3">Zential Pure</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">Body Lift</h1>
            <p className="text-muted-foreground text-lg mb-8">Microcurrent Facial Lift, Built for Daily Structure</p>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Sparkles, label: "Microcurrent Lift" },
                { icon: Flame, label: "Red Light Collagen Support" },
                { icon: Heart, label: "Lymphatic Activation" },
                { icon: Brain, label: "Built for Long-Term Tone" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <b.icon size={15} className="text-accent" />
                  </div>
                  {b.label}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-foreground">
                {currency === "EUR" ? "€" : currency} {discountedPrice.toFixed(2)}
              </span>
              {bundle.discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">€{totalPrice.toFixed(2)}</span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald bg-emerald/10 px-2.5 py-1 rounded-full">
                    Save {bundle.discount}%
                  </span>
                </>
              )}
            </div>
            {savings > 0 && (
              <p className="text-sm text-emerald mb-6">You save €{savings.toFixed(2)}</p>
            )}
            {savings === 0 && <div className="mb-6" />}

            {/* Bundle Selector */}
            <div className="space-y-3 mb-8">
              {bundleOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedBundle(opt.key)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                    selectedBundle === opt.key
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/40 hover:border-border"
                  }`}
                >
                  {opt.badge && (
                    <span className={`absolute -top-2.5 right-4 text-[10px] font-semibold tracking-wider uppercase px-3 py-0.5 rounded-full ${
                      opt.badge === "Best Deal" ? "bg-emerald text-emerald-foreground" : "bg-primary text-primary-foreground"
                    }`}>
                      {opt.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        €{(basePrice * opt.multiplier * (1 - opt.discount / 100)).toFixed(2)}
                      </p>
                      {opt.discount > 0 && (
                        <p className="text-xs text-muted-foreground line-through">€{(basePrice * opt.multiplier).toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef}>
              <Button
                variant="ritual"
                size="xl"
                className="w-full text-sm"
                onClick={handleAdd}
                disabled={isCartLoading || !variant?.availableForSale}
              >
                {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : "Add To Ritual"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-5 text-muted-foreground">
              {[
                { icon: RotateCcw, label: "30-Day Guarantee" },
                { icon: Lock, label: "Secure Checkout" },
                { icon: Truck, label: "Fast Shipping" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-[11px] tracking-wide uppercase">
                  <b.icon size={13} />
                  {b.label}
                </div>
              ))}
            </div>

            {/* Payment Icons */}
            <div className="flex items-center justify-center gap-3 mt-4 opacity-40">
              {["Visa", "MC", "Amex", "Apple Pay"].map(p => (
                <span key={p} className="text-[10px] font-semibold tracking-wider uppercase border border-border rounded px-2 py-0.5">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SOCIAL PROOF ─── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-primary text-primary" />)}
          </div>
          <p className="text-sm text-muted-foreground mb-10">4.8 average from 1,200+ rituals</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <p className="font-serif italic text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. PROBLEM → REFRAME ─── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/20">
            <img src={beforeImg} alt="Woman touching jawline" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">The Real Issue</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Your Face Is Structural. Not Topical.</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                After 25, facial muscles lose tone. Collagen production slows. Lymphatic flow stagnates.
                The result isn't just "aging," it's a loss of structural definition that no cream can restore.
              </p>
              <p>
                Topical products hydrate the surface. But lift, tone, and definition come from deeper layers:
                the muscles, the fascia, the circulatory system beneath the skin.
              </p>
              <p>
                Body Lift targets these layers directly. Through microcurrent, red light, and sonic pulse,
                it works with your body's own systems to rebuild what time slowly softens.
              </p>
              <p className="font-semibold text-foreground">
                This is about daily frequency, not emergency fixes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS ─── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Four Technologies. One Device.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {scienceCards.map(card => (
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

      {/* ─── 5. VISUAL DEMONSTRATION (5-Minute Ritual) ─── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Your Ritual</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The 5-Minute Ritual</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ritualSteps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl font-bold text-primary">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                {i < ritualSteps.length - 1 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <ArrowUp size={20} className="text-primary/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. BEFORE / AFTER ─── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Consistent Use. Visible Structure.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img src={before2Img} alt="Before consistent use" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground">Before</p>
            </div>
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img src={after2Img} alt="After 4 weeks of daily use" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground">After 4 Weeks</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/60 mt-6 max-w-md mx-auto">
            Results from consistent 4-week daily use. Individual results may vary. Images are unretouched and represent real user experiences.
          </p>
        </div>
      </section>

      {/* ─── 7. COMPARISON TABLE ─── */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Compare</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Body Lift Wins</h2>
          </div>
          <div className="glass-card overflow-hidden max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="p-4 text-left text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold" />
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-primary font-semibold">Body Lift</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Clinic</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Creams</th>
                  <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-muted-foreground font-semibold">Generic Devices</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0">
                    <td className="p-4 font-medium text-foreground">{row.feature}</td>
                    {(["bodyLift", "clinic", "creams", "generic"] as const).map(col => {
                      const val = row[col];
                      return (
                        <td key={col} className="p-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? <Check size={16} className="text-accent mx-auto" /> : <X size={16} className="text-destructive/50 mx-auto" />
                          ) : (
                            <span className={col === "bodyLift" ? "font-semibold text-foreground" : "text-muted-foreground"}>{val}</span>
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

      {/* ─── 8. FAQ ─── */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── 9. FINAL CTA ─── */}
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
              { icon: Truck, label: "Free Shipping" },
              { icon: CreditCard, label: "Secure Payment" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5 text-[11px] tracking-wide uppercase">
                <b.icon size={13} />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY ADD TO CART BAR ─── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-2xl">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {images[0] && (
                <img src={images[0].node.url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">Body Lift</p>
                <p className="text-xs text-muted-foreground">
                  €{discountedPrice.toFixed(2)}
                  {bundle.discount > 0 && <span className="ml-1.5 text-emerald">Save {bundle.discount}%</span>}
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