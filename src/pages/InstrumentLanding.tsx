import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/zential/v2/PageShell";
import { InlinePrimer, ExitIntentPrimer } from "@/components/zential/LeadCapture";
import { RatingBadge, InstrumentProofSection } from "@/components/zential/InstrumentProof";
import { TrustBadges } from "@/components/zential/TrustBadges";
import { TrustpilotProof } from "@/components/zential/TrustpilotProof";
import { useHeroVariant } from "@/lib/heroVariant";
import { buyUrl } from "@/lib/checkout";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/market";
import { trackAddToCart } from "@/lib/google-tracking";

import heroFace from "@/assets/hero-neck-device.webp";
import heroBelt from "@/assets/belt-pdp-hero.png";
import heroMat from "@/assets/hero-restore-mat.webp";
import edWakingHand from "@/assets/editorial/waking-hand.webp";
import edThreeVessels from "@/assets/editorial/three-vessels.webp";
import edSeatedCalm from "@/assets/editorial/seated-calm.webp";
import edMatBedGlow from "@/assets/editorial/mat-bed-glow.webp";
import edBeltWorn from "@/assets/belt-who.png";

/**
 * /instruments/:slug — full editorial product landing pages, ported from the
 * Claude Design prototypes (landing/{face-introducer,restoration-belt,restoration-mat}.html).
 * Shared layout, per-instrument config, real prices + real Shopify checkout.
 *
 * Display names match the Shopify product titles + handles (the real catalog
 * products). The Restoration Mat is the 660nm red + far-infrared mat handle (NO
 * 850nm) — the design's 850nm mat claims were corrected here to match the actual
 * product. The Restoration Belt is the 660 + 850nm waist/shoulder belt handle
 * (accurate). Prices: live Shopify price when fetched, config fallback otherwise.
 */

interface Badge { label: string; sub?: string; }
interface Stage { n: string; title: string; body: string; }
interface Spec { k: string; v: string; }
interface Faq { q: string; a: string; }

interface InstrumentConfig {
  slug: string;
  num: string;
  name: string;
  handle: string;
  price: string;
  priceAnchor?: string;
  seoTitle: string;
  seoDescription: string;
  heroImg: string;
  heroAlt: string;
  hero: { l1: string; l2pre: string; accent: string };
  /** Concrete A/B challenger headline (cold-traffic clarity). Optional. */
  heroConcrete?: string;
  lede: string;
  trust: string[];
  /** Single-variant instruments only: numeric Shopify variant id for the
   *  no-JS fallback cart permalink. Buy CTAs prerender as working checkout
   *  anchors; hydrated JS upgrades them to the market-currency cart flow. */
  directVariantId?: string;
  modLabel: string;
  badges: Badge[];
  who: { h2: string; paras: string[]; kicker: string; img: string; imgAlt: string };
  mech: { h2: string; lede: string; stages: Stage[]; disclaimer: string };
  divider: { img: string; imgAlt: string; quote: string; src: string };
  specs: Spec[];
  orderNote: string;
  guarantee: string;
  faq: Faq[];
}

