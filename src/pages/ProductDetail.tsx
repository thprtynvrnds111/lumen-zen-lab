import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductConfig } from "@/data/productConfigs";
import { fetchProductByHandle } from "@/lib/shopify";
import { ProductLanding } from "@/components/zential/ProductLanding";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { SEO } from "@/components/SEO";

const PRODUCT_SEO: Record<string, { title: string; description: string }> = {
  "lifting-and-tightening-face-introducer": {
    title: "Microcurrent Face Device — Face Introducer | Zential Pure",
    description: "Red light at 630–660nm, microcurrent, EMS, and blue light. Four modalities in one daily ritual at clinic precision. €88.",
  },
  "body-lift": {
    title: "Body Lift — Microcurrent Body Sculpting Device | Zential Pure",
    description: "Microcurrent, red light, and sonic pulse for the body. Stimulates tissue, supports visible firming with consistent daily use.",
  },
  "eye-massage": {
    title: "Eye Activator — Microcurrent Eye Contour Device | Zential Pure",
    description: "Microcurrent and red light targeting the periorbital zone. Stimulates collagen, supports fine line reduction with consistent use. €88.",
  },
  "color-light-import-micro-current-vibration-massager": {
    title: "Frequency Wand — Full-Face EMS Device | Zential Pure",
    description: "High-frequency EMS across multiple treatment modes. Supports improved circulation, clarity, and visible skin tone with daily use. €147.",
  },
  "electric-guasha-massager": {
    title: "Electric Gua Sha Device — Gua Sha Frequency | Zential Pure",
    description: "Electric gua sha with built-in microcurrent frequency. Stimulates lymphatic drainage, supports facial sculpting. 5-minute morning ritual. €84.",
  },
  "electric-micro-current": {
    title: "Skin Pulse — Daily Microcurrent Face Device | Zential Pure",
    description: "Microcurrent that stimulates ATP production and re-educates facial muscles. The entry point to consistent at-home facial structure. €70.",
  },
  "facial-beauty-tools-and-ems-beauty-equipment": {
    title: "Sculpt Wand — Jaw Toning EMS Device | Zential Pure",
    description: "Precision EMS delivers targeted electrical pulses to the jawline and cheekbones. Defined facial contours with consistent daily use. €75.",
  },
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": {
    title: "Frame Pulse — Red Light Eye Device | Zential Pure",
    description: "Red light at 630–660nm targeting the eye area and upper face. Stimulates circulation, supports a brighter, more rested appearance. €112.",
  },
  "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": {
    title: "Face Lift Device — Red Light & EMS | Zential Pure",
    description: "Dual-wavelength LED at 630nm and 415nm with EMS. Sculpts facial contours, supports skin renewal, and clarifies surface texture. €88.",
  },
  "portable-ems-microcurrent-facial-beauty-device": {
    title: "Frequency Wand Pro — Clinic-Precision EMS | Zential Pure",
    description: "Advanced EMS and microcurrent for deep facial muscle toning. Clinic-precision output at home. The replacement for repeated clinic sessions. €179.",
  },
  "medicube-collagen-elastic-jelly-moisturizing-cream": {
    title: "Collagen Face Gel — Conductive Device Gel | Zential Pure",
    description: "Conductive collagen gel formulated to enhance device results. Hydrates, plumps, and supports skin elasticity during your ritual.",
  },
  "collagen-eye-mask": {
    title: "Collagen PDRN Eye Pads — Under-Eye Renewal | Zential Pure",
    description: "PDRN-infused collagen eye pads for targeted under-eye renewal. Use after your device ritual for amplified results.",
  },
};

// Static prices for JSON-LD prerendering — async Shopify price overrides these client-side
const PRODUCT_PRICES: Record<string, string> = {
  "lifting-and-tightening-face-introducer": "88.00",
  "body-lift": "88.00",
  "eye-massage": "88.00",
  "color-light-import-micro-current-vibration-massager": "147.00",
  "electric-guasha-massager": "84.00",
  "electric-micro-current": "70.00",
  "facial-beauty-tools-and-ems-beauty-equipment": "75.00",
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": "112.00",
  "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": "88.00",
  "portable-ems-microcurrent-facial-beauty-device": "179.00",
  "medicube-collagen-elastic-jelly-moisturizing-cream": "34.00",
  "collagen-eye-mask": "29.00",
};

function getProductJsonLd(handle: string, seo: { title: string; description: string }, price?: string) {
  const resolvedPrice = price ?? PRODUCT_PRICES[handle];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.title.split(" — ")[0].split(" | ")[0],
    description: seo.description,
    brand: { "@type": "Brand", name: "Zential Pure" },
    url: `https://zentialpure.com/product/${handle}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: `https://zentialpure.com/product/${handle}`,
      ...(resolvedPrice && { price: resolvedPrice }),
    },
  };
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const config = handle ? getProductConfig(handle) : null;
  const seo = handle && PRODUCT_SEO[handle]
    ? PRODUCT_SEO[handle]
    : { title: `${config?.name || "Product"} — Zential Pure`, description: config?.subheadline || "Clinical-luxury beauty device by Zential Pure." };

  const [ogImage, setOgImage] = useState<string | undefined>(undefined);
  const [productPrice, setProductPrice] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!handle) return;
    fetchProductByHandle(handle).then(p => {
      const img = p?.images?.edges?.[0]?.node?.url;
      if (img) setOgImage(img);
      const price = p?.variants?.edges?.[0]?.node?.price?.amount;
      if (price) setProductPrice(price);
    }).catch(() => {});
  }, [handle]);

  if (config) {
    return (
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          canonicalUrl={`/product/${handle}`}
          ogType="product"
          ogImage={ogImage}
          jsonLd={handle ? getProductJsonLd(handle, seo, productPrice) : undefined}
        />
        <ProductLanding config={config} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Product Not Found — Zential Pure" description="The requested product could not be found." />
      <AnnouncementBar />
      <Header />
      <div className="section-padding text-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
      <ZentialFooter />
    </div>
  );
}
