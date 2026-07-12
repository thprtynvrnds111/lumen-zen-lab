import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RitualJournal from "@/pages/editorial/hub/RitualJournal";
import ClinicalIssue from "@/pages/editorial/hub/ClinicalIssue";
import { HUB_ARTICLES, HUB_CITATIONS } from "@/pages/editorial/hub/hubData";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

/** Every live route a hub article card may link to (mirrors App.tsx). */
const VALID_LINKS = new Set([
  "/editorial/the-ritual",
  "/editorial/the-science",
  "/editorial/the-diagnosis",
  "/journal/frequency-shift",
  "/journal/microcurrent-collagen",
  "/journal/evening-protocol",
  "/journal/red-light-clinical",
  "/journal/lymphatic-drainage",
  "/journal/ems-vs-microcurrent",
  "/journal/ritual-that-lasts",
]);

function renderPage(el: React.ReactElement) {
  return render(
    <HelmetProvider>
      <MemoryRouter>{el}</MemoryRouter>
    </HelmetProvider>,
  );
}

describe("hubData", () => {
  it("every article links to a live route", () => {
    for (const a of HUB_ARTICLES) {
      expect(VALID_LINKS.has(a.link), `${a.title} → ${a.link}`).toBe(true);
    }
  });
});

describe("RitualJournal (/editorial)", () => {
  it("renders hero, nav CTAs, six articles under All, and newsletter", () => {
    renderPage(<RitualJournal />);
    expect(
      screen.getByText("Understand the mechanism. The benefit follows."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /order the face introducer/i })).toHaveAttribute(
      "href",
      "/instruments/face-introducer",
    );
    expect(screen.getByRole("link", { name: /read the issue/i })).toHaveAttribute(
      "href",
      "/editorial/clinical-issue",
    );
    // "All" shows the six most recent entries
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("filters the grid by topic", () => {
    renderPage(<RitualJournal />);
    fireEvent.click(screen.getByRole("button", { name: "Evidence" }));
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(["Read a label like a chemist", "The clinic dropout's guide"]);
  });

  it("citation carousel wraps in both directions", () => {
    renderPage(<RitualJournal />);
    const attr = (c: (typeof HUB_CITATIONS)[number]) => `${c.authors}, ${c.journal}, ${c.year}`;
    expect(screen.getByText(attr(HUB_CITATIONS[0]))).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /previous citation/i }));
    expect(screen.getByText(attr(HUB_CITATIONS[2]))).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next citation/i }));
    expect(screen.getByText(attr(HUB_CITATIONS[0]))).toBeInTheDocument();
  });

  it("every carousel citation states its limit and offers a PubMed link", () => {
    renderPage(<RitualJournal />);
    for (const c of HUB_CITATIONS) {
      expect(screen.getByText(c.limit, { exact: false })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(`PMID ${c.pmid}`) })).toHaveAttribute(
        "href",
        `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`,
      );
      fireEvent.click(screen.getByRole("button", { name: /next citation/i }));
    }
  });

  it("does not ship the unverified audience stat", () => {
    renderPage(<RitualJournal />);
    expect(screen.queryByText(/21,000/)).not.toBeInTheDocument();
  });
});

describe("ClinicalIssue (/editorial/clinical-issue)", () => {
  it("renders cover, spec rows, three cited papers, and newsletter", () => {
    renderPage(<ClinicalIssue />);
    expect(screen.getByText("The skin is an electrical organ.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the studies/i })).toHaveAttribute(
      "href",
      "/science",
    );
    for (const c of HUB_CITATIONS) {
      expect(screen.getByText(`${c.authors}, ${c.journal}, ${c.year}`)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: new RegExp(`PMID ${c.pmid}`) })).toHaveAttribute(
        "href",
        `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`,
      );
    }
    expect(screen.getByText("Every claim carries a PMID")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the reading list/i }),
    ).toBeInTheDocument();
  });
});

/**
 * The truth contract. These pages exist to be checkable. A citation without a limit
 * is marketing wearing a lab coat, so the limit is not optional — it is the product.
 */
describe("evidence integrity", () => {
  it("no citation ships without a PMID, a design line, and a stated limit", () => {
    for (const c of HUB_CITATIONS) {
      expect(c.pmid).toMatch(/^\d+$/);
      expect(c.design.length).toBeGreaterThan(10);
      expect(c.limit.length).toBeGreaterThan(20);
    }
  });

  it("no fabricated personas survive anywhere in the hub data", () => {
    const serialised = JSON.stringify(HUB_CITATIONS) + JSON.stringify(HUB_ARTICLES);
    for (const ghost of ["Amara Osei", "Elena Vasquez", "Maren Holt"]) {
      expect(serialised).not.toContain(ghost);
    }
  });
});
