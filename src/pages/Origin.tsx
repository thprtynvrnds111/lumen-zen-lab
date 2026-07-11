import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Link } from "react-router-dom";

/**
 * /origin — the brand-origin essay. Dark editorial ground in homepage-hero
 * grammar: Lora-italic display headlines with a single teal accent phrase,
 * cream body, single column, generous whitespace. No product imagery, one
 * quiet CTA at the very end. Copy is brand-signed (no founder name).
 */
export default function Origin() {
  return (
    <div className="min-h-screen bg-[#1A1714]">
      <SEO
        title="Origin — Zential Pure"
        description="Why Zential Pure exists: the question, the trap we refused, and the resonance-restoration philosophy behind the instruments."
        canonicalUrl="/origin"
      />
      <Header />

      <main className="text-[#F7F4F0]">
        {/* HERO — no CTA above the fold */}
        <section className="mx-auto max-w-[680px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase text-[#2ED8A8]">
            Origin · Zential Pure
          </p>
          <h1 className="mt-8 font-serif italic font-normal tracking-[-0.02em] leading-[1.08] text-[clamp(44px,6vw,76px)] [text-wrap:pretty]">
            We started with
            <br />
            <span className="text-[#2ED8A8]">a question.</span>
          </h1>
        </section>

        {/* SECTION 1 — the question */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#F7F4F0]/85">
            Why does clinic-grade skin technology stay locked behind standing appointments and €120
            sessions? We asked it as customers first. The answer we kept getting — that's just how
            the industry works — was not an answer. It was a business model.
          </p>
        </section>

        {/* SECTION 2 — the trap we refused */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-serif italic font-normal tracking-[-0.01em] leading-[1.15] text-[clamp(28px,3.6vw,40px)]">
            The trap we refused
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#F7F4F0]/85">
            The market offers a false binary: pay for a clinic session every three weeks,
            indefinitely, or do nothing meaningful at all. Results that fade on schedule are not
            results. They are a subscription. We refused the binary. So we built the instrument we
            wanted on our own counter — clinic precision, calibrated to a daily ritual you actually
            keep.
          </p>
        </section>

        {/* SECTION 3 — what we believe */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-serif italic font-normal tracking-[-0.01em] leading-[1.15] text-[clamp(28px,3.6vw,40px)]">
            What we believe
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#F7F4F0]/85">
            Skin is not a surface to be corrected. It is living tissue that answers signals — light
            at wavelengths its cells recognise, current that mirrors its own bioelectricity, warmth
            it understands. Everything in the body already knows the rhythm of repair.
          </p>

          <blockquote className="my-10 border-t border-b border-[#F7F4F0]/12 py-8">
            <p className="font-serif italic text-[clamp(24px,3.2vw,32px)] leading-[1.35] tracking-[-0.01em] text-[#F7F4F0] [text-wrap:pretty]">
              Our work is not to add something foreign. It is to return the signal.
            </p>
          </blockquote>

          <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#F7F4F0]/85">
            We call this resonance restoration, and it is the filter every Zential Pure decision
            passes through.
          </p>
        </section>

        {/* SECTION 4 — how we hold ourselves to it */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-serif italic font-normal tracking-[-0.01em] leading-[1.15] text-[clamp(28px,3.6vw,40px)]">
            How we hold ourselves to it
          </h2>
          <ul className="mt-8 divide-y divide-[#F7F4F0]/12 border-t border-b border-[#F7F4F0]/12">
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#F7F4F0]/85">
              <span className="text-[#F7F4F0]">Mechanism before promise</span> — we explain how, or
              we don't claim it.
            </li>
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#F7F4F0]/85">
              <span className="text-[#F7F4F0]">Real proof only</span> — reviews come from
              Trustpilot, never from a copywriter.
            </li>
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#F7F4F0]/85">
              <span className="text-[#F7F4F0]">Thirty days, unconditional</span> — if the ritual
              doesn't fit your life, it comes back.
            </li>
          </ul>
        </section>

        {/* SIGN-OFF + single quiet CTA */}
        <section className="mx-auto max-w-[680px] px-6 pb-28 md:pb-36">
          <p className="font-serif italic text-[20px] md:text-[22px] text-[#F7F4F0]/80">
            Zential Pure · Rotterdam
          </p>
          <div className="mt-12">
            <Link
              to="/instruments"
              className="inline-block border-b border-[#2ED8A8]/50 pb-1 font-sans text-[13px] font-medium tracking-[0.18em] uppercase text-[#2ED8A8] transition-colors hover:border-[#2ED8A8]"
            >
              Meet the instruments →
            </Link>
          </div>
        </section>
      </main>

      <SparseFooter />
    </div>
  );
}
