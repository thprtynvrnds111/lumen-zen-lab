import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { FileText } from "lucide-react";
import { SEO } from "@/components/SEO";

const sections = [
  {
    title: "1. General",
    content: `These Terms of Service govern your use of the Zential Pure website and the purchase of products from our online store. By placing an order, you agree to these terms. We reserve the right to update these terms at any time. Changes take effect upon publication on this page.`,
  },
  {
    title: "2. Products & Pricing",
    content: `All product descriptions and images are as accurate as possible. Prices are listed in EUR and include VAT where applicable. We reserve the right to adjust prices without prior notice. Promotional pricing is valid only during the stated period.`,
  },
  {
    title: "3. Orders & Payment",
    content: `An order is confirmed once you receive a confirmation email. Payment is processed securely through Shopify Payments. We accept Visa, Mastercard, American Express, iDEAL, Bancontact, Klarna, Apple Pay, and Google Pay. Orders may be cancelled before shipment by contacting support.`,
  },
  {
    title: "4. Shipping & Delivery",
    content: `We ship to most countries worldwide. Delivery times vary by destination: Netherlands (2–3 days), EU (3–7 days), International (7–14 days). Risk of loss transfers to you upon delivery. See our Shipping page for full details.`,
  },
  {
    title: "5. Returns & Refunds",
    content: `We offer a 30-Day Ritual Guarantee on all devices. To initiate a return, contact support within 30 days of delivery. Devices must be returned in original packaging. Opened consumables (gels, pads) are non-returnable for hygiene reasons. Refunds are processed within 5–7 business days after receipt.`,
  },
  {
    title: "6. Warranty & Liability",
    content: `Our devices come with a 1-year manufacturer warranty covering defects in materials and workmanship. This warranty does not cover damage from misuse, unauthorized modifications, or normal wear. Our liability is limited to the purchase price of the product.`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on this website — including text, images, logos, and product designs — is the property of Zential Pure and protected by applicable copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.`,
  },
  {
    title: "8. Governing Law",
    content: `These terms are governed by the laws of the Netherlands. Any disputes shall be resolved in the competent courts of the Netherlands. For EU consumers: you have the right to submit complaints to your local consumer dispute resolution body.`,
  },
  {
    title: "9. Contact",
    content: `For questions about these terms, contact us at legal@zentialpure.com or through our Support page.`,
  },
];

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <SEO title="Terms of Service — Zential Pure" description="Zential Pure terms and conditions covering purchases, use of our devices, intellectual property, and customer rights." canonicalUrl="/terms" />
    <AnnouncementBar />
    <Header />
    <main>
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
            <FileText size={14} />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground max-w-md mx-auto">Last updated: February 2026</p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-7 text-sm text-muted-foreground leading-relaxed">
            Please read these Terms of Service carefully before using our website or purchasing our products. By accessing or using Zential Pure, you agree to be bound by these terms.
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

export default TermsOfService;
