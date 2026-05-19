import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";
import { useTranslation } from "react-i18next";

export function FAQSection() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation('home');
  const faqs = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section ref={ref} id="faq" className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#9B5A2E' }}>{t('faq.eyebrow')}</p>
          <h2 className="font-serif italic text-3xl md:text-4xl text-foreground">{t('faq.title')}</h2>
        </div>
        <Accordion type="multiple" defaultValue={["faq-0", "faq-1"]}>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} style={{ borderColor: '#E4DFD8' }}>
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5 text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60 leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
