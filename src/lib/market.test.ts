import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getCountry, formatMoney, _resetCountryCache } from "@/lib/market";
import { LIVE_HANDLES } from "@/data/liveCatalog";
import { getProductConfig } from "@/data/productConfigs";
import { INSTRUMENT_REDIRECTS } from "@/data/instrumentRedirects";

function mockFetch(impl: () => Promise<any>) {
  const fn = vi.fn(impl);
  vi.stubGlobal("fetch", fn);
  return fn;
}

describe("getCountry", () => {
  beforeEach(() => {
    _resetCountryCache();
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the country reported by /api/geo (US)", async () => {
    mockFetch(async () => ({ ok: true, json: async () => ({ country: "US" }) }));
    await expect(getCountry()).resolves.toBe("US");
  });

  it("falls back to NL when the /api/geo fetch throws", async () => {
    mockFetch(async () => {
      throw new Error("network down");
    });
    await expect(getCountry()).resolves.toBe("NL");
  });

  it("falls back to NL when /api/geo returns a non-ok status", async () => {
    mockFetch(async () => ({ ok: false, status: 500, json: async () => ({}) }));
    await expect(getCountry()).resolves.toBe("NL");
  });

  it("lets a ?country=DE override win over geo (and skips the fetch)", async () => {
    window.history.replaceState({}, "", "/?country=DE");
    const fetchMock = mockFetch(async () => ({ ok: true, json: async () => ({ country: "US" }) }));
    await expect(getCountry()).resolves.toBe("DE");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("memoizes — hits /api/geo at most once per load", async () => {
    const fetchMock = mockFetch(async () => ({ ok: true, json: async () => ({ country: "US" }) }));
    await getCountry();
    await getCountry();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("caches the resolved country in sessionStorage", async () => {
    mockFetch(async () => ({ ok: true, json: async () => ({ country: "US" }) }));
    await getCountry();
    expect(window.sessionStorage.getItem("zp_country")).toBe("US");
  });
});

describe("formatMoney", () => {
  it("formats a USD amount with a dollar sign", () => {
    const out = formatMoney(88, "USD");
    expect(out).toContain("88");
    expect(out).toMatch(/\$|US/);
  });

  it("formats an EUR amount with a euro sign", () => {
    const out = formatMoney("180", "EUR");
    expect(out).toContain("180");
    expect(out).toContain("€");
  });

  it("renders whole amounts without decimals", () => {
    expect(formatMoney(88, "EUR")).not.toContain(".00");
    expect(formatMoney(88, "EUR")).not.toContain(",00");
    expect(formatMoney(88, "EUR")).toContain("88");
    expect(formatMoney("180.00", "USD")).not.toMatch(/[.,]00/);
  });

  it("keeps 2 decimals when the amount has cents", () => {
    expect(formatMoney(220.5, "EUR")).toMatch(/220[.,]50/);
    expect(formatMoney("249.99", "USD")).toMatch(/249[.,]99/);
  });

  it("accepts string amounts", () => {
    expect(formatMoney("88.00", "USD")).toContain("88");
  });

  it("treats non-numeric amounts as 0", () => {
    expect(formatMoney("not-a-number", "EUR")).toContain("0");
  });
});

describe("LIVE_HANDLES allowlist", () => {
  it("includes the four core catalog products", () => {
    expect(LIVE_HANDLES.has("lifting-and-tightening-face-introducer")).toBe(true);
    expect(
      LIVE_HANDLES.has("red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device"),
    ).toBe(true);
    expect(
      LIVE_HANDLES.has("the-restoration-mat"),
    ).toBe(true);
    expect(LIVE_HANDLES.has("the-system-founding-bundle")).toBe(true);
  });

  it("includes the conductive-gel and PDRN-pad purchase-path add-ons", () => {
    expect(LIVE_HANDLES.has("medicube-collagen-elastic-jelly-moisturizing-cream")).toBe(true);
    expect(LIVE_HANDLES.has("collagen-eye-mask")).toBe(true);
  });

  it("excludes known ghost SKUs", () => {
    for (const ghost of [
      "charging-unlock",
      "white-noise-sleep-aid-machine",
      "breath-seal",
      "gravity-quilt-cotton-weighted-blanket",
      "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad",
    ]) {
      expect(LIVE_HANDLES.has(ghost)).toBe(false);
    }
  });
});

/**
 * An allowlisted handle is a handle the browse grids will link to. CategoryGrid,
 * DevicesSection, SearchOverlay, RelatedProducts, ShopByConcern and QuizResult all
 * build `/product/${handle}` from whatever the catalog returns, so a LIVE_HANDLES
 * entry with no productConfig and no redirect is a dead link on a real shopping
 * path — which is exactly how `the-restoration-mat` and `the-system-founding-bundle`
 * shipped "Product not found" on /collection and /protocols/03-recovery (found on
 * an iPhone viewport, 2026-08-01, reported from the Instagram bio).
 */
describe("every allowlisted handle resolves to a page", () => {
  const ROOT = join(__dirname, "..", "..");

  it("has a productConfig or an instrument redirect for each LIVE_HANDLES entry", () => {
    const dead = [...LIVE_HANDLES].filter(
      (h) => !getProductConfig(h) && !INSTRUMENT_REDIRECTS[h],
    );
    expect(dead).toEqual([]);
  });

  it("points every redirect at a slug that has a real /instruments route", () => {
    const landing = readFileSync(join(ROOT, "src", "pages", "InstrumentLanding.tsx"), "utf8");
    const app = readFileSync(join(ROOT, "src", "App.tsx"), "utf8");

    for (const slug of new Set(Object.values(INSTRUMENT_REDIRECTS))) {
      const hasLandingConfig = new RegExp(`slug:\\s*"${slug}"`).test(landing);
      const hasExplicitRoute = app.includes(`path="/instruments/${slug}"`);
      expect(
        hasLandingConfig || hasExplicitRoute,
        `/instruments/${slug} has neither an InstrumentLanding config nor an explicit route`,
      ).toBe(true);
    }
  });
});
