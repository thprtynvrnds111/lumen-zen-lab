import { useEffect, useState } from "react";
import { Check, X, Minus } from "lucide-react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

type RowIcon = "good" | "bad" | "neutral";

interface CompRow {
  feature: string;
  zential: string;
  nuface: string;
  nuface_icon: RowIcon;
  amiro: string;
  amiro_icon: RowIcon;
  clinic: string;
  clinic_icon: RowIcon;
}

const rows: CompRow[] = [
  {
    feature: "Price",
    zential: "€88 — once",
    nuface: "€349 — once",
    nuface_icon: "bad",
    amiro: "~€84 — once",
    amiro_icon: "neutral",
    clinic: "€80–200 / session",
    clinic_icon: "bad",
  },
  {
    feature: "Technologies",
    zential: "4 combined",
    nuface: "1–2",
    nuface_icon: "neutral",
    amiro: "1",
    amiro_icon: "bad",
    clinic: "Single treatment",
    clinic_icon: "neutral",
  },
  {
    feature: "Session time",
    zential: "5 minutes",
    nuface: "10–20 min",
    nuface_icon: "neutral",
    amiro: "5–10 min",
    amiro_icon: "neutral",
    clinic: "60–90 min + travel",
    clinic_icon: "bad",
  },
  {
    feature: "Scheduling",
    zential: "Your terms",
    nuface: "Your terms",
    nuface_icon: "good",
    amiro: "Your terms",
    amiro_icon: "good",
    clinic: "Book weeks ahead",
    clinic_icon: "bad",
  },
  {
    feature: "Recurring cost",
    zential: "None",
    nuface: "None",
    nuface_icon: "good",
    amiro: "None",
    amiro_icon: "good",
    clinic: "Every session, every year",
    clinic_icon: "bad",
  },
];

