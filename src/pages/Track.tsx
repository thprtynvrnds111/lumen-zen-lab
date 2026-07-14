import { useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
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
    <div className="min-h-screen bg-background">
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
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-xs tracking-[0.15em] uppercase mb-6">
              <Package size={14} />
              Order status
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              Track your order
            </h1>
            <p className="text-muted-foreground text-lg font-light">
              Enter your order number and the email you ordered with.
            </p>
          </header>

          <form onSubmit={submit} className="grid gap-4 mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.12em] uppercase text-muted-foreground">
                  Order number
                </span>
                <input
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="1005"
                  autoComplete="off"
                  className="bg-transparent border border-border rounded-md px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs tracking-[0.12em] uppercase text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="bg-transparent border border-border rounded-md px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="justify-self-start inline-flex items-center gap-2 bg-foreground text-background rounded-md px-8 py-3 text-sm tracking-[0.08em] uppercase disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Looking" : "Track order"}
            </button>
          </form>

          {error && (
            <div className="flex items-start gap-3 border border-border rounded-lg p-5 text-muted-foreground">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p>{error}</p>
                <p className="text-sm mt-1">
                  Still stuck? Write to{" "}
                  <a href="mailto:hello@zentialpure.com" className="text-accent underline">
                    hello@zentialpure.com
                  </a>{" "}
                  and we'll find it for you.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="animate-fade-in">
              <div className="border-b border-border pb-6 mb-10">
                <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2">
                  Order {result.order}
                </p>
                <h2 className="text-2xl font-light">
                  {result.firstName ? `${result.firstName}, ` : ""}
                  {STAGES[Math.max(activeIndex, 0)].note}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Placed {fmt(result.placedAt)}
                </p>
              </div>

              {/*
                The two-parcel notice. Stated plainly, before they can be surprised by it.
                A customer who finds this out from a half-empty box writes an upset email;
                a customer who reads it here does not.
              */}
              {result.splitShipment && (
                <div className="border border-accent/25 bg-accent/5 rounded-lg p-6 mb-10">
                  <p className="text-sm tracking-[0.1em] uppercase text-accent mb-2">
                    This order arrives in {result.expectedParcels} parcels
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed">
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
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted-foreground/40"
                          }`}
                        >
                          <Icon size={15} />
                        </div>
                        {i < STAGES.length - 1 && (
                          <div
                            className={`w-px flex-1 min-h-[2.5rem] ${
                              done ? "bg-accent/40" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                      <div className={`pb-8 ${done || current ? "" : "opacity-40"}`}>
                        <p className={`${current ? "text-accent" : ""} tracking-tight`}>
                          {s.label}
                        </p>
                        {current && (
                          <p className="text-sm text-muted-foreground mt-1 font-light">
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
                    <div key={p.label} className="border border-border rounded-lg p-6">
                      <div className="flex items-baseline justify-between gap-4 mb-3">
                        <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground">
                          {p.label}
                        </p>
                        <p className="text-sm text-accent">{PARCEL_STAGE_LABEL[p.stage]}</p>
                      </div>
                      {p.items.length > 0 && (
                        <p className="font-light mb-4">{p.items.join(" · ")}</p>
                      )}
                      {p.trackingNumber && (
                        <div className="grid gap-1 text-sm">
                          <p className="text-muted-foreground">
                            {p.carrier} · <span className="font-mono">{p.trackingNumber}</span>
                          </p>
                          {p.carrierUrl && (
                            <a
                              href={p.carrierUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent underline justify-self-start"
                            >
                              View carrier detail
                            </a>
                          )}
                        </div>
                      )}
                      {p.dispatchedAt && (
                        <p className="text-sm text-muted-foreground mt-3">
                          Dispatched {fmt(p.dispatchedAt)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {result.awaiting.length > 0 && (
                <div className="border border-border rounded-lg p-6 mb-10">
                  <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-3">
                    Still to dispatch
                  </p>
                  <p className="font-light">{result.awaiting.join(" · ")}</p>
                  <p className="text-sm text-muted-foreground mt-3 font-light">
                    You'll get an email with tracking the moment this leaves.
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground text-center font-light">
                Something not right?{" "}
                <a href="mailto:hello@zentialpure.com" className="text-accent underline">
                  hello@zentialpure.com
                </a>
                . A person answers.
              </p>
            </div>
          )}
        </div>
      </main>

      <ZentialFooter />
    </div>
  );
};

export default Track;
