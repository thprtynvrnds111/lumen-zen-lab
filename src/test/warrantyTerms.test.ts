import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Guards the warranty surface. Three failure modes, all of them things that have
 * actually happened to this repo:
 *
 *  1. A page registered in one router but not the other. /warranty returned HTTP 200
 *     serving the homepage shell for its entire life before 2026-08-04 because nothing
 *     was registered anywhere and Vercel's SPA fallback answered. A missing entry in
 *     entry-server.tsx alone makes SSR emit NotFound while the client looks fine.
 *  2. The statutory-rights clause quietly disappearing in a copy edit. EU Directive
 *     2019/771 Art. 17(2) makes it mandatory, and the ACM campaigns specifically against
 *     commercial guarantees that read as if they cap the buyer's legal rights.
 *  3. The durable-medium PDF drifting from the page. Two copies of the same legal terms
 *     always drift; this asserts the generator's output still contains the page's text.
 *
 * Deliberately NOT asserted: the length of the term. It is 1 year today and the red team
 * argued for 2 (docs/decisions/2026-08-04-red-team-kills-trust-first.md). Pinning the
 * number here would make the reversal fail a test for no reason — term.* in the locale
 * files is the single flip-point, and test 4 below is what protects it.
 */
const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

const LOCALES = ["en", "nl", "de", "fr"] as const;
const loadLocale = (lang: string) => JSON.parse(read(`src/locales/${lang}/warranty.json`));

describe("warranty page — route registration", () => {
  it("is registered in BOTH routers, not just the client one", () => {
    for (const file of ["src/App.tsx", "src/entry-server.tsx"]) {
      const src = read(file);
      expect(src, `${file} must lazy-import the Warranty page`).toMatch(
        /lazy\(\(\)\s*=>\s*import\("\.\/pages\/Warranty"\)\)/,
      );
      expect(src, `${file} must route /warranty`).toMatch(
        /<Route\s+path="\/warranty"\s+element=\{<Warranty\s*\/>\}/,
      );
    }
  });

  it("is prerendered and in the sitemap, so it is not SPA-fallback bait again", () => {
    expect(read("scripts/prerender.mjs")).toContain("'/warranty'");
    expect(read("public/sitemap.xml")).toContain("https://zentialpure.com/warranty");
  });

  it("is reachable from the footer", () => {
    expect(read("src/components/zential/v2/SparseFooter.tsx")).toContain('to: "/warranty"');
  });
});

describe("warranty terms — the clauses that are not optional", () => {
  it.each(LOCALES)("%s states that statutory rights are not limited", (lang) => {
    const body: string = loadLocale(lang).statutory.body;
    // Both halves matter: "in addition to" without "does not limit" is the framing the
    // directive rejects, and "does not limit" alone reads as boilerplate.
    const additive = /in addition to|bovenop|BOVENOP|zusätzlich|en plus/i.test(body);
    const nonLimiting = /does not limit|beperkt die op geen enkele manier|nicht ein|ne limite/i.test(body);
    expect(additive && nonLimiting, `${lang}: statutory clause is incomplete — "${body}"`).toBe(true);
  });

  it.each(LOCALES)("%s names the EU two-year legal minimum, not only our own term", (lang) => {
    const body: string = loadLocale(lang).statutory.body;
    expect(/two years|twee jaar|zwei Jahre|deux ans/i.test(body)).toBe(true);
  });

  it.each(LOCALES)("%s keeps the no-return replacement promise", (lang) => {
    const d = loadLocale(lang);
    const all = JSON.stringify(d).toLowerCase();
    // The one position the category leaves unclaimed. If a copy edit removes it the page
    // is just another 1-year warranty and there is no reason for it to exist.
    expect(/do not ask you to return|keep the old unit|niet terug te sturen|houdt het oude apparaat/.test(all)).toBe(true);
  });

  it.each(LOCALES)("%s routes every duration mention through the single term.* flip-point", (lang) => {
    const d = loadLocale(lang);
    expect(d.term?.label, `${lang}: term.label missing`).toBeTruthy();

    // Any literal duration outside term.* means flipping 1yr -> 2yr would leave a stale
    // number on the page. Two exemptions:
    //  - term.* itself: it IS the place the literals belong.
    //  - statutory.*: its durations are the LAW's ("at least two years"), which do not
    //    move when our commercial term does. Its references to OUR term are still
    //    checked — the assertion below requires them to go through $t(term.*).
    const { term: _term, statutory, ...rest } = d;
    expect(statutory.body, `${lang}: statutory clause must cite our term via $t(term.*)`).toContain(
      "$t(term.",
    );
    const literals = JSON.stringify(rest).match(
      /\b(one|two|twelve|twenty-four|één|een|twee|twaalf|vierentwintig)[\s-](year|years|month|months|jaar|maanden)\b/gi,
    );
    expect(literals ?? [], `${lang}: hard-coded duration(s) outside term.*`).toEqual([]);
  });
});

