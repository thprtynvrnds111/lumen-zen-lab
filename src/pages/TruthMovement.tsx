import { useState } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFoundingCustomer, createShopifyCart } from "@/lib/shopify";
import { trackMovementJoin, trackDepositIntent } from "@/lib/movement-tracking";

/**
 * Founding-member deposit variant.
 *
 * The conversion probe. Leave empty until the "Founding Circle Deposit" product
 * exists in Shopify, then paste its Storefront variant GID here, e.g.
 *   "gid://shopify/ProductVariant/1234567890".
 * While empty, the founding CTA gracefully falls back to the email waitlist so
 * nothing breaks. (Creating the product is a human step.)
 */
const FOUNDING_DEPOSIT_VARIANT_ID = "";

/**
 * Turquoise organic shape. Soft radial-gradient fill (no blur filter, on system).
 * Decorative only, sits behind content. Each needs a unique `id`.
 */
function Blob({
  id,
  className = "",
  opacity = 0.14,
}: {
  id: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 200 200"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2ED8A8" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#2ED8A8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2ED8A8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M44.5,-62.3C56.9,-53.2,65.5,-39.1,69.8,-23.8C74,-8.6,73.9,7.9,68.4,22.1C62.9,36.3,52,48.3,38.7,57.1C25.4,65.9,9.7,71.5,-6.2,71.9C-22,72.3,-38,67.5,-50.6,57.5C-63.2,47.4,-72.5,32.1,-75.3,15.6C-78.1,-0.9,-74.5,-18.6,-65.7,-32.7C-56.9,-46.8,-43,-57.3,-28.5,-65.3C-14,-73.3,1.1,-78.8,15.3,-75.6C29.6,-72.4,32.1,-71.5,44.5,-62.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

/** Owned email capture — Storefront customerCreate, marketing consent on. */
function JoinForm({
  source,
  cta = "Join the movement",
  placeholder = "Your email",
}: {
  source: string;
  cta?: string;
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setMessage(null);
    const addr = email.trim();
    try {
      const result = await createFoundingCustomer(addr);
      if (result.success || result.error === "already_exists") {
        setMessage({ type: "success", text: "You are in. Your reset is ready." });
        setEmail("");
        trackMovementJoin(addr, source);
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
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-border/60 rounded-full h-12 px-5"
          aria-label="Email address"
          required
        />
        <Button variant="ritual" size="lg" type="submit" disabled={submitting} className="shrink-0">
          {submitting ? "Sending" : cta}
        </Button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${message.type === "success" ? "text-[#2ED8A8]" : "text-[#B4472A]"}`}>
          {message.text}
        </p>
      )}
      {message?.type === "success" && (
        <a href="/reset" className="cta-pill mt-4">Open the 6-Minute Reset</a>
      )}
      <p className="mt-3 text-xs text-[#8A7F74]">
        One reset, one truth per week. No noise. Leave anytime.
      </p>
    </div>
  );
}

/** Section eyebrow — mono, tracked, teal index. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B5A4A] mb-6">
      {children}
    </p>
  );
}

const TruthMovement = () => {
  const [depositMsg, setDepositMsg] = useState<string | null>(null);
  const [depositLoading, setDepositLoading] = useState(false);

  const handleDeposit = async () => {
    trackDepositIntent();
    if (!FOUNDING_DEPOSIT_VARIANT_ID) {
      const el = document.getElementById("join");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setDepositMsg("Founding deposits open soon. Join below and you go first.");
      return;
    }
    setDepositLoading(true);
    setDepositMsg(null);
    try {
      const cart = await createShopifyCart(FOUNDING_DEPOSIT_VARIANT_ID, 1, [
        { key: "movement_source", value: "truth-movement" },
      ]);
      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      } else {
        setDepositMsg("Could not open checkout. Please try again.");
      }
    } catch {
      setDepositMsg("Could not open checkout. Please try again.");
    } finally {
      setDepositLoading(false);
    }
  };

  return (
    <PageShell
      title="The Movement · Reclaim your own frequency | Zential Pure"
      description="Modern life keeps your system switched on. Sports, stress, skin are downstream. Join the people taking the controls back, six minutes at a time."
      canonical="/movement"
      eyebrow="ZENTIAL PURE · THE MOVEMENT"
      displayTitle="Reclaim your own frequency."
      displaySubtitle="You were not built for a world that never lets your system power down. The cost shows up everywhere. Your sleep. Your training. Your stress. Your skin. This is the place where we take the controls back."
      stickyTag="Movement 01"
    >
      {/* 1 — DIAGNOSIS (the truth, product invisible) */}
      <section className="relative overflow-hidden section-padding">
        <Blob id="b-diag" className="w-[520px] h-[520px] -top-32 -right-24" opacity={0.16} />
        <div className="relative z-10 max-w-3xl">
          <Eyebrow>01 · Diagnosis</Eyebrow>
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.05] mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Notice your breath. Right now.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-[#1A1714]/80 leading-relaxed">
            <p>
              Most people reading this are holding their breath. Shallow. Frozen. A body braced
              against a screen that never stops asking for more.
            </p>
            <p>
              Modern life is an interference engine. It keeps your nervous system switched on when
              it was built to switch off. You feel it before you can name it. The shallow breath at
              the desk. The sleep that does not restore. The training that stops working. The face
              that looks tired after a full night.
            </p>
            <p className="text-[#1A1714] font-medium">
              This is not who you are. It is what the noise does to you.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — REFRAME (one nerve vs the whole system) */}
      <section className="relative overflow-hidden section-padding bg-white border-y border-border/60">
        <Blob id="b-ref" className="w-[460px] h-[460px] -bottom-40 -left-28" opacity={0.13} />
        <div className="relative z-10 max-w-5xl">
          <Eyebrow>02 · Reframe</Eyebrow>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <h3 className="font-[Lora] italic text-[#1A1714] leading-[1.1] mb-6" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                One nerve is a gadget. The whole system is a practice.
              </h3>
              <p className="text-base md:text-lg text-[#1A1714]/75 leading-relaxed">
                The market sells you a single nerve, a single fix, a single mode. Regulation does
                not work that way. The body is one connected system. Calm the signal, then feed the
                tissue. That is the whole point.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ["Sports", "Recovery is a nervous-system event before it is a muscle event."],
                ["Stress", "A system that never down-regulates never fully repairs."],
                ["Skin", "The face keeps the score. Tension and cortisol show up there first."],
              ].map(([k, v]) => (
                <div key={k} className="relative overflow-hidden bg-[#F7F4F0] rounded-[1.5rem] border border-[#2ED8A8]/30 p-6">
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#1A9E78] mb-2">{k}</p>
                  <p className="text-[#1A1714]/80 leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — SCIENCE (mechanism, trust, compliant) */}
      <section className="relative overflow-hidden section-padding">
        <Blob id="b-sci" className="w-[560px] h-[560px] top-10 -left-40" opacity={0.12} />
        <div className="relative z-10 max-w-3xl">
          <Eyebrow>03 · Science, made human</Eyebrow>
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.05] mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Mechanism over marketing.
          </h2>
          <div className="space-y-8">
            <div className="border-l-2 border-[#2ED8A8] pl-6">
              <p className="text-lg md:text-xl text-[#1A1714]/80 leading-relaxed">
                Cortisol tells the body to stop investing in long-term projects. Collagen synthesis
                is a long-term project. Under chronic load the system reads it as not now.
              </p>
            </div>
            <div className="border-l-2 border-[#2ED8A8] pl-6">
              <p className="text-lg md:text-xl text-[#1A1714]/80 leading-relaxed">
                Microcurrent works because your face already runs on electricity. It does not
                override the signal. It mirrors it. That is why it works with the body over time,
                not against it.
              </p>
            </div>
            <div className="border-l-2 border-[#2ED8A8] pl-6">
              <p className="text-lg md:text-xl text-[#1A1714]/80 leading-relaxed">
                Red light at 630 to 660 nanometres does not add anything to your cells. It supports
                a process they already know. The mitochondria respond. The renewal cycle that slowed
                starts moving again.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-[#8A7F74] leading-relaxed">
            We name mechanisms, not outcomes. This is education, not medical advice, and not a
            promise of any specific result.
          </p>
        </div>
      </section>

      {/* 4 — RITUAL (desire) */}
      <section className="relative overflow-hidden section-padding bg-white border-y border-border/60">
        <Blob id="b-rit" className="w-[440px] h-[440px] -top-32 right-0" opacity={0.13} />
        <div className="relative z-10 max-w-3xl">
          <Eyebrow>04 · Ritual</Eyebrow>
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.05] mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Six minutes, before the world asks anything of you.
          </h2>
          <p className="text-lg md:text-xl text-[#1A1714]/80 leading-relaxed mb-6">
            The most radical thing you can do right now is be unreachable for six minutes while you
            bring your own system back online. Before the emails. Before the noise. Six minutes that
            belong to no one but you.
          </p>
          <p className="text-lg md:text-xl text-[#1A1714] font-medium leading-relaxed">
            The ritual is the result.
          </p>
        </div>
      </section>

      {/* FREQUENCY BAND — the line, full bleed, emotional peak before the capture */}
      <section className="relative overflow-hidden bg-[#1A1714] px-6 py-28 md:py-44">
        <Blob id="b-freq1" className="w-[720px] h-[720px] -top-48 -right-40" opacity={0.26} />
        <Blob id="b-freq2" className="w-[520px] h-[520px] -bottom-44 -left-32" opacity={0.18} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#2ED8A8] mb-8">
            The line we live by
          </p>
          <h2 className="font-[Lora] italic text-[#F7F4F0] leading-[1.0]" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            The body remembers
            <br />
            its <span className="text-[#2ED8A8]">frequency.</span>
          </h2>
        </div>
      </section>

      {/* 5 — LEAD MAGNET / JOIN (the owned capture) */}
      <section id="join" className="relative overflow-hidden section-padding">
        <Blob id="b-join" className="w-[600px] h-[600px] -bottom-48 -right-40" opacity={0.14} />
        <div className="relative z-10 max-w-3xl bg-[#1A1714] text-[#F7F4F0] rounded-[1.5rem] p-8 md:p-14 overflow-hidden">
          <Blob id="b-join-in" className="w-[380px] h-[380px] -top-24 -right-20" opacity={0.3} />
          <div className="relative z-10">
            <Eyebrow>05 · Reset</Eyebrow>
            <h2 className="font-[Lora] italic leading-[1.05] mb-6 text-[#F7F4F0]" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
              Get the 6-Minute Reset.
            </h2>
            <p className="text-lg text-[#F7F4F0]/80 leading-relaxed mb-8 max-w-xl">
              A simple down-regulation practice you can run anywhere, plus one true finding each week
              on how your system actually works. This is the door into the movement.
            </p>
            <div className="[&_input]:bg-white [&_input]:text-[#1A1714]">
              <JoinForm source="movement-reset" cta="Send me the reset" />
            </div>
          </div>
        </div>
      </section>

      {/* 6 — FOUNDING CIRCLE (conversion probe) */}
      <section className="relative overflow-hidden section-padding bg-white border-y border-border/60">
        <Blob id="b-found" className="w-[480px] h-[480px] top-0 -left-32" opacity={0.13} />
        <div className="relative z-10 max-w-3xl">
          <Eyebrow>06 · Founding circle</Eyebrow>
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            First one hundred.
          </h2>
          <p className="text-lg md:text-xl text-[#1A1714]/80 leading-relaxed mb-8">
            The founding circle is for the people who want to build this with us from the start.
            Early access to the protocols, the guided cohorts, and the device that makes the ritual
            real. Not a discount. A place in the room.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              type="button"
              onClick={handleDeposit}
              disabled={depositLoading}
              className="cta-pill"
            >
              {depositLoading ? "Opening" : "Claim a founding place"}
            </button>
            <a href="#join" className="ghost-pill">Just send the reset first</a>
          </div>
          {depositMsg && <p className="mt-4 text-sm text-[#1A1714]/70">{depositMsg}</p>}
        </div>
      </section>

      {/* 7 — PERMISSION / CLOSE */}
      <section className="relative overflow-hidden section-padding">
        <Blob id="b-close" className="w-[560px] h-[560px] -top-40 left-1/2 -translate-x-1/2" opacity={0.12} />
        <div className="relative z-10 max-w-3xl text-center mx-auto">
          <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.1] mb-8" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            You are allowed to take your morning seriously.
          </h2>
          <p className="text-lg text-[#1A1714]/75 leading-relaxed mb-10 max-w-xl mx-auto">
            To build something that is only for you. We are the people taking the controls back, six
            minutes at a time. Truth over hype. Mechanism over marketing.
          </p>
          <div className="flex justify-center">
            <JoinForm source="movement-close" cta="Reclaim your frequency" />
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default TruthMovement;
