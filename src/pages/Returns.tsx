import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
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
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO title="Returns & 30-Day Money-Back Guarantee, Zential Pure" description="30-day money-back guarantee, counted from delivery — any reason. EU orders get a prepaid return label; US orders are refunded without a return. No friction, no pressure." canonicalUrl="/returns" />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center">
     <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 border border-[rgba(20,20,20,0.12)] text-[#8E8E8E] rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
       <RotateCcw size={14} className="text-[#0E7A54]" />
       {t('hero.badge')}
      </div>
      <h1 className="font-sans font-light text-4xl md:text-6xl text-[#141414] mb-5 tracking-[-0.03em]">
       {headline[0]}<br />
       <span className="text-[#141414]">{headline[1]}</span>
      </h1>
      <p className="text-[#5A5A5A] text-lg max-w-lg mx-auto leading-relaxed">
       {t('hero.sub')}
      </p>
     </div>
    </section>

    {/* Steps */}
    <section className="px-6 md:px-12 lg:px-20 pb-24">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('steps.eyebrow')}</p>
       <h2 className="text-2xl md:text-4xl font-light tracking-[-0.025em] text-[#141414]">{t('steps.title')}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {steps.map((s, i) => {
        const Icon = stepIcons[i] ?? Package;
        return (
         <div key={i} className="border border-[rgba(20,20,20,0.10)] bg-white p-7 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="w-11 h-11 rounded-none text-[#0E7A54] flex items-center justify-center mb-4 border border-[rgba(20,20,20,0.12)]">
           <Icon size={20} />
          </div>
          <h3 className="font-medium text-[#141414] mb-2">{s.title}</h3>
          <p className="text-sm text-[#5A5A5A] leading-relaxed">{s.desc}</p>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* Policy Details */}
    <section className="section-padding border-y border-[rgba(20,20,20,0.10)] bg-white">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('policy.eyebrow')}</p>
       <h2 className="text-2xl md:text-4xl font-light tracking-[-0.025em] text-[#141414]">{t('policy.title')}</h2>
      </div>
      <div className="border-t border-[rgba(20,20,20,0.10)]">
       {policies.map((p, i) => (
        <div key={i} className="border-b border-[rgba(20,20,20,0.10)] py-7">
         <h3 className="font-medium text-[#141414] mb-2">{p.title}</h3>
         <p className="text-sm text-[#5A5A5A] leading-relaxed">{p.desc}</p>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
     <div className="max-w-2xl mx-auto text-center">
      <div className="border border-[rgba(20,20,20,0.10)] bg-white p-10 md:p-14">
       <h2 className="text-2xl md:text-3xl font-light tracking-[-0.025em] text-[#141414] mb-3">{t('cta.headline')}</h2>
       <p className="text-[#5A5A5A] mb-6">{t('cta.sub')}</p>
       <Link to="/support" className="inline-flex items-center gap-2 rounded-full bg-[#2ED8A8] px-6 py-3 text-sm font-medium text-[#141414] transition-colors hover:bg-[#1BAF86]">
        {t('cta.button')} <ArrowRight size={14} />
       </Link>
      </div>
     </div>
    </section>
   </main>
   <SparseFooter />
  </div>
 );
};

export default Returns;
