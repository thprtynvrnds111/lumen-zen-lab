import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { ShieldCheck, Camera, Truck, ScrollText, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

/**
 * /warranty — the warranty terms, on their own indexed page.
 *
 * Until 2026-08-04 this URL returned HTTP 200 while serving the homepage shell: no
 * route existed in either router, so Vercel's SPA fallback answered it. A URL that
 * looks alive and says nothing about the warranty is worse than a 404.
 *
 * Source of the terms: knowledge/offers/warranty-terms-2026-08-03.md.
 *
 * Two things this page must never lose:
 *  1. The statutory-rights clause. EU Directive 2019/771 Art. 17(2) requires a
 *     commercial guarantee to state that it does not limit statutory rights. In the
 *     Netherlands the legal guarantee has NO fixed term — it runs for as long as the
 *     product can reasonably be expected to last — so a bare "1 year" headline reads
 *     as a ceiling the law does not impose, which is the framing the ACM targets.
 *  2. The no-return replacement. Verified 2026-08-04: no competitor in this category
 *     offers replacement without returning the dead unit — Mito Red explicitly demands
 *     the whole product back "so that we can diagnose the root cause". It is the one
 *     genuinely unclaimed position the category leaves open.
 */
const claimIcons = [Camera, ScrollText, Truck, ShieldCheck];

const Warranty = () => {
  const { t } = useTranslation("warranty");
  const steps = t("claim.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const covered = t("covered.items", { returnObjects: true }) as string[];
  const excluded = t("excluded.items", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <SEO
        title="Warranty — Zential Pure"
        description="Our warranty on the instruments, in plain terms: what is covered, how a claim works, how long it takes, and what your statutory rights are on top of it."
        canonicalUrl="/warranty"
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4">{t("hero.badge")}</p>
            <h1 className="font-sans font-light text-4xl md:text-6xl text-[#141414] mb-5 tracking-[-0.03em]">
              {t("hero.headline")}
            </h1>
            <p className="text-[#5A5A5A] text-lg leading-relaxed">{t("hero.sub")}</p>
          </div>
        </section>

        {/* What is covered */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">
            <div className="border border-[rgba(20,20,20,0.10)] bg-white p-7">
              <h2 className="font-medium text-[#141414] mb-3">{t("covered.title")}</h2>
              <ul className="space-y-2 text-sm text-[#5A5A5A] leading-relaxed">
                {covered.map((c, i) => (
                  <li key={i}>· {c}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[rgba(20,20,20,0.10)] bg-white p-7">
              <h2 className="font-medium text-[#141414] mb-3">{t("excluded.title")}</h2>
              <ul className="space-y-2 text-sm text-[#5A5A5A] leading-relaxed">
                {excluded.map((c, i) => (
                  <li key={i}>· {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How a claim works */}
        <section className="section-padding border-y border-[rgba(20,20,20,0.10)] bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t("claim.eyebrow")}</p>
              <h2 className="text-2xl md:text-4xl font-light tracking-[-0.025em] text-[#141414]">{t("claim.title")}</h2>
            </div>
            <div className="border-t border-[rgba(20,20,20,0.10)]">
              {steps.map((s, i) => {
                const Icon = claimIcons[i % claimIcons.length];
                return (
                  <div key={i} className="border-b border-[rgba(20,20,20,0.10)] py-7 flex gap-5">
                    <Icon size={20} className="text-[#0E7A54] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-[#141414] mb-2">{s.title}</h3>
                      <p className="text-sm text-[#5A5A5A] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Statutory rights — legally required, and deliberately not in small print */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="border border-[rgba(20,20,20,0.10)] bg-white p-8 md:p-10 border-l-2 border-l-[#0E7A54]">
              <h2 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[#141414] mb-3">
                {t("statutory.title")}
              </h2>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">{t("statutory.body")}</p>
            </div>

            {/*
              Art. 17(1) requires the guarantee on a DURABLE MEDIUM — a page we can edit
              after the sale is not one. These files are generated from the same locale
              JSON this page renders (scripts/build-warranty-pdf.mjs), so they cannot
              drift from what is above. Plain <a download>, not a router Link.
            */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-[#5A5A5A]">{t("download.label")}</span>
              <a
                href="/warranty-en.pdf"
                download
                className="inline-flex items-center gap-1.5 underline underline-offset-4 text-[#141414] hover:text-[#0E7A54] transition-colors"
              >
                <Download size={14} /> English (PDF)
              </a>
              <a
                href="/warranty-nl.pdf"
                download
                className="inline-flex items-center gap-1.5 underline underline-offset-4 text-[#141414] hover:text-[#0E7A54] transition-colors"
              >
                <Download size={14} /> Nederlands (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding pt-0">
          <div className="max-w-2xl mx-auto text-center">
            <div className="border border-[rgba(20,20,20,0.10)] bg-white p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-light tracking-[-0.025em] text-[#141414] mb-3">
                {t("cta.headline")}
              </h2>
              <p className="text-[#5A5A5A] mb-6">{t("cta.sub")}</p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-full bg-[#2ED8A8] px-6 py-3 text-sm font-medium text-[#141414] transition-colors hover:bg-[#1BAF86]"
              >
                {t("cta.button")} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SparseFooter />
    </div>
  );
};

export default Warranty;
