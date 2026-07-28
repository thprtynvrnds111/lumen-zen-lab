import { FormEvent, useState } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";

/**
 * /wrap — Restoration Wrap waitlist test (Gate 1, zero inventory).
 *
 * PROPOSED PRODUCT. Not in the catalog, not in Shopify, no supplier, no price,
 * no ship date. This page exists to measure demand against pre-registered kill
 * criteria before anything is built. Copy is the compliance-gated draft from
 * the engine repo (task T-20260727-008, re-gate PASS 2026-07-28); the target
 * price figure and threshold paragraph were resolved in-session and re-gated.
 *
 * The waitlist posts to /api/newsletter with source "wrap-waitlist", which the
 * endpoint treats as a waitlist — NOT a newsletter signup: distinct Shopify tag,
 * distinct Klaviyo metric, no marketing consent, no welcome flow. The page
 * promises a maximum of two emails; the code path must keep that promise.
 */

const WAITLIST_SOURCE = "wrap-waitlist";

function WaitlistForm({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: WAITLIST_SOURCE }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="border border-[#2ED8A8]/40 bg-[#2ED8A8]/10 p-6 max-w-md">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#1A1714] mb-2">
          You are on the list
        </p>
        <p className="text-sm text-[#1A1714]/80 leading-relaxed">
          We email you once at the build decision — yes or no — and once at ship
          if we build it. Nothing else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex flex-col sm:flex-row gap-4 ${compact ? "" : "max-w-md"}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address for the Restoration Wrap waitlist"
        className="flex-1 bg-white border border-[#6B5A4A]/40 px-4 py-3 text-sm text-[#1A1714] placeholder:text-[#6B5A4A]/60 focus:border-[#1A1714] focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="bg-[#1A1714] text-[#F7F4F0] px-8 py-3 font-mono text-xs tracking-[0.22em] uppercase hover:bg-[#1A1714]/85 transition-colors disabled:bg-[#6B5A4A]"
      >
        {state === "sending" ? "Joining…" : "Join the waitlist"}
      </button>
      {state === "error" && (
        <p className="text-xs text-[#E87040] sm:self-center">
          That didn't go through. Try again in a moment.
        </p>
      )}
    </form>
  );
}

