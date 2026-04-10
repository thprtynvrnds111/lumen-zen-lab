import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { AsSeenInStrip } from "@/components/zential/AsSeenInStrip";
import { PhilosophySection } from "@/components/zential/PhilosophySection";
import { TechCardsSection } from "@/components/zential/TechCardsSection";
import { ExpertsSection } from "@/components/zential/ExpertsSection";
import { DevicesSection } from "@/components/zential/DevicesSection";
import { PressQuotesSection } from "@/components/zential/PressQuotesSection";
import { EditorialBreak } from "@/components/zential/EditorialBreak";
import { UGCStrip } from "@/components/zential/UGCStrip";
import { RitualSection } from "@/components/zential/RitualSection";
import { ImageDivider } from "@/components/zential/ImageDivider";
import { BrandStorySection } from "@/components/zential/BrandStorySection";
import { SkinFitSection } from "@/components/zential/SkinFitSection";
import { SafetyUsageSection } from "@/components/zential/SafetyUsageSection";
import { TransparencySection } from "@/components/zential/TransparencySection";
import { PriceGuaranteeSection } from "@/components/zential/PriceGuaranteeSection";
import { BundleSection } from "@/components/zential/BundleSection";
import { FAQSection } from "@/components/zential/FAQSection";
import { CommunitySection } from "@/components/zential/CommunitySection";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import lifestyleBody from "@/assets/lifestyle-body.jpg";

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zential Pure",
  url: "https://zentialpure.com",
  logo: "https://zentialpure.com/og-image.jpg",
  description: "Self-optimization devices for daily home use. Red light therapy, microcurrent, EMS and thermal in one system. Know your skin. Work with it.",
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
        description="Self-optimization devices for daily home use. Red light therapy, microcurrent, EMS and thermal in one system. Know your skin. Work with it."
        canonicalUrl="/"
        jsonLd={homepageJsonLd}
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* 1. Hero — immediate visual confirmation */}
        <HeroSection />

        {/* 2. Trust strip — editorial authority */}
        <AsSeenInStrip />

        {/* 3. Philosophy — "This is not a beauty brand" manifesto */}
        <PhilosophySection />

        {/* 4. Technology — the clinical backbone */}
        <TechCardsSection />

        {/* 5. Experts — the minds behind the system */}
        <ExpertsSection />

        {/* 6. Devices — product selection */}
        <DevicesSection />

        {/* 7. Press quotes — rotating editorial endorsements */}
        <PressQuotesSection />

        {/* 8. UGC — real people, real practice */}
        <UGCStrip />

        {/* 9. Editorial break — self-optimization reframe */}
        <EditorialBreak />

        {/* 10. The Ritual — the daily practice */}
        <RitualSection />

        {/* 11. Image divider — lifestyle aspiration */}
        <ImageDivider
          src={lifestyleBody}
          alt="Woman with Zential device in urban setting"
          quote="Clinic results. Your schedule."
        />

        {/* 12. Brand story — origin & values */}
        <BrandStorySection />

        {/* 13. SkinFit — personalization */}
        <SkinFitSection />

        {/* 14. Safety — trust & transparency */}
        <SafetyUsageSection />
        <TransparencySection />

        {/* 15. Value proposition */}
        <PriceGuaranteeSection />
        <BundleSection />

        {/* 16. FAQ — objection handling */}
        <FAQSection />

        {/* 17. Community — belonging */}
        <CommunitySection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Index;
