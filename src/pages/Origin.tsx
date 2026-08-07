import { SEO } from "@/components/SEO";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Link } from "react-router-dom";

/**
 * /origin — the brand-origin essay. Coven grammar (2026-08-07): white canvas,
 * Switzer-light display headlines with a single emerald accent phrase, ink
 * body, single column, generous whitespace. No product imagery, one quiet
 * CTA at the very end. Copy is brand-signed (no founder name).
 */
export default function Origin() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Origin — Zential Pure"
        description="Why Zential Pure exists: the question, the trap we refused, and the resonance-restoration philosophy behind the instruments."
        canonicalUrl="/origin"
      />
      <Header />

      <main className="text-[#141414]">
        {/* HERO — no CTA above the fold */}
        <section className="mx-auto max-w-[680px] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase text-[#8E8E8E]">
            Origin · Zential Pure
          </p>
          <h1 className="mt-8 font-sans font-light tracking-[-0.03em] leading-[1.02] text-[clamp(44px,6vw,76px)] [text-wrap:pretty]">
            We started with
            <br />
            <span className="text-[#0E7A54]">a question.</span>
          </h1>
        </section>

        {/* SECTION 1 — the question */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#5A5A5A]">
            Why does clinic-grade skin technology stay locked behind standing appointments and €120
            sessions? We asked it as customers first. The answer we kept getting — that's just how
            the industry works — was not an answer. It was a business model.
          </p>
        </section>

        {/* SECTION 2 — the trap we refused */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-sans font-light tracking-[-0.025em] leading-[1.1] text-[clamp(28px,3.6vw,40px)] text-[#141414]">
            The trap we refused
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#5A5A5A]">
            The market offers a false binary: pay for a clinic session every three weeks,
            indefinitely, or do nothing meaningful at all. Results that fade on schedule are not
            results. They are a subscription. We refused the binary. So we put the instrument we
            wanted on our own counter — chosen against a clinic standard, precision tuned to a
            daily ritual you actually keep.
          </p>
        </section>

        {/* SECTION 3 — what we believe */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-sans font-light tracking-[-0.025em] leading-[1.1] text-[clamp(28px,3.6vw,40px)] text-[#141414]">
            What we believe
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#5A5A5A]">
            Skin is not a surface to be corrected. It is living tissue that answers signals — light
            at wavelengths its cells recognise, current that mirrors its own bioelectricity, warmth
            it understands. Everything in the body already knows the rhythm of repair.
          </p>

          <blockquote className="my-10 border-t border-b border-[rgba(20,20,20,0.10)] py-8">
            <p className="font-sans font-light text-[clamp(24px,3.2vw,32px)] leading-[1.35] tracking-[-0.025em] text-[#141414] [text-wrap:pretty]">
              Our work is not to add something foreign. It is to return the signal.
            </p>
          </blockquote>

          <p className="font-sans text-[17px] md:text-[18px] leading-[1.8] text-[#5A5A5A]">
            We call this resonance restoration, and it is the filter every Zential Pure decision
            passes through.
          </p>
        </section>

        {/* SECTION 4 — how we hold ourselves to it */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:pb-20">
          <h2 className="font-sans font-light tracking-[-0.025em] leading-[1.1] text-[clamp(28px,3.6vw,40px)] text-[#141414]">
            How we hold ourselves to it
          </h2>
          <ul className="mt-8 divide-y divide-[rgba(20,20,20,0.10)] border-t border-b border-[rgba(20,20,20,0.10)]">
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#5A5A5A]">
              <span className="text-[#141414]">Mechanism before promise</span> — we explain how, or
              we don't claim it.
            </li>
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#5A5A5A]">
              <span className="text-[#141414]">Real proof only</span> — reviews come from
              Trustpilot, never from a copywriter.
            </li>
            <li className="py-6 font-sans text-[16px] md:text-[17px] leading-[1.7] text-[#5A5A5A]">
              <span className="text-[#141414]">Thirty days, unconditional</span> — if the ritual
              doesn't fit your life, it comes back.
            </li>
          </ul>
        </section>

        {/* SIGN-OFF + single quiet CTA */}
        <section className="mx-auto max-w-[680px] px-6 pb-28 md:pb-36">
          {/* Signed by name from 2026-08-01 — see the note in Storefront.tsx. */}
          <p className="font-sans text-[20px] md:text-[22px] font-light tracking-[-0.01em] text-[#5A5A5A]">
            Miguel · Founder, Zential Pure · Rotterdam
          </p>
          <div className="mt-12">
            <Link
              to="/instruments"
              className="inline-block border-b border-[#0E7A54]/50 pb-1 font-sans text-[13px] font-medium tracking-[0.18em] uppercase text-[#0E7A54] transition-colors hover:border-[#0E7A54] hover:text-[#1BAF86]"
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
