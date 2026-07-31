import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProductConfig } from "@/data/productConfigs";
import { fetchProductByHandle } from "@/lib/shopify";
import { ProductLanding } from "@/components/zential/ProductLanding";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { SEO } from "@/components/SEO";

const PRODUCT_SEO: Record<string, { title: string; description: string }> = {
 "lifting-and-tightening-face-introducer": {
  title: "Microcurrent Face Device, Face Introducer | Zential Pure",
  description: "EMS, microcurrent and 45°C thermal. Three modalities in one daily ritual at clinic precision. €88.",
 },
 "body-lift": {
  title: "Body Lift, Microcurrent Body Sculpting Device | Zential Pure",
  description: "Microcurrent, EMS, and sonic pulse for the body. Stimulates tissue, supports visible firming with consistent daily use.",
 },
 "eye-massage": {
  title: "Eye Activator, Microcurrent Eye Contour Device | Zential Pure",
  description: "Microcurrent, sonic vibration, and cosmetic LED for the periorbital zone. Supports lymphatic drainage and tone with consistent use. €88.",
 },
 "color-light-import-micro-current-vibration-massager": {
  title: "Frequency Wand, Full-Face EMS Device | Zential Pure",
  description: "High-frequency EMS across multiple treatment modes. Supports improved circulation, clarity, and visible skin tone with daily use. €147.",
 },
 "electric-guasha-massager": {
  title: "Electric Gua Sha Device, Gua Sha Frequency | Zential Pure",
  description: "Electric gua sha with built-in microcurrent frequency. Stimulates lymphatic drainage, supports facial sculpting. 5-minute morning ritual. €88.",
 },
 "electric-micro-current": {
  title: "Skin Pulse, Daily Microcurrent Face Device | Zential Pure",
  description: "Microcurrent that stimulates ATP production and re-educates facial muscles. The entry point to consistent at-home facial structure. €88.",
 },
 "facial-beauty-tools-and-ems-beauty-equipment": {
  title: "Sculpt Wand, Jaw Toning EMS Device | Zential Pure",
  description: "Precision EMS delivers targeted electrical pulses to the jawline and cheekbones. Defined facial contours with consistent daily use. €88.",
 },
 "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": {
  title: "Frame Pulse, Clinical Red Light + Microcurrent Eye Activator | Zential Pure",
  description: "Clinical red light therapy at 630–660nm with microcurrent for the eye and upper-face zone. Hands-free wearable, 8-minute daily protocol. €149.",
 },
 "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": {
  title: "Face Lift Device, Red Light & EMS | Zential Pure",
  description: "Dual-wavelength LED at 630nm and 415nm with EMS. Sculpts facial contours, supports skin renewal, and clarifies surface texture. €88.",
 },
 "portable-ems-microcurrent-facial-beauty-device": {
  title: "Frequency Wand Pro, Clinic-Precision EMS | Zential Pure",
  description: "Advanced EMS and microcurrent for deep facial muscle toning. Clinic-precision output at home. The replacement for repeated clinic sessions. €147.",
 },
 "medicube-collagen-elastic-jelly-moisturizing-cream": {
  title: "Restore Gel, Daily Collagen Support Gel | Zential Pure",
  description: "Collagen peptides and hyaluronic acid matrix for daily dermal support. Fast-absorbing topical for morning or evening protocol. €18.",
 },
 "collagen-eye-mask": {
  title: "Restore Pads, Collagen Under-Eye Protocol | Zential Pure",
  description: "Under-eye collagen pads with PDRN technology for concentrated periorbital renewal. 15–20 minutes, 3–4 times per week. €18.",
 },
 // ── New recovery / sleep / body products ──────────────────────────────────
 "breath-seal": {
  title: "Breath Seal, Nasal Breathing Tape | Zential Pure",
  description: "Medical-grade lip tape for nasal breathing during sleep. Activates the parasympathetic system and protects melatonin production. €14.",
 },
 "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers": {
  title: "Depth Mask, 3D Blackout Sleep Mask | Zential Pure",
  description: "Contoured 3D shell creates total light seal without pressing on eyes or lashes. Side-sleeper compatible. Melatonin protection all night. €29.",
 },
 "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": {
  title: "Flux Panel, 80W Full-Body Red Light Panel | Zential Pure",
  description: "660nm + 850nm dual-wavelength red light at 80W. Full-body photobiomodulation for skin, muscle recovery, and mitochondrial activation. €199.",
 },
 "household-red-light-charging-vibrating-red-light-therapy-mat": {
  title: "Frequency Mat +, Infrared Heat + Red Light Mat | Zential Pure",
  description: "Far-infrared heat and 660nm red light simultaneously in one full-body mat. 15-minute passive recovery protocol. €139.",
 },
 "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": {
  title: "Pressure Shell, Sequential Compression Recovery | Zential Pure",
  description: "4-chamber sequential pneumatic compression for leg recovery and lymphatic drainage. The same mechanism used in sports medicine. €159.",
 },
 "electric-foam-roller-muscle-relaxation-fitness-yoga-column": {
  title: "Pulse Roller, Percussion Vibration Recovery Tool | Zential Pure",
  description: "Percussive vibration for fascia release and muscle recovery. Retractable compact format. 3 minutes per muscle group. €109.",
 },
 "gravity-quilt-cotton-weighted-blanket": {
  title: "Rest Shell, 7kg Weighted Blanket | Zential Pure",
  description: "Pure cotton weighted blanket for parasympathetic activation during sleep. Reduces cortisol and supports faster sleep onset. €49.",
 },
 "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow": {
  title: "Restore Mat, Acupressure Mat & Pillow Set | Zential Pure",
  description: "6,210 acupressure points for fascia stimulation and systemic relaxation. Mat + pillow set. 10–20 minutes daily. €34.",
 },
 "led-beauty-lamp-red-light-therapy-lamp-desktop-stand": {
  title: "Ritual Light Pro, Desktop Red Light Therapy Lamp | Zential Pure",
  description: "Stationary 660nm red light panel for hands-free daily photobiomodulation. Sits at desk distance. 10–15 minutes while you're stationary. €89.",
 },
 "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": {
  title: "Thermal Zone Lite, USB Thermal Joint Wrap | Zential Pure",
  description: "Targeted USB thermal wrap for single-joint protocol. Knee, shoulder, wrist. 15 minutes daily. €59.",
 },
 "portable-home-use-charging-red-light-therapy-blanket-far-infrared": {
  title: "Thermal Shell, Full-Body Infrared Sauna Blanket | Zential Pure",
  description: "Far-infrared sauna blanket for core temperature elevation, heat shock protein induction, and recovery protocol at home. €189.",
 },
 "household-full-body-moisture-removing-infrared-sauna-blanket": {
  title: "Thermal Shell Lite, Infrared Sauna Blanket | Zential Pure",
  description: "Far-infrared sauna blanket in a lighter, more packable format. Same core temperature protocol. 30-minute sessions. €119.",
 },
 "null-1777641441133": {
  title: "Thermal Zone, Infrared LED Belt | Zential Pure",
  description: "360-node infrared LED belt for wearable body thermal and photobiomodulation protocol. Abdomen, waist, or lower back. €89.",
 },
 "red-light-therapy-belt-infrared-hot-compress-phototherapy": {
  title: "Thermal Pad, USB Heated Joint Recovery Pad | Zential Pure",
  description: "USB thermal pad with 4-motor massage for targeted joint recovery. Knee, shoulder, lower back. 15–20 minutes pre- or post-training. €69.",
 },
 "white-noise-sleep-aid-machine": {
  title: "Frequency Rest, White Noise Sleep Machine | Zential Pure",
  description: "20 ambient sound modes for acoustic sleep masking. Reduces micro-arousals, supports deeper sleep cycles and HRV recovery. USB compact format.",
 },
};

