import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enFaq from '@/locales/en/faq.json';
import enSupport from '@/locales/en/support.json';
import enShipping from '@/locales/en/shipping.json';
import enReturns from '@/locales/en/returns.json';
import enWarranty from '@/locales/en/warranty.json';
import enQuiz from '@/locales/en/quiz.json';
import enThankyou from '@/locales/en/thankyou.json';
import enQuizresult from '@/locales/en/quizresult.json';

import nlCommon from '@/locales/nl/common.json';
import nlHome from '@/locales/nl/home.json';
import nlFaq from '@/locales/nl/faq.json';
import nlSupport from '@/locales/nl/support.json';
import nlShipping from '@/locales/nl/shipping.json';
import nlReturns from '@/locales/nl/returns.json';
import nlWarranty from '@/locales/nl/warranty.json';
import nlQuiz from '@/locales/nl/quiz.json';
import nlThankyou from '@/locales/nl/thankyou.json';
import nlQuizresult from '@/locales/nl/quizresult.json';

import deCommon from '@/locales/de/common.json';
import deHome from '@/locales/de/home.json';
import deFaq from '@/locales/de/faq.json';
import deSupport from '@/locales/de/support.json';
import deShipping from '@/locales/de/shipping.json';
import deReturns from '@/locales/de/returns.json';
import deWarranty from '@/locales/de/warranty.json';
import deQuiz from '@/locales/de/quiz.json';
import deThankyou from '@/locales/de/thankyou.json';
import deQuizresult from '@/locales/de/quizresult.json';

import frCommon from '@/locales/fr/common.json';
import frHome from '@/locales/fr/home.json';
import frFaq from '@/locales/fr/faq.json';
import frSupport from '@/locales/fr/support.json';
import frShipping from '@/locales/fr/shipping.json';
import frReturns from '@/locales/fr/returns.json';
import frWarranty from '@/locales/fr/warranty.json';
import frQuiz from '@/locales/fr/quiz.json';
import frThankyou from '@/locales/fr/thankyou.json';
import frQuizresult from '@/locales/fr/quizresult.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'home', 'faq', 'support', 'shipping', 'returns', 'warranty', 'quiz', 'thankyou', 'quizresult'],
    defaultNS: 'common',
    resources: {
      en: { common: enCommon, home: enHome, faq: enFaq, support: enSupport, shipping: enShipping, returns: enReturns, warranty: enWarranty, quiz: enQuiz, thankyou: enThankyou, quizresult: enQuizresult },
      nl: { common: nlCommon, home: nlHome, faq: nlFaq, support: nlSupport, shipping: nlShipping, returns: nlReturns, warranty: nlWarranty, quiz: nlQuiz, thankyou: nlThankyou, quizresult: nlQuizresult },
      de: { common: deCommon, home: deHome, faq: deFaq, support: deSupport, shipping: deShipping, returns: deReturns, warranty: deWarranty, quiz: deQuiz, thankyou: deThankyou, quizresult: deQuizresult },
      fr: { common: frCommon, home: frHome, faq: frFaq, support: frSupport, shipping: frShipping, returns: frReturns, warranty: frWarranty, quiz: frQuiz, thankyou: frThankyou, quizresult: frQuizresult },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
