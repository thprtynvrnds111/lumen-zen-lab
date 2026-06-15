import { useEffect, useState } from "react";

interface DashboardData {
 today: { orders: number; revenue: number };
 week: { orders: number; revenue: number; aov: number };
 target: { daily: number; ordersNeeded: number; progressPct: number };
 topSku: { name: string; revenue: number; qty: number } | null;
}

function fmt(n: number) {
 return n.toLocaleString("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function Dashboard() {
 const [data, setData] = useState<DashboardData | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetch("/api/dashboard")
   .then(r => r.json())
   .then(d => {
    if (d.error) setError(d.error);
    else setData(d);
   })
   .catch(e => setError(e.message))
   .finally(() => setLoading(false));
 }, []);

 const bar = (pct: number) => (
  <div style={{ background: "rgba(198,160,124,0.15)", borderRadius: "2px", height: "6px", overflow: "hidden" }}>
   <div style={{ width: `${pct}%`, height: "100%", background: "#C6A07C", borderRadius: "2px", transition: "width 0.6s ease" }} />
  </div>
 );

 return (
  <div style={{ minHeight: "100vh", backgroundColor: "#1A1714", padding: "40px 24px", fontFamily: "'Poppins', sans-serif" }}>
   <div style={{ maxWidth: "760px", margin: "0 auto" }}>
    <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "rgba(247,241,232,0.35)", textTransform: "uppercase", marginBottom: "8px" }}>
     Zential Pure, Founder Dashboard
    </p>
    <h1 style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "28px", color: "#F7F1E8", fontWeight: 400, marginBottom: "40px" }}>
     Revenue Overview
    </h1>

    {loading && (
     <p style={{ color: "rgba(247,241,232,0.5)", fontSize: "13px" }}>Loading Shopify data...</p>
    )}

    {error && (
     <div style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "4px", padding: "16px", color: "#ff8080", fontSize: "13px" }}>
      Error: {error}
     </div>
    )}

    {data && (
     <div style={{ display: "grid", gap: "16px" }}>
      {/* Today */}
      <div style={{ background: "#231F1B", border: "1px solid rgba(198,160,124,0.2)", borderRadius: "4px", padding: "28px 32px" }}>
       <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#C6A07C", textTransform: "uppercase", marginBottom: "20px" }}>Today</p>
       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div>
         <p style={{ fontSize: "32px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{fmt(data.today.revenue)}</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>Revenue</p>
        </div>
        <div>
         <p style={{ fontSize: "32px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{data.today.orders}</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>Orders</p>
        </div>
        <div>
         <p style={{ fontSize: "32px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{data.target.progressPct}%</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>of €1k/day</p>
        </div>
       </div>
       {bar(data.target.progressPct)}
       <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.35)", marginTop: "10px" }}>
        {data.target.ordersNeeded} orders/day at current AOV to reach €1,000
       </p>
      </div>

      {/* Last 7 days */}
      <div style={{ background: "#231F1B", border: "1px solid rgba(198,160,124,0.15)", borderRadius: "4px", padding: "28px 32px" }}>
       <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#C6A07C", textTransform: "uppercase", marginBottom: "20px" }}>Last 7 Days</p>
       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        <div>
         <p style={{ fontSize: "28px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{fmt(data.week.revenue)}</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>Revenue</p>
        </div>
        <div>
         <p style={{ fontSize: "28px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{data.week.orders}</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>Orders</p>
        </div>
        <div>
         <p style={{ fontSize: "28px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic", lineHeight: 1 }}>{fmt(data.week.aov)}</p>
         <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.4)", marginTop: "6px" }}>AOV</p>
        </div>
       </div>
      </div>

      {/* Top SKU */}
      {data.topSku && (
       <div style={{ background: "#231F1B", border: "1px solid rgba(198,160,124,0.15)", borderRadius: "4px", padding: "24px 32px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#C6A07C", textTransform: "uppercase", marginBottom: "14px" }}>Top SKU, Last 7 Days</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
         <p style={{ fontSize: "15px", color: "#F7F1E8", fontWeight: 400 }}>{data.topSku.name}</p>
         <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "15px", color: "#C6A07C" }}>{fmt(data.topSku.revenue)}</p>
          <p style={{ fontSize: "10px", color: "rgba(247,241,232,0.35)", marginTop: "3px" }}>{data.topSku.qty} units</p>
         </div>
        </div>
       </div>
      )}

      {/* Daily avg */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
       <div style={{ background: "#231F1B", border: "1px solid rgba(198,160,124,0.12)", borderRadius: "4px", padding: "24px 28px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#C6A07C", textTransform: "uppercase", marginBottom: "12px" }}>Daily Avg (7d)</p>
        <p style={{ fontSize: "24px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic" }}>{fmt(data.week.revenue / 7)}</p>
       </div>
       <div style={{ background: "#231F1B", border: "1px solid rgba(198,160,124,0.12)", borderRadius: "4px", padding: "24px 28px" }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "#C6A07C", textTransform: "uppercase", marginBottom: "12px" }}>Target Gap</p>
        <p style={{ fontSize: "24px", color: "#F7F1E8", fontFamily: "'Lora', serif", fontStyle: "italic" }}>
         {fmt(Math.max(0, 1000 - data.today.revenue))}
        </p>
       </div>
      </div>

      <p style={{ fontSize: "9px", color: "rgba(247,241,232,0.2)", textAlign: "center", marginTop: "8px" }}>
       Paid orders only · Shopify Admin API · {new Date().toLocaleString("nl-NL")}
      </p>
     </div>
    )}
   </div>
  </div>
 );
}
