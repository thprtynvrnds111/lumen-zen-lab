import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, X, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { items, isLoading, isSyncing, updateQuantity, removeItem, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShippingUnlocked = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = (FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const [redirecting, setRedirecting] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setRedirecting(true);
    // Build permalink-style checkout URL using numeric variant IDs
    const lines = items.map(item => {
      // Extract numeric ID from GID format: gid://shopify/ProductVariant/123
      const numericId = item.variantId.split('/').pop();
      return `${numericId}:${item.quantity}`;
    }).join(',');
    window.location.href = `https://0d1m9a-w7.myshopify.com/cart/${lines}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <ShoppingBag size={18} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-semibold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background p-0 gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="relative py-5 border-b border-border/30">
          <p className="text-center text-sm tracking-[0.1em] font-medium">
            {totalItems === 0 ? "Your bag is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-b border-border/20">
            <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {freeShippingUnlocked
                ? "Free standard shipping unlocked"
                : `€${amountToFreeShipping} away from free shipping`}
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={36} className="text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Start your ritual</p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 px-6 py-5">
                  {/* Product Image */}
                  <div className="w-[72px] h-[72px] bg-secondary/40 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-semibold tracking-wide uppercase leading-tight">
                          {item.product.node.title}
                        </h4>
                        {item.selectedOptions.length > 0 && item.selectedOptions[0]?.value !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map((o) => o.value).join(" · ")}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-semibold whitespace-nowrap">
                        €{(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border/50 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border/30 px-6 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-semibold">€{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              *Shipping, taxes, and discounts calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              disabled={isLoading || isSyncing || redirecting}
              className="w-full bg-foreground text-background py-3.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading || isSyncing || redirecting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  {redirecting && <span>Redirecting to secure checkout…</span>}
                </>
              ) : (
                "CHECKOUT"
              )}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
