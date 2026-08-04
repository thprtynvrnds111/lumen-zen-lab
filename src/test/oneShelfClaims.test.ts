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
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

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
  /**
   * v2, 2026-08-03. v1 of this guard MISSED FIVE LIVE CLAIMS, in exactly the two ways
   * a content guard dies — both of which had been written down hours earlier:
   *
   *   1. WHOLE-FILE EXCLUSION. v1 checked a hand-listed FILES array. BundleSection.tsx,
   *      ProductLanding.tsx and public/nuface-alternatief.html were simply not in it, so
   *      "2-Year Warranty", "2-year hardware warranty" and "2 jaar garantie" sailed through.
   *   2. PHRASE VARIANT. v1 matched /2-year warranty/. The three PDP spec rows read
   *      { k: "Warranty", v: "2 years" } — no hyphen, words reversed, no match. Those pages
   *      rendered a "1-year warranty" trust chip and a "Warranty: 2 years" spec row ON THE
   *      SAME SCREEN.
   *
   * v2 therefore walks the whole tree and matches a duration NEAR a warranty word, in
   * English and Dutch, rather than one hard-coded phrase.
   */
  const ROOT = resolve(__dirname, "../..");
  const EXTS = [".ts", ".tsx", ".html", ".txt", ".md", ".json"];
  /**
   * v3, 2026-08-04: `src/locales` came OUT of this list. It was the last whole-directory
   * exclusion left, and the whole customer-facing site is translated — every warranty
   * sentence a Dutch buyer reads lives in exactly the directory the guard was not
   * looking at. That is failure mode #1 above, one directory up.
   *
   * src/test stays excluded because this file necessarily contains the strings it hunts.
   */
  const SKIP = ["node_modules", "dist", ".ssr", ".git", "src/test"];

  function walk(dir: string, out: string[] = []): string[] {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (SKIP.some((s) => full.includes(s))) continue;
      if (e.isDirectory()) walk(full, out);
      else if (EXTS.some((x) => e.name.endsWith(x))) out.push(full);
    }
    return out;
  }

  /** A duration within ~40 chars of a warranty word, either order, EN + NL. */
  const BAD = [
    /(?:2|two|twee)[\s-]*(?:year|yr|jaar)s?[^.\n]{0,40}?(?:warrant|garantie)/i,
    /(?:warrant\w*|garantie)[^.\n]{0,40}?(?:2|two|twee)[\s-]*(?:year|yr|jaar)/i,
  ];

  /**
   * The guard is about what WE promise, so it must not fire on what the LAW gives.
   * EU Directive 2019/771 Art. 17(2) *requires* us to tell the buyer they have a legal
   * conformity right of at least two years — the statutory clause on /warranty says
   * exactly that, in the same sentence as the word "garantie", and a naive sweep reads
   * it as a stale 2-year promise.
   *
   * Scoped by SUBJECT, not by file: only sentences that name the statute are exempt, and
   * the marker list is narrow enough that it cannot be used as a shield. "Our 2-year
   * warranty" does not become legal by adding the word "wettelijk" to it — it becomes a
   * different, true statement about the law.
   */
  const STATUTORY = /statutor|wettelijk|conformit|by law|the law|de wet|directive|richtlijn|gesetzlich|légal/i;
  const stripStatutorySentences = (body: string) =>
    body
      .split(/(?<=[.!?])\s+|\n/)
      .filter((sentence) => !STATUTORY.test(sentence))
      .join("\n");

  it("no file anywhere claims a two-year warranty", () => {
    const offenders: string[] = [];
    for (const f of [...walk(join(ROOT, "src")), ...walk(join(ROOT, "public"))]) {
      const body = stripStatutorySentences(readFileSync(f, "utf8"));
      if (BAD.some((re) => re.test(body))) offenders.push(f.replace(ROOT + "/", ""));
    }
    expect(offenders, `stale 2-year warranty claim in:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("the statutory exemption cannot be used as a shield", () => {
    // A real marketing promise keeps firing even when the statute is named nearby, as
    // long as the promise sits in its own sentence — which is how copy is written.
    const shielded =
      "You have a legal conformity right of at least two years. Our instruments carry a 2-year warranty.";
    expect(BAD.some((re) => re.test(stripStatutorySentences(shielded)))).toBe(true);
  });

  it("does not fire on the mandatory statutory-rights clause", () => {
    const clause =
      "Consumenten in de EU hebben minstens twee jaar wettelijke conformiteitsgarantie.";
    expect(BAD.some((re) => re.test(stripStatutorySentences(clause)))).toBe(false);
  });

  it("catches the exact variants v1 missed", () => {
    const missed = [
      '{ k: "Warranty", v: "2 years" },',
      "<span>2-Year Warranty</span>",
      "2-year hardware warranty",
      "<td>2 jaar garantie</td>",
      "warranty of two years",
    ];
    for (const s of missed) {
      expect(BAD.some((re) => re.test(s)), `v2 still misses: ${s}`).toBe(true);
    }
  });

  it("does not fire on unrelated two-year prose", () => {
    expect(BAD.some((re) => re.test("I foam-rolled for two years and got nowhere."))).toBe(false);
    expect(BAD.some((re) => re.test("Shoulder has been stiff for two years."))).toBe(false);
  });

  it("the returns policy states the warranty in every locale", () => {
    for (const loc of ["en", "nl", "de", "fr"]) {
      const json = readFileSync(resolve(__dirname, `../locales/${loc}/returns.json`), "utf8");
      expect(json, `${loc}/returns.json has no warranty entry`).toMatch(/1[- ](Year|Jaar|Jahr|An)/i);
    }
  });

  it("no unsubstantiated FDA clearance claim — negations are fine", () => {
    const offenders: string[] = [];
    for (const f of [...walk(join(ROOT, "src")), ...walk(join(ROOT, "public"))]) {
      for (const para of readFileSync(f, "utf8").split(/\n\s*\n/)) {
        if (!/FDA[\s-]*(cleared|approved)/i.test(para)) continue;
        if (/\bnot\b|\bno\b|never|makes no/i.test(para)) continue; // downward disclaimer
        offenders.push(f.replace(ROOT + "/", ""));
      }
    }
    expect(offenders, `unsubstantiated FDA claim in: ${offenders.join(", ")}`).toEqual([]);
  });
});

/**
 * FABRICATED REVIEW MARKUP — the most serious defect found in this codebase.
 *
 * Until 2026-08-04, FIVE sitemap-indexed production pages shipped JSON-LD asserting
 * "ratingValue": "4.8" over "reviewCount": "124", plus a five-star Review authored by
 * a person named "Sophie V." who does not exist. The business has ONE real customer.
 *
 * That is fabricated review data, served as structured data, submitted to Google as
 * rich-snippet-eligible. It violates the operator's own stated non-negotiable
 * ("fabricated testimonies/reviews NEVER return"), the doctrine's kill criterion
 * ("any review written in-house => total failure regardless of revenue"), FTC
 * 16 CFR Part 465, and EU unfair-commercial-practice rules.
 *
 * The guard that should have caught it asserted no-aggregateRating against
 * public/entity.html ONLY — the same whole-file-scoping failure that let five
 * two-year warranty claims survive a sweep on the same day. This one walks
 * everything and is scoped by SUBJECT: any structured data about our own brand.
 */
describe("no fabricated review or rating markup, anywhere", () => {
  const ROOT2 = resolve(__dirname, "../..");

  function walkAll(dir: string, out: string[] = []): string[] {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (["node_modules", "dist", ".ssr", ".git"].some((s) => full.includes(s))) continue;
      if (e.isDirectory()) walkAll(full, out);
      else if (/\.(html|tsx?|json)$/.test(e.name)) out.push(full);
    }
    return out;
  }

  const files = [...walkAll(join(ROOT2, "public")), ...walkAll(join(ROOT2, "src"))]
    .filter((f) => !f.includes("src/test"));

  it("no aggregateRating is asserted about Zential Pure", () => {
    const bad = files.filter((f) => {
      const body = readFileSync(f, "utf8");
      // Only flag a real assertion — a comment explaining the removal is fine.
      return /"aggregateRating"\s*:/.test(body) || /"ratingValue"\s*:/.test(body);
    });
    expect(bad, `aggregateRating/ratingValue asserted in:\n${bad.join("\n")}`).toEqual([]);
  });

  it("no Review objects or review bodies are published", () => {
    const bad = files.filter((f) => {
      const body = readFileSync(f, "utf8");
      return /"reviewBody"\s*:/.test(body) || /"@type"\s*:\s*"Review"/.test(body);
    });
    expect(bad, `Review markup in:\n${bad.join("\n")}`).toEqual([]);
  });

  it("the invented reviewer never returns", () => {
    const bad = files.filter((f) => /Sophie V\./.test(readFileSync(f, "utf8")));
    expect(bad, `fictional reviewer in:\n${bad.join("\n")}`).toEqual([]);
  });

  it("catches the exact strings that shipped", () => {
    const shipped = [
      '"aggregateRating": {',
      '"ratingValue": "4.8"',
      '"reviewBody": "I noticed a difference from the first use"',
      '"@type": "Review"',
    ];
    const re = [/"aggregateRating"\s*:/, /"ratingValue"\s*:/, /"reviewBody"\s*:/, /"@type"\s*:\s*"Review"/];
    for (const s of shipped) {
      expect(re.some((r) => r.test(s)), `guard misses: ${s}`).toBe(true);
    }
  });
});
