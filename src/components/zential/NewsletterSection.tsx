import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFoundingCustomer } from "@/lib/shopify";
import { ZenMascot } from "@/components/zential/ZenMascot";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await createFoundingCustomer(email.trim());
      if (result.success || result.error === "already_exists") {
        setMessage({ type: "success", text: "Welcome to the frequency." });
        setEmail("");
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-white border-t border-[rgba(20,20,20,0.10)]">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-4xl text-[#141414] mb-4">Join The Frequency.</h2>
        <p className="text-[#5A5A5A] mb-8">
          Get early access to drops, science insights, and ritual guides.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-white border-[rgba(20,20,20,0.16)] rounded-full h-12 px-5 text-[#141414] placeholder:text-[#8E8E8E] focus-visible:border-[#0E7A54]"
            required
          />
          <Button size="lg" type="submit" disabled={submitting} className="rounded-full bg-[#2ED8A8] px-7 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] hover:bg-[#1BAF86]">
            {submitting ? "Sending…" : "Subscribe"}
          </Button>
        </form>
        {message && (
          message.type === "success" ? (
            <div className="mt-4 flex items-center justify-center gap-3">
              <ZenMascot expression="delighted" size={44} animated={false} />
              <p className="text-sm text-[#0E7A54]">{message.text}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-red-600">{message.text}</p>
          )
        )}
      </div>
    </section>
  );
}
