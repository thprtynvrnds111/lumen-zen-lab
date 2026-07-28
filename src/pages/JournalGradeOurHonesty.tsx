import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

/**
 * /journal/grade-our-honesty — the Face Introducer honesty file, graded by readers.
 *
 * Copy source: engine repo substrate/actions/staff-T-20260727-011-draft.md,
 * compliance re-gate PASS 2026-07-28. One in-session change: the contact address
 * is info@zentialpure.com (the honesty@ alias does not exist); re-gated after.
 * The page's premise is that every sentence can be checked — do not edit copy
 * here without re-running the gate.
 */
const JournalGradeOurHonesty = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Grade Our Honesty, Zential Pure Journal"
        description="A public honesty file on the Face Introducer. What it does, what it does not do, and where to tell us we got it wrong. You grade it."
        canonicalUrl="/journal/grade-our-honesty"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Grade Our Honesty",
          description:
            "A public honesty file on the Face Introducer. What it does, what it does not do, and where to tell us we got it wrong.",
          datePublished: "2026-07-28T00:00:00Z",
          author: { "@type": "Organization", name: "Zential Pure" },
          publisher: { "@type": "Organization", name: "Zential Pure", url: "https://zentialpure.com" },
          url: "https://zentialpure.com/journal/grade-our-honesty",
        }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/journal"
              className="text-xs tracking-[0.25em] uppercase text-teal hover:text-primary transition-colors mb-8 inline-block"
            >
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 mt-6">
              Evidence · Honesty file
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Grade Our Honesty
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              A public honesty file on the Face Introducer. You grade it.
            </p>
            <div className="w-16 h-px bg-primary/30 mt-8" />
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-foreground pt-4">
              The pattern we are trying to break
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              You have been told a device "transforms" before. You have been promised "clinical"
              results that did not arrive. You bought a piece of hardware that sat on a shelf
              after the third week because the marketing was louder than the mechanism.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We are not going to pretend that pattern does not exist. It does. We work in the
              same category that produced it.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              So before we ask you to use the Face Introducer, we are publishing what it does,
              what it does not do, and where it falls short. You decide whether we told the
              truth. That grade is the only metric that matters to us right now.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">
              What the Face Introducer is
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Three modalities. Named plainly. No fourth one added to round out the list.
            </p>
            <div className="space-y-6">
              <div className="border-l-2 border-primary/30 pl-6">
                <p className="font-semibold text-foreground mb-2">
                  EMS (electrical muscle stimulation).
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Engages the facial muscles beneath the skin. With consistent use, it is
                  associated with improved appearance of muscle tone and a visible lift effect.
                  Individual results vary, and we make no promise about yours. It is not a
                  substitute for in-office muscle-targeting procedures. Results depend on
                  continued use.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <p className="font-semibold text-foreground mb-2">Microcurrent.</p>
                <p className="text-foreground/80 leading-relaxed">
                  Delivers a low-level electrical current, measured in microamperes. It is
                  gentle by design — you may barely feel it, and that is the intended sensation
                  rather than a fault. Microcurrent is commonly associated with the appearance
                  of improved facial muscle tone over time; individual results vary, and this
                  is a description of the category, not a promise about your face. That
                  sentence is deliberately not
                  dressed up as a literature claim: we hold no peer-reviewed study on a consumer
                  microcurrent device of this class, so we cite none. Much of the published work
                  in this area used clinical-grade equipment running at materially different
                  parameters, and borrowing it to sell you a handheld would be the exact move
                  this page exists to refuse. If we ever have a citation that fits the device,
                  it will appear here. It is not a deep-tissue intervention.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <p className="font-semibold text-foreground mb-2">Thermal (warming).</p>
                <p className="text-foreground/80 leading-relaxed">
                  Warms the skin surface during a session. The function supports comfort and
                  helps conduct topical products into the skin. It is a session aid. It is not a
                  fat-reduction treatment. It is not a resurfacing treatment. It will not
                  remodel deep tissue.
                </p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              That is the full list. There is no LED. There is no red light. There is no light
              therapy of any kind on this device. The indicator light on the unit is a mode
              indicator. It tells you which modality is active. It is not a treatment.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">
              What the Face Introducer is not
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              We would rather you read this section before you buy than after.
            </p>
            <ul className="space-y-4 text-foreground/80 leading-relaxed list-none">
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not a light therapy device.</strong> If you are looking for
                at-home LED or red light therapy, this is the wrong product. We will not
                pretend otherwise.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not an ablative laser.</strong> It will not remove skin in
                measured layers. It will not produce laser-grade resurfacing.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not microneedling.</strong> It does not create controlled
                micro-injuries. It does not trigger a wound-healing cascade.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not radiofrequency skin tightening.</strong> It does not deliver
                RF energy to deeper tissue layers.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not a deep chemical peel.</strong> It does not apply acid
                formulations at clinical strength.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It is not a replacement for prescription skincare.</strong> Topical
                retinoids, prescription actives, and dermatologist-supervised regimens are a
                different category. The Face Introducer sits beside them. It does not replace
                them.
              </li>
              <li className="border-l-2 border-primary/30 pl-6">
                <strong>It will not produce permanent structural change.</strong> Any visible
                effect from EMS or microcurrent is maintained through continued use. Stop using
                the device and the effect attenuates. That is the nature of the modalities. We
                will not sell you permanence that the physics does not support.
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              If you are looking for any of the above, a dermatologist's office is the right
              call. We will tell you that directly.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">The guarantee, restated</h2>
            <p className="text-foreground/80 leading-relaxed">
              Every Face Introducer ships with a 30-day money-back guarantee.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              If the device does not perform as described in this honesty file, the return is
              yours. No restocking fee. No "we are sorry you feel that way." No email loop
              designed to time out the return window.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              The language on the guarantee page is the same language used here. We did not
              write one version for marketing and another for the fine print. There is one
              version.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">The invitation</h2>
            <p className="text-foreground/80 leading-relaxed">
              Read the file. Check it against the product page. Check it against the manual.
              Check it against your own knowledge of what these modalities can and cannot do.
            </p>
            <p className="text-foreground/80 leading-relaxed">Then tell us where we lied.</p>
            <p className="text-foreground/80 leading-relaxed">
              If a claim here does not match the device, we want to hear about it. If a limit is
              overstated, we want to hear about it. If something we left out should have been
              included, we want to hear about that too.
            </p>
            <div className="bg-card/60 border border-border/30 rounded-2xl p-8 my-8">
              <p className="text-foreground/90 leading-relaxed">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@zentialpure.com?subject=Grade"
                  className="underline underline-offset-4 text-teal hover:text-primary transition-colors"
                >
                  info@zentialpure.com
                </a>
                <br />
                <strong>Subject line:</strong> Grade
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                We read every message. We respond to every grade.
              </p>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              The point of this exercise is not to sell you a device. The point is to find out
              whether a brand can publish its own limits and still be trusted. You are the
              judge. We are the record.
            </p>

            <div className="text-center py-8">
              <div className="w-16 h-px bg-primary/30 mx-auto mb-8" />
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Published 2026-07-28 · Corrections welcome, in public
              </p>
            </div>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default JournalGradeOurHonesty;
