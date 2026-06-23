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

/** Zential-green the lead phrase (up to the first . / · / —, else the first word). */
function GreenLead({ text }: { text: string }) {
  const m = text.match(/^(.*?)\s*([.·—].*)$/s);
  let lead: string;
  let rest: string;
  if (m) {
    lead = m[1];
    rest = " " + m[2];
  } else {
    const sp = text.indexOf(" ");
    if (sp === -1) return <span style={{ color: "#2ED8A8" }}>{text}</span>;
    lead = text.slice(0, sp);
    rest = text.slice(sp);
  }
  return (
    <>
      <span style={{ color: "#2ED8A8" }}>{lead}</span>
      {rest}
    </>
  );
}

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
        <GreenLead text={t(MESSAGE_KEYS[index])} />
      </p>
    </div>
  );
}
