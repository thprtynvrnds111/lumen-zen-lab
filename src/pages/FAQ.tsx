import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Truck, RotateCcw, Heart, ShieldCheck, CreditCard, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";

const categoryIcons = [Truck, RotateCcw, Heart, ShieldCheck, Zap, CreditCard];

const FAQ = () => {
  const { t } = useTranslation('faq');
  const categories = t('categories', { returnObjects: true }) as Array<{ label: string; items: Array<{ q: string; a: string }> }>;
  const headline = t('hero.headline').split('\n');

  return (
    <div className="min-h-screen bg-background">
      <SEO title="FAQ — Zential Pure" description="Answers to common questions about Zential Pure devices, shipping, returns, safety, and how to get the most from your daily ritual." canonicalUrl="/faq" />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px] pointer-events-none" />
          <div className="relative z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
              <HelpCircle size={14} />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
              {headline[0]}<br />
              <span className="text-foreground">{headline[1]}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              {t('hero.sub')}
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-3xl mx-auto">
            {categories.map((cat, ci) => {
              const Icon = categoryIcons[ci] ?? HelpCircle;
              return (
                <div key={ci} className="mb-10 animate-fade-in" style={{ animationDelay: `${ci * 80}ms` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">{cat.label}</span>
                  </div>
                  <Accordion type="single" collapsible className="glass-card overflow-hidden">
                    {cat.items.map((item, i) => (
                      <AccordionItem key={i} value={`cat-${ci}-${i}`} className="border-border/20">
                        <AccordionTrigger className="px-6 text-left text-sm font-medium hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 text-muted-foreground text-sm leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default FAQ;
