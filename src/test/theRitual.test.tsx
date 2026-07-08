import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TheRitual from "@/pages/editorial/TheRitual";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("TheRitual", () => {
  it("renders headline, both CTAs with UTM, and newsletter", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <TheRitual />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByText("Ten quiet minutes.")).toBeInTheDocument();
    const soft = screen.getByRole("link", { name: /read about the instrument/i });
    expect(soft).toHaveAttribute(
      "href",
      "/instruments/restoration-belt?utm_source=pinterest&utm_medium=pin&utm_campaign=the-ritual",
    );
    const order = screen.getByRole("link", { name: /order the restoration belt/i });
    expect(order.getAttribute("href")).toContain("utm_campaign=the-ritual");
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });
});
