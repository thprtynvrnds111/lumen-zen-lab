import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { LIVE_HANDLES } from "@/data/liveCatalog";
import { INSTRUMENT_REDIRECTS } from "@/data/instrumentRedirects";
import { getProductConfig } from "@/data/productConfigs";

/**
 * Every /product/<handle> URL must resolve AT THE EDGE, not only after React boots.
 *
 * The defect this guards, measured live on 2026-08-04: 9 of 11 live product URLs
 * returned HTTP 200 while serving the homepage shell — byte-identical to `/`. The client
 * redirect in INSTRUMENT_REDIRECTS fired after hydration, so a human eventually landed
 * somewhere sensible, but a crawler, a link preview, or a JS-blocked browser saw the
 * homepage at a product URL. Every handle renamed on 2026-08-03 was in that state,
 * including all four canonical ones.
 *
 * Three ways a handle may resolve, and it must be exactly one:
 *   - a 301 in vercel.json (routes run before the filesystem handler), or
 *   - a prerendered page in scripts/prerender.mjs, or
 *   - both, which is a redirect into a page we also render — allowed, and what the
 *     restore-gel/restore-pads aliases do.
 * What is NOT allowed is neither, because the final `/(.*) -> /index.html` rewrite
 * silently turns that into the homepage at 200.
 */
const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

const vercel = JSON.parse(read("vercel.json")) as {
  routes: Array<{ src?: string; status?: number; headers?: { Location?: string }; handle?: string; dest?: string }>;
};
const prerender = read("scripts/prerender.mjs");

const redirects = new Map<string, string>();
for (const r of vercel.routes) {
  if (r.status === 301 && r.src && r.headers?.Location) redirects.set(r.src, r.headers.Location);
}
const isPrerendered = (path: string) => prerender.includes(`'${path}'`);

/** Retired Shopify spellings. Mirrors RENAMED_HANDLE_ALIASES, which is not exported. */
const RENAMED = {
  "medicube-collagen-elastic-jelly-moisturizing-cream": "restore-gel",
  "collagen-eye-mask": "restore-pads",
  "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device": "restoration-belt",
  "lifting-and-tightening-face-introducer": "face-introducer",
} as const;

describe("/product/<handle> resolves at the edge", () => {
  it.each([...LIVE_HANDLES])("%s is not left to the SPA fallback", (handle) => {
    const path = `/product/${handle}`;
    const resolved = redirects.has(path) || isPrerendered(path);
    expect(
      resolved,
      `${path} has neither a 301 in vercel.json nor an entry in prerender.mjs, so ` +
        `the catch-all rewrite serves the homepage shell at HTTP 200`,
    ).toBe(true);
  });

  it.each(Object.keys(INSTRUMENT_REDIRECTS))(
    "%s 301s to its /instruments page instead of redirecting client-side only",
    (handle) => {
      const target = redirects.get(`/product/${handle}`);
      expect(target, `/product/${handle} must 301 at the edge`).toBe(
        `/instruments/${INSTRUMENT_REDIRECTS[handle]}`,
      );
    },
  );

  it.each(Object.entries(RENAMED))("retired handle %s 301s to the live URL", (oldHandle, newHandle) => {
    const target = redirects.get(`/product/${oldHandle}`);
    expect(target, `/product/${oldHandle} must 301 somewhere`).toBeTruthy();
    // A retired handle whose new spelling is itself an instrument redirect goes straight
    // to /instruments — one hop, not two.
    const expected = INSTRUMENT_REDIRECTS[newHandle]
      ? `/instruments/${INSTRUMENT_REDIRECTS[newHandle]}`
      : `/product/${newHandle}`;
    expect(target).toBe(expected);
  });
});

describe("redirect hygiene", () => {
  it("no 301 points at a URL that is itself 301'd", () => {
    const chains = [...redirects.entries()]
      .filter(([, to]) => redirects.has(to))
      .map(([from, to]) => `${from} -> ${to} -> ${redirects.get(to)}`);
    expect(chains, "redirect chains leak PageRank and cost a round trip").toEqual([]);
  });

  it("no 301 points at itself", () => {
    expect([...redirects.entries()].filter(([from, to]) => from === to)).toEqual([]);
  });

  it("every /product 301 lands on a real destination", () => {
    for (const [from, to] of redirects) {
      if (!from.startsWith("/product/")) continue;
      if (to.startsWith("/instruments/")) {
        // /instruments/the-system is an explicit route; the rest are prerendered slugs.
        expect(isPrerendered(to) || to === "/instruments/the-system", `${from} -> ${to} is not a real page`).toBe(true);
      } else if (to.startsWith("/product/")) {
        const handle = to.slice("/product/".length);
        expect(getProductConfig(handle), `${from} -> ${to} has no productConfig`).not.toBeNull();
        expect(isPrerendered(to), `${from} -> ${to} is not prerendered, so it serves the shell`).toBe(true);
      }
    }
  });
});
