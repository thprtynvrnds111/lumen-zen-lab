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
  { icon: RotateCcw, title: "Returns & Guarantee", desc: "30-Day Ritual Guarantee, no friction, no pressure." },
  { icon: ShieldCheck, title: "Product Safety", desc: "Usage guidelines and important safety information." },
  { icon: MessageCircle, title: "Contact Support", desc: "Reach us directly, response within 24 to 48 hours." },
];

const faqCategories = [
  {
    label: "Efficacy & Authenticity",
    icon: ShieldCheck,
    items: [
      { q: "Does this actually work?", a: "Yes. Our devices use clinically-studied microcurrent, EMS, and red light therapy — the same technologies found in professional clinics. Most users notice improved skin texture within 2 weeks and visible lift after 3–4 weeks of daily use." },
      { q: "How do I know this is an authentic device?", a: "Every Zential device ships with a unique serial number and authenticity seal. We sell exclusively through our official store — no third-party resellers — so you always receive a genuine product with full warranty." },
    ],
  },
  {
    label: "Skin Type Suitability",
    icon: Heart,
    items: [
      { q: "Will this work on my skin type?", a: "Our devices are effective on all skin types and tones. Start at the lowest intensity and increase gradually. If you have sensitive skin, mild initial redness is normal and subsides within minutes." },
      { q: "Do I need conductive gel?", a: "For microcurrent devices, a conductive gel or water-based serum is essential for optimal current delivery and skin protection. Our Collagen Face Gel is formulated specifically for this." },
    ],
  },
  {
    label: "Safety",
    icon: AlertTriangle,
    items: [
      { q: "Is it safe to use every day?", a: "Yes. All devices include multiple safety features and auto-shutoff protection. Start with 5-minute sessions daily and follow the included ritual guide. Consult your physician if you have a pacemaker, are pregnant, or have epilepsy." },
      { q: "Is it safe with sensitive skin?", a: "Yes. Start at the lowest intensity setting and gradually increase. If you experience persistent irritation beyond mild initial redness, discontinue use and consult a dermatologist." },
    ],
  },
  {
    label: "Price & Value",
    icon: CreditCard,
    items: [
      { q: "Is it worth the investment?", a: "One device replaces hundreds of euros in monthly clinic visits. With daily 5-minute rituals, you get professional-grade results at home — backed by our 30-Day Ritual Guarantee." },
      { q: "Do you offer payment plans?", a: "Yes — Klarna is available at checkout, allowing you to split your purchase into interest-free installments." },
    ],
  },
  {
    label: "After-Sales",
    icon: MessageCircle,
    items: [
      { q: "What if I need help after my purchase?", a: "Our support team responds within 24 hours. You're covered by a 30-Day Ritual Guarantee, easy returns, and lifetime access to ritual guides and tips." },
      { q: "What is the 30-Day Ritual Guarantee?", a: "If you don't feel visible improvement within 30 days of consistent daily use, contact us for a full refund. No lengthy process, no pressure." },
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
      toast.success("Request submitted. We'll respond within 24 to 48 hours.");
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
        <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsl(30 27% 95%) 0%, hsl(30 20% 92%) 40%, hsl(340 15% 93%) 70%, hsl(30 27% 95%) 100%)' }} />
          
          {/* Soft radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)' }}
          />

          {/* Floating rings */}
          <div className="absolute top-12 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border border-accent/10 pointer-events-none animate-[spin_40s_linear_infinite]" />
          <div className="absolute bottom-16 right-[8%] w-24 h-24 md:w-36 md:h-36 rounded-full border border-primary/8 pointer-events-none animate-[spin_55s_linear_infinite_reverse]" />
          <div className="absolute top-1/3 right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-muted-foreground/5 pointer-events-none animate-[spin_30s_linear_infinite]" />

          {/* Soft dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-accent/[0.07]"
              style={{
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase mb-6">
              Support & Care
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-5 tracking-[-0.02em] leading-[1.15]">
              We're Here<br />For Your Ritual.
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-md mx-auto leading-relaxed">
              Questions, returns, or guidance, our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* Quick Help Cards */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-7 text-center transition-all duration-300"
                style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <card.icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-foreground text-[15px] mb-2">{card.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12 tracking-[-0.02em]">Frequently Asked Questions</h2>
            {faqCategories.map((cat) => (
              <div key={cat.label} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <cat.icon size={16} className="text-primary" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{cat.label}</span>
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
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Our Promise</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-[-0.02em]">
              Feel The Shift, Or It's On Us.
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
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <t.icon size={18} className="text-primary" strokeWidth={1.5} />
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
            <h2 className="text-2xl font-semibold text-foreground text-center mb-8 tracking-[-0.02em]">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8" style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}>
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
              <p className="text-xs text-muted-foreground text-center">Response within 24 to 48 hours.</p>
            </form>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto rounded-2xl p-8" style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-primary" />
              <h3 className="font-medium text-foreground text-[15px]">Important Safety Guidelines</h3>
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
