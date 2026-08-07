import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

/**
 * /journal/kill-list — public record of retired claims, imagery, and framings.
 *
 * Copy source: engine repo substrate/actions/staff-T-20260727-010-draft.md v2 —
 * rebuilt 2026-07-28 from the documented retirement record (v1 was killed for
 * fabricated product history) and compliance-gated PASS the same session.
 * Every entry corresponds to a dated internal decision; no entry may be added
 * here without one. Deliberately: no prices, no product links, no newsletter
 * section, no related-articles rail — it is a record, not a recommendation.
 */
const JournalKillList = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="The Kill List, Zential Pure Journal"
        description="A running record of what Zential Pure stopped selling, stopped saying, or stopped showing. Not a campaign. A practice."
        canonicalUrl="/journal/kill-list"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Kill List",
          description:
            "A running record of what Zential Pure stopped selling, stopped saying, or stopped showing.",
          datePublished: "2026-07-28T00:00:00Z",
          author: { "@type": "Organization", name: "Zential Pure" },
          publisher: { "@type": "Organization", name: "Zential Pure", url: "https://zentialpure.com" },
          url: "https://zentialpure.com/journal/kill-list",
        }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/journal"
              className="text-xs tracking-[0.25em] uppercase text-[#0E7A54] hover:text-[#1BAF86] transition-colors mb-8 inline-block"
            >
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8E8E8E] mb-4 mt-6">
              Evidence · Record
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-[#141414] leading-tight mb-6">
              The Kill List
            </h1>
            <p className="text-lg text-[#141414]/80 leading-relaxed">
              A running record of what we have stopped selling, stopped saying, or stopped
              showing. Updated as decisions are made. Not a campaign. A practice.
            </p>
            <div className="w-16 h-px bg-[#0E7A54] mt-8" />
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              The Face Introducer is not a light-therapy device. Early copy said otherwise.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              The device runs EMS, microcurrent, and thermal modes; the light on the unit is a
              mode indicator that shows which modality is active — not a treatment.
            </p>
            <p className="text-[#141414]/80 leading-relaxed">
              When the device itself was checked against the copy, the framing was retired the
              same day: product page language, ad copy, and the structured data search engines
              read. The device was never altered; only the way we described it was wrong.
            </p>
            <p className="text-[#141414]/80 leading-relaxed">
              What we will not do: reintroduce the framing, or any variation of it, in any copy.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              "Full-body" came off the Mat page after one customer told us the truth.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              We described the Restoration Mat with "full-body" language. Our first customer
              pointed out that a 100×40cm panel covers the back of the torso, not a body. They
              were right. Every "full-body" claim came off the product page, the store listing,
              and the machine-readable surfaces the same week. The Mat is sized to the back of
              the body, and the page now says exactly that.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              An origin line we could not stand behind.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              Our copy said the brand operated "from Rotterdam." When we audited it against how
              our instruments actually reach customers, the claim did not hold as written. It
              came off the site — footer, structured data, everywhere. A romantic origin line is
              not worth more than the trust it spends.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              Two images, deleted the day we actually looked at them.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              An audit of every live product image found two that should never have been up:
            </p>
            <ul className="space-y-4 text-[#141414]/80 leading-relaxed list-none">
              <li className="border-l border-[#0E7A54] pl-6">
                A <strong>before/after split</strong> on the Face Introducer with no caption, no
                timeframe — and, worse, it was AI-generated. A fabricated result presented as a
                real one. Deleted, archived internally as a warning, never to be re-uploaded.
              </li>
              <li className="border-l border-[#0E7A54] pl-6">
                A <strong>manufacturer's marketing image</strong> on the Belt carrying
                pain-relief and weight-loss claims we have never made and will not make —
                including, somehow, a photo of a golden retriever. Deleted.
              </li>
            </ul>
            <p className="text-[#141414]/80 leading-relaxed">
              The lesson we recorded: no automated check reads pixels. Someone has to look. Now
              someone does.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              The word "guarantee" was doing work it had no right to do.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              Two constructions came off the site in July:
            </p>
            <ul className="space-y-4 text-[#141414]/80 leading-relaxed list-none">
              <li className="border-l border-[#0E7A54] pl-6">
                <strong>"No visible improvement within 30 days → full refund."</strong> That
                phrasing promises a visible result and makes the refund a measurement. Our
                guarantee is simpler and honest: 30 days, money back, your call — no result
                clause, no judging panel.
              </li>
              <li className="border-l border-[#0E7A54] pl-6">
                <strong>"The technology works or you get your money back."</strong> "Works" is
                an outcome promise. Deleted, not rephrased. There is no compliant version of
                that sentence.
              </li>
            </ul>
            <p className="text-[#141414]/80 leading-relaxed">
              We also retired the phrase "protocol guarantee" in favor of plain "money-back
              guarantee." Same terms, fewer implications.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              Two product generations, retired.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              Before the current three instruments, there were two earlier product generations —
              a face-tool line and a set of recovery prototypes, more than a dozen SKUs across
              both. In July we cut the published catalog from 23 purchasable products to 6: the
              three instruments, The System, and two consumables. The retired generations are
              gone from the store, not renamed, not repackaged.
            </p>
            <p className="text-[#141414]/80 leading-relaxed">Fewer things, described exactly.</p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">
              Pricing math we stopped using.
            </h2>
            <p className="text-[#141414]/80 leading-relaxed">
              We used to break down device value per modality — as if three modalities in one
              instrument were three prices added together. We stopped. The comparison we publish
              now is the list price, whole, against what the alternatives cost. If the price
              doesn't hold up whole, slicing it thinner shouldn't rescue it.
            </p>

            <h2 className="text-2xl font-light tracking-[-0.025em] text-[#141414] pt-4">What this list is</h2>
            <p className="text-[#141414]/80 leading-relaxed">
              It is ongoing. New entries are added as decisions are made. Old entries do not get
              edited to soften the language used at the time.
            </p>
            <p className="text-[#141414]/80 leading-relaxed">
              This page carries no prices, no alternatives, and no links to current products. It
              is a record, not a recommendation.
            </p>
            <p className="text-[#141414]/80 leading-relaxed">
              We publish it because hiding a decision costs more than naming it. The cost of
              being caught misrepresenting our own work is higher than the cost of saying so
              first.
            </p>

            <div className="text-center py-8">
              <div className="w-16 h-px bg-[#0E7A54] mx-auto mb-8" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#8E8E8E]">
                Last updated 2026-07-28 · Next update: as warranted
              </p>
            </div>
          </div>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default JournalKillList;
