#!/usr/bin/env node
/**
 * Emits the link-in-bio pages into public/ — one file per platform, each with
 * its utm_source baked into every outbound link.
 *
 * Runs BEFORE `vite build`, not after: Vite snapshots public/ when the build
 * starts, so a file written later never reaches dist/. See package.json.
 *
 * Outputs are gitignored build artifacts. To change the page, edit
 * scripts/links/tiles.mjs.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

import { PLATFORMS, TILES, BRAND } from "./links/tiles.mjs";
import { renderPage } from "./links/template.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(HERE, "..", "public");

function assertImagesExist() {
  const needed = [BRAND.hero.src, ...TILES.map((t) => t.img)];
  const missing = needed.filter((p) => !existsSync(join(PUBLIC, p)));
  if (missing.length) {
    throw new Error(
      `link-in-bio: missing image(s) ${missing.join(", ")} — ` +
        `run: python3 scripts/links/make-images.py`
    );
  }
}

function main() {
  if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });
  assertImagesExist();

  for (const platform of PLATFORMS) {
    const html = renderPage({ platform });
    const dest = join(PUBLIC, platform.out);
    writeFileSync(dest, html, "utf8");
    const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
    console.log(`links: ${platform.out.padEnd(10)} ${kb.padStart(5)} KB  ${platform.label}`);
  }
}

main();
