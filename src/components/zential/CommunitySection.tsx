import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";
import { createFoundingCustomer } from "@/lib/shopify";

export function CommunitySection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const ref = useScrollReveal<HTMLElement>();

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const result = await createFoundingCustomer(email.trim());
      if (result.success) {
        setMessage({ type: "success", text: "You're on the list. We'll be in touch." });
        setEmail("");
      } else if (result.error === "already_exists") {
        setMessage({ type: "success", text: "You're already on our list. We'll be in touch soon." });
        setEmail("");
      } else {
        setMessage({ type: "error", text: "Something went wrong. Try again or email info@zentialpure.com" });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again or email info@zentialpure.com" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0C1118' }}>
      <BubbleBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-14 text-center">
          Built with our first customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="rounded-xl p-7 transition-all duration-500 hover:shadow-lg" style={{ backgroundColor: '#111820', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-serif text-lg font-bold mb-2" style={{ color: '#EAE7E0' }}>Response within 24–48 hours</p>
            <a href="mailto:info@zentialpure.com" className="text-sm font-medium hover:underline" style={{ color: '#E87040' }}>
              info@zentialpure.com
            </a>
          </div>
          <div className="rounded-xl p-7 transition-all duration-500 hover:shadow-lg" style={{ backgroundColor: '#111820', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-serif text-lg font-bold mb-2" style={{ color: '#EAE7E0' }}>Founding Customer Program</p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(234,231,224,0.7)' }}>
              We're giving 15 devices to real people for 30 days. No script. No requirement to say it works. Apply below.
            </p>
            <form onSubmit={handleApply} className="flex flex-col min-[400px]:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-full outline-none focus:ring-1"
                style={{ backgroundColor: '#0C1118', border: '1px solid rgba(255,255,255,0.15)', color: '#EAE7E0' }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:shadow-md hover:scale-105 whitespace-nowrap disabled:opacity-60"
                style={{ backgroundColor: '#E87040' }}
              >
                {submitting ? 'Applying…' : 'Apply'}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-sm ${message.type === "success" ? "text-green-700" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
