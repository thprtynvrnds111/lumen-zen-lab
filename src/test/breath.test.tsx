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

  it("TONE cue reads ON for a fresh visitor", () => {
    renderBreath();
    expect(screen.getByRole("button", { name: "TONE · ON" })).toBeInTheDocument();
  });

  it("a saved zb_cues tone:false loads as OFF", () => {
    localStorage.setItem("zb_cues", JSON.stringify({ tone: false, pulse: false }));
    renderBreath();
    expect(screen.getByRole("button", { name: "TONE · OFF" })).toBeInTheDocument();
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
      const gains: ReturnType<typeof makeGain>[] = [];
      function makeOsc() {
        return {
          type: "sine",
          frequency: param(),
          detune: param(),
          start: vi.fn(),
          stop: vi.fn(),
          connect: vi.fn(),
          disconnect: vi.fn(),
        };
      }
      function makeGain() {
        return { gain: param(), connect: vi.fn(), disconnect: vi.fn() };
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
        createGain: vi.fn().mockImplementation(() => {
          const g = makeGain();
          gains.push(g);
          return g;
        }),
        destination: {},
      }));
      (window as unknown as { AudioContext: unknown }).AudioContext = ctor;
      return { ctor, oscillators, gains };
    }

    afterEach(() => {
      delete (window as unknown as { AudioContext?: unknown }).AudioContext;
    });

    it("a saved tone:false preference: session never constructs an AudioContext", async () => {
      localStorage.setItem("zb_cues", JSON.stringify({ tone: false, pulse: false }));
      const { ctor } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("5 MIN")[0]);
      await settle(700);
      await settle(900); // past the 800ms first-phase timer
      expect(ctor).not.toHaveBeenCalled();
    });

    it("fresh visitor: session auto-creates the audio graph on the first phase", async () => {
      const { ctor } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("5 MIN")[0]); // no toggle click — default ON
      await settle(700);
      await settle(900); // runPhase(0) fires
      expect(ctor).toHaveBeenCalledTimes(1);
    });

    it("meditate session builds a 3-oscillator 528 Hz drone (two detuned + octave-down sub)", async () => {
      const { oscillators } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("5 MIN")[0]); // meditate
      await settle(700);
      await settle(900);
      expect(oscillators).toHaveLength(3);
      const freqs = oscillators.map((o) => o.frequency.setValueAtTime.mock.calls[0][0]);
      expect(freqs).toEqual([528, 528, 264]);
      expect(oscillators[0].detune.setValueAtTime.mock.calls[0][0]).toBe(2);
      expect(oscillators[1].detune.setValueAtTime.mock.calls[0][0]).toBe(-2);
    });

    it("reset session drones at 396 Hz", async () => {
      const { oscillators } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("2 MIN")[0]); // reset chip
      await settle(700);
      await settle(900);
      expect(oscillators.map((o) => o.frequency.setValueAtTime.mock.calls[0][0])).toEqual([396, 396, 198]);
    });

    it("phase changes ramp gain, never frequency", async () => {
      const { oscillators, gains } = mockAudioContext();
      renderBreath();
      fireEvent.click(screen.getAllByText("5 MIN")[0]);
      await settle(700);
      await settle(900); // phase 0 — graph created + first ramp
      for (const o of oscillators) {
        expect(o.frequency.linearRampToValueAtTime).not.toHaveBeenCalled();
      }
      expect(gains.some((g) => g.gain.linearRampToValueAtTime.mock.calls.length > 0)).toBe(true);
    });
  });
});
