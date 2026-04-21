import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { lazy, Suspense, useState, useEffect } from "react";

// Lazy-load below-fold sections to reduce initial JS bundle
const PhilosophySection = lazy(() => import("@/components/zential/PhilosophySection").then(m => ({ default: m.PhilosophySection })));
const TechCardsSection = lazy(() => import("@/components/zential/TechCardsSection").then(m => ({ default: m.TechCardsSection })));
const ExpertsSection = lazy(() => import("@/components/zential/ExpertsSection").then(m => ({ default: m.ExpertsSection })));
const DevicesSection = lazy(() => import("@/components/zential/DevicesSection").then(m => ({ default: m.DevicesSection })));
const StatsBar = lazy(() => import("@/components/zential/StatsBar").then(m => ({ default: m.StatsBar })));
const EditorialBreak = lazy(() => import("@/components/zential/EditorialBreak").then(m => ({ default: m.EditorialBreak })));
const UGCStrip = lazy(() => import("@/components/zential/UGCStrip").then(m => ({ default: m.UGCStrip })));
const RitualSection = lazy(() => import("@/components/zential/RitualSection").then(m => ({ default: m.RitualSection })));
const TutorialStrip = lazy(() => import("@/components/zential/TutorialStrip").then(m => ({ default: m.TutorialStrip })));
const ImageDivider = lazy(() => import("@/components/zential/ImageDivider").then(m => ({ default: m.ImageDivider })));
const BrandStorySection = lazy(() => import("@/components/zential/BrandStorySection").then(m => ({ default: m.BrandStorySection })));
const SkinFitSection = lazy(() => import("@/components/zential/SkinFitSection").then(m => ({ default: m.SkinFitSection })));
const SafetyUsageSection = lazy(() => import("@/components/zential/SafetyUsageSection").then(m => ({ default: m.SafetyUsageSection })));
const TransparencySection = lazy(() => import("@/components/zential/TransparencySection").then(m => ({ default: m.TransparencySection })));
const PriceGuaranteeSection = lazy(() => import("@/components/zential/PriceGuaranteeSection").then(m => ({ default: m.PriceGuaranteeSection })));
const ComparisonSection = lazy(() => import("@/components/zential/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const ResultsSection = lazy(() => import("@/components/zential/ResultsSection").then(m => ({ default: m.ResultsSection })));
const SocialProof = lazy(() => import("@/components/zential/SocialProof").then(m => ({ default: m.SocialProof })));
const BundleSection = lazy(() => import("@/components/zential/BundleSection").then(m => ({ default: m.BundleSection })));
const FAQSection = lazy(() => import("@/components/zential/FAQSection").then(m => ({ default: m.FAQSection })));
const CommunitySection = lazy(() => import("@/components/zential/CommunitySection").then(m => ({ default: m.CommunitySection })));
const ZentialFooter = lazy(() => import("@/components/zential/ZentialFooter").then(m => ({ default: m.ZentialFooter })));

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

function LazyImageDivider() {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    import("@/assets/lifestyle-body.webp").then(m => setSrc(m.default));
  }, []);
  if (!src) return <div style={{ height: 'clamp(250px, 40vh, 450px)' }} />;
  return <ImageDivider src={src} alt="Woman with Zential device in urban setting" quote="Clinic results. Your schedule." />;
}

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
        

        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <PhilosophySection />
          <TechCardsSection />
          <ExpertsSection />
          <ComparisonSection />
          <DevicesSection />
          <TutorialStrip />
          <StatsBar />
          
          <SocialProof />
          <UGCStrip />
          <ResultsSection />
          <EditorialBreak />
          <RitualSection />
          <LazyImageDivider />
          <BrandStorySection />
          <SkinFitSection />
          <SafetyUsageSection />
          <TransparencySection />
          <PriceGuaranteeSection />
          <BundleSection />
          <FAQSection />
          <CommunitySection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-40 bg-foreground" />}>
        <ZentialFooter />
      </Suspense>
    </div>
  );
};

export default Index;
