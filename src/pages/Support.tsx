import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { BubbleBackground } from "@/components/zential/BubbleBackground";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  <div className="min-h-screen bg-background">
   <SEO title="Support, Zential Pure" description="Track orders, start a return, or get help with your device. Zential Pure support responds within 24–48 hours." canonicalUrl="/support" />
   <AnnouncementBar />
   <Header />
   <main>
    {/* Hero */}
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
     <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsl(30 27% 95%) 0%, hsl(30 20% 92%) 40%, hsl(340 15% 93%) 70%, hsl(30 27% 95%) 100%)' }} />
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)' }}
     />
     <BubbleBackground />
     <div className="relative z-10">
      <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase mb-6">
       {t('hero.badge')}
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-5 tracking-[-0.02em] leading-[1.15]">
       {t('hero.headline').split('\n').map((line, i) => (
        <span key={i}>{line}{i === 0 && <br />}</span>
       ))}
      </h1>
      <p className="text-muted-foreground text-[15px] max-w-md mx-auto leading-relaxed">
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
         className="rounded-2xl p-7 text-center transition-all duration-300"
         style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}
        >
         <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <Icon size={20} className="text-primary" strokeWidth={1.5} />
         </div>
         <h3 className="font-medium text-foreground text-[15px] mb-2">{card.title}</h3>
         <p className="text-[13px] text-muted-foreground leading-relaxed">{card.desc}</p>
        </div>
       );
      })}
     </div>
    </section>

    {/* FAQ Accordion */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12 tracking-[-0.02em]">{t('faqTitle')}</h2>
      {categories.map((cat, ci) => {
       const Icon = categoryIcons[ci] ?? ShieldCheck;
       return (
        <div key={ci} className="mb-8">
         <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className="text-primary" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{cat.label}</span>
         </div>
         <Accordion type="single" collapsible className="border border-border/30 rounded-xl overflow-hidden">
          {cat.items.map((item, i) => (
           <AccordionItem key={i} value={`cat-${ci}-${i}`} className="border-border/20">
            <AccordionTrigger className="px-5 text-left text-sm font-medium hover:no-underline">
             {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-5 text-muted-foreground text-sm leading-relaxed">
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
      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">{t('guarantee.eyebrow')}</p>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-[-0.02em]">
       {t('guarantee.headline')}
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
       {t('guarantee.sub')}
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
       {badges.map((label, i) => {
        const Icon = badgeIcons[i] ?? ShieldCheck;
        return (
         <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
           <Icon size={18} className="text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-xs text-muted-foreground">{label}</span>
         </div>
        );
       })}
      </div>
     </div>
    </section>

    {/* Contact Form */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-8 tracking-[-0.02em]">{t('contact.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8" style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}>
       <div>
        <Label htmlFor="name">{t('contact.nameLabel')} *</Label>
        <Input id="name" value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))} className="mt-1.5 rounded-xl" />
       </div>
       <div>
        <Label htmlFor="email">{t('contact.emailLabel')} *</Label>
        <Input id="email" type="email" value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))} className="mt-1.5 rounded-xl" />
       </div>
       <div>
        <Label htmlFor="orderNumber">{t('contact.orderLabel')}</Label>
        <Input id="orderNumber" value={formState.orderNumber} onChange={(e) => setFormState(s => ({ ...s, orderNumber: e.target.value }))} className="mt-1.5 rounded-xl" />
       </div>
       <div>
        <Label htmlFor="message">{t('contact.messageLabel')} *</Label>
        <textarea
         id="message"
         rows={4}
         value={formState.message}
         onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
         className="mt-1.5 flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
       </div>
       <Button type="submit" variant="ritual" size="lg" className="w-full" disabled={submitting}>
        {submitting ? t('contact.submitting') : t('contact.submit')}
       </Button>
       <p className="text-xs text-muted-foreground text-center">{t('contact.footnote')}</p>
      </form>
     </div>
    </section>

    {/* Safety Notice */}
    <section className="px-6 md:px-12 lg:px-20 pb-20">
     <div className="max-w-3xl mx-auto rounded-2xl p-8" style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}>
      <div className="flex items-center gap-2 mb-4">
       <AlertTriangle size={18} className="text-primary" />
       <h3 className="font-medium text-foreground text-[15px]">{t('safety.title')}</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
       {safetyItems.map((item, i) => (
        <li key={i}>• {item}</li>
       ))}
      </ul>
     </div>
    </section>
   </main>
   <ZentialFooter />
  </div>
 );
};

export default Support;
