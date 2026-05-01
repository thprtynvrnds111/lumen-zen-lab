import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { DevicesSection } from "@/components/zential/DevicesSection";
import { SEO } from "@/components/SEO";

export default function Collection() {
  return (
    <>
      <SEO
        title="The Collection — Zential Pure"
        description="Explore the full Zential Pure device collection. Clinic-grade skincare technology for every concern — lift, tone, glow, and restore at home."
        canonicalUrl="/collection"
      />
      <AnnouncementBar />
      <Header />
      <main>
        <DevicesSection />
      </main>
      <ZentialFooter />
    </>
  );
}
