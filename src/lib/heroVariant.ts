import { useEffect, useState } from "react";

/**
 * Lightweight 50/50 hero A/B. Editorial headline is the control; a concrete
 * headline is the challenger. Assignment is sticky per browser and reported to
 * GA4 as an `experiment_exposure` event. SSR renders control (matches the
 * prerendered HTML); the client may switch after mount.
 */
export type HeroVariant = "control" | "concrete";

export function useHeroVariant(slug: string, enabled: boolean): HeroVariant {
  const [variant, setVariant] = useState<HeroVariant>("control");

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const key = `zp-hero-ab-${slug}`;
    let v = window.localStorage.getItem(key) as HeroVariant | null;
    if (v !== "control" && v !== "concrete") {
      v = Math.random() < 0.5 ? "control" : "concrete";
      window.localStorage.setItem(key, v);
    }
    setVariant(v);
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (w.gtag) w.gtag("event", "experiment_exposure", { experiment_id: `hero_${slug}`, variant: v });
  }, [slug, enabled]);

  return variant;
}
