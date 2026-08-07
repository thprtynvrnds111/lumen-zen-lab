import { useEffect, useState, useRef } from "react";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { trackViewItem, trackAddToCart } from "@/lib/google-tracking";
import { useCartStore } from "@/stores/cartStore";
import { prefetchCheckout } from "@/lib/prefetchCheckout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/zential/Header";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { toast } from "sonner";
import {
 Loader2, Star, Check, X,
 ArrowRight, ExternalLink, AlertTriangle, Heart,
} from "lucide-react";
import { PaymentBadges } from "@/components/zential/PaymentBadges";
import { RelatedProducts } from "@/components/zential/RelatedProducts";
import { ProtocolCrossSell } from "@/components/zential/ProtocolCrossSell";
import { ScarcityBanner } from "@/components/zential/ScarcityBanner";
import type { ProductConfig } from "@/data/productConfigs";
import { TrustpilotStrip } from "@/components/zential/TrustpilotStrip";
import { SkinFitSection } from "@/components/zential/SkinFitSection";
import realIssueFaceIntroducer from "@/assets/problem-face-introducer-v2.webp";
import realIssueFrequencyWand from "@/assets/problem-frequency-wand-v2.webp";
import realIssueGuasha from "@/assets/problem-guasha-v2.webp";
import realIssueSkinPulse from "@/assets/problem-skinpulse-v2.webp";
import realIssueSculptWand from "@/assets/problem-sculpt-wand-v2.webp";
import realIssueDepthMask from "@/assets/problem-depth-mask.webp";
import realIssuePressureShell from "@/assets/problem-pressure-shell.webp";
import realIssuePulseRoller from "@/assets/problem-pulse-roller.webp";
import realIssueRestoreMat from "@/assets/problem-restore-mat.webp";
import realIssueThermalZoneLite from "@/assets/problem-thermal-zone-lite.webp";
import realIssueWhiteNoise from "@/assets/problem-white-noise.webp";
import realIssueEyeActivator from "@/assets/problem-eye-activator.webp";
import realIssueRestShell from "@/assets/problem-rest-shell.webp";
import realIssueFrequencyMatPlus from "@/assets/problem-frequency-mat-plus.webp";
import realIssueThermalPad from "@/assets/editorial/problem-thermal-pad.webp";

type BundleKey = "single" | "ritual-set" | "pro-set";

const REAL_ISSUE_IMAGE_OVERRIDES: Record<string, string> = {
 "face-introducer": realIssueFaceIntroducer,
 "color-light-import-micro-current-vibration-massager": realIssueFrequencyWand,
 "electric-guasha-massager": realIssueGuasha,
 "electric-micro-current": realIssueSkinPulse,
 "facial-beauty-tools-and-ems-beauty-equipment": realIssueSculptWand,
 "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers": realIssueDepthMask,
 "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": realIssuePressureShell,
 "electric-foam-roller-muscle-relaxation-fitness-yoga-column": realIssuePulseRoller,
 "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow": realIssueRestoreMat,
 "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": realIssueThermalZoneLite,
 "white-noise-sleep-aid-machine": realIssueWhiteNoise,
 "eye-massage": realIssueEyeActivator,
 "gravity-quilt-cotton-weighted-blanket": realIssueRestShell,
 "household-red-light-charging-vibrating-red-light-therapy-mat": realIssueFrequencyMatPlus,
 "red-light-therapy-belt-infrared-hot-compress-phototherapy": realIssueThermalPad,
};

function buildBundles(gelPrice: number, maskPrice: number) {
 return [
  { key: "single"   as BundleKey, label: "Device Only", desc: "One-time purchase",    addon: 0,          savePercent: 0, saveAmount: 0, badge: undefined },
  { key: "ritual-set" as BundleKey, label: "Ritual Set", desc: "Device + Collagen Gel",  addon: gelPrice,       savePercent: 0, saveAmount: 0, badge: "Most Popular" as const },
  { key: "pro-set"  as BundleKey, label: "Pro Set",   desc: "Device + Gel & PDRN Pads", addon: gelPrice + maskPrice, savePercent: 0, saveAmount: 0, badge: "Best Value"  as const },
 ];
}

const NUMERAL = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];

// Derived from the cards themselves so the headline can never outrun the modalities
// the device actually has.
function techSectionTitle(config: ProductConfig) {
 if (config.techSectionTitle) return config.techSectionTitle;
 const n = config.techCards.length;
 const count = NUMERAL[n] ?? String(n);
 return `${count} ${n === 1 ? "technology" : "technologies"}. One device.`;
}

interface Props {
 config: ProductConfig;
}

