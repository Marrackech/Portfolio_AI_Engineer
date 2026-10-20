import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, SUPPORTED_LANGS } from '../i18n/translations.js';

const AppContext = createContext(null);

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* stockage indisponible (navigation privée Safari, etc.) */
  }
}

function initialLang() {
  const saved = safeGet('lang');
  if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) return saved;
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'fr';
  return nav.toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
}

function initialTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  const saved = safeGet('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', translations[lang].meta.description);
    safeSet('lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute('content', theme === 'dark' ? '#0a1020' : '#f5f7fb');
    safeSet('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      theme,
      toggleTheme,
      t: translations[lang],
      // Choisit la valeur de la langue courante dans un objet { fr, en }
      pick: (obj) => (obj && (obj[lang] !== undefined ? obj[lang] : obj.fr)) || '',
    }),
    [lang, theme, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp doit être utilisé dans <AppProvider>');
  return ctx;
}
