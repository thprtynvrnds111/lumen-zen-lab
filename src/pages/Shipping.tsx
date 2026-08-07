import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Package, Truck, Globe, ShieldCheck, Clock, MapPin, Plane, CheckCircle2, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

function useInView(threshold = 0.15) {
 const ref = useRef<HTMLDivElement>(null);
 const [inView, setInView] = useState(false);
 useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
  obs.observe(el);
  return () => obs.disconnect();
 }, [threshold]);
 return { ref, inView };
}

const stepIconComponents = [CheckCircle2, Package, Plane, Truck, MapPin];
const trustIconComponents = [ShieldCheck, Clock, Globe, Package];

type Step = { title: string; desc: string; time: string };
type Zone = { region: string; time: string; cost: string; flag: string };
type TrustItem = { title: string; desc: string };

function AnimatedStep({ step, index, total, Icon }: { step: Step; index: number; total: number; Icon: React.ElementType }) {
 const { ref, inView } = useInView(0.2);
 const isLast = index === total - 1;

 return (
  <div ref={ref} className="flex gap-6 md:gap-10 relative">
   <div className="flex flex-col items-center flex-shrink-0">
    <div
     className={`w-11 h-11 rounded-full border border-[rgba(20,20,20,0.12)] bg-white flex items-center justify-center transition-all duration-700 ${inView ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
     style={{ transitionDelay: `${index * 120}ms` }}
    >
     <Icon size={18} className="text-[#0E7A54]" strokeWidth={1.5} />
    </div>
    {!isLast && (
     <div className="w-px flex-1 min-h-[48px] bg-[rgba(20,20,20,0.10)] my-2" />
    )}
   </div>

   <div
    className={`pb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
    style={{ transitionDelay: `${index * 120 + 80}ms` }}
   >
    <div className="flex items-center gap-3 mb-1.5">
     <h3 className="font-medium text-[#141414] text-[15px] tracking-[-0.01em]">{step.title}</h3>
     <span className="text-[10px] tracking-[0.15em] uppercase text-[#0E7A54] bg-[#F4FBF8] px-2.5 py-0.5 rounded-full">{step.time}</span>
    </div>
    <p className="text-[13px] text-[#5A5A5A] leading-relaxed max-w-md">{step.desc}</p>
   </div>
  </div>
 );
}

const Shipping = () => {
 const { t } = useTranslation('shipping');
 const heroRef = useInView(0.1);
 const zonesRef = useInView(0.15);
 const trustRef = useInView(0.15);

 const journeySteps = t('journey.steps', { returnObjects: true }) as Step[];
 const shippingZones = t('zones.items', { returnObjects: true }) as Zone[];
 const trustPoints = t('trust.items', { returnObjects: true }) as TrustItem[];
 const headline = t('hero.headline').split('\n');

 return (
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO title="Shipping & Delivery, Zential Pure" description="Free EU shipping on orders over €75. Netherlands 2–3 days, EU 3–7 days. Track your Zential Pure device from dispatch to door." canonicalUrl="/shipping" />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section
     ref={heroRef.ref}
     className="py-28 md:py-40 px-6 md:px-12 lg:px-20 text-center"
    >
     <div className={`transition-all duration-1000 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="inline-flex items-center gap-2 border border-[rgba(20,20,20,0.12)] text-[#8E8E8E] rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
       {t('hero.badge')}
      </div>
      <h1 className="text-3xl md:text-5xl font-light text-[#141414] mb-5 tracking-[-0.03em] leading-[1.15]">
       {headline[0]},<br />
       {headline[1]}
      </h1>
      <p className="text-[#5A5A5A] text-[15px] max-w-md mx-auto leading-relaxed">
       {t('hero.sub')}
      </p>
     </div>
    </section>

    {/* Journey Timeline */}
    <section className="px-6 md:px-12 lg:px-20 pb-28">
     <div className="max-w-xl mx-auto">
      <div className="text-center mb-16">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('journey.eyebrow')}</p>
       <h2 className="text-2xl md:text-3xl font-light text-[#141414] tracking-[-0.025em]">{t('journey.title')}</h2>
      </div>
      <div>
       {journeySteps.map((step, i) => (
        <AnimatedStep
         key={i}
         step={step}
         index={i}
         total={journeySteps.length}
         Icon={stepIconComponents[i] ?? CheckCircle2}
        />
       ))}
      </div>
     </div>
    </section>

    {/* Shipping Zones */}
    <section ref={zonesRef.ref} className="section-padding border-y border-[rgba(20,20,20,0.10)] bg-white">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('zones.eyebrow')}</p>
       <h2 className="text-2xl md:text-3xl font-light text-[#141414] tracking-[-0.025em]">{t('zones.title')}</h2>
      </div>
      <div className="divide-y divide-[rgba(20,20,20,0.10)]">
       {shippingZones.map((zone, i) => (
        <div
         key={i}
         className={`py-5 md:py-6 flex items-center justify-between gap-4 transition-all duration-600 ${zonesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
         style={{ transitionDelay: `${i * 100}ms` }}
        >
         <div className="flex items-center gap-4">
          <span className="text-lg w-8 text-center">{zone.flag}</span>
          <div>
           <h3 className="font-medium text-[#141414] text-[14px]">{zone.region}</h3>
           <p className="text-[13px] text-[#5A5A5A]">{zone.time}</p>
          </div>
         </div>
         <div className="text-right">
          <span className="text-[13px] font-medium tabular-nums text-[#0E7A54]">{zone.cost}</span>
         </div>
        </div>
       ))}
      </div>
      <p className="text-[11px] text-[#8E8E8E] text-center mt-8">
       {t('zones.footnote')}
      </p>
     </div>
    </section>

    {/* Trust Grid */}
    <section ref={trustRef.ref} className="section-padding">
     <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
       <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('trust.eyebrow')}</p>
       <h2 className="text-2xl md:text-3xl font-light text-[#141414] tracking-[-0.025em]">{t('trust.title')}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
       {trustPoints.map((point, i) => {
        const Icon = trustIconComponents[i] ?? ShieldCheck;
        return (
         <div
          key={i}
          className={`rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-8 transition-all duration-500 ${trustRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
           transitionDelay: `${i * 120}ms`,
          }}
         >
          <div className="w-10 h-10 rounded-full border border-[rgba(20,20,20,0.12)] bg-white flex items-center justify-center mb-5">
           <Icon size={17} className="text-[#0E7A54]" strokeWidth={1.5} />
          </div>
          <h3 className="font-medium text-[#141414] text-[15px] mb-2">{point.title}</h3>
          <p className="text-[13px] text-[#5A5A5A] leading-relaxed">{point.desc}</p>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* CTA */}
    <section className="section-padding pb-28">
     <div className="max-w-xl mx-auto text-center">
      <div
       className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-10 md:p-14"
      >
       <h2 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-[#141414] mb-3">{t('cta.headline')}</h2>
       <p className="text-[#5A5A5A] text-[14px] mb-7">{t('cta.sub')}</p>
       <a
        href="/support"
        className="inline-flex items-center gap-2 rounded-full bg-[#2ED8A8] px-6 py-3 text-sm font-medium text-[#141414] transition-colors hover:bg-[#1BAF86]"
       >
        {t('cta.button')} <ArrowRight size={14} />
       </a>
      </div>
     </div>
    </section>
   </main>
   <SparseFooter />
  </div>
 );
};

export default Shipping;
