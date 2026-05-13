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
      en: '30-Day Optimization Guarantee — No Friction. No Questions.',
      nl: '30 Dagen Optimalisatiegarantie — Geen Gedoe. Geen Vragen.',
      de: '30-Tage-Optimierungsgarantie — Kein Aufwand. Keine Fragen.',
      fr: 'Garantie Optimisation 30 Jours — Sans Friction. Sans Questions.',
    },
    shipping: {
      en: 'Free Shipping on Orders Over €75',
      nl: 'Gratis verzending bij bestellingen boven €75',
      de: 'Kostenloser Versand ab €75 Bestellwert',
      fr: 'Livraison gratuite dès €75 d\'achat',
    },
    science: {
      en: 'Photobiomodulation · Bioelectrical · EMS · Infrared — One Daily Stack',
      nl: 'Fotobiomodulatie · Bio-elektrisch · EMS · Infrarood — Één dagelijkse stack',
      de: 'Photobiomodulation · Bioelektrisch · EMS · Infrarot — Ein täglicher Stack',
      fr: 'Photobiomodulation · Bioélectrique · EMS · Infrarouge — Une stack quotidienne',
    },
    delivery: {
      en: 'Delivered in 3–7 Business Days Across the EU',
      nl: 'Geleverd in 3–7 werkdagen door heel de EU',
      de: 'Lieferung in 3–7 Werktagen in der gesamten EU',
      fr: 'Livré en 3–7 jours ouvrés dans toute l\'UE',
    },
    clinic: {
      en: 'Recover faster. Age slower. Train harder. Your daily biohacking protocol.',
      nl: 'Sneller herstellen. Langzamer verouderen. Harder trainen. Jouw dagelijkse biohacking-protocol.',
      de: 'Schneller erholen. Langsamer altern. Härter trainieren. Dein tägliches Biohacking-Protokoll.',
      fr: 'Récupérez plus vite. Vieillissez moins vite. Entraînez-vous plus fort. Votre protocole biohacking quotidien.',
    },
  },
} as const;

export function t<
  Section extends keyof typeof translations,
  Key extends keyof (typeof translations)[Section],
>(section: Section, key: Key, lang: Lang): string {
  return (translations[section][key] as Record<Lang, string>)[lang];
}
