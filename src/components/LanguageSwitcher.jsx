import { useT } from "../i18n/I18nContext.jsx";

export default function LanguageSwitcher() {
  const { lang, setLang } = useT();
  const btn = (code, label) => (
    <button
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={
        "mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 transition-colors " +
        (lang === code
          ? "text-stone-900 font-semibold"
          : "text-stone-400 hover:text-stone-900")
      }
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-0.5">
      {btn("en", "EN")}
      <span className="mono text-[10px] text-stone-300">/</span>
      {btn("pt", "PT")}
    </div>
  );
}
