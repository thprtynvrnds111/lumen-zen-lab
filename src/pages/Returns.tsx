import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { RotateCcw, ShieldCheck, CheckCircle2, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const stepIcons = [Package, CheckCircle2, RotateCcw, ShieldCheck];

const Returns = () => {
 const { t } = useTranslation('returns');
 const steps = t('steps.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
 const policies = t('policy.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
 const headline = t('hero.headline').split('\n');

 return (
  <div className="min-h-screen bg-background">
   <SEO title="Returns & 14-Day Guarantee, Zential Pure" description="Not feeling the results? Our 14-Day Ritual Guarantee means a full refund, no friction, no pressure. Return any device within 14 days." canonicalUrl="/returns" />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
     <div className="relative z-10 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
       <RotateCcw size={14} />
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

    {/* Steps */}
    <section className="px-6 md:px-12 lg:px-20 pb-24">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
       <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">{t('steps.eyebrow')}</p>
       <h2 className="text-2xl md:text-4xl font-semibold text-foreground">{t('steps.title')}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {steps.map((s, i) => {
        const Icon = stepIcons[i] ?? Package;
        return (
         <div key={i} className="glass-card p-7 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 border border-primary/30">
           <Icon size={20} />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* Policy Details */}
    <section className="section-padding gradient-pearl">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
       <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">{t('policy.eyebrow')}</p>
       <h2 className="text-2xl md:text-4xl font-semibold text-foreground">{t('policy.title')}</h2>
      </div>
      <div className="space-y-5">
       {policies.map((p, i) => (
        <div key={i} className="glass-card p-7">
         <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
         <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
     <div className="max-w-2xl mx-auto text-center">
      <div className="glass-card p-10 md:p-14 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
       <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{t('cta.headline')}</h2>
        <p className="text-muted-foreground mb-6">{t('cta.sub')}</p>
        <Link to="/support" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
         {t('cta.button')} <ArrowRight size={14} />
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

export default Returns;
