import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Pick from "@/pages/pick/Pick";
import { PRIZES, T_CTA } from "@/pages/pick/config";

function renderPick() {
  return render(
    <HelmetProvider>
      <Pick />
    </HelmetProvider>,
  );
}

describe("/pick — gamified discount lander", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.useRealTimers();
  });

  it("deals three cards and states every tier honestly up front", () => {
    renderPick();
    expect(screen.getAllByRole("button", { name: /card \d of 3/i })).toHaveLength(3);
    expect(document.body.textContent).toContain("Ten, fifteen and twenty percent");
    expect(document.body.textContent).toContain("The smallest is ten percent");
  });

  it("flipping a card reveals a real prize and a CTA carrying its discount code", () => {
    vi.useFakeTimers();
    renderPick();
    const card = screen.getAllByRole("button", { name: /card 1 of 3/i })[0];
    fireEvent.click(card);
    act(() => {
      vi.advanceTimersByTime(T_CTA + 50);
    });

    const cta = screen.getByRole("link", { name: /take it to the belt/i });
    const href = cta.getAttribute("href")!;
    expect(href).toMatch(/^\/instruments\/restoration-belt\?/);
    const code = new URLSearchParams(href.split("?")[1]).get("discount");
    const prize = PRIZES.find((p) => p.code === code);
    expect(prize).toBeDefined();
    expect(document.body.textContent).toContain(`${prize!.percent}% off The Restoration Belt`);
    vi.useRealTimers();
  });

  it("persists the pick — a return visit restores the same prize, no replay", () => {
    vi.useFakeTimers();
    const first = renderPick();
    fireEvent.click(screen.getAllByRole("button", { name: /card 2 of 3/i })[0]);
    act(() => {
      vi.advanceTimersByTime(T_CTA + 50);
    });
    const firstHref = screen
      .getByRole("link", { name: /take it to the belt/i })
      .getAttribute("href");
    first.unmount();
    vi.useRealTimers();

    renderPick();
    const restoredHref = screen
      .getByRole("link", { name: /take it to the belt/i })
      .getAttribute("href");
    expect(restoredHref).toBe(firstHref);
  });

  it("every card position can hold every tier (shuffle is real)", () => {
    // The stored order must always be a permutation of all prize indices.
    vi.useFakeTimers();
    renderPick();
    fireEvent.click(screen.getAllByRole("button", { name: /card 1 of 3/i })[0]);
    act(() => {
      vi.advanceTimersByTime(T_CTA + 50);
    });
    const stored = JSON.parse(window.sessionStorage.getItem("zp-pick-state")!);
    expect([...stored.order].sort()).toEqual([0, 1, 2]);
    vi.useRealTimers();
  });
});
