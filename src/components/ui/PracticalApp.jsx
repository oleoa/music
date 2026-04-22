import { useT } from "../../i18n/I18nContext.jsx";

export default function PracticalApp({ children, label }) {
  const { t } = useT();
  return (
    <div className="border-t border-stone-300 pt-6 mt-10">
      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {label ?? t("common.practicalApp")}
      </p>
      <p className="text-base leading-relaxed">{children}</p>
    </div>
  );
}
