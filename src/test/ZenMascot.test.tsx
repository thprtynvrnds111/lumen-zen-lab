import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ZenMascot } from "@/components/zential/ZenMascot";

describe("ZenMascot", () => {
  it("renders an accessible svg", () => {
    render(<ZenMascot />);
    const svg = screen.getByRole("img", { name: "Zen, the Zential Pure mascot" });
    expect(svg).toBeInTheDocument();
  });

  it("defaults to the calm expression", () => {
    render(<ZenMascot />);
    expect(screen.getByRole("img")).toHaveAttribute("data-expression", "calm");
  });

  it("renders the skeptical brow only when skeptical", () => {
    const { container, rerender } = render(<ZenMascot expression="skeptical" />);
    expect(container.querySelector('[data-part="brow"]')).not.toBeNull();
    rerender(<ZenMascot expression="calm" />);
    expect(container.querySelector('[data-part="brow"]')).toBeNull();
  });

  it("always renders the halo (identity anchor)", () => {
    const { container } = render(<ZenMascot expression="sleepy" />);
    expect(container.querySelector(".zen-halo")).not.toBeNull();
  });

  it("applies the size prop to width and height", () => {
    render(<ZenMascot size={96} />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("width", "96");
  });
});
