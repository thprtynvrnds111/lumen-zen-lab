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

 // Fire purchase events once per order, guard with sessionStorage to prevent duplicate on re-render
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
    title="Order Confirmed, Zential Pure"
    description="Thank you for your order. Your Zential Pure device is being prepared."
   />

   <div
    style={{
     minHeight: "100vh",
     backgroundColor: "#FFFFFF",
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     padding: "48px 20px",
     position: "relative",
    }}
   >
    {/* Card */}
    <div
     style={{
      maxWidth: "520px",
      width: "100%",
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(20,20,20,0.10)",
      borderRadius: "0",
      padding: "56px 48px",
      position: "relative",
      zIndex: 1,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.7s ease 80ms, transform 0.7s ease 80ms",
     }}
    >
     {/* Top divider */}
     <Divider />

     {/* Checkmark icon */}
     <div
      style={{
       width: "52px",
       height: "52px",
       borderRadius: "50%",
       border: "1.5px solid #0E7A54",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       margin: "28px auto 28px",
      }}
     >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
       <polyline
        points="6 12 10 16 18 8"
        stroke="#0E7A54"
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
       fontWeight: 300,
       letterSpacing: "-0.025em",
       fontSize: "28px",
       color: "#141414",
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
             fontWeight: 300,
       fontSize: "11px",
       letterSpacing: "0.18em",
       color: "#0E7A54",
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
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(20,20,20,0.10)",
        borderRadius: "0",
        padding: "14px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
       }}
      >
       <span
        style={{
                 fontWeight: 300,
         fontSize: "11px",
         letterSpacing: "0.14em",
         color: "#5A5A5A",
         textTransform: "uppercase",
        }}
       >
        {t('orderLabel')}
       </span>
       <span
        style={{
                 fontWeight: 400,
         fontSize: "13px",
         color: "#141414",
        }}
       >
        {displayOrder}
       </span>
      </div>
     )}

     {/* Body copy */}
     <p
      style={{
             fontWeight: 300,
       fontSize: "13px",
       color: "#5A5A5A",
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
               fontWeight: 300,
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "#8E8E8E",
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
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(20,20,20,0.10)",
          borderRadius: "0",
          alignItems: "flex-start",
         }}
        >
         <span style={{
                   fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "#0E7A54",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          paddingTop: "1px",
          minWidth: "44px",
         }}>
          {item.day}
         </span>
         <span style={{ fontWeight: 300, fontSize: "11px", color: "#5A5A5A", lineHeight: 1.65 }}>
          {item.instruction}
         </span>
        </div>
       ))}
      </div>
     </div>

     {/* Trustpilot invite */}
     <div
      style={{
       backgroundColor: "#FFFFFF",
       border: "1px solid rgba(20,20,20,0.10)",
       borderRadius: "0",
       padding: "14px 20px",
       marginBottom: "24px",
       textAlign: "center",
      }}
     >
      <p style={{ fontWeight: 300, fontSize: "11px", color: "#5A5A5A", margin: "0 0 8px" }}>
       {t('reviewCopy')}
      </p>
      <a
       href="https://nl.trustpilot.com/review/zentialpure.com"
       target="_blank"
       rel="noopener noreferrer"
       style={{
               fontWeight: 400,
        fontSize: "10px",
        letterSpacing: "0.16em",
        color: "#141414",
        textTransform: "uppercase",
        textDecoration: "none",
        borderBottom: "1px solid #0E7A54",
        paddingBottom: "1px",
       }}
      >
       {t('reviewLink')}
      </a>
     </div>

     {/* Bottom divider */}
     <Divider />

     {/* Post-purchase links */}
     <div style={{ marginTop: "28px" }}>
      <p
       style={{
               fontWeight: 300,
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "#8E8E8E",
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
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(20,20,20,0.10)",
          borderRadius: "0",
          textDecoration: "none",
          transition: "background-color 0.2s ease",
         }}
         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F4FBF8")}
         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
        >
         <span style={{ fontWeight: 400, fontSize: "12px", color: "#141414" }}>
          {link.label}
         </span>
         <span style={{ fontWeight: 300, fontSize: "11px", color: "#8E8E8E" }}>
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
           fontWeight: 300,
      fontSize: "10px",
      letterSpacing: "0.2em",
      color: "#8E8E8E",
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

function Divider() {
 return (
  <div
   style={{
    width: "32px",
    height: "1px",
    margin: "0 auto",
    background: "#0E7A54",
   }}
  />
 );
}
