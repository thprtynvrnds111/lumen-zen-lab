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

  it("variantChoices, where present, quote cartCreate-verified per-variant math", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const vc = cfg.variantChoices;
      if (!vc) continue;
      // A multi-variant product picks the choice grid, never a single checkout block.
      expect(cfg.checkout, cfg.slug).toBeUndefined();
      expect(vc.options.length, cfg.slug).toBeGreaterThanOrEqual(2);
      for (const o of vc.options) {
        expect(o.variantId, cfg.slug).toMatch(/^\d+$/);
        expect(o.currency, cfg.slug).toBe("EUR");
        // RITUAL15 = 15% order-level. Re-verify via a live cartCreate before
        // changing either figure.
        expect(o.checkoutValue, `${cfg.slug} ${o.label}`).toBeCloseTo(o.listValue * 0.85, 2);
        // Every tap point states action + exact number; the line names the list price.
        const quoted = `€${o.checkoutValue.toFixed(2)}`;
        expect(o.cta, `${cfg.slug} ${o.label}`).toContain(quoted);
        expect(o.priceLine, `${cfg.slug} ${o.label}`).toContain(quoted);
        expect(o.priceLine, `${cfg.slug} ${o.label}`).toContain(`€${o.listValue}`);
      }
      // Hero + sticky anchor the cheapest verified "from €X" number.
      const fromQuote = `€${Math.min(...vc.options.map((o) => o.checkoutValue)).toFixed(2)}`;
      expect(cfg.hero.priceLine, cfg.slug).toContain(fromQuote);
      expect(cfg.hero.cta, cfg.slug).toContain(fromQuote);
      expect(cfg.offer.price, cfg.slug).toContain(fromQuote);
      expect(cfg.offer.stickyLine, cfg.slug).toContain(fromQuote);
    }
  });

  it("price comparison, where present, is well-formed and sober", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const cmp = cfg.comparison;
      if (!cmp) continue;
      // Structure: at least our row + one competitor, exactly one `ours`.
      expect(cmp.rows.length, cfg.slug).toBeGreaterThanOrEqual(2);
      expect(cmp.rows.filter((r) => r.ours).length, cfg.slug).toBe(1);
      const ours = cmp.rows.find((r) => r.ours)!;
      // Our row carries the €88 list anchor. It must NOT carry a modality count:
      // per-modality framing was dropped 2026-07-27 when the Face Introducer went
      // from four claimed modalities to three (its LED is a mode indicator, not a
      // treatment modality). The table compares on list price alone now.
      expect(ours.price, cfg.slug).toContain("€88");
      expect(ours.modalities, cfg.slug).not.toMatch(/\d+ modalities/);
      for (const r of cmp.rows) {
        expect(r.name, cfg.slug).not.toHaveLength(0);
        expect(r.price, cfg.slug).toMatch(/[€$£]/);
      }
      // Sober footnote: dated + trademark disclaimer, no affiliation.
      expect(cmp.footnote, cfg.slug).toMatch(/2026/);
      expect(cmp.footnote.toLowerCase(), cfg.slug).toContain("trademark");
      expect(cmp.footnote.toLowerCase(), cfg.slug).toContain("not affiliated");
      // No performance-equivalence language leaking into the block.
      const blob = `${cmp.headline} ${cmp.intro} ${cmp.takeaway}`.toLowerCase();
      for (const banned of ["better results", "as effective", "outperform", "same results"]) {
        expect(blob, cfg.slug).not.toContain(banned);
      }
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
