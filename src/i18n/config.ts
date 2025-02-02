import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import zhTranslations from './locales/zh.json';
import ptTranslations from './locales/pt.json';

const LANGUAGE_COOKIE_KEY = 'i18next';

// Get language from cookie or browser
const getInitialLanguage = () => {
  const cookieLang = Cookies.get(LANGUAGE_COOKIE_KEY);
  if (cookieLang) return cookieLang;
  
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'fr', 'es', 'zh', 'pt'].includes(browserLang) ? browserLang : 'en';
};

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
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;