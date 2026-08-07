import { useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";
import { pixelViewContent } from "./tracking";
import "@/styles/editorial.css";

interface EditorialLayoutProps {
  slug: string;
  title: string;
  description: string;
  ogImage: string;
  /** ISO date, e.g. "2026-07-08" — emitted as article:published_time + JSON-LD */
  publishedTime: string;
  folio: string;
  mastheadVariant?: "light" | "dark";
  pageVariant?: "default" | "white";
  children: React.ReactNode;
}

export function EditorialLayout({
  slug,
  title,
  description,
  ogImage,
  publishedTime,
  folio,
  mastheadVariant = "light",
  pageVariant = "default",
  children,
}: EditorialLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    pixelViewContent(`editorial-${slug}`);
  }, [slug]);

  useEffect(() => {
    const els = mainRef.current?.querySelectorAll(".reveal");
    if (!els?.length || typeof IntersectionObserver === "undefined") return;
    // Arm the hidden initial state only now that we can observe — so no-JS and
    // prerendered HTML render everything visible (see editorial.css .reveal).
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal--visible");
            io.unobserve(e.target);
          }
        }
      },
      // Large bottom rootMargin: reveal fires for everything already laid out
      // below the fold on load, so nothing is ever left invisible without a
      // scroll (crawlers, print, and headless full-page captures included).
      // Real users still get the fade-up; reduced-motion disables it.
      { threshold: 0, rootMargin: "0px 0px 3000px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, [slug]);

  const dark = mastheadVariant === "dark";
  return (
    <>
      <SEO
        title={title}
        description={description}
        ogType="article"
        ogImage={`https://zentialpure.com${ogImage}`}
        canonicalUrl={`/editorial/${slug}`}
        publishedTime={publishedTime}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: `https://zentialpure.com${ogImage}`,
          datePublished: publishedTime,
          author: { "@type": "Organization", name: "Zential Pure" },
          publisher: { "@type": "Organization", name: "Zential Pure" },
          mainEntityOfPage: `https://zentialpure.com/editorial/${slug}`,
        }}
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <main className={pageVariant === "white" ? "ed-page ed-page--white" : "ed-page"} ref={mainRef}>
          <header className={dark ? "masthead masthead--dark" : "masthead"} style={dark ? { background: "var(--ed-dark)" } : {}}>
            {dark ? (
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="/editorial/logo/zential-mark-teal.png" alt="" width={20} height={20} style={{ height: 20, width: "auto" }} />
                <span className="masthead__wordmark">Zential Pure</span>
              </span>
            ) : (
              <img className="masthead__logo" src="/editorial/logo/zential-logo-primary.png" alt="Zential Pure" />
            )}
            <span className="masthead__tag">Journal</span>
          </header>
          {children}
          {/* The Breath CTA — the free practice is the journey's next step after reading. */}
          <aside
            aria-label="The Breath practice"
            style={{
              background: "#FFFFFF",
              borderTop: "1px solid var(--ed-line)",
              padding: "56px 28px 60px",
              textAlign: "center",
            }}
          >
            <p className="meta-label" style={{ color: "#8E8E8E", letterSpacing: "0.3em" }}>THE PRACTICE</p>
            <p style={{ fontFamily: "var(--ed-font-sans)", fontWeight: 300, letterSpacing: "-0.02em", fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.25, margin: "14px auto 0", maxWidth: "520px", color: "#141414" }}>
              The instruments return the energy. The breath returns the rhythm.
            </p>
            <a
              href="/breath?utm_source=editorial&utm_medium=site&utm_campaign=breath-journey"
              style={{
                display: "inline-block",
                marginTop: "28px",
                border: "1px solid rgba(20,20,20,0.22)",
                borderRadius: "9999px",
                padding: "14px 30px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#141414",
                textDecoration: "none",
              }}
            >
              BEGIN THE BREATH — FREE
            </a>
            <p style={{ marginTop: "14px", fontSize: "11px", letterSpacing: "0.12em", color: "#8E8E8E" }}>
              Three practices · in the browser · no signup
            </p>
          </aside>
          <footer className="page-footer" style={{ borderTop: "1px solid var(--ed-line)" }}>
            <span className="meta-label">Zential Pure</span>
            <span className="folio">{folio}</span>
          </footer>
        </main>
      </div>
    </>
  );
}