const CONFIGS: Record<string, InstrumentConfig> = {
  "face-introducer": {
    slug: "face-introducer",
    num: "01",
    name: "The Face Introducer",
    handle: "lifting-and-tightening-face-introducer",
    price: "€88",
    priceAnchor: "A single clinic facial runs about €120. This is €88, once.",
    seoTitle: "The Face Introducer · Clinic current, your own hands | Zential Pure",
    seoDescription:
      "EMS, microcurrent and thermal — three clinic modalities calibrated into a twelve-minute ritual you run yourself. €88. Once.",
    heroImg: heroFace,
    heroAlt: "The Face Introducer held to the jaw, warm light along the neck",
    hero: { l1: "The clinic, in your", l2pre: "", accent: "own hands." },
    heroConcrete: "Three clinic modalities. One €88 device. Twelve minutes.",
    lede:
      "EMS, microcurrent and thermal — the three inputs a facialist charges you by the session, calibrated into a twelve-minute ritual you run yourself.",
    trust: ["30-day money-back guarantee", "Ships in 48 hours", "12-minute ritual"],
    // Verified 2026-07-18: variant 51731419922775 = Face Introducer €88 (live products.json).
    directVariantId: "51731419922775",
    modLabel: "Three modalities",
    badges: [
      { label: "EMS" },
      { label: "Microcurrent" },
      { label: "Thermal" },
    ],
    who: {
      h2: "You stopped booking clinic facials.",
      paras: [
        "Not because they stopped working. Because €120 a session, every three weeks, indefinitely, is a math that never closes.",
        "The Face Introducer runs three modalities in one device. EMS for the muscle. Microcurrent for tone. Thermal for absorption. Twelve minutes. €88, once.",
      ],
      kicker: "Clinic precision. Daily ritual.",
      img: edWakingHand,
      imgAlt: "Morning light on skin",
    },
    mech: {
      h2: "Prime. Stimulate. Renew.",
      lede: "One twelve-minute pass moves through three stages, in the order tissue responds to them.",
      stages: [
        { n: "01", title: "Prime", body: "Gentle thermal warmth raises surface temperature and relaxes the muscle, opening the field before any current is introduced." },
        { n: "02", title: "Stimulate", body: "EMS engages the larger muscle; microcurrent works the fine fibres beneath the skin. Together they support tone and lift with consistent use." },
      ],
      disclaimer:
        "Zential Pure instruments support the skin's own processes. They are not medical devices and do not diagnose, treat or cure any condition. Results build with consistent use and vary between people.",
    },
    divider: { img: edThreeVessels, imgAlt: "Three vessels in warm light", quote: "Bring the appointment home.", src: "Protocol 01 · The Face Introducer" },
    specs: [
      { k: "Modalities", v: "EMS · Microcurrent · Thermal · LED" },
      { k: "Session", v: "12 minutes" },
      { k: "LED wavelength", v: "630–660 nm" },
      { k: "Power", v: "Cordless · USB-C · ~14-day charge" },
      { k: "In the box", v: "Device · Conductive gel · Protocol Card" },
      { k: "Warranty", v: "2 years" },
    ],
    orderNote: "No subscription. No cartridge to refill. The conductive gel refill is €12 when you need it.",
    guarantee:
      "Run the ritual for a month. If it is not part of your evenings, send it back for a full refund. No friction. No questions.",
    faq: [
      { q: "How is this different from the clinic device I used?", a: "It uses the same modality families, dosed for unsupervised daily use rather than a single high-intensity appointment. You trade peak intensity for consistency — which is where the skin actually responds." },
      { q: "How long until I see something?", a: "Most people notice firmness and a calmer tone within four to six weeks of the twelve-minute ritual, five days a week. We say visibly, with consistent use — never overnight, never guaranteed." },
      { q: "Is the €88 the whole cost?", a: "Yes. €88, once. There is no subscription and nothing to unlock. The only recurring item is the conductive gel, refillable for €12 when a tube runs out." },
      { q: "Can I use it with my serums?", a: "Use the conductive gel during the session for clean current transfer, then apply your own serums afterward onto primed skin. Avoid active acids in the same twelve minutes." },
      { q: "What if it is not for me?", a: "The 30-day money-back guarantee covers exactly that. Run it for a month; if it does not earn its place, return it for a full refund." },
    ],
  },

  "restoration-belt": {
    slug: "restoration-belt",
    num: "02",
    name: "The Restoration Belt",
    handle: "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
    price: "€180",
    priceAnchor: "A recovery-room membership runs about €75 a month. The Belt is €180, once — and it doesn't close at 9pm.",
    seoTitle: "The Restoration Belt · Recovery, worn close | Zential Pure",
    seoDescription:
      "A contoured thermal wrap that holds sustained warmth — and 660nm red and 850nm near-infrared light — against the working muscle. The recovery room, narrowed to the span of your lower back.",
    heroImg: heroBelt,
    heroAlt: "The Restoration Belt worn across the lower back, red light through the array",
    hero: { l1: "Recovery,", l2pre: "worn ", accent: "close." },
    lede:
      "A contoured thermal wrap that holds sustained warmth — and 660nm red and 850nm near-infrared light — against the working muscle. The recovery room, narrowed to the span of your lower back. Fifteen minutes.",
    trust: ["30-day money-back guarantee", "Cordless · ships in 48 hours", "15-minute ritual"],
    // Verified 2026-07-19: variant 53502319755607 = Restoration Belt €180, single variant.
    directVariantId: "53502319755607",
    modLabel: "Four mechanisms",
    badges: [
      { label: "Thermal", sub: "sustained" },
      { label: "Near-Infrared", sub: "850nm" },
      { label: "Red LED", sub: "660nm" },
      { label: "Contour Wrap" },
    ],
    who: {
      h2: "The work was hours ago. The tightness stayed.",
      paras: [
        "You train, or you sit, or both — and the lower back holds the bill. The recovery room helps, but it is across town and open when you are not.",
        "The Restoration Belt holds sustained warmth against the muscle that did the work, with 660nm red and 850nm near-infrared running underneath it. You read, you cook, you keep moving. The instrument works where the load was.",
      ],
      kicker: "Keep the muscle warm where the work was.",
      img: edBeltWorn,
      imgAlt: "The Restoration Belt worn at the lower back, red light glowing through the thermal wrap",
    },
    mech: {
      h2: "Warm. Circulate. Recover.",
      lede: "A warm contact surface and two wavelengths — ordered honestly, strongest evidence first.",
      stages: [
        { n: "01", title: "Warm", body: "The wrap holds sustained warmth against the muscle, raising local blood flow and keeping the tissue from cooling and stiffening after load. Of everything this instrument does, the warmth is the part with the most evidence behind it." },
        { n: "02", title: "Circulate", body: "Warmth and pressure together support local circulation — the body's own delivery system for recovery — and hold the light in contact while they do." },
        { n: "03", title: "Recover", body: "660nm and 850nm sit inside the wavelength band studied for muscle fatigue and exertion recovery. That research is real, and it is modest — very low to moderate quality, pooled across laser and LED. We would rather tell you the true size of it than oversell it." },
      ],
      disclaimer:
        "Zential Pure instruments support the body's own processes. They are not medical devices and do not diagnose, treat or cure any condition, including pain or injury. Our light is LED — it works at the skin and the tissue just beneath it. Claims of red light working at muscle depth come from clinical laser studies, which use a different instrument with a different evidence base. Results build with consistent use and vary between people.",
    },
    divider: { img: edSeatedCalm, imgAlt: "Seated in calm morning light", quote: "The recovery room, the width of your back.", src: "Protocol 02 · The Restoration Belt" },
    specs: [
      { k: "Mechanisms", v: "Red LED · Near-IR · Thermal · Wrap" },
      { k: "Session", v: "15 minutes" },
      { k: "Wavelengths", v: "660 nm · 850 nm" },
      { k: "Fit", v: "Contoured wrap · 28–48 in waist" },
      { k: "Power", v: "Cordless · USB-C · ~10 sessions / charge" },
      { k: "Warranty", v: "2 years" },
    ],
    orderNote: "No subscription. Cordless, so the only thing it needs from you is fifteen minutes.",
    guarantee:
      "Wear it for a month. If it does not become part of how you recover, send it back for a full refund. No friction. No questions.",
    faq: [
      { q: "Where can I wear it?", a: "The contoured wrap is built for the lower back and core, and adjusts to wrap a shoulder, thigh or calf. Anywhere you can hold the panel flat against the muscle." },
      { q: "Why both 660nm and 850nm?", a: "They sit at different points in the 655–950nm band that has been studied for muscle fatigue and exertion recovery. We are not going to claim our LEDs work at muscle depth — that belongs to clinical lasers, a different instrument with a different evidence base. The warmth is what works the muscle. The light is the layer underneath it." },
      { q: "Should I use it before or after training?", a: "Both work, and before is the half most people skip. The light research in this band is most consistent when it is applied before exertion rather than after. Warm the tissue, then work." },
      { q: "Does it get hot?", a: "It runs warm by design — sustained thermal contact is the primary mechanism, not a comfort feature — never hot. The warmth holds steady through the fifteen-minute session and shuts off on its own." },
      { q: "Can I move while wearing it?", a: "Yes. It is cordless and strapped close, so you can cook, read or stretch through a session. Save anything high-impact for after." },
      { q: "What if it is not for me?", a: "The 30-day money-back guarantee covers exactly that. Wear it for a month; if it does not earn its place, return it for a full refund." },
    ],
  },

  "restoration-mat": {
    slug: "restoration-mat",
    num: "03",
    name: "The Restoration Mat",
    handle: "the-restoration-mat",
    price: "from €200",
    priceAnchor: "A single infrared-sauna session is about €40. The Mat is from €200, once, and it lives under your bed.",
    seoTitle: "The Restoration Mat · The whole system, laid down | Zential Pure",
    seoDescription:
      "A 100 × 40 cm bed of 660nm red light and far-infrared heat (120 × 40 cm in the longer size). You lie down, the array does the rest, and the nervous system gets twenty minutes it does not usually get.",
    heroImg: heroMat,
    heroAlt: "The Restoration Mat in use, red light array glowing under the body",
    hero: { l1: "The whole system,", l2pre: "laid ", accent: "down." },
    lede:
      "A 100 × 40 cm bed of 660nm red light and far-infrared heat — 120 × 40 cm in the longer size. You lie down, the array does the rest, and the nervous system gets twenty minutes it does not usually get.",
    trust: ["30-day money-back guarantee", "Rolls flat · ships in 48 hours", "20-minute ritual"],
    modLabel: "Four mechanisms",
    badges: [
      { label: "Red LED", sub: "660nm" },
      { label: "Far-Infrared" },
      { label: "Wide-Field Array" },
      { label: "Thermal" },
    ],
    who: {
      h2: "Your system never gets told the day is over.",
      paras: [
        "The training, the screens, the low background hum of being switched on — it accumulates, and the body keeps a tab. Handheld tools work on one spot at a time. A field works on a whole region at once.",
        "The Restoration Mat is a 100 × 40 cm panel of red light and far-infrared warmth — 120 × 40 cm in the longer size. It is sized to the back of the torso, not head to heel: you lie on it where the day landed, and for twenty minutes the only instruction is horizontal. Across the panel, the dose is even.",
      ],
      kicker: "Twenty horizontal minutes.",
      img: edMatBedGlow,
      imgAlt: "The Restoration Mat unrolled on a bed at dusk, red light array glowing",
    },
    mech: {
      h2: "Settle. Saturate. Restore.",
      lede: "A wide field of light and warmth, paced to the way the system actually winds down.",
      stages: [
        { n: "01", title: "Settle", body: "You lie flat and the gentle thermal warmth begins the downshift — the cue the body reads as permission to stop bracing." },
        { n: "02", title: "Saturate", body: "The array delivers 660nm red light and far-infrared warmth evenly across everything it touches — a whole region at a time, not one spot at a time." },
        { n: "03", title: "Restore", body: "The wavelength studied for supporting cellular recovery, dosed across a wide field and timed for the evening wind-down." },
      ],
      disclaimer:
        "Zential Pure instruments support the body's own processes. They are not medical devices and do not diagnose, treat or cure any condition, including sleep or recovery disorders. Results build with consistent use and vary between people.",
    },
    divider: { img: edSeatedCalm, imgAlt: "A calm, light-filled moment of rest", quote: "Recovery is a place you lie down.", src: "Protocol 03 · The Restoration Mat" },
    specs: [
      { k: "Mechanisms", v: "Red LED · Far-IR · Thermal" },
      { k: "Session", v: "20 minutes" },
      { k: "Wavelength", v: "660 nm red + far-infrared" },
      { k: "Surface", v: "100 × 40 cm or 120 × 40 cm · rolls flat to store" },
      { k: "Power", v: "Mains · remote · auto shut-off" },
      { k: "Warranty", v: "2 years" },
    ],
    orderNote: "No subscription. Rolls flat between sessions and asks for nothing but the twenty minutes.",
    guarantee:
      "Lie down for a month of evenings. If it does not earn its place, send it back for a full refund. No friction. No questions.",
    faq: [
      { q: "How big is it, and where does it live?", a: "Two sizes: 100 × 40 cm, or 120 × 40 cm in the longer version — a panel sized to the back of the torso, not a head-to-toe bed. It rolls flat: unroll it on a bed, a sofa or the floor for the session, then roll it away. It does not need a dedicated corner." },
      { q: "Front of the body or back?", a: "You lie on it, so the array works the back of the body — where most tension is held. Turn over for the last few minutes if you want the front." },
      { q: "When in the day should I use it?", a: "Most people run it in the evening as a wind-down before sleep. It works any time you can give it twenty horizontal minutes." },
      { q: "Why does it cost what it does?", a: "It carries a dense array of red light and far-infrared heat in a format that rolls away between sessions. The Restoration Mat is from €200, once — the price reflects the panel, not a subscription." },
      { q: "What if it is not for me?", a: "The 30-day money-back guarantee covers exactly that. Use it for a month; if it does not earn its place, return it for a full refund." },
    ],
  },
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PILL =
  "inline-flex items-center justify-center gap-[9px] font-sans font-semibold text-[12px] tracking-[0.18em] uppercase rounded-full px-[30px] py-4 leading-none whitespace-nowrap transition-colors duration-200 cursor-pointer disabled:opacity-60";
const PILL_ACTION = `${PILL} bg-[#F69251] text-[#1A1714] hover:bg-[#E87A38]`;
const PILL_GHOST_DARK = `${PILL} bg-transparent text-[#F7F4F0] border border-[rgba(247,244,240,0.28)] hover:border-[#2ED8A8] hover:text-[#2ED8A8]`;
const PILL_BRAND = `${PILL} bg-[#2ED8A8] text-[#1A1714] hover:bg-[#1BAF86]`;
const PILL_GHOST_LIGHT = `${PILL} bg-transparent text-[#1A1714] border border-[rgba(26,23,20,0.28)] hover:border-[#157A5C] hover:text-[#157A5C]`;
const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";

function Eyebrow({ num, children, tone = "dark" }: { num: string; children: string; tone?: "dark" | "meta" }) {
  const color = tone === "dark" ? "text-[#2ED8A8]" : "text-[#6B5A4A]";
  return (
    <p className={`inline-flex items-center gap-[14px] font-sans text-[11px] tracking-[0.28em] uppercase ${color}`}>
      <span className="tabular-nums opacity-55">( {num} )</span>
      <span className="inline-block h-px w-[26px] bg-current opacity-40" />
      {children}
    </p>
  );
}

export default function InstrumentLanding() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const [livePrice, setLivePrice] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  // Bridge-funnel continuity: arriving with ?discount= shows a quiet founding
  // strip so the promise made on the bridge is visibly kept. No param, no strip.
  const [arrivalCode, setArrivalCode] = useState<string | null>(null);
  useEffect(() => {
    try {
      setArrivalCode(new URLSearchParams(window.location.search).get("discount"));
    } catch { /* never break the PDP */ }
  }, []);
  // Allowlist of campaign codes we render into the strip (URL param is
  // user-controlled — never echo arbitrary text into brand UI). Deliberately NO
  // percentage claims here: code validity/rate lives in Shopify and drifts.
  // New campaign code → add it here or the arrival strip stays hidden.
  const knownArrival =
    arrivalCode && ["PROTOCOL10", "RITUAL15", "PRACTICE20"].includes(arrivalCode.toUpperCase())
      ? arrivalCode.toUpperCase()
      : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onScroll() {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 260;
      setShowSticky(y > window.innerHeight * 0.6 && !nearBottom);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cfg = slug ? CONFIGS[slug] : undefined;
  const heroVariant = useHeroVariant(slug ?? "", !!cfg?.heroConcrete);

  useEffect(() => {
    if (!cfg) return;
    let active = true;
    fetchProductByHandle(cfg.handle)
      .then((p) => {
        if (!active) return;
        const priceObj = p?.variants?.edges?.[0]?.node?.price;
        const amt = priceObj?.amount;
        if (amt) {
          const n = parseFloat(amt);
          if (!isNaN(n)) setLivePrice(formatMoney(Math.round(n), priceObj?.currencyCode || "EUR"));
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, [cfg]);

  if (!cfg) return <Navigate to="/instruments" replace />;

  // Show the live, market-formatted Shopify price once it resolves. Until then
  // an em-dash placeholder — never the hardcoded €-config price, which would be
  // the wrong currency for a US visitor. cfg.price stays as SSR/SEO metadata and
  // as the cross-sell teaser price for the *other* instruments below.
  const priceLabel = livePrice ?? "—";

  async function order() {
    if (!cfg || ordering) return;
    setOrdering(true);
    try {
      const p = await fetchProductByHandle(cfg.handle);
      const variant = p?.variants?.edges?.[0]?.node;
      if (!p || !variant) throw new Error("no variant");
      await addItem({
        product: { node: p.node },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      const w = window as unknown as { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };
      if (w.fbq) w.fbq("track", "AddToCart", { content_name: cfg.name, content_ids: [variant.id], content_type: "product" });
      if (w.gtag) w.gtag("event", "add_to_cart", { item_name: cfg.name, experiment_id: `hero_${cfg.slug}`, variant: heroVariant });
      // Google Ads (dormant unless VITE_GOOGLE_ADS_ID is set)
      trackAddToCart({ id: cfg.handle, name: cfg.name, price: parseFloat(variant.price.amount), currency: variant.price.currencyCode });
      let url = useCartStore.getState().getCheckoutUrl();
      if (url) {
        // Bridge-funnel continuity: forward ?discount= into Shopify checkout so
        // the founding code applies without the customer typing anything.
        try {
          const disc = new URLSearchParams(window.location.search).get("discount");
          if (disc) url += (url.includes("?") ? "&" : "?") + "discount=" + encodeURIComponent(disc);
        } catch { /* never block checkout */ }
        window.location.href = buyUrl(url);
        return;
      }
      navigate(`/product/${cfg.handle}`);
    } catch {
      navigate(`/product/${cfg.handle}`);
    } finally {
      setOrdering(false);
    }
  }

  const orderLabel = ordering ? "Adding…" : "Claim a founding place";
  const others = Object.values(CONFIGS).filter((c) => c.slug !== cfg.slug);

  // No-JS fallback purchase path for single-variant instruments: the CTA is a
  // real anchor into checkout (EUR permalink, discount forwarded) that works
  // before hydration; with JS, onClick upgrades it to the market-currency cart
  // flow via order(). Multi-variant instruments keep the plain button.
  const fallbackHref = cfg.directVariantId
    ? `https://checkout.zentialpure.com/cart/${cfg.directVariantId}:1${arrivalCode ? `?discount=${encodeURIComponent(arrivalCode)}` : ""}`
    : undefined;
  const OrderCta = ({ className, children }: { className: string; children: React.ReactNode }) =>
    fallbackHref ? (
      <a
        href={fallbackHref}
        className={className}
        aria-disabled={ordering}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          void order();
        }}
      >
        {children}
      </a>
    ) : (
      <button onClick={order} disabled={ordering} className={className}>
        {children}
      </button>
    );

  return (
    <PageShell title={cfg.seoTitle} description={cfg.seoDescription} canonical={`https://zentialpure.com/instruments/${cfg.slug}`} hideHero>
      {knownArrival && (
        <div
          style={{
            background: "#F7F4F0",
            borderBottom: "1px solid #eae7e0",
            padding: "10px 16px",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#1A1714",
          }}
        >
          <span style={{ color: "#2ED8A8", marginRight: 8 }}>✓</span>
          Founding code {knownArrival} active — applied automatically at checkout. 30-day full refund, free EU shipping.
        </div>
      )}
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={WRAP}>
          <div className="grid items-stretch md:grid-cols-[1.04fr_0.96fr] md:min-h-[640px]">
            <div className="relative z-[3] flex flex-col justify-center py-12 md:py-[74px] md:pr-14">
              <Eyebrow num={cfg.num}>{cfg.name}</Eyebrow>
              <h1 className="my-6 font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(44px,5.6vw,86px)]">
                {heroVariant === "concrete" && cfg.heroConcrete ? (
                  cfg.heroConcrete
                ) : (
                  <>
                    {cfg.hero.l1}
                    <br />
                    {cfg.hero.l2pre}
                    <span className="text-[#2ED8A8]">{cfg.hero.accent}</span>
                  </>
                )}
              </h1>
              <p className="mb-8 max-w-[500px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">{cfg.lede}</p>
              <div className="mb-[30px] flex flex-wrap gap-[14px]">
                <OrderCta className={PILL_ACTION}>
                  {orderLabel} <span className="font-medium tabular-nums opacity-70">· {priceLabel}</span>
                </OrderCta>
                <a href="#science" className={PILL_GHOST_DARK}>See the science</a>
              </div>
              <div className="mb-7 flex flex-wrap gap-x-[26px] gap-y-[10px]">
                {cfg.trust.map((t) => (
                  <span key={t} className="inline-flex items-center gap-[9px] font-sans text-[11px] text-[#F7F4F0]/60 before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#2ED8A8]">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RatingBadge slug={cfg.slug} />
              </div>
            </div>
            <div className="relative order-first min-h-[46vh] overflow-hidden md:order-none md:min-h-[640px]">
              <img src={cfg.heroImg} alt={cfg.heroAlt} className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.94)_brightness(0.94)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#1A1714_0%,transparent_24%),linear-gradient(180deg,transparent_52%,rgba(26,23,20,0.5)_100%)]" />
              <div className="absolute bottom-[26px] right-7 z-[2] font-sans text-[9px] tracking-[0.25em] uppercase text-[#F7F4F0]/70">Campaign I · Resonance Series</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALITY BAR ── */}
      <section className="border-y border-[rgba(247,244,240,0.10)] bg-[#070A0E]">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center gap-x-[26px] gap-y-[14px] py-[22px]">
            <span className="mr-1.5 font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/40">{cfg.modLabel}</span>
            {cfg.badges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 rounded-full border border-[#2ED8A8]/[0.34] px-4 py-2 font-sans text-[11px] tracking-[0.14em] uppercase text-[#2ED8A8]">
                {b.label}{b.sub && <span className="tabular-nums tracking-[0.04em] text-[#F7F4F0]/55">{b.sub}</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section className="border-b border-[rgba(26,23,20,0.10)] bg-[#F7F4F0] text-[#1A1714]">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-[18px] font-sans text-[12px] text-[#1A1714]/70">
            {[
              "CE marked · Declaration of Conformity on file",
              "2-year warranty",
              "30-day money-back guarantee",
              "Ships in 48 hours",
              "Registered EU company · Zential Pure B.V., Netherlands",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#157A5C]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR ── */}
      <section className="bg-[#F7F4F0] py-[clamp(76px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow num="02" tone="meta">Who it is for</Eyebrow>
              <h2 className="my-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#1A1714]">{cfg.who.h2}</h2>
              {cfg.who.paras.map((p, i) => (
                <p key={i} className={`text-[17px] leading-[1.75] text-[#1A1714]/[0.66] ${i > 0 ? "mt-[18px]" : ""}`}>{p}</p>
              ))}
              <p className="mt-[26px] font-serif italic text-[21px] text-[#1A1714]">{cfg.who.kicker}</p>
            </div>
            <div className="order-first overflow-hidden rounded-[14px] md:order-none aspect-[16/11] md:aspect-[4/5]">
              <img src={cfg.who.img} alt={cfg.who.imgAlt} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MECHANISM ── */}
      <section id="science" className="bg-[#070A0E] py-[clamp(76px,10vw,120px)] text-[#F7F4F0]">
        <div className={WRAP}>
          <Eyebrow num="03">Mechanism</Eyebrow>
          <h2 className="my-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#F7F4F0]">{cfg.mech.h2}</h2>
          <p className="max-w-[560px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">{cfg.mech.lede}</p>
          <div className="mt-[52px] grid gap-px border border-[rgba(247,244,240,0.10)] bg-[rgba(247,244,240,0.10)] md:grid-cols-3">
            {cfg.mech.stages.map((s) => (
              <div key={s.n} className="bg-[#070A0E] px-[34px] py-10">
                <div className="mb-[22px] font-sans text-[11px] tracking-[0.2em] text-[#F7F4F0]/40">STAGE ( {s.n} )</div>
                <h3 className="mb-[14px] font-serif italic font-normal text-[24px] text-[#2ED8A8]">{s.title}</h3>
                <p className="text-sm leading-[1.7] text-[#F7F4F0]/[0.66]">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-[30px] max-w-[640px] text-xs leading-[1.6] text-[#F7F4F0]/40">{cfg.mech.disclaimer}</p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="relative flex min-h-[clamp(360px,46vw,520px)] items-center overflow-hidden bg-[#1A1714]">
        <img src={cfg.divider.img} alt={cfg.divider.imgAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,0.7)_0%,rgba(7,10,14,0.32)_50%,rgba(7,10,14,0.55)_100%)]" />
        <div className={`relative z-[2] ${WRAP}`}>
          <p className="max-w-[16ch] font-serif italic text-[clamp(26px,3.6vw,46px)] leading-[1.16] text-[#F7F4F0]">{cfg.divider.quote}</p>
          <div className="mt-[22px] font-sans text-[10px] tracking-[0.3em] uppercase text-[#F7F4F0]/55">{cfg.divider.src}</div>
        </div>
      </section>

      {/* ── SPECS + ORDER ── */}
      <section id="order" className="bg-[#EDEAE6] py-[clamp(76px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          <Eyebrow num="04" tone="meta">The instrument</Eyebrow>
          <div className="mt-[34px] grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <ul className="list-none">
              {cfg.specs.map((s, i) => (
                <li key={s.k} className={`flex justify-between gap-6 border-b border-[rgba(26,23,20,0.12)] py-[18px] ${i === 0 ? "border-t" : ""}`}>
                  <span className="pt-0.5 font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5A4A]">{s.k}</span>
                  <span className="max-w-[60%] text-right text-[15px] text-[#1A1714]">{s.v}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-[14px] border border-[rgba(26,23,20,0.12)] bg-white p-[38px] shadow-[0_18px_50px_rgba(26,23,20,0.08)] md:sticky md:top-[88px]">
              <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5A4A]">{cfg.name}</div>
              <div className="mb-0.5 mt-2 font-serif italic text-[60px] leading-none text-[#1A1714]">{priceLabel}</div>
              <div className="font-serif italic text-[20px] text-[#C6A07C]">Once.</div>
              {cfg.priceAnchor && <p className="mt-3 text-[13px] leading-[1.55] text-[#157A5C]">{cfg.priceAnchor}</p>}
              <p className="my-[22px] text-[13px] leading-[1.6] text-[#1A1714]/60">{cfg.orderNote}</p>
              <OrderCta className={`${PILL_ACTION} mb-3 w-full`}>{orderLabel}</OrderCta>
              <a href="#science" className={`${PILL_GHOST_LIGHT} w-full`}>Read the mechanism</a>
              <div className="mt-[18px] flex justify-center"><TrustpilotProof variant="pdp" /></div>
              <p className="mt-[18px] border-t border-[rgba(26,23,20,0.12)] pt-[18px] text-xs leading-[1.6] text-[#1A1714]/60"><b className="font-medium text-[#1A1714]">30-day money-back guarantee.</b> {cfg.guarantee}</p>
            </div>
          </div>
          <TrustBadges cordless={cfg.slug !== "restoration-mat"} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F4F0] py-[clamp(76px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          <Eyebrow num="05" tone="meta">Before you order</Eyebrow>
          <h2 className="mb-[34px] mt-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] text-[#1A1714]">Questions, answered plainly.</h2>
          <div className="max-w-[780px]">
            {cfg.faq.map((f, i) => (
              <details key={i} className="group border-b border-[rgba(26,23,20,0.12)] first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] text-[#1A1714] transition-colors hover:text-[#157A5C] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg className="shrink-0 transition-transform duration-300 group-open:rotate-45" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    <line x1="2" y1="11" x2="20" y2="11" stroke="#6B5A4A" strokeWidth="1.5" />
                    <line x1="11" y1="2" x2="11" y2="20" stroke="#6B5A4A" strokeWidth="1.5" />
                  </svg>
                </summary>
                <div className="max-w-[62ch] pb-[26px] text-[15px] leading-[1.75] text-[#1A1714]/[0.66]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <InstrumentProofSection slug={cfg.slug} num="06" />

      {/* ── LEAD PRIMER (inline) ── */}
      <InlinePrimer slug={cfg.slug} />

      {/* ── FOUNDING 100 ── */}
      <section className="bg-[#1A1714] py-[clamp(76px,10vw,120px)] text-[#F7F4F0]">
        <div className={WRAP}>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <div>
              <Eyebrow num="07">Founding cohort</Eyebrow>
              <h2 className="my-5 font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] text-[#F7F4F0]">The first buyers set the protocol.</h2>
              <p className="text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">Founding members buy at the launch price, get first access to new instruments, and a direct line to the people calibrating the protocols.</p>
            </div>
            <div className="relative overflow-hidden rounded-[14px] border border-[rgba(247,244,240,0.10)] bg-[#070A0E] p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_80%_0%,rgba(46,216,168,0.12),transparent_65%)]" />
              <div className="relative z-[2] flex flex-col gap-2.5">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#F7F4F0]/50">What founding means</span>
                {["Launch price, no subscription", "30-day full refund, any reason", "2-year warranty", "Direct line to the protocol team"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 font-sans text-[13px] text-[#F7F4F0]/[0.78] before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#2ED8A8]">{t}</span>
                ))}
              </div>
              <OrderCta className={`${PILL_BRAND} relative z-[2] mt-7`}>{orderLabel}</OrderCta>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE THE SYSTEM ── */}
      <section className="bg-[#EDEAE6] py-[clamp(76px,10vw,120px)] text-[#1A1714]">
        <div className={WRAP}>
          <Eyebrow num="08" tone="meta">Complete the system</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 className="max-w-[18ch] font-serif italic font-normal text-[clamp(28px,3.4vw,42px)] leading-[1.1] text-[#1A1714]">Three instruments, one protocol.</h2>
            <p className="max-w-[44ch] text-[15px] leading-[1.7] text-[#1A1714]/[0.66]">Face, body, full rest. Each instrument works alone — together they cover the whole day. The complete System runs €399.</p>
          </div>
          <div className="mt-[44px] grid gap-px border border-[rgba(26,23,20,0.12)] bg-[rgba(26,23,20,0.12)] md:grid-cols-2">
            {others.map((o) => (
              <a key={o.slug} href={`/instruments/${o.slug}`} className="group flex flex-col bg-[#EDEAE6] transition-colors hover:bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={o.heroImg} alt={o.heroAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col px-7 py-[26px]">
                  <div className="font-serif italic text-[24px] text-[#1A1714]">{o.name}</div>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-[#1A1714]/[0.6]">{o.lede}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-serif italic text-[20px] text-[#C6A07C]">{o.price}</span>
                    <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#157A5C]">View instrument →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="/instruments" className={PILL_BRAND}>See the full System</a>
            <span className="font-sans text-[12px] text-[#1A1714]/55">Founding bundle pricing held for the first hundred.</span>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY ORDER BAR ── */}
      <div className={`fixed inset-x-0 bottom-0 z-[90] flex items-center justify-between gap-4 border-t border-[rgba(247,244,240,0.10)] bg-[rgba(7,10,14,0.92)] px-5 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${showSticky ? "translate-y-0" : "translate-y-full"} [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]`}>
        <div>
          <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-[#F7F4F0]/70">{cfg.name.replace("The ", "")}</div>
          <div className="font-serif italic text-[22px] leading-none text-[#F7F4F0]">{priceLabel}</div>
        </div>
        <OrderCta className={`${PILL_ACTION} px-6 py-3.5`}>{ordering ? "Adding…" : "Claim place"}</OrderCta>
      </div>

      <ExitIntentPrimer slug={cfg.slug} />
    </PageShell>
  );
}
