import { createContext, useContext, useEffect, useState } from "react";
import en from "./en.js";
import pt from "./pt.js";

const LANGS = ["en", "pt"];
const DEFAULT_LANG = "en";
const COOKIE_NAME = "lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getLangCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)lang=(en|pt)/);
  return match ? match[1] : null;
}

function setLangCookie(lang) {
  document.cookie = `${COOKIE_NAME}=${lang}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

const catalogs = { en, pt };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const cookie = getLangCookie();
    return LANGS.includes(cookie) ? cookie : DEFAULT_LANG;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    if (!LANGS.includes(next)) return;
    setLangCookie(next);
    setLangState(next);
  };

  const dict = catalogs[lang];
  const lookup = (path, source) =>
    path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), source);
  const t = (path) => {
    const v = lookup(path, dict);
    return v !== undefined ? v : lookup(path, en);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used inside <I18nProvider>");
  return ctx;
}
