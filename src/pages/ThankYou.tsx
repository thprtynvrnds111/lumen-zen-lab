import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const orderName = searchParams.get("order_name");
  const email = searchParams.get("email");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

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
            Your order is confirmed.
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
            CLINIC PRECISION. DAILY RITUAL.
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
                Order
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
              margin: "0 0 36px",
            }}
          >
            {email
              ? `A confirmation has been sent to ${email}. Your device is being prepared with care and will ship within 1–2 business days.`
              : "Your device is being prepared with care and will ship within 1–2 business days. A confirmation email is on its way."}
          </p>

          {/* CTA button */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Link
              to="/"
              style={{
                display: "inline-block",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#F7F4F0",
                backgroundColor: "#1A1714",
                padding: "14px 40px",
                borderRadius: "2px",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C6A07C")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1714")}
            >
              Return Home
            </Link>
          </div>

          {/* Bottom gold divider */}
          <GoldDivider />
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
