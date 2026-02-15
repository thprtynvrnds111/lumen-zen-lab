import { useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Package, RotateCcw, ShieldCheck, MessageCircle, Truck, CreditCard, Heart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const quickCards = [
  { icon: Package, title: "Track Your Order", desc: "Check your shipment status and delivery timeline." },
  { icon: RotateCcw, title: "Returns & Guarantee", desc: "30-Day Ritual Guarantee — no friction, no pressure." },
  { icon: ShieldCheck, title: "Product Safety", desc: "Usage guidelines and important safety information." },
  { icon: MessageCircle, title: "Contact Support", desc: "Reach us directly — response within 24–48 hours." },
];

const faqCategories = [
  {
    label: "Shipping",
    icon: Truck,
    items: [
      { q: "How long does shipping take in NL / EU?", a: "Orders within the Netherlands typically arrive in 2–3 business days. EU-wide delivery takes 3–7 business days depending on destination. You'll receive tracking information via email once your order ships." },
      { q: "Do you ship internationally?", a: "Yes. We ship to most countries worldwide. International orders typically take 7–14 business days. Customs duties and import taxes may apply depending on your country's regulations." },
    ],
  },
  {
    label: "Returns",
    icon: RotateCcw,
    items: [
      { q: "What is the 30-Day Ritual Guarantee?", a: "If you don't feel visible improvement within 30 days of consistent daily use, contact us for a full refund. No lengthy process, no pressure. We believe in the technology — and we believe in your experience." },
    ],
  },
  {
    label: "Product Usage",
    icon: Heart,
    items: [
      { q: "Can I use the device daily?", a: "Yes. Our devices are designed for daily use. We recommend starting with 5-minute sessions and gradually increasing as your skin adjusts. Consistency is the key to visible results." },
      { q: "Do I need conductive gel?", a: "For microcurrent devices, a conductive gel or serum is recommended to ensure optimal current delivery and comfortable gliding. Water-based serums work well as an alternative." },
    ],
  },
  {
    label: "Safety",
    icon: ShieldCheck,
    items: [
      { q: "Is it safe with sensitive skin?", a: "Yes. Start at the lowest intensity setting and gradually increase. If you experience persistent irritation beyond mild initial redness, discontinue use and consult a dermatologist." },
      { q: "Who should not use microcurrent devices?", a: "Do not use if you have a pacemaker, are pregnant, have active skin infections, epilepsy, or metal implants in the treatment area. Always consult your physician if you have a medical condition." },
      { q: "What if I experience mild redness?", a: "Mild, temporary redness after use is normal — it indicates increased circulation. It should subside within 15–30 minutes. If redness persists, reduce intensity or frequency of use." },
    ],
  },
  {
    label: "Payment",
    icon: CreditCard,
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, iDEAL, Bancontact, Klarna, Shop Pay, Apple Pay, and Google Pay. All transactions are securely processed." },
    ],
  },
];

const Support = () => {
  const [formState, setFormState] = useState({ name: "", email: "", orderNumber: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Request submitted. We'll respond within 24–48 hours.");
      setFormState({ name: "", email: "", orderNumber: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Support & Care</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            We're here to make your ritual seamless.
          </p>
        </section>

        {/* Quick Help Cards */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickCards.map((card) => (
              <div
                key={card.title}
                className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon size={22} className="text-teal" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
            {faqCategories.map((cat) => (
              <div key={cat.label} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <cat.icon size={16} className="text-teal" />
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{cat.label}</span>
                </div>
                <Accordion type="single" collapsible className="border border-border/30 rounded-xl overflow-hidden">
                  {cat.items.map((item, i) => (
                    <AccordionItem key={i} value={`${cat.label}-${i}`} className="border-border/20">
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
            ))}
          </div>
        </section>

        {/* 30-Day Guarantee */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Feel The Shift — Or It's On Us.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              If you don't feel visible improvement within 30 days of consistent use, contact us. No friction. No pressure.
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                { icon: ShieldCheck, label: "30-Day Guarantee" },
                { icon: Truck, label: "Fast Shipping" },
                { icon: RotateCcw, label: "Easy Returns" },
                { icon: CreditCard, label: "Secure Checkout" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                    <t.icon size={18} className="text-teal" />
                  </div>
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-5 bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="orderNumber">Order Number (optional)</Label>
                <Input id="orderNumber" value={formState.orderNumber} onChange={(e) => setFormState(s => ({ ...s, orderNumber: e.target.value }))} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="mt-1.5 flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" variant="ritual" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Response within 24–48 hours.</p>
            </form>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto bg-teal/5 border border-teal/20 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-teal" />
              <h3 className="font-semibold text-foreground">Important Safety Guidelines</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Do not use with pacemakers or implanted electrical devices</li>
              <li>• Avoid use during pregnancy</li>
              <li>• Do not use on active skin infections or open wounds</li>
              <li>• Always start at the lowest intensity setting</li>
              <li>• Consult your physician if you have a medical condition</li>
            </ul>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Support;
