import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

const WRAP = "mx-auto max-w-[1240px] px-6 md:px-10";
const LABEL = "font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]";
const PILL_ACTION =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86]";

interface Study {
  title: string;
  source: string;
  year: string;
  url: string;
}

interface TechSection {
  heading: string;
  body: string;
}

interface TechnologyPageProps {
  title: string;
  metaDescription: string;
  canonicalUrl?: string;
  tagline: string;
  headline: string;
  paramLabel: string;
  paramValue: string;
  intro: string;
  mechanism: TechSection;
  biology: TechSection;
  usage: { heading: string; points: string[] };
  studies: Study[];
  /**
   * Route of the LIVE instrument this technology ships in — a full path, e.g.
   * "/instruments/face-introducer". These CTAs used to be built from a Shopify
   * product handle, which pointed every technology page at a discontinued SKU's
   * PDP (LIVE-CATALOG-TRUTH.md). Only ever point this at a live instrument.
   */
  deviceHref: string;
  deviceName: string;
}

export function TechnologyPage({
  title, metaDescription, canonicalUrl, tagline, headline, paramLabel, paramValue,
  intro, mechanism, biology, usage, studies, deviceHref, deviceName,
}: TechnologyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <SEO title={title} description={metaDescription} canonicalUrl={canonicalUrl} />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white">
          <div className={`${WRAP} pt-[clamp(56px,9vw,120px)] pb-[clamp(48px,7vw,88px)] text-center`}>
            <p className={LABEL}>{tagline}</p>
            <h1 className="mx-auto mt-6 max-w-[18ch] font-sans font-light text-[clamp(36px,5.4vw,72px)] leading-[1.04] tracking-[-0.03em] text-[#141414]">
              {headline}
            </h1>
            <p className="mt-6 font-sans text-[13px] font-medium tracking-[0.08em] text-[#0E7A54]">{paramLabel}: {paramValue}</p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#5A5A5A]">{intro}</p>
          </div>
        </section>

        {/* Mechanism */}
        <section className="bg-white border-t border-[rgba(20,20,20,0.10)]">
          <div className={`${WRAP} py-[clamp(56px,8vw,104px)]`}>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#141414] mb-6">{mechanism.heading}</h2>
              <p className="text-sm text-[#5A5A5A] leading-[1.9]">{mechanism.body}</p>
            </div>
          </div>
        </section>

        {/* Biology */}
        <section className="bg-white border-t border-[rgba(20,20,20,0.10)]">
          <div className={`${WRAP} py-[clamp(56px,8vw,104px)]`}>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#141414] mb-6">{biology.heading}</h2>
              <p className="text-sm text-[#5A5A5A] leading-[1.9]">{biology.body}</p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="bg-white border-t border-[rgba(20,20,20,0.10)]">
          <div className={`${WRAP} py-[clamp(56px,8vw,104px)]`}>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#141414] mb-8">{usage.heading}</h2>
              <ul className="space-y-4">
                {usage.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5A5A5A] leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0E7A54]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Studies */}
        <section className="bg-white border-t border-[rgba(20,20,20,0.10)]">
          <div className={`${WRAP} py-[clamp(56px,8vw,104px)]`}>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#141414] mb-8">Referenced Studies</h2>
              <div className="space-y-5">
                {studies.map((s, i) => (
                  <div
                    key={i}
                    className="block rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-5 transition-shadow duration-300 hover:shadow-sm cursor-default"
                  >
                    <p className="text-sm font-medium text-[#141414] mb-1">{s.title}</p>
                    <p className="text-xs text-[#8E8E8E]">{s.source} · {s.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-[rgba(20,20,20,0.10)]">
          <div className={`${WRAP} py-[clamp(56px,8vw,104px)] text-center`}>
            <p className="mx-auto max-w-[20ch] font-sans font-light text-[clamp(26px,3vw,40px)] leading-[1.08] tracking-[-0.025em] text-[#141414] mb-4">
              Experience it yourself.
            </p>
            <p className="mx-auto mb-8 max-w-md text-sm text-[#5A5A5A]">
              30-day return. No questions. The technology works or you get your money back.
            </p>
            <Link to={deviceHref} className={PILL_ACTION}>
              View {deviceName} →
            </Link>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
}
