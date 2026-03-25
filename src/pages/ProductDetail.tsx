import { useParams } from "react-router-dom";
import { getProductConfig } from "@/data/productConfigs";
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
};

function getProductJsonLd(handle: string, seo: { title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.title.split(" — ")[0],
    description: seo.description,
    brand: { "@type": "Brand", name: "Zential Pure" },
    url: `https://zentialpure.com/product/${handle}`,
    image: "https://zentialpure.com/og-image.jpg",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
    },
  };
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const config = handle ? getProductConfig(handle) : null;
  const seo = handle && PRODUCT_SEO[handle]
    ? PRODUCT_SEO[handle]
    : { title: `${config?.name || "Product"} — Zential Pure`, description: config?.subheadline || "Clinical-luxury beauty device by Zential Pure." };

  if (config) {
    return (
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          canonicalUrl={`/product/${handle}`}
          ogType="product"
          jsonLd={handle ? getProductJsonLd(handle, seo) : undefined}
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
