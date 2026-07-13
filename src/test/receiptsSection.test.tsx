import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ReceiptsSection } from "@/components/zential/ReceiptsSection";

/**
 * Receipts section = tabbed per-instrument proof. These assertions lock the
 * authenticity contract: only verifiable content (specs, price math, citation
 * link, real Trustpilot line), tabs actually switch panels, and the copy never
 * drifts into outcome-claim territory ("guaranteed", "clinically proven").
 */
function renderSection() {
  return render(
    <MemoryRouter>
      <ReceiptsSection />
    </MemoryRouter>,
  );
}

describe("ReceiptsSection", () => {
  it("renders the heading and the Face Introducer tab active by default", () => {
    renderSection();
    expect(screen.getByText("Proof, not promises.")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Face Introducer" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("€0.24")).toBeInTheDocument();
  });

  it("switches panels when another instrument tab is clicked", () => {
    renderSection();
    fireEvent.click(screen.getByRole("tab", { name: "Restoration Belt" }));
    expect(screen.getByText("660 + 850nm")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Restoration Belt" })).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getByRole("tab", { name: "Restoration Mat" }));
    expect(screen.getByText("660nm + FIR")).toBeInTheDocument();
  });

  it("links each panel to its PDP and to the journal citations", () => {
    renderSection();
    expect(screen.getByRole("link", { name: /see the instrument/i })).toHaveAttribute(
      "href",
      "/instruments/face-introducer",
    );
    expect(screen.getByRole("link", { name: /read the citations/i })).toHaveAttribute("href", "/journal");
  });

  it("contains no prohibited-claim language", () => {
    const { container } = renderSection();
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/clinically proven|guaranteed results|will (reduce|lift|firm)|cures?|treats?\b/i);
  });
});
