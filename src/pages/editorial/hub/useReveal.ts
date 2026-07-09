import { useEffect, useRef } from "react";

/**
 * Scroll-reveal for .reveal elements — same no-JS-safe contract as
 * EditorialLayout: hidden state is armed only under html.js-reveal, so
 * prerendered HTML and crawlers always see everything visible.
 */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length || typeof IntersectionObserver === "undefined") return;
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
      { threshold: 0, rootMargin: "0px 0px 3000px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
