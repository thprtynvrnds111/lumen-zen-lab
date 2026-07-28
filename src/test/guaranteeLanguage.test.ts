import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

/**
 * Guard: guaranteed-results constructions and retired guarantee names must
 * never ship again.
 *
 * History (why this exists): the operator decided the guarantee shape on
 * 2026-07-27 — Option A, plain "money-back guarantee", refund triggered by the
 * CUSTOMER'S decision, never by a measured outcome
 * (docs/decisions/2026-07-28-protocol-guarantee-DRAFT.md in the engine repo).
 * The gate hard-blocks "no visible improvement → full refund" constructions
 * (Patterns 5/6). The 2026-07-28 f6ac7da sweep removed 10 instances — and
 * missed four more because they said "feel visible improvement" instead of
 * "see visible improvement", and lived in locale JSON (en/nl/de/fr faq,
 * support, returns). Found live on /returns on 2026-07-28. Third recorded
 * resurfacing of this class; hence a tripwire instead of another sweep.
 *
 * Also pinned: the retired names. "Ritual Guarantee" / "Protocol Guarantee"
 * (all four locales) were retired in favour of plain money-back wording
 * (engine LIVE-CATALOG-TRUTH.md 2026-07-27 note; lumen 46426ec).
 */

const SRC = resolve(__dirname, "..");
const PUBLIC = resolve(__dirname, "../../public");

/** The Kill List article QUOTES the killed constructions as its subject —
 *  that is the record of the retirement, not a reoffence. */
const EXEMPT_FILES = ["JournalKillList.tsx"];

/** outcome-verb … visible improvement … refund, in one breath — any locale's
 *  English; the construction, not one phrasing of it. */
const RESULTS_REFUND =
  /(see|feel|notice)[^.\n]{0,60}visible improvement[^.\n]{0,120}(refund|money.?back)/i;
/** Same construction, non-English locales. */
const RESULTS_REFUND_I18N =
  /(zichtbare verbetering[^.\n]{0,120}terugbetaling)|(sichtbare Verbesserung[^.\n]{0,120}Rückerstattung)|(amélioration visible[^.\n]{0,120}remboursement)/i;
/** Retired guarantee names, all locales. */
const RETIRED_NAMES =
  /ritual guarantee|protocol guarantee|ritueel garantie|protocol garantie|protocollgarantie|ritualgarantie|protokoll-?garantie|garantie rituel|garantie protocole/i;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "test") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".ts", ".tsx", ".json", ".txt", ".md", ".html"].includes(extname(entry))) out.push(full);
  }
  return out;
}

const files = [...walk(SRC), ...walk(PUBLIC), resolve(__dirname, "../../index.html")];

function offendersFor(re: RegExp): string[] {
  const hits: string[] = [];
  for (const file of files) {
    if (EXEMPT_FILES.some((g) => file.endsWith(g))) continue;
    const text = readFileSync(file, "utf8");
    for (const line of text.split("\n")) {
      if (re.test(line)) {
        hits.push(`${file.replace(resolve(__dirname, "../.."), "")}: ${line.trim().slice(0, 100)}`);
      }
    }
  }
  return hits;
}

describe("guarantee language", () => {
  it("ships no results-conditioned refund construction (Pattern 5/6)", () => {
    const hits = offendersFor(RESULTS_REFUND);
    expect(hits, `guaranteed-results construction found:\n${hits.join("\n")}`).toEqual([]);
  });

  it("ships no results-conditioned refund construction in NL/DE/FR", () => {
    const hits = offendersFor(RESULTS_REFUND_I18N);
    expect(hits, `guaranteed-results construction (i18n) found:\n${hits.join("\n")}`).toEqual([]);
  });

  it("never resurrects the retired guarantee names", () => {
    const hits = offendersFor(RETIRED_NAMES);
    expect(hits, `retired guarantee name found:\n${hits.join("\n")}`).toEqual([]);
  });
});
