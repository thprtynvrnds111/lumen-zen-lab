import { useTranslation } from "react-i18next";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Truck, RotateCcw, Heart, ShieldCheck, CreditCard, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";

const categoryIcons = [Truck, RotateCcw, Heart, ShieldCheck, Zap, CreditCard];

const FAQ = () => {
 const { t } = useTranslation('faq');
 const categories = t('categories', { returnObjects: true }) as Array<{ label: string; items: Array<{ q: string; a: string }> }>;
 const headline = t('hero.headline').split('\n');

 // Closed Radix accordion items are not in the DOM; FAQPage JSON-LD ships
 // every answer in the served HTML (same pattern as /support).
 const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((cat) =>
   cat.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
   })),
  ),
 };

 return (
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO title="FAQ, Zential Pure" description="Answers to common questions about Zential Pure devices, shipping, returns, safety, and how to get the most from your daily ritual." canonicalUrl="/faq" jsonLd={faqJsonLd} />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center">
     <div className="animate-fade-in">
      <div className="inline-flex items-center gap-2 border border-[rgba(20,20,20,0.12)] text-[#8E8E8E] rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
       <HelpCircle size={14} className="text-[#0E7A54]" />
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

    {/* FAQ Categories */}
    <section className="px-6 md:px-12 lg:px-20 pb-24">
     <div className="max-w-3xl mx-auto">
      {categories.map((cat, ci) => {
       const Icon = categoryIcons[ci] ?? HelpCircle;
       return (
        <div key={ci} className="mb-10 animate-fade-in" style={{ animationDelay: `${ci * 80}ms` }}>
         <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-none border border-[rgba(20,20,20,0.12)] flex items-center justify-center">
           <Icon size={16} className="text-[#0E7A54]" />
          </div>
          <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#8E8E8E] font-medium">{cat.label}</span>
         </div>
         <Accordion type="single" collapsible className="border border-[rgba(20,20,20,0.10)] overflow-hidden">
          {cat.items.map((item, i) => (
           <AccordionItem key={i} value={`cat-${ci}-${i}`} className="border-[rgba(20,20,20,0.10)]">
            <AccordionTrigger className="px-6 text-left text-sm font-medium hover:no-underline data-[state=open]:text-[#0E7A54]">
             {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-6 text-[#5A5A5A] text-sm leading-relaxed">
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
   <SparseFooter />
  </div>
 );
};

export default FAQ;
