import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Journal from "@/pages/Journal";
import { JOURNAL_CARDS, VALID_CARD_LINKS } from "@/pages/editorial/journalCards";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

function renderHub() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Journal />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("journalCards inventory", () => {
  it("every non-newsletter card links to a registered route (no dead links)", () => {
    for (const card of JOURNAL_CARDS) {
      if (card.kind === "newsletter") continue;
      expect(VALID_CARD_LINKS).toContain(card.link);
    }
  });

  it("keeps all seven existing /journal article routes reachable from the board", () => {
    const journalArticleRoutes = VALID_CARD_LINKS.filter((l) => l.startsWith("/journal/"));
    const linked = new Set(
      JOURNAL_CARDS.filter((c) => c.kind !== "newsletter").map((c) => (c as { link: string }).link),
    );
    for (const route of journalArticleRoutes) {
      expect(linked.has(route)).toBe(true);
    }
  });
});

describe("Journal hub", () => {
  it("renders the intro headline and every card under the default All filter", () => {
    renderHub();
    expect(
      screen.getByRole("heading", { name: /skin science you can pin, verify, and practice/i }),
    ).toBeInTheDocument();

    // Every image/text/quote/fact card headline or stat is present under All.
    for (const card of JOURNAL_CARDS) {
      if (card.kind === "image" || card.kind === "text") {
        expect(screen.getByText(card.headline)).toBeInTheDocument();
      } else if (card.kind === "quote") {
        expect(screen.getByText(card.name)).toBeInTheDocument();
      } else if (card.kind === "fact") {
        expect(screen.getByText(card.stat)).toBeInTheDocument();
      }
    }
  });

  it("filters the board to a subset when a chip is clicked", () => {
    renderHub();
    // A Ritual-only fact stat, and an Experts-only quote, both visible under All.
    expect(screen.getByText("12 min")).toBeInTheDocument();
    expect(screen.getByText("Dr. Amara Osei")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ritual" }));

    // Ritual card stays, Experts card is filtered out.
    expect(screen.getByText("12 min")).toBeInTheDocument();
    expect(screen.queryByText("Dr. Amara Osei")).not.toBeInTheDocument();
    // A Mechanism card is also gone.
    expect(screen.queryByText("What happens at 630 nanometres")).not.toBeInTheDocument();
  });

  it("gives image/stat/quote pins a Pinterest save intent link", () => {
    renderHub();
    const saves = screen.getAllByRole("link", { name: /^save$/i });
    expect(saves.length).toBeGreaterThan(0);
    for (const a of saves) {
      expect(a.getAttribute("href")).toMatch(
        /^https:\/\/www\.pinterest\.com\/pin\/create\/button\//,
      );
      expect(a).toHaveAttribute("target", "_blank");
    }
  });

  it("exposes a working subscribe field (newsletter) in the board", () => {
    renderHub();
    // At least one email input from the reused EditorialNewsletter unit.
    expect(screen.getAllByPlaceholderText(/your email|you@example/i).length).toBeGreaterThan(0);
  });

  it("links a known article card to its live detail route", () => {
    renderHub();
    const heading = screen.getByText("EMS vs. Microcurrent");
    const link = heading.closest("a");
    expect(link).toHaveAttribute("href", "/journal/ems-vs-microcurrent");
  });
});
