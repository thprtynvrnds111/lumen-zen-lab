import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard: index.html must initialise BOTH Meta pixels.
 *
 * fbq dispatches every track() call to every initialised pixel, so the init
 * lines in index.html are what decide which ad sets can see the app's events.
 *
 *   915864761310220  — the NL-BE ad set optimises ADD_TO_CART on this
 *   2204643330063300 — CAPI (META_PIXEL_ID) and BOTH US ad sets
 *                      (broad-us-purchase, warm-atc-14d-purchase) read this
 *
 * Between 2026-07-12 and 2026-07-27 only 915… was initialised. Every browser
 * ViewContent and AddToCart went to a pixel the US ad sets do not read, so
 * their add-to-cart count read zero across ~€280 of spend while the funnel
 * itself worked. Nothing errored — the number just went quiet, which is why it
 * survived two weeks and several investigations.
 *
 * Verified live 2026-07-27 via Graph API /adsets promoted_object.pixel_id.
 * If an ad set is ever repointed at a new pixel, add it here too.
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
