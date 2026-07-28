import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { TILES, FOOT_LINKS, PLATFORMS, BRAND, ENTRY_PRICE_EUR, SYSTEM_PRICE_EUR } from "../../scripts/links/tiles.mjs";
import { renderPage, withUtm } from "../../scripts/links/template.mjs";

/**
 * Link-in-bio contract (/ig, /tt).
 *
 * The page is generated, zero-JS, and read by the coldest traffic the brand has.
 * What can actually go wrong here is narrow and worth pinning:
 *  - a tile losing its utm, so a platform's clicks vanish from attribution,
 *  - a fragment landing before the query string, which breaks both,
 *  - an image path that no longer exists on disk (silent broken thumb),
 *  - JavaScript creeping in, which is the one thing the design forbids,
 *  - the single hardcoded euro amount drifting from the catalog.
 *
 * The live-price half of the last one is the engine's job; this is the
 * deploy-time half. Keep ENTRY_PRICE_EUR in lockstep with
 * knowledge/products/LIVE-CATALOG-TRUTH.md.
 */

const PUBLIC = join(__dirname, "..", "..", "public");
const ig = PLATFORMS.find((p) => p.slug === "ig")!;
const tt = PLATFORMS.find((p) => p.slug === "tt")!;

describe("withUtm", () => {
  it("appends params to a bare path", () => {
    expect(withUtm("/quiz", { a: "1" })).toBe("/quiz?a=1");
  });

  it("keeps the fragment after the query string", () => {
    expect(withUtm("/instruments#system", { a: "1" })).toBe("/instruments?a=1#system");
  });

  it("uses & when the path already has a query", () => {
    expect(withUtm("/f/x?v=2", { a: "1" })).toBe("/f/x?v=2&a=1");
  });

  it("encodes keys and values", () => {
    expect(withUtm("/x", { "a b": "c&d" })).toBe("/x?a%20b=c%26d");
  });
});

describe("tile data", () => {
  it("has six tiles with unique ids and destinations", () => {
    // 6th tile added 2026-07-28: the Restoration Wrap waitlist test (/wrap).
    expect(TILES).toHaveLength(6);
    expect(new Set(TILES.map((t) => t.id)).size).toBe(6);
    expect(new Set(TILES.map((t) => t.href)).size).toBe(6);
  });

  it("points every link at a site-relative path", () => {
    for (const { href } of [...TILES, ...FOOT_LINKS]) {
      expect(href.startsWith("/")).toBe(true);
    }
  });

  it("ships every referenced image", () => {
    for (const path of [BRAND.hero.src, ...TILES.map((t) => t.img)]) {
      expect(existsSync(join(PUBLIC, path)), `missing ${path}`).toBe(true);
    }
  });

  it("gives every tile alt text", () => {
    for (const t of TILES) expect(t.alt.length).toBeGreaterThan(8);
  });

  it("only deep-links to anchors that exist in the target page", () => {
    // /product/the-system-founding-bundle looked correct and rendered "Product
    // not found" in production — the handle is allowlisted but has no entry in
    // productConfigs.ts. Fragments are the other way to ship a link that
    // resolves to nothing visible, so pin the one we rely on.
    const withHash = TILES.filter((t) => t.href.includes("#"));
    expect(withHash.map((t) => t.href)).toEqual(["/instruments#system"]);

    const src = readFileSync(join(__dirname, "..", "pages", "Instruments.tsx"), "utf8");
    expect(src).toContain('id="system"');
  });

  it("quotes exactly two prices as text, the entry and the System anchor", () => {
    const priced = TILES.filter((t) => /[€$£]/.test(t.sub));
    expect(priced.map((t) => t.id)).toEqual(["instruments", "system"]);
    expect(priced.find((t) => t.id === "instruments").sub).toContain(String(ENTRY_PRICE_EUR));
    expect(priced.find((t) => t.id === "system").sub).toContain(String(SYSTEM_PRICE_EUR));
  });

  it("carries no price in any tile image (the €499 incident)", () => {
    // Price lives in the sub text only; images stay priceless so they cannot go
    // stale. See knowledge/products/LIVE-CATALOG-TRUTH.md.
    for (const t of TILES) expect(t.img, t.id).not.toMatch(/[€$£]|\d{2,}/);
  });

  it("keeps both prices in step with the live catalog", () => {
    // Verified 2026-07-26. Entry: Storefront API, handle
    // lifting-and-tightening-face-introducer. System: products/the-system-founding-bundle.json
    // → 399.00 (compare-at 468.00). Bump each with its live source, never guess.
    expect(ENTRY_PRICE_EUR).toBe(88);
    expect(SYSTEM_PRICE_EUR).toBe(399);
  });
});

describe("rendered page", () => {
  const html = renderPage({ platform: ig });

  /** Anchor hrefs only — <link rel=preload> hrefs are not navigation. */
  const anchors = (doc: string) => [...doc.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);

  it("stamps the platform utm on every outbound link", () => {
    const hrefs = anchors(html);
    expect(hrefs.length).toBe(1 + TILES.length + FOOT_LINKS.length); // hero + tiles + foot
    for (const h of hrefs) {
      expect(h, h).toContain("utm_source=instagram");
      expect(h, h).toContain("utm_medium=bio");
    }
  });

  it("differs per platform only in the source", () => {
    const ttHtml = renderPage({ platform: tt });
    expect(ttHtml).toContain("utm_source=tiktok");
    expect(ttHtml).not.toContain("utm_source=instagram");
    expect(html).not.toContain("utm_source=tiktok");

    // Compare the navigation, not the whole document: the inlined CSS carries a
    // comment naming both platforms, so a blanket string swap is not a fair diff.
    const normalise = (hrefs: string[], source: string) =>
      hrefs.map((h) => h.replace(`utm_source=${source}`, "utm_source=X"));
    expect(normalise(anchors(ttHtml), "tiktok")).toEqual(normalise(anchors(html), "instagram"));
  });

  it("ships no JavaScript", () => {
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son[a-z]+=/i);
    expect(html).not.toMatch(/javascript:/i);
  });

  it("leaves no unrendered template holes", () => {
    expect(html).not.toContain("undefined");
    expect(html).not.toContain("[object");
    expect(html).not.toContain("NaN");
  });

  it("preloads the hero and reserves its box", () => {
    expect(html).toContain(`rel="preload" as="image" href="${BRAND.hero.src}"`);
    expect(html).toContain(`width="${BRAND.hero.width}"`);
    expect(html).toContain("aspect-ratio:8/5");
  });

  it("stays out of the search index", () => {
    // A second page of the same links would cannibalise /instruments.
    expect(html).toContain('name="robots" content="noindex,follow"');
  });

  it("makes no claim beyond price and logistics", () => {
    const banned = [
      "cure", "treat", "heal", "clinically proven", "guaranteed results",
      "eliminates", "reverses", "anti-aging", "medical",
    ];
    const text = html.toLowerCase();
    for (const w of banned) expect(text, w).not.toContain(w);
  });
});
