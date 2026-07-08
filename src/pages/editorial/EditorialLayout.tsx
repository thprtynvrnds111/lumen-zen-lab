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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal--visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
      <div style={{ background: "var(--ed-fog)", minHeight: "100vh" }}>
        <main className={pageVariant === "white" ? "ed-page ed-page--white" : "ed-page"} ref={mainRef}>
          <header className={dark ? "masthead masthead--dark" : "masthead"}>
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
          <footer className="page-footer" style={{ borderTop: "1px solid var(--ed-line)" }}>
            <span className="meta-label">Zential Pure</span>
            <span className="folio">{folio}</span>
          </footer>
        </main>
      </div>
    </>
  );
}
