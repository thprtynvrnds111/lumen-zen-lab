import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export function MovementSection() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation('home');

  const stack = [
    { key: "sleep", brand: "Eight Sleep" },
    { key: "nutrition", brand: "AG1" },
    { key: "performance", brand: "Whoop" },
    { key: "skin", brand: "Zential Pure", active: true },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF7F3" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-8" style={{ backgroundColor: "#C6A07C", opacity: 0.6 }} />
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase" style={{ color: "#C6A07C" }}>
            {t('movement.eyebrow')}
          </p>
          <span className="h-px w-8" style={{ backgroundColor: "#C6A07C", opacity: 0.6 }} />
        </div>

        <h2
          className="font-serif italic text-[38px] md:text-[58px] lg:text-[64px] leading-[1.04] tracking-[-0.01em] mb-8 text-balance"
          style={{ color: "#1A1714" }}
        >
          {t('movement.headline').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br className="hidden md:block" />}</span>
          ))}
        </h2>

        <p
          className="text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto mb-16"
          style={{ color: "#1A1714", opacity: 0.6 }}
        >
          {t('movement.body')}
        </p>

        <div
          className="inline-grid grid-cols-2 md:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden border"
          style={{ borderColor: "rgba(26,23,20,0.1)" }}
        >
          {stack.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center justify-center px-6 py-6 md:py-7 gap-1.5"
              style={{ backgroundColor: item.active ? "#1A1714" : "#F0EDE8" }}
            >
              <span
                className="text-[9px] tracking-[0.3em] uppercase font-medium"
                style={{ color: item.active ? "#C6A07C" : "rgba(26,23,20,0.4)" }}
              >
                {t(`movement.stack.${item.key}`)}
              </span>
              <span
                className="text-[13px] md:text-[14px] font-medium tracking-wide"
                style={{ color: item.active ? "#FAF7F3" : "rgba(26,23,20,0.55)" }}
              >
                {item.brand}
              </span>
            </div>
          ))}
        </div>

        <blockquote
          className="font-serif italic text-[20px] md:text-[26px] leading-[1.45] max-w-2xl mx-auto mb-6"
          style={{ color: "#1A1714", opacity: 0.82 }}
        >
          "{t('movement.quote')}"
        </blockquote>

        <p className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "#C6A07C" }}>
          {t('movement.quoteAttribution')}
        </p>

      </div>
    </section>
  );
}