// Static prices for JSON-LD prerendering, async Shopify price overrides these client-side
const PRODUCT_PRICES: Record<string, string> = {
 "lifting-and-tightening-face-introducer": "88.00",
 "body-lift": "88.00",
 "eye-massage": "88.00",
 "color-light-import-micro-current-vibration-massager": "147.00",
 "electric-guasha-massager": "88.00",
 "electric-micro-current": "88.00",
 "facial-beauty-tools-and-ems-beauty-equipment": "88.00",
 "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": "149.00",
 "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": "88.00",
 "portable-ems-microcurrent-facial-beauty-device": "147.00",
 "medicube-collagen-elastic-jelly-moisturizing-cream": "18.00",
 "collagen-eye-mask": "18.00",
 "breath-seal": "14.00",
 "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers": "29.00",
 "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "180.00",
 "household-red-light-charging-vibrating-red-light-therapy-mat": "139.00",
 "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager": "159.00",
 "electric-foam-roller-muscle-relaxation-fitness-yoga-column": "109.00",
 "gravity-quilt-cotton-weighted-blanket": "49.00",
 "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow": "34.00",
 "led-beauty-lamp-red-light-therapy-lamp-desktop-stand": "89.00",
 "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad": "59.00",
 "the-restoration-mat": "200.00",
 "household-full-body-moisture-removing-infrared-sauna-blanket": "119.00",
 "null-1777641441133": "89.00",
 "red-light-therapy-belt-infrared-hot-compress-phototherapy": "69.00",
 "white-noise-sleep-aid-machine": "39.00",
};

