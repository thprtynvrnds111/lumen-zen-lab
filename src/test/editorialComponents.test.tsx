import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { EditorialLayout } from "@/pages/editorial/EditorialLayout";
import { EditorialImageSlot } from "@/pages/editorial/EditorialImageSlot";
import { EditorialNewsletter } from "@/pages/editorial/EditorialNewsletter";

beforeAll(() => {
  // jsdom has no IntersectionObserver
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

function wrap(ui: React.ReactElement) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
}

describe("EditorialLayout", () => {
  it("renders children inside .ed-page and shows the folio", () => {
    wrap(
      <EditorialLayout
        slug="the-ritual"
        title="Ten quiet minutes. — Zential Pure Journal"
        description="Before the phone, before the noise."
        ogImage="/og/editorial-the-ritual.jpg"
        publishedTime="2026-07-08"
        folio="( 01 / 05 )"
      >
        <p>essay body</p>
      </EditorialLayout>,
    );
    expect(screen.getByText("essay body")).toBeInTheDocument();
    expect(screen.getByText("( 01 / 05 )")).toBeInTheDocument();
  });
});

describe("EditorialImageSlot", () => {
  it("renders img with explicit dimensions and lazy loading by default", () => {
    wrap(
      <EditorialImageSlot
        src="/editorial/morning-mug.webp"
        alt="Morning light on a ceramic mug"
        width={390}
        height={300}
        artDirection="ceramic mug, warm morning window light"
      />,
    );
    const img = screen.getByAltText("Morning light on a ceramic mug");
    expect(img).toHaveAttribute("width", "390");
    expect(img).toHaveAttribute("height", "300");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});

describe("EditorialNewsletter", () => {
  it("POSTs email + slug-derived source to /api/newsletter", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);
    wrap(<EditorialNewsletter slug="the-ritual" copy="One letter a week." />);
    fireEvent.change(screen.getByPlaceholderText("Your email"), {
      target: { value: "reader@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/newsletter");
    expect(JSON.parse((opts as RequestInit).body as string)).toEqual({
      email: "reader@example.com",
      source: "sunday-protocol-the-ritual",
    });
    vi.unstubAllGlobals();
  });
});
