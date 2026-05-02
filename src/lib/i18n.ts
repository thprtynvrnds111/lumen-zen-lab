import type { Lang } from '@/stores/languageStore';

export const translations = {
  nav: {
    shop:        { en: 'Shop',          nl: 'Shop',             de: 'Shop',             fr: 'Shop'              },
    collection:  { en: 'Collection',    nl: 'Collectie',        de: 'Kollektion',       fr: 'Collection'        },
    ritual:      { en: 'Ritual',        nl: 'Ritueel',          de: 'Ritual',           fr: 'Rituel'            },
    quiz:        { en: 'Quiz',          nl: 'Quiz',             de: 'Quiz',             fr: 'Quiz'              },
    journal:     { en: 'Journal',       nl: 'Journal',          de: 'Journal',          fr: 'Journal'           },
    support:     { en: 'Support',       nl: 'Klantenservice',   de: 'Support',          fr: 'Service client'    },
    shopDevices: { en: 'Shop Devices',  nl: 'Shop Apparaten',   de: 'Geräte shoppen',   fr: 'Nos appareils'     },
  },
  announcement: {
    guarantee: {
      en: '30-Day Ritual Guarantee — No Friction. No Questions.',
      nl: '30 Dagen Ritueel Garantie — Geen Gedoe. Geen Vragen.',
      de: '30-Tage-Ritual-Garantie — Kein Aufwand. Keine Fragen.',
      fr: 'Garantie Rituel 30 Jours — Sans Friction. Sans Questions.',
    },
    shipping: {
      en: 'Free Shipping on Orders Over €75',
      nl: 'Gratis verzending bij bestellingen boven €75',
      de: 'Kostenloser Versand ab €75 Bestellwert',
      fr: 'Livraison gratuite dès €75 d\'achat',
    },
    science: {
      en: 'Science-backed. Built for your daily ritual.',
      nl: 'Wetenschappelijk onderbouwd. Gemaakt voor jouw dagelijkse ritueel.',
      de: 'Wissenschaftlich fundiert. Für dein tägliches Ritual.',
      fr: 'Fondé sur la science. Conçu pour votre rituel quotidien.',
    },
    delivery: {
      en: 'Delivered in 3–7 Business Days Across the EU',
      nl: 'Geleverd in 3–7 werkdagen door heel de EU',
      de: 'Lieferung in 3–7 Werktagen in der gesamten EU',
      fr: 'Livré en 3–7 jours ouvrés dans toute l\'UE',
    },
    clinic: {
      en: 'Clinic precision. Home convenience. Daily results.',
      nl: 'Kliniekprecisie. Thuisgemak. Dagelijkse resultaten.',
      de: 'Klinikpräzision. Heimkomfort. Tägliche Ergebnisse.',
      fr: 'Précision clinique. Confort à domicile. Résultats quotidiens.',
    },
  },
} as const;

export function t<
  Section extends keyof typeof translations,
  Key extends keyof (typeof translations)[Section],
>(section: Section, key: Key, lang: Lang): string {
  return (translations[section][key] as Record<Lang, string>)[lang];
}
