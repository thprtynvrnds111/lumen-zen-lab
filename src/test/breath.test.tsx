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

  describe("tone glide", () => {
    /** Minimal AudioContext double: enough surface for the tone-glide graph. */
    function mockAudioContext() {
      const param = () => ({
        value: 0,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
      });
      const oscillators: ReturnType<typeof makeOsc>[] = [];
      function makeOsc() {
        return {
          type: "sine",
          frequency: param(),
          start: vi.fn(),
          stop: vi.fn(),
          connect: vi.fn(),
          disconnect: vi.fn(),
        };
      }
      const ctor = vi.fn().mockImplementation(() => ({
        state: "running",
        currentTime: 0,
        resume: vi.fn(),
        createOscillator: vi.fn().mockImplementation(() => {
          const o = makeOsc();
          oscillators.push(o);
          return o;
        }),
        createGain: vi.fn().mockImplementation(() => ({
          gain: param(),
          connect: vi.fn(),
          disconnect: vi.fn(),
        })),
        destination: {},
      }));
      (window as unknown as { AudioContext: unknown }).AudioContext = ctor;
      return { ctor, oscillators };
    }

    afterEach(() => {
      delete (window as unknown as { AudioContext?: unknown }).AudioContext;
    });

    it("starting a session with tone OFF never constructs an AudioContext", async () => {
      const { ctor } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("5 MIN")[0]);
      await settle(700);
      await settle(900); // past the 800ms first-phase timer
      expect(ctor).not.toHaveBeenCalled();
    });

    it("session + toggle tone ON creates the graph and ramps frequency on the next phase", async () => {
      const { ctor, oscillators } = mockAudioContext();
      renderBreath();
      // Tone toggle only renders on the home screen — enable it before starting.
      fireEvent.click(screen.getByRole("button", { name: /TONE/ }));
      fireEvent.click(screen.getAllByText("5 MIN")[0]);
      await settle(700);
      await settle(900); // past the 800ms first-phase timer — runPhase(0) fires

      expect(ctor).toHaveBeenCalledTimes(1);
      expect(oscillators).toHaveLength(1);
      expect(oscillators[0].frequency.linearRampToValueAtTime).toHaveBeenCalled();
    });
  });
});
