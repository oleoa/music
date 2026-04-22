import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import Quiz from "../ui/Quiz.jsx";
import {
  MAJOR_SCALE_C,
  MINOR_SCALE_A,
  SCALE_DEGREES,
  TETRACHORDS,
  MINOR_FORMS,
  SCALE_CATALOG,
  SCALE_FAMILIES,
  MM_MODES,
  HM_MODES,
  RELATIVE_PARALLEL,
} from "../../data/scales.js";

export default function Scales() {
  const { t } = useT();
  const { playSequence } = useAudio();
  const escalasMajor = t("escalas.majorP");
  const escalasMinor = t("escalas.minorP");
  const escalasDiscovery = t("escalas.discoveryBody");
  const escalasApp = t("escalas.practicalApp");
  const degreesHeaders = t("escalas.degreesHeaders");

  const QUIZ_SCALE_IDS = [
    "major",
    "natural-minor",
    "harmonic-minor",
    "melodic-minor",
    "major-pent",
    "minor-pent",
    "blues",
    "whole-tone",
    "phrygian-dominant",
    "diminished-hw",
  ];
  const quizPool = SCALE_CATALOG.filter((s) =>
    QUIZ_SCALE_IDS.includes(s.id),
  ).map((s) => ({
    label: t(`data.scales.catalog.${s.id}.name`),
    play: () => playSequence(s.notes, 0.25),
  }));

  const relA = RELATIVE_PARALLEL.relative.a;
  const relB = RELATIVE_PARALLEL.relative.b;
  const parA = RELATIVE_PARALLEL.parallel.a;
  const parB = RELATIVE_PARALLEL.parallel.b;

  return (
    <section>
      <SectionHeader paragraph={t("escalas.paragraph")}>
        {t("escalas.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("escalas.p1")}</p>

      <SubHeader>{t("escalas.anatomyTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-6">{t("escalas.anatomyP")}</p>

      <SubHeader>{t("escalas.degreesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.degreesP")}</p>
      <div className="overflow-x-auto mb-8">
        <table className="mono text-sm w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-900">
              {degreesHeaders.map((h) => (
                <th key={h} className="text-left p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCALE_DEGREES.map((d) => (
              <tr key={d.id} className="border-b border-stone-200">
                <td className="p-2">{d.degree}</td>
                <td className="p-2 serif font-semibold">
                  {t(`data.scales.degrees.${d.id}.name`)}
                </td>
                <td className="p-2 text-stone-600 italic">
                  {t(`data.scales.degrees.${d.id}.role`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeader>{t("escalas.tetrachordsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.tetrachordsP")}</p>
      <div className="space-y-2 mb-8">
        {TETRACHORDS.map((tc) => (
          <div
            key={tc.id}
            className="flex items-center gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <button
              onClick={() => playSequence(tc.example, 0.3)}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1"
            >
              ▸
            </button>
            <span className="serif font-semibold w-24">
              {t(`data.scales.tetrachords.${tc.id}.name`)}
            </span>
            <span className="mono text-xs bg-stone-200 px-1.5">{tc.formula}</span>
          </div>
        ))}
      </div>

      <SubHeader>{t("escalas.majorTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {escalasMajor.before}
        <span className="mono bg-stone-900 text-stone-50 px-2 py-0.5">
          {escalasMajor.formula}
        </span>
        {escalasMajor.after}
      </p>
      <div className="flex gap-2 items-center mb-8 flex-wrap">
        <button
          onClick={() => playSequence(MAJOR_SCALE_C, 0.3)}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
        >
          {t("common.playScale")}
        </button>
        <span className="mono text-sm">C · D · E · F · G · A · B · C</span>
      </div>

      <SubHeader>{t("escalas.minorTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {escalasMinor.before}
        <span className="mono bg-stone-900 text-stone-50 px-2 py-0.5">
          {escalasMinor.formula}
        </span>
        {escalasMinor.middle}
        <em>{escalasMinor.em}</em>
        {escalasMinor.after}
      </p>
      <div className="flex gap-2 items-center mb-8 flex-wrap">
        <button
          onClick={() => playSequence(MINOR_SCALE_A, 0.3)}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
        >
          {t("common.playScale")}
        </button>
        <span className="mono text-sm">A · B · C · D · E · F · G · A</span>
      </div>

      <SubHeader>{t("escalas.threeFormsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.threeFormsP")}</p>
      <div className="space-y-3 mb-8">
        {MINOR_FORMS.map((f) => (
          <div
            key={f.id}
            className="border border-stone-300 p-3 flex items-center gap-3 flex-wrap bg-white"
          >
            <button
              onClick={() => playSequence(f.notes, 0.3)}
              className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
            >
              ▸
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="display text-lg font-bold">
                  {t(`data.scales.minorForms.${f.id}.name`)}
                </span>
                <span className="mono text-xs bg-stone-200 px-1.5">{f.formula}</span>
              </div>
              <p className="text-sm text-stone-600 italic">
                {t(`data.scales.minorForms.${f.id}.note`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SubHeader>{t("escalas.catalogTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.catalogP")}</p>
      {SCALE_FAMILIES.map((famId) => {
        const items = SCALE_CATALOG.filter((s) => s.familyId === famId);
        if (!items.length) return null;
        return (
          <div key={famId} className="mb-6">
            <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
              {t(`data.scales.familyLabels.${famId}`)}
            </p>
            <div className="space-y-2">
              {items.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start gap-3 border-b border-stone-200 pb-2 flex-wrap"
                >
                  <button
                    onClick={() => playSequence(s.notes, 0.25)}
                    className="note-btn mono text-xs border border-stone-900 px-2 py-1 shrink-0"
                  >
                    ▸
                  </button>
                  <span className="serif font-semibold w-56 shrink-0">
                    {t(`data.scales.catalog.${s.id}.name`)}
                  </span>
                  <span className="mono text-xs bg-stone-200 px-1.5">
                    {s.formula}
                  </span>
                  <span className="text-sm text-stone-600 italic flex-1 min-w-[200px]">
                    {t(`data.scales.catalog.${s.id}.note`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <SubHeader>{t("escalas.mmModesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.mmModesP")}</p>
      <div className="space-y-2 mb-8">
        {MM_MODES.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <button
              onClick={() => playSequence(m.notes, 0.25)}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1 shrink-0"
            >
              ▸
            </button>
            <span className="serif font-semibold w-44 shrink-0">
              {t(`data.scales.mmModes.${m.id}.name`)}
            </span>
            <span className="mono text-xs bg-stone-200 px-1.5">{m.formula}</span>
            <span className="text-sm text-stone-600 italic flex-1 min-w-[200px]">
              {t(`data.scales.mmModes.${m.id}.use`)}
            </span>
          </div>
        ))}
      </div>

      <SubHeader>{t("escalas.hmModesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("escalas.hmModesP")}</p>
      <div className="space-y-2 mb-8">
        {HM_MODES.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-3 border-b border-stone-200 pb-2 flex-wrap"
          >
            <button
              onClick={() => playSequence(m.notes, 0.25)}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1 shrink-0"
            >
              ▸
            </button>
            <span className="serif font-semibold w-44 shrink-0">
              {t(`data.scales.hmModes.${m.id}.name`)}
            </span>
            <span className="mono text-xs bg-stone-200 px-1.5">{m.formula}</span>
            <span className="text-sm text-stone-600 italic flex-1 min-w-[200px]">
              {t(`data.scales.hmModes.${m.id}.use`)}
            </span>
          </div>
        ))}
      </div>

      <SubHeader>{t("escalas.relativeParallelTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("escalas.relativeParallelP")}
      </p>
      <div className="space-y-3 mb-8">
        <div className="border border-stone-300 p-3 bg-white">
          <p className="mono text-xs mb-2">{t("escalas.relativeLabel")}</p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => playSequence(relA.notes, 0.3)}
              className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
            >
              ▸ {t("data.scales.relativeParallel.relative.a.name")}
            </button>
            <button
              onClick={() => playSequence(relB.notes, 0.3)}
              className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
            >
              ▸ {t("data.scales.relativeParallel.relative.b.name")}
            </button>
          </div>
        </div>
        <div className="border border-stone-300 p-3 bg-white">
          <p className="mono text-xs mb-2">{t("escalas.parallelLabel")}</p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => playSequence(parA.notes, 0.3)}
              className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
            >
              ▸ {t("data.scales.relativeParallel.parallel.a.name")}
            </button>
            <button
              onClick={() => playSequence(parB.notes, 0.3)}
              className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
            >
              ▸ {t("data.scales.relativeParallel.parallel.b.name")}
            </button>
          </div>
        </div>
      </div>

      <InfoBox label={t("escalas.discoveryLabel")}>
        {escalasDiscovery.before}
        <em>{escalasDiscovery.em}</em>
        {escalasDiscovery.after}
      </InfoBox>

      <Quiz
        title={t("escalas.quizTitle")}
        prompt={t("escalas.quizPrompt")}
        pool={quizPool}
      />

      <PracticalApp>
        {escalasApp.before}
        <em>{escalasApp.em1}</em>
        {escalasApp.middle}
        <em>{escalasApp.em2}</em>
        {escalasApp.after}
      </PracticalApp>
    </section>
  );
}