const Wrap = () => {
  return (
    <PageShell
      title="The Restoration Wrap — Proposed, Not Built | Zential Pure"
      description="A whole-body heat wrap for recovery. Proposed product — no inventory, no checkout, no ship date. Join the waitlist if you want it to exist."
      canonical="/wrap"
      hideHero
    >
      {/* Proposed-product notice — the file header of the gated draft, rendered honestly */}
      <section className="px-6 md:px-12 lg:px-20 pt-10">
        <div className="max-w-3xl mx-auto border border-[#6B5A4A]/40 bg-[#F7F4F0] p-6">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B5A4A] leading-relaxed">
            Proposed product — not in the catalog. Waitlist test only.
            <br />
            No inventory. No checkout. No ship date. Join the list if you want it to exist.
          </p>
        </div>
      </section>

      {/* HERO */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-8">
            The Restoration Wrap
          </p>
          <h1
            className="font-[Lora] italic leading-[1.02] text-[#1A1714]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            A whole-body heat wrap. Proposed. Not built yet.
          </h1>
          <p className="mt-8 text-lg text-[#1A1714]/80 leading-relaxed max-w-2xl">
            We are considering building a single instrument that delivers sustained,
            even heat across the full body — for muscle recovery after the kind of
            training, and the kind of week, that leaves you sore everywhere rather
            than in one place.
          </p>
          <p className="mt-4 text-lg text-[#1A1714]/80 leading-relaxed">It does not exist yet.</p>
          <p className="mt-4 text-lg text-[#1A1714]/80 leading-relaxed">
            We will build it if enough of you join the waitlist below.
          </p>
          <p className="mt-8 text-base text-[#1A1714]">
            <span className="font-semibold">Target price: $299 / €279</span>{" "}
            <span className="text-[#1A1714]/60">(target — final price confirmed at build decision)</span>
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-sm text-[#6B5A4A]">
            No payment. No commitment. We email you once if we build it, and once if we don't.
          </p>
        </div>
      </section>

      {/* MECHANISM */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-[#6B5A4A]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A]">
            What it does, mechanistically
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            Heat applied to muscle tissue causes blood vessels in that tissue to dilate.
            Blood flow increases. Metabolic byproducts of muscle work — prostaglandins,
            lactate, hydrogen ions — are cleared faster through that increased flow. The
            result is reduced perceived soreness and faster return to baseline.
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            This is not a metaphor. It is vascular physiology, and it is the mechanism
            the Restoration Wrap is designed around.
          </p>
          <h2 className="font-[Lora] italic text-2xl text-[#1A1714] pt-4">
            Three design choices that follow from the mechanism
          </h2>
          <div className="space-y-6">
            <div className="border-l-2 border-[#1A1714]/20 pl-6">
              <p className="font-semibold text-[#1A1714] mb-2">1. Whole-body, not local.</p>
              <p className="text-[#1A1714]/80 leading-relaxed">
                A heating pad treats the area under the pad. A whole-body wrap delivers
                uniform thermal load — relevant when soreness is systemic (after a hard
                block, a long flight, a bad sleep cycle) rather than localized.
              </p>
            </div>
            <div className="border-l-2 border-[#1A1714]/20 pl-6">
              <p className="font-semibold text-[#1A1714] mb-2">2. Sustained, not pulsed.</p>
              <p className="text-[#1A1714]/80 leading-relaxed">
                The recovery benefit in the literature comes from sustained heat over
                30–90 minutes, not short bursts. The wrap is designed for that duration class.
              </p>
            </div>
            <div className="border-l-2 border-[#1A1714]/20 pl-6">
              <p className="font-semibold text-[#1A1714] mb-2">3. Conductive, not convective.</p>
              <p className="text-[#1A1714]/80 leading-relaxed">
                Sauna heats air; you sit in it. A wrap delivers conductive heat directly
                to tissue at lower temperatures and longer durations — without the
                dehydration load of hot-air exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HONEST EVIDENCE BLOCK */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-[#6B5A4A]/20 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A]">
            What the evidence supports
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            The strongest single piece of evidence for external heat as a recovery tool is
            a 2022 network meta-analysis in the <em>Journal of Rehabilitation Medicine</em> —
            Wang et al., <strong>59 randomised controlled trials, 1,367 patients</strong>, ten
            interventions compared. A hot pack ranked <strong>first of the ten</strong> for
            pain relief within 24 hours of exercise-induced muscle soreness.
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            Read it yourself:{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8862647/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[#1A1714]"
            >
              pmc.ncbi.nlm.nih.gov/articles/PMC8862647
            </a>
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            Three things about that finding we are not going to bury underneath it:
          </p>
          <ul className="space-y-4 text-[#1A1714]/80 leading-relaxed list-none">
            <li className="border-l-2 border-[#1A1714]/20 pl-6">
              <strong>Its own authors ask you to read it with caution.</strong> Their words:
              the results should be "treated with caution" because of limited study quality,
              and "further well-designed research is needed to draw firm conclusions."
              Quoting the ranking and dropping that sentence is the oldest trick in this category.
            </li>
            <li className="border-l-2 border-[#1A1714]/20 pl-6">
              <strong>What ranked first was a hot pack — local, conductive heat.</strong> Not
              a whole-body wrap. No trial in that analysis tested the instrument described on
              this page, because the instrument does not exist yet. The mechanism is shared;
              the device class is not the same one that was studied. We are not going to imply
              the ranking transfers intact to a product nobody has built.
            </li>
            <li className="border-l-2 border-[#1A1714]/20 pl-6">
              <strong>The domain is exercise-induced muscle soreness.</strong> That is what
              was measured. Not sleep, not stress, not recovery in the general sense.
            </li>
          </ul>
          <p className="text-[#1A1714]/80 leading-relaxed">
            So the honest position is narrower than a marketing page would like: the mechanism
            this product is designed around is the best-supported one in the recovery
            literature, and the specific evidence still sits one device class away from the
            thing we are proposing to build. If we build it, that gap closes only by testing
            our own instrument — not by citing this paper harder.
          </p>

          <h2 className="font-[Lora] italic text-2xl text-[#1A1714] pt-4">
            What the evidence does NOT support
          </h2>
          <p className="text-[#1A1714]/80 leading-relaxed">
            We are not going to claim things the evidence does not support:
          </p>
          <ul className="space-y-4 text-[#1A1714]/80 leading-relaxed list-none">
            <li className="border-l-2 border-[#E87040]/40 pl-6">
              <strong>This is not a "detox" product.</strong> The body clears metabolic waste
              through the liver and kidneys. Heat supports muscle recovery through vascular
              mechanisms. We will not use the word "detox" on this page or on the product.
            </li>
            <li className="border-l-2 border-[#E87040]/40 pl-6">
              <strong>This is not equivalent to a sauna.</strong> Saunas deliver convective
              heat (hot air) at high temperatures for short durations, with significant sweat
              and dehydration load. The Restoration Wrap delivers conductive heat at lower
              temperatures for longer durations, with no dehydration load. Different mechanism,
              different use case.
            </li>
            <li className="border-l-2 border-[#E87040]/40 pl-6">
              <strong>This is not a medical device.</strong> It is a recovery tool. It does
              not treat injury, illness, or any medical condition.
            </li>
          </ul>
          <p className="text-[#1A1714]/80 leading-relaxed">
            We say this because you have probably been burned by wellness products that made
            claims they couldn't back. We would rather lose the sale than make those claims.
          </p>
        </div>
      </section>

      {/* RITUAL */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-[#6B5A4A]/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A]">
            How it would fit into a week
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            The Restoration Wrap is designed for one specific use pattern:{" "}
            <strong>
              a 45–60 minute session, 1–3 times per week, after the hardest training day or
              on the worst sleep night of the week.
            </strong>
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            It is not a daily tool. It is a targeted recovery instrument.
          </p>
          <div className="bg-[#F7F4F0] border border-[#6B5A4A]/20 p-8">
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-4">
              A typical session
            </p>
            <ul className="space-y-2 text-[#1A1714]/80 leading-relaxed">
              <li>— Set temperature to comfortable sustained warmth (not hot)</li>
              <li>— Lie down, read, breathe, or rest — not a workout</li>
              <li>— 45–60 minutes</li>
              <li>— Hydrate normally afterward (no special protocol needed)</li>
            </ul>
          </div>
          <p className="text-[#1A1714]/80 leading-relaxed">
            This is a ritual, not a protocol. The point is the rest, not the heat per se.
          </p>
          <p className="text-[#1A1714]/80 leading-relaxed">
            We are not going to tell you how the session will make you feel, or how you will
            sleep afterward. We have no data on either, and this instrument has never been
            built, so anyone who does tell you is guessing.
          </p>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-[#6B5A4A]/20 bg-[#1A1714]">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-[Lora] italic text-3xl text-[#F7F4F0]">
            Join the list — we build it if enough of you want it
          </h2>
          <p className="text-[#F7F4F0]/80 leading-relaxed">
            The Restoration Wrap is a proposed instrument. We will commit to building it if
            enough of you join. The exact bar depends on one number we do not have yet — the
            cost of the independent safety certification we require before any unit ships.
            When we have that quote, we will publish the bar and the arithmetic behind it.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#F7F4F0]/60 mb-4">
                What you get by joining
              </p>
              <ul className="space-y-2 text-[#F7F4F0]/80 text-sm leading-relaxed">
                <li>— An email when we make the build decision (yes or no)</li>
                <li>— First access to order if we build it, at the target price</li>
                <li>— A full refund window if the final product does not match this page</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#F7F4F0]/60 mb-4">
                What you do NOT get
              </p>
              <ul className="space-y-2 text-[#F7F4F0]/80 text-sm leading-relaxed">
                <li>— A charge today</li>
                <li>— A ship date promise</li>
                <li>— A "limited time" pressure tactic</li>
              </ul>
            </div>
          </div>
          <div className="[&_input]:bg-[#F7F4F0] [&_input]:border-[#F7F4F0]/30">
            <WaitlistForm />
          </div>
          <p className="text-sm text-[#F7F4F0]/60 leading-relaxed">
            <strong className="text-[#F7F4F0]/80">We will not email you more than twice</strong> —
            once at the build decision, once at ship (if we build). No newsletter. No upsell
            sequence. You can unsubscribe by replying to any email we send.
          </p>
        </div>
      </section>

      {/* FOOTER — questions + refusals */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-[#6B5A4A]/20">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-4">
              Questions
            </p>
            <p className="text-[#1A1714]/80 leading-relaxed">
              If you have a question about the mechanism, the evidence, or the build decision,
              reply to any email we send. A human reads them.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-4">
              Refusals, restated
            </p>
            <ul className="space-y-2 text-[#1A1714]/70 text-sm leading-relaxed">
              <li>— No detox claims.</li>
              <li>— No sauna equivalence claims.</li>
              <li>— No medical device claims.</li>
              <li>— No "ancient wisdom" framing.</li>
              <li>— No fake scarcity.</li>
              <li>— No sleep claims. We have no sleep data, so we make no sleep promise.</li>
              <li>
                — No evidence borrowed from a device class we are not. The hot-pack finding is
                cited as a hot-pack finding.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Wrap;
