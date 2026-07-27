import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ChevronDown, ArrowRight, ShieldCheck, BadgeCheck, Truck, Lock } from "lucide-react";
import { getBridgeConfig } from "./config";
import { localizeToUSD } from "./usd";
import { getCountry } from "@/lib/market";
import { buyUrl } from "@/lib/checkout";
import { ga4Event, pixelBridgeEngaged, pixelDirectCheckout, pixelViewContent } from "./tracking";

/* ────────────────────────────────────────────────────────────────────────────
   Paid-traffic BRIDGE page (advertorial long-scroll) — the missing middle of the
   Meta funnel. Sits between the UGC ad click and the PDP; closes the brand-
   credibility gap before price is discussed, then hands one purchase-path CTA to
   the PDP carrying a discount param.

   Visual direction (SPEC): white-and-turquoise, FLAT (zero box-shadow), Lora
   italic display + DM Sans body, turquoise #2ED8A8 as the single action colour.
   Standalone lander: noindex, no site chrome. Pixel hygiene: ViewContent only.
   ──────────────────────────────────────────────────────────────────────────── */

/* Zential flower mark — four overlapping ellipses at 0/45/90/135°. */
function FlowerMark({ size = 28, stroke = "#2ED8A8" }: { size?: number; stroke?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" aria-hidden="true">
      {[0, 45, 90, 135].map((a) => (
        <ellipse
          key={a}
          cx="32"
          cy="32"
          rx="20"
          ry="12"
          stroke={stroke}
          strokeWidth={1.5}
          fill={stroke}
          fillOpacity="0.06"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="2.25" fill={stroke} />
    </svg>
  );
}

function SectionMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="zb-eyebrow">
      <span className="zb-eyebrow-num">( {n} )</span>
      <span className="zb-eyebrow-dot">·</span>
      <span>{label}</span>
    </div>
  );
}

const TRUST_ICONS = [BadgeCheck, ShieldCheck, ShieldCheck, ShieldCheck, Lock, Truck];

export default function FunnelBridge() {
  const { slug } = useParams();
  const baseConfig = getBridgeConfig(slug) ?? getBridgeConfig("face-introducer")!;

  // Market localization. Every ACTIVE Meta ad set targets the US, and this page
  // is their only destination — a US visitor must never read a euro price the
  // Shopify checkout will not charge. Resolved after mount (?country=XX →
  // sessionStorage → /api/geo → "NL"), so the prerendered HTML stays home-market
  // EUR and hydration swaps in US truth.
  const [country, setCountry] = useState("");
  useEffect(() => {
    let live = true;
    getCountry()
      .then((c) => { if (live) setCountry(c); })
      .catch(() => { /* never break the lander — EUR default stands */ });
    return () => { live = false; };
  }, []);

  const config = useMemo(
    () => (country === "US" ? localizeToUSD(baseConfig) : baseConfig),
    [baseConfig, country],
  );

  // window.location.search, captured after mount. Prerendered HTML has no
  // params; the post-hydration re-render rewrites hrefs with the live search
  // (attribute updates on re-render DO apply — only the initial hydration pass
  // leaves server attributes alone).
  const [liveSearch, setLiveSearch] = useState("");
  useEffect(() => {
    try {
      setLiveSearch(window.location.search);
    } catch { /* never break the lander */ }
  }, []);

  // Preserve incoming params (fbclid etc.) and append the campaign discount.
  const ctaHref = useMemo(() => {
    const params = new URLSearchParams(liveSearch);
    params.set("discount", config.discountCode);
    return `${config.pdpPath}?${params.toString()}`;
  }, [config, liveSearch]);

  // One-hop purchase path: cart permalink straight into checkout (no PDP, no JS
  // required — the prerendered anchor already carries the discount). Incoming
  // attribution params (fbclid, utm_*) are forwarded once liveSearch resolves.
  const permalinkFor = (variantIds: string[]) => {
    const params = new URLSearchParams(liveSearch);
    params.set("discount", config.discountCode);
    const items = variantIds.map((v) => `${v}:1`).join(",");
    return buyUrl(`https://checkout.zentialpure.com/cart/${items}?${params.toString()}`);
  };

  const buyHref = useMemo(() => {
    if (!config.checkout) return ctaHref;
    return permalinkFor([config.checkout.variantId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, ctaHref, liveSearch]);

  const bundleHref = useMemo(() => {
    if (!config.checkout || !config.offer.bundle) return undefined;
    return permalinkFor([config.checkout.variantId, config.offer.bundle.addVariantId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, liveSearch]);

  const onCtaClick = (placement: string) => () =>
    ga4Event("bridge_cta_click", { slug: config.slug, discount: config.discountCode, placement });

  // Buy-CTA click on the one-hop path: fire click-bound ATC/IC, give the pixel
  // requests a beat to leave before the same-tab navigation unloads the page.
  // `dest`/`extraList` override for multi-item bundle CTAs so the navigation
  // target and pixel values stay honest per cart.
  const onBuyClick = (placement: string, dest?: string, extraList = 0) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onCtaClick(placement)();
      if (!config.checkout) return;
      const listValue = config.checkout.listValue + extraList;
      pixelDirectCheckout({
        // Same gid namespace the PDP path uses for content_ids — one product,
        // one id format, or Meta treats them as different products.
        variantId: `gid://shopify/ProductVariant/${config.checkout.variantId}`,
        name: config.checkout.name,
        listValue,
        // RITUAL15 is order-level 15% — verified per-cart via cartCreate.
        checkoutValue: Math.round(listValue * 0.85 * 100) / 100,
        currency: config.checkout.currency,
      });
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const target = dest ?? buyHref;
      window.setTimeout(() => { window.location.href = target; }, 120);
    };

  // Multi-variant one-hop path (the Mat): each size is its own cart permalink.
  // Fires click-bound ATC/IC with this variant's OWN honest, cartCreate-verified
  // figures (never the config-wide list), then navigates to its permalink.
  const onChoiceClick = (opt: NonNullable<typeof config.variantChoices>["options"][number]) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onCtaClick("choose-size")();
      pixelDirectCheckout({
        variantId: `gid://shopify/ProductVariant/${opt.variantId}`,
        name: `${config.offer.headline} — ${opt.label}`,
        listValue: opt.listValue,
        checkoutValue: opt.checkoutValue,
        currency: opt.currency,
      });
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const dest = permalinkFor([opt.variantId]);
      window.setTimeout(() => { window.location.href = dest; }, 120);
    };

  // Single buy CTA element: plain anchor (works without JS) on the one-hop
  // checkout path; an in-page scroll to the size grid when the product has
  // several variants (Mat); SPA <Link> when the purchase path is still the PDP.
  const BuyCta = ({ placement, className, tabIndex, children }: {
    placement: string;
    className: string;
    tabIndex?: number;
    children: React.ReactNode;
  }) =>
    config.checkout ? (
      <a
        href={buyHref}
        className={className}
        onClick={onBuyClick(placement)}
        tabIndex={tabIndex}
        data-atc-beacon=""
        data-beacon-slug={config.slug}
        data-beacon-placement={placement}
      >
        {children}
      </a>
    ) : config.variantChoices ? (
      <a href="#choose-size" className={className} onClick={onCtaClick(placement)} tabIndex={tabIndex}>
        {children}
      </a>
    ) : (
      <Link to={ctaHref} className={className} onClick={onCtaClick(placement)} tabIndex={tabIndex}>
        {children}
      </Link>
    );

  // noindex for this campaign lander (flip the static tag too — matches /reveal).
  useEffect(() => {
    const staticRobots = document.querySelector('meta[name="robots"]:not([data-rh])');
    const prev = staticRobots?.getAttribute("content") ?? null;
    staticRobots?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (staticRobots && prev) staticRobots.setAttribute("content", prev);
    };
  }, []);

  // Pixel: ViewContent on mount. BridgeEngaged once, at 40% scroll depth.
  useEffect(() => {
    pixelViewContent();
    ga4Event("bridge_view", { slug: config.slug });
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const doc = document.documentElement;
      const depth = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (depth >= 0.4) {
        fired = true;
        pixelBridgeEngaged();
        ga4Event("bridge_engaged", { slug: config.slug });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [config.slug]);

  // Sticky mini-CTA: appears once she has read past the hero + credibility stack,
  // hides while the real offer block (or footer) is on screen — one purchase path,
  // always within a thumb's reach.
  const offerRef = useRef<HTMLElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [offerOnScreen, setOfferOnScreen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > window.innerHeight * 1.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Hide the sticky bar whenever ANY primary CTA is on screen — not only the
    // offer section. On mobile the fixed bar otherwise covers inline CTAs
    // (conversion-audit finding 2026-07-09: bar overlapped the hero CTA at 390px).
    // Includes the Mat's per-size choice cards (.zb-choice) — they are the real
    // purchase path there, so the bar must clear them too.
    const ctas = Array.from(
      document.querySelectorAll(".zb-cta:not(.zb-cta--sticky), .zb-choice")
    );
    const visible = new Set<Element>();
    let io: IntersectionObserver | undefined;
    if (ctas.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
          setOfferOnScreen(visible.size > 0);
        },
        { threshold: 0.05 }
      );
      ctas.forEach((c) => io!.observe(c));
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="zb-root">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      <style>{CSS}</style>

      {/* Minimal chrome — wordmark only, no nav (keeps momentum). */}
      <header className="zb-topbar">
        <div className="zb-wordmark">
          <FlowerMark size={22} />
          <span>ZENTIAL PURE</span>
        </div>
      </header>

      {/* 01 · Congruence hero */}
      <section className="zb-hero">
        <div className="zb-hero-copy">
          <p className="zb-hero-eyebrow">{config.hero.eyebrow}</p>
          <h1 className="zb-display">{config.hero.headline}</h1>
          <p className="zb-hero-sub">{config.hero.sub}</p>
          <p className="zb-hero-price">{config.hero.priceLine}</p>
          <div className="zb-hero-actions">
            <BuyCta placement="hero" className="zb-cta">
              {config.hero.cta} <ArrowRight size={18} />
            </BuyCta>
            <a href="#the-maths" className="zb-scrollcue" aria-label="Read on">
              Read on <ChevronDown size={16} />
            </a>
          </div>
          {config.hero.ctaNote && <p className="zb-cta-note">{config.hero.ctaNote}</p>}
        </div>
        <div className="zb-hero-media">
          <img src={config.hero.image} alt={config.hero.alt} loading="eager" />
        </div>
      </section>

      {/* 02 · The clinic math — desire before trust */}
      <section id="the-maths" className="zb-section zb-math">
        <div>
          <SectionMark n="02" label={config.clinicMath.eyebrow} />
          <h2 className="zb-display zb-display-sm">{config.clinicMath.headline}</h2>
          <div className="zb-math-grid">
            <div className="zb-math-card">
              <span className="zb-math-title">{config.clinicMath.clinic.title}</span>
              <span className="zb-math-price zb-math-muted">
                {config.clinicMath.clinic.price} <em>{config.clinicMath.clinic.unit}</em>
              </span>
              <ul>
                {config.clinicMath.clinic.rows.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="zb-math-card zb-math-card--ours">
              <span className="zb-math-title">{config.clinicMath.instrument.title}</span>
              <span className="zb-math-price">
                {config.clinicMath.instrument.price} <em>{config.clinicMath.instrument.unit}</em>
              </span>
              <ul>
                {config.clinicMath.instrument.rows.map((r) => (
                  <li key={r}>
                    <Check size={15} strokeWidth={2.25} /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="zb-benchmark">
            <span className="zb-benchmark-title">{config.clinicMath.benchmark.title}</span>
            <p>{config.clinicMath.benchmark.body}</p>
            <span className="zb-benchmark-tag">{config.clinicMath.benchmark.tag}</span>
          </div>
          <a href="#offer" className="zb-softlink">
            See the founding offer <ChevronDown size={15} />
          </a>
        </div>
      </section>

      {/* 02b · Price-per-modality comparison — factual price + modality count only,
          competitor figures live-verified on their own pages (see config comment).
          No performance-equivalence claim; sober, sourced, dated. FI-only (optional). */}
      {config.comparison && (
        <section id="the-comparison" className="zb-section zb-compare">
          <div>
            <div className="zb-eyebrow">
              <span>{config.comparison.eyebrow}</span>
            </div>
            <h2 className="zb-display zb-display-sm">{config.comparison.headline}</h2>
            <p className="zb-lead">{config.comparison.intro}</p>
            <div className="zb-compare-table" role="table" aria-label="Price per modality comparison">
              <div className="zb-compare-head" role="row">
                <span role="columnheader">Device</span>
                <span role="columnheader">List price</span>
                <span role="columnheader">Modalities</span>
                <span role="columnheader">Price / modality</span>
              </div>
              {config.comparison.rows.map((r) => (
                <div
                  className={`zb-compare-row${r.ours ? " zb-compare-row--ours" : ""}`}
                  role="row"
                  key={r.name}
                >
                  <span className="zb-compare-name" role="cell">
                    {r.ours && <Check size={15} strokeWidth={2.25} aria-hidden="true" />}
                    {r.name}
                  </span>
                  <span className="zb-compare-price" role="cell">
                    <span className="zb-compare-label">List price</span>
                    {r.price}
                  </span>
                  <span className="zb-compare-mod" role="cell">
                    <span className="zb-compare-label">Modalities</span>
                    {r.modalities}
                  </span>
                </div>
              ))}
            </div>
            <p className="zb-compare-takeaway">{config.comparison.takeaway}</p>
            <p className="zb-compare-footnote">{config.comparison.footnote}</p>
          </div>
        </section>
      )}

      {/* 03 · Mechanism before benefit */}
      <section className="zb-section zb-mechanism">
        <div className="zb-mech-grid">
          <div className="zb-mech-copy">
            <SectionMark n="03" label={config.mechanism.eyebrow} />
            <h2 className="zb-display zb-display-sm">{config.mechanism.headline}</h2>
            {config.mechanism.body.map((p, i) => (
              <p className="zb-body" key={i}>{p}</p>
            ))}
            <p className="zb-mech-caption">{config.mechanism.caption}</p>

            <details className="zb-research">
              <summary>
                How we handle the research <ChevronDown size={16} />
              </summary>
              <div className="zb-research-body">
                <p>{config.mechanism.research.intro}</p>
                <ul>
                  {config.mechanism.research.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <p className="zb-fineprint">{config.mechanism.research.disclaimer}</p>
              </div>
            </details>
          </div>
          <div className="zb-mech-media">
            <img src={config.mechanism.image} alt={config.mechanism.alt} loading="lazy" />
          </div>
        </div>
      </section>

      {/* 04 · Credibility stack */}
      <section id="credibility" className="zb-section zb-credibility">
        <div>
          <SectionMark n="04" label={config.credibility.eyebrow} />
          <p className="zb-lead">{config.credibility.lead}</p>

          {/* Honest low-count Trustpilot signal — NO score, NO count. */}
          <a
            className="zb-trust-strip"
            href={config.credibility.trustpilot.href}
            target="_blank"
            rel="noreferrer"
          >
            <BadgeCheck size={20} strokeWidth={1.75} aria-hidden="true" className="zb-trust-badge" />
            <span className="zb-trust-text">
              <strong>{config.credibility.trustpilot.label}</strong>
              <span>{config.credibility.trustpilot.note}</span>
            </span>
            <span className="zb-trust-link">
              See the reviews <ArrowRight size={14} />
            </span>
          </a>

          <div className="zb-trust-grid">
            {config.credibility.items.map((item, i) => {
              const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
              return (
                <div className="zb-trust-card" key={item.title}>
                  <Icon size={20} strokeWidth={1.75} className="zb-trust-icon" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 · Social proof — REAL reviews only, verbatim from our public Trustpilot profile.
          Placeholder quotes are never rendered: fabricated testimonials are illegal
          (EU UCPD/Omnibus) and destroy the honesty that is our actual conversion mechanism.
          The low review count is stated plainly rather than hidden — our first real customer
          bought *because of* "relentless honesty", having nearly walked over "limited reviews". */}
      {config.social.quotes.some((q) => !q.placeholder) && (
        <section className="zb-section zb-social">
          <div>
            <SectionMark n="05" label={config.social.eyebrow} />
            <h2 className="zb-display zb-display-sm">{config.social.headline}</h2>

            <div className="zb-honesty">
              <p className="zb-honesty-head">{config.social.honesty.headline}</p>
              <p className="zb-honesty-body">{config.social.honesty.body}</p>
              <a
                className="zb-honesty-link"
                href={config.social.honesty.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.social.honesty.linkLabel}
              </a>
            </div>

            <div className="zb-quote-grid">
              {config.social.quotes
                .filter((q) => !q.placeholder)
                .map((q) => (
                  <figure className="zb-quote" key={q.name}>
                    <blockquote>{q.text}</blockquote>
                    <figcaption>
                      <span className="zb-quote-name">{q.name}</span>
                      <span className="zb-quote-meta">{q.meta}</span>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 06 · The ritual, shown */}
      <section className="zb-section zb-ritual">
        <div>
          <SectionMark n="06" label={config.ritual.eyebrow} />
          <h2 className="zb-display zb-display-sm">{config.ritual.headline}</h2>
          <div className="zb-ritual-grid">
            {config.ritual.steps.map((s) => (
              <div className="zb-ritual-step" key={s.index}>
                <div className="zb-ritual-media">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </div>
                <span className="zb-ritual-index">
                  {s.index} · {s.title}
                </span>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="zb-ritual-closing">{config.ritual.closing}</p>
        </div>
      </section>

      {/* 07 · Objection clearing */}
      <section className="zb-section zb-faq">
        <div>
          <SectionMark n="07" label={config.faq.eyebrow} />
          <h2 className="zb-display zb-display-sm">{config.faq.headline}</h2>
          <div className="zb-faq-list">
            {config.faq.items.map((f) => (
              <details className="zb-faq-item" key={f.q}>
                <summary>
                  {f.q} <ChevronDown size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · Single offer block — the one purchase-path CTA */}
      <section id="offer" ref={offerRef} className="zb-section zb-offer">
        <div className="zb-offer-grid">
          <div className="zb-offer-media">
            <img src={config.offer.image} alt={config.offer.alt} loading="lazy" />
          </div>
          <div className="zb-offer-copy">
            <p className="zb-offer-eyebrow">{config.offer.eyebrow}</p>
            <h2 className="zb-display zb-display-sm">{config.offer.headline}</h2>
            <div className="zb-offer-price">
              {config.offer.price}
              <span>{config.offer.priceNote}</span>
            </div>
            <div className="zb-offer-box">
              <span className="zb-offer-box-title">{config.offer.inBoxTitle}</span>
              <ul>
                {config.offer.inBox.map((b) => (
                  <li key={b}>
                    <Check size={15} strokeWidth={2.25} /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <p className="zb-offer-guarantee">{config.offer.guarantee}</p>
            {config.variantChoices ? (
              <div className="zb-choices" id="choose-size">
                <p className="zb-choices-eyebrow">{config.variantChoices.eyebrow}</p>
                <div className="zb-choices-grid">
                  {config.variantChoices.options.map((o) => (
                    <a
                      key={o.variantId}
                      href={permalinkFor([o.variantId])}
                      className="zb-choice"
                      onClick={onChoiceClick(o)}
                      data-atc-beacon=""
                      data-beacon-slug={config.slug}
                      data-beacon-placement="choose-size"
                    >
                      <span className="zb-choice-label">{o.label}</span>
                      <span className="zb-choice-price">{o.priceLine}</span>
                      <span className="zb-choice-action">
                        {o.cta} <ArrowRight size={16} />
                      </span>
                    </a>
                  ))}
                </div>
                <p className="zb-cta-note">{config.variantChoices.note}</p>
              </div>
            ) : config.offer.bundle && bundleHref ? (
              <>
                {/* Bundle-first offer: the complete-ritual order is the primary
                    action; the instrument-only order stays one click below. */}
                <div className="zb-bundle zb-bundle--primary">
                  <p className="zb-bundle-text">{config.offer.bundle.text}</p>
                  <a
                    href={bundleHref}
                    className="zb-cta"
                    onClick={onBuyClick("bundle", bundleHref, config.offer.bundle.addListValue)}
                    data-atc-beacon=""
                    data-beacon-slug={config.slug}
                    data-beacon-placement="bundle"
                  >
                    {config.offer.bundle.cta} <ArrowRight size={18} />
                  </a>
                  <p className="zb-bundle-note">{config.offer.bundle.note}</p>
                </div>
                <BuyCta placement="offer" className="zb-softlink">
                  {config.offer.cta}
                </BuyCta>
                <p className="zb-cta-note">{config.offer.ctaNote}</p>
              </>
            ) : (
              <>
                <BuyCta placement="offer" className="zb-cta">
                  {config.offer.cta} <ArrowRight size={18} />
                </BuyCta>
                <p className="zb-cta-note">{config.offer.ctaNote}</p>
              </>
            )}
            <Link to={ctaHref} className="zb-softlink" onClick={onCtaClick("offer-pdp")}>
              Prefer the full specification first? See the product page
            </Link>
            {config.offer.systemBridge && (
              <div className="zb-system-bridge">
                <p>{config.offer.systemBridge.text}</p>
                <Link
                  to={config.offer.systemBridge.href}
                  className="zb-softlink"
                  onClick={onCtaClick("system-bridge")}
                >
                  {config.offer.systemBridge.cta}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky mini-CTA — same single purchase path, thumb-reachable */}
      <div
        className={`zb-sticky ${stickyVisible && !offerOnScreen ? "is-on" : ""}`}
        aria-hidden={!(stickyVisible && !offerOnScreen)}
      >
        <div className="zb-sticky-info">
          <span className="zb-sticky-name">{config.offer.headline}</span>
          <span className="zb-sticky-price">{config.offer.stickyLine}</span>
        </div>
        <BuyCta
          placement="sticky"
          className="zb-cta zb-cta--sticky"
          tabIndex={stickyVisible && !offerOnScreen ? 0 : -1}
        >
          {config.offer.cta}
        </BuyCta>
      </div>

      {/* 09 · Footer trust echo */}
      <footer className="zb-footer">
        <div className="zb-footer-echoes">
          {config.footer.echoes.map((e) => (
            <span key={e}>
              <Check size={14} strokeWidth={2.25} /> {e}
            </span>
          ))}
        </div>
        <nav className="zb-footer-legal">
          {config.footer.legal.map((l) => (
            <Link key={l.href} to={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="zb-footer-smallprint">{config.footer.smallprint}</p>
      </footer>
    </div>
  );
}

/* ── Scoped styles. White-and-turquoise, flat (no box-shadow), 4px grid,
   Lora italic display + DM Sans body. Tokens mirror src/index.css. ── */
const CSS = `
.zb-root{--bg:#ffffff;--cream:#F7F4F0;--ink:#1A1714;--muted:#8A7F74;--border:#eae7e0;--rule:#6b5a4a;--teal:#2ED8A8;--gold:#C6A07C;--terra:#9B5A2E;
  background:var(--bg);color:var(--ink);font-family:var(--font-sans);line-height:1.5;overflow-x:clip;}
.zb-root *{box-sizing:border-box;}
.zb-display{font-family:var(--font-serif);font-style:italic;font-weight:500;line-height:1.14;letter-spacing:-0.01em;font-size:clamp(30px,7vw,52px);margin:0;}
.zb-display-sm{font-size:clamp(26px,5.2vw,40px);}
.zb-body{font-size:16px;color:var(--ink);margin:0 0 16px;max-width:60ch;}
.zb-lead{font-size:clamp(17px,2.6vw,20px);color:var(--ink);max-width:56ch;margin:16px 0 32px;}
.zb-section{padding:64px 20px;max-width:1080px;margin:0 auto;}
@media(min-width:768px){.zb-section{padding:96px 32px;}}
.zb-eyebrow{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--terra);font-weight:600;margin-bottom:20px;}
.zb-eyebrow-num{color:var(--muted);letter-spacing:0.1em;}
.zb-eyebrow-dot{color:var(--gold);}

/* topbar */
.zb-topbar{display:flex;align-items:center;justify-content:center;padding:16px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:rgba(255,255,255,0.92);z-index:20;}
.zb-wordmark{display:flex;align-items:center;gap:8px;font-weight:600;letter-spacing:0.22em;font-size:13px;}

/* hero */
.zb-hero{max-width:1080px;margin:0 auto;padding:40px 20px 24px;display:grid;gap:28px;}
@media(min-width:768px){.zb-hero{grid-template-columns:1.05fr .95fr;align-items:center;padding:72px 32px 40px;gap:48px;}}
.zb-hero-eyebrow{font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin:0 0 20px;}
.zb-hero-sub{font-size:17px;color:var(--muted);max-width:46ch;margin:20px 0 28px;}
.zb-hero-price{font-size:14px;font-weight:600;letter-spacing:0.02em;color:var(--ink);margin:0 0 16px;}
.zb-hero-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.zb-scrollcue{display:inline-flex;align-items:center;gap:6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--teal);padding-bottom:4px;}
.zb-hero-media img{width:100%;height:auto;border-radius:20px;display:block;aspect-ratio:4/5;object-fit:cover;}

/* credibility */
.zb-trust-strip{display:flex;align-items:center;gap:16px;flex-wrap:wrap;background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:16px 20px;text-decoration:none;color:var(--ink);margin-bottom:24px;}
.zb-trust-badge{color:var(--teal);flex:none;}
.zb-trust-text{display:flex;flex-direction:column;gap:2px;flex:1;min-width:220px;}
.zb-trust-text strong{font-size:15px;}
.zb-trust-text span{font-size:13px;color:var(--muted);}
.zb-trust-link{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--teal);font-weight:600;white-space:nowrap;}
.zb-trust-grid{display:grid;gap:12px;grid-template-columns:1fr;}
@media(min-width:640px){.zb-trust-grid{grid-template-columns:1fr 1fr;}}
@media(min-width:960px){.zb-trust-grid{grid-template-columns:1fr 1fr 1fr;}}
.zb-trust-card{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:20px;}
.zb-trust-icon{color:var(--teal);margin-bottom:12px;}
.zb-trust-card h3{font-size:15px;font-weight:600;margin:0 0 8px;letter-spacing:-0.01em;}
.zb-trust-card p{font-size:13.5px;color:var(--muted);margin:0;line-height:1.55;}

/* mechanism */
.zb-mech-grid{display:grid;gap:32px;}
@media(min-width:768px){.zb-mech-grid{grid-template-columns:1.1fr .9fr;align-items:center;gap:48px;}}
.zb-mech-caption{font-family:var(--font-serif);font-style:italic;font-size:18px;color:var(--terra);margin:8px 0 24px;max-width:44ch;}
.zb-mech-media img{width:100%;height:auto;border-radius:20px;display:block;aspect-ratio:4/5;object-fit:cover;}
.zb-research{border-top:1px solid var(--border);padding-top:16px;}
.zb-research summary{display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:14px;font-weight:600;color:var(--teal);list-style:none;}
.zb-research summary::-webkit-details-marker{display:none;}
.zb-research[open] summary svg{transform:rotate(180deg);}
.zb-research summary svg{transition:transform .2s cubic-bezier(.4,0,.2,1);}
.zb-research-body{padding-top:14px;}
.zb-research-body p{font-size:14px;color:var(--muted);margin:0 0 12px;}
.zb-research-body ul{margin:0 0 12px;padding-left:18px;}
.zb-research-body li{font-size:13.5px;color:var(--muted);margin-bottom:6px;}
.zb-fineprint{font-size:12px;color:var(--muted);font-style:italic;}

/* math */
.zb-math-grid{display:grid;gap:12px;margin:28px 0 20px;}
@media(min-width:640px){.zb-math-grid{grid-template-columns:1fr 1fr;}}
.zb-math-card{border:1px solid var(--border);border-radius:10px;padding:24px;background:var(--cream);}
.zb-math-card--ours{background:var(--bg);border-color:var(--teal);}
.zb-math-title{font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);}
.zb-math-price{display:block;font-family:var(--font-serif);font-size:40px;margin:8px 0 16px;letter-spacing:-0.02em;}
.zb-math-price em{font-style:normal;font-family:var(--font-sans);font-size:14px;color:var(--muted);letter-spacing:0;}
.zb-math-muted{color:var(--muted);}
.zb-math-card ul{list-style:none;margin:0;padding:0;}
.zb-math-card li{font-size:14px;color:var(--ink);margin-bottom:10px;display:flex;align-items:flex-start;gap:8px;}
.zb-math-card--ours li svg{color:var(--teal);flex:none;margin-top:3px;}
.zb-benchmark{border:1px dashed var(--rule);border-radius:10px;padding:24px;display:flex;flex-direction:column;gap:8px;}
.zb-benchmark-title{font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);}
.zb-benchmark p{font-size:15px;margin:0;max-width:60ch;}
.zb-benchmark-tag{align-self:flex-start;background:var(--teal);color:var(--ink);font-weight:600;font-size:13px;padding:6px 12px;border-radius:20px;margin-top:4px;}

/* price-per-modality comparison */
.zb-compare-table{margin:28px 0 20px;border:1px solid var(--border);border-radius:10px;overflow:hidden;}
.zb-compare-head{display:none;}
/* Column labels shown inline on mobile (stacked cards), hidden once the header row appears. */
.zb-compare-label{display:block;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:2px;}
.zb-compare-row{display:grid;gap:2px 16px;padding:20px;border-top:1px solid var(--border);background:var(--cream);}
.zb-compare-row:first-child{border-top:none;}
.zb-compare-row--ours{background:var(--bg);border-left:2px solid var(--teal);}
.zb-compare-name{font-family:var(--font-serif);font-style:italic;font-size:18px;display:flex;align-items:center;gap:8px;}
.zb-compare-row--ours .zb-compare-name svg{color:var(--teal);flex:none;}
.zb-compare-price{font-weight:600;font-size:16px;}
.zb-compare-mod{font-size:14px;color:var(--ink);}
.zb-compare-per{font-size:14px;color:var(--muted);}
.zb-compare-row--ours .zb-compare-per{color:var(--terra);font-weight:600;}
@media(min-width:768px){
  .zb-compare-head{display:grid;grid-template-columns:1.4fr .7fr 1.7fr 1fr;gap:16px;padding:14px 20px;background:var(--bg);}
  .zb-compare-head span{font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);}
  .zb-compare-row{grid-template-columns:1.4fr .7fr 1.7fr 1fr;align-items:center;gap:16px;}
  .zb-compare-label{display:none;}
  .zb-compare-name{font-size:16px;}
}
.zb-compare-takeaway{font-size:15px;color:var(--ink);margin:0 0 16px;max-width:64ch;line-height:1.6;}
.zb-compare-footnote{font-size:11.5px;color:var(--muted);font-style:italic;margin:0;max-width:72ch;line-height:1.6;}

/* social */
.zb-honesty{margin-top:24px;padding:22px 24px;border-left:2px solid var(--accent,#C6A07C);background:rgba(198,160,124,0.06);border-radius:0 8px 8px 0;}
.zb-honesty-head{margin:0;font-family:var(--font-serif);font-style:italic;font-size:19px;line-height:1.35;}
.zb-honesty-body{margin:10px 0 0;font-size:14.5px;line-height:1.65;color:var(--muted);max-width:64ch;}
.zb-honesty-link{display:inline-block;margin-top:14px;font-size:12.5px;letter-spacing:0.04em;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px;}
.zb-quote-grid{display:grid;gap:16px;margin-top:28px;}
@media(min-width:768px){.zb-quote-grid{grid-template-columns:repeat(3,1fr);}}
.zb-quote{margin:0;background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:24px;display:flex;flex-direction:column;gap:16px;}
.zb-quote blockquote{margin:0;font-family:var(--font-serif);font-style:italic;font-size:16px;line-height:1.5;}
.zb-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:auto;}
.zb-quote-name{font-weight:600;font-size:14px;}
.zb-quote-meta{font-size:12.5px;color:var(--muted);}

/* ritual */
.zb-ritual-grid{display:grid;gap:20px;margin-top:28px;}
@media(min-width:768px){.zb-ritual-grid{grid-template-columns:repeat(3,1fr);}}
.zb-ritual-media img{width:100%;height:auto;border-radius:14px;display:block;aspect-ratio:1/1;object-fit:cover;margin-bottom:16px;}
.zb-ritual-index{font-family:var(--font-serif);font-style:italic;font-size:18px;color:var(--terra);display:block;margin-bottom:8px;}
.zb-ritual-step p{font-size:14.5px;color:var(--ink);margin:0;line-height:1.55;}
.zb-ritual-closing{font-family:var(--font-serif);font-style:italic;font-size:18px;text-align:center;color:var(--muted);margin:40px auto 0;max-width:44ch;}

/* faq */
.zb-faq-list{margin-top:24px;border-top:1px solid var(--border);}
.zb-faq-item{border-bottom:1px solid var(--border);}
.zb-faq-item summary{display:flex;align-items:center;justify-content:space-between;gap:16px;cursor:pointer;padding:20px 0;font-size:16px;font-weight:500;list-style:none;}
.zb-faq-item summary::-webkit-details-marker{display:none;}
.zb-faq-item summary svg{color:var(--teal);flex:none;transition:transform .2s cubic-bezier(.4,0,.2,1);}
.zb-faq-item[open] summary svg{transform:rotate(180deg);}
.zb-faq-item p{margin:0 0 20px;font-size:15px;color:var(--muted);line-height:1.6;max-width:64ch;}

/* offer */
.zb-offer{background:var(--cream);max-width:none;}
.zb-offer-grid{max-width:1080px;margin:0 auto;display:grid;gap:32px;padding:0 20px;}
@media(min-width:768px){.zb-offer-grid{grid-template-columns:.9fr 1.1fr;align-items:center;gap:48px;padding:0 32px;}}
.zb-offer-media img{width:100%;height:auto;border-radius:20px;display:block;aspect-ratio:4/5;object-fit:cover;}
.zb-offer-eyebrow{font-family:var(--font-serif);font-style:italic;font-size:18px;color:var(--terra);margin:0 0 8px;}
.zb-offer-price{font-family:var(--font-serif);font-size:44px;letter-spacing:-0.02em;margin:16px 0;display:flex;flex-direction:column;gap:8px;}
.zb-offer-price span{font-family:var(--font-sans);font-size:14px;color:var(--muted);line-height:1.5;letter-spacing:0;}
.zb-offer-box{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:20px;margin-bottom:20px;}
.zb-offer-box-title{font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);}
.zb-offer-box ul{list-style:none;margin:12px 0 0;padding:0;}
.zb-offer-box li{display:flex;align-items:center;gap:8px;font-size:14.5px;margin-bottom:10px;}
.zb-offer-box li svg{color:var(--teal);flex:none;}
.zb-offer-guarantee{font-size:14px;color:var(--muted);margin:0 0 24px;max-width:56ch;}

/* CTA — the single turquoise action */
.zb-cta{display:inline-flex;align-items:center;gap:10px;background:var(--teal);color:var(--ink);font-weight:600;font-size:16px;letter-spacing:0.01em;padding:16px 28px;border-radius:20px;text-decoration:none;transition:opacity .15s cubic-bezier(.4,0,.2,1);min-height:44px;}
.zb-cta:hover{opacity:.9;}
.zb-cta:focus-visible{outline:3px solid var(--teal);outline-offset:3px;}

/* under-CTA micro reassurance */
.zb-cta-note{font-size:12.5px;color:var(--muted);margin:12px 0 0;max-width:48ch;line-height:1.6;}

/* multi-variant "choose your size" one-hop grid (Mat) — outlined cards, each an
   own cart permalink; turquoise stays the single action colour (border + action). */
.zb-choices{margin:8px 0 4px;}
.zb-choices-eyebrow{font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin:0 0 12px;}
.zb-choices-grid{display:grid;gap:12px;grid-template-columns:1fr;}
@media(min-width:560px){.zb-choices-grid{grid-template-columns:1fr 1fr;}}
.zb-choice{display:flex;flex-direction:column;gap:6px;background:var(--bg);border:1px solid var(--teal);border-radius:12px;padding:18px 20px;text-decoration:none;color:var(--ink);min-height:44px;transition:opacity .15s cubic-bezier(.4,0,.2,1);}
.zb-choice:hover{opacity:.9;}
.zb-choice:focus-visible{outline:3px solid var(--teal);outline-offset:3px;}
.zb-choice-label{font-family:var(--font-serif);font-style:italic;font-size:18px;}
.zb-choice-price{font-size:13px;color:var(--muted);}
.zb-choice-action{display:inline-flex;align-items:center;gap:8px;margin-top:4px;color:var(--teal);font-weight:600;font-size:14px;letter-spacing:0.01em;}

/* AOV bundle + System bridge — quiet blocks under the primary CTA */
.zb-bundle{margin:20px 0 4px;padding:16px 18px;border:1px dashed var(--border);border-radius:10px;}
.zb-bundle-text{font-size:14.5px;margin:0 0 10px;max-width:52ch;}
.zb-bundle-note{font-size:12.5px;color:var(--muted);margin:10px 0 0;max-width:52ch;line-height:1.6;}
.zb-system-bridge{margin-top:24px;padding-top:18px;border-top:1px solid var(--border);}
.zb-system-bridge p{font-size:14px;color:var(--muted);margin:0 0 10px;max-width:56ch;}

/* mid-page soft anchor — quiet, same-page, not a competing CTA */
.zb-softlink{display:inline-flex;align-items:center;gap:6px;margin-top:20px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--terra);text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:4px;}

/* sticky mini-CTA bar */
.zb-sticky{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;align-items:center;gap:12px;padding:12px 16px;padding-bottom:max(12px, env(safe-area-inset-bottom));background:rgba(255,255,255,0.97);border-top:1px solid var(--border);transform:translateY(110%);transition:transform .3s cubic-bezier(.4,0,.2,1);}
.zb-sticky.is-on{transform:none;}
.zb-sticky-info{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;}
.zb-sticky-name{font-family:var(--font-serif);font-style:italic;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.zb-sticky-price{font-size:12px;color:var(--muted);}
.zb-cta--sticky{padding:12px 20px;font-size:14px;border-radius:10px;flex:none;}
@media(prefers-reduced-motion:reduce){.zb-sticky{transition:none;}}

/* footer */
.zb-footer{border-top:1px solid var(--border);padding:48px 20px;max-width:1080px;margin:0 auto;text-align:center;}
.zb-footer-echoes{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-bottom:24px;}
.zb-footer-echoes span{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--ink);}
.zb-footer-echoes svg{color:var(--teal);}
.zb-footer-legal{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-bottom:20px;}
.zb-footer-legal a{font-size:13px;color:var(--muted);text-decoration:none;}
.zb-footer-legal a:hover{color:var(--ink);}
.zb-footer-smallprint{font-size:11.5px;color:var(--muted);max-width:70ch;margin:0 auto;line-height:1.6;}

/* Paid lander rule: content is always visible — never JS-gate visibility on the
   money page (a former reveal-on-scroll system hid sections at opacity:0 until
   IntersectionObserver fired; slow in-app browsers saw blank sections). */
@media(prefers-reduced-motion:reduce){.zb-research summary svg,.zb-faq-item summary svg{transition:none;}}
`;
