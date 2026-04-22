import { useT } from "../../i18n/I18nContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";

export default function NextSteps() {
  const { t } = useT();
  const proximosP1 = t("proximos.p1");
  const closeBody = t("proximos.closeBody");
  const roadmap = t("proximos.roadmap");
  const resources = t("proximos.resources");

  return (
    <section>
      <SectionHeader paragraph={t("proximos.paragraph")}>
        {t("proximos.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">
        {proximosP1.before}
        <em>{proximosP1.em}</em>
        {proximosP1.after}
      </p>

      <div className="space-y-5 mb-8">
        {roadmap.map((item, i) => (
          <div key={i}>
            <h3 className="display text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-base leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      <SubHeader>{t("proximos.resourcesTitle")}</SubHeader>
      <ul className="space-y-3 mb-8 text-base leading-relaxed">
        {resources.map((r, i) => (
          <li key={i}>
            • <strong>{r.name}</strong>
            {r.desc}
            {r.nameExtra && <strong>{r.nameExtra}</strong>}
            {r.descExtra}
          </li>
        ))}
      </ul>

      <div className="border-2 border-stone-900 p-6 bg-stone-900 text-stone-50 mt-10">
        <p className="mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
          {t("proximos.closeLabel")}
        </p>
        <p className="text-lg leading-relaxed serif italic">
          {closeBody.before}
          <em>{closeBody.em}</em>
          {closeBody.after}
        </p>
      </div>
    </section>
  );
}
