import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import TheDiagnosis from "@/pages/editorial/TheDiagnosis";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <TheDiagnosis />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("TheDiagnosis", () => {
  it("renders headline, modality badges, Face Introducer CTA with UTM", () => {
    renderPage();
    expect(screen.getByText("Why your skin stopped listening.")).toBeInTheDocument();
    for (const badge of ["EMS", "Microcurrent", "Thermal", "LED 630–660nm"]) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
    const order = screen.getByRole("link", { name: /order the face introducer/i });
    expect(order).toHaveAttribute(
      "href",
      "/instruments/face-introducer?utm_source=pinterest&utm_medium=pin&utm_campaign=the-diagnosis",
    );
  });

  it("carousel wraps in both directions with zero-padded counter", () => {
    renderPage();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /previous quote/i }));
    expect(screen.getByText("03 / 03")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next quote/i }));
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });
});
