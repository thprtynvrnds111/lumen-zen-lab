import { useEffect, useRef, useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Package, Truck, Globe, ShieldCheck, Clock, MapPin, Plane, CheckCircle2, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const journeySteps = [
  {
    icon: CheckCircle2,
    title: "Order Confirmed",
    desc: "Your ritual begins. We verify your order and prepare it for fulfillment within hours.",
    time: "Instant",
  },
  {
    icon: Package,
    title: "Carefully Packed",
    desc: "Each device is inspected, wrapped in protective packaging, and sealed with care in our European warehouse.",
    time: "1 day",
  },
  {
    icon: Plane,
    title: "In Transit",
    desc: "Your parcel is handed to our trusted logistics partner. Real time tracking is sent to your inbox.",
    time: "2–7 days",
  },
  {
    icon: Truck,
    title: "Out for Delivery",
    desc: "Your package is on its way to your door. Our carriers deliver 6 days a week across Europe.",
    time: "1–2 days",
  },
  {
    icon: MapPin,
    title: "Delivered",
    desc: "Your ritual arrives. Unbox, explore, and begin your first 5 minute session today.",
    time: "Done",
  },
];

const shippingZones = [
  { region: "Netherlands", time: "2–3 business days", cost: "Free over €50", flag: "🇳🇱" },
  { region: "Germany & Belgium", time: "3–5 business days", cost: "Free over €75", flag: "🇩🇪 🇧🇪" },
  { region: "Rest of EU", time: "3–7 business days", cost: "Free over €75", flag: "🇪🇺" },
  { region: "United Kingdom", time: "5–8 business days", cost: "Free over €90", flag: "🇬🇧" },
  { region: "United States & Canada", time: "7–14 business days", cost: "Free over €95", flag: "🇺🇸 🇨🇦" },
];

const trustPoints = [
  { icon: ShieldCheck, title: "Insured Shipments", desc: "Every parcel is fully insured against damage or loss during transit." },
  { icon: Clock, title: "Same Day Processing", desc: "Orders placed before 2 PM CET ship the same business day." },
  { icon: Globe, title: "Global Reach", desc: "We deliver to 50+ countries with reliable international carriers." },
  { icon: Package, title: "Eco Packaging", desc: "Recyclable materials and minimal waste, because rituals should be mindful." },
];

function AnimatedStep({ step, index, total }: { step: typeof journeySteps[0]; index: number; total: number }) {
  const { ref, inView } = useInView(0.2);
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex gap-6 md:gap-10 relative">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-11 h-11 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center transition-all duration-700 ${inView ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <step.icon size={18} className="text-accent" strokeWidth={1.5} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[48px] bg-accent/20 my-2" />
        )}
      </div>

      <div
        className={`pb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
        style={{ transitionDelay: `${index * 120 + 80}ms` }}
      >
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="font-medium text-foreground text-[15px] tracking-[-0.01em]">{step.title}</h3>
          <span className="text-[10px] tracking-[0.15em] uppercase text-accent/70 bg-accent/8 px-2.5 py-0.5 rounded-full">{step.time}</span>
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
      </div>
    </div>
  );
}

const Shipping = () => {
  const heroRef = useInView(0.1);
  const zonesRef = useInView(0.15);
  const trustRef = useInView(0.15);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Shipping & Delivery — Zential Pure" description="Free EU shipping on orders over €75. Netherlands 2–3 days, EU 3–7 days. Track your Zential Pure device from dispatch to door." canonicalUrl="/shipping" />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section
          ref={heroRef.ref}
          className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 text-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

          <div className={`relative z-10 transition-all duration-1000 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase mb-6">
              Shipping & Delivery
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-5 tracking-[-0.02em] leading-[1.15]">
              From Our Hands,<br />
              To Your Ritual.
            </h1>
            <p className="text-muted-foreground text-[15px] max-w-md mx-auto leading-relaxed">
              Every order is carefully packed, quickly shipped, and fully tracked, so your ritual starts without delay.
            </p>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="px-6 md:px-12 lg:px-20 pb-28">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Your Order Journey</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-[-0.02em]">Every Step, Tracked.</h2>
            </div>
            <div>
              {journeySteps.map((step, i) => (
                <AnimatedStep key={step.title} step={step} index={i} total={journeySteps.length} />
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Zones */}
        <section ref={zonesRef.ref} className="section-padding" style={{ background: '#F8F6F4' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Delivery Zones</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-[-0.02em]">Where We Ship.</h2>
            </div>
            <div className="divide-y" style={{ borderColor: '#E8E6E3' }}>
              {shippingZones.map((zone, i) => (
                <div
                  key={zone.region}
                  className={`py-5 md:py-6 flex items-center justify-between gap-4 transition-all duration-600 ${zonesRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg w-8 text-center">{zone.flag}</span>
                    <div>
                      <h3 className="font-medium text-foreground text-[14px]">{zone.region}</h3>
                      <p className="text-[13px] text-muted-foreground">{zone.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-medium text-muted-foreground">{zone.cost}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground/70 text-center mt-8">
              International orders may be subject to customs duties and import taxes.
            </p>
          </div>
        </section>

        {/* Trust Grid */}
        <section ref={trustRef.ref} className="section-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">Our Promise</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-[-0.02em]">Built for Peace of Mind.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {trustPoints.map((point, i) => (
                <div
                  key={point.title}
                  className={`rounded-2xl p-8 transition-all duration-500 ${trustRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{
                    transitionDelay: `${i * 120}ms`,
                    background: '#F8F6F4',
                    border: '1px solid #E8E6E3',
                  }}
                >
                  <div className="w-10 h-10 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center mb-5">
                    <point.icon size={17} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-medium text-foreground text-[15px] mb-2">{point.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding pb-28">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="rounded-2xl p-10 md:p-14 relative overflow-hidden"
              style={{ background: '#F8F6F4', border: '1px solid #E8E6E3' }}
            >
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-[-0.01em]">Questions about your order?</h2>
                <p className="text-muted-foreground text-[14px] mb-7">Our support team responds within 24 hours.</p>
                <a
                  href="/support"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Support <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Shipping;
