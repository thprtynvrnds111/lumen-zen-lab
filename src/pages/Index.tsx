import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { TechCardsSection } from "@/components/zential/TechCardsSection";
import { ProtocolsShowcase } from "@/components/zential/v2/ProtocolsShowcase";
import { PhilosophyBand } from "@/components/zential/v2/PhilosophyBand";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { ImageDivider } from "@/components/zential/ImageDivider";
import editorialWalk from "@/assets/editorial/walk-stone.webp";
import editorialPour from "@/assets/editorial/pour-water.webp";
import editorialBed from "@/assets/editorial/empty-bed.webp";
import editorialThreshold from "@/assets/editorial/threshold.webp";
import editorialWaking from "@/assets/editorial/waking-hand.webp";
import editorialSeated from "@/assets/editorial/seated-calm.webp";

import { lazy, Suspense } from "react";

// Keep existing devices grid — workhorse, already serves product discovery.
const DevicesSection = lazy(() =>
  import("@/components/zential/DevicesSection").then((m) => ({
    default: m.DevicesSection,
  }))
);
// Keep FAQ — utility, accordion already neutral.
const FAQSection = lazy(() =>
  import("@/components/zential/FAQSection").then((m) => ({
    default: m.FAQSection,
  }))
);
// Hybrid injects (restyled to light v2) — below the fold, lazy.
const TutorialStrip = lazy(() =>
  import("@/components/zential/TutorialStrip").then((m) => ({
    default: m.TutorialStrip,
  }))
);
const PriceGuaranteeSection = lazy(() =>
  import("@/components/zential/PriceGuaranteeSection").then((m) => ({
    default: m.PriceGuaranteeSection,
  }))
);

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zential Pure",
  url: "https://zentialpure.com",
  logo: "https://zentialpure.com/og-image.jpg",
  description:
    "Three Protocols. One system. EMS · Microcurrent · Thermal · Cosmetic LED — engineered for daily home use.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://zentialpure.com/support",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F7F4F0]">
      <SEO
        title="Zential Pure — Clinic Precision. Daily Ritual."
        description="Three Protocols. One system. EMS · Microcurrent · Thermal · Cosmetic LED — engineered for daily home use."
        canonicalUrl="/"
        jsonLd={homepageJsonLd}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />

        <TechCardsSection />

        <ImageDivider
          src={editorialWalk}
          alt=""
          quote="Built for the woman who left the clinic but kept the standard."
        />

        <ProtocolsShowcase />

        <ImageDivider
          src={editorialThreshold}
          alt=""
          quote="Walk into the day as the standard."
        />

        <PhilosophyBand
          label="Discipline ( 01 )"
          lines={[
            "A device works because of its mechanism.",
            "A protocol works because of its order.",
          ]}
          bgImage={editorialBed}
        />

        <ImageDivider
          src={editorialWaking}
          alt=""
          quote="The first instrument is the hand."
        />

        <Suspense fallback={<div className="min-h-[50vh] bg-[#F7F4F0]" />}>
          <div id="devices">
            <DevicesSection />
          </div>

          <TutorialStrip />

          <ImageDivider
            src={editorialPour}
            alt=""
            quote="Daily ritual is not aspirational. It is operational."
          />

          <PhilosophyBand
            label="Discipline ( 02 )"
            lines={[
              "Bundles are not discounts.",
              "They are sequences.",
            ]}
          />

          <ImageDivider
            src={editorialSeated}
            alt=""
            quote="Return to yourself. Return to your morning."
          />

          <PriceGuaranteeSection />

          <FAQSection />
        </Suspense>
      </main>
      <SparseFooter />
    </div>
  );
};

export default Index;
