import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the frequency.", { position: "top-center" });
      setEmail("");
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
          <Button variant="ritual" size="lg" type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
