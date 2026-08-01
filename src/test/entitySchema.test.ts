import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Entity-anchor schema contract — public/entity.html + the index.html shell.
 *
 * Why this exists: structured data is the one surface nobody ever looks at. The
 * shell shipped a composite Product with an AggregateOffer of €70–€147 across
 * "9" offers — the discontinued 8-SKU wand line — to every crawler on every
 * route, and survived the 2026-07-12 ghost cleanup, the 2026-07-29 price
 * re-verification and a full GEO audit, because JSON-LD renders as nothing on
 * the page. Text greps over customer copy do not read it either.
 *
 * So the JSON-LD gets the same treatment the AEO text files get in
 * aeoTruthContract.test.ts: parse it, assert the catalog against
 * knowledge/products/LIVE-CATALOG-TRUTH.md, and fail on ghosts and claims.
 *
 * Update PRICES here in lockstep with LIVE-CATALOG-TRUTH.md.
 */

const ROOT = join(__dirname, "../..");
const ENTITY = join(ROOT, "public/entity.html");
const SHELL = join(ROOT, "index.html");

const read = (p: string) => readFileSync(p, "utf-8");

/** Every application/ld+json block in a document, parsed. Throws on bad JSON. */
function jsonLdBlocks(html: string, label: string): unknown[] {
  const blocks: unknown[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1];
    try {
      blocks.push(JSON.parse(raw));
    } catch (e) {
      throw new Error(`invalid JSON-LD in ${label}: ${(e as Error).message}\n---\n${raw.slice(0, 400)}`);
    }
  }
  return blocks;
}

/** Flatten a parsed block into its nodes, whether it is a bare node or an @graph. */
function nodes(block: unknown): Record<string, unknown>[] {
  const b = block as Record<string, unknown>;
  const graph = b["@graph"];
  return Array.isArray(graph) ? (graph as Record<string, unknown>[]) : [b];
}

const entityHtml = existsSync(ENTITY) ? read(ENTITY) : "";
const entityNodes = entityHtml ? jsonLdBlocks(entityHtml, "entity.html").flatMap(nodes) : [];
const byType = (t: string) => entityNodes.filter((n) => n["@type"] === t);

/**
 * Registered legal identity, read live from the Handelsregister on 2026-08-01
 * (kvk.nl serves no crawlable record and has no free lookup API, so it was read
 * through the operator's own browser):
 *
 *   handelsnaam        Zential Pure
 *   KVK-nummer         96597569
 *   rechtsvorm         EENMANSZAAK        <- not a B.V.
 *   vestigingsnummer   000061913421 (hoofdvestiging)
 *   adres              3e Westewagenhof 78, 3011 AR Rotterdam
 *
 * The "B.V." suffix shipped on five surfaces until that record was read — it had
 * been copied out of the engine repo's docs, which nobody had checked against the
 * register. One of those surfaces told customers to "look us up in the Dutch
 * business register", which is where the mismatch would have been found. An
 * eenmanszaak presenting itself as a besloten vennootschap misstates its legal
 * form, so the suffix is banned repo-wide below, not merely corrected.
 */
const KVK = "96597569";
const STREET = "3e Westewagenhof 78";
const POSTCODE = "3011 AR";
const VESTIGING = "000061913421";

/** The six live products, LIVE-CATALOG-TRUTH.md (verified 2026-07-29). */
const CATALOG = [
  { name: "The Face Introducer", price: "88.00" },
  { name: "The Restoration Belt", price: "180.00" },
  { name: "The Restoration Mat", price: null }, // variant-priced: AggregateOffer 200–228
  { name: "The System", price: "399.00" },
  { name: "Restore Gel", price: "18.00" },
  { name: "Restore Pads", price: "18.00" },
];

/** Discontinued names that must never appear as live products. */
const GHOSTS = [
  "Skin Pulse",
  "Sculpt Wand",
  "Gua Sha Frequency",
  "Eye Activator",
  "Frame Pulse",
  "Frequency Wand",
  "Ritual Light Pro",
  "Pulse Roller",
  "Pressure Shell",
  "Depth Mask",
  "Flux Panel",
  "Thermal Zone",
  "Collagen Face Gel",
  "Collagen PDRN Pads",
];

/** Claims the brand does not make. Zential Pure is not FDA-cleared. */
const BANNED_CLAIMS = [
  /\bclinically proven\b/i,
  /\bFDA[- ]cleared\b/i,
  /\bFDA[- ]approved\b/i,
  /\bcures?\b/i,
  /\btreats\b/i,
  /\bbefore\s*(?:and|&|\/)\s*after\b/i,
  /\bfull[- ]body\b/i, // the Mat is back-of-torso only
];
// Light-therapy and IPL are deliberately NOT banned page-wide: red light is a real
// mechanism of the Belt and the Mat, and the Organization legitimately lists it under
// knowsAbout. The claim that matters — attributing it to the Face Introducer — is
// enforced precisely against that product's description in its own test below.

