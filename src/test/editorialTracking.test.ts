import { describe, it, expect, vi, afterEach } from "vitest";
import { pixelViewContent } from "@/pages/editorial/tracking";

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (window as any).fbq;
});

describe("pixelViewContent", () => {
  it("fires fbq ViewContent with content_name when fbq exists", () => {
    const fbq = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fbq = fbq;
    pixelViewContent("editorial-the-ritual");
    expect(fbq).toHaveBeenCalledWith("track", "ViewContent", {
      content_name: "editorial-the-ritual",
    });
  });

  it("does not throw when fbq is absent", () => {
    expect(() => pixelViewContent("editorial-the-ritual")).not.toThrow();
  });
});
