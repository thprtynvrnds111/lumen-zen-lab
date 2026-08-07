import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Calendar } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { ZenMascot } from "@/components/zential/ZenMascot";
import { getRecommendation, type QuizAnswers } from "@/data/quizData";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { useCartStore } from "@/stores/cartStore";

const trustIcons = [Truck, ShieldCheck, Sparkles];

export default function QuizResult() {
 const { t } = useTranslation('quizresult');
 const [params] = useSearchParams();
 const answers: QuizAnswers = useMemo(() => Object.fromEntries(params.entries()) as QuizAnswers, [params]);
 const rec = useMemo(() => getRecommendation(answers), [answers]);

 const [primary, setPrimary] = useState<ShopifyProduct | null>(null);
 const [companions, setCompanions] = useState<ShopifyProduct[]>([]);
 const [adding, setAdding] = useState(false);
 const addItem = useCartStore((s) => s.addItem);

 const ritualHandlesKey = rec.ritualHandles.join(",");
 useEffect(() => {
  let cancelled = false;
  // Fetch primary + all companions in parallel, show whatever resolves first.
  const primaryPromise = fetchProductByHandle(rec.primaryHandle).then((p) => {
   if (!cancelled && p) setPrimary(p);
  });
  const compPromise = Promise.all(
   rec.ritualHandles.map((h) =>
    fetchProductByHandle(h).then((p) => {
     if (!cancelled && p) setCompanions((prev) => (prev.some((x) => x.node.handle === p.node.handle) ? prev : [...prev, p]));
    })
   )
  );
  void Promise.all([primaryPromise, compPromise]);
  return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [rec.primaryHandle, ritualHandlesKey]);

 // Reset companions when the recommendation changes (so stale entries don't linger).
 useEffect(() => {
  setCompanions([]);
  setPrimary(null);
 }, [rec.primaryHandle, ritualHandlesKey]);

 const primaryPrice = primary ? Number(primary.node.priceRange.minVariantPrice.amount) : 0;
 const compTotal = companions.reduce((sum, c) => sum + Number(c.node.priceRange.minVariantPrice.amount), 0);
 const ritualTotal = primaryPrice + compTotal;
 const ritualSave = Math.round(compTotal * 0.15);
 const quizCurrency = primary?.node.priceRange.minVariantPrice.currencyCode || "EUR";

 const addRitual = async () => {
  if (!primary) return;
  setAdding(true);
  try {
   const products = [primary, ...companions];
   for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const variant = p.node.variants.edges[0]?.node;
    if (!variant) continue;
    const original = Number(p.node.priceRange.minVariantPrice.amount);
    const finalAmount = i === 0 ? original : Math.max(0, original * 0.85);
    await addItem({
     product: p,
     variantId: variant.id,
     variantTitle: variant.title,
     price: { amount: finalAmount.toFixed(2), currencyCode: p.node.priceRange.minVariantPrice.currencyCode || "EUR" },
     quantity: 1,
     selectedOptions: variant.selectedOptions || [],
    });
   }
  } catch (e) {
   console.error("Failed to add ritual:", e);
  } finally {
   setAdding(false);
  }
 };

 const addPrimaryOnly = async () => {
  if (!primary) return;
  setAdding(true);
  try {
   const variant = primary.node.variants.edges[0]?.node;
   if (!variant) return;
   await addItem({
    product: primary,
    variantId: variant.id,
    variantTitle: variant.title,
    price: { amount: primaryPrice.toFixed(2), currencyCode: primary.node.priceRange.minVariantPrice.currencyCode || "EUR" },
    quantity: 1,
    selectedOptions: variant.selectedOptions || [],
   });
  } catch (e) {
   console.error("Failed to add device:", e);
  } finally {
   setAdding(false);
  }
 };

 return (
  <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
   <SEO
    title={`Your Ritual, ${rec.primaryName} | Zential`}
    description={rec.ritualSubcopy}
    canonicalUrl="/quiz/result"
   />
   <Header />

   <main className="max-w-5xl mx-auto px-6 py-14 md:py-20">
    {/* Reveal banner */}
    <div className="text-center mb-12 md:mb-16">
     <div className="flex justify-center mb-6">
      <ZenMascot expression="delighted" size={96} tilt />
     </div>
     <div className="inline-flex items-center gap-3 mb-5">
      <span className="h-px w-8" style={{ backgroundColor: "#0E7A54", opacity: 0.45 }} />
      <p className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "#0E7A54" }}>
      , {rec.ritualHeadline} 
      </p>
      <span className="h-px w-8" style={{ backgroundColor: "#0E7A54", opacity: 0.45 }} />
     </div>
     <h1 className="font-sans font-light text-[40px] md:text-6xl leading-[1.02] tracking-[-0.03em] text-foreground mb-5 text-balance">
      Your ritual begins with<br/>the {rec.primaryName}.
     </h1>
     <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
      {rec.ritualSubcopy}
     </p>
    </div>

    {/* Primary device card */}
    <section className="bg-white rounded-none border border-[rgba(20,20,20,0.10)] overflow-hidden mb-10 md:mb-14">
     <div className="grid md:grid-cols-2">
     <div className="aspect-square md:aspect-auto bg-[#F2F4F3] flex items-center justify-center overflow-hidden">
       {primary?.node.images.edges[0]?.node.url ? (
        <img
         src={primary.node.images.edges[0].node.url}
         alt={primary.node.title}
         className="w-full h-full object-cover animate-fade-in"
         loading="eager"
        />
       ) : (
        <div className="w-full h-full animate-pulse bg-[#F2F4F3]" />
       )}
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center">
       <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-4"> Recommended for you </p>
       <h2 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl text-foreground mb-4">{rec.primaryName}</h2>
       <p className="text-[15px] text-foreground/65 leading-relaxed mb-6">{rec.primaryReason}</p>

       <div className="flex items-center gap-3 mb-6">
        {primaryPrice ? (
         <span className="font-sans font-light tracking-[-0.02em] text-3xl text-foreground animate-fade-in">{formatMoney(Math.round(primaryPrice), quizCurrency)}</span>
        ) : (
         <span className="inline-block h-8 w-20 rounded-md animate-pulse bg-foreground/10" />
        )}
        <span className="text-[11px] tracking-[0.18em] uppercase text-foreground/50">{t('oneTime')}</span>
       </div>

       <button
        onClick={addPrimaryOnly}
        disabled={adding || !primary}
        className="py-4 px-7 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full border border-foreground/25 text-foreground hover:bg-foreground/5 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
       >
        {adding ? t('addingDevice') : t('addDeviceOnly')}
       </button>
      </div>
     </div>
    </section>

    {/* Ritual set, high-conversion bundle */}
    {companions.length > 0 && (
     <section
      className="rounded-none overflow-hidden mb-10 md:mb-14 relative border border-[rgba(20,20,20,0.10)]"
      style={{ backgroundColor: "#F4FBF8", color: "#141414" }}
     >
      <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase" style={{ backgroundColor: "#2ED8A8", color: "#141414" }}>
       Most chosen
      </div>
      <div className="p-8 md:p-12">
       <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#0E7A54" }}> The complete ritual </p>
       <h3 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl mb-4">{t('fullProtocolTitle')}</h3>
       <p className="text-[15px] leading-relaxed mb-8 max-w-xl" style={{ opacity: 0.7 }}>
        {rec.bundlePitch}
       </p>

       <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <div className="flex items-center gap-3 p-4 rounded-none" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(20,20,20,0.10)" }}>
         <Sparkles size={16} style={{ color: "#0E7A54" }} />
         <span className="text-sm">{rec.primaryName}</span>
        </div>
        {companions.map((c) => (
         <div key={c.node.id} className="flex items-center gap-3 p-4 rounded-none" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(20,20,20,0.10)" }}>
          <Sparkles size={16} style={{ color: "#0E7A54" }} />
          <span className="text-sm">{c.node.title}</span>
         </div>
        ))}
       </div>

       <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
         <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ opacity: 0.5 }}>{t('ritualPriceLabel')}</p>
         <div className="flex items-baseline gap-3">
          <span className="font-sans font-light tracking-[-0.02em] text-4xl">{formatMoney(Math.round(ritualTotal - ritualSave), quizCurrency)}</span>
          <span className="text-base line-through" style={{ opacity: 0.4 }}>{formatMoney(Math.round(ritualTotal), quizCurrency)}</span>
          <span className="text-[11px] px-2 py-1 rounded-full" style={{ backgroundColor: "#2ED8A8", color: "#141414" }}>{t('save', { amount: ritualSave })}</span>
         </div>
        </div>
       </div>

       <button
        onClick={addRitual}
        disabled={adding || !primary}
        className="w-full md:w-auto py-4 px-10 text-[13px] tracking-[0.08em] uppercase font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
        style={{ backgroundColor: "#2ED8A8", color: "#141414" }}
       >
        {adding ? t('addingRitual') : t('addRitual')}
        <ArrowRight size={14} className="inline ml-2" />
       </button>
      </div>
     </section>
    )}

    {/* Protocol */}
    <section className="bg-white rounded-none border border-[rgba(20,20,20,0.10)] p-8 md:p-12 mb-10 md:mb-14">
     <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-3"> Your 90-day protocol </p>
     <h3 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl text-foreground mb-3">{t('howToUse')}</h3>
     <p className="text-[15px] text-foreground/60 mb-8 max-w-xl">{rec.expectedTimeline}</p>

     <div className="space-y-4">
      {rec.protocol.map((p, i) => (
       <div key={i} className="flex gap-5 pb-5 border-b border-foreground/10 last:border-0 last:pb-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F2F4F3" }}>
         <Calendar size={14} style={{ color: "#0E7A54" }} />
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
     {(t('trustItems', { returnObjects: true }) as string[]).map((label, i) => {
      const Icon = trustIcons[i] ?? ShieldCheck;
      return (
      <div key={i} className="flex items-center gap-3 p-5 rounded-none border border-[rgba(20,20,20,0.10)] bg-white">
       <Icon size={16} style={{ color: "#0E7A54" }} />
       <span className="text-[12px] tracking-wide text-foreground/75">{label}</span>
      </div>
     );})}
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
