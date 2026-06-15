/**
 * Movement practice state — the daily-use layer of the Truth Movement.
 *
 * Local-first (localStorage), zero-auth, durable enough to make the ritual a habit
 * product: streaks, reset logging, and the referral mechanic. Best-effort server
 * mirroring is layered on top elsewhere; nothing here blocks the UI.
 */

const KEY = "zp_movement_v1";
const REF_KEY = "zp_movement_ref";
const DAY_MS = 86400 * 1000;

export interface PracticeState {
  /** ISO dates (YYYY-MM-DD) on which a reset was completed. */
  days: string[];
  /** Total resets ever completed (counts multiple per day). */
  total: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function todayISO(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function read(): PracticeState {
  if (!isBrowser()) return { days: [], total: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { days: [], total: 0 };
    const parsed = JSON.parse(raw) as PracticeState;
    return { days: Array.isArray(parsed.days) ? parsed.days : [], total: parsed.total ?? 0 };
  } catch {
    return { days: [], total: 0 };
  }
}

function write(state: PracticeState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch { /* quota / private mode — degrade silently */ }
}

/** Mark a reset complete for today. Idempotent per day for the day-set; bumps total. */
export function logReset(): PracticeState {
  const state = read();
  const t = todayISO();
  if (!state.days.includes(t)) state.days.push(t);
  state.total += 1;
  write(state);
  return state;
}

export function getPractice(): PracticeState {
  return read();
}

/** Consecutive-day streak counting back from today (or yesterday if today not yet done). */
export function currentStreak(state: PracticeState = read()): number {
  const set = new Set(state.days);
  let streak = 0;
  const start = new Date();
  // Allow the streak to be "alive" if today is not yet logged but yesterday was.
  if (!set.has(todayISO(start))) start.setTime(start.getTime() - DAY_MS);
  for (let cur = new Date(start); ; cur.setTime(cur.getTime() - DAY_MS)) {
    if (set.has(todayISO(cur))) streak += 1;
    else break;
  }
  return streak;
}

export function doneToday(state: PracticeState = read()): boolean {
  return state.days.includes(todayISO());
}

/** Last `n` days as [{ date, done }], oldest first — for the dot calendar. */
export function lastDays(n = 7, state: PracticeState = read()): { date: string; done: boolean }[] {
  const set = new Set(state.days);
  const out: { date: string; done: boolean }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = todayISO(new Date(Date.now() - i * DAY_MS));
    out.push({ date: d, done: set.has(d) });
  }
  return out;
}

// ── Referral mechanic ─────────────────────────────────────────────────────────

/** Capture a ?ref= code on landing and persist it (first-touch wins). Call once on mount. */
export function captureRef(): void {
  if (!isBrowser()) return;
  try {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref && !window.localStorage.getItem(REF_KEY)) {
      window.localStorage.setItem(REF_KEY, ref.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40));
    }
  } catch { /* no-op */ }
}

export function getRef(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
}

/** A stable, shareable referral code for this member (anonymous, local). */
export function myReferralCode(): string {
  if (!isBrowser()) return "founding";
  try {
    let code = window.localStorage.getItem(REF_KEY + "_self");
    if (!code) {
      code = "f" + Math.random().toString(36).slice(2, 8);
      window.localStorage.setItem(REF_KEY + "_self", code);
    }
    return code;
  } catch {
    return "founding";
  }
}

export function myShareUrl(): string {
  const origin = isBrowser() ? window.location.origin : "https://zentialpure.com";
  return `${origin}/movement?ref=${myReferralCode()}`;
}
