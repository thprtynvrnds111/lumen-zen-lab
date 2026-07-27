import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard: the ATC beacon measurement chain stays intact.
 *
 * Built 2026-07-27 to answer one question nobody could: how many browser
 * AddToCart events actually reach Meta? The pixel ships ATC as an image beacon
 * (no unload-survival guarantee), fbevents.js loads on DOMContentLoaded (clicks
 * before that die in the stub queue), and the funnel buy CTA is a prerendered
 * anchor (clicks before hydration fire nothing at all). The beacon counts every
 * buy-CTA click server-side via an own-origin fetch keepalive POST; beacon
 * count vs pixel-stats AddToCart over the same window = the loss rate.
 *
 * Chain: index.html inline capture-phase listener → [data-atc-beacon] elements
 * → /api/atc-beacon → engine box substrate/data/atc_beacon.jsonl.
 * Break any link and the measurement silently reads "no clicks".
 */

const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("ATC beacon chain", () => {
  it("index.html registers the capture-phase beacon listener", () => {
    const html = read("index.html");
    expect(html).toContain("data-atc-beacon");
    expect(html).toContain("/api/atc-beacon");
    expect(html).toContain("keepalive: true");
    // Capture phase is the point: it must see clicks React never gets.
    expect(html).toMatch(/addEventListener\('click',[\s\S]*?,\s*true\)/);
  });

  it("every browser AddToCart click site carries the beacon attribute", () => {
    // One file per fbq('track', 'AddToCart') sender. If a new ATC sender
    // appears, add its CTA here — an uninstrumented sender skews the ratio.
    const senders = [
      "src/pages/funnel/FunnelBridge.tsx",
      "src/components/CartDrawer.tsx",
      "src/components/zential/SystemBundle.tsx",
      "src/pages/OneShelf.tsx",
      "src/pages/InstrumentLanding.tsx",
    ];
    for (const file of senders) {
      expect(read(file), `${file} lost its data-atc-beacon attribute`).toContain("data-atc-beacon");
    }
  });

  it("the relay endpoint exists and forwards to the box sink", () => {
    const api = read("api/atc-beacon.ts");
    expect(api).toContain("/capi/beacon/atc");
    expect(api).toContain("ZENTIAL_INTERNAL_API_KEY");
  });

  it("no browser InitiateCheckout sender anywhere — CAPI owns IC", () => {
    // Event ownership (2026-07-27): browser owns PageView/ViewContent/AddToCart,
    // CAPI owns InitiateCheckout/Purchase (event_id = checkout.id, unknowable in
    // the browser, so a browser IC can never dedupe and double-counts).
    const glob = ["src/lib/movement-tracking.ts", "src/pages/funnel/tracking.ts", "src/components/CartDrawer.tsx"];
    for (const file of glob) {
      const text = read(file);
      const senders = text
        .split("\n")
        .filter((l) => /fbq[^\n]*["']InitiateCheckout["']/.test(l) && !l.trim().startsWith("//") && !l.trim().startsWith("*"));
      expect(senders, `${file} fires browser InitiateCheckout:\n${senders.join("\n")}`).toEqual([]);
    }
  });
});
