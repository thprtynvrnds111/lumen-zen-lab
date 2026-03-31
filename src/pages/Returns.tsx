import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { RotateCcw, ShieldCheck, Clock, CheckCircle2, ArrowRight, Package, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: Package, title: "Request a Return", desc: "Email us at info@zentialpure.com within 30 days of delivery with your order number.", color: "bg-primary/15 text-primary", accent: "border-primary/30" },
  { icon: CheckCircle2, title: "Get Approved", desc: "We'll review and approve your request within 24 hours, no lengthy questionnaires.", color: "bg-primary/15 text-primary", accent: "border-primary/30" },
  { icon: RotateCcw, title: "Ship It Back", desc: "We'll provide a prepaid return label. Pack the device in its original packaging.", color: "bg-primary/15 text-primary", accent: "border-primary/30" },
  { icon: ShieldCheck, title: "Get Refunded", desc: "Once received and inspected, your refund is processed within 5 to 7 business days.", color: "bg-primary/15 text-primary", accent: "border-primary/30" },
];

const policies = [
  { title: "30-Day Ritual Guarantee", desc: "If you don't feel visible improvement within 30 days of consistent daily use, contact us for a full refund. We believe in the technology, and we believe in your experience." },
  { title: "Condition Requirements", desc: "Devices must be returned in their original packaging and in working condition. Accessories (gels, pads) are non-returnable once opened for hygiene reasons." },
  { title: "Damaged or Defective Items", desc: "If your product arrives damaged or defective, contact us immediately. We'll send a replacement at no cost, no return needed." },
  { title: "Exchanges", desc: "Want a different color or variant? Contact us within 14 days and we'll arrange an exchange, subject to availability." },
];

const Returns = () => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar />
    <Header />
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
        <div className="relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
            <RotateCcw size={14} />
            Returns & Guarantee
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight">
            No Friction.<br />
            <span className="text-foreground">No Pressure.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            We stand behind every device with our 30-Day Ritual Guarantee. If it doesn't work for you, it's on us.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">How It Works</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">Simple. Honest. Fast.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="glass-card p-7 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center mb-4 border ${s.accent}`}>
                  <s.icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="section-padding gradient-pearl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Policy Details</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">What You Should Know.</h2>
          </div>
          <div className="space-y-5">
            {policies.map((p) => (
              <div key={p.title} className="glass-card p-7">
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Need to start a return?</h2>
              <p className="text-muted-foreground mb-6">Our team will guide you through the process.</p>
              <Link to="/support" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                Contact Support <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <ZentialFooter />
  </div>
);

export default Returns;
