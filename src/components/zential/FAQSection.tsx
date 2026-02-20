import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does shipping work?", a: "We offer free shipping on orders over €50. Standard delivery takes 3–5 business days within Europe." },
  { q: "What is the return policy?", a: "We offer a 30-Day Ritual Guarantee. If you're not satisfied, return the device in its original condition for a full refund." },
  { q: "How do the devices work?", a: "Our devices use clinically-studied technologies including microcurrent, EMS, and red light therapy to stimulate facial muscles and boost collagen production." },
  { q: "Are the devices safe?", a: "Yes. All devices are designed with multiple safety features and use technology that has been clinically studied. Always follow the included ritual guide." },
  { q: "Who should not use these devices?", a: "Consult your healthcare provider if you have a pacemaker, are pregnant, have epilepsy, or have active skin conditions in the treatment area." },
  { q: "Do I need conductive gel?", a: "Yes, conductive gel is essential for optimal results and comfort. It ensures proper conductivity and protects your skin during use." },
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
