// Source: nl.trustpilot.com/review/zentialpure.com — VERIFIED VERBATIM 2026-07-14.
// Profile: 7 reviews (count updated 2026-07-24), 4.2 average as of 2026-07-14.
// Quotes below are copied exactly from the live
// profile (typos included — do not "improve" a customer's words).
// HARD RULE: never add a reviewer who is not on the public profile. A previous
// entry ("Rafi Rahadian") did not exist there and has been removed.
// TODO: automate via Trustpilot API once volume grows.

interface Review {
 name: string;
 location: string;
 quote: string;
 rating: number;
}

const reviews: Review[] = [
 {
  name: "Maria",
  location: "NL",
  quote: "Bougth this after doing alot of research. The fullface coverage and the glow it gives after each session is unlike anything i've used before. Three weeks in an two people have asked if I changed my skincare routine!",
  rating: 5,
 },
 {
  name: "Jennarosa",
  location: "NL",
  quote: "The difference between other devices and this one is just huge. The quality is really there.",
  rating: 5,
 },
 {
  name: "Daan Mossel",
  location: "NL",
  quote: "first I was a bit sceptical, about improving my skin. Fortunately, the devices really worked well.",
  rating: 5,
 },
 {
  name: "Miguel Lam",
  location: "CW",
  quote: "The instructions where clear and the customer service answered my questions within hours. will order the Eye Activator next.",
  rating: 5,
 },
];

function RatingDots({ rating }: { rating: number }) {
 return (
  <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
   {Array.from({ length: 5 }).map((_, i) => (
    <span
     key={i}
     style={{
      display: "inline-block",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: i < rating ? "#E87040" : "rgba(232,112,64,0.25)",
     }}
    />
   ))}
  </div>
 );
}

interface Props {
 className?: string;
}

export function TrustpilotStrip({ className = "" }: Props) {
 return (
  <section
   className={className}
   style={{ backgroundColor: "#0C1118", padding: "64px 24px" }}
  >
   <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
     <p
      style={{
       fontFamily: "'Poppins', sans-serif",
       fontWeight: 300,
       fontSize: "10px",
       letterSpacing: "0.3em",
       color: "rgba(234,231,224,0.5)",
       textTransform: "uppercase",
       marginBottom: "14px",
      }}
     >
     , Verified Reviews 
     </p>
     <a
      href="https://nl.trustpilot.com/review/zentialpure.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
       fontFamily: "'Lora', serif",
       fontStyle: "italic",
       fontWeight: 400,
       fontSize: "26px",
       color: "#EAE7E0",
       textDecoration: "none",
       borderBottom: "1px solid rgba(232,112,64,0.4)",
       paddingBottom: "2px",
      }}
     >
      nl.trustpilot.com/review/zentialpure.com
     </a>
    </div>

    {/* Review grid */}
    <div
     style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "16px",
     }}
    >
     {reviews.map((r, i) => (
      <div
       key={i}
       style={{
        backgroundColor: "#111820",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        padding: "28px 24px",
       }}
      >
       <RatingDots rating={r.rating} />
       <p
        style={{
         fontFamily: "'Poppins', sans-serif",
         fontWeight: 300,
         fontSize: "13px",
         color: "rgba(234,231,224,0.85)",
         lineHeight: 1.75,
         marginBottom: "16px",
        }}
       >
        "{r.quote}"
       </p>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
         style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: "11px",
          color: "#EAE7E0",
         }}
        >
         {r.name}
        </span>
        <span
         style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "rgba(234,231,224,0.55)",
          textTransform: "uppercase",
         }}
        >
         {r.location} · Trustpilot
        </span>
       </div>
      </div>
     ))}
    </div>

    {/* CTA to Trustpilot */}
    <div style={{ textAlign: "center", marginTop: "40px" }}>
     <a
      href="https://nl.trustpilot.com/review/zentialpure.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
       fontFamily: "'Poppins', sans-serif",
       fontWeight: 400,
       fontSize: "10px",
       letterSpacing: "0.2em",
       color: "rgba(234,231,224,0.45)",
       textTransform: "uppercase",
       textDecoration: "none",
      }}
     >
      Read all reviews on Trustpilot →
     </a>
    </div>
   </div>
  </section>
 );
}
