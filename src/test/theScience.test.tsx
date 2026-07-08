import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TheScience from "@/pages/editorial/TheScience";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("TheScience", () => {
  it("renders headline, three numbered mechanism sections, references, UTM CTAs", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <TheScience />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByText("What 660nm actually does.")).toBeInTheDocument();
    expect(screen.getByText("Absorption")).toBeInTheDocument();
    expect(screen.getByText("Energy")).toBeInTheDocument();
    expect(screen.getByText("Signal")).toBeInTheDocument();
    expect(screen.getByText("References")).toBeInTheDocument();
    const order = screen.getByRole("link", { name: /order the restoration belt/i });
    expect(order).toHaveAttribute(
      "href",
      "/instruments/restoration-belt?utm_source=pinterest&utm_medium=pin&utm_campaign=the-science",
    );
  });
});
