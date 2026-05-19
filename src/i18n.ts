import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import nlCommon from '@/locales/nl/common.json';
import nlHome from '@/locales/nl/home.json';
import deCommon from '@/locales/de/common.json';
import deHome from '@/locales/de/home.json';
import frCommon from '@/locales/fr/common.json';
import frHome from '@/locales/fr/home.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'home'],
    defaultNS: 'common',
    resources: {
      en: { common: enCommon, home: enHome },
      nl: { common: nlCommon, home: nlHome },
      de: { common: deCommon, home: deHome },
      fr: { common: frCommon, home: frHome },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
