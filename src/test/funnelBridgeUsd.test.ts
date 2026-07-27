import { describe, expect, it } from "vitest";
import { BRIDGE_CONFIGS, type BridgeConfig } from "@/pages/funnel/config";
import { localizeToUSD, localizeString } from "@/pages/funnel/usd";

/**
 * Guards the US market contract on the paid bridge lander.
 *
 * Every ACTIVE Meta ad set targets the US and `/f/*` is their only destination.
 * A euro that survives localization is a price the US checkout will not charge —
 * the exact defect this module was built to kill (0 checkouts / 96 landing page
 * views, 7d to 2026-07-25). These figures are cartCreate-verified; if any of them
 * changes, re-verify @inContext(country: US) before touching the expectation.
 */

/** Walk every string in a config, reporting its dotted path. */
function strings(value: unknown, path = ""): Array<[string, string]> {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      strings(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

/** Paths whose currency is the seller's own and must never be FX-converted. */
function competitorPaths(cfg: BridgeConfig): Set<string> {
  const out = new Set<string>();
  cfg.comparison?.rows.forEach((row, i) => {
    if (!row.ours) out.add(`comparison.rows[${i}]`);
  });
  return out;
}

const VERIFIED_USD: Record<string, { listValue: number; checkoutValue: number }> = {
  "51731419922775": { listValue: 103.0, checkoutValue: 87.55 },
  "53502319755607": { listValue: 209.0, checkoutValue: 177.65 },
  "53525385019735": { listValue: 232.0, checkoutValue: 197.2 },
  "53525385052503": { listValue: 232.0, checkoutValue: 197.2 },
  "53525384954199": { listValue: 256.0, checkoutValue: 217.6 },
  "53525384986967": { listValue: 289.0, checkoutValue: 245.65 },
};

describe("bridge funnel — US localization", () => {
  it("leaves no euro anywhere a US visitor can read it", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const us = localizeToUSD(cfg);
      const skip = competitorPaths(cfg);
      const leaks = strings(us)
        .filter(([path]) => ![...skip].some((s) => path.startsWith(s)))
        .filter(([, text]) => text.includes("€"));
      expect(leaks, `${cfg.slug} leaked euro copy: ${JSON.stringify(leaks)}`).toEqual([]);
    }
  });

  it("keeps competitor prices in the seller's native currency", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      if (!cfg.comparison) continue;
      const us = localizeToUSD(cfg);
      cfg.comparison.rows.forEach((row, i) => {
        if (row.ours) return;
        expect(us.comparison!.rows[i], `${cfg.slug} row ${i}`).toEqual(row);
      });
    }
  });

  it("localizes our own comparison row", () => {
    const us = localizeToUSD(BRIDGE_CONFIGS["face-introducer"]);
    const ours = us.comparison!.rows.find((r) => r.ours)!;
    expect(ours.price).toBe("$103");
    // per-modality framing was dropped 2026-07-27 with the FI LED correction:
    // the count changed 4 -> 3 and a number that has already been wrong once
    // is not worth carrying. The table compares on list price alone.
    expect(ours).not.toHaveProperty("perModality");
  });

  it("swaps checkout numerics to cartCreate-verified USD", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const us = localizeToUSD(cfg);
      if (us.checkout) {
        const want = VERIFIED_USD[us.checkout.variantId];
        expect(us.checkout.currency, cfg.slug).toBe("USD");
        expect(us.checkout.listValue, cfg.slug).toBe(want.listValue);
        expect(us.checkout.checkoutValue, cfg.slug).toBe(want.checkoutValue);
        // RITUAL15 is order-level 15%; the click-bound pixel derives the
        // discounted value this way, so it must land on the verified total.
        expect(Math.round(us.checkout.listValue * 0.85 * 100) / 100).toBe(want.checkoutValue);
      }
      us.variantChoices?.options.forEach((opt) => {
        const want = VERIFIED_USD[opt.variantId];
        expect(opt.currency, `${cfg.slug} ${opt.variantId}`).toBe("USD");
        expect(opt.listValue, `${cfg.slug} ${opt.variantId}`).toBe(want.listValue);
        expect(opt.checkoutValue, `${cfg.slug} ${opt.variantId}`).toBe(want.checkoutValue);
      });
    }
  });

  it("quotes the discounted USD figure on every tap point", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const us = localizeToUSD(cfg);
      if (!us.checkout) continue;
      const quoted = `$${us.checkout.checkoutValue.toFixed(2)}`;
      expect(us.hero.cta, cfg.slug).toContain(quoted);
      expect(us.offer.cta, cfg.slug).toContain(quoted);
      // Sticky lines do not all quote a price (FI and Belt lead with the
      // guarantee) — but any money they DO quote must be dollars.
      expect(us.offer.stickyLine, cfg.slug).not.toContain("€");
    }
  });

  it("gel bundle copy matches the verified FI+gel USD cart", () => {
    const us = localizeToUSD(BRIDGE_CONFIGS["face-introducer"]);
    const bundle = us.offer.bundle!;
    expect(bundle.addListValue).toBe(21.0);
    // $103 + $21 = $124 subtotal → $105.40 with RITUAL15 (cartCreate-verified).
    expect(bundle.note).toContain("$124");
    expect(bundle.note).toContain("$105.40");
    expect(bundle.cta).toContain("$105.40");
    const list = us.checkout!.listValue + bundle.addListValue;
    expect(Math.round(list * 0.85 * 100) / 100).toBe(105.4);
  });

  it("promises US shipping, not EU shipping", () => {
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const us = localizeToUSD(cfg);
      const all = strings(us).map(([, t]) => t).join(" ");
      expect(all, cfg.slug).not.toContain("Free, tracked EU shipping");
      expect(all, cfg.slug).not.toContain("ships free within the EU");
    }
  });

  it("makes no promise the US checkout does not keep", () => {
    // Verified on the live US checkout 2026-07-26: installmentPlans is empty and
    // the page contains no Klarna / Shop Pay / Afterpay. Wero is EU-only.
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const all = strings(localizeToUSD(cfg)).map(([, t]) => t).join(" ");
      expect(all, cfg.slug).not.toMatch(/instalment|installment|Klarna/i);
      expect(all, cfg.slug).not.toMatch(/Wero/i);
      expect(all, cfg.slug).not.toMatch(/Import VAT/i);
    }
  });

  it("invents no competitor price", () => {
    // Only competitor figures with a source on file may appear. $595 (NuFACE)
    // is live-verified in the comparison block; the Belt/Mat benchmark figures
    // were unsourced EUR estimates and must not be FX-converted into US prices.
    for (const cfg of Object.values(BRIDGE_CONFIGS)) {
      const body = localizeToUSD(cfg).clinicMath.benchmark.body;
      const figures = body.match(/\$[\d,]+/g) ?? [];
      expect(figures.filter((f) => f !== "$595"), cfg.slug).toEqual([]);
    }
  });

  it("never mutates the home-market config", () => {
    const before = JSON.stringify(BRIDGE_CONFIGS["face-introducer"]);
    localizeToUSD(BRIDGE_CONFIGS["face-introducer"]);
    expect(JSON.stringify(BRIDGE_CONFIGS["face-introducer"])).toBe(before);
  });

  it("substitutes longest money tokens first", () => {
    // "€88.00" must not be eaten by the "€88" rule and become "$103.00" twice over.
    expect(localizeString("€88.00 and €88")).toBe("$103.00 and $103");
    expect(localizeString("€74.80")).toBe("$87.55");
  });
});
