import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
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
    <section className="section-padding bg-secondary/30">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join The Frequency.</h2>
        <p className="text-muted-foreground mb-8">
          Get early access to drops, science insights, and ritual guides.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-card border-border/50 rounded-full h-12 px-5"
            required
          />
          <Button variant="ritual" size="lg" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Subscribe"}
          </Button>
        </form>
        {message && (
          <p className={`mt-3 text-sm ${message.type === "success" ? "text-green-700" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
}
