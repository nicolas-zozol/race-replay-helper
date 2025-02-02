import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const SEO = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;

    // Update canonical and hreflang URLs
    const canonicalPath = location.pathname;
    const baseUrl = 'https://race-replay-helper.com';

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${baseUrl}${canonicalPath}`);
    }

    // Update hreflang URLs
    const hrefLangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    hrefLangTags.forEach(tag => {
      if (tag instanceof HTMLLinkElement) {
        tag.href = `${baseUrl}${canonicalPath}`;
      }
    });
  }, [i18n.language, location.pathname]);

  return null;
};