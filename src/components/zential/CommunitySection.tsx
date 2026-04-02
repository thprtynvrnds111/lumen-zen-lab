import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BubbleBackground } from "@/components/zential/BubbleBackground";

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
      const res = await fetch("/api/founding-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "You're on the list. We'll be in touch." });
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
    <section ref={ref} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F7F4F0' }}>
      <BubbleBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-14 text-center">
          Built with our first customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="rounded-xl p-7 transition-all duration-500 hover:shadow-lg" style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}>
            <p className="font-serif text-lg font-bold text-foreground mb-2">Response within 24 hours</p>
            <a href="mailto:info@zentialpure.com" className="text-sm font-medium hover:underline" style={{ color: '#9B5A2E' }}>
              info@zentialpure.com
            </a>
          </div>
          <div className="rounded-xl p-7 transition-all duration-500 hover:shadow-lg" style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}>
            <p className="font-serif text-lg font-bold text-foreground mb-2">Founding Customer Program</p>
            <p className="text-sm text-foreground/70 leading-relaxed mb-5">
              We're giving 15 devices to real people for 30 days. No script. No requirement to say it works. Apply below.
            </p>
            <form onSubmit={handleApply} className="flex flex-col min-[400px]:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-full border bg-white/80 outline-none focus:ring-1"
                style={{ borderColor: '#D8D3CC' }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 text-sm font-medium text-white rounded-full transition-all duration-300 hover:shadow-md hover:scale-105 whitespace-nowrap disabled:opacity-60"
                style={{ backgroundColor: '#C6A07C' }}
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
