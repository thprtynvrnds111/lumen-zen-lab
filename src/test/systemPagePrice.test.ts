import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard: the System page must never render a broken price token.
 *
 * History, because this file has now guarded two opposite doctrines:
 *
 *  - 2026-07: price state seeded with the EUR list price so prerendered HTML
 *    always carried an amount ("Claim the System — €399"). This file guarded
 *    the seed.
 *  - 2026-08-01 operator decision: never show a wrong currency. market.ts
 *    serves USD to the US, so an EUR seed renders €399 to a US visitor — and
 *    permanently if the live fetch fails. The seed is gone; price state starts
 *    null and every caller omits its whole price element until the live,
 *    market-correct figure resolves. The prerendered HTML deliberately carries
 *    no price, and the CTA reads "Claim the System" until hydration adds
 *    " — $399".
 *
 * What must never come back, under either doctrine: a dangling token — a CTA
 * reading "Claim the System — " with no amount, an em-dash placeholder beside
 * a buy button, or a bare "save " with nothing after it.
 */
const src = readFileSync(resolve(__dirname, "../pages/InstrumentSystem.tsx"), "utf8");

describe("System page price rendering", () => {
  it("does not seed a home-market price — wrong currency for non-EUR markets", () => {
    expect(src).not.toMatch(/SEED_BUNDLE_PRICE|SEED_INSTRUMENT_PRICES/);
  });

  it("formats to null while unresolved, never to an em-dash placeholder", () => {
    // fmt must resolve to null (so callers can omit the element)…
    expect(src).toMatch(/formatMoney\([^)]*\)\s*:\s*null/);
    // …and no em-dash / "--" fallback may exist anywhere in the page.
    expect(src).not.toMatch(/\?\?\s*"—"|:\s*"—"|"--/);
  });

  it("the CTA only gains the price segment once the amount resolves", () => {
    // The unconditional concatenation is the bug this file exists to block.
    expect(src).not.toMatch(/"Claim the System — "\s*\+/);
    // The price suffix must be behind a fmt(...) truthiness check.
    expect(src).toMatch(/"Claim the System"\s*\+\s*\(fmt\(/);
  });

  it('never renders a bare "save " — the savings segment is conditional', () => {
    // "· save {fmt(...)}" may only appear inside a fragment guarded by a
    // fmt(...) truthiness check, spelled "Founding bundle{fmt(… && <> · save".
    expect(src).toMatch(/Founding bundle\{fmt\([^)]*\)\s*&&\s*<>\s*·\s*save\s*\{fmt\(/);
    // The old unguarded spelling put the save text directly after a text node.
    expect(src).not.toMatch(/Founding bundle\s*·\s*save\s*\{fmt\(/);
  });

  it("still fetches live prices — null-until-resolved is a loading state, not the end state", () => {
    expect(src).toContain("fetchProductByHandle");
    expect(src).toContain("formatMoney");
  });
});
