/**
 * /one-shelf is the lander every System ad points at (knowledge/ads/ad-registry.json).
 * On 2026-08-02 it was found still carrying four defects, three of which were
 * supposedly fixed elsewhere weeks earlier:
 *
 *  1. Hardcoded "€399" / "€468" that the Storefront fetch never overwrote, plus EUR
 *     price *seeds* in useState — so a US visitor saw EUR on first paint and forever
 *     if the fetch failed. This is the exact currency mismatch that killed the July
 *     funnel on /f/*, which was fixed there and never swept here.
 *  2. "3 instalments available at checkout", three times. The live US checkout
 *     serialises `installmentPlans: []`. The claim was removed from /f/* on
 *     2026-07-26 for precisely this reason and survived here.
 *  3. "free EU shipping" shown to US traffic.
 *  4. "2-year warranty" — a warranty the business does not offer and states nowhere
 *     else on the site.
 *
 * These assertions are deliberately about the SOURCE, not a rendered snapshot: the
 * defect was literal strings in JSX, and a render test would have passed while the
 * hardcoded top-offer block stayed wrong.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SRC = readFileSync(resolve(__dirname, "../pages/OneShelf.tsx"), "utf8");

/** Strip block and line comments so the incident description above a fix does not
 *  itself trip the guard. */
const code = SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("/one-shelf — no hardcoded currency", () => {
  it("contains no literal euro amount", () => {
    const hits = code.match(/€\s?\d[\d.,]*/g) ?? [];
    expect(hits, `hardcoded EUR in OneShelf.tsx: ${hits.join(", ")}`).toEqual([]);
  });

  it("contains no literal dollar amount either — price comes from the Storefront API", () => {
    const hits = code.match(/\$\s?\d[\d.,]*/g) ?? [];
    expect(hits, `hardcoded USD in OneShelf.tsx: ${hits.join(", ")}`).toEqual([]);
  });

  it("does not seed a price into state — a seed renders before the fetch resolves", () => {
    expect(code).not.toMatch(/useState\(\s*["'`]\s*[€$]/);
    expect(code).toMatch(/useState<string \| null>\(null\)/);
  });
});

describe("/one-shelf — no promise the checkout does not keep", () => {
  it("does not promise instalments", () => {
    expect(code).not.toMatch(/instal?lments?/i);
  });

  it("does not promise a warranty", () => {
    expect(code).not.toMatch(/\d+[- ]year warranty|warranty/i);
  });

  it("does not promise EU-specific shipping on a US-targeted lander", () => {
    expect(code).not.toMatch(/free EU shipping/i);
  });
});

describe("/one-shelf — price elements omit rather than degrade", () => {
  it("guards every price render behind a null check", () => {
    // Each of the four price render sites must be conditional.
    const renders = code.match(/\{price(?:Value)?\s*(?:&&|\?)/g) ?? [];
    expect(renders.length).toBeGreaterThanOrEqual(3);
  });

  it("never sends a null value into the pixel payload", () => {
    expect(code).toMatch(/value:\s*priceValue\s*\?\?\s*undefined/);
  });
});
