import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePdpLink } from "../lib/pdpLink";

function Probe() {
  const href = usePdpLink("/instruments/face-introducer", "the-diagnosis");
  return <a href={href}>cta</a>;
}

describe("usePdpLink", () => {
  it("keeps the neutral fallback when the visitor has no UTMs", async () => {
    window.history.pushState({}, "", "/editorial/the-diagnosis");
    render(<Probe />);
    await waitFor(() =>
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/instruments/face-introducer?utm_campaign=the-diagnosis",
      ),
    );
  });

  it("forwards the visitor's own UTMs instead of stamping a source", async () => {
    // the 2026-07-16 bug: Meta-paid visitors were re-tagged utm_source=pinterest
    window.history.pushState(
      {},
      "",
      "/editorial/the-diagnosis?utm_source=meta&utm_medium=paid&utm_campaign=zp-cold-2.2",
    );
    render(<Probe />);
    await waitFor(() => {
      const href = screen.getByRole("link").getAttribute("href") ?? "";
      expect(href).toContain("utm_source=meta");
      expect(href).toContain("utm_medium=paid");
      expect(href).toContain("utm_campaign=zp-cold-2.2");
      expect(href).toContain("utm_content=the-diagnosis");
      expect(href).not.toContain("pinterest");
    });
  });
});
