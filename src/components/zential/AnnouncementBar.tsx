import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/stores/languageStore";

const MESSAGE_KEYS = [
  'announcement.guarantee',
  'announcement.shipping',
  'announcement.science',
  'announcement.delivery',
  'announcement.clinic',
] as const;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation('common');
  const { lang } = useLanguageStore();

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % MESSAGE_KEYS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-foreground text-background py-2.5 text-center overflow-hidden">
      <p className="text-xs tracking-[0.2em] uppercase font-light" key={`${index}-${lang}`}
        style={{ animation: 'slide-announcement 5s ease-in-out' }}>
        {t(MESSAGE_KEYS[index])}
      </p>
    </div>
  );
}
