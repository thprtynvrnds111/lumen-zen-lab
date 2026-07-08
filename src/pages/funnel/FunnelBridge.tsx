import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ChevronDown, ArrowRight, ShieldCheck, BadgeCheck, Truck, Lock, Star } from "lucide-react";
import { getBridgeConfig } from "./config";
import { ga4Event, pixelBridgeEngaged, pixelViewContent } from "./tracking";

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

/** Reveal-on-scroll wrapper. Honors prefers-reduced-motion (no transform, instant). */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`zb-reveal ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

const TRUST_ICONS = [BadgeCheck, ShieldCheck, ShieldCheck, ShieldCheck, Lock, Truck];

export default function FunnelBridge() {
  const { slug } = useParams();
  const config = getBridgeConfig(slug) ?? getBridgeConfig("face-introducer")!;

  // Preserve incoming params (fbclid etc.) and append the campaign discount.
  const ctaHref = useMemo(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    params.set("discount", config.discountCode);
    return `${config.pdpPath}?${params.toString()}`;
  }, [config]);

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

  const onCtaClick = (placement: string) => () =>
    ga4Event("bridge_cta_click", { slug: config.slug, discount: config.discountCode, placement });

  // Sticky mini-CTA: appears once she has read past the hero + credibility stack,
  // hides while the real offer block (or footer) is on screen — one purchase path,
  // always within a thumb's reach.
  const offerRef = useRef<HTMLElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [offerOnScreen, setOfferOnScreen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > window.innerHeight * 1.1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = offerRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => setOfferOnScreen(e.isIntersecting)),
        { threshold: 0.05 }
      );
      io.observe(el);
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
          <a href="#credibility" className="zb-scrollcue" aria-label="Read on">
            Read on <ChevronDown size={16} />
          </a>
        </div>
        <div className="zb-hero-media">
          <img src={config.hero.image} alt={config.hero.alt} loading="eager" />
        </div>
      </section>

      {/* 02 · Credibility stack — the signature moment */}
      <section id="credibility" className="zb-section zb-credibility">
        <Reveal>
          <SectionMark n="02" label={config.credibility.eyebrow} />
          <p className="zb-lead">{config.credibility.lead}</p>

          {/* Honest low-count Trustpilot signal — NO score, NO count. */}
          <a
            className="zb-trust-strip"
            href={config.credibility.trustpilot.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="zb-trust-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} fill="#2ED8A8" stroke="#2ED8A8" />
              ))}
            </span>
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
        </Reveal>
      </section>

      {/* 03 · Mechanism before benefit */}
      <section className="zb-section zb-mechanism">
        <Reveal className="zb-mech-grid">
          <div className="zb-mech-copy">
            <SectionMark n="03" label={config.mechanism.eyebrow} />
            <h2 className="zb-display zb-display-sm">{config.mechanism.headline}</h2>
            {config.mechanism.body.map((p, i) => (
              <p className="zb-body" key={i}>{p}</p>
            ))}
            <p className="zb-mech-caption">{config.mechanism.caption}</p>

            <details className="zb-research">
              <summary>
                Read the research <ChevronDown size={16} />
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
        </Reveal>
      </section>

      {/* 04 · The clinic math */}
      <section className="zb-section zb-math">
        <Reveal>
          <SectionMark n="04" label={config.clinicMath.eyebrow} />
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
        </Reveal>
      </section>

      {/* 05 · Social proof narrative */}
      <section className="zb-section zb-social">
        <Reveal>
          <SectionMark n="05" label={config.social.eyebrow} />
          <h2 className="zb-display zb-display-sm">{config.social.headline}</h2>
          <div className="zb-quote-grid">
            {config.social.quotes.map((q) => (
              <figure className="zb-quote" key={q.name}>
                <blockquote>{q.text}</blockquote>
                <figcaption>
                  <span className="zb-quote-name">{q.name}</span>
                  <span className="zb-quote-meta">{q.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 06 · The ritual, shown */}
      <section className="zb-section zb-ritual">
        <Reveal>
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
        </Reveal>
      </section>

      {/* 07 · Objection clearing */}
      <section className="zb-section zb-faq">
        <Reveal>
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
        </Reveal>
      </section>

      {/* 08 · Single offer block — the one purchase-path CTA */}
      <section id="offer" ref={offerRef} className="zb-section zb-offer">
        <Reveal className="zb-offer-grid">
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
            <Link to={ctaHref} className="zb-cta" onClick={onCtaClick("offer")}>
              {config.offer.cta} <ArrowRight size={18} />
            </Link>
            <p className="zb-cta-note">{config.offer.ctaNote}</p>
          </div>
        </Reveal>
      </section>

      {/* Sticky mini-CTA — same single purchase path, thumb-reachable */}
      <div
        className={`zb-sticky ${stickyVisible && !offerOnScreen ? "is-on" : ""}`}
        aria-hidden={!(stickyVisible && !offerOnScreen)}
      >
        <div className="zb-sticky-info">
          <span className="zb-sticky-name">{config.offer.headline}</span>
          <span className="zb-sticky-price">{config.offer.price} · 30-day return</span>
        </div>
        <Link
          to={ctaHref}
          className="zb-cta zb-cta--sticky"
          onClick={onCtaClick("sticky")}
          tabIndex={stickyVisible && !offerOnScreen ? 0 : -1}
        >
          {config.offer.cta}
        </Link>
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
.zb-scrollcue{display:inline-flex;align-items:center;gap:6px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--teal);padding-bottom:4px;}
.zb-hero-media img{width:100%;height:auto;border-radius:20px;display:block;aspect-ratio:4/5;object-fit:cover;}

/* credibility */
.zb-trust-strip{display:flex;align-items:center;gap:16px;flex-wrap:wrap;background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:16px 20px;text-decoration:none;color:var(--ink);margin-bottom:24px;}
.zb-trust-stars{display:inline-flex;gap:2px;}
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

/* social */
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

/* reveal motion — respects reduced motion via JS (Reveal shows instantly) */
.zb-reveal{opacity:0;transform:translateY(16px);transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .5s cubic-bezier(.4,0,.2,1);}
.zb-reveal.is-in{opacity:1;transform:none;}
@media(prefers-reduced-motion:reduce){.zb-reveal{opacity:1;transform:none;transition:none;}.zb-research summary svg,.zb-faq-item summary svg{transition:none;}}
`;
