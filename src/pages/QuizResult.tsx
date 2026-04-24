import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Calendar } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { getRecommendation, type QuizAnswers } from "@/data/quizData";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export default function QuizResult() {
  const [params] = useSearchParams();
  const answers: QuizAnswers = useMemo(() => Object.fromEntries(params.entries()) as QuizAnswers, [params]);
  const rec = useMemo(() => getRecommendation(answers), [answers]);

  const [primary, setPrimary] = useState<ShopifyProduct | null>(null);
  const [companions, setCompanions] = useState<ShopifyProduct[]>([]);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const p = await fetchProductByHandle(rec.primaryHandle);
      if (!cancelled && p) setPrimary(p);
      const comps = await Promise.all(rec.ritualHandles.map((h) => fetchProductByHandle(h)));
      if (!cancelled) setCompanions(comps.filter(Boolean) as ShopifyProduct[]);
    })();
    return () => { cancelled = true; };
  }, [rec.primaryHandle, rec.ritualHandles.join(",")]);

  const primaryPrice = primary ? Number(primary.node.priceRange.minVariantPrice.amount) : 0;
  const compTotal = companions.reduce((sum, c) => sum + Number(c.node.priceRange.minVariantPrice.amount), 0);
  const ritualTotal = primaryPrice + compTotal;
  const ritualSave = Math.round(compTotal * 0.15);

  const addRitual = async () => {
    if (!primary) return;
    setAdding(true);
    try {
      const products = [primary, ...companions];
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        const variantId = p.node.variants.edges[0]?.node.id;
        if (!variantId) continue;
        const original = Number(p.node.priceRange.minVariantPrice.amount);
        const price = i === 0 ? original : Math.max(0, original * 0.85);
        await addItem({
          product: p,
          variantId,
          price,
          quantity: 1,
        } as any);
      }
    } finally {
      setAdding(false);
    }
  };

  const addPrimaryOnly = async () => {
    if (!primary) return;
    setAdding(true);
    try {
      const variantId = primary.node.variants.edges[0]?.node.id;
      if (!variantId) return;
      await addItem({
        product: primary,
        variantId,
        price: primaryPrice,
        quantity: 1,
      } as any);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F4" }}>
      <SEO
        title={`Your Ritual — ${rec.primaryName} | Zential`}
        description={rec.ritualSubcopy}
        canonicalUrl="/quiz/result"
      />
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        {/* Reveal banner */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8" style={{ backgroundColor: "#9B5A2E", opacity: 0.45 }} />
            <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#9B5A2E" }}>
              — {rec.ritualHeadline} —
            </p>
            <span className="h-px w-8" style={{ backgroundColor: "#9B5A2E", opacity: 0.45 }} />
          </div>
          <h1 className="font-serif italic text-[40px] md:text-6xl leading-[1.02] tracking-[-0.01em] text-foreground mb-5 text-balance">
            Your ritual begins with<br/>the {rec.primaryName}.
          </h1>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {rec.ritualSubcopy}
          </p>
        </div>

        {/* Primary device card */}
        <section className="bg-background rounded-3xl border border-foreground/10 overflow-hidden mb-10 md:mb-14">
          <div className="grid md:grid-cols-2">
            <div className="aspect-square md:aspect-auto bg-gradient-to-br from-[#F7F4F0] to-[#E8DDD0] flex items-center justify-center overflow-hidden">
              {primary?.node.images.edges[0]?.node.url ? (
                <img
                  src={primary.node.images.edges[0].node.url}
                  alt={primary.node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-serif italic text-3xl text-foreground/30">Loading…</span>
              )}
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-4">— Recommended for you —</p>
              <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-4">{rec.primaryName}</h2>
              <p className="text-[15px] text-foreground/65 leading-relaxed mb-6">{rec.primaryReason}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif italic text-3xl text-foreground">
                  €{primaryPrice ? primaryPrice.toFixed(0) : "—"}
                </span>
                <span className="text-[11px] tracking-[0.18em] uppercase text-foreground/50">One-time</span>
              </div>

              <button
                onClick={addPrimaryOnly}
                disabled={adding || !primary}
                className="py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full border border-foreground/25 text-foreground hover:bg-foreground/5 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
              >
                {adding ? "Adding…" : "Add device only"}
              </button>
            </div>
          </div>
        </section>

        {/* Ritual set — high-conversion bundle */}
        {companions.length > 0 && (
          <section
            className="rounded-3xl overflow-hidden mb-10 md:mb-14 relative"
            style={{ backgroundColor: "#2A211A", color: "#FAF7F3" }}
          >
            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase" style={{ backgroundColor: "#C6A07C", color: "#2A211A" }}>
              Most chosen
            </div>
            <div className="p-8 md:p-12">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#C6A07C" }}>— The complete ritual —</p>
              <h3 className="font-serif italic text-3xl md:text-4xl mb-4">Your full protocol</h3>
              <p className="text-[15px] leading-relaxed mb-8 max-w-xl" style={{ opacity: 0.7 }}>
                {rec.bundlePitch}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(250,247,243,0.06)" }}>
                  <Sparkles size={16} style={{ color: "#C6A07C" }} />
                  <span className="text-sm">{rec.primaryName}</span>
                </div>
                {companions.map((c) => (
                  <div key={c.node.id} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(250,247,243,0.06)" }}>
                    <Sparkles size={16} style={{ color: "#C6A07C" }} />
                    <span className="text-sm">{c.node.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-end gap-4 mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ opacity: 0.5 }}>Ritual price</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif italic text-4xl">€{(ritualTotal - ritualSave).toFixed(0)}</span>
                    <span className="text-base line-through" style={{ opacity: 0.4 }}>€{ritualTotal.toFixed(0)}</span>
                    <span className="text-[11px] px-2 py-1 rounded-full" style={{ backgroundColor: "#C6A07C", color: "#2A211A" }}>Save €{ritualSave}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={addRitual}
                disabled={adding || !primary}
                className="w-full md:w-auto py-4 px-10 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
                style={{ backgroundColor: "#FAF7F3", color: "#2A211A" }}
              >
                {adding ? "Adding ritual…" : "Add complete ritual"}
                <ArrowRight size={14} className="inline ml-2" />
              </button>
            </div>
          </section>
        )}

        {/* Protocol */}
        <section className="bg-background rounded-3xl border border-foreground/10 p-8 md:p-12 mb-10 md:mb-14">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-3">— Your 90-day protocol —</p>
          <h3 className="font-serif italic text-3xl md:text-4xl text-foreground mb-3">How to actually use it.</h3>
          <p className="text-[15px] text-foreground/60 mb-8 max-w-xl">{rec.expectedTimeline}</p>

          <div className="space-y-4">
            {rec.protocol.map((p, i) => (
              <div key={i} className="flex gap-5 pb-5 border-b border-foreground/10 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F7F4F0" }}>
                  <Calendar size={14} style={{ color: "#9B5A2E" }} />
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 mb-1">{p.day}</p>
                  <p className="text-base text-foreground leading-relaxed">{p.action}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reassurance */}
        <section className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: ShieldCheck, label: "30-day no-condition refund" },
            { icon: Truck, label: "Free EU shipping over €75" },
            { icon: Sparkles, label: "Lifetime ritual support" },
          ].map((it) => (
            <div key={it.label} className="flex items-center gap-3 p-5 rounded-2xl border border-foreground/10 bg-background">
              <it.icon size={16} style={{ color: "#9B5A2E" }} />
              <span className="text-[12px] tracking-wide text-foreground/75">{it.label}</span>
            </div>
          ))}
        </section>

        <div className="text-center">
          <Link
            to={`/product/${rec.primaryHandle}`}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground transition-colors"
          >
            Read the full {rec.primaryName} story <ArrowRight size={12} />
          </Link>
        </div>
      </main>
    </div>
  );
}
