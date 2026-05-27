import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { HeroSection } from "@/components/zential/HeroSection";
import { ProtocolsShowcase } from "@/components/zential/v2/ProtocolsShowcase";
import { PhilosophyBand } from "@/components/zential/v2/PhilosophyBand";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";

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

        <ProtocolsShowcase />

        <PhilosophyBand
          label="Discipline ( 01 )"
          lines={[
            "A device works because of its mechanism.",
            "A protocol works because of its order.",
          ]}
        />

        <Suspense fallback={<div className="min-h-[50vh] bg-[#F7F4F0]" />}>
          <div id="devices">
            <DevicesSection />
          </div>

          <PhilosophyBand
            label="Discipline ( 02 )"
            lines={[
              "Bundles are not discounts.",
              "They are sequences.",
            ]}
          />

          <FAQSection />
        </Suspense>
      </main>
      <SparseFooter />
    </div>
  );
};

export default Index;