export function ProductLanding({ config }: Props) {
 const [product, setProduct] = useState<any>(null);
 const [loading, setLoading] = useState(true);
 const [selectedImage, setSelectedImage] = useState(0);
 const [selectedBundle, setSelectedBundle] = useState<BundleKey>("ritual-set");
 const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
 const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
 const [showSticky, setShowSticky] = useState(false);
 const [gelPrice, setGelPrice] = useState(18);
 const [maskPrice, setMaskPrice] = useState(18);
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
   // Initialize selected options from first variant
   const v0 = p?.variants?.edges?.[0]?.node;
   if (v0?.selectedOptions) {
    const init: Record<string, string> = {};
    (v0.selectedOptions as { name: string; value: string }[]).forEach(o => { init[o.name] = o.value; });
    setSelectedOptions(init);
   }
   setLoading(false);
  })();
 }, [config.handle, config.purchaseHandle]);

 useEffect(() => {
  fetchProductByHandle("restore-gel").then(p => {
   const price = parseFloat(p?.variants?.edges?.[0]?.node?.price?.amount ?? "");
   if (!isNaN(price)) setGelPrice(price);
  }).catch(() => {});
  fetchProductByHandle("restore-pads").then(p => {
   const price = parseFloat(p?.variants?.edges?.[0]?.node?.price?.amount ?? "");
   if (!isNaN(price)) setMaskPrice(price);
  }).catch(() => {});
 }, []);

 // Fire ViewContent (Meta) + view_item (GA4) once product price is known
 useEffect(() => {
  if (loading || !variant) return;
  const w = window as any;
  if (w.fbq) {
   w.fbq('track', 'ViewContent', {
    content_name: config.name,
    content_ids: [variant.id],
    content_type: 'product',
    value: basePrice,
    currency: currency,
   });
  }
  if (w.gtag) {
   w.gtag('event', 'view_item', {
    currency,
    value: basePrice,
    items: [{
     item_id: config.handle,
     item_name: config.name,
     price: basePrice,
     quantity: 1,
    }],
   });
  }
  // Google Ads (dormant unless VITE_GOOGLE_ADS_ID is set)
  trackViewItem({ id: config.handle, name: config.name, price: basePrice, currency });
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [loading]);

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => setShowSticky(!entry.isIntersecting),
   { threshold: 0 }
  );
  if (ctaRef.current) observer.observe(ctaRef.current);
  return () => observer.disconnect();
 }, [loading]);

 if (loading) return (
  <div className="min-h-screen flex items-center justify-center bg-white">
   <Loader2 className="animate-spin text-[#8E8E8E]" size={32} />
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
 const basePrice = parseFloat(variant?.price?.amount || "88");
 const currency = variant?.price?.currencyCode || "EUR";
 const problemImageSrc = REAL_ISSUE_IMAGE_OVERRIDES[config.handle] || config.problemImage || config.beforeAfter.before;

 // Color label mapping (Shopify uses "Pink" but we display "Rose")
 const colorLabelMap: Record<string, string> = { Pink: "Rose", Silver: "Silver" };
 const colorSwatchMap: Record<string, string> = { Pink: "bg-pink-300", Silver: "bg-gray-300" };

 const handleVariantChange = (idx: number) => {
  setSelectedVariantIdx(idx);
  const variantImage = variants[idx]?.node?.image;
  if (variantImage?.url && images.length > 1) {
   const matchIdx = images.findIndex((img: any) => img.node.url === variantImage.url);
   setSelectedImage(matchIdx >= 0 ? matchIdx : 0);
  }
 };

 const selectOption = (name: string, value: string) => {
  const next = { ...selectedOptions, [name]: value };
  setSelectedOptions(next);
  const idx = variants.findIndex((v: any) =>
   (v.node.selectedOptions as { name: string; value: string }[]).every(o => next[o.name] === o.value)
  );
  if (idx >= 0) handleVariantChange(idx);
 };

 const bundles = buildBundles(gelPrice, maskPrice);
 const bundle = bundles.find(b => b.key === selectedBundle)!;
 const bundlePrice = basePrice + bundle.addon;
 const savings = bundle.saveAmount;

 const handleAdd = async () => {
  if (!variant) return;
  await addItem({
   product: { node: product },
   variantId: variant.id,
   variantTitle: variant.title,
   price: variant.price,
   quantity: 1,
   selectedOptions: variant.selectedOptions || [],
  });

  // Meta Pixel: AddToCart
  const w = window as any;
  if (w.fbq) {
   w.fbq('track', 'AddToCart', {
    content_name: config.name,
    content_ids: [variant.id],
    content_type: 'product',
    value: bundlePrice,
    currency: currency,
   });
  }
  // GA4: add_to_cart
  if (w.gtag) {
   w.gtag('event', 'add_to_cart', {
    currency,
    value: bundlePrice,
    items: [{
     item_id: config.handle,
     item_name: config.name,
     price: bundlePrice,
     quantity: 1,
    }],
   });
  }
  // Google Ads (dormant unless VITE_GOOGLE_ADS_ID is set)
  trackAddToCart({ id: config.handle, name: config.name, price: bundlePrice, currency });

  // Auto-add Collagen Face Gel for Ritual Set and Pro Set
  if (selectedBundle === "ritual-set" || selectedBundle === "pro-set") {
   try {
    const gelFetched = await fetchProductByHandle("restore-gel");
    const gelVariant = gelFetched?.variants?.edges?.[0]?.node;
    if (gelVariant) {
     await addItem({
      product: gelFetched,
      variantId: gelVariant.id,
      variantTitle: gelVariant.title,
      price: gelVariant.price,
      quantity: 1,
      selectedOptions: gelVariant.selectedOptions || [],
     });
    } else {
     toast.error("Collagen Gel couldn't be added, please add it manually.", { position: "top-center" });
    }
   } catch (e) {
    console.error("Failed to auto-add Collagen Face Gel:", e);
    toast.error("Collagen Gel couldn't be added, please add it manually.", { position: "top-center" });
   }
  }

  // Auto-add PDRN Mask for Pro Set
  if (selectedBundle === "pro-set") {
   try {
    const maskFetched = await fetchProductByHandle("restore-pads");
    const maskVariant = maskFetched?.variants?.edges?.[0]?.node;
    if (maskVariant) {
     await addItem({
      product: maskFetched,
      variantId: maskVariant.id,
      variantTitle: maskVariant.title,
      price: maskVariant.price,
      quantity: 1,
      selectedOptions: maskVariant.selectedOptions || [],
     });
    } else {
     toast.error("PDRN Mask couldn't be added, please add it manually.", { position: "top-center" });
    }
   } catch (e) {
    console.error("Failed to auto-add PDRN Mask:", e);
    toast.error("PDRN Mask couldn't be added, please add it manually.", { position: "top-center" });
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
  <div className="min-h-screen bg-white text-[#141414]">
   <AnnouncementBar />
   <Header />

   {/* ── SECTION 1: ABOVE THE FOLD ── */}
   <section className="section-padding">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-16 items-start">
     {/* Gallery */}
     <div className="space-y-4">
      <div className="relative" style={{ aspectRatio: '4/5' }}>
       {/* Main image */}
       <div className="w-full h-full overflow-hidden bg-[#F2F4F3] group cursor-zoom-in" style={{ borderRadius: 0 }}>
        {images[selectedImage] ? (
         <img src={images[selectedImage].node.url} alt={config.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
         <div className="w-full h-full flex items-center justify-center text-[#8E8E8E] text-sm">No image available</div>
        )}
       </div>
       {/* Inset detail shot */}
       {images.length > 1 && (
        <div
         className="absolute overflow-hidden"
         style={{
          width: '48%',
          aspectRatio: '1/1',
          bottom: -16,
          right: -16,
          border: '3px solid #FFFFFF',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          cursor: 'pointer',
         }}
         onClick={() => setSelectedImage(selectedImage === 0 ? 1 : 0)}
        >
         <img
          src={images[selectedImage === 0 ? 1 : 0].node.url}
          alt="Detail"
          className="w-full h-full object-cover"
         />
        </div>
       )}
      </div>
      {images.length > 2 && (
       <div className="flex gap-3 overflow-x-auto pb-1 pt-6">
        {images.map((img: any, i: number) => (
         <button key={i} onClick={() => setSelectedImage(i)}
          className={`w-16 h-16 flex-shrink-0 border-2 transition-all overflow-hidden ${i === selectedImage ? "border-[rgba(20,20,20,0.35)]" : "border-transparent opacity-50 hover:opacity-80"}`}
          style={{ borderRadius: 0 }}>
          <img src={img.node.url} alt="" className="w-full h-full object-cover" />
         </button>
        ))}
       </div>
      )}
     </div>

     {/* Product Info */}
     <div className="lg:sticky lg:top-32">
      <div className="flex items-center gap-3 mb-5">
       <span className="block w-8 h-px bg-[rgba(20,20,20,0.25)]" />
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">Zential Pure</p>
      </div>
      <h1 className="font-sans font-light text-[34px] md:text-[44px] lg:text-[52px] leading-[1.02] tracking-[-0.03em] text-[#141414] mb-4">{config.name}</h1>
      <p className="text-[#5A5A5A] text-[15px] md:text-base leading-relaxed mb-8 max-w-md">{config.subheadline}</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
       {config.benefits.map(b => (
        <div key={b.label} className="flex items-center gap-2.5 text-sm text-[#141414]">
         <div className="w-8 h-8 rounded-none bg-[#F4FBF8] flex items-center justify-center flex-shrink-0">
          <b.icon size={15} className="text-[#0E7A54]" />
         </div>
         {b.label}
        </div>
       ))}
      </div>



      {/* Variant selector, renders for any product with real options */}
      {hasMultipleVariants && (product?.options || []).filter((o: any) => !(o.values.length === 1 && o.values[0] === 'Default Title')).length > 0 && (
       <div className="mb-8 space-y-4">
        {(product.options as { name: string; values: string[] }[])
         .filter((o: any) => !(o.values.length === 1 && o.values[0] === 'Default Title'))
         .map((opt: { name: string; values: string[] }) => {
          const isColorOpt = /colou?r/i.test(opt.name);
          const currentVal = selectedOptions[opt.name];
          return (
           <div key={opt.name}>
            <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-2.5 text-[#8E8E8E]">
             {opt.name}:&nbsp;
             <span className="text-[#141414]">
              {colorLabelMap[currentVal] ?? currentVal}
             </span>
            </p>
            <div className="flex gap-2 flex-wrap">
             {opt.values.map((val: string) => {
              const isSelected = currentVal === val;
              const swatch = colorSwatchMap[val];
              return isColorOpt && swatch ? (
               <button
                key={val}
                onClick={() => selectOption(opt.name, val)}
                title={colorLabelMap[val] ?? val}
                className={`w-8 h-8 rounded-full border-2 transition-all ${swatch} ${isSelected ? 'border-[#0E7A54] ring-2 ring-[#0E7A54]/30 scale-110' : 'border-[rgba(20,20,20,0.2)] hover:border-[rgba(20,20,20,0.5)]'}`}
               />
              ) : (
               <button
                key={val}
                onClick={() => selectOption(opt.name, val)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-all ${isSelected ? 'border-[#0E7A54] bg-[#F4FBF8] text-[#141414]' : 'border-[rgba(20,20,20,0.2)] text-[#5A5A5A] hover:border-[rgba(20,20,20,0.5)] hover:text-[#141414]'}`}
               >
                {colorLabelMap[val] ?? val}
               </button>
              );
             })}
            </div>
           </div>
          );
         })}
       </div>
      )}

      {/* Value anchor, clinic cost vs. device */}
      {config.valueAnchor && (
       <p className="text-[11px] text-[#8E8E8E] text-center mb-4 tracking-wide leading-snug">
        {config.valueAnchor}
       </p>
      )}

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
            className={`relative flex-1 text-center px-3 py-3 rounded-none border transition-all text-sm ${isSelected ? "border-[#0E7A54] bg-[#F4FBF8]" : "border-[rgba(20,20,20,0.12)] hover:border-[rgba(20,20,20,0.35)]"}`}
           >
            {opt.badge && (
             <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${opt.badge === "Best Value" ? "bg-[#0E7A54] text-white" : "bg-[#2ED8A8] text-[#141414]"}`}>
              {opt.badge}
             </span>
            )}
            <span className={`block text-xs font-semibold ${isSelected ? "text-[#141414]" : "text-[#8E8E8E]"}`}>{opt.label}</span>
            <span className={`block text-[10px] mt-0.5 ${isSelected ? "text-[#5A5A5A]" : "text-[#8E8E8E]"}`}>{opt.desc}</span>
           </button>
          );
         })}
        </div>
       </div>
      )}

      <div className="flex items-baseline gap-3 mb-1">
       <span className="font-sans font-semibold tracking-[-0.02em] text-[34px] md:text-[40px] leading-none text-[#141414]">{formatMoney(bundlePrice, currency)}</span>
       {bundle.savePercent > 0 && (
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#0E7A54] bg-[#F4FBF8] px-2.5 py-1 rounded-full">Save {bundle.savePercent}%</span>
       )}
      </div>
      {savings > 0 && <p className="text-sm text-[#0E7A54] mb-6">You save {formatMoney(savings, currency)}</p>}
      {savings === 0 && <div className="mb-6" />}

      {meta.trust_statement && (
       <p className="text-xs text-[#8E8E8E] text-center mb-4 leading-relaxed">
        "{meta.trust_statement}"
       </p>
      )}

      <ScarcityBanner signal={meta.inventory_signal} />

      <div ref={ctaRef}>
       <button
        onClick={handleAdd}
        onFocus={prefetchCheckout}
        onTouchStart={prefetchCheckout}
        onMouseEnter={prefetchCheckout}
        disabled={isCartLoading || !variant?.availableForSale}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-40 disabled:cursor-not-allowed"
       >
        {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : `Order the ${config.name}`}
       </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5">
       {[
        config.guaranteeName ?? "30-Day Guarantee",
        "Secure Checkout",
        "3–7 Day EU Delivery",
       ].map(label => (
        <div key={label} className="flex items-center gap-2 font-sans text-[12px] text-[#5A5A5A]">
         <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#2ED8A8]" /> {label}
        </div>
       ))}
      </div>

      <PaymentBadges className="mt-4" />

      {/* Bonus stack, "Everything included" */}
      {config.bonusStack && config.bonusStack.length > 0 && (
       <div className="mt-6 pt-5 border-t border-[rgba(20,20,20,0.10)]">
        <p className="text-[9px] tracking-[0.25em] uppercase text-[#8E8E8E] mb-3">Everything included with your order</p>
        <ul className="space-y-2">
         {config.bonusStack.map((b) => (
          <li key={b.title} className="flex items-start gap-2.5">
           <span className="text-[#0E7A54] mt-0.5 shrink-0 text-xs">✓</span>
           <div className="flex-1 min-w-0">
            <span className="text-[11px] font-medium text-[#141414]">{b.title}</span>
            <span className="text-[10px] text-[#8E8E8E] ml-1.5"> {b.desc}</span>
           </div>
           <span className="text-[10px] text-[rgba(20,20,20,0.35)] shrink-0 line-through">{b.value}</span>
          </li>
         ))}
        </ul>
        {config.guaranteeName && config.guaranteeDesc && (
         <div className="mt-4 p-3 rounded-none bg-white border border-[rgba(20,20,20,0.10)]">
          <p className="text-[10px] font-semibold tracking-wide uppercase text-[#5A5A5A] mb-1">{config.guaranteeName}</p>
          <p className="text-[10px] text-[#8E8E8E] leading-relaxed">{config.guaranteeDesc}</p>
         </div>
        )}
       </div>
      )}

      {/* By the numbers, micro trust strip */}
      <div className="mt-8 pt-6 border-t border-[rgba(20,20,20,0.10)] grid grid-cols-3 gap-2 text-center">
       <div>
        <p className="font-sans font-light text-2xl tracking-[-0.02em] text-[#141414] leading-none">{config.techCards.length}</p>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#8E8E8E] mt-1.5">Clinical<br/>Modalities</p>
       </div>
       <div className="border-x border-[rgba(20,20,20,0.10)]">
        <p className="font-sans font-light text-2xl tracking-[-0.02em] text-[#141414] leading-none">30</p>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#8E8E8E] mt-1.5">Day<br/>Guarantee</p>
       </div>
       <div>
        <p className="font-sans font-light text-2xl tracking-[-0.02em] text-[#141414] leading-none">2yr</p>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#8E8E8E] mt-1.5">Device<br/>Warranty</p>
       </div>
      </div>
     </div>
    </div>
   </section>

   {/* ── SCIENCE STRIP (metafields) ── */}
   {(meta.mechanism_primary || meta.mechanism_benefit) && (
    <section className="py-14 bg-white border-y border-[rgba(20,20,20,0.10)]">
     <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
      {meta.mechanism_primary && (
       <p className="text-base md:text-lg leading-relaxed text-[#141414]">{meta.mechanism_primary}</p>
      )}
      {meta.mechanism_benefit && (
       <p className="text-sm md:text-base leading-relaxed text-[#5A5A5A]">{meta.mechanism_benefit}</p>
      )}
      {meta.guarantee_block && (
       <p className="text-xs tracking-[0.2em] uppercase text-[#8E8E8E] pt-2">{meta.guarantee_block}</p>
      )}
     </div>
    </section>
   )}

   {/* ── RITUAL INSTRUCTIONS (metafield) ── */}
   {meta.ritual_instructions && (
    <section className="py-12 px-6 bg-white">
     <div className="max-w-2xl mx-auto">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4 text-center">Your Protocol</p>
      <div className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-6 md:p-8">
       <p className="text-sm text-[#5A5A5A] leading-[1.9] whitespace-pre-line">{meta.ritual_instructions}</p>
      </div>
     </div>
    </section>
   )}

   {/* ── SECTION 2: TRUST INSTEAD OF REVIEWS ── */}
   <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white">
    <div className="max-w-[1100px] mx-auto">
     <div className="text-center mb-14 max-w-2xl mx-auto">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-4 text-[#8E8E8E]"> Why You Can Trust This </p>
      <h2 className="font-sans font-light text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.025em] mb-5 text-[#141414]">
       We launched in 2026.<br/>We won't fabricate reviews.
      </h2>
      <p className="text-[15px] leading-relaxed text-[#5A5A5A]">
       Instead, here's what we offer in their place, concrete, verifiable, and refundable.
      </p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[
       { eyebrow: "Evidence", title: "Peer-reviewed studies", body: "Every modality on this device, microcurrent, EMS, thermal, is referenced to published clinical research. We link the actual papers below.", cta: "See studies →" },
       { eyebrow: "Guarantee", title: "30 days. No conditions.", body: "Use it nightly for 30 days. If your skin doesn't show change, we refund you in full. No restocking fee, no questionnaire, no friction.", cta: "Read policy →" },
       { eyebrow: "Ownership", title: "Bought once, backed for a year", body: "A 1-year warranty against manufacturing defects and failure in normal use, on top of the 30-day money-back window. We cover shipping both ways.", cta: "Read the terms →" },
      ].map((card, i) => (
       <div key={i} className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-500">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-5 text-[#0E7A54]"> {card.eyebrow} </p>
        <h3 className="font-sans font-normal text-[24px] leading-[1.1] tracking-[-0.02em] mb-4 text-[#141414]">{card.title}</h3>
        <p className="text-sm leading-relaxed mb-6 text-[#5A5A5A]">{card.body}</p>
        <p className="text-[11px] tracking-[0.18em] uppercase cursor-default text-[#0E7A54]">{card.cta}</p>
       </div>
      ))}
     </div>

     <p className="font-sans font-light text-lg md:text-xl text-center max-w-xl mx-auto leading-relaxed mt-14 text-[#5A5A5A]">
      "Honest beats inflated. The device works, or your money comes back."
     </p>
    </div>
   </section>

   {/* ── TESTIMONIALS ── */}
   {config.testimonials && config.testimonials.length > 0 && (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white">
     <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-12">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> From the Community </p>
       <h2 className="font-sans font-light text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.025em] text-[#141414]">Early adopters. Honest accounts.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
       {config.testimonials.map((t, i) => (
        <div key={i} className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-7">
         <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, j) => (
           <Star key={j} size={12} className="text-[#0E7A54] fill-[#0E7A54]" />
          ))}
         </div>
         <p className="text-sm text-[#5A5A5A] leading-relaxed mb-5">"{t.text}"</p>
         <p className="text-[11px] tracking-[0.15em] uppercase text-[#8E8E8E] font-medium">{t.name}</p>
        </div>
       ))}
      </div>
      <p className="text-center text-[10px] text-[#8E8E8E] mt-8">
       Results not typical. Individual results may vary.
      </p>
     </div>
    </section>
   )}

   {/* ── SECTION 3: PROBLEM REFRAME ── */}
   <section className="section-padding">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
     <div className="aspect-[4/5] rounded-none overflow-hidden bg-[#F2F4F3] flex items-center justify-center">
      <img src={problemImageSrc} alt={`${config.name} Real Issue`} className="w-full h-full object-contain" />
     </div>
     <div>
      <div className="flex items-center gap-3 mb-4">
       <span className="block w-8 h-px bg-[rgba(20,20,20,0.25)]" />
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">The Real Issue</p>
      </div>
      <h2 className="font-sans font-light text-[30px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-[#141414] mb-6">{config.problemReframe.headline}</h2>
      <div className="space-y-4 text-[#5A5A5A] leading-relaxed">
       {config.problemReframe.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
       <p className="font-medium text-[#141414]">{config.problemReframe.closing}</p>
      </div>
     </div>
    </div>
   </section>

   {/* ── FOR YOU IF ── */}
   {config.forYouIf && config.forYouIf.length > 0 && (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 bg-white border-y border-[rgba(20,20,20,0.10)]">
     <div className="max-w-2xl mx-auto">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-6 text-center text-[#8E8E8E]"> This instrument is for you if </p>
      <ul className="space-y-5">
       {config.forYouIf.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
         <span className="font-sans text-[13px] font-semibold tabular-nums text-[#0E7A54] flex-shrink-0 mt-[3px]">
          {String(i + 1).padStart(2, '0')}
         </span>
         <p className="text-[15px] leading-relaxed text-[#141414]">{item}</p>
        </li>
       ))}
      </ul>
      <p className="mt-10 text-center">
       <a
        href="#technology"
        className="text-[11px] tracking-[0.2em] uppercase transition-colors border-b border-[rgba(20,20,20,0.2)] pb-0.5 text-[#0E7A54] hover:text-[#1BAF86]"
       >
        The science behind this instrument →
       </a>
      </p>
     </div>
    </section>
   )}

   {/* ── SECTION 4: TECHNOLOGY BREAKDOWN ── */}
   <section id="technology" className="section-padding bg-white">
    <div className="max-w-[1200px] mx-auto">
     <div className="text-center mb-14">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> Technology </p>
      <h2 className="font-sans font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#141414]">{techSectionTitle(config)}</h2>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {config.techCards.map((card, i) => (
       <div
        key={card.title}
        className={[
         "rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-6 text-center group hover:shadow-md transition-all duration-300",
         config.techCards.length === 6 && i === 4 ? "lg:col-start-2" : "",
         config.techCards.length === 6 && i === 5 ? "lg:col-start-3" : "",
        ].join(" ")}
       >
        <div className="w-12 h-12 rounded-none bg-[#F4FBF8] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#E3F6EE] transition-colors">
         <card.icon size={22} className="text-[#0E7A54]" />
        </div>
        <h3 className="font-semibold text-[#141414] mb-2">{card.title}</h3>
        <p className="text-sm text-[#5A5A5A] leading-relaxed">{card.desc}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* ── SECTION 4a: SKIN FIT (blocker 2, skin type suitability) ── */}
   <SkinFitSection />

   {/* ── SECTION 4b: WE SHOW OUR WORK ── */}
   {config.studyCards && config.studyCards.length > 0 && (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white border-y border-[rgba(20,20,20,0.10)]">
     <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-3 text-[#8E8E8E]">Transparency</p>
       <h2 className="font-sans font-light tracking-[-0.025em] text-2xl md:text-3xl lg:text-4xl text-[#141414] max-w-2xl mx-auto leading-snug mb-4">
        Every brand in this category will tell you they're science-backed. Here's ours.
       </h2>
       <p className="text-sm text-[#5A5A5A] max-w-lg mx-auto">
        We link the actual studies. Read them, or don't, but they're there.
       </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
       {config.studyCards.map((study, i) => (
        <a
         key={i}
         href={study.url}
         target="_blank"
         rel="noopener noreferrer"
         className="rounded-none p-6 border border-[rgba(20,20,20,0.10)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
        >
         <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3 text-[#0E7A54]">{study.technology}</p>
         <h3 className="text-sm font-semibold text-[#141414] mb-2 leading-relaxed">{study.studyTitle}</h3>
         <p className="text-xs text-[#8E8E8E] mb-4">{study.journal}</p>
         <span className="inline-flex items-center gap-1.5 text-xs font-medium group-hover:underline text-[#0E7A54]">
          Read study <ExternalLink size={11} />
         </span>
        </a>
       ))}
      </div>
      <p className="font-sans font-light text-lg md:text-xl text-[#5A5A5A] text-center max-w-xl mx-auto leading-relaxed">
       "The device works or you get your money back. That's the whole offer."
      </p>
     </div>
    </section>
   )}

   {/* ── SECTION 4c: SAFETY & USAGE ── */}
   {config.contraindications && config.contraindications.length > 0 && (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-white">
     <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-3 text-[#8E8E8E]">Before You Begin</p>
       <h2 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl text-[#141414]">Who should not use this device</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto mb-12">
       <div>
        <div className="flex items-center gap-2 mb-5">
         <AlertTriangle size={16} className="text-[#8E8E8E]" />
         <h3 className="font-semibold text-[#141414] text-sm tracking-wide uppercase">Contraindications</h3>
        </div>
        <ul className="space-y-3">
         {config.contraindications.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A5A5A] leading-relaxed">
           <X size={14} className="text-[#8E8E8E] mt-0.5 flex-shrink-0" />
           {item}
          </li>
         ))}
        </ul>
       </div>
       {config.normalSensations && (
        <div>
         <div className="flex items-center gap-2 mb-5">
          <Heart size={16} className="text-[#0E7A54]" />
          <h3 className="font-semibold text-[#141414] text-sm tracking-wide uppercase">Normal Sensations</h3>
         </div>
         <ul className="space-y-3">
          {config.normalSensations.map((item, i) => (
           <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A5A5A] leading-relaxed">
            <Check size={14} className="text-[#0E7A54] mt-0.5 flex-shrink-0" />
            {item}
           </li>
          ))}
         </ul>
        </div>
       )}
      </div>
      {config.sessionInfo && (
       <p className="text-center text-xs text-[#8E8E8E] max-w-xl mx-auto leading-relaxed">
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
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> Your Ritual </p>
      <h2 className="font-sans font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#141414]">The five-minute ritual.</h2>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {config.ritualSteps.map((s, i) => (
       <div key={i} className="text-center">
        <div className="w-16 h-16 rounded-full border border-[rgba(20,20,20,0.15)] flex items-center justify-center mx-auto mb-5">
         <span className="font-sans text-xl font-semibold text-[#0E7A54]">{s.step}</span>
        </div>
        <h3 className="text-lg font-semibold text-[#141414] mb-2">{s.title}</h3>
        <p className="text-sm text-[#5A5A5A] leading-relaxed max-w-xs mx-auto">{s.desc}</p>
        {i < config.ritualSteps.length - 1 && (
         <div className="hidden md:flex justify-center mt-6">
          <ArrowRight size={20} className="text-[rgba(20,20,20,0.25)]" />
         </div>
        )}
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* ── SECTION 6: MECHANISM TIMELINE ── */}
   <section className="section-padding bg-white">
    <div className="max-w-[1200px] mx-auto">
     <div className="text-center mb-14">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> Consistent Use </p>
      <h2 className="font-sans font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#141414]">What the mechanism produces.</h2>
      <p className="text-[#5A5A5A] mt-5 max-w-sm mx-auto text-sm leading-relaxed">
       Results are individual. These are the biological processes at work with daily use.
      </p>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {(config.mechanismTimeline ?? [
       {
        week: "Week 1–2",
        heading: "Cellular activation",
        body: "Microcurrent begins re-establishing neuromuscular pathways. Galvanic delivery shifts how actives absorb. Skin texture and morning puffiness typically respond first.",
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
      ]).map((t, i) => (
       <div key={i} className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-8 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E7A54] mb-3">{t.week}</p>
        <h3 className="text-lg font-semibold text-[#141414] mb-3">{t.heading}</h3>
        <p className="text-sm text-[#5A5A5A] leading-relaxed">{t.body}</p>
       </div>
      ))}
     </div>
     <p className="text-center text-[10px] text-[#8E8E8E] mt-8 max-w-md mx-auto">
      Descriptions reflect mechanisms supported by clinical literature, not guaranteed outcomes. Individual results vary.
     </p>
    </div>
   </section>

   {/* ── SECTION 7: COMPARISON TABLE ── */}
   <section className="section-padding">
    <div className="max-w-[1200px] mx-auto">
     <div className="text-center mb-14">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> Compare </p>
      <h2 className="font-sans font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#141414]">Why {config.name}.</h2>
     </div>
     <div className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white overflow-hidden max-w-4xl mx-auto overflow-x-auto">
      <table className="w-full text-sm">
       <thead>
        <tr className="border-b border-[rgba(20,20,20,0.10)]">
         <th className="p-4 text-left text-xs tracking-[0.1em] uppercase text-[#8E8E8E] font-semibold" />
         <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-[#0E7A54] font-semibold">{config.name}</th>
         <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-[#8E8E8E] font-semibold">Clinic</th>
         <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-[#8E8E8E] font-semibold">Creams</th>
         <th className="p-4 text-center text-xs tracking-[0.1em] uppercase text-[#8E8E8E] font-semibold">Generic Devices</th>
        </tr>
       </thead>
       <tbody>
        {config.comparisonRows.map((row, i) => (
         <tr key={i} className="border-b border-[rgba(20,20,20,0.06)] last:border-0">
          <td className="p-4 font-medium text-[#141414]">{row.feature}</td>
          {(["zential", "clinic", "creams", "generic"] as const).map(col => {
           const val = row[col];
           return (
            <td key={col} className="p-4 text-center">
             {typeof val === "boolean" ? (
              val ? <Check size={16} className="text-[#0E7A54] mx-auto" /> : <X size={16} className="text-[rgba(20,20,20,0.3)] mx-auto" />
             ) : (
              <span className={col === "zential" ? "font-semibold text-[#141414]" : "text-[#5A5A5A]"}>{val}</span>
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
   <section className="section-padding bg-white">
    <div className="max-w-[1200px] mx-auto">
     <div className="text-center mb-14">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> Questions </p>
      <h2 className="font-sans font-light text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#141414]">Frequently asked.</h2>
     </div>
     <div className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible>
       {config.faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-[rgba(20,20,20,0.10)]">
         <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5">{faq.q}</AccordionTrigger>
         <AccordionContent className="text-[#5A5A5A] text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
        </AccordionItem>
       ))}
      </Accordion>
     </div>
    </div>
   </section>

   {/* ── TRUSTPILOT REVIEWS ── */}
   <TrustpilotStrip />

   {/* ── PART OF A PROTOCOL (system cross-sell) ── */}
   <ProtocolCrossSell handle={config.handle} purchaseHandle={config.purchaseHandle} />

   {/* ── RELATED PRODUCTS ── */}
   <RelatedProducts currentHandle={config.handle} />

   {/* ── SECTION 8b: 3-STEP PLAN ── */}
   <section className="px-6 md:px-12 lg:px-20 py-20 md:py-24 bg-white">
    <div className="max-w-[860px] mx-auto">
     <div className="text-center mb-12">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4"> How It Works </p>
      <h2 className="font-sans font-light text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.025em] text-[#141414]">
       Three steps. Then it runs itself.
      </h2>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
       { step: "01", title: "Order", body: "Arrives in 3–5 days. The Protocol Guide ships with it, no onboarding required." },
       { step: "02", title: "Start the protocol", body: "10 minutes. Five-step sequence. Take a Day 1 photo before you begin." },
       { step: "03", title: "Track the compound", body: "Week 3 is where most people notice the shift. Pull up the Day 1 photo. Compare." },
      ].map(s => (
       <div key={s.step} className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-7 relative">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#0E7A54] font-medium block mb-4">{s.step}</span>
        <h3 className="font-sans font-medium tracking-[-0.01em] text-[20px] text-[#141414] mb-3">{s.title}</h3>
        <p className="text-sm text-[#5A5A5A] leading-relaxed">{s.body}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* ── SECTION 9: FINAL CTA ── */}
   <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white border-t border-[rgba(20,20,20,0.10)]">
    <div className="max-w-[1200px] mx-auto text-center">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-5"> The Promise </p>
     <h2 className="font-sans font-light text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.03em] text-[#141414] mb-6">30 days. Full refund.<br/>No questions.</h2>
     <p className="text-[#5A5A5A] text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">Email info@zentialpure.com. We refund. No forms, no photos, no hassle.</p>
     <button
      onClick={handleAdd}
      onFocus={prefetchCheckout}
      onTouchStart={prefetchCheckout}
      onMouseEnter={prefetchCheckout}
      disabled={isCartLoading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-12 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-40 disabled:cursor-not-allowed"
     >
      {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : `Order the ${config.name}`}
     </button>
     <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10">
      {[
       "30-Day Guarantee",
       "Free EU Shipping",
       "Secure Payment",
      ].map(label => (
       <div key={label} className="flex items-center gap-2 font-sans text-[12px] text-[#5A5A5A]">
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#2ED8A8]" /> {label}
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* ── STICKY BAR ── */}
   <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
    <div className="bg-white/95 backdrop-blur-lg border-t border-[rgba(20,20,20,0.10)] shadow-lg">
     <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
       {images[0] && <img src={images[0].node.url} alt="" className="w-10 h-10 rounded-none object-cover flex-shrink-0" />}
       <div className="min-w-0">
        <p className="font-semibold text-[#141414] text-sm truncate">{config.name}</p>
        <p className="text-xs text-[#5A5A5A]">
         {formatMoney(bundlePrice, currency)}
         {bundle.savePercent > 0 && <span className="ml-1.5 text-[#0E7A54]">Save {bundle.savePercent}%</span>}
        </p>
       </div>
      </div>
      <button
       onClick={handleAdd}
       onFocus={prefetchCheckout}
       onTouchStart={prefetchCheckout}
       onMouseEnter={prefetchCheckout}
       disabled={isCartLoading}
       className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-6 py-3 font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-40 disabled:cursor-not-allowed"
      >
       {isCartLoading ? <Loader2 className="animate-spin" size={14} /> : `Order the ${config.name}`}
      </button>
     </div>
    </div>
   </div>

   <ZentialFooter />
  </div>
 );
}
