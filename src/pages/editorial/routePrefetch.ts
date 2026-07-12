/**
 * Route chunk prefetch for the Journal board.
 *
 * Every destination a card links to is a `lazy()` route in App.tsx, so a click
 * normally costs a network round-trip for the chunk BEFORE React can render the
 * page — the board felt fast, the buttons did not. We warm the chunk on intent
 * (pointer-enter / focus / touch-start), which is 100–300ms of head start, and
 * warm the rest during idle time after the board has settled.
 *
 * The import specifiers must match App.tsx exactly, or Vite emits a second chunk
 * and the prefetch warms something the router never asks for.
 */

type Loader = () => Promise<unknown>;

const LOADERS: Record<string, Loader> = {
  "/breath": () => import("@/pages/breath/Breath"),
  "/editorial/the-ritual": () => import("@/pages/editorial/TheRitual"),
  "/editorial/the-science": () => import("@/pages/editorial/TheScience"),
  "/editorial/the-diagnosis": () => import("@/pages/editorial/TheDiagnosis"),
  "/journal/frequency-shift": () => import("@/pages/JournalArticle"),
  "/journal/microcurrent-collagen": () => import("@/pages/JournalScience"),
  "/journal/evening-protocol": () => import("@/pages/JournalRitual"),
  "/journal/red-light-clinical": () => import("@/pages/JournalRedLight"),
  "/journal/lymphatic-drainage": () => import("@/pages/JournalLymphatic"),
  "/journal/ems-vs-microcurrent": () => import("@/pages/JournalEMS"),
  "/journal/ritual-that-lasts": () => import("@/pages/JournalRitualLasts"),
};

const warmed = new Set<string>();

/** Fetch a route's chunk once. Safe to call on every pointer event. */
export function prefetchRoute(path: string): void {
  if (warmed.has(path)) return;
  const load = LOADERS[path];
  if (!load) return;
  warmed.add(path);
  // A failed prefetch must never surface — the click still works, just slower.
  void load().catch(() => warmed.delete(path));
}

/** Spread onto a <Link> to warm its chunk the moment the user shows intent. */
export function prefetch(path: string) {
  const warm = () => prefetchRoute(path);
  return { onPointerEnter: warm, onFocus: warm, onTouchStart: warm };
}

/**
 * Warm every board destination once the browser is idle. By the time a reader has
 * scrolled to a card, its page is already in memory and the click is instant.
 */
export function prefetchAllWhenIdle(): () => void {
  const paths = Object.keys(LOADERS);
  let i = 0;
  let cancelled = false;

  const pump = () => {
    if (cancelled || i >= paths.length) return;
    prefetchRoute(paths[i++]);
    schedule();
  };

  const ric: typeof requestIdleCallback | undefined =
    typeof requestIdleCallback === "function" ? requestIdleCallback : undefined;
  let handle: number;
  const schedule = () => {
    handle = ric ? ric(pump, { timeout: 2000 }) : window.setTimeout(pump, 300);
  };

  schedule();
  return () => {
    cancelled = true;
    if (ric && typeof cancelIdleCallback === "function") cancelIdleCallback(handle);
    else clearTimeout(handle);
  };
}
