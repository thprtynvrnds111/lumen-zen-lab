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

/**
 * The Eye Activator (handle `eye-massage`) is a separate archived SKU with its
 * own optics; its cosmetic-LED copy is not a Face Introducer claim.
 *
 * This used to be a whole-file exclusion of productConfigs.ts + ProductDetail.tsx,
 * which is what let the 2026-07-31 breach ship: those files ALSO hold the live
 * Face Introducer config, so the guard was blind to "addresses four mechanisms",
 * the "Four modes" testimonial, and Body Lift's "Cosmetic LED" benefit — on a
 * product whose purchaseHandle is the Face Introducer's. Scope by the zone the
 * copy names, never by the file it lives in.
 */
const NON_FI_SKU_CONTEXT = /periorbital|eye activator|eye contour/i;

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
      const text = readFileSync(file, "utf8");
      const rel = file.replace(resolve(__dirname, "../.."), "");

      for (const line of text.split("\n")) {
        if (!/cosmetic LED/i.test(line)) continue;
        if (NON_FI_SKU_CONTEXT.test(line)) continue;
        if (HONEST_FRAMINGS.some((ok) => line.includes(ok))) continue;
        offenders.push(`${rel}: ${line.trim().slice(0, 90)}`);
      }

      // JSX wraps prose mid-sentence, so "…and Cosmetic\n     LED into…" looks
      // like two innocent lines to a line-by-line scan. That is precisely how
      // the claim survived on ProtocolFaceIntroducer.tsx until 2026-07-31.
      // Count hits with whitespace collapsed; any excess was split across lines.
      const flatHits = (text.replace(/\s+/g, " ").match(/cosmetic LED/gi) ?? []).length;
      const lineHits = text.split("\n").filter((l) => /cosmetic LED/i.test(l)).length;
      if (flatHits > lineHits) {
        offenders.push(`${rel}: "cosmetic LED" split across a line break (${flatHits - lineHits}x)`);
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
      const text = readFileSync(file, "utf8");
      for (const line of text.split("\n")) {
        if (NON_FI_SKU_CONTEXT.test(line)) continue;
        // Deliberately NOT here: "four mechanisms", "four modes", "4-in-1".
        // Each is legitimately true somewhere — the Belt and Mat really do carry
        // four mechanisms (four badges each), and "4-in-1" is a category term we
        // rank for plus a competitor spec. Banning them globally flags honest
        // copy. The FI-specific version of that drift is caught block-scoped, in
        // the "own config block" test below.
        if (/four[- ]modalit|4-Modality|3-Modality|Four clinic modalities|Seven inputs|four technologies|Four clinical protocols/i.test(line)) {
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
    // The 2026-07-27 prod check found the claim surviving in lines that never
    // say "Face Introducer" — JSON-LD names it "Zential Pure Microcurrent
    // Facial Device", SEO pages say "facial device" or "face device". Any FI
    // alias next to a light claim is the same violation wearing a wig.
    const FI_ALIAS =
      /face[- ]introducer|facial device|face device|facial toning system|microcurrent face/i;
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const line of text.split("\n")) {
        if (!FI_ALIAS.test(line)) continue;
        if (NON_FI_SKU_CONTEXT.test(line)) continue;
        if (!/red[- ]light|light[- ]therapy/i.test(line)) continue;
        if (HONEST_FRAMINGS.some((ok) => line.includes(ok))) continue;
        offenders.push(`${file.replace(resolve(__dirname, "../.."), "")}: ${line.trim().slice(0, 90)}`);
      }
    }
    expect(offenders, `FI + red light on one line:\n${offenders.join("\n")}`).toEqual([]);
  });

  /**
   * Block-scoped count check. The word "four" is legitimately true elsewhere in
   * these same files, so it cannot be banned globally — but inside the Face
   * Introducer's OWN config block it is always drift. This is the check that
   * would have caught the 2026-07-31 breach: the headline was patched 4 -> 3
   * while "addresses four mechanisms", the "Four modes." testimonial and
   * "all four modes" survived three lines away.
   */
  it("the Face Introducer's own config block claims no count above three", () => {
    const cfg = readFileSync(resolve(SRC, "data/productConfigs.ts"), "utf8");
    const start = cfg.indexOf('"lifting-and-tightening-face-introducer": {');
    expect(start, "FI config block not found — did the handle change?").toBeGreaterThan(-1);

    // Top-level handles sit at one space of indent; the next one ends this block.
    const rest = cfg.slice(start + 1);
    const nextKey = rest.search(/\n "[a-z0-9-]+": \{/);
    const block = nextKey === -1 ? rest : rest.slice(0, nextKey);

    const offenders = block
      .split("\n")
      // "four speed settings" is an intensity control, not a modality count.
      .filter((l) => /\bfour\b/i.test(l) && !/speed setting|intensit/i.test(l))
      .map((l) => l.trim().slice(0, 90));

    expect(offenders, `FI config block still claims four:\n${offenders.join("\n")}`).toEqual([]);
  });

  /**
   * Stat-tile drift. The homepage hero shipped `{ v: <>4</>, l: "Clinic
   * modalities" }` until 2026-08-01: the numeral and its "modalities" label sit
   * on different lines (or different JSX props), so every line-scoped check
   * above was blind to it. Scan whitespace-collapsed text for a v/l stat pair
   * whose label says "modalit…" and whose value is a numeric literal — anything
   * other than 3 is drift. A `{FI_MODALITY_COUNT}` reference has no numeric
   * literal and passes, which is the preferred spelling.
   */
  it("no stat tile pairs a count other than three with a modalities label", () => {
    const offenders: string[] = [];
    const STAT_PAIR = /v:\s*(?:<>\s*)?(?:\{[A-Za-z_.]+\}|"?(\d+)"?)\s*(?:<\/>)?\s*,\s*l:\s*"([^"]*modalit[^"]*)"/gi;
    for (const file of files) {
      const flat = readFileSync(file, "utf8").replace(/\s+/g, " ");
      const rel = file.replace(resolve(__dirname, "../.."), "");
      for (const m of flat.matchAll(STAT_PAIR)) {
        const [, count, label] = m;
        if (NON_FI_SKU_CONTEXT.test(label)) continue;
        if (count !== undefined && count !== "3") {
          offenders.push(`${rel}: v: ${count}, l: "${label}"`);
        }
      }
    }
    expect(offenders, `stat tile modality-count drift:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("keeps the Belt and Mat red-light claims — a sweep that deletes true claims also fails", () => {
    const funnelConfig = readFileSync(resolve(SRC, "pages/funnel/config.ts"), "utf8");
    expect(funnelConfig).toMatch(/660\s*nm/);
    expect(funnelConfig).toMatch(/850\s*nm/);
  });
});
