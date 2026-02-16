import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { PaymentBadges } from "@/components/zential/PaymentBadges";
import { Loader2, Shield, Lock, ArrowLeft } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, isLoading, isSyncing, getCheckoutUrl, syncCart, updateQuantity, removeItem } = useCartStore();
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const currency = items[0]?.price.currencyCode || "EUR";
  const sym = currency === "EUR" ? "€" : currency;

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  useEffect(() => {
    if (!isLoading && !isSyncing && items.length === 0) {
      navigate("/", { replace: true });
    }
  }, [items.length, isLoading, isSyncing, navigate]);

  // Build the final checkout URL with channel param
  const checkoutHref = useMemo(() => {
    const raw = getCheckoutUrl();
    if (!raw) return null;
    try {
      const parsed = new URL(raw);
      parsed.searchParams.set('channel', 'online_store');
      return parsed.toString();
    } catch { return raw; }
  }, [getCheckoutUrl, items]); // re-derive when items/store change

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(28 23% 80%) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, hsl(30 27% 88%) 0%, transparent 40%),
                            radial-gradient(circle at 50% 80%, hsl(343 44% 60% / 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Zential Pure</p>
        <div className="flex items-center gap-1.5 text-muted-foreground/60">
          <Lock size={12} />
          <span className="text-[10px] tracking-[0.15em] uppercase">Secure</span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 pb-20">
        <div className="max-w-[1080px] mx-auto">
          {/* Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-3">
              Complete Your Ritual
            </h1>
            <div className="w-12 h-px bg-border mx-auto" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">

            {/* LEFT: Form area */}
            <div className="space-y-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
              {/* Contact */}
              <section>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Contact</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                  />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Shipping</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                    />
                    <input
                      type="text"
                      placeholder="Postal code"
                      className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-5 py-4 bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/30 focus:shadow-[0_0_0_3px_hsl(343_44%_60%/0.06)]"
                    />
                  </div>
                </div>
              </section>

              {/* Payment info note */}
              <section>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Payment</h2>
                <div className="px-5 py-5 bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Payment is handled securely through our encrypted checkout. You will be redirected to complete your payment after reviewing your order.
                  </p>
                  <PaymentBadges className="mt-5 justify-start" />
                  <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/40 mt-4">
                    Encrypted. Protected. Zero risk.
                  </p>
                </div>
              </section>
            </div>

            {/* RIGHT: Order summary glass card */}
            <div
              className="lg:sticky lg:top-8 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="bg-card/50 backdrop-blur-2xl border border-border/30 rounded-3xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)]">
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">Your Ritual</h2>

                {/* Items */}
                <div className="space-y-6">
                  {items.map((item) => {
                    const img = item.product.node.images?.edges?.[0]?.node?.url;
                    return (
                      <div key={item.variantId} className="flex gap-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary/30 flex-shrink-0">
                          {img && (
                            <img src={img} alt={item.product.node.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h3 className="text-sm font-medium text-foreground truncate">{item.product.node.title}</h3>
                            <p className="text-[11px] tracking-[0.1em] text-muted-foreground/60 mt-0.5 font-serif italic">
                              Your Ritual Begins.
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 text-xs"
                              >
                                −
                              </button>
                              <span className="text-xs text-foreground w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {sym}{(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-border/30 my-8" />

                {/* Subtotal */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{sym}{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground/60 text-xs tracking-wide">Calculated at next step</span>
                  </div>
                </div>

                <div className="h-px bg-border/30 mb-6" />

                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-sm font-medium text-foreground">Total</span>
                  <span className="text-xl font-semibold text-foreground tracking-tight">{sym}{totalPrice.toFixed(2)}</span>
                </div>

                {/* CTA Button — real <a> tag to external Shopify checkout */}
                {checkoutHref ? (
                  <a
                    href={checkoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-2xl text-sm tracking-[0.15em] uppercase text-center transition-all duration-300 bg-secondary hover:bg-secondary/80 text-foreground font-medium shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] hover:-translate-y-px active:translate-y-0"
                  >
                    Complete Your Ritual
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl text-sm tracking-[0.15em] uppercase transition-all duration-300 opacity-50 cursor-not-allowed bg-secondary text-foreground font-medium"
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="animate-spin mx-auto" size={16} />
                    ) : (
                      "Complete Your Ritual"
                    )}
                  </button>
                )}

                <p className="text-center text-[10px] tracking-[0.15em] uppercase text-muted-foreground/40 mt-4">
                  30-Day Guarantee Included.
                </p>

                {/* Trust row */}
                <div className="flex items-center justify-center gap-5 mt-6 pt-6 border-t border-border/20">
                  {[
                    { icon: Shield, label: "Guarantee" },
                    { icon: Lock, label: "Encrypted" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-1.5 text-muted-foreground/40">
                      <t.icon size={11} />
                      <span className="text-[9px] tracking-[0.2em] uppercase">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
