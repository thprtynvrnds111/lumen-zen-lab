import { ReactNode, useEffect, useState } from "react";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "./SparseFooter";
import { SEO } from "@/components/SEO";

interface PageShellProps {
  title: string;
  description?: string;
  canonical?: string;
  /** Big italic display title for the page hero */
  displayTitle?: string;
  /** Tagline below the display title */
  displaySubtitle?: string;
  /** Section / category label above the title */
  eyebrow?: string;
  /** Body content */
  children: ReactNode;
  /** Hide the hero block (for pages with custom hero) */
  hideHero?: boolean;
  /** Optional sticky indicator number ( e.g. "01—08" ) */
  stickyTag?: string;
}

export function PageShell({
  title,
  description,
  canonical,
  displayTitle,
  displaySubtitle,
  eyebrow,
  children,
  hideHero,
  stickyTag,
}: PageShellProps) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    if (!stickyTag) return;
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [stickyTag]);

  return (
    <div className="min-h-screen bg-[#F7F4F0] text-[#1A1714]">
      <SEO title={title} description={description} canonicalUrl={canonical} />
      <AnnouncementBar />
      <Header />

      {stickyTag && (
        <div
          className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-3 pointer-events-none transition-opacity duration-300"
          style={{ opacity: scrollPct > 0.85 ? 0 : 1 }}
          aria-hidden
        >
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5A4A]">
            {stickyTag.split(" ")[0]}
          </div>
          <div
            className="font-[Lora] italic leading-none text-[#1A1714]"
            style={{ fontSize: "3rem" }}
          >
            ( {stickyTag.split(" ").slice(1).join(" ") || stickyTag} )
          </div>
          <div className="mt-4 w-1 h-32 bg-[#1A1714]/10 overflow-hidden">
            <div
              className="w-full bg-[#2ED8A8]"
              style={{
                height: "100%",
                transform: `scaleY(${scrollPct})`,
                transformOrigin: "top",
                transition: "transform 0.1s linear",
              }}
            />
          </div>
        </div>
      )}

      {!hideHero && (displayTitle || eyebrow) && (
        <section className="px-6 md:pl-32 pt-20 pb-16 md:pt-32 md:pb-24 max-w-6xl">
          {eyebrow && (
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-8">
              {eyebrow}
            </p>
          )}
          {displayTitle && (
            <h1
              className="font-[Lora] italic leading-[0.95] text-[#1A1714] max-w-4xl"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
            >
              {displayTitle}
            </h1>
          )}
          {displaySubtitle && (
            <p className="mt-8 text-base md:text-xl text-[#1A1714]/70 max-w-2xl leading-relaxed">
              {displaySubtitle}
            </p>
          )}
        </section>
      )}

      <main>{children}</main>

      <SparseFooter />
    </div>
  );
}
