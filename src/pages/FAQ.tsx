import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Truck, RotateCcw, Heart, ShieldCheck, CreditCard, Zap } from "lucide-react";

const faqCategories = [
  {
    label: "Shipping & Delivery",
    icon: Truck,
    items: [
      { q: "How long does shipping take?", a: "Netherlands: 2–3 business days. EU: 3–7 business days. International: 7–14 business days. You'll receive tracking via email once your order ships." },
      { q: "Do you offer free shipping?", a: "Yes — free shipping on orders over €50 within the Netherlands, and over €75 for EU orders." },
      { q: "Do you ship internationally?", a: "Yes, we ship to 50+ countries worldwide. International shipping costs are calculated at checkout. Customs duties may apply." },
      { q: "Can I track my order?", a: "Absolutely. You'll receive a tracking link via email as soon as your order ships. You can also contact support with your order number." },
    ],
  },
  {
    label: "Returns & Guarantee",
    icon: RotateCcw,
    items: [
      { q: "What is the 30-Day Ritual Guarantee?", a: "If you don't see visible improvement within 30 days of consistent daily use, contact us for a full refund. No lengthy process, no pressure." },
      { q: "How do I return a product?", a: "Email support@zentialpure.com with your order number. We'll approve your request within 24 hours and provide a prepaid return label." },
      { q: "Can I return opened accessories?", a: "For hygiene reasons, opened consumables (gels, pads) cannot be returned. Devices can be returned in original packaging within 30 days." },
    ],
  },
  {
    label: "Product Usage",
    icon: Heart,
    items: [
      { q: "Can I use the devices daily?", a: "Yes. Our devices are designed for daily use in 5-minute sessions. Start at the lowest intensity and gradually increase as your skin adjusts." },
      { q: "Do I need conductive gel?", a: "For microcurrent devices, a conductive gel or water-based serum is essential for optimal current delivery and skin protection. Our Collagen Face Gel is formulated specifically for this." },
      { q: "How long until I see results?", a: "Most users notice improved skin texture within 2 weeks. Structural changes (lift, definition) typically become visible after 3–4 weeks of daily use." },
      { q: "Can I use multiple devices together?", a: "Yes, our devices are designed to complement each other. Use them in sequence as part of your daily ritual for enhanced results." },
    ],
  },
  {
    label: "Safety",
    icon: ShieldCheck,
    items: [
      { q: "Are the devices safe?", a: "Yes. All devices use clinically-studied technology with multiple safety features. Always follow the included ritual guide and start at the lowest setting." },
      { q: "Who should not use these devices?", a: "Do not use if you have a pacemaker, are pregnant, have epilepsy, active skin infections, or metal implants in the treatment area. Consult your physician if uncertain." },
      { q: "Is it safe for sensitive skin?", a: "Yes. Start at the lowest intensity. If irritation persists beyond mild initial redness, reduce frequency and consult a dermatologist." },
    ],
  },
  {
    label: "Technology",
    icon: Zap,
    items: [
      { q: "What is microcurrent?", a: "Microcurrent delivers low-level electrical stimulation that mimics your body's natural bioelectric currents, activating facial muscles and stimulating collagen production." },
      { q: "What does red light therapy do?", a: "Red light (620–660nm) penetrates the skin to stimulate cellular energy production, supporting collagen synthesis and reducing inflammation." },
      { q: "What is EMS?", a: "Electrical Muscle Stimulation uses targeted pulses to contract and tone facial muscles, similar to a workout for your face." },
    ],
  },
  {
    label: "Payment",
    icon: CreditCard,
    items: [
      { q: "What payment methods do you accept?", a: "Visa, Mastercard, American Express, iDEAL, Bancontact, Klarna, Shop Pay, Apple Pay, and Google Pay. All transactions are securely processed." },
      { q: "Do you offer payment plans?", a: "Yes — Klarna is available at checkout, allowing you to split your purchase into interest-free installments." },
    ],
  },
];

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar />
    <Header />
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px] pointer-events-none" />
        <div className="relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
            <HelpCircle size={14} />
            Help Center
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
            Frequently Asked<br />
            <span className="text-accent">Questions.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Everything you need to know about your devices, shipping, returns, and more.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((cat, ci) => (
            <div key={cat.label} className="mb-10 animate-fade-in" style={{ animationDelay: `${ci * 80}ms` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <cat.icon size={16} className="text-accent" />
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">{cat.label}</span>
              </div>
              <Accordion type="single" collapsible className="glass-card overflow-hidden">
                {cat.items.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.label}-${i}`} className="border-border/20">
                    <AccordionTrigger className="px-6 text-left text-sm font-medium hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-muted-foreground text-sm leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </main>
    <ZentialFooter />
  </div>
);

export default FAQ;
