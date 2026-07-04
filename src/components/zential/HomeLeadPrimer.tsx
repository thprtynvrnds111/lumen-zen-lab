import { useLocation } from "react-router-dom";
import { ExitIntentPrimer } from "./LeadCapture";

/**
 * Homepage lead capture — the organic half of the funnel split.
 * Paid visits (fbclid/utm) get the reveal ritual takeover instead;
 * this primer arms only for organic homepage visitors, on exit intent
 * (desktop) or scroll depth + dwell (touch). Never both.
 */
export default function HomeLeadPrimer() {
  const { pathname } = useLocation();
  if (pathname !== "/") return null;
  return <ExitIntentPrimer source="home-organic" organicOnly />;
}
