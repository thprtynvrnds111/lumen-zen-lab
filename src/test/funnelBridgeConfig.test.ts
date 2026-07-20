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
      expect(cfg.offer.stickyLine, cfg.slug).not.toHaveLength(0);
      if (cfg.checkout) {
        // Price lives on the CTAs now — every tap point states action + exact number.
        const quoted = `€${cfg.checkout.checkoutValue.toFixed(2)}`;
        expect(cfg.hero.cta, cfg.slug).toContain(quoted);
        expect(cfg.offer.cta, cfg.slug).toContain(quoted);
      }
    }
  });

  it("every checkout block is internally consistent", () => {
    const withCheckout = Object.values(BRIDGE_CONFIGS).filter((c) => c.checkout);
    expect(withCheckout.length).toBeGreaterThan(0);
    for (const cfg of withCheckout) {
      const c = cfg.checkout!;
      expect(c.variantId, cfg.slug).toMatch(/^\d+$/);
      expect(c.currency, cfg.slug).toBe("EUR");
      // RITUAL15 = 15% off list. If either figure changes, re-verify via a live
      // cartCreate before updating this expectation.
      expect(c.checkoutValue, cfg.slug).toBeCloseTo(c.listValue * 0.85, 2);
    }
  });

  it("copy quoting the discounted price matches checkout.checkoutValue", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      if (!cfg.checkout) continue;
      const quoted = cfg.checkout.checkoutValue.toFixed(2);
      // Offer price + hero priceLine carry the exact verified number; notes name the mechanic.
      expect(cfg.offer.price, cfg.slug).toBe(`€${quoted}`);
      expect(cfg.hero.priceLine, cfg.slug).toContain(`€${quoted}`);
      expect(cfg.hero.priceLine, cfg.slug).toContain(`€${cfg.checkout.listValue}`);
      for (const s of [cfg.offer.priceNote, cfg.offer.ctaNote]) {
        expect(s.includes("RITUAL15") || s.includes("founding"), cfg.slug).toBe(true);
      }
      expect(cfg.offer.ctaNote, cfg.slug).toContain(`€${quoted}`);
    }
  });

  it("bundle figures stay consistent with the 15% order-level code", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const b = cfg.offer.bundle;
      if (!b || !cfg.checkout) continue;
      expect(b.addVariantId, cfg.slug).toMatch(/^\d+$/);
      const listTotal = cfg.checkout.listValue + b.addListValue;
      const discounted = (listTotal * 0.85).toFixed(2);
      // Copy must quote the exact verified bundle totals.
      expect(b.note, cfg.slug).toContain(`€${listTotal}`);
      expect(b.note, cfg.slug).toContain(`€${discounted}`);
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
