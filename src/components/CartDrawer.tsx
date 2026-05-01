import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, X, Loader2, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { fetchProductByHandle } from "@/lib/shopify";

const FREE_SHIPPING_THRESHOLD = 75;
const GEL_HANDLE = "medicube-collagen-elastic-jelly-moisturizing-cream";
const ACCESSORY_HANDLES = [GEL_HANDLE, "collagen-eye-mask"];

export function CartDrawer() {
  const { items, isLoading, isSyncing, isOpen, openCart, closeCart, updateQuantity, removeItem, syncCart, addItem } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShippingUnlocked = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = (FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2);

  const [gelProduct, setGelProduct] = useState<any>(null);
  const [addingGel, setAddingGel] = useState(false);

  const hasDevice = items.some(i => !ACCESSORY_HANDLES.includes(i.product.node.handle));
  const hasGel = items.some(i => i.product.node.handle === GEL_HANDLE);
  const showUpsell = hasDevice && !hasGel && gelProduct;

  useEffect(() => {
    fetchProductByHandle(GEL_HANDLE).then(p => { if (p) setGelProduct(p); }).catch(() => {});
  }, []);

  const handleAddGel = async () => {
    if (!gelProduct) return;
    const variant = gelProduct.variants?.edges?.[0]?.node;
    if (!variant) return;
    setAddingGel(true);
    await addItem({
      product: { node: gelProduct },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setAddingGel(false);
  };

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const [redirecting, setRedirecting] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setRedirecting(true);

    // Meta Pixel: InitiateCheckout
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        num_items: totalItems,
        value: totalPrice,
        currency: 'EUR',
      });
    }
    // Build permalink-style checkout URL using numeric variant IDs
    const lines = items.map(item => {
      // Extract numeric ID from GID format: gid://shopify/ProductVariant/123
      const numericId = item.variantId.split('/').pop();
      return `${numericId}:${item.quantity}`;
    }).join(',');
    window.location.href = `https://checkout.zentialpure.com/cart/${lines}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <SheetTrigger asChild>
        <button aria-label="Shopping bag" className="relative text-muted-foreground hover:text-foreground transition-colors">
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
            onClick={() => closeCart()}
            aria-label="Close cart"
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
                  {/* Product Image — prefer variant image, then 2nd product image, then 1st */}
                  <div className="w-[72px] h-[72px] bg-secondary/40 rounded-lg overflow-hidden flex-shrink-0">
                    {(() => {
                      // Find the selected variant's image
                      const variant = item.product.node.variants.edges.find(v => v.node.id === item.variantId);
                      const variantImg = variant?.node?.image;
                      const edges = item.product.node.images?.edges;
                      const img = variantImg || edges?.[1]?.node || edges?.[0]?.node;
                      return img ? (
                        <img
                          src={img.url}
                          alt={item.product.node.title}
                          width={72}
                          height={72}
                          className="w-full h-full object-cover"
                        />
                      ) : null;
                    })()}
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
                        {parseFloat(item.price.amount) * item.quantity === 0
                          ? <span className="text-xs text-accent font-medium">Included</span>
                          : `€${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}`}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border/50 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
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

        {/* Upsell — Collagen Gel */}
        {showUpsell && (
          <div className="flex-shrink-0 mx-4 mb-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 flex items-center gap-3">
            <Sparkles size={15} className="text-accent flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground leading-snug">Complete your ritual</p>
              <p className="text-[10px] text-muted-foreground">Add Collagen Face Gel — formulated for device use</p>
            </div>
            <button
              onClick={handleAddGel}
              disabled={addingGel}
              className="text-[10px] tracking-[0.12em] uppercase font-semibold px-3 py-1.5 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors flex-shrink-0 disabled:opacity-50"
            >
              {addingGel ? <Loader2 size={12} className="animate-spin" /> : `+€${gelProduct?.variants?.edges?.[0]?.node?.price?.amount ? parseFloat(gelProduct.variants.edges[0].node.price.amount).toFixed(0) : "25"}`}
            </button>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-border/30 px-6 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-semibold">€{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 text-center">
              Shipping, taxes & discounts calculated at checkout
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
