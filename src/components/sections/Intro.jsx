import { useT } from "../../i18n/I18nContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";

export default function Intro() {
  const { t } = useT();
  const introP3 = t("intro.p3");
  return (
    <section>
      <SectionHeader paragraph={t("intro.paragraph")}>
        {t("intro.heading1")} <br />
        <em className="font-normal">{t("intro.heading2")}</em>
      </SectionHeader>
      <p className="drop-cap text-lg leading-relaxed mb-6">
        {t("intro.p1")}
      </p>
      <p className="text-lg leading-relaxed mb-6">{t("intro.p2")}</p>
      <InfoBox label={t("intro.howToUseLabel")}>
        {t("intro.howToUseBody.before")}
        <span className="mono bg-stone-900 text-stone-50 px-1.5 py-0.5 text-xs">
          {t("intro.howToUseBody.symbol")}
        </span>
        {t("intro.howToUseBody.after")}
      </InfoBox>
      <p className="text-lg leading-relaxed mb-6">
        {introP3.before}
        <em>{introP3.melody}</em>
        {introP3.middle1}
        <em>{introP3.harmony}</em>
        {introP3.middle2}
        <em>{introP3.rhythm}</em>
        {introP3.after}
      </p>
      <p className="text-lg leading-relaxed">{t("intro.p4")}</p>
    </section>
  );
}
