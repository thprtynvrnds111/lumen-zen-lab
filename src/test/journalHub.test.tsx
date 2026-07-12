import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
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

    // Every image/text/citation/fact card headline or stat is present under All.
    for (const card of JOURNAL_CARDS) {
      if (card.kind === "image" || card.kind === "text") {
        expect(screen.getByText(card.headline)).toBeInTheDocument();
      } else if (card.kind === "citation") {
        expect(screen.getByText(card.takeaway)).toBeInTheDocument();
      } else if (card.kind === "fact") {
        expect(screen.getByText(card.stat)).toBeInTheDocument();
      }
    }
  });

  it("filters the board to a subset when a chip is clicked", () => {
    renderHub();
    // A Ritual-only fact stat, and a Sources-only citation, both visible under All.
    const citationAttr = "Wunsch & Matuschka, Photomedicine and Laser Surgery 32(2), 2014";
    expect(screen.getByText("12 min")).toBeInTheDocument();
    expect(screen.getByText(citationAttr)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ritual" }));

    // Ritual card stays, the Sources card is filtered out.
    expect(screen.getByText("12 min")).toBeInTheDocument();
    expect(screen.queryByText(citationAttr)).not.toBeInTheDocument();
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

/**
 * The board's promise is "pin, VERIFY, and practice". These tests are the verify half.
 * A claim a reader cannot check does not belong on this page — so the checkability is
 * asserted, not merely intended.
 */
describe("the truth contract", () => {
  it("every citation pin renders its limit and a working PubMed link", () => {
    renderHub();
    for (const card of JOURNAL_CARDS) {
      if (card.kind !== "citation") continue;
      expect(screen.getByText(card.citation.limit, { exact: false })).toBeInTheDocument();
      const verify = screen.getByRole("link", {
        name: new RegExp(`PMID ${card.citation.pmid}`),
      });
      expect(verify).toHaveAttribute(
        "href",
        `https://pubmed.ncbi.nlm.nih.gov/${card.citation.pmid}/`,
      );
      expect(verify).toHaveAttribute("target", "_blank");
    }
  });

  it("ships no fabricated experts and no stock portraits", () => {
    const { container } = renderHub();
    const board = JSON.stringify(JOURNAL_CARDS);
    for (const ghost of ["Amara Osei", "Elena Vasquez", "Maren Holt", "expert-1", "expert-2"]) {
      expect(board).not.toContain(ghost);
    }
    expect(container.querySelector(".jh-portrait")).toBeNull();
  });

  it("never uppercases a line carrying µA — uppercase renders it as MA, off by 1000x", async () => {
    // Caught in the browser, not here: text-transform:uppercase turned "10–1000 µA"
    // into "10-1000 MA" on the Cheng card. On a page selling precision, that is the
    // worst possible typo. The unit-bearing classes must stay untransformed.
    const css = await readFile(resolve(process.cwd(), "src/styles/editorial.css"), "utf8");
    const designRule = css.match(/\.jh-cite-design \{[^}]*\}/)?.[0] ?? "";
    expect(designRule).not.toContain("uppercase");
    expect(JSON.stringify(JOURNAL_CARDS)).toContain("µA");
  });

  it("states the cost-per-session claim as arithmetic that actually checks out", () => {
    // €88 once, used daily for a year → 88/365 = €0.24. The old card said €3.40 for the
    // same sentence, which is 88/26 — a real number attached to the wrong claim.
    renderHub();
    expect(screen.getByText("€0.24")).toBeInTheDocument();
    expect(screen.queryByText("€3.40")).not.toBeInTheDocument();
    expect(Number((88 / 365).toFixed(2))).toBe(0.24);
  });
});
