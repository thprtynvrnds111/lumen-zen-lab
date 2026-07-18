import { describe, expect, it } from "vitest";
import { BRIDGE_CONFIGS } from "@/pages/funnel/config";

/**
 * Guards the one-hop checkout contract on the paid bridge lander.
 * These figures are customer-visible price promises — if they drift from each
 * other the page promises a number checkout does not charge.
 */
describe("bridge funnel config contract", () => {
  it("every config has the first-screen fields", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      expect(cfg.hero.priceLine, cfg.slug).toMatch(/€\d/);
      expect(cfg.hero.cta, cfg.slug).not.toHaveLength(0);
      expect(cfg.offer.stickyLine, cfg.slug).toMatch(/€\d/);
    }
  });

  it("face-introducer checkout data is internally consistent", () => {
    const fi = BRIDGE_CONFIGS["face-introducer"];
    expect(fi.checkout).toBeDefined();
    const c = fi.checkout!;
    expect(c.variantId).toMatch(/^\d+$/);
    expect(c.currency).toBe("EUR");
    // RITUAL15 = 15% off list. If either figure changes, re-verify via a live
    // cartCreate before updating this expectation.
    expect(c.checkoutValue).toBeCloseTo(c.listValue * 0.85, 2);
  });

  it("copy quoting the discounted price matches checkout.checkoutValue", () => {
    const fi = BRIDGE_CONFIGS["face-introducer"];
    const quoted = fi.checkout!.checkoutValue.toFixed(2).replace(".", ".");
    for (const s of [fi.offer.priceNote, fi.offer.ctaNote, fi.offer.stickyLine]) {
      expect(s).toContain(`€${quoted}`);
      expect(s.includes("RITUAL15") || s.includes("founding")).toBe(true);
    }
  });

  it("configs without checkout data still route buy CTAs to their PDP", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      if (!cfg.checkout) {
        expect(cfg.pdpPath).toMatch(/^\/instruments\//);
        expect(cfg.discountCode).not.toHaveLength(0);
      }
    }
  });
});
