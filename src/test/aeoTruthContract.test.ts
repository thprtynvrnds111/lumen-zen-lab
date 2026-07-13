import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * AEO truth contract — the LLM-facing files in public/ restate catalog prices,
 * so they are the easiest surface to let rot (the pre-2026-07-13 llms.txt
 * served 8 ghost SKUs at dead prices to every AI assistant for ~3 months).
 *
 * This test runs before every deploy and fails when:
 *  - an AEO file goes missing,
 *  - a canonical price disappears from llms.txt/products.md (price changes
 *    must consciously update the AEO surface, not silently bypass it),
 *  - a discontinued SKU name appears outside a discontinued-warning paragraph.
 *
 * Live-prod drift (Shopify changes with no deploy) is covered by the engine's
 * daily aeo_guard tick — this is the deploy-time half of the same contract.
 * Update PRICES here in lockstep with knowledge/products/LIVE-CATALOG-TRUTH.md.
 */

const PUB = join(__dirname, "../../public");
const FILES = ["llms.txt", "llms-full.txt", "products.md", "comparisons.md"];

// Canonical minimum price per live product (LIVE-CATALOG-TRUTH.md, 2026-07-13).
const PRICES = ["€88", "€180", "€200", "€399", "€18"];
const PRICE_FILES = ["llms.txt", "products.md"];

// Discontinued names that must never be presented as live products.
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
];

const read = (f: string) => readFileSync(join(PUB, f), "utf-8");

describe("AEO truth contract (public/ LLM-facing files)", () => {
  it("all four AEO files exist and are non-trivial", () => {
    for (const f of FILES) {
      expect(existsSync(join(PUB, f)), `${f} missing`).toBe(true);
      expect(read(f).length, `${f} suspiciously small`).toBeGreaterThan(500);
    }
  });

  it("llms.txt and products.md carry every canonical price", () => {
    for (const f of PRICE_FILES) {
      const body = read(f);
      for (const p of PRICES) {
        expect(body, `${p} missing from ${f} — catalog changed? update AEO files + this test`).toContain(p);
      }
    }
  });

  it("ghost SKUs appear only inside discontinued-warning paragraphs", () => {
    for (const f of FILES) {
      const paragraphs = read(f).split(/\n\s*\n/);
      for (const para of paragraphs) {
        if (/discontinued|do not (?:cite|use|recommend)/i.test(para)) continue;
        for (const g of GHOSTS) {
          expect(para, `ghost SKU "${g}" presented as live in ${f}`).not.toMatch(
            new RegExp(`\\b${g}\\b`),
          );
        }
      }
    }
  });

  it("llms.txt declares a last-updated date", () => {
    expect(read("llms.txt")).toMatch(/Last updated: \d{4}-\d{2}-\d{2}/);
  });
});
