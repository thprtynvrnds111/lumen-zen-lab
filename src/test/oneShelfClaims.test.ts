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

/**
 * The warranty number must be ONE number, everywhere.
 *
 * Until 2026-08-03 the site promised a "2-year warranty" in ten places — PDP trust
 * chips, TrustBadges, the funnel FAQ, comparison tables, entity.html and the AEO
 * surfaces — while the business stated no warranty at all in its own returns policy
 * and had never decided one. The operator set it at 1 year on 2026-08-02/03. A single
 * surviving "2-year" is worse than none: it is a promise the policy page contradicts.
 */
describe("warranty — one number, site-wide", () => {
  const FILES = [
    "../pages/InstrumentLanding.tsx",
    "../pages/InstrumentSystem.tsx",
    "../pages/funnel/config.ts",
    "../components/zential/TrustBadges.tsx",
    "../../public/products.md",
    "../../public/comparisons.md",
    "../../public/llms.txt",
    "../../public/llms-full.txt",
  ];

  it("no file claims a 2-year or two-year warranty", () => {
    const offenders: string[] = [];
    for (const f of FILES) {
      const body = readFileSync(resolve(__dirname, f), "utf8");
      if (/2-year warranty|2-yr warranty|two-year warranty/i.test(body)) offenders.push(f);
    }
    expect(offenders, `stale 2-year warranty claim in: ${offenders.join(", ")}`).toEqual([]);
  });

  it("the returns policy actually states the warranty in every locale", () => {
    for (const loc of ["en", "nl", "de", "fr"]) {
      const json = readFileSync(resolve(__dirname, `../locales/${loc}/returns.json`), "utf8");
      expect(json, `${loc}/returns.json has no warranty entry`).toMatch(/1[- ](Year|Jaar|Jahr|An)/i);
    }
  });
});
