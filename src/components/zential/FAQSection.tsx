import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function FAQSection() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation('home');
  const faqs = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section ref={ref} id="faq" className="relative border-t border-[rgba(20,20,20,0.10)] bg-white px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">{t('faq.eyebrow')}</p>
          <h2 className="font-sans font-light text-3xl md:text-4xl tracking-[-0.025em] text-[#141414]">{t('faq.title')}</h2>
        </div>
        <Accordion type="multiple" defaultValue={["faq-0", "faq-1"]}>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-[rgba(20,20,20,0.10)]">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5 text-[#141414] data-[state=open]:text-[#0E7A54]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#5A5A5A] leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
