import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
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
  content: `We ship to most countries worldwide. Delivery times vary by destination: Netherlands (2–3 days), EU (3–7 days), International (7–30 days). Risk of loss transfers to you upon delivery. See our Shipping page for full details.`,
 },
 {
  title: "5. Returns & Refunds",
  content: `We offer a 30-day money-back guarantee on all devices, counted from the day of delivery. To initiate a return, contact support within 30 days of delivery — any reason. Opening the box and using the device does not void the guarantee. EU orders: we provide a prepaid return label. US orders: we refund without requiring a return. Opened consumables (gels, pads) are non-returnable for hygiene reasons. Refunds are processed within 5–7 business days.`,
 },
 {
  title: "6. Warranty & Liability",
  content: `Our devices come with a 1-year manufacturer warranty covering defects in materials and workmanship. This warranty does not cover damage from misuse, unauthorized modifications, or normal wear. Our liability is limited to the purchase price of the product.`,
 },
 {
  title: "7. Intellectual Property",
  content: `All content on this website, including text, images, logos, and product designs, is the property of Zential Pure and protected by applicable copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.`,
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
 <div className="min-h-screen bg-white text-[#141414]">
  <SEO title="Terms of Service, Zential Pure" description="Zential Pure terms and conditions covering purchases, use of our devices, intellectual property, and customer rights." canonicalUrl="/terms" />
  <AnnouncementBar />
  <Header />
  <main>
   <section className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12">
    <div className="mx-auto max-w-[720px]">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">Legal</p>
     <h1 className="mt-5 font-sans font-light text-[clamp(34px,4.6vw,56px)] leading-[1.04] tracking-[-0.03em] text-[#141414]">Terms of Service</h1>
     <p className="mt-4 text-[14px] text-[#8E8E8E]">Last updated: February 2026</p>
    </div>
   </section>

   <section className="px-6 md:px-12 lg:px-20 pb-24">
    <div className="mx-auto max-w-[720px]">
     <p className="max-w-[65ch] border-t border-[rgba(20,20,20,0.10)] pt-8 text-[16px] leading-[1.75] text-[#5A5A5A]">
      Please read these Terms of Service carefully before using our website or purchasing our products. By accessing or using Zential Pure, you agree to be bound by these terms.
     </p>
     <div className="mt-10 border-t border-[rgba(20,20,20,0.10)]">
      {sections.map((s) => (
       <div key={s.title} className="border-b border-[rgba(20,20,20,0.10)] py-8">
        <h2 className="font-sans font-light text-[22px] tracking-[-0.02em] text-[#141414]">{s.title}</h2>
        <p className="mt-3 max-w-[65ch] text-[16px] leading-[1.75] text-[#5A5A5A]">{s.content}</p>
       </div>
      ))}
     </div>
    </div>
   </section>
  </main>
  <SparseFooter />
 </div>
);

export default TermsOfService;
