import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";

    const reveal = () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    // Fallback: if IntersectionObserver doesn't fire within 1.5s, reveal anyway
    // This handles Instagram in-app browser and other environments where IO is unreliable
    const fallbackTimer = setTimeout(reveal, 1500);

    if (typeof IntersectionObserver === "undefined") {
      // No IO support — reveal immediately
      reveal();
      clearTimeout(fallbackTimer);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          clearTimeout(fallbackTimer);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      obs.disconnect();
    };
  }, [threshold]);

  return ref;
}
