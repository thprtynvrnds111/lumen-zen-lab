import { useState, useEffect } from "react";
import { useLanguageStore } from "@/stores/languageStore";
import { t } from "@/lib/i18n";

const MESSAGE_KEYS = [
  'guarantee',
  'shipping',
  'science',
  'delivery',
  'clinic',
] as const;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % MESSAGE_KEYS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-foreground text-background py-2.5 text-center overflow-hidden">
      <p className="text-xs tracking-[0.2em] uppercase font-light" key={`${index}-${lang}`}
        style={{ animation: 'slide-announcement 5s ease-in-out' }}>
        {t('announcement', MESSAGE_KEYS[index], lang)}
      </p>
    </div>
  );
}
