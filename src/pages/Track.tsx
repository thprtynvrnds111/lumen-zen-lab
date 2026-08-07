import { useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { SEO } from "@/components/SEO";
import { Package, Check, Truck, Home, AlertCircle, Loader2 } from "lucide-react";

type Stage = "received" | "preparing" | "shipped" | "delivered";

interface Parcel {
  label: string;
  stage: "dispatched" | "in_transit" | "out_for_delivery" | "delivered" | "attention";
  dispatchedAt: string | null;
  trackingNumber: string | null;
  carrier: string;
  carrierUrl: string | null;
  items: string[];
}

interface TrackResult {
  order: string;
  firstName: string | null;
  placedAt: string;
  stage: Stage;
  expectedParcels: number;
  splitShipment: boolean;
  parcels: Parcel[];
  awaiting: string[];
}

const STAGES: { key: Stage; label: string; note: string }[] = [
  { key: "received", label: "Order received", note: "We have your order." },
  { key: "preparing", label: "Preparing for dispatch", note: "Your instruments are being picked and packed." },
  { key: "shipped", label: "On its way", note: "Dispatched and moving." },
  { key: "delivered", label: "Delivered", note: "It's with you. Begin when you're ready." },
];

const PARCEL_STAGE_LABEL: Record<Parcel["stage"], string> = {
  dispatched: "Dispatched",
  in_transit: "In transit",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  attention: "Needs attention",
};

const fmt = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

const Track = () => {
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, email }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else setResult(data);
    } catch {
      setError("We couldn't reach the tracking service. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const activeIndex = result ? STAGES.findIndex((s) => s.key === result.stage) : -1;

  return (
    <div className="min-h-screen bg-white text-[#141414]">
      <SEO
        title="Track your order, Zential Pure"
        description="Follow your Zential Pure order from dispatch to your door."
        canonicalUrl="/track"
        noindex
      />
      <AnnouncementBar />
      <Header />

      <main className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-14">
            <div className="inline-flex items-center gap-2 border border-[rgba(20,20,20,0.12)] text-[#8E8E8E] rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase mb-6">
              <Package size={14} className="text-[#0E7A54]" />
              Order status
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-[-0.03em] mb-4">
              Track your order
            </h1>
            <p className="text-[#5A5A5A] text-lg font-light">
              Enter your order number and the email you ordered with.
            </p>
          </header>

          <form onSubmit={submit} className="grid gap-4 mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
                  Order number
                </span>
                <input
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="1005"
                  autoComplete="off"
                  className="bg-white border border-[rgba(20,20,20,0.22)] rounded-none px-4 py-3 focus:outline-none focus:border-[#0E7A54] transition-colors"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="bg-white border border-[rgba(20,20,20,0.22)] rounded-none px-4 py-3 focus:outline-none focus:border-[#0E7A54] transition-colors"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="justify-self-start inline-flex items-center gap-2 rounded-full bg-[#2ED8A8] px-8 py-3 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86] disabled:opacity-50"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Looking" : "Track order"}
            </button>
          </form>

          {error && (
            <div className="flex items-start gap-3 border border-[rgba(20,20,20,0.10)] rounded-none p-5 text-[#5A5A5A]">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p>{error}</p>
                <p className="text-sm mt-1">
                  Still stuck? Write to{" "}
                  <a href="mailto:info@zentialpure.com" className="text-[#0E7A54] underline">
                    info@zentialpure.com
                  </a>{" "}
                  and we'll find it for you.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="animate-fade-in">
              <div className="border-b border-[rgba(20,20,20,0.10)] pb-6 mb-10">
                <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-2">
                  Order {result.order}
                </p>
                <h2 className="text-2xl font-light tracking-[-0.02em]">
                  {result.firstName ? `${result.firstName}, ` : ""}
                  {STAGES[Math.max(activeIndex, 0)].note}
                </h2>
                <p className="text-sm text-[#5A5A5A] mt-2">
                  Placed {fmt(result.placedAt)}
                </p>
              </div>

              {/*
                The two-parcel notice. Stated plainly, before they can be surprised by it.
                A customer who finds this out from a half-empty box writes an upset email;
                a customer who reads it here does not.
              */}
              {result.splitShipment && (
                <div className="border border-[rgba(14,122,84,0.25)] bg-[#F4FBF8] rounded-none p-6 mb-10">
                  <p className="text-sm tracking-[0.1em] uppercase text-[#0E7A54] mb-2">
                    This order arrives in {result.expectedParcels} parcels
                  </p>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">
                    Your instruments don't all leave from the same place, so they don't all
                    arrive on the same day. Each parcel is tracked separately below. Nothing is
                    missing, and you are not charged twice — one order, one payment.
                  </p>
                </div>
              )}

              {/* Journey */}
              <ol className="grid gap-0 mb-12">
                {STAGES.map((s, i) => {
                  const done = i < activeIndex;
                  const current = i === activeIndex;
                  const Icon = i === 3 ? Home : i === 2 ? Truck : i === 1 ? Package : Check;
                  return (
                    <li key={s.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            done || current
                              ? "border-[#0E7A54] bg-[#F4FBF8] text-[#0E7A54]"
                              : "border-[rgba(20,20,20,0.12)] text-[#8E8E8E]"
                          }`}
                        >
                          <Icon size={15} />
                        </div>
                        {i < STAGES.length - 1 && (
                          <div
                            className={`w-px flex-1 min-h-[2.5rem] ${
                              done ? "bg-[#2ED8A8]" : "bg-[rgba(20,20,20,0.10)]"
                            }`}
                          />
                        )}
                      </div>
                      <div className={`pb-8 ${done || current ? "" : "opacity-40"}`}>
                        <p className={`${current ? "text-[#0E7A54]" : ""} tracking-tight`}>
                          {s.label}
                        </p>
                        {current && (
                          <p className="text-sm text-[#5A5A5A] mt-1 font-light">
                            {s.note}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Parcels */}
              {result.parcels.length > 0 && (
                <div className="grid gap-4 mb-10">
                  {result.parcels.map((p) => (
                    <div key={p.label} className="border border-[rgba(20,20,20,0.10)] rounded-none p-6">
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
                          {p.label}
                        </p>
                        <p className="text-sm text-[#0E7A54]">{PARCEL_STAGE_LABEL[p.stage]}</p>
                      </div>
                      {p.items.length > 0 && (
                        <p className="font-light mb-4">{p.items.join(" · ")}</p>
                      )}
                      {p.trackingNumber && (
                        <div className="grid gap-1 text-sm">
                          <p className="text-[#5A5A5A]">
                            {p.carrier} · <span className="font-sans tabular-nums">{p.trackingNumber}</span>
                          </p>
                          {p.carrierUrl && (
                            <a
                              href={p.carrierUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0E7A54] underline justify-self-start"
                            >
                              View carrier detail
                            </a>
                          )}
                        </div>
                      )}
                      {p.dispatchedAt && (
                        <p className="text-sm text-[#5A5A5A] mt-3">
                          Dispatched {fmt(p.dispatchedAt)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {result.awaiting.length > 0 && (
                <div className="border border-[rgba(20,20,20,0.10)] rounded-none p-6 mb-10">
                  <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">
                    Still to dispatch
                  </p>
                  <p className="font-light">{result.awaiting.join(" · ")}</p>
                  <p className="text-sm text-[#5A5A5A] mt-3 font-light">
                    You'll get an email with tracking the moment this leaves.
                  </p>
                </div>
              )}

              <p className="text-sm text-[#5A5A5A] text-center font-light">
                Something not right?{" "}
                <a href="mailto:info@zentialpure.com" className="text-[#0E7A54] underline">
                  info@zentialpure.com
                </a>
                . A person answers.
              </p>
            </div>
          )}
        </div>
      </main>

      <SparseFooter />
    </div>
  );
};

export default Track;
