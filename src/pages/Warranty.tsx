import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
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
    <div className="min-h-screen bg-background">
      <SEO
        title="Warranty — Zential Pure"
        description="Our warranty on the instruments, in plain terms: what is covered, how a claim works, how long it takes, and what your statutory rights are on top of it."
        canonicalUrl="/warranty"
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4">{t("hero.badge")}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
              {t("hero.headline")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("hero.sub")}</p>
          </div>
        </section>

        {/* What is covered */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">
            <div className="glass-card p-7">
              <h2 className="font-semibold text-foreground mb-3">{t("covered.title")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                {covered.map((c, i) => (
                  <li key={i}>· {c}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-7">
              <h2 className="font-semibold text-foreground mb-3">{t("excluded.title")}</h2>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                {excluded.map((c, i) => (
                  <li key={i}>· {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How a claim works */}
        <section className="section-padding gradient-pearl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">{t("claim.eyebrow")}</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-foreground">{t("claim.title")}</h2>
            </div>
            <div className="space-y-5">
              {steps.map((s, i) => {
                const Icon = claimIcons[i % claimIcons.length];
                return (
                  <div key={i} className="glass-card p-7 flex gap-5">
                    <Icon size={20} className="text-accent shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
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
            <div className="glass-card p-8 md:p-10 border-l-2 border-accent">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {t("statutory.title")}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("statutory.body")}</p>
            </div>

            {/*
              Art. 17(1) requires the guarantee on a DURABLE MEDIUM — a page we can edit
              after the sale is not one. These files are generated from the same locale
              JSON this page renders (scripts/build-warranty-pdf.mjs), so they cannot
              drift from what is above. Plain <a download>, not a router Link.
            */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">{t("download.label")}</span>
              <a
                href="/warranty-en.pdf"
                download
                className="inline-flex items-center gap-1.5 underline underline-offset-4 text-foreground hover:text-accent transition-colors"
              >
                <Download size={14} /> English (PDF)
              </a>
              <a
                href="/warranty-nl.pdf"
                download
                className="inline-flex items-center gap-1.5 underline underline-offset-4 text-foreground hover:text-accent transition-colors"
              >
                <Download size={14} /> Nederlands (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding pt-0">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  {t("cta.headline")}
                </h2>
                <p className="text-muted-foreground mb-6">{t("cta.sub")}</p>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {t("cta.button")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Warranty;
