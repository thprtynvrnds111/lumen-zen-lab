import { useState } from "react";
import { toast } from "sonner";

export function CommunitySection() {
  const [email, setEmail] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Application received. We'll be in touch.");
    setEmail("");
  };

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-14 text-center">
          Built with our first customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Support */}
          <div className="rounded-lg p-7" style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}>
            <p className="font-serif text-lg font-bold text-foreground mb-2">Response within 24 hours</p>
            <a
              href="mailto:hello@zentialpure.com"
              className="text-sm font-medium hover:underline"
              style={{ color: '#9B5A2E' }}
            >
              hello@zentialpure.com
            </a>
          </div>

          {/* Founding program */}
          <div className="rounded-lg p-7" style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}>
            <p className="font-serif text-lg font-bold text-foreground mb-2">Founding Customer Program</p>
            <p className="text-sm text-foreground/70 leading-relaxed mb-5">
              We're giving 15 devices to real people for 30 days. No script. No requirement to say it works. Apply below.
            </p>
            <form onSubmit={handleApply} className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-md border bg-white/80 outline-none focus:ring-1"
                style={{ borderColor: '#D8D3CC', focusRingColor: '#C6A07C' } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium text-white rounded-md transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C6A07C' }}
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
