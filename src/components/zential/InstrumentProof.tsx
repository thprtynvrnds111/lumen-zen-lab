import { getSocialProof } from "@/data/testimonials";

const WRAP = "mx-auto w-[min(1180px,92vw)]";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        const id = `star-${i}-${Math.round(fill * 100)}`;
        return (
          <svg key={i} width="15" height="15" viewBox="0 0 20 20" className="block">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="#2ED8A8" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(247,244,240,0.22)" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 15.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86z"
              fill={`url(#${id})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

/** Compact rating badge for the hero. Renders nothing until a real rating exists. */
export function RatingBadge({ slug }: { slug: string }) {
  const sp = getSocialProof(slug);
  if (sp.rating == null) return null;
  return (
    <a
      href={sp.trustpilotUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[10px] self-start rounded-full border border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.04)] px-[16px] py-[9px] transition-colors hover:border-[#2ED8A8]/40"
    >
      <Stars rating={sp.rating} />
      <span className="font-sans text-[11px] text-[#F7F4F0]/[0.78]">
        <b className="font-semibold text-[#2ED8A8]">{sp.rating.toFixed(1)}</b>
        {sp.reviewCount != null && <span className="text-[#F7F4F0]/55"> · {sp.reviewCount} reviews</span>}
      </span>
    </a>
  );
}

/** Proof section — real testimonials when present, honest "incoming" state until then. */
export function InstrumentProofSection({ slug, num }: { slug: string; num: string }) {
  const sp = getSocialProof(slug);
  const hasReviews = sp.testimonials.length > 0;

  return (
    <section className="bg-[#070A0E] py-[clamp(76px,10vw,120px)] text-[#F7F4F0]">
      <div className={WRAP}>
        <p className="flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-[#F7F4F0]/40">
          <span className="tabular-nums opacity-55">( {num} )</span>
          <span className="inline-block h-px w-[26px] bg-current opacity-40" />
          In their words
        </p>

        {hasReviews ? (
          <>
            <div className="mt-[44px] grid gap-px border border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.10)] md:grid-cols-3">
              {sp.testimonials.slice(0, 3).map((t, i) => (
                <figure key={i} className="bg-[#070A0E] px-[34px] py-10">
                  <blockquote className="font-serif italic text-[19px] leading-[1.5] text-[#F7F4F0]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-2 font-sans text-[12px] text-[#F7F4F0]/55">
                    {t.name}
                    {t.verified && <span className="rounded-full border border-[#2ED8A8]/40 px-2 py-[2px] text-[10px] tracking-[0.1em] uppercase text-[#2ED8A8]">Verified</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
            <a href={sp.trustpilotUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.1em] text-[#2ED8A8] hover:underline">
              Read every review on Trustpilot &rarr;
            </a>
          </>
        ) : (
          <div className="mt-[34px] max-w-[560px]">
            <p className="font-serif italic text-[clamp(22px,2.8vw,30px)] leading-[1.25] text-[#F7F4F0]">
              Founding reviews are coming in.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#F7F4F0]/[0.6]">
              The first hundred are calibrating the protocol now. Their words land here as they arrive &mdash; and on our public Trustpilot profile.
            </p>
            <a href={sp.trustpilotUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.1em] text-[#2ED8A8] hover:underline">
              See Zential Pure on Trustpilot &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