const alternativeTiers = [
  {
    label: "NuFACE Trinity",
    price: "€349",
    sub: "one-time",
    note: "1–2 technologies",
    accent: "#4080FF",
  },
  {
    label: "Amiro / Anlan",
    price: "~€84",
    sub: "one-time",
    note: "1 technology",
    accent: "#40D080",
  },
  {
    label: "Clinic visit",
    price: "€80–200",
    sub: "per session",
    note: "~€960–2,400 / year",
    accent: "#C840E8",
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

function CellIcon({ type }: { type: RowIcon }) {
  if (type === "good") return <Check size={13} className="shrink-0" style={{ color: "#40D080" }} />;
  if (type === "bad") return <X size={13} className="shrink-0" style={{ color: "#E84040" }} />;
  return <Minus size={13} className="shrink-0" style={{ color: 'rgba(234,231,224,0.25)' }} />;
}

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
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: "#070A0E" }}>
      {/* Headline */}
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#E87040" }}>Compare</p>
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: '#EAE7E0' }}>
          Freedom, Not Appointments.
        </h2>
      </div>

      {/* Hero price cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">

        {/* Alternatives card */}
        <div className="rounded-2xl p-7 flex flex-col" style={{ backgroundColor: '#111820', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(234,231,224,0.45)' }}>
            The Alternatives
          </p>
          <div className="space-y-2.5 flex-1">
            {alternativeTiers.map(tier => (
              <div
                key={tier.label}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ backgroundColor: '#0C1118', border: `1px solid ${tier.accent}25`, borderLeft: `2px solid ${tier.accent}` }}
              >
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: tier.accent }}>{tier.label}</span>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: '#EAE7E0' }}>
                    {tier.price}{" "}
                    <span className="text-xs font-normal" style={{ color: 'rgba(234,231,224,0.45)' }}>{tier.sub}</span>
                  </p>
                </div>
                <span className="text-xs font-medium tabular-nums" style={{ color: 'rgba(234,231,224,0.5)' }}>{tier.note}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 pt-4 text-[11px]" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(234,231,224,0.4)' }}>
            More cost, fewer technologies, or an appointment every time.
          </p>
        </div>

        {/* Zential card */}
        <div
          className="rounded-2xl p-7 flex flex-col"
          style={{ backgroundColor: '#1C2A3A', border: '1px solid rgba(232,112,64,0.35)', boxShadow: '0 0 40px rgba(232,112,64,0.06)' }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase mb-5" style={{ color: '#E87040' }}>Zential Protocol</p>

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
                        className="w-[68px] h-[68px] rounded-full overflow-hidden"
                        style={{ border: '1px solid rgba(232,112,64,0.3)', backgroundColor: '#111820' }}
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
                      <span className="text-[10px] font-semibold" style={{ color: '#E87040' }}>
                        {price.currencyCode === "EUR" ? "€" : price.currencyCode}
                        {parseFloat(price.amount).toFixed(0)}
                      </span>
                      <span className="text-[9px] text-center leading-tight max-w-[68px]" style={{ color: 'rgba(234,231,224,0.5)' }}>{name}</span>
                    </div>
                  );
                })
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="w-[68px] h-[68px] rounded-full animate-pulse" style={{ backgroundColor: '#111820' }} />
                    <div className="h-2.5 w-8 rounded animate-pulse" style={{ backgroundColor: '#111820' }} />
                  </div>
                ))
            }
          </div>

          <div className="rounded-xl px-4 py-3 flex-1" style={{ backgroundColor: 'rgba(232,112,64,0.08)', border: '1px solid rgba(232,112,64,0.2)' }}>
            <p className="text-sm font-semibold" style={{ color: '#EAE7E0' }}>One-time investment</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(234,231,224,0.5)' }}>Yours forever. No subscriptions, no bookings.</p>
          </div>
          <p className="mt-5 pt-4 text-[11px]" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(234,231,224,0.4)' }}>
            No appointments, no downtime, no travel.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <div className="min-w-[600px] rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#111820' }}>
          {/* Header */}
          <div
            className="grid grid-cols-5 text-center text-[10px] tracking-[0.15em] uppercase font-semibold"
            style={{ backgroundColor: '#0C1118', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="p-4" />
            <div className="p-4" style={{ color: '#E87040', backgroundColor: 'rgba(232,112,64,0.06)', borderBottom: '2px solid #E87040' }}>
              Zential
            </div>
            <div className="p-4" style={{ color: 'rgba(234,231,224,0.4)' }}>NuFACE</div>
            <div className="p-4" style={{ color: 'rgba(234,231,224,0.4)' }}>Amiro / Anlan</div>
            <div className="p-4" style={{ color: 'rgba(234,231,224,0.4)' }}>Clinic</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-5 text-center"
              style={{
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="p-4 md:p-5 text-sm font-medium text-left" style={{ color: 'rgba(234,231,224,0.7)' }}>
                {row.feature}
              </div>
              <div
                className="p-4 md:p-5 text-sm flex items-center justify-center gap-1.5 font-medium"
                style={{ backgroundColor: 'rgba(232,112,64,0.04)', color: '#EAE7E0' }}
              >
                <Check size={13} className="shrink-0" style={{ color: "#40D080" }} />
                {row.zential}
              </div>
              <div className="p-4 md:p-5 text-sm flex items-center justify-center gap-1.5" style={{ color: 'rgba(234,231,224,0.5)' }}>
                <CellIcon type={row.nuface_icon} />
                {row.nuface}
              </div>
              <div className="p-4 md:p-5 text-sm flex items-center justify-center gap-1.5" style={{ color: 'rgba(234,231,224,0.5)' }}>
                <CellIcon type={row.amiro_icon} />
                {row.amiro}
              </div>
              <div className="p-4 md:p-5 text-sm flex items-center justify-center gap-1.5" style={{ color: 'rgba(234,231,224,0.5)' }}>
                <CellIcon type={row.clinic_icon} />
                {row.clinic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
