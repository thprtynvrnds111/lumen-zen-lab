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
    title: "Lifting & Tightening Face Introducer — Zential Pure",
    description: "4-in-1 clinical beauty device combining red light therapy, microcurrent, EMS and blue light. Clinic-grade results in a daily 10-minute ritual.",
  },
  "body-lift": {
    title: "Body Lift — Zential Pure",
    description: "Microcurrent, red light and sonic pulse in one daily body ritual. Visibly firms, lifts and sculpts with consistent use.",
  },
  "eye-massage": {
    title: "Eye Activator — Zential Pure",
    description: "Red LED wand at 630–660nm targeting the periorbital area. Visibly reduces fine lines and crow's feet with daily 10-minute use.",
  },
  "color-light-import-micro-current-vibration-massager": {
    title: "Frequency Wand — Zential Pure",
    description: "High frequency therapy device with multiple treatment modes. Antibacterial surface action and collagen boost in one daily ritual.",
  },
  "electric-guasha-massager": {
    title: "Gua Sha Frequency — Zential Pure",
    description: "Gua sha device with built-in frequency vibration for lymphatic drainage and facial contour sculpting. 5-minute morning ritual.",
  },
  "electric-micro-current": {
    title: "Skin Pulse — Zential Pure",
    description: "Microcurrent device delivering sub-sensory electrical pulses that stimulate ATP production and re-educate facial muscles for visible sculpting.",
  },
  "facial-beauty-tools-and-ems-beauty-equipment": {
    title: "Sculpt Wand — Zential Pure",
    description: "EMS contour wand delivering targeted electrical pulses for visibly defined facial contours. 5-minute daily ritual.",
  },
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": {
    title: "Frame Pulse Activator — Zential Pure",
    description: "3D eye beauty device combining microcurrent pulse and light therapy to visibly reduce wrinkles, dark circles and puffiness around the eyes.",
  },
  "red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening": {
    title: "Face Introducer — Zential Pure",
    description: "EMS lifting device with dual-wavelength LED — red at 630nm and blue at 415nm. Sculpts facial contours, renews skin, and clarifies surface texture in one session.",
  },
  "portable-ems-microcurrent-facial-beauty-device": {
    title: "Frequency Wand Pro — Zential Pure",
    description: "Advanced EMS and microcurrent device for deep facial purification and sculpting. Professional-grade modalities in a daily home ritual.",
  },
  "medicube-collagen-elastic-jelly-moisturizing-cream": {
    title: "Collagen Face Gel — Zential Pure",
    description: "Conductive collagen gel formulated to enhance device results. Hydrates, plumps and supports skin elasticity during and after your ritual.",
  },
  "collagen-eye-mask": {
    title: "Collagen PDRN Pads — Zential Pure",
    description: "PDRN-infused collagen eye pads for targeted under-eye renewal. Use after your device ritual for amplified results.",
  },
};

function getProductJsonLd(handle: string, seo: { title: string; description: string }, price?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.title.split(" — ")[0],
    description: seo.description,
    brand: { "@type": "Brand", name: "Zential Pure" },
    url: `https://zentialpure.com/product/${handle}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      ...(price && { price }),
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
