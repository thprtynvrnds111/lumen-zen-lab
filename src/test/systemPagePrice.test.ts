import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard: the System page must render a price server-side.
 *
 * Prices come from the Storefront API so US visitors resolve to USD, but that
 * fetch cannot run during prerender. Seeding the price state with `null` meant
 * the prerendered HTML shipped an em-dash for every price and the hero CTA read
 * "Claim the System — " with no amount — on the €399 bundle, the highest-value
 * SKU in the catalog and the only product a funnel customer has ever bought.
 *
 * Nobody clicks a buy button that will not say what it costs, and the failure is
 * invisible in dev: hydration fills the price in within ~300ms on a fast local
 * machine, so it only shows up in the prerendered HTML a crawler or a slow
 * connection actually sees.
 *
 * The seed is the home-market list price; hydration overwrites it with the live,
 * market-correct figure. Source of truth for the numbers:
 * knowledge/products/LIVE-CATALOG-TRUTH.md in the engine repo.
 */
const src = readFileSync(resolve(__dirname, "../pages/InstrumentSystem.tsx"), "utf8");

describe("System page price seeding", () => {
  it("seeds the bundle price so SSR never renders a bare em-dash CTA", () => {
    expect(src).toMatch(/SEED_BUNDLE_PRICE\s*=\s*399/);
    expect(src).toMatch(/useState<number \| null>\(SEED_BUNDLE_PRICE\)/);
  });

  it("seeds each instrument price", () => {
    expect(src).toMatch(/SEED_INSTRUMENT_PRICES/);
    for (const price of [88, 180, 200]) {
      expect(src).toContain(`: ${price},`);
    }
  });

  it("never initialises price state to null — that is the bug this guards", () => {
    expect(src).not.toMatch(/useState<number \| null>\(null\)/);
  });

  it("still fetches live prices, so the seed is only a first paint", () => {
    expect(src).toContain("fetchProductByHandle");
    expect(src).toContain("formatMoney");
  });
});
