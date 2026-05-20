import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { useCartStore } from "@/stores/cartStore";

const postPurchaseHrefs = ["/journal/evening-protocol", "/journal/microcurrent-collagen", "/journal"];

export default function ThankYou() {
  const { t } = useTranslation('thankyou');
  const [searchParams] = useSearchParams();
  const orderName = searchParams.get("order_name");
  const email = searchParams.get("email");
  const [mounted, setMounted] = useState(false);
  const { items, clearCart } = useCartStore();

  const ritualTimeline = t('ritualTimeline', { returnObjects: true }) as Array<{ day: string; instruction: string }>;
  const postPurchaseLinks = (t('postPurchaseLinks', { returnObjects: true }) as Array<{ label: string; desc: string }>).map(
    (link, i) => ({ ...link, href: postPurchaseHrefs[i] })
  );

  useEffect(() => {
    const t2 = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t2);
  }, []);

  // Fire purchase events once per order — guard with sessionStorage to prevent duplicate on re-render
  useEffect(() => {
    if (!orderName) return;
    const firedKey = `zp_purchase_fired_${orderName}`;
    if (sessionStorage.getItem(firedKey)) return;
    sessionStorage.setItem(firedKey, '1');

    const totalValue = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
    const w = window as any;

    // Meta Pixel: Purchase
    if (w.fbq) {
      w.fbq('track', 'Purchase', {
        value: totalValue || 88,
        currency: 'EUR',
        content_type: 'product',
        content_ids: items.map(i => i.variantId),
      });
    }

    // GA4: purchase
    if (w.gtag) {
      w.gtag('event', 'purchase', {
        transaction_id: orderName,
        currency: 'EUR',
        value: totalValue || 88,
        items: items.map(item => ({
          item_id: item.product.node.handle,
          item_name: item.product.node.title || item.variantTitle,
          price: parseFloat(item.price.amount),
          quantity: item.quantity,
        })),
      });
    }

    clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderName]);

  const displayOrder = orderName
    ? orderName.startsWith("#") ? orderName : `#${orderName}`
    : null;

  return (
    <>
      <SEO
        title="Order Confirmed — Zential Pure"
        description="Thank you for your order. Your Zential Pure device is being prepared."
      />

      {/* Grain overlay */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.035" />
      </svg>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F7F4F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          position: "relative",
        }}
      >
        {/* Warm radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,160,124,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Card */}
        <div
          style={{
            maxWidth: "520px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(198,160,124,0.22)",
            borderRadius: "2px",
            padding: "56px 48px",
            position: "relative",
            zIndex: 1,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms",
          }}
        >
          {/* Top gold divider */}
          <GoldDivider />

          {/* Checkmark icon */}
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "1.5px solid #C6A07C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "28px auto 28px",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polyline
                points="6 12 10 16 18 8"
                stroke="#C6A07C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "28px",
              color: "#1A1714",
              textAlign: "center",
              margin: "0 0 12px",
              lineHeight: 1.3,
            }}
          >
            {t('headline')}
          </h1>

          {/* Subline */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#C6A07C",
              textAlign: "center",
              margin: "0 0 32px",
            }}
          >
            {t('tagline')}
          </p>

          {/* Order pill */}
          {displayOrder && (
            <div
              style={{
                backgroundColor: "#F7F4F0",
                borderRadius: "2px",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: "#5C5753",
                  textTransform: "uppercase",
                }}
              >
                {t('orderLabel')}
              </span>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#1A1714",
                }}
              >
                {displayOrder}
              </span>
            </div>
          )}

          {/* Body copy */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: "13px",
              color: "#5C5753",
              lineHeight: 1.75,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            {email
              ? t('bodyWithEmail', { email })
              : t('bodyNoEmail')}
          </p>

          {/* Ritual timeline */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#C6A07C",
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              {t('ritualEyebrow')}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {ritualTimeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "12px 16px",
                    backgroundColor: "#F7F4F0",
                    borderRadius: "2px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: "#C6A07C",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    paddingTop: "1px",
                    minWidth: "44px",
                  }}>
                    {item.day}
                  </span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: "11px", color: "#5C5753", lineHeight: 1.65 }}>
                    {item.instruction}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trustpilot invite */}
          <div
            style={{
              backgroundColor: "#F7F4F0",
              borderRadius: "2px",
              padding: "14px 20px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: "11px", color: "#5C5753", margin: "0 0 8px" }}>
              {t('reviewCopy')}
            </p>
            <a
              href="https://nl.trustpilot.com/review/zentialpure.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "10px",
                letterSpacing: "0.16em",
                color: "#1A1714",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid #C6A07C",
                paddingBottom: "1px",
              }}
            >
              {t('reviewLink')}
            </a>
          </div>

          {/* Bottom gold divider */}
          <GoldDivider />

          {/* Post-purchase links */}
          <div style={{ marginTop: "28px" }}>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#C6A07C",
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              {t('whileYouWait')}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {postPurchaseLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    backgroundColor: "#F7F4F0",
                    borderRadius: "2px",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDE9E3")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F7F4F0")}
                >
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "12px", color: "#1A1714" }}>
                    {link.label}
                  </span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: "11px", color: "#8C8680" }}>
                    {link.desc} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Brand below card */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(90,85,80,0.45)",
            marginTop: "36px",
            textAlign: "center",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          ZENTIAL PURE
        </p>
      </div>
    </>
  );
}

function GoldDivider() {
  return (
    <div
      style={{
        width: "32px",
        height: "1px",
        margin: "0 auto",
        background: "linear-gradient(90deg, transparent, #C6A07C, transparent)",
      }}
    />
  );
}
