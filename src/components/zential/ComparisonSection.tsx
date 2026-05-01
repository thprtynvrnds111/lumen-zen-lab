import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const rows = [
  { feature: "Cost per session", clinic: "€80–€200", zential: "One-time investment" },
  { feature: "Time per session", clinic: "60–90 min + travel", zential: "5 minutes" },
  { feature: "Scheduling", clinic: "Book weeks ahead", zential: "On your terms" },
  { feature: "Downtime", clinic: "24–48 hours", zential: "None" },
  { feature: "Privacy", clinic: "Clinic setting", zential: "Your space" },
];

const clinicTiers = [
  {
    label: "Low",
    price: "€80",
    sub: "per session",
    annual: "~€960 / year",
    bg: "#FDF4EE",
    border: "#F0C9A8",
  },
  {
    label: "Mid",
    price: "€120–€150",
    sub: "per session",
    annual: "~€1,500 / year",
    bg: "#FAEADE",
    border: "#E8AA7A",
  },
  {
    label: "High",
    price: "€200+",
    sub: "per session",
    annual: "~€2,400+ / year",
    bg: "#F5DBC8",
    border: "#D4855A",
  },
];

const FEATURED_HANDLES = [
  "lifting-and-tightening-face-introducer",
  "portable-ems-microcurrent-facial-beauty-device",
  "facial-beauty-tools-and-ems-beauty-equipment",
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
];

const DEVICE_NAMES: Record<string, string> = {
  "lifting-and-tightening-face-introducer": "Face Introducer",
  "portable-ems-microcurrent-facial-beauty-device": "Frequency Wand Pro",
  "facial-beauty-tools-and-ems-beauty-equipment": "Sculpt Wand",
  "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool": "Frame Pulse",
};

export function ComparisonSection() {
  const [devices, setDevices] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    fetchProducts(12).then(products => {
      const featured = FEATURED_HANDLES
        .map(h => products.find(p => p.node.handle === h))
        .filter(Boolean) as ShopifyProduct[];
      setDevices(featured.slice(0, 4));
    }).catch(() => {});
  }, []);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: "#F7F4F0" }}>
      {/* Headline */}
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#9B5A2E" }}>Compare</p>
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight">Freedom, Not Appointments.</h2>
      </div>

      {/* Hero price cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">

        {/* Clinic card */}
        <div className="rounded-2xl border border-border/40 bg-white/70 p-7 flex flex-col">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">Clinic Visits</p>
          <div className="space-y-2.5 flex-1">
            {clinicTiers.map(tier => (
              <div
                key={tier.label}
                className="flex items-center justify-between rounded-xl px-4 py-3 border"
                style={{ backgroundColor: tier.bg, borderColor: tier.border }}
              >
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "#9B5A2E" }}>{tier.label}</span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {tier.price}{" "}
                    <span className="text-xs font-normal text-muted-foreground">{tier.sub}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground/80 font-medium tabular-nums">{tier.annual}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 pt-4 border-t border-border/30 text-[11px] text-muted-foreground">
            Recurring cost — every session, every year.
          </p>
        </div>

        {/* Zential card */}
        <div
          className="rounded-2xl border-2 p-7 flex flex-col"
          style={{ borderColor: "#C6A07C", backgroundColor: "#FDFAF7" }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: "#9B5A2E" }}>Zential Ritual</p>

          {/* Device circles */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {devices.length > 0
              ? devices.map(product => {
                  const img = product.node.images.edges[0]?.node;
                  const price = product.node.priceRange.minVariantPrice;
                  const name = DEVICE_NAMES[product.node.handle] || product.node.title;
                  return (
                    <div key={product.node.id} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-[68px] h-[68px] rounded-full overflow-hidden border-2 shadow-sm"
                        style={{ borderColor: "#E4DFD8", backgroundColor: "#EFEBE5" }}
                      >
                        {img && (
                          <img
                            src={`${img.url}&width=200`}
                            alt={name}
                            width={68}
                            height={68}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-semibold" style={{ color: "#9B5A2E" }}>
                        {price.currencyCode === "EUR" ? "€" : price.currencyCode}
                        {parseFloat(price.amount).toFixed(0)}
                      </span>
                      <span className="text-[9px] text-muted-foreground text-center leading-tight max-w-[68px]">{name}</span>
                    </div>
                  );
                })
              : /* skeleton placeholders while loading */
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-[68px] h-[68px] rounded-full animate-pulse"
                      style={{ backgroundColor: "#EFEBE5" }}
                    />
                    <div className="h-2.5 w-8 rounded animate-pulse" style={{ backgroundColor: "#EFEBE5" }} />
                  </div>
                ))
            }
          </div>

          <div className="rounded-xl px-4 py-3 flex-1" style={{ backgroundColor: "#F0EAE0" }}>
            <p className="text-sm font-semibold text-foreground">One-time investment</p>
            <p className="text-xs text-muted-foreground mt-0.5">Yours forever. No subscriptions, no bookings.</p>
          </div>
          <p className="mt-5 pt-4 border-t border-border/30 text-[11px] text-muted-foreground">
            No appointments, no downtime, no travel.
          </p>
        </div>
      </div>

      {/* Comparison rows */}
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/40 bg-white/60">
        <div
          className="grid grid-cols-3 text-center text-[10px] tracking-[0.15em] uppercase font-semibold border-b border-border/50"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        >
          <div className="p-4" />
          <div className="p-4 text-muted-foreground">Clinic Visits</div>
          <div className="p-4" style={{ color: "#9B5A2E" }}>Zential Ritual</div>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.feature}
            className="grid grid-cols-3 text-center border-b border-border/20 last:border-0"
            style={{ backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)" }}
          >
            <div className="p-4 md:p-5 text-sm font-medium text-left text-foreground/80">{row.feature}</div>
            <div className="p-4 md:p-5 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
              <X size={13} className="shrink-0" style={{ color: "#C97B5A" }} />
              {row.clinic}
            </div>
            <div className="p-4 md:p-5 text-sm flex items-center justify-center gap-1.5 font-medium text-foreground/90">
              <Check size={13} className="shrink-0" style={{ color: "#7CAE9B" }} />
              {row.zential}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
