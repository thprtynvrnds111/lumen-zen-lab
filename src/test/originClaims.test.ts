import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

/**
 * Guard: no geographic provenance claim for the instruments.
 *
 * knowledge/products/LIVE-CATALOG-TRUTH.md:146-148 (engine repo):
 *
 *   "2026-07-27: 'from Rotterdam' REMOVED — origin claim falsified 2026-07-14.
 *    Real origins per docs/runbooks/fulfillment.md: FI ships China (CJPacket),
 *    Mat China, Belt CJ US warehouse. Never state a Rotterdam origin in copy"
 *
 * The instruments are supplier SKUs (Face Introducer = Yiwu Renfan
 * `CJJT170974104DW`, Belt = VEVOR). Nothing is designed, engineered, specified
 * or calibrated in Rotterdam.
 *
 * This has now been falsified twice. The first sweep removed "Designed in
 * Rotterdam" / "Free EU shipping from Rotterdam" from ad copy but left it in
 * the site footer; a later credibility pass then replaced the manufacturing
 * implication "we built the instrument" with "specified and calibrated in
 * Rotterdam" — a *different* unsupported claim in the same place. A claims gate
 * does not catch this, because a fabrication breaks no rule: it is simply
 * untrue. Hence a test.
 *
 * STILL ALLOWED — the company's own registered location. "Zential Pure B.V. ·
 * Rotterdam, the Netherlands" in the footer legal line is a fact about the
 * entity, not about where a device came from.
 */

const SRC = resolve(__dirname, "..");
const ROOT = resolve(__dirname, "../..");

/** Product-provenance phrasings. Each asserts work done on the device here. */
const PROVENANCE = [
  /designed\s+in\s+Rotterdam/i,
  /made\s+in\s+Rotterdam/i,
  /built\s+in\s+Rotterdam/i,
  /engineered\s+in\s+Rotterdam/i,
  /manufactured\s+in\s+Rotterdam/i,
  /calibrated\s+in\s+Rotterdam/i,
  /specified\s+(?:and\s+\w+\s+)?in\s+Rotterdam/i,
  /(?:ships?|shipping|shipped)\s+from\s+Rotterdam/i,
  /from\s+Rotterdam/i,
];

/** The entity's registered location — a company fact, not a product one. */
const COMPANY_LINE = /Rotterdam,\s*the\s+Netherlands/i;

/**
 * Text that *retracts or quotes* the claim rather than making it. Two real
 * cases must keep passing:
 *   - /journal/kill-list, where the brand publicly documents having removed
 *     "from Rotterdam" after auditing it. Deleting that would erase the
 *     honesty content the correction exists to provide.
 *   - Source comments that name the banned phrasing so the next author knows
 *     why the copy reads the way it does.
 */
const RETRACTION_CONTEXT =
  /our copy said|we removed|removed\b|falsified|audited|never state|LIVE-CATALOG-TRUTH|no geographic provenance|no "designed/i;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "test") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".json", ".txt", ".md", ".html"].includes(extname(entry))) out.push(full);
  }
  return out;
}

const files = [...walk(SRC), ...walk(resolve(ROOT, "public")), resolve(ROOT, "index.html")];

describe("instrument origin claims", () => {
  it("no shipped surface claims the instruments come from Rotterdam", () => {
    const offenders: string[] = [];

    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const rel = file.replace(ROOT, "");
      // Collapse whitespace: JSX wraps prose mid-sentence, so a claim can sit
      // across two lines and read innocent to a line-by-line scan.
      const flat = text.replace(/\s+/g, " ");

      for (const pattern of PROVENANCE) {
        const m = flat.match(pattern);
        if (!m) continue;
        const at = flat.indexOf(m[0]);
        const window = flat.slice(Math.max(0, at - 180), at + m[0].length + 180);
        if (COMPANY_LINE.test(window)) continue; // registered-address line
        if (RETRACTION_CONTEXT.test(window)) continue; // quoting or retracting it
        offenders.push(`${rel}: …${window.trim()}…`);
      }
    }

    expect(offenders, `Rotterdam provenance claim found:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("keeps the footer's registered-company line — deleting a true fact is also a failure", () => {
    const footer = readFileSync(resolve(SRC, "components/zential/v2/SparseFooter.tsx"), "utf8");
    expect(footer).toMatch(/Zential Pure B\.V\./);
    expect(footer).toMatch(COMPANY_LINE);
  });
});
