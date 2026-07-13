import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";

/* /one-shelf — gamified video lander for the "One Shelf" UGC film.
   Watch the day (or tap the cards): each ritual beat unlocks a card;
   collecting all three reveals The System offer. Campaign lander for
   paid/social traffic — noindex, no site chrome. */

const VIDEO_SRC = "/one-shelf/one-shelf-56s.mp4";
const POSTER_SRC = "/one-shelf/poster.jpg";
// Direct cart permalink — the System bundle is not published to the headless
// Storefront-API channel, so the PDP route can't render it (same reason the
// homepage SystemBundle section uses this permalink). Variant: live bundle.
const CTA_HREF = "https://checkout.zentialpure.com/cart/53870945567063:1";
const BUNDLE_HANDLE = "the-system-founding-bundle";
const STORAGE_KEY = "zp-one-shelf-collected";

const TEAL = "#2ed8a8";

type Ritual = {
  id: string;
  label: string;
  minutes: number;
  device: string;
  blurb: string;
  href: string;
  /** second in the film where this ritual's beat starts */
  beat: number;
};

const RITUALS: Ritual[] = [
  {
    id: "morning",
    label: "Morning",
    minutes: 12,
    device: "The Face Introducer",
    blurb: "Microcurrent, warmth and red light — while the coffee brews.",
    href: "/instruments/face-introducer",
    beat: 13,
  },
  {
    id: "evening",
    label: "Evening",
    minutes: 15,
    device: "The Restoration Belt",
    blurb: "Red light at the surface, near-infrared deeper. Cordless.",
    href: "/instruments/restoration-belt",
    beat: 25,
  },
  {
    id: "night",
    label: "Night",
    minutes: 20,
    device: "The Restoration Mat",
    blurb: "Full-body red light and far-infrared warmth. Rolls flat under the bed.",
    href: "/instruments/restoration-mat",
    beat: 35,
  },
];

