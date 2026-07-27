import { describe, it, expect, beforeEach, vi } from "vitest";
import { pixelDirectCheckout, pixelViewContent } from "@/pages/funnel/tracking";

/**
 * Guard: event ownership on the one-hop bridge funnel.
 *
 *   browser (tracking.ts)  PageView · ViewContent · AddToCart
 *   CAPI    (server)       InitiateCheckout · Purchase
 *
 * The browser must NOT fire InitiateCheckout. CAPI already sends it from the
 * Shopify `checkouts/create` webhook keyed on `event_id = checkout.id`
 * (scripts/meta-capi/capi-sender.js in zential-agent-engine). The browser cannot
 * know that id — the checkout does not exist until after the redirect — so the
 * two can never deduplicate and Meta counts both.
 *
 * This was inert while the browser fired into pixel 915… alone, which no US ad
 * set reads. Once index.html also initialised 2204… (2026-07-27), a client-side
 * InitiateCheckout would double-count on the exact pixel the budget is judged
 * on. Do not re-add it.
 */

type FbqCall = unknown[];

function fbqCalls(): FbqCall[] {
  return (window as unknown as { fbq: { mock: { calls: FbqCall[] } } }).fbq.mock.calls;
}

function trackedEvents(): string[] {
  return fbqCalls()
    .filter((c) => c[0] === "track")
    .map((c) => String(c[1]));
}

const ITEM = {
  variantId: "gid://shopify/ProductVariant/51731419922775",
  name: "The Face Introducer",
  listValue: 88,
  checkoutValue: 74.8,
  currency: "EUR",
};

beforeEach(() => {
  (window as unknown as { fbq: unknown }).fbq = vi.fn();
});

describe("pixelDirectCheckout", () => {
  it("fires AddToCart", () => {
    pixelDirectCheckout(ITEM);
    expect(trackedEvents()).toContain("AddToCart");
  });

  it("does NOT fire InitiateCheckout — CAPI owns that event", () => {
    pixelDirectCheckout(ITEM);
    expect(trackedEvents()).not.toContain("InitiateCheckout");
  });

  it("fires exactly one event per buy-CTA click", () => {
    pixelDirectCheckout(ITEM);
    expect(trackedEvents()).toEqual(["AddToCart"]);
  });

  it("sends the list value and currency with AddToCart", () => {
    pixelDirectCheckout(ITEM);
    const atc = fbqCalls().find((c) => c[1] === "AddToCart");
    expect(atc?.[2]).toMatchObject({ value: 88, currency: "EUR", content_type: "product" });
  });

  it("never throws when fbq is absent — tracking must not break the page", () => {
    delete (window as unknown as { fbq?: unknown }).fbq;
    expect(() => pixelDirectCheckout(ITEM)).not.toThrow();
  });
});

describe("pixelViewContent", () => {
  it("fires ViewContent so the ad sets can see a product-intent landing", () => {
    pixelViewContent();
    expect(trackedEvents()).toContain("ViewContent");
  });
});
