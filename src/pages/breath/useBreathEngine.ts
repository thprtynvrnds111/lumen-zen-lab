/**
 * Zential Breath — engine.
 * The DCLogic class from the design source, ported to a React hook.
 * State is held in a ref (mirrors `this.state`, always current for timer
 * callbacks) and mirrored into React via a force-render, so every method reads
 * live values exactly as the class did. Timers live in refs and are cleared on
 * unmount; the wake lock is released on unmount.
 *
 * Design props folded to constants (per task brief):
 *   eveningRestore = false, breathCounting = true, grain = true.
 * All localStorage / navigator / AudioContext access is inside effects or event
 * handlers — never during render — so the initial (home, empty log) render is
 * SSR-stable for prerender.
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  chipMins,
  modeNames,
  patterns,
  protocolDefs,
  type BreathMode,
  type ProtocolDef,
} from "./breathData";

const EVENING_RESTORE = false;
const BREATH_COUNTING = true;
const GRAIN = true;

const LEDGER_KEY = "zb_ledger";
const RING_LEN = 741.4;

type Screen =
  | "home"
  | "protocols"
  | "system"
  | "ledger"
  | "interlude"
  | "session"
  | "credits";

interface LedgerEntry {
  t: number;
  mode: BreathMode;
  secs: number;
  breaths: number;
  completed: boolean;
}

interface EngineState {
  screen: Screen;
  fadeOut: boolean;
  mode: BreathMode | null;
  phaseLabel: string;
  orbScale: number;
  phaseDur: number;
  frac: number;
  remaining: number;
  total: number;
  breaths: number;
  count: number;
  completed: boolean;
  toneOn: boolean;
  pulseOn: boolean;
  protocol: ProtocolDef | null;
  protoIdx: number;
  accSecs: number;
  accBreaths: number;
  sessionEvening: boolean;
  log: LedgerEntry[];
}

const INITIAL: EngineState = {
  screen: "home",
  fadeOut: false,
  mode: null,
  phaseLabel: "",
  orbScale: 0.62,
  phaseDur: 0.01,
  frac: 0,
  remaining: 0,
  total: 0,
  breaths: 0,
  count: 0,
  completed: false,
  toneOn: false,
  pulseOn: false,
  protocol: null,
  protoIdx: 0,
  accSecs: 0,
  accBreaths: 0,
  sessionEvening: false,
  log: [],
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

type Patch = Partial<EngineState> | ((s: EngineState) => Partial<EngineState>);

export function useBreathEngine() {
  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  const stateRef = useRef<EngineState>(INITIAL);
  const mountedRef = useRef(true);

  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockRef = useRef<{ release: () => void } | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const setState = useCallback((patch: Patch) => {
    const prev = stateRef.current;
    const next = typeof patch === "function" ? patch(prev) : patch;
    stateRef.current = { ...prev, ...next };
    if (mountedRef.current) forceRender();
  }, []);

  const clearTimers = useCallback(() => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (tickTimer.current) clearInterval(tickTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    if (autoTimer.current) clearTimeout(autoTimer.current);
  }, []);

  const lock = useCallback(async () => {
    try {
      const wl = (navigator as unknown as { wakeLock?: { request: (t: string) => Promise<{ release: () => void }> } }).wakeLock;
      if (wl) lockRef.current = await wl.request("screen");
    } catch {
      /* wake lock unsupported — ignore */
    }
  }, []);

  const releaseLock = useCallback(() => {
    try {
      if (lockRef.current) {
        lockRef.current.release();
        lockRef.current = null;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const playTone = useCallback(() => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = audioRef.current || (audioRef.current = new Ctx());
      if (ctx.state === "suspended") ctx.resume();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 108;
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 2.5);
    } catch {
      /* audio unsupported — ignore */
    }
  }, []);

  // NOTE: the engine methods below are recreated each render but only ever read
  // refs (stateRef, timer refs), so callbacks captured by timers always see live
  // state — matching the class's `this.state` semantics.

  const runPhase = useCallback((i: number) => {
    const st = stateRef.current;
    const pat = patterns(st.mode as BreathMode, st.sessionEvening);
    const p = pat[i % pat.length];
    if (i > 0 && i % pat.length === 0) {
      setState((s) => ({ breaths: s.breaths + 1, count: s.count >= 10 ? 1 : s.count + 1 }));
    } else if (i === 0) {
      setState({ count: 1 });
    }
    setState({ phaseLabel: p.l, orbScale: p.s, phaseDur: p.d, frac: p.f });
    if (stateRef.current.pulseOn && navigator.vibrate) {
      try {
        navigator.vibrate(18);
      } catch {
        /* ignore */
      }
    }
    if (stateRef.current.toneOn && p.l.indexOf("EXHALE") === 0) playTone();
    phaseTimer.current = setTimeout(() => runPhase(i + 1), p.d * 1000);
  }, [setState, playTone]);

  const tick = useCallback(() => {
    const r = stateRef.current.remaining - 1;
    if (r <= 0) {
      finish(true);
      return;
    }
    setState({ remaining: r });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setState]);

  const startSession = useCallback(
    (mode: BreathMode, minutes: number, evening?: boolean) => {
      clearTimers();
      setState({ fadeOut: true });
      fadeTimer.current = setTimeout(() => {
        const startScale = mode === "meditate" ? 0.66 : mode === "restore" ? 0.62 : 0.58;
        setState({
          screen: "session",
          mode,
          sessionEvening: evening ?? EVENING_RESTORE,
          total: minutes * 60,
          remaining: minutes * 60,
          breaths: 0,
          count: 0,
          completed: false,
          orbScale: startScale,
          phaseDur: 0.01,
          phaseLabel: "",
          frac: 0,
          fadeOut: false,
        });
        lock();
        tickTimer.current = setInterval(() => tick(), 1000);
        phaseTimer.current = setTimeout(() => runPhase(0), 800);
      }, 680);
    },
    [clearTimers, setState, lock, tick, runPhase],
  );

  const toCredits = useCallback(
    (completed: boolean) => {
      clearTimers();
      releaseLock();
      setState({ completed, fadeOut: true });
      fadeTimer.current = setTimeout(() => {
        setState({ screen: "credits", fadeOut: false });
      }, 780);
    },
    [clearTimers, releaseLock, setState],
  );

  const beginNext = useCallback(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    const st = stateRef.current;
    if (!st.protocol) return;
    const seg = st.protocol.seq[st.protoIdx];
    startSession(seg.mode, seg.mins, seg.evening);
  }, [startSession]);

  function finish(completed: boolean) {
    clearTimers();
    releaseLock();
    const st = stateRef.current;
    const elapsed = Math.max(0, st.total - st.remaining);
    if (elapsed >= 30) {
      const entry: LedgerEntry = {
        t: Date.now(),
        mode: st.mode as BreathMode,
        secs: elapsed,
        breaths: st.breaths,
        completed,
      };
      const log = [...st.log, entry];
      setState({ log });
      try {
        localStorage.setItem(LEDGER_KEY, JSON.stringify(log));
      } catch {
        /* ignore */
      }
    }
    const accSecs = st.accSecs + elapsed;
    const accBreaths = st.accBreaths + st.breaths;
    if (st.protocol && completed && st.protoIdx < st.protocol.seq.length - 1) {
      setState({ accSecs, accBreaths, protoIdx: st.protoIdx + 1, fadeOut: true });
      fadeTimer.current = setTimeout(() => {
        setState({ screen: "interlude", fadeOut: false });
        autoTimer.current = setTimeout(() => beginNext(), 6000);
      }, 780);
      return;
    }
    setState({ accSecs, accBreaths });
    toCredits(completed);
  }

  const startProtocol = useCallback(
    (p: ProtocolDef) => {
      setState({ protocol: p, protoIdx: 0, accSecs: 0, accBreaths: 0 });
      const seg = p.seq[0];
      startSession(seg.mode, seg.mins, seg.evening);
    },
    [setState, startSession],
  );

  const goScreen = useCallback(
    (name: Screen) => {
      clearTimers();
      setState({ fadeOut: true });
      fadeTimer.current = setTimeout(() => {
        setState({
          screen: name,
          mode: null,
          protocol: null,
          protoIdx: 0,
          accSecs: 0,
          accBreaths: 0,
          fadeOut: false,
        });
      }, 650);
    },
    [clearTimers, setState],
  );

  const goHome = useCallback(() => goScreen("home"), [goScreen]);

  // Load saved ledger — client-only (SSR renders the empty-log state).
  useEffect(() => {
    mountedRef.current = true;
    try {
      const raw = localStorage.getItem(LEDGER_KEY);
      if (raw) setState({ log: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    return () => {
      mountedRef.current = false;
      clearTimers();
      releaseLock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── renderVals — derived bindings, recomputed each render ──────────────────
  const st = stateRef.current;
  const evening = EVENING_RESTORE;
  const counting = BREATH_COUNTING;

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  };

  const mk = (key: BreathMode, mins: number) => ({
    label: mins + " MIN",
    start: () => startSession(key, mins),
  });
  const medChips = chipMins.meditate.map((m) => mk("meditate", m));
  const resChips = chipMins.restore.map((m) => mk("restore", m));
  const rstChips = chipMins.reset.map((m) => mk("reset", m));
  const resDesc = evening
    ? "A four second inhale, a six second exhale. The evening variant. Synchronize with the wave."
    : "A 5.5 second inhale, a 5.5 second exhale. 0.09 Hz — the resonance rate.";

  const isRestore = st.screen === "session" && st.mode === "restore";
  const sessEvening = st.sessionEvening;

  const proto = st.protocol;
  const elapsed = st.total - st.remaining;
  const elapsedMin = Math.max(1, Math.round(elapsed / 60));
  const specs: { k: string; v: string }[] = [];
  let creditsMode = (st.mode && modeNames[st.mode]) || "";
  let creditsKicker = "PRACTICE COMPLETE";
  if (proto) {
    creditsMode = proto.name;
    creditsKicker = "PROTOCOL COMPLETE";
    const accMin = Math.max(1, Math.round(st.accSecs / 60));
    specs.push({ k: "RUNTIME", v: st.completed ? accMin + " MINUTES COMPLETE" : accMin + (accMin === 1 ? " MINUTE" : " MINUTES") });
    specs.push({ k: "SEQUENCE", v: proto.seq.map((g) => modeNames[g.mode].toUpperCase() + " " + g.mins).join(" · ") });
    specs.push({ k: "BREATHS", v: String(st.accBreaths) });
  } else {
    specs.push({ k: "RUNTIME", v: st.completed ? st.total / 60 + " MINUTES COMPLETE" : elapsedMin + (elapsedMin === 1 ? " MINUTE" : " MINUTES") });
    if (st.mode === "restore") specs.push({ k: "FREQUENCY", v: "0.09 HZ" });
    specs.push({ k: "BREATHS", v: String(st.breaths) });
  }
  specs.push({ k: "CHANNEL", v: "THE BREATH, FROM WITHIN" });

  const protocols = protocolDefs().map((p) => ({
    role: p.role,
    num: p.num,
    name: p.name,
    desc: p.desc,
    seqText: p.seq.map((g) => modeNames[g.mode].toUpperCase() + " " + g.mins).join(" · "),
    totalText: p.seq.reduce((a, g) => a + g.mins, 0) + " MIN TOTAL",
    begin: () => startProtocol(p),
  }));

  const tabs: [string, Screen][] = [
    ["PRACTICE", "home"],
    ["PROTOCOLS", "protocols"],
    ["SYSTEM", "system"],
    ["LEDGER", "ledger"],
  ];
  const navItems = tabs.map(([label, key]) => ({
    label,
    go: () => {
      if (stateRef.current.screen !== key) goScreen(key);
    },
    color: st.screen === key ? "var(--ed-on-dark)" : "rgba(247,244,240,0.35)",
  }));

  const log = st.log || [];
  const ledger = [...log]
    .reverse()
    .slice(0, 14)
    .map((e) => {
      const d = new Date(e.t);
      const mins = Math.max(1, Math.round(e.secs / 60));
      return {
        date: MONTHS[d.getMonth()] + " " + String(d.getDate()).padStart(2, "0"),
        name: modeNames[e.mode] || "Practice",
        spec: mins + " MIN · " + e.breaths + " BR",
      };
    });
  const dayKeys = new Set(log.map((e) => new Date(e.t).toDateString()));
  let cont = 0;
  {
    const d = new Date();
    if (!dayKeys.has(d.toDateString())) d.setDate(d.getDate() - 1);
    while (dayKeys.has(d.toDateString())) {
      cont++;
      d.setDate(d.getDate() - 1);
    }
  }
  const weekAgo = Date.now() - 7 * 86400000;
  const weekMin = Math.round(log.filter((e) => e.t >= weekAgo).reduce((a, e) => a + e.secs, 0) / 60);

  const nextSeg = proto ? proto.seq[st.protoIdx] : null;

  return {
    isHome: st.screen === "home",
    isSession: st.screen === "session",
    isCredits: st.screen === "credits",
    isProtocols: st.screen === "protocols",
    isSystem: st.screen === "system",
    isLedger: st.screen === "ledger",
    isInterlude: st.screen === "interlude",
    showNav: ["home", "protocols", "system", "ledger"].indexOf(st.screen) >= 0,
    navItems,
    protocols,
    goPractice: () => goScreen("home"),
    inProtocol: !!proto && st.screen === "session",
    protoTag: proto ? proto.name.toUpperCase() + " · " + (st.protoIdx + 1) + " / " + proto.seq.length : "",
    protoNameCaps: proto ? proto.name.toUpperCase() : "",
    nextName: nextSeg ? modeNames[nextSeg.mode] : "",
    nextSpec: nextSeg ? nextSeg.mins + " MINUTES" + (nextSeg.evening ? " · EVENING VARIANT" : "") : "",
    beginNext: () => beginNext(),
    hasLog: log.length > 0,
    noLog: log.length === 0,
    continuityText: cont + (cont === 1 ? " DAY" : " DAYS"),
    weekText: weekMin + (weekMin === 1 ? " MINUTE" : " MINUTES"),
    sessionCount: String(log.length),
    ledger,
    creditsKicker,
    rootOpacity: st.fadeOut ? 0 : 1,
    grainOn: GRAIN,
    medChips,
    resChips,
    rstChips,
    resDesc,
    phaseWord: st.mode === "meditate" ? "OBSERVE" : st.phaseLabel,
    orbScale: st.orbScale,
    phaseDur: st.phaseDur,
    remainingText: fmt(Math.max(0, st.remaining)),
    isRestore,
    terraWash: isRestore && sessEvening,
    ambientRGBA: isRestore && sessEvening ? "rgba(155,90,46,0.16)" : "rgba(46,216,168,0.13)",
    ambientScale: 0.72 + 0.88 * st.frac,
    ambientOpacity: 0.35 + 0.65 * st.frac,
    ringOffset: RING_LEN * (1 - st.frac),
    waveDur: sessEvening ? 10 : 11,
    showCounter: st.screen === "session" && st.mode === "meditate" && counting && st.count > 0,
    countText: String(st.count),
    creditsMode,
    specs,
    endEarly: () => {
      if (stateRef.current.screen === "interlude") toCredits(false);
      else finish(false);
    },
    returnHome: () => goHome(),
    toggleTone: () => setState((s) => ({ toneOn: !s.toneOn })),
    togglePulse: () => setState((s) => ({ pulseOn: !s.pulseOn })),
    toneState: st.toneOn ? "ON" : "OFF",
    pulseState: st.pulseOn ? "ON" : "OFF",
    toneColor: st.toneOn ? "var(--ed-teal)" : "rgba(247,244,240,0.35)",
    pulseColor: st.pulseOn ? "var(--ed-teal)" : "rgba(247,244,240,0.35)",
  };
}
