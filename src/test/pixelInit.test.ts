import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard: index.html must initialise BOTH Meta pixels.
 *
 * fbq dispatches every track() call to every initialised pixel, so the init
 * lines in index.html decide which ad sets can see the app's events. Each pixel
 * is read by a different set of campaigns; initialising only one makes every
 * browser ViewContent and AddToCart invisible to the campaigns on the other,
 * and that failure is SILENT — nothing errors, the number just goes quiet.
 *
 * The rationale, the incident it came from, and the per-pixel campaign mapping
 * live in the engine repo (docs/decisions/2026-07-27-atc-optimisation-on-the-
 * pixel-that-sees-it.md) — deliberately NOT in index.html, which ships to every
 * visitor as page source.
 *
 * If a campaign is ever repointed at a new pixel, add that pixel here too.
 */
const BROWSER_PIXEL = "915864761310220";
const US_ADSET_PIXEL = "2204643330063300";

const indexHtml = readFileSync(resolve(__dirname, "../../index.html"), "utf8");

describe("Meta pixel initialisation", () => {
  it("initialises the browser pixel the NL-BE ad set reads", () => {
    expect(indexHtml).toContain(`fbq('init','${BROWSER_PIXEL}')`);
  });

  it("initialises the pixel BOTH US ad sets optimise against", () => {
    expect(indexHtml).toContain(`fbq('init','${US_ADSET_PIXEL}')`);
  });

  it("fires PageView after the inits, so it reaches every pixel", () => {
    const lastInit = Math.max(
      indexHtml.indexOf(`fbq('init','${BROWSER_PIXEL}')`),
      indexHtml.indexOf(`fbq('init','${US_ADSET_PIXEL}')`),
    );
    const pageView = indexHtml.indexOf("fbq('track','PageView')");
    expect(pageView).toBeGreaterThan(lastInit);
  });
});
