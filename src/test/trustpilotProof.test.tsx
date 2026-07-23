import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustpilotProof } from "@/components/zential/TrustpilotProof";

/**
 * The widget renders real numbers as STATIC text (no TrustBox script) and links
 * to the public Trustpilot profile. These assertions lock the authenticity
 * contract: real score/count, external link, safe rel. Update the expected
 * numbers here in lockstep with the constants in TrustpilotProof.tsx.
 */
describe("TrustpilotProof", () => {
  it("renders the verified score, count, and profile link (pdp)", () => {
    render(<TrustpilotProof variant="pdp" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("4.2");
    expect(link).toHaveTextContent(/on Trustpilot/i);
    expect(link).toHaveTextContent(/7 reviews/i);
    expect(link).toHaveAttribute("href", "https://www.trustpilot.com/review/zentialpure.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("renders the compact variant with the same link and copy (cart)", () => {
    render(<TrustpilotProof variant="cart" />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("4.2");
    expect(link).toHaveTextContent(/7 reviews/i);
    expect(link).toHaveAttribute("href", "https://www.trustpilot.com/review/zentialpure.com");
  });

  it("uses no external widget script (static text only)", () => {
    const { container } = render(<TrustpilotProof variant="pdp" />);
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector('iframe[src*="trustpilot"]')).toBeNull();
  });
});
