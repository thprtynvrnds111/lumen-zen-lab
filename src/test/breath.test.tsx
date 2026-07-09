import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Breath from "@/pages/breath/Breath";

function renderBreath() {
  return render(
    <HelmetProvider>
      <Breath />
    </HelmetProvider>,
  );
}

/** Advance past a fade transition (fades are 650–780ms in the engine). */
async function settle(ms: number) {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers();
});

afterEach(async () => {
  // Flush any session timers still pending (tick / phase) inside act so their
  // state updates don't warn, then hand back real timers.
  await act(async () => {
    vi.runOnlyPendingTimers();
  });
  vi.useRealTimers();
});

describe("Breath", () => {
  it("home renders the heading, three acts, and nine duration chips", () => {
    renderBreath();
    expect(screen.getByRole("heading", { name: "The Breath" })).toBeInTheDocument();
    expect(screen.getByText("Meditate")).toBeInTheDocument();
    expect(screen.getByText("Restore")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    // meditate 5/10/20 · restore 5/10/20 · reset 2/3/5 = 9 chips
    expect(screen.getAllByText(/^\d+ MIN$/)).toHaveLength(9);
  });

  it("nav to Ledger shows the empty-state line", async () => {
    renderBreath();
    fireEvent.click(screen.getByRole("button", { name: "LEDGER" }));
    await settle(700); // goScreen fade = 650ms
    expect(screen.getByText("The record begins with the first breath.")).toBeInTheDocument();
  });

  it("starting a 5 MIN Meditate shows the session screen with OBSERVE and 5:00", async () => {
    renderBreath();
    // First "5 MIN" chip is under Meditate (Observe is act 01).
    fireEvent.click(screen.getAllByText("5 MIN")[0]);
    await settle(700); // startSession fade = 680ms; < 800ms so no phase/tick yet
    expect(screen.getByText("OBSERVE")).toBeInTheDocument();
    expect(screen.getByText("5:00")).toBeInTheDocument();
  });

  it("a seeded ledger renders the continuity row and the entry name", async () => {
    localStorage.setItem(
      "zb_ledger",
      JSON.stringify([{ t: Date.now(), mode: "meditate", secs: 300, breaths: 12, completed: true }]),
    );
    renderBreath();
    fireEvent.click(screen.getByRole("button", { name: "LEDGER" }));
    await settle(700);
    expect(screen.getByText(/CONTINUITY/)).toBeInTheDocument();
    expect(screen.getByText("Meditate")).toBeInTheDocument();
  });
});