/**
 * A disambiguation page has to be able to *deny* a claim — "Not FDA-cleared",
 * "not a full-body panel", "no light-therapy claim applies to this instrument".
 * Denying is the whole job, so a flat substring ban would forbid the page from
 * doing it. Instead: find each occurrence, and fail only when it is not negated
 * within the same sentence.
 */
const NEGATOR = /\b(?:not|no|never|neither|nor|without|isn't|aren't|non-)\b[^.]{0,60}$/i;

const stripComments = (html: string) => html.replace(/<!--[\s\S]*?-->/g, " ");

function unnegatedMatches(text: string, re: RegExp): string[] {
  const rx = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = rx.exec(text)) !== null) {
    const before = text.slice(Math.max(0, m.index - 90), m.index);
    if (!NEGATOR.test(before)) {
      found.push(text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 25).replace(/\s+/g, " "));
    }
  }
  return found;
}

describe("entity.html — entity anchor page", () => {
  it("exists and is substantial", () => {
    expect(existsSync(ENTITY), "public/entity.html missing").toBe(true);
    expect(entityHtml.length).toBeGreaterThan(2000);
  });

  it("every JSON-LD block parses", () => {
    // jsonLdBlocks throws on malformed JSON; this asserts we actually found some.
    expect(jsonLdBlocks(entityHtml, "entity.html").length).toBeGreaterThan(0);
  });

  it("declares Organization, WebSite and ItemList", () => {
    for (const t of ["Organization", "WebSite", "ItemList"]) {
      expect(byType(t).length, `no ${t} node in entity.html`).toBeGreaterThan(0);
    }
  });

  it("Organization uses the shared @id so it merges with the shell, and carries its anchors", () => {
    const org = byType("Organization")[0];
    expect(org["@id"]).toBe("https://zentialpure.com/#organization");
    expect(org.name).toBe("Zential Pure");
    expect(org.url).toBe("https://zentialpure.com");
    // legalName + registration numbers are asserted in the legal-identity test below.
    const sameAs = org.sameAs as string[];
    expect(Array.isArray(sameAs)).toBe(true);
    expect(sameAs).toContain("https://www.trustpilot.com/review/zentialpure.com");
    // Disambiguation is the point of the page: models must not file this under beauty.
    expect(String(org.disambiguatingDescription)).toMatch(/not a beauty brand/i);
  });

  it("carries the registered legal identity, and the footer states the same one", () => {
    const org = byType("Organization")[0];
    expect(org.legalName).toBe("Zential Pure");

    const ids = org.identifier as Record<string, unknown>[];
    const byProp = (p: string) => ids.find((i) => i.propertyID === p);
    expect(byProp("KvK")?.value).toBe(KVK);
    expect(byProp("vestigingsnummer")?.value).toBe(VESTIGING);

    const addr = org.address as Record<string, unknown>;
    expect(addr.streetAddress).toBe(STREET);
    expect(addr.postalCode).toBe(POSTCODE);
    expect(addr.addressLocality).toBe("Rotterdam");
    expect(addr.addressCountry).toBe("NL");

    // The rendered footer is the customer-facing half of the same fact. If one side
    // is corrected and the other is not, the site publishes two legal identities.
    const footer = read(join(ROOT, "src/components/zential/v2/SparseFooter.tsx"));
    expect(footer).toContain(`KvK ${KVK}`);
    expect(footer).toContain(STREET);
    expect(footer).toContain(POSTCODE);
    expect(footer, "the true registered-company line must keep shipping").toMatch(
      /Rotterdam,\s*the\s+Netherlands/i,
    );
  });

  it("ItemList carries exactly the six live products at catalog prices", () => {
    const list = byType("ItemList")[0];
    const items = list.itemListElement as Record<string, unknown>[];
    expect(items).toHaveLength(6);
    expect(list.numberOfItems).toBe(6);

    const products = items.map((li) => li.item as Record<string, unknown>);
    expect(products.map((p) => p.name)).toEqual(CATALOG.map((c) => c.name));

    for (const [i, product] of products.entries()) {
      const offer = product.offers as Record<string, unknown>;
      expect(offer, `${CATALOG[i].name} has no offer`).toBeTruthy();
      expect(offer.priceCurrency, `${CATALOG[i].name} must be priced in EUR`).toBe("EUR");
      if (CATALOG[i].price) {
        expect(offer.price, `${CATALOG[i].name} price drifted from LIVE-CATALOG-TRUTH.md`).toBe(
          CATALOG[i].price,
        );
      }
    }

    // The Mat is variant-priced — a specific price is unsafe, the range is not.
    const mat = products[2].offers as Record<string, unknown>;
    expect(mat["@type"]).toBe("AggregateOffer");
    expect(mat.lowPrice).toBe("200.00");
    expect(mat.highPrice).toBe("228.00");
  });

  it("attributes no light, LED or wavelength modality to the Face Introducer", () => {
    const fi = (byType("ItemList")[0].itemListElement as Record<string, unknown>[])
      .map((li) => li.item as Record<string, unknown>)
      .find((p) => p.name === "The Face Introducer")!;
    const desc = String(fi.description);
    // It may *mention* LED only to deny it as a modality — so require the denial,
    // forbid every wavelength figure outright, and allow light framing only negated.
    expect(desc).toMatch(/not a treatment modality/i);
    expect(desc).not.toMatch(/\d{3}\s*nm/i);
    for (const re of [/\bred light\b/i, /\blight[- ]therapy\b/i, /\bIPL\b/]) {
      expect(unnegatedMatches(desc, re), `unnegated ${re} on the Face Introducer`).toEqual([]);
    }
  });

  it("presents no discontinued SKU", () => {
    for (const g of GHOSTS) {
      expect(entityHtml, `ghost SKU "${g}" present in entity.html`).not.toMatch(
        new RegExp(`\\b${g}\\b`),
      );
    }
  });

  it("asserts no medical or outcome claim (denying one is allowed)", () => {
    const prose = stripComments(entityHtml);
    for (const claim of BANNED_CLAIMS) {
      expect(
        unnegatedMatches(prose, claim),
        `claim ${claim} asserted, not denied, in entity.html`,
      ).toEqual([]);
    }
  });

  it("carries no fabricated review or rating markup", () => {
    const prose = stripComments(entityHtml);
    expect(prose).not.toMatch(/aggregateRating/i);
    expect(prose).not.toMatch(/"@type"\s*:\s*"Review"/);
  });

  it("is listed in the sitemap", () => {
    expect(read(join(ROOT, "public/sitemap.xml"))).toContain("https://zentialpure.com/entity.html");
  });
});

