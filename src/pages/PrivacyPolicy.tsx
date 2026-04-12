import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { ShieldCheck } from "lucide-react";
import { SEO } from "@/components/SEO";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly when placing an order, creating an account, or contacting support. This includes your name, email address, shipping address, and payment information. We also collect usage data such as pages visited, device type, and browser information through standard analytics tools.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to process and fulfill orders, communicate about your purchases, improve our products and services, send marketing communications (with your consent), and ensure security. We never sell your personal data to third parties.`,
  },
  {
    title: "3. Data Sharing",
    content: `We share your data only with trusted service providers necessary to operate our business: payment processors (Shopify Payments), shipping carriers, and analytics services. All partners are contractually bound to protect your information.`,
  },
  {
    title: "4. Cookies & Tracking",
    content: `We use essential cookies for site functionality and optional analytics cookies to understand how visitors use our site. You can manage cookie preferences through your browser settings. We use no third-party advertising trackers.`,
  },
  {
    title: "5. Your Rights (GDPR)",
    content: `Under the General Data Protection Regulation, you have the right to access, correct, delete, or export your personal data. You may also object to processing or withdraw consent at any time. To exercise these rights, contact us at privacy@zentialpure.com.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Order data is retained for 7 years for tax and legal compliance. You may request deletion at any time.`,
  },
  {
    title: "7. Security",
    content: `We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits. While no method of transmission is 100% secure, we take all reasonable steps to protect your data.`,
  },
  {
    title: "8. Contact",
    content: `For privacy-related inquiries, contact us at privacy@zentialpure.com. We will respond within 30 days. Our data processing is governed by the laws of the Netherlands and the European Union.`,
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <SEO title="Privacy Policy — Zential Pure" description="How Zential Pure collects, uses, and protects your personal data. We take your privacy as seriously as your ritual." canonicalUrl="/privacy" />
    <AnnouncementBar />
    <Header />
    <main>
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
            <ShieldCheck size={14} />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-md mx-auto">Last updated: February 2026</p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-7 text-sm text-muted-foreground leading-relaxed">
            Zential Pure ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
          </div>
          {sections.map((s, i) => (
            <div key={s.title} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <h2 className="text-lg font-semibold text-foreground mb-3">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    <ZentialFooter />
  </div>
);

export default PrivacyPolicy;