describe("warranty durable medium (EU 2019/771 Art. 17(1))", () => {
  const PDFS = ["public/warranty-en.pdf", "public/warranty-nl.pdf"];

  it("generator runs and produces both language files", () => {
    execFileSync("node", ["scripts/build-warranty-pdf.mjs"], { cwd: ROOT });
    for (const p of PDFS) expect(existsSync(resolve(ROOT, p)), `${p} missing`).toBe(true);
  });

  it("ships in the build so a stale PDF cannot reach production", () => {
    const build: string = JSON.parse(read("package.json")).scripts.build;
    expect(build).toContain("scripts/build-warranty-pdf.mjs");
    // Must precede vite, which is what copies public/ into dist/.
    expect(build.indexOf("build-warranty-pdf.mjs")).toBeLessThan(build.indexOf("vite build"));
  });

  it.each([["en", "public/warranty-en.pdf"], ["nl", "public/warranty-nl.pdf"]])(
    "%s PDF carries the same statutory clause as the page",
    (lang, path) => {
      // Base-14 Helvetica with no compression: the content streams hold literal text, so
      // a substring check on the raw bytes is a genuine assertion about what a reader
      // shows. Non-ASCII is written as WinAnsi octal escapes (\351 for e-acute), so those
      // are decoded back first — without that, "commerciële" reads as "commerci 353le"
      // and the Dutch copy silently never matches.
      const raw = readFileSync(resolve(ROOT, path), "latin1").replace(
        /\\([0-7]{3})/g,
        (_m, oct: string) => String.fromCharCode(parseInt(oct, 8)),
      );
      const norm = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "") // strip accents: WinAnsi round-trips, JSON does not
          .replace(/[^a-z0-9]+/gi, " ")
          .toLowerCase()
          .trim();
      const flat = norm(raw);

      const d = loadLocale(lang);
      const resolveT = (v: string) =>
        v.replace(/\$t\(([^)]+)\)/g, (_m, k: string) =>
          k.split(".").reduce((o: any, kk: string) => o?.[kk], d) ?? "",
        );

      // Wrapping breaks lines mid-sentence, so probe with short phrases that survive it.
      const probe = resolveT(d.statutory.body).split(/[.;—]/)[0].trim();
      expect(probe.length).toBeGreaterThan(15);
      const words = norm(probe).split(" ").slice(0, 5).join(" ");
      expect(flat, `${lang}: PDF does not contain the statutory clause opening`).toContain(words);

      expect(flat).toContain(norm("zentialpure.com/warranty"));
      expect(flat).toContain(norm("info@zentialpure.com"));
    },
  );

  it("the page offers the PDFs for download", () => {
    const page = read("src/pages/Warranty.tsx");
    expect(page).toContain('href="/warranty-en.pdf"');
    expect(page).toContain('href="/warranty-nl.pdf"');
    expect(page).toMatch(/download/);
  });
});

describe("warranty page — claims discipline", () => {
  it("makes no efficacy, medical or review claim", () => {
    const surface = LOCALES.map((l) => JSON.stringify(loadLocale(l))).join(" ").toLowerCase();
    // The warranty is a commercial term. Any therapeutic verb here is a prohibited claim
    // on a page a regulator would read first (knowledge/compliance/prohibited-claims.md),
    // and any rating is fabricated proof — 6 live pages carried invented review markup
    // until 2026-08-04.
    for (const banned of [
      "pain relief", "pijnverlichting", "heals", "cures", "treats", "clinically proven",
      "fda approved", "spierherstel", "ontsteking", "afslank",
      "aggregaterating", "★", "reviews say", "verified buyer",
    ]) {
      expect(surface, `banned term in warranty copy: ${banned}`).not.toContain(banned);
    }
  });
});
