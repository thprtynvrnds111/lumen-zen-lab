import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { SocialProof } from "@/components/zential/SocialProof";
import { DevicesSection } from "@/components/zential/DevicesSection";
import { ResultsSection } from "@/components/zential/ResultsSection";
import { TechnologyPanels } from "@/components/zential/TechnologyPanels";
import { RitualSection } from "@/components/zential/RitualSection";
import { ComparisonSection } from "@/components/zential/ComparisonSection";
import { StatsBar } from "@/components/zential/StatsBar";
import { BundleSection } from "@/components/zential/BundleSection";
import { FAQSection } from "@/components/zential/FAQSection";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <SocialProof />
        <DevicesSection />
        <ResultsSection />
        <TechnologyPanels />
        <RitualSection />
        <ComparisonSection />
        <StatsBar />
        <BundleSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Index;
