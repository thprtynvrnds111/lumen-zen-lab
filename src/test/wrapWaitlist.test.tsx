import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Wrap from "@/pages/Wrap";

/**
 * Guard: the /wrap waitlist test page must keep the promises printed on it.
 *
 * The page is a zero-inventory demand test for a PROPOSED product. Its copy
 * promises: no checkout, no payment, no newsletter, at most two emails. Those
 * promises are only true if (a) the form tags signups as a waitlist, not a
 * newsletter, and (b) the API treats that source specially. Both halves are
 * pinned here because both fail silently — a wrong `source` string would
 * quietly route waitlist members into the lead-magnet flow.
 */

const renderWrap = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/wrap"]}>
        <Wrap />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("/wrap waitlist page", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("declares the product as proposed with no checkout path", () => {
    renderWrap();
    expect(screen.getAllByText(/Proposed product — not in the catalog/i).length).toBeGreaterThan(0);
    // A waitlist page must never link into checkout or cart.
    const html = document.body.innerHTML;
    expect(html).not.toMatch(/checkout\.zentialpure\.com/i);
    expect(html).not.toMatch(/\/cart\//i);
  });

  it("posts the waitlist signup with source wrap-waitlist", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    renderWrap();
    const inputs = screen.getAllByPlaceholderText("your@email.com");
    fireEvent.change(inputs[0], { target: { value: "tester@example.com" } });
    fireEvent.submit(inputs[0].closest("form")!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/newsletter");
    expect(JSON.parse(opts.body)).toEqual({
      email: "tester@example.com",
      source: "wrap-waitlist",
    });
  });

  it("shows the two-emails-maximum confirmation after joining", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    renderWrap();
    const inputs = screen.getAllByPlaceholderText("your@email.com");
    fireEvent.change(inputs[0], { target: { value: "tester@example.com" } });
    fireEvent.submit(inputs[0].closest("form")!);
    await waitFor(() =>
      expect(screen.getByText(/You are on the list/i)).toBeTruthy()
    );
  });
});

describe("api/newsletter.ts wrap-waitlist branch", () => {
  // The handler is a Vercel serverless function; like the repo's other content
  // gates, we pin its source. If someone refactors away the wrap branch, these
  // fail before the promise on the page silently breaks.
  const src = readFileSync(resolve(__dirname, "../../api/newsletter.ts"), "utf8");

  it("branches on the wrap-waitlist source", () => {
    expect(src).toMatch(/source === 'wrap-waitlist'/);
  });

  it("gives waitlist members the bare wrap-waitlist tag, never the newsletter tag", () => {
    expect(src).toMatch(/isWrapWaitlist\s*\?\s*'wrap-waitlist'/);
  });

  it("fires a dedicated metric so the lead-magnet flow never triggers", () => {
    expect(src).toMatch(/Joined Wrap Waitlist/);
    // The face-protocol metric must be conditional, not unconditional.
    expect(src).toMatch(/isWrapWaitlist \? 'Joined Wrap Waitlist' : 'Requested Face Protocol'/);
  });

  it("never sets marketing consent for waitlist joins", () => {
    // Both customer payloads (create + update) must gate consent on the branch.
    const consentBlocks = src.split("email_marketing_consent").length - 1;
    const gatedBlocks = src.split("...(isWrapWaitlist").length - 1;
    expect(consentBlocks).toBe(gatedBlocks);
  });
});
