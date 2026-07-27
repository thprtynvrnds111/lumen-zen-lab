import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

/**
 * Guard: the Face Introducer must never be marketed as a light-therapy device.
 *
 * The operator checked a physical unit on 2026-07-27 and established that the
 * FI's LED is a MODE INDICATOR, not a therapeutic modality. The catalog truth
 * (knowledge/products/LIVE-CATALOG-TRUTH.md in the engine repo) records it:
 *
 *   "NEVER market LED / light therapy as a Face Introducer modality"
 *   FI = EMS · microcurrent · thermal
 *
 * When that rule was written the claim was already live in 82 places across 26
 * files — including llms.txt, llms-full.txt and products.md, the surfaces built
 * so AI assistants describe the catalog accurately. It survived because nothing
 * checked for it.
 *
 * This is a CONTENT gate, not a type check, in the spirit of the repo's existing
 * no-phantom-skus pre-commit hook. It scans shipped source for the FI-branded
 * LED phrasing.
 *
 * IMPORTANT — what is still allowed:
 *   - Red light / 660nm / 850nm / far-infrared for the Restoration Belt and Mat.
 *     Those are real modalities on those devices and must keep working.
 *   - Describing the FI's LED as a mode indicator, explicitly denying a
 *     therapeutic claim (that is the honest framing this sweep introduced).
 *   - Archived ghost SKUs (Body Lift, Eye Activator) which are not sold.
 */

const SRC = resolve(__dirname, "..");
const PUBLIC = resolve(__dirname, "../../public");

/** Ghost SKUs — archived, not sold, not worth churn. */
const GHOST_SKU_FILES = ["productConfigs.ts", "ProductDetail.tsx"];

/** Phrasing that denies the therapeutic claim rather than making it. */
const HONEST_FRAMINGS = [
  "mode indicator",
  "not a treatment modality",
  "not a light-therapy device",
  "NOT a light-therapy",
  "no light-therapy claim",
  // Redirects the shopper to the devices that really do emit red light.
  "For red light, see the Restoration",
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "test") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".json", ".txt", ".md", ".html"].includes(extname(entry))) out.push(full);
  }
  return out;
}

// Root index.html is the shell every route ships in — the 2026-07-27 sweep
// missed it because it sits in neither src/ nor public/ and the first version
// of this guard skipped .html entirely. Four banned claims survived there.
const files = [...walk(SRC), ...walk(PUBLIC), resolve(__dirname, "../../index.html")];

describe("Face Introducer modality claims", () => {
  it("no shipped surface names cosmetic LED as an FI modality", () => {
    const offenders: string[] = [];

    for (const file of files) {
      if (GHOST_SKU_FILES.some((g) => file.endsWith(g))) continue;
      const text = readFileSync(file, "utf8");

      for (const line of text.split("\n")) {
        if (!/cosmetic LED/i.test(line)) continue;
        if (HONEST_FRAMINGS.some((ok) => line.includes(ok))) continue;
        offenders.push(`${file.replace(resolve(__dirname, "../.."), "")}: ${line.trim().slice(0, 90)}`);
      }
    }

    expect(offenders, `FI LED modality claim found:\n${offenders.join("\n")}`).toEqual([]);
  });

  /**
   * Counts drift independently of the words. When the FI went 4 -> 3 the System
   * page still read "Seven inputs" (the true union is six: EMS, microcurrent,
   * thermal, red light, near-infrared, far-infrared) and shipped to production
   * that way, because the first version of this guard only looked for "four".
   */
  it("does not carry a stale modality or input count", () => {
    const offenders: string[] = [];
    for (const file of files) {
      if (GHOST_SKU_FILES.some((g) => file.endsWith(g))) continue;
      const text = readFileSync(file, "utf8");
      for (const line of text.split("\n")) {
        if (/four[- ]modalit|4-Modality|Four clinic modalities|Seven inputs|four technologies|Four clinical protocols/i.test(line)) {
          offenders.push(`${file.replace(resolve(__dirname, "../.."), "")}: ${line.trim().slice(0, 90)}`);
        }
      }
    }
    expect(offenders, `stale FI modality count:\n${offenders.join("\n")}`).toEqual([]);
  });

  /**
   * A line that names the Face Introducer AND red light together is the claim
   * in its most direct form (DevicesSection shipped exactly this on the
   * homepage: `"lifting-and-tightening-face-introducer": ["Red Light", ...]`).
   * Union lines about the whole device family don't name the FI, so they pass.
   */
  it("never pairs the Face Introducer with red light on one line", () => {
    const offenders: string[] = [];
    for (const file of files) {
      if (GHOST_SKU_FILES.some((g) => file.endsWith(g))) continue;
      const text = readFileSync(file, "utf8");
      for (const line of text.split("\n")) {
        if (!/face[- ]introducer/i.test(line)) continue;
        if (!/red[- ]light|light[- ]therapy/i.test(line)) continue;
        if (HONEST_FRAMINGS.some((ok) => line.includes(ok))) continue;
        offenders.push(`${file.replace(resolve(__dirname, "../.."), "")}: ${line.trim().slice(0, 90)}`);
      }
    }
    expect(offenders, `FI + red light on one line:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("keeps the Belt and Mat red-light claims — a sweep that deletes true claims also fails", () => {
    const funnelConfig = readFileSync(resolve(SRC, "pages/funnel/config.ts"), "utf8");
    expect(funnelConfig).toMatch(/660\s*nm/);
    expect(funnelConfig).toMatch(/850\s*nm/);
  });
});
