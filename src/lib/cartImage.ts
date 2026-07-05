import type { ShopifyProduct } from "@/lib/shopify";

/**
 * Append a Shopify CDN width transform. The cart drawer thumb renders in a
 * 72px box, so 144 (2x for retina) turns a multi-MB original into ~30KB.
 */
export function shopifyThumb(url: string, width = 144): string {
  try {
    const u = new URL(url);
    u.searchParams.set("width", String(width));
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * The exact image the cart drawer displays for a line item:
 * selected variant's image, else the 2nd product image, else the 1st.
 * Keep this in sync with CartDrawer — it exists so the add-to-cart preload
 * warms the same URL the drawer will request.
 */
export function cartItemImageUrl(product: ShopifyProduct, variantId: string): string | null {
  const variant = product.node.variants.edges.find((v) => v.node.id === variantId);
  const edges = product.node.images?.edges;
  const img = variant?.node?.image ?? edges?.[1]?.node ?? edges?.[0]?.node;
  return img?.url ?? null;
}

/**
 * Warm the browser cache for the drawer thumb. Fired at add-to-cart click
 * time, so the ~30KB fetch completes during the Shopify cart API round-trip
 * that happens before the drawer opens.
 */
export function preloadCartItemImage(product: ShopifyProduct, variantId: string): void {
  if (typeof window === "undefined") return;
  const url = cartItemImageUrl(product, variantId);
  if (!url) return;
  const img = new Image();
  img.src = shopifyThumb(url);
}