describe("legal form — Zential Pure is an eenmanszaak, never a B.V.", () => {
  /**
   * Repo-wide, not per-file: the suffix reached five surfaces from one wrong
   * source, so a check that only watched the file being edited would have caught
   * none of them. Shipped source and shipped static files only — node_modules,
   * dist and .git are excluded, and prose that documents the correction is
   * allowed so this defect can be written about honestly (the same carve-out
   * originClaims.test.ts makes for the Rotterdam retraction).
   */
  const SEARCH_DIRS = ["src", "public", "index.html"];

  function walk(path: string, acc: string[] = []): string[] {
    const st = statSync(path);
    if (st.isDirectory()) {
      for (const entry of readdirSync(path)) walk(join(path, entry), acc);
    } else if (/\.(tsx?|jsx?|html|txt|md|json)$/.test(path)) {
      acc.push(path);
    }
    return acc;
  }

  const files = SEARCH_DIRS.flatMap((d) => walk(join(ROOT, d)));

  it("scans a real set of files (guards against the walker silently finding nothing)", () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it("no shipped surface calls Zential Pure a B.V.", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const body = readFileSync(file, "utf-8");
      // Whitespace-collapsed so a claim split across a JSX line break still trips.
      const flat = body.replace(/\s+/g, " ");
      const re = /Zential Pure,? B\.?V\.?/gi;
      let m: RegExpExecArray | null;
      while ((m = re.exec(flat)) !== null) {
        const context = flat.slice(Math.max(0, m.index - 200), m.index + 120);
        // Allowed: text that documents the removal rather than making the claim.
        if (/\b(removed|not a|never|NO "B\.V\.|shipped .* until|misstat|banned|reintroduc)/i.test(context)) {
          continue;
        }
        offenders.push(`${file.replace(ROOT, "")}: …${context.slice(-160)}…`);
      }
    }
    expect(
      offenders,
      `Zential Pure is an eenmanszaak (KvK ${KVK}) — "B.V." found:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("the trade-register invitation still ships, with the number that backs it", () => {
    // "Look us up in the register" is only worth saying if what we state matches
    // the register. A sweep that deleted the invitation would also pass the test
    // above, so assert the honest version survives.
    const cfg = readFileSync(join(ROOT, "src/pages/funnel/config.ts"), "utf-8");
    expect(cfg).toMatch(/look us up in the Dutch business register/i);
    expect(cfg).toContain(`KvK ${KVK}`);
  });
});

describe("index.html shell schema", () => {
  const shellHtml = read(SHELL);
  const shellNodes = jsonLdBlocks(shellHtml, "index.html").flatMap(nodes);

  it("every JSON-LD block parses", () => {
    expect(shellNodes.length).toBeGreaterThan(0);
  });

  it("ships no site-wide composite Product (it quoted the dead €70–€147 wand line)", () => {
    expect(shellNodes.some((n) => n["@type"] === "Product")).toBe(false);
    expect(shellHtml).not.toMatch(/"lowPrice"\s*:\s*"?70/);
    expect(shellHtml).not.toMatch(/"highPrice"\s*:\s*"?147/);
  });

  it("Organization and WebSite use the shared @ids so entity.html merges into them", () => {
    const org = shellNodes.find((n) => n["@type"] === "Organization")!;
    const site = shellNodes.find((n) => n["@type"] === "WebSite")!;
    expect(org["@id"]).toBe("https://zentialpure.com/#organization");
    expect(site["@id"]).toBe("https://zentialpure.com/#website");
  });
});
