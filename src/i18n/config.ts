import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import zhTranslations from './locales/zh.json';
import ptTranslations from './locales/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      es: { translation: esTranslations },
      zh: { translation: zhTranslations },
      pt: { translation: ptTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;