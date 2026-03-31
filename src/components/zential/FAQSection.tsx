import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Does this actually work?", a: "Yes. Our devices use clinically-studied microcurrent, EMS, and red light therapy — the same technologies used in professional clinics. Most users notice improved skin texture within 2 weeks and visible lift after 3–4 weeks of daily use." },
  { q: "How do I know this is an authentic device?", a: "Every Zential device ships with a unique serial number and authenticity seal. We sell exclusively through our official store — no third-party resellers — so you always receive a genuine product with full warranty." },
  { q: "Will this work on my skin type?", a: "Our devices are effective on all skin types and tones. Start at the lowest intensity and increase gradually. If you have sensitive skin, mild initial redness is normal and subsides within minutes." },
  { q: "Is it safe to use every day?", a: "Yes. All devices include multiple safety features and auto-shutoff protection. Start with 5-minute sessions daily and follow the included ritual guide. Consult your physician if you have a pacemaker, are pregnant, or have epilepsy." },
  { q: "Is it worth the investment?", a: "One device replaces hundreds of euros in monthly clinic visits. With daily 5-minute rituals, you get professional-grade results at home — backed by our 30-Day Ritual Guarantee." },
  { q: "What if I need help after my purchase?", a: "Our support team responds within 24 hours. You're covered by a 30-Day Ritual Guarantee, easy returns, and lifetime access to ritual guides and tips." },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Questions</p>
        <h2 className="text-3xl md:text-5xl font-semibold">Frequently Asked</h2>
      </div>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border/30">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
