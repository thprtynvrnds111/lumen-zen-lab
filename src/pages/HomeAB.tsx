import { useEffect, useState } from "react";
import Index from "./Index";
import Storefront from "./Storefront";

/**
 * `/` A/B wrapper. Variant assignment happens in edge middleware (middleware.js),
 * which sets the `zp_home_ab` cookie (a|b) and serves the matching prerendered
 * HTML so there is no hydration flicker. This component reads the same cookie and
 * renders the matching variant, then reports the impression to GA4 + Meta.
 *
 * A = current homepage (Index). B = Claude Design storefront (Storefront).
 * Server/prerender (no cookie) defaults to A, which matches the prerendered `/`.
 */

function readVariant(): "a" | "b" {
  if (typeof document === "undefined") return "a";
  const m = document.cookie.match(/(?:^|;\s*)zp_home_ab=(a|b)/);
  return m ? (m[1] as "a" | "b") : "a";
}

export default function HomeAB() {
  const [variant] = useState<"a" | "b">(() => readVariant());

  useEffect(() => {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      fbq?: (...a: unknown[]) => void;
    };
    if (w.gtag) {
      w.gtag("set", "user_properties", { home_variant: variant });
      w.gtag("event", "experiment_impression", {
        experiment_id: "home_redesign",
        variant_id: variant,
      });
    }
    if (w.fbq) w.fbq("trackCustom", "HomeVariant", { variant });
  }, [variant]);

  return variant === "b" ? <Storefront /> : <Index />;
}
