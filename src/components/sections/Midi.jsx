import { useT } from "../../i18n/I18nContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";

export default function Midi() {
  const { t } = useT();
  const workflow = t("midi.workflow");
  const readItems = t("midi.readItems");
  const tricks = t("midi.tricks");
  const ccList = t("midi.ccList");
  const quantizeList = t("midi.quantizeList");

  return (
    <section>
      <SectionHeader paragraph={t("midi.paragraph")}>
        {t("midi.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("midi.p1")}</p>

      <SubHeader>{t("midi.whatTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("midi.whatP")}</p>

      <SubHeader>{t("midi.workflowTitle")}</SubHeader>
      <ol className="space-y-3 mb-8 text-base leading-relaxed list-decimal pl-5">
        {workflow.map((step, i) => (
          <li key={i}>
            <strong>{step.strong}</strong>
            {step.text}
          </li>
        ))}
      </ol>

      <SubHeader>{t("midi.readTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("midi.readP")}</p>
      <ul className="space-y-2 mb-8 text-base leading-relaxed">
        {readItems.map((item, i) => (
          <li key={i}>
            • <strong>{item.strong}</strong>
            {item.text}
          </li>
        ))}
      </ul>

      <SubHeader>{t("midi.velocityTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("midi.velocityP")}</p>

      <SubHeader>{t("midi.ccTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("midi.ccP")}</p>
      <div className="space-y-2 mb-8">
        {ccList.map((cc, i) => (
          <div
            key={i}
            className="flex items-baseline gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5 w-14 text-center shrink-0">
              {cc.code}
            </span>
            <span className="serif font-semibold w-40 shrink-0">{cc.name}</span>
            <span className="text-sm text-stone-600 italic">{cc.note}</span>
          </div>
        ))}
      </div>

      <SubHeader>{t("midi.mpeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("midi.mpeP")}</p>

      <SubHeader>{t("midi.quantizeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("midi.quantizeP")}</p>
      <ul className="space-y-2 mb-8 text-base leading-relaxed list-disc pl-6">
        {quantizeList.map((q, i) => (
          <li key={i}>
            <strong>{q.strong}</strong>
            {q.text}
          </li>
        ))}
      </ul>

      <SubHeader>{t("midi.tricksTitle")}</SubHeader>
      <ul className="space-y-3 mb-8 text-base leading-relaxed">
        {tricks.map((item, i) => (
          <li key={i}>
            • <strong>{item.strong}</strong>
            {item.text}
          </li>
        ))}
      </ul>

      <InfoBox label={t("midi.weeklyLabel")}>{t("midi.weeklyBody")}</InfoBox>
    </section>
  );
}