function loadCollected(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function OneShelf() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [collected, setCollected] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState(true);
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);
  // Market-correct bundle pricing (US sees USD via Dynamic FX). EUR fallback.
  const [price, setPrice] = useState("€399");
  const [wasPrice, setWasPrice] = useState("€468");
  const [priceValue, setPriceValue] = useState(399);
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    let active = true;
    fetchProductByHandle(BUNDLE_HANDLE)
      .then((p) => {
        const v = p?.variants?.edges?.[0]?.node;
        const amount = v?.price?.amount ? parseFloat(v.price.amount) : NaN;
        if (!active || isNaN(amount)) return;
        const code = v?.price?.currencyCode || "EUR";
        setPrice(formatMoney(amount, code));
        setPriceValue(amount);
        setCurrency(code);
        const was = v?.compareAtPrice?.amount ? parseFloat(v.compareAtPrice.amount) : NaN;
        if (!isNaN(was)) setWasPrice(formatMoney(was, code));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCollected(loadCollected());
  }, []);

  useEffect(() => {
    const staticRobots = document.querySelector('meta[name="robots"]:not([data-rh])');
    const prev = staticRobots?.getAttribute("content") ?? null;
    staticRobots?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (staticRobots && prev) staticRobots.setAttribute("content", prev);
    };
  }, []);

  const unlock = useCallback((id: string) => {
    setCollected((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* private mode — session-only */
      }
      setJustUnlocked(id);
      window.setTimeout(() => setJustUnlocked(null), 900);
      return next;
    });
  }, []);

  const onTimeUpdate = useCallback(() => {
    const t = videoRef.current?.currentTime ?? 0;
    for (const r of RITUALS) {
      if (t >= r.beat) unlock(r.id);
    }
  }, [unlock]);

  const tapRitual = useCallback(
    (r: Ritual) => {
      unlock(r.id);
      const v = videoRef.current;
      if (v && Math.abs(v.currentTime - r.beat) > 1.5) {
        v.currentTime = r.beat;
        v.play().catch(() => {});
      }
    },
    [unlock],
  );

  const count = useMemo(
    () => RITUALS.filter((r) => collected[r.id]).length,
    [collected],
  );
  const complete = count === RITUALS.length;

  return (
    <>
      <Helmet>
        <title>One Shelf — a whole day of recovery | Zential Pure</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#1a1714" />
        <meta
          name="description"
          content="Watch one ordinary day with The System. Collect the three rituals — morning, evening, night."
        />
      </Helmet>

      <style>{`
        .os-page { min-height: 100vh; background: #1a1714; color: #f7f4f0; font-family: "DM Sans", system-ui, sans-serif; }
        .os-wrap { max-width: 480px; margin: 0 auto; padding: 24px 16px 48px; }
        .os-kicker { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: ${TEAL}; margin-bottom: 8px; }
        .os-h1 { font-family: "Lora", serif; font-size: 32px; font-weight: 700; line-height: 1.2; margin: 0 0 8px; }
        .os-sub { font-size: 14px; color: #8a7f74; margin: 0 0 16px; line-height: 1.5; }
        .os-video-box { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid #2a211a; }
        .os-video { display: block; width: 100%; aspect-ratio: 9/16; max-height: 68vh; object-fit: cover; background: #070a0e; }
        .os-unmute { position: absolute; right: 12px; bottom: 12px; z-index: 10; background: rgba(7,10,14,0.72); color: #f7f4f0; border: 1px solid ${TEAL}; border-radius: 9999px; padding: 8px 16px; font-size: 12px; font-weight: 500; cursor: pointer; }
        .os-progress { display: flex; align-items: center; gap: 8px; margin: 16px 0 8px; }
        .os-progress-label { font-size: 12px; color: #8a7f74; letter-spacing: 0.08em; text-transform: uppercase; }
        .os-dots { display: inline-flex; gap: 8px; }
        .os-dot { width: 12px; height: 12px; border-radius: 9999px; border: 2px solid rgba(247,244,240,0.4); transition: all 0.3s cubic-bezier(.4,0,.2,1); }
        .os-dot.on { background: ${TEAL}; border-color: ${TEAL}; }
        .os-cards { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        .os-card { text-align: left; background: #2a211a; border: 1px solid #2a211a; border-radius: 10px; padding: 16px; cursor: pointer; transition: border-color 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1); color: inherit; font: inherit; width: 100%; }
        .os-card.locked { color: #8a7f74; }
        .os-card.open { border-color: ${TEAL}; }
        .os-card.flash { transform: scale(1.02); }
        .os-card-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .os-card-label { font-weight: 700; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; }
        .os-card.open .os-card-label { color: ${TEAL}; }
        .os-card-min { font-size: 12px; color: #8a7f74; }
        .os-card-device { font-family: "Lora", serif; font-size: 18px; margin: 8px 0 4px; color: #f7f4f0; }
        .os-card.locked .os-card-device { color: #8a7f74; }
        .os-card-blurb { font-size: 13px; line-height: 1.5; color: #8a7f74; margin: 0; }
        .os-card-hint { font-size: 12px; color: rgba(247,244,240,0.5); margin-top: 8px; }
        .os-card-link { font-size: 13px; color: ${TEAL}; text-decoration: none; display: inline-block; margin-top: 8px; }
        .os-reveal { margin-top: 24px; background: #2a211a; border: 1px solid ${TEAL}; border-radius: 10px; padding: 24px; text-align: center; animation: os-rise 0.5s cubic-bezier(.4,0,.2,1); }
        .os-reveal-title { font-family: "Lora", serif; font-size: 24px; font-weight: 700; margin: 0 0 4px; }
        .os-reveal-bar { height: 4px; width: 64px; background: ${TEAL}; border-radius: 2px; margin: 8px auto 12px; animation: os-sweep 0.7s cubic-bezier(0,0,.2,1); transform-origin: left center; }
        .os-price { font-size: 28px; font-weight: 700; }
        .os-price-was { font-size: 14px; color: #8a7f74; text-decoration: line-through; margin-left: 8px; }
        .os-save { font-size: 13px; color: ${TEAL}; margin: 4px 0 16px; }
        .os-cta { display: block; background: ${TEAL}; color: #1a1714; font-weight: 700; font-size: 16px; border-radius: 9999px; padding: 14px 24px; text-decoration: none; }
        .os-cta-note { font-size: 12px; color: #8a7f74; margin-top: 12px; line-height: 1.5; }
        .os-locked-note { margin-top: 24px; text-align: center; font-size: 13px; color: #8a7f74; }
        @keyframes os-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes os-sweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) {
          .os-reveal, .os-reveal-bar { animation: none; }
          .os-card, .os-dot { transition: none; }
        }
        @media (min-width: 768px) {
          .os-wrap { max-width: 960px; display: grid; grid-template-columns: 400px 1fr; gap: 32px; align-items: start; padding-top: 48px; }
          .os-head, .os-after { grid-column: 1 / -1; }
          .os-video-col { position: sticky; top: 24px; }
        }
      `}</style>

      <div className="os-page">
        <div className="os-wrap">
          <header className="os-head">
            <p className="os-kicker">Zential Pure</p>
            <h1 className="os-h1">One shelf. One day.</h1>
            <p className="os-sub">
              Watch her day — or tap a ritual to skip ahead. Collect all three.
            </p>
          </header>

          <div className="os-video-col">
            <div className="os-video-box">
              <video
                ref={videoRef}
                className="os-video"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                playsInline
                muted={muted}
                autoPlay
                loop={false}
                onTimeUpdate={onTimeUpdate}
                controls={false}
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.paused ? v.play().catch(() => {}) : v.pause();
                }}
              />
              <button
                type="button"
                className="os-unmute"
                onClick={() => {
                  setMuted((m) => !m);
                  videoRef.current?.play().catch(() => {});
                }}
              >
                {muted ? "Tap for sound" : "Mute"}
              </button>
            </div>
            <div className="os-progress" role="status" aria-live="polite">
              <span className="os-progress-label">
                {complete ? "Day complete" : `${count} of 3 rituals`}
              </span>
              <span className="os-dots" aria-hidden="true">
                {RITUALS.map((r) => (
                  <span key={r.id} className={`os-dot${collected[r.id] ? " on" : ""}`} />
                ))}
              </span>
            </div>
          </div>

          <div className="os-cards">
            {RITUALS.map((r) => {
              const open = !!collected[r.id];
              return (
                <button
                  key={r.id}
                  type="button"
                  className={[
                    "os-card",
                    open ? "open" : "locked",
                    justUnlocked === r.id ? "flash" : "",
                  ].join(" ")}
                  onClick={() => tapRitual(r)}
                  aria-pressed={open}
                >
                  <span className="os-card-top">
                    <span className="os-card-label">{r.label}</span>
                    <span className="os-card-min">{r.minutes} min</span>
                  </span>
                  {open ? (
                    <>
                      <p className="os-card-device">{r.device}</p>
                      <p className="os-card-blurb">{r.blurb}</p>
                      <a
                        className="os-card-link"
                        href={r.href}
                        onClick={(e) => e.stopPropagation()}
                      >
                        See the instrument →
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="os-card-device">?</p>
                      <p className="os-card-hint">
                        Unlocks at the {r.label.toLowerCase()} beat — or tap to skip there.
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="os-after">
            {complete ? (
              <div className="os-reveal">
                <h2 className="os-reveal-title">The System</h2>
                <div className="os-reveal-bar" />
                <p>
                  <span className="os-price">{price}</span>
                  <span className="os-price-was">{wasPrice}</span>
                </p>
                <p className="os-save">All three instruments · one purchase</p>
                <a
                  className="os-cta"
                  href={CTA_HREF}
                  onClick={() => {
                    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
                    w.fbq?.("track", "AddToCart", {
                      content_name: "The System Bundle (one-shelf)",
                      value: priceValue,
                      currency,
                    });
                  }}
                >
                  Build your shelf — {price}
                </a>
                <p className="os-cta-note">
                  30-day protocol guarantee · free EU shipping · 2-year warranty
                </p>
              </div>
            ) : (
              <p className="os-locked-note">
                Collect all three rituals to see what the shelf costs.
              </p>
            )}
          </div>

          <noscript>
            <div style={{ marginTop: 24 }}>
              {RITUALS.map((r) => (
                <p key={r.id}>
                  <strong>{r.label} · {r.minutes} min</strong> — {r.device}. {r.blurb}
                </p>
              ))}
              <a href={CTA_HREF}>The System — all three instruments, one purchase</a>
            </div>
          </noscript>
        </div>
      </div>
    </>
  );
}
