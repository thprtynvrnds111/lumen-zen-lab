import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { TrustStrip } from "@/components/zential/TrustStrip";
import { ShopByConcern } from "@/components/zential/ShopByConcern";
import { FinalCTA } from "@/components/zential/FinalCTA";
import { lazy, Suspense } from "react";

const ComparisonSection  = lazy(() => import("@/components/zential/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const DevicesSection     = lazy(() => import("@/components/zential/DevicesSection").then(m => ({ default: m.DevicesSection })));
const StatsBar           = lazy(() => import("@/components/zential/StatsBar").then(m => ({ default: m.StatsBar })));
const SocialProof        = lazy(() => import("@/components/zential/SocialProof").then(m => ({ default: m.SocialProof })));
const TrustpilotStrip    = lazy(() => import("@/components/zential/TrustpilotStrip").then(m => ({ default: m.TrustpilotStrip })));
const RitualSection      = lazy(() => import("@/components/zential/RitualSection").then(m => ({ default: m.RitualSection })));
const BundleSection      = lazy(() => import("@/components/zential/BundleSection").then(m => ({ default: m.BundleSection })));
const FAQSection         = lazy(() => import("@/components/zential/FAQSection").then(m => ({ default: m.FAQSection })));
const ZentialFooter      = lazy(() => import("@/components/zential/ZentialFooter").then(m => ({ default: m.ZentialFooter })));

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zential Pure",
  url: "https://zentialpure.com",
  logo: "https://zentialpure.com/og-image.jpg",
  description: "At-home facial devices combining Red Light, Microcurrent, EMS and Thermal technology. Free EU shipping. 30-day guarantee.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://zentialpure.com/support",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Zential Pure — Clinic Precision. Daily Ritual."
        description="At-home facial devices combining Red Light, Microcurrent, EMS and Thermal technology. Free EU shipping. 30-day guarantee."
        canonicalUrl="/"
        jsonLd={homepageJsonLd}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />

        <Suspense fallback={<div className="min-h-[50vh]" />}>
          {/* 1. Value prop */}
          <ComparisonSection />

          {/* 2. Product discovery */}
          <ShopByConcern />
          <DevicesSection />

          {/* 3. Proof */}
          <StatsBar />
          <SocialProof />
          <TrustpilotStrip />

          {/* 4. Ritual */}
          <RitualSection />

          {/* 5. AOV + close */}
          <BundleSection />
          <FAQSection />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-40 bg-foreground" />}>
        <ZentialFooter />
      </Suspense>
    </div>
  );
};

export default Index;