function getProductJsonLd(handle: string, seo: { title: string; description: string }, price?: string, image?: string) {
 const resolvedPrice = price ?? PRODUCT_PRICES[handle];
 return {
  "@context": "https://schema.org",
  "@type": "Product",
  name: seo.title.split(", ")[0].split(" | ")[0],
  description: seo.description,
  brand: { "@type": "Brand", name: "Zential Pure" },
  url: `https://zentialpure.com/product/${handle}`,
  ...(image && { image }),
  offers: {
   "@type": "Offer",
   availability: "https://schema.org/InStock",
   priceCurrency: "EUR",
   url: `https://zentialpure.com/product/${handle}`,
   ...(resolvedPrice && { price: resolvedPrice }),
  },
 };
}

const SITE = "https://zentialpure.com";

/**
 * Recovery SKUs whose generic /product config still carries legacy copy
 * (the belt was authored as an "80W full-body panel", the mat as a "full-back
 * mat"). Their accurate, on-brand landing pages live at /instruments/<slug>,
 * so route these handles there instead of rendering the stale duplicate.
 */
const INSTRUMENT_REDIRECTS: Record<string, string> = {
 "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "restoration-belt",
 "household-red-light-charging-vibrating-red-light-therapy-mat": "restoration-mat",
};

export default function ProductDetail() {
 const { handle } = useParams<{ handle: string }>();
 const redirectSlug = handle ? INSTRUMENT_REDIRECTS[handle] : undefined;
 const config = handle && !redirectSlug ? getProductConfig(handle) : null;
 const seo = handle && PRODUCT_SEO[handle]
  ? PRODUCT_SEO[handle]
  : { title: `${config?.name || "Product"}, Zential Pure`, description: config?.subheadline || "Clinical-luxury beauty device by Zential Pure." };

 // Seed from bundled fallbackImage so prerendered HTML has a real og:image.
 // useEffect upgrades to the live Shopify CDN URL once JS runs.
 const staticOgImage = config?.fallbackImage
  ? `${SITE}${config.fallbackImage}`
  : undefined;

 const [ogImage, setOgImage] = useState<string | undefined>(staticOgImage);
 const [productPrice, setProductPrice] = useState<string | undefined>(undefined);

 useEffect(() => {
  if (!handle) return;
  fetchProductByHandle(handle).then(p => {
   const raw = p?.node;
   const img = raw?.images?.edges?.[0]?.node?.url;
   if (img) setOgImage(img);
   const price = raw?.variants?.edges?.[0]?.node?.price?.amount;
   if (price) setProductPrice(price);
  }).catch(() => {});
 }, [handle]);

 if (redirectSlug) {
  return <Navigate to={`/instruments/${redirectSlug}`} replace />;
 }

 if (config) {
  return (
   <>
    <SEO
     title={seo.title}
     description={seo.description}
     canonicalUrl={`/product/${handle}`}
     ogType="product"
     ogImage={ogImage}
     jsonLd={handle ? getProductJsonLd(handle, seo, productPrice, ogImage) : undefined}
    />
    <ProductLanding config={config} />
   </>
  );
 }

 return (
  <div className="min-h-screen bg-background">
   <SEO title="Product Not Found, Zential Pure" description="The requested product could not be found." />
   <AnnouncementBar />
   <Header />
   <div className="section-padding text-center">
    <p className="text-muted-foreground">Product not found</p>
   </div>
   <ZentialFooter />
  </div>
 );
}
