import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
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
 <div className="min-h-screen bg-white text-[#141414]">
  <SEO title="Privacy Policy, Zential Pure" description="How Zential Pure collects, uses, and protects your personal data. We take your privacy as seriously as your ritual." canonicalUrl="/privacy" />
  <AnnouncementBar />
  <Header />
  <main>
   <section className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12">
    <div className="mx-auto max-w-[720px]">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">Legal</p>
     <h1 className="mt-5 font-sans font-light text-[clamp(34px,4.6vw,56px)] leading-[1.04] tracking-[-0.03em] text-[#141414]">Privacy Policy</h1>
     <p className="mt-4 text-[14px] text-[#8E8E8E]">Last updated: February 2026</p>
    </div>
   </section>

   <section className="px-6 md:px-12 lg:px-20 pb-24">
    <div className="mx-auto max-w-[720px]">
     <p className="max-w-[65ch] border-t border-[rgba(20,20,20,0.10)] pt-8 text-[16px] leading-[1.75] text-[#5A5A5A]">
      Zential Pure ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
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

export default PrivacyPolicy;
