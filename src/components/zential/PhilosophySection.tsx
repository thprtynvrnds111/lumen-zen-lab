import { useScrollReveal } from "@/hooks/useScrollReveal";
import philosophyImg from "@/assets/philosophy-portrait-new.webp";
import { useTranslation } from "react-i18next";

export function PhilosophySection() {
  const ref = useScrollReveal<HTMLElement>();
  const { t } = useTranslation('home');

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: '#1A1714' }}>
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        <div className="w-full md:w-5/12 relative">
          <img
            src={philosophyImg}
            alt="Woman with clear skin, contemplative"
            className="w-full h-full object-cover"
            loading="eager"
            width={900}
            height={1200}
            style={{ minHeight: '50vh' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1714]/60 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1714]/80 md:hidden" />
        </div>

        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-20">
          <p className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: '#C6A07C' }}>
            {t('philosophy.eyebrow')}
          </p>

          <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8" style={{ color: '#FAF7F3' }}>
            {t('philosophy.headline').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-6 max-w-lg" style={{ color: '#FAF7F3', opacity: 0.6 }}>
            {t('philosophy.body1')}
          </p>

          <p className="text-sm leading-relaxed mb-10 max-w-lg" style={{ color: '#FAF7F3', opacity: 0.4 }}>
            {t('philosophy.body2')}
          </p>

          <div className="border-l-2 pl-6 mb-10" style={{ borderColor: '#C6A07C' }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#C6A07C' }}>
              {t('philosophy.categoryEyebrow')}
            </p>
            <h3 className="font-serif italic text-xl md:text-2xl" style={{ color: '#FAF7F3' }}>
              {t('philosophy.categoryTitle')}
            </h3>
            <p className="text-sm mt-2" style={{ color: '#FAF7F3', opacity: 0.5 }}>
              {t('philosophy.categoryDesc')}
            </p>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#FAF7F3', opacity: 0.25 }}>
              {t('philosophy.think')}
            </p>
            {["WHOOP", "EIGHT SLEEP", "AG1"].map((brand) => (
              <span
                key={brand}
                className="text-xs md:text-sm tracking-[0.15em] font-light"
                style={{ color: '#FAF7F3', opacity: 0.2 }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
