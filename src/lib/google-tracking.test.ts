import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  trackViewItem,
  trackAddToCart,
  trackBeginCheckout,
  _resetGoogleTracking,
} from "@/lib/google-tracking";

const GTAG_SRC = "https://www.googletagmanager.com/gtag/js";

interface GtagWindow {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function w(): GtagWindow {
  return window as unknown as GtagWindow;
}

/** gtag pushes the raw `arguments` object — flatten each entry to an array. */
function events(): unknown[][] {
  return (w().dataLayer ?? []).map((e) => Array.from(e as ArrayLike<unknown>));
}

function injectedScripts(): number {
  return document.querySelectorAll(`script[src^="${GTAG_SRC}"]`).length;
}

beforeEach(() => {
  _resetGoogleTracking();
  delete w().gtag;
  delete w().dataLayer;
  document.querySelectorAll(`script[src^="${GTAG_SRC}"]`).forEach((s) => s.remove());
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("google-tracking — disabled (no VITE_GOOGLE_ADS_ID)", () => {
  it("no-ops: injects no script, defines no dataLayer, never throws", () => {
    vi.stubEnv("VITE_GOOGLE_ADS_ID", "");
    expect(() => {
      trackViewItem({ id: "face", name: "Face Introducer", price: 88, currency: "EUR" });
      trackAddToCart({ id: "face", name: "Face Introducer", price: 88, currency: "EUR" }, 2);
      trackBeginCheckout(176, "EUR");
    }).not.toThrow();
    expect(injectedScripts()).toBe(0);
    expect(w().dataLayer).toBeUndefined();
  });
});

describe("google-tracking — enabled (VITE_GOOGLE_ADS_ID set)", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GOOGLE_ADS_ID", "AW-TEST123");
  });

  it("lazily injects the gtag script exactly once", () => {
    trackViewItem({ id: "face", name: "Face Introducer", price: 88, currency: "EUR" });
    trackAddToCart({ id: "face", name: "Face Introducer", price: 88, currency: "EUR" });
    expect(injectedScripts()).toBe(1);
    expect(document.querySelector(`script[src^="${GTAG_SRC}"]`)?.getAttribute("src")).toContain(
      "AW-TEST123",
    );
  });

  it("pushes view_item with the product's currency and value", () => {
    trackViewItem({ id: "mat", name: "Restoration Mat", price: 235, currency: "USD" });
    const ev = events().find((e) => e[0] === "event" && e[1] === "view_item");
    expect(ev).toBeDefined();
    const params = ev![2] as Record<string, unknown>;
    expect(params.currency).toBe("USD");
    expect(params.value).toBe(235);
    expect(params.send_to).toBe("AW-TEST123");
    expect((params.items as unknown[])[0]).toMatchObject({ item_id: "mat", quantity: 1 });
  });

  it("pushes add_to_cart with value multiplied by quantity", () => {
    trackAddToCart({ id: "gel", name: "Restore Gel", price: 18, currency: "EUR" }, 3);
    const ev = events().find((e) => e[0] === "event" && e[1] === "add_to_cart");
    expect(ev).toBeDefined();
    const params = ev![2] as Record<string, unknown>;
    expect(params.currency).toBe("EUR");
    expect(params.value).toBe(54);
    expect((params.items as { quantity: number }[])[0].quantity).toBe(3);
  });

  it("pushes begin_checkout with the cart total, currency and items", () => {
    trackBeginCheckout(103, "USD", [
      { item_id: "face", item_name: "Face Introducer", price: 103, quantity: 1 },
    ]);
    const ev = events().find((e) => e[0] === "event" && e[1] === "begin_checkout");
    expect(ev).toBeDefined();
    const params = ev![2] as Record<string, unknown>;
    expect(params.currency).toBe("USD");
    expect(params.value).toBe(103);
    expect((params.items as unknown[]).length).toBe(1);
  });
});
