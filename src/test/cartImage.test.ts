import { describe, it, expect } from "vitest";
import { shopifyThumb, cartItemImageUrl } from "@/lib/cartImage";
import type { ShopifyProduct } from "@/lib/shopify";

const makeProduct = (opts: {
  variantImage?: string | null;
  images?: string[];
}): ShopifyProduct =>
  ({
    node: {
      variants: {
        edges: [
          {
            node: {
              id: "gid://shopify/ProductVariant/1",
              image: opts.variantImage ? { url: opts.variantImage, altText: null } : undefined,
            },
          },
        ],
      },
      images: {
        edges: (opts.images ?? []).map((url) => ({ node: { url, altText: null } })),
      },
    },
  }) as unknown as ShopifyProduct;

describe("shopifyThumb", () => {
  it("appends width to a URL that already has a query string", () => {
    expect(shopifyThumb("https://cdn.shopify.com/s/files/x.png?v=123")).toBe(
      "https://cdn.shopify.com/s/files/x.png?v=123&width=144"
    );
  });

  it("overrides an existing width param", () => {
    expect(shopifyThumb("https://cdn.shopify.com/s/files/x.png?width=2000", 144)).toBe(
      "https://cdn.shopify.com/s/files/x.png?width=144"
    );
  });

  it("returns the input unchanged when it is not a valid URL", () => {
    expect(shopifyThumb("not-a-url")).toBe("not-a-url");
  });
});

describe("cartItemImageUrl", () => {
  it("prefers the selected variant's image", () => {
    const p = makeProduct({ variantImage: "https://cdn/v.png", images: ["https://cdn/0.png", "https://cdn/1.png"] });
    expect(cartItemImageUrl(p, "gid://shopify/ProductVariant/1")).toBe("https://cdn/v.png");
  });

  it("falls back to the second product image, then the first", () => {
    const p2 = makeProduct({ images: ["https://cdn/0.png", "https://cdn/1.png"] });
    expect(cartItemImageUrl(p2, "gid://shopify/ProductVariant/1")).toBe("https://cdn/1.png");
    const p1 = makeProduct({ images: ["https://cdn/0.png"] });
    expect(cartItemImageUrl(p1, "gid://shopify/ProductVariant/1")).toBe("https://cdn/0.png");
  });

  it("returns null when there are no images at all", () => {
    expect(cartItemImageUrl(makeProduct({}), "gid://shopify/ProductVariant/1")).toBeNull();
  });
});
