import { describe, it, expect, vi, beforeEach } from "vitest";

// syncCart must reconcile persisted line prices against the live cart —
// a price change in Shopify (Belt €280 → €180, 2026-07-08) must never
// keep showing the stale snapshot a returning visitor has in localStorage.
vi.mock("@/lib/shopify", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/shopify")>();
  return { ...actual, storefrontApiRequest: vi.fn() };
});

import { storefrontApiRequest } from "@/lib/shopify";
import { useCartStore, type CartItem } from "@/stores/cartStore";

const BELT_VARIANT = "gid://shopify/ProductVariant/53502319755607";

const staleBeltItem: CartItem = {
  lineId: "gid://shopify/CartLine/1",
  product: { node: { title: "Restoration Belt" } } as CartItem["product"],
  variantId: BELT_VARIANT,
  variantTitle: "black",
  price: { amount: "280.0", currencyCode: "EUR" },
  quantity: 1,
  selectedOptions: [],
};

const liveCartResponse = (lines: Array<{ lineId: string; variantId: string; amount: string; quantity: number }>) => ({
  data: {
    cart: {
      id: "gid://shopify/Cart/abc",
      checkoutUrl: "https://0d1m9a-w7.myshopify.com/cart/c/abc",
      totalQuantity: lines.reduce((n, l) => n + l.quantity, 0),
      lines: {
        edges: lines.map((l) => ({
          node: {
            id: l.lineId,
            quantity: l.quantity,
            merchandise: { id: l.variantId, price: { amount: l.amount, currencyCode: "EUR" } },
          },
        })),
      },
    },
  },
});

beforeEach(() => {
  vi.mocked(storefrontApiRequest).mockReset();
  useCartStore.setState({
    items: [staleBeltItem],
    cartId: "gid://shopify/Cart/abc",
    checkoutUrl: null,
    isSyncing: false,
  });
});

describe("syncCart price reconciliation", () => {
  it("replaces a stale persisted price with the live variant price", async () => {
    vi.mocked(storefrontApiRequest).mockResolvedValue(
      liveCartResponse([{ lineId: "gid://shopify/CartLine/1", variantId: BELT_VARIANT, amount: "180.0", quantity: 1 }])
    );
    await useCartStore.getState().syncCart();
    expect(useCartStore.getState().items[0].price.amount).toBe("180.0");
  });

  it("adopts the server quantity when it differs", async () => {
    vi.mocked(storefrontApiRequest).mockResolvedValue(
      liveCartResponse([{ lineId: "gid://shopify/CartLine/1", variantId: BELT_VARIANT, amount: "180.0", quantity: 2 }])
    );
    await useCartStore.getState().syncCart();
    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("drops items whose line no longer exists in the live cart", async () => {
    useCartStore.setState({
      items: [
        staleBeltItem,
        { ...staleBeltItem, lineId: "gid://shopify/CartLine/2", variantId: "gid://shopify/ProductVariant/999" },
      ],
    });
    vi.mocked(storefrontApiRequest).mockResolvedValue(
      liveCartResponse([{ lineId: "gid://shopify/CartLine/1", variantId: BELT_VARIANT, amount: "180.0", quantity: 1 }])
    );
    await useCartStore.getState().syncCart();
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].variantId).toBe(BELT_VARIANT);
  });

  it("clears the cart when the live cart is empty", async () => {
    vi.mocked(storefrontApiRequest).mockResolvedValue(liveCartResponse([]));
    await useCartStore.getState().syncCart();
    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useCartStore.getState().cartId).toBeNull();
  });
});
