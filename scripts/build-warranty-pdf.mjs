/**
 * Renders the warranty terms to public/warranty-<lang>.pdf.
 *
 * WHY A PDF EXISTS AT ALL
 * EU Directive 2019/771 Art. 17(1): the commercial guarantee "shall be provided to the
 * consumer on a durable medium at the latest at the time of the delivery of the goods."
 * A web page is not a durable medium — we can edit it after the sale, which is precisely
 * what the requirement exists to prevent. A file the buyer downloads and keeps is.
 *
 * WHY IT IS GENERATED, NOT HAND-WRITTEN
 * Two copies of the same legal terms drift. This reads the SAME locale JSON the page
 * renders from, so /warranty and warranty-en.pdf cannot disagree. Wired into `npm run
 * build` ahead of vite (same position as build-links.mjs) so a stale PDF cannot ship.
 * src/test/warrantyPdf.test.ts fails if the generator output stops matching the JSON.
 *
 * WHY THE PDF IS WRITTEN BY HAND
 * No dependency. PDF 1.4 with the base-14 Helvetica fonts needs no font embedding and no
 * library, and the output is selectable text rather than a rasterised image — a scan of
 * legal terms is a worse durable medium than the text itself.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// A4 in PostScript points.
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 62;
const TEXT_W = PAGE_W - MARGIN * 2;

/**
 * Base-14 Helvetica advance widths (per 1000 units), WinAnsi codepoints 32..255.
 * Needed because we wrap text ourselves and a monospace guess would produce visibly
 * ragged or overflowing lines. Values are the standard AFM widths.
 */
const HELV = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
const HELV_B = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];

const width = (str, size, bold) => {
  const tbl = bold ? HELV_B : HELV;
  let w = 0;
  for (const ch of str) {
    const c = ch.codePointAt(0);
    w += c >= 32 && c <= 126 ? tbl[c - 32] : 556; // non-ASCII falls back to an average
    }
  return (w / 1000) * size;
};

