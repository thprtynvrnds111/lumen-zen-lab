import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { COPY, CTA_HREF, GIFTS } from "./config";
import { RevealRitual } from "./RevealRitual";

/* /reveal — standalone lander for paid traffic. Noindex, no site chrome.
   Campaign values live in ./config.ts. */

export default function Reveal() {
  useEffect(() => {
    // index.html ships a static `robots: index, follow` — Helmet appends a second
    // tag rather than replacing it, so flip the static one for this route too.
    const staticRobots = document.querySelector('meta[name="robots"]:not([data-rh])');
    const prevRobots = staticRobots?.getAttribute("content") ?? null;
    staticRobots?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (staticRobots && prevRobots) staticRobots.setAttribute("content", prevRobots);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{COPY.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <RevealRitual placement="page">
        {/* JS-disabled fallback — the prerendered HTML carries this statically */}
        <noscript>
          <div className="zr-noscript">
            {GIFTS.map((g) => (
              <div className="zr-gift" key={g.num} style={{ opacity: 1, animation: "none" }}>
                <span className="zr-gift-num">{g.num}</span>
                <span className="zr-gift-body">
                  <span className="zr-gift-title">{g.title}</span>
                  <span className="zr-gift-detail">{g.detail}</span>
                </span>
              </div>
            ))}
            <a className="zr-cta" href={CTA_HREF} style={{ marginTop: "16px" }}>
              {COPY.cta}
            </a>
            <p className="zr-cta-note">{COPY.ctaNote}</p>
          </div>
        </noscript>
      </RevealRitual>
    </>
  );
}
