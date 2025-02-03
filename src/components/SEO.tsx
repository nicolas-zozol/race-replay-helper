import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const SEO = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  // Get the base URL without trailing slash
  const baseUrl = window.location.origin.replace(/\/$/, '');
  
  // Get the current path without leading slash
  const currentPath = location.pathname.replace(/^\//, '');
  
  // Construct the full URL
  const fullUrl = `${baseUrl}${currentPath ? '/' + currentPath : ''}`;

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', i18n.language);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
    
    // Update hreflang links
    const languages = ['en', 'fr', 'es', 'zh', 'pt'];
    
    // Remove existing hreflang links
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    
    // Add new hreflang links
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', fullUrl);
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', fullUrl);
    document.head.appendChild(defaultLink);
  }, [i18n.language, fullUrl]);

  return null;
};