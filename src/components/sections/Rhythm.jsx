import { useT } from "../../i18n/I18nContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";

export default function Rhythm() {
  const { t } = useT();
  const ritmoPulso1 = t("ritmo.pulsoP1");
  const ritmoCompasso = t("ritmo.compassoP");
  const ritmoSincope = t("ritmo.sincopeP");
  const compassos = t("ritmo.compassos");

  return (
    <section>
      <SectionHeader paragraph={t("ritmo.paragraph")}>
        {t("ritmo.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("ritmo.p1")}</p>

      <SubHeader>{t("ritmo.pulsoTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        <em>{ritmoPulso1.em1}</em>
        {ritmoPulso1.p1}
        <em>{ritmoPulso1.em2}</em>
        {ritmoPulso1.p2}
      </p>
      <p className="text-lg leading-relaxed mb-4">{t("ritmo.pulsoP2")}</p>
      <div className="mono text-sm mb-8 border-2 border-stone-900 overflow-hidden">
        <div className="grid grid-cols-6 text-center">
          <div className="p-3 bg-stone-900 text-stone-50 col-span-6">
            {t("ritmo.figurasSemibreve")}
          </div>
          <div className="p-3 bg-stone-700 text-stone-50 col-span-3">
            {t("ritmo.figurasMinima")}
          </div>
          <div className="p-3 bg-stone-700 text-stone-50 col-span-3">
            {t("ritmo.figurasMinima")}
          </div>
          <div className="p-3 bg-stone-500 text-stone-50 col-span-3 border-r border-stone-50">
            <div className="grid grid-cols-2 gap-px">
              <div>{t("ritmo.figurasSeminima")}</div>
              <div>{t("ritmo.figurasSeminima")}</div>
            </div>
          </div>
          <div className="p-3 bg-stone-500 text-stone-50 col-span-3">
            <div className="grid grid-cols-2 gap-px">
              <div>{t("ritmo.figurasSeminima")}</div>
              <div>{t("ritmo.figurasSeminima")}</div>
            </div>
          </div>
          <div className="p-2 bg-stone-400 text-stone-50 col-span-6">
            <div className="grid grid-cols-8 gap-px text-xs">
              {Array(8)
                .fill(t("ritmo.figurasColcheia"))
                .map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
            </div>
          </div>
          <div className="p-2 bg-stone-300 text-stone-700 col-span-6">
            <div className="grid grid-cols-16 gap-px text-[10px]">
              {Array(16)
                .fill("♪")
                .map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
            </div>
            <div className="text-center mt-1">{t("ritmo.figurasSemi16")}</div>
          </div>
        </div>
      </div>

      <SubHeader>{t("ritmo.restsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.restsP")}</p>

      <SubHeader>{t("ritmo.dottedTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.dottedP")}</p>

      <SubHeader>{t("ritmo.tupletTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.tupletP")}</p>

      <SubHeader>{t("ritmo.compassoTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {ritmoCompasso.before}
        <em>{ritmoCompasso.em}</em>
        {ritmoCompasso.after}
      </p>
      <ul className="space-y-2 mb-8 text-base leading-relaxed">
        {compassos.map((c, i) => (
          <li key={i}>
            <span className="mono bg-stone-200 px-2 py-0.5">{c.code}</span>
            {c.desc}
          </li>
        ))}
      </ul>

      <SubHeader>{t("ritmo.compoundTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.compoundP")}</p>

      <SubHeader>{t("ritmo.polyTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.polyP")}</p>

      <SubHeader>{t("ritmo.tempoTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("ritmo.tempoP")}</p>

      <SubHeader>{t("ritmo.sincopeTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        <em>{ritmoSincope.em}</em>
        {ritmoSincope.after}
      </p>

      <InfoBox label={t("ritmo.grooveLabel")}>{t("ritmo.grooveBody")}</InfoBox>

      <PracticalApp>{t("ritmo.practicalApp")}</PracticalApp>
    </section>
  );
}
