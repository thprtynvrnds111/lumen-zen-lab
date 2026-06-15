/**
 * Global movement stats via Supabase (the Zential Tracker project).
 *
 * Logs anonymous reset completions and reads collective counts (today / week /
 * total) for the Founding Wall. Uses the publishable anon key directly from the
 * client (safe to expose); RLS allows anonymous inserts only, and counts come from
 * a security-definer RPC so no rows are ever exposed. Every call is best-effort and
 * never blocks the UI.
 */

const SUPA_URL = "https://bvlznzgyghpghwtnjmuh.supabase.co";
const SUPA_ANON = "sb_publishable_lAS1unClQrAOXLSVFEPbdw_oaQlmvYS";

const HEADERS = {
  apikey: SUPA_ANON,
  Authorization: `Bearer ${SUPA_ANON}`,
  "Content-Type": "application/json",
};

export interface MovementStats {
  today: number;
  week: number;
  total: number;
}

/** Record one anonymous reset completion. Fire-and-forget. */
export function logResetRemote(source = "reset"): void {
  if (typeof window === "undefined") return;
  try {
    fetch(`${SUPA_URL}/rest/v1/movement_resets`, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=minimal" },
      keepalive: true,
      body: JSON.stringify([{ source }]),
    }).catch(() => { /* swallow */ });
  } catch { /* no-op */ }
}

/** Collective reset counts for the wall. Returns null if unavailable. */
export async function fetchMovementStats(): Promise<MovementStats | null> {
  if (typeof window === "undefined") return null;
  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/rpc/movement_stats`, {
      method: "POST",
      headers: HEADERS,
      body: "{}",
    });
    if (!r.ok) return null;
    const d = await r.json();
    if (!d || typeof d.total !== "number") return null;
    return { today: d.today ?? 0, week: d.week ?? 0, total: d.total ?? 0 };
  } catch {
    return null;
  }
}