const wrap = (text, size, bold) => {
  const out = [];
  for (const para of String(text).split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (width(next, size, bold) > TEXT_W && line) {
        out.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    out.push(line);
  }
  return out;
};

/**
 * WinAnsiEncoding + PDF string escaping. The Dutch copy carries é and the English copy
 * carries typographic quotes and em dashes; passing those through raw produces mojibake
 * in every reader, which on a legal document is not a cosmetic bug.
 */
const WINANSI = { "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "–": 0x96, "—": 0x97, "•": 0x95, "€": 0x80, "·": 0xb7 };
const esc = (s) =>
  [...s]
    .map((ch) => {
      const c = WINANSI[ch] ?? ch.codePointAt(0);
      if (ch === "(" || ch === ")" || ch === "\\") return `\\${ch}`;
      if (c < 32 || c > 126) return `\\${c.toString(8).padStart(3, "0")}`;
      return ch;
    })
    .join("");

/** Lays blocks out across pages, returning one content stream per page. */
function paginate(blocks) {
  const pages = [];
  let ops = [];
  let y = PAGE_H - MARGIN;

  const newPage = () => {
    if (ops.length) pages.push(ops);
    ops = [];
    y = PAGE_H - MARGIN;
  };

  for (const b of blocks) {
    const { size, bold, gapBefore = 0, leading = size * 1.45, color = "0.10 0.09 0.08" } = b;
    const lines = wrap(b.text, size, bold);
    const needed = gapBefore + lines.length * leading;
    if (y - needed < MARGIN && ops.length) newPage();
    y -= gapBefore;
    for (const line of lines) {
      y -= leading;
      ops.push(
        `BT /${bold ? "F2" : "F1"} ${size} Tf ${color} rg 1 0 0 1 ${MARGIN.toFixed(2)} ${y.toFixed(2)} Tm (${esc(line)}) Tj ET`,
      );
      if (y < MARGIN + leading) newPage();
    }
  }
  if (ops.length) pages.push(ops);
  return pages;
}

function buildPdf(blocks, title) {
  const pageStreams = paginate(blocks);
  const objects = [];
  const push = (body) => objects.push(body); // returns nothing; index+1 is the object id

  const nPages = pageStreams.length;
  const catalogId = 1;
  const pagesId = 2;
  const fontId = 3;
  const fontBoldId = 4;
  const firstPageId = 5;
  const pageIds = pageStreams.map((_, i) => firstPageId + i * 2);
  const contentIds = pageStreams.map((_, i) => firstPageId + i * 2 + 1);

  push(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${nPages} >>`);
  push(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
  push(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);

  pageStreams.forEach((ops, i) => {
    push(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 ${fontId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`,
    );
    const stream = ops.join("\n");
    push(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`);
  });

  const infoId = objects.length + 1;
  push(`<< /Title (${esc(title)}) /Producer (Zential Pure) >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

/** Resolves the `$t(term.x)` nesting the page gets from i18next, so the PDF reads the same. */
const resolveT = (value, dict) =>
  String(value).replace(/\$t\(([^)]+)\)/g, (_, key) =>
    key.split(".").reduce((o, k) => (o == null ? o : o[k]), dict) ?? "",
  );

const LABELS = {
  en: { doc: "Warranty terms", issued: "Issued", keep: "Keep this file. These are the terms as they stood on the date above; the page at zentialpure.com/warranty may be updated later, and this copy is yours." },
  nl: { doc: "Garantievoorwaarden", issued: "Uitgegeven", keep: "Bewaar dit bestand. Dit zijn de voorwaarden zoals ze golden op bovenstaande datum; de pagina op zentialpure.com/warranty kan later worden aangepast, deze kopie is van jou." },
};

function render(lang, isoDate) {
  const d = JSON.parse(readFileSync(resolve(ROOT, `src/locales/${lang}/warranty.json`), "utf8"));
  const T = (v) => resolveT(v, d);
  const L = LABELS[lang] ?? LABELS.en;

  const blocks = [
    { text: "ZENTIAL PURE", size: 9, bold: true, color: "0.18 0.85 0.66" },
    { text: L.doc, size: 26, bold: true, gapBefore: 10 },
    { text: T(d.hero.headline).replace(/\n/g, " "), size: 13, bold: false, gapBefore: 10, color: "0.35 0.33 0.31" },
    { text: T(d.hero.sub), size: 10.5, gapBefore: 12 },
    { text: `${L.issued}: ${isoDate}`, size: 8.5, gapBefore: 8, color: "0.45 0.43 0.41" },

    { text: T(d.covered.title), size: 14, bold: true, gapBefore: 26 },
    ...d.covered.items.map((i) => ({ text: `•  ${T(i)}`, size: 10, gapBefore: 6 })),

    { text: T(d.excluded.title), size: 14, bold: true, gapBefore: 22 },
    ...d.excluded.items.map((i) => ({ text: `•  ${T(i)}`, size: 10, gapBefore: 6 })),

    { text: T(d.claim.title), size: 14, bold: true, gapBefore: 22 },
    ...d.claim.items.flatMap((s, n) => [
      { text: `${n + 1}.  ${T(s.title)}`, size: 10.5, bold: true, gapBefore: 10 },
      { text: T(s.desc), size: 10, gapBefore: 3 },
    ]),

    { text: T(d.statutory.title), size: 14, bold: true, gapBefore: 24 },
    { text: T(d.statutory.body), size: 10, gapBefore: 8 },

    { text: L.keep, size: 8.5, gapBefore: 22, color: "0.45 0.43 0.41" },
    { text: "Zential Pure · info@zentialpure.com · zentialpure.com/warranty", size: 8.5, gapBefore: 6, color: "0.45 0.43 0.41" },
  ];

  const out = resolve(ROOT, `public/warranty-${lang}.pdf`);
  const buf = buildPdf(blocks, `${L.doc} — Zential Pure`);
  writeFileSync(out, buf);
  return { out, bytes: buf.length };
}

// SOURCE_DATE_EPOCH keeps the build reproducible; otherwise every build rewrites the PDF
// with a new date and the git diff is pure noise.
const isoDate = (process.env.SOURCE_DATE_EPOCH
  ? new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000)
  : new Date()
)
  .toISOString()
  .slice(0, 10);

for (const lang of ["en", "nl"]) {
  const { out, bytes } = render(lang, isoDate);
  console.log(`  warranty pdf ${lang} → ${out.replace(ROOT + "/", "")} (${bytes} bytes)`);
}
