import { useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

// Category-safe, defensible copy. No competitor names. No medical claims. No em dashes.
const FIELDS = [
  {
    key: "supplements",
    label: "Powdered supplements, greens, nootropics (monthly)",
    help: "The scoop you take every morning. If you pay quarterly or annually, divide down to monthly.",
    reframe:
      "Supplements support systemic health over time. They are not designed to produce visible change on your face, back, or core in a timeframe you can attribute.",
  },
  {
    key: "trackers",
    label: "Wearable trackers, sleep monitors, recovery apps (monthly)",
    help: "The band on your wrist and the app that scores your sleep. Include every subscription.",
    reframe:
      "Trackers measure and report. They record your recovery and your sleep. They do not deliver any input to tissue.",
  },
  {
    key: "sleepTech",
    label: "Mattress tech, cooling systems, sleep hardware (monthly)",
    help: "If you bought it once, divide the total by 36 months for a fair monthly figure. Add any subscription on top.",
    reframe:
      "Temperature regulation changes the environment around your body. It does not deliver wavelength based input to tissue.",
  },
  {
    key: "clinic",
    label: "Dermatologist visits, med-spa, clinical facials (monthly average)",
    help: "Add up annual visits and divide by 12. Include consultations, treatments, and prescribed topicals.",
    reframe:
      "Clinic sessions deliver light, current, and thermal input at a per-visit price. The physics do not change between the clinic and your bathroom. The price does.",
  },
  {
    key: "devices",
    label: "LED masks, microcurrent wands, facial devices (monthly, amortized)",
    help: "Total spent on at-home devices divided by 24 months. These get replaced.",
    reframe:
      "Most single-wavelength at-home devices cover one modality. The Face Introducer runs three in sequence: EMS, microcurrent, thermal.",
  },
] as const;

const SYSTEM_PRICE = 399;

const eur = (n: number) =>
  "€" + Math.round(n).toLocaleString("en-IE");

const JournalStackAudit = () => {
  const [vals, setVals] = useState<Record<string, string>>({
    supplements: "",
    trackers: "",
    sleepTech: "",
    clinic: "",
    devices: "",
  });
  const [shown, setShown] = useState(false);

  const monthly = FIELDS.reduce(
    (sum, f) => sum + (parseFloat(vals[f.key]) || 0),
    0
  );
  const annual = monthly * 12;
  const allZero = monthly === 0;
  const monthsToSystem = annual > 0 ? SYSTEM_PRICE / (annual / 12) : 0;

  const set = (k: string, v: string) =>
    setVals((p) => ({ ...p, [k]: v.replace(/[^0-9.]/g, "") }));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Stack Audit: What You Spend on Optimization, Zential Pure Journal"
        description="Add up your yearly spend on subscriptions, supplements, and trackers. Then compare it to a one-time device stack that covers three zones and seven inputs."
        canonicalUrl="/journal/the-stack-audit"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Stack Audit",
          description:
            "Calculate your annual optimization spend and compare it to one-time device ownership.",
          datePublished: "2026-07-26T00:00:00Z",
          author: { "@type": "Organization", name: "Zential Pure" },
          publisher: {
            "@type": "Organization",
            name: "Zential Pure",
            url: "https://zentialpure.com",
          },
          url: "https://zentialpure.com/journal/the-stack-audit",
        }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/journal"
              className="text-xs tracking-[0.25em] uppercase text-teal hover:text-primary transition-colors mb-8 inline-block"
            >
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-teal mb-4 mt-6">
              The Stack Audit
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Calculate your annual optimization spend. Then see what one-time
              ownership costs.
            </h1>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Most people spend €1,000 to €3,000 a year on subscriptions,
              supplements, and trackers. Add it up once. Then compare it to a
              one-time device stack that covers three zones and seven inputs.
            </p>
            <div className="w-16 h-px bg-primary/30 mt-8" />
          </div>
        </section>

        {/* Inputs */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              What do you spend each month on optimization?
            </h2>
            <p className="text-foreground/70 mb-8">
              Be honest. No one sees this but you. The total might surprise you.
            </p>

            <div className="space-y-6">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {f.label}
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">{f.help}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">€</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={vals[f.key]}
                      onChange={(e) => set(f.key, e.target.value)}
                      placeholder="0"
                      className="w-32 bg-card/60 border border-border/40 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary/60"
                    />
                    <span className="text-xs text-muted-foreground">/ month</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShown(true)}
              className="mt-10 px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
            >
              Calculate My Annual Bill
            </button>
          </div>
        </section>

        {/* Results */}
        {shown && (
          <section className="px-6 md:px-12 lg:px-20 pb-16">
            <div className="max-w-3xl mx-auto space-y-8">
              {allZero ? (
                <div className="bg-card/60 border border-border/30 rounded-2xl p-8 md:p-10">
                  <p className="text-foreground/80 leading-relaxed">
                    All zeros. Either you are not spending anything on
                    optimization, or you are not ready to look at the number. No
                    judgment. Come back when you are.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase text-teal mb-3">
                      Your annual optimization bill
                    </p>
                    <p className="text-5xl md:text-6xl font-bold text-foreground">
                      {eur(annual)}
                      <span className="text-2xl text-muted-foreground"> / year</span>
                    </p>
                    <p className="text-foreground/70 mt-3">
                      {annual > 500
                        ? "That is real money. Here is what it is actually buying, and what it is not."
                        : "Modest spend. But is it going to the right things?"}
                    </p>
                  </div>

                  {/* Category breakdown */}
                  <div className="space-y-5">
                    {FIELDS.filter((f) => (parseFloat(vals[f.key]) || 0) > 0).map(
                      (f) => (
                        <div
                          key={f.key}
                          className="border-l-2 border-primary/30 pl-4"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {eur((parseFloat(vals[f.key]) || 0) * 12)} / year
                          </p>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {f.reframe}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  {/* Comparison panel */}
                  <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10 my-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Your annual spend
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {eur(annual)}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-teal">
                          The System
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          €399 once
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li>
                        Face Introducer. EMS, microcurrent, thermal.
                        12 min.
                      </li>
                      <li>
                        Restoration Belt. 660nm red + 850nm near-infrared, thermal
                        compression. 15 min.
                      </li>
                      <li>
                        Restoration Mat. 660nm red + far-infrared. 20 min.
                      </li>
                    </ul>
                    <p className="text-foreground font-medium mt-5">
                      Seven inputs across three zones. One price. No subscription.
                    </p>
                  </div>

                  {/* Verdict */}
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {annual > SYSTEM_PRICE
                      ? `You spend more in ${Math.max(
                          1,
                          Math.round(monthsToSystem)
                        )} months on subscriptions and supplements than The System costs once. After that, every month is money you could redirect toward something you own outright.`
                      : "Your annual spend is below €399. The System is a larger upfront commitment, but it is a one-time cost that covers three zones with seven inputs. No monthly renewal. No annual increase."}
                  </p>

                  <p className="text-xl font-bold text-foreground">
                    They charge you every month to measure and maintain. We charge
                    you once to intervene.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      to="/instruments#system"
                      className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
                    >
                      See The System →
                    </Link>
                    <Link
                      to="/instruments#system"
                      className="px-8 py-4 rounded-full border border-border/50 text-foreground text-sm tracking-[0.15em] uppercase hover:border-primary/60 transition-colors"
                    >
                      Three Zones. Seven Inputs. One Price.
                    </Link>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* Compliance footnote */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/70 leading-relaxed border-t border-border/20 pt-6">
              All calculations use the figures you enter. Any competitor pricing
              referenced is based on publicly listed EU prices as of July 2026 and
              may change. Verify current pricing before any purchase decision.
              Zential products are cosmetic and recovery devices. They are not
              medical devices and are not intended to diagnose, treat, cure, or
              prevent any condition.
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default JournalStackAudit;
