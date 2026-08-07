import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, RotateCcw, ShieldCheck, MessageCircle, Truck, CreditCard, Heart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const quickCardIcons = [Package, RotateCcw, ShieldCheck, MessageCircle];
const categoryIcons = [ShieldCheck, Heart, AlertTriangle, CreditCard, MessageCircle];
const badgeIcons = [ShieldCheck, Truck, RotateCcw, CreditCard];

const Support = () => {
 const { t } = useTranslation('support');
 const [formState, setFormState] = useState({ name: "", email: "", orderNumber: "", message: "" });
 const [submitting, setSubmitting] = useState(false);

 const quickCards = t('quickCards', { returnObjects: true }) as Array<{ title: string; desc: string }>;
 const categories = t('categories', { returnObjects: true }) as Array<{ label: string; items: Array<{ q: string; a: string }> }>;
 const safetyItems = t('safety.items', { returnObjects: true }) as string[];
 const badges = t('guarantee.badges', { returnObjects: true }) as string[];

 // The accordion is Radix — closed answers are not in the DOM, so crawlers
 // only see the questions. FAQPage JSON-LD ships every answer in the served
 // HTML regardless of accordion state (same pattern as the compare pages).
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

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
   toast.error(t('contact.validationError'));
   return;
  }
  setSubmitting(true);
  const subject = encodeURIComponent(
   formState.orderNumber.trim()
    ? `Support Request – Order ${formState.orderNumber.trim()}`
    : "Support Request"
  );
  const body = encodeURIComponent(
   `Name: ${formState.name.trim()}\nEmail: ${formState.email.trim()}${formState.orderNumber.trim() ? `\nOrder Number: ${formState.orderNumber.trim()}` : ""}\n\n${formState.message.trim()}`
  );
  window.location.href = `mailto:info@zentialpure.com?subject=${subject}&body=${body}`;
  setFormState({ name: "", email: "", orderNumber: "", message: "" });
  setSubmitting(false);
 };

 return (
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO title="Support, Zential Pure" description="Track orders, start a return, or get help with your device. Zential Pure support responds within 24–48 hours." canonicalUrl="/support" jsonLd={faqJsonLd} />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section className="py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center">
     <div>
      <div className="inline-flex items-center gap-2 border border-[rgba(20,20,20,0.12)] text-[#8E8E8E] rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
       {t('hero.badge')}
      </div>
      <h1 className="text-3xl md:text-5xl font-light text-[#141414] mb-5 tracking-[-0.03em] leading-[1.15]">
       {t('hero.headline').split('\n').map((line, i) => (
        <span key={i}>{line}{i === 0 && <br />}</span>
       ))}
      </h1>
      <p className="text-[#5A5A5A] text-[15px] max-w-md mx-auto leading-relaxed">
       {t('hero.sub')}
      </p>
     </div>
    </section>

    {/* Quick Help Cards */}
    <section className="px-6 md:px-12 lg:px-20 pb-16">
     <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {quickCards.map((card, i) => {
       const Icon = quickCardIcons[i] ?? Package;
       return (
        <div
         key={i}
         className="rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-7 text-center transition-all duration-300"
        >
         <div className="w-11 h-11 rounded-none border border-[rgba(20,20,20,0.12)] flex items-center justify-center mx-auto mb-4">
          <Icon size={20} className="text-[#0E7A54]" strokeWidth={1.5} />
         </div>
         <h3 className="font-medium text-[#141414] text-[15px] mb-2">{card.title}</h3>
         <p className="text-[13px] text-[#5A5A5A] leading-relaxed">{card.desc}</p>
        </div>
       );
      })}
     </div>
    </section>

    {/* FAQ Accordion */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-light text-[#141414] text-center mb-12 tracking-[-0.025em]">{t('faqTitle')}</h2>
      {categories.map((cat, ci) => {
       const Icon = categoryIcons[ci] ?? ShieldCheck;
       return (
        <div key={ci} className="mb-8">
         <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className="text-[#0E7A54]" />
          <span className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">{cat.label}</span>
         </div>
         <Accordion type="single" collapsible className="border border-[rgba(20,20,20,0.10)] rounded-none overflow-hidden">
          {cat.items.map((item, i) => (
           <AccordionItem key={i} value={`cat-${ci}-${i}`} className="border-[rgba(20,20,20,0.10)]">
            <AccordionTrigger className="px-5 text-left text-sm font-medium hover:no-underline data-[state=open]:text-[#0E7A54]">
             {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-5 text-[#5A5A5A] text-sm leading-relaxed">
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

    {/* 30-Day Guarantee */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-3xl mx-auto text-center">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('guarantee.eyebrow')}</p>
      <h2 className="text-2xl md:text-3xl font-light text-[#141414] mb-4 tracking-[-0.025em]">
       {t('guarantee.headline')}
      </h2>
      <p className="text-[#5A5A5A] max-w-xl mx-auto mb-8 leading-relaxed">
       {t('guarantee.sub')}
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
       {badges.map((label, i) => {
        const Icon = badgeIcons[i] ?? ShieldCheck;
        return (
         <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-[rgba(20,20,20,0.12)] flex items-center justify-center">
           <Icon size={18} className="text-[#0E7A54]" strokeWidth={1.5} />
          </div>
          <span className="text-xs text-[#5A5A5A]">{label}</span>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* Contact Form */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-light text-[#141414] text-center mb-8 tracking-[-0.025em]">{t('contact.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-8">
       <div>
        <Label htmlFor="name">{t('contact.nameLabel')} *</Label>
        <Input id="name" value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))} className="mt-1.5 rounded-none border-[rgba(20,20,20,0.22)] bg-white" />
       </div>
       <div>
        <Label htmlFor="email">{t('contact.emailLabel')} *</Label>
        <Input id="email" type="email" value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))} className="mt-1.5 rounded-none border-[rgba(20,20,20,0.22)] bg-white" />
       </div>
       <div>
        <Label htmlFor="orderNumber">{t('contact.orderLabel')}</Label>
        <Input id="orderNumber" value={formState.orderNumber} onChange={(e) => setFormState(s => ({ ...s, orderNumber: e.target.value }))} className="mt-1.5 rounded-none border-[rgba(20,20,20,0.22)] bg-white" />
       </div>
       <div>
        <Label htmlFor="message">{t('contact.messageLabel')} *</Label>
        <textarea
         id="message"
         rows={4}
         value={formState.message}
         onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
         className="mt-1.5 flex w-full rounded-none border border-[rgba(20,20,20,0.22)] bg-white px-3 py-2 text-sm placeholder:text-[#8E8E8E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7A54] focus-visible:ring-offset-2"
        />
       </div>
       <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-50">
        {submitting ? t('contact.submitting') : t('contact.submit')}
       </button>
       <p className="text-xs text-[#8E8E8E] text-center">{t('contact.footnote')}</p>
      </form>
     </div>
    </section>

    {/* Safety Notice */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-3xl mx-auto rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-8">
      <div className="flex items-center gap-2 mb-4">
       <AlertTriangle size={18} className="text-[#0E7A54]" />
       <h3 className="font-medium text-[#141414] text-[15px]">{t('safety.title')}</h3>
      </div>
      <ul className="space-y-2 text-sm text-[#5A5A5A]">
       {safetyItems.map((item, i) => (
        <li key={i}>• {item}</li>
       ))}
      </ul>
     </div>
    </section>
   </main>
   <SparseFooter />
  </div>
 );
};

export default Support;
