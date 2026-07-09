import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RitualJournal from "@/pages/editorial/hub/RitualJournal";
import ClinicalIssue from "@/pages/editorial/hub/ClinicalIssue";
import { HUB_ARTICLES, HUB_EXPERTS } from "@/pages/editorial/hub/hubData";

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

  it("quote carousel wraps in both directions", () => {
    renderPage(<RitualJournal />);
    expect(screen.getByText(HUB_EXPERTS[0].name)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /previous quote/i }));
    expect(screen.getByText(HUB_EXPERTS[2].name)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /next quote/i }));
    expect(screen.getByText(HUB_EXPERTS[0].name)).toBeInTheDocument();
  });

  it("does not ship the unverified audience stat", () => {
    renderPage(<RitualJournal />);
    expect(screen.queryByText(/21,000/)).not.toBeInTheDocument();
  });
});

describe("ClinicalIssue (/editorial/clinical-issue)", () => {
  it("renders cover, spec rows, three clinicians, and newsletter", () => {
    renderPage(<ClinicalIssue />);
    expect(screen.getByText("The skin is an electrical organ.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the studies/i })).toHaveAttribute(
      "href",
      "/science",
    );
    for (const ex of HUB_EXPERTS) {
      expect(screen.getByText(ex.name)).toBeInTheDocument();
    }
    expect(screen.getByText("Statements, not endorsements")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the reading list/i }),
    ).toBeInTheDocument();
  });
});
