import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { TechCardsSection } from "@/components/zential/TechCardsSection";
import { DevicesSection } from "@/components/zential/DevicesSection";
import { RitualSection } from "@/components/zential/RitualSection";
import { SkinFitSection } from "@/components/zential/SkinFitSection";
import { SafetyUsageSection } from "@/components/zential/SafetyUsageSection";
import { TransparencySection } from "@/components/zential/TransparencySection";
import { PriceGuaranteeSection } from "@/components/zential/PriceGuaranteeSection";
import { BundleSection } from "@/components/zential/BundleSection";
import { FAQSection } from "@/components/zential/FAQSection";
import { CommunitySection } from "@/components/zential/CommunitySection";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zential Pure",
  url: "https://zentialpure.com",
  logo: "https://zentialpure.com/og-image.jpg",
  description: "Clinical-luxury beauty devices for daily home use. Red light therapy, microcurrent, EMS and blue light in one device.",
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
        description="Clinical-luxury beauty devices for daily home use. Red light therapy, microcurrent, EMS and blue light in one device."
        canonicalUrl="/"
        jsonLd={homepageJsonLd}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <TechCardsSection />
        <DevicesSection />
        <RitualSection />
        <SkinFitSection />
        <SafetyUsageSection />
        <TransparencySection />
        <PriceGuaranteeSection />
        <BundleSection />
        <FAQSection />
        <CommunitySection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Index;
