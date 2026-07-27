import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { withPixelAttribution, buyUrl } from "@/lib/checkout";

/**
 * Guard: buy URLs must carry the Meta pixel cookies into the checkout.
 *
 * Shopify fires `checkouts/create` the moment a checkout object exists — BEFORE the
 * buyer types an email — so the CAPI sender has no identifier and Meta rejects the
 * event with subcode 2804050. Measured on the live box 2026-07-27: 29 InitiateCheckout
 * events rejected against 3 accepted over 7 days, a 91% loss. It read as "nobody is
 * starting checkouts". 32 people were.
 *
 * `_fbp` and `_fbc` are valid Meta identifiers on their own. Cart-permalink
 * `attributes[...]` params become cart attributes, which Shopify surfaces as
 * `note_attributes` on the webhook — where buildUserData() already looks for them
 * (zential-agent-engine/scripts/meta-capi/capi-sender.js).
 *
 * Non-negotiable: this is analytics riding along on a purchase path. It must never
 * throw and never block a buy click.
 */

const BASE = "https://checkout.zentialpure.com/cart/51731419922775:1";

function setCookies(value: string) {
  Object.defineProperty(document, "cookie", { value, writable: true, configurable: true });
}

beforeEach(() => setCookies(""));
afterEach(() => setCookies(""));

describe("withPixelAttribution", () => {
  it("attaches _fbp when the pixel cookie is present", () => {
    setCookies("_fbp=fb.1.1698000000000.1234567890");
    expect(withPixelAttribution(BASE)).toContain("attributes[_fbp]=fb.1.1698000000000.1234567890");
  });

  it("attaches both _fbp and _fbc when the visitor arrived from an ad", () => {
    setCookies("_fbp=fb.1.111.222; _fbc=fb.1.333.IwAR_test");
    const out = withPixelAttribution(BASE);
    expect(out).toContain("attributes[_fbp]=");
    expect(out).toContain("attributes[_fbc]=");
  });

  it("preserves an existing query string — the discount code must survive", () => {
    setCookies("_fbp=fb.1.111.222");
    const withDiscount = `${BASE}?discount=RITUAL15`;
    const out = withPixelAttribution(withDiscount);
    expect(out).toContain("discount=RITUAL15");
    expect(out).toContain("attributes[_fbp]=");
    expect(out.indexOf("?")).toBe(withDiscount.indexOf("?")); // only one `?`
  });

  it("url-encodes cookie values", () => {
    setCookies("_fbc=fb.1.333.IwAR a&b");
    expect(withPixelAttribution(BASE)).not.toContain("a&b");
  });

  it("returns the url unchanged when no pixel cookies exist", () => {
    setCookies("some_other=1");
    expect(withPixelAttribution(BASE)).toBe(BASE);
  });

  it("never throws, whatever document.cookie does", () => {
    Object.defineProperty(document, "cookie", {
      get() { throw new Error("blocked"); },
      configurable: true,
    });
    expect(() => withPixelAttribution(BASE)).not.toThrow();
    expect(withPixelAttribution(BASE)).toBe(BASE);
  });

  it("skips absurdly long values rather than building a broken url", () => {
    setCookies(`_fbp=${"x".repeat(300)}`);
    expect(withPixelAttribution(BASE)).toBe(BASE);
  });
});

describe("buyUrl", () => {
  it("carries attribution through", () => {
    setCookies("_fbp=fb.1.111.222");
    expect(buyUrl(BASE)).toContain("attributes[_fbp]=");
  });

  it("is a no-op on an empty url", () => {
    expect(buyUrl("")).toBe("");
  });
});
