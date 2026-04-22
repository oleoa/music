import { useMemo } from "react";
import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import Quiz from "../ui/Quiz.jsx";
import {
  DIATONIC_DEGREES,
  PROGRESSIONS,
  CADENCES,
  FUNCTIONAL_GROUPS,
} from "../../data/progressions.js";

export default function Progressions() {
  const { t } = useT();
  const { playProgression } = useAudio();
  const tableHeaders = t("progressoes.tableHeaders");

  const quizPool = useMemo(
    () =>
      PROGRESSIONS.slice(0, 8).map((p) => {
        const label = t(`data.progressions.progressions.${p.id}.label`);
        return {
          label: `${label} (${p.roman})`,
          play: () => playProgression(p.chords, 1.0),
        };
      }),
    [playProgression, t],
  );

  return (
    <section>
      <SectionHeader paragraph={t("progressoes.paragraph")}>
        {t("progressoes.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">{t("progressoes.p1")}</p>

      <SubHeader>{t("progressoes.degreesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("progressoes.degreesP")}</p>
      <div className="overflow-x-auto mb-6">
        <table className="mono text-sm w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-900">
              <th className="text-left p-2">{tableHeaders.grau}</th>
              <th className="text-left p-2">{tableHeaders.acorde}</th>
              <th className="text-left p-2">{tableHeaders.tipo}</th>
              <th className="text-left p-2">{tableHeaders.funcao}</th>
            </tr>
          </thead>
          <tbody>
            {DIATONIC_DEGREES.map((row) => (
              <tr key={row.id} className="border-b border-stone-200">
                <td className="p-2">{row.grau}</td>
                <td className="p-2">{row.acorde}</td>
                <td className="p-2">
                  {t(`data.progressions.diatonicDegrees.${row.id}.type`)}
                </td>
                <td className="p-2">
                  {t(`data.progressions.diatonicDegrees.${row.id}.function`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base leading-relaxed mb-8 italic text-stone-600">
        {t("progressoes.tableCaption")}
      </p>

      <SubHeader>{t("progressoes.functionalTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("progressoes.functionalP")}
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {FUNCTIONAL_GROUPS.map((g) => (
          <div key={g.id} className="border border-stone-300 p-3 bg-white">
            <p className="display font-bold text-sm mb-2">
              {t(`data.progressions.functionalGroups.${g.id}.label`)}
            </p>
            <p className="mono text-xs mb-2">{g.chords.join("  ·  ")}</p>
            <p className="text-xs text-stone-600 italic">
              {t(`data.progressions.functionalGroups.${g.id}.note`)}
            </p>
          </div>
        ))}
      </div>

      <SubHeader>{t("progressoes.progTitle")}</SubHeader>
      <p className="text-base leading-relaxed mb-4">{t("progressoes.progP")}</p>
      <div className="space-y-4 mb-8">
        {PROGRESSIONS.map((p) => (
          <div key={p.id} className="border border-stone-300 p-4 bg-white">
            <div className="flex items-start gap-3">
              <button
                onClick={() => playProgression(p.chords, 1.0)}
                className="note-btn mono text-xs border-2 border-stone-900 px-3 py-2 shrink-0"
              >
                ▸
              </button>
              <div>
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5">
                    {p.roman}
                  </span>
                  <span className="display font-bold">
                    {t(`data.progressions.progressions.${p.id}.label`)}
                  </span>
                </div>
                <p className="text-sm text-stone-600 italic">
                  {t(`data.progressions.progressions.${p.id}.desc`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubHeader>{t("progressoes.cadenciasTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("progressoes.cadenciasP")}</p>
      <ul className="space-y-3 mb-8">
        {CADENCES.map((c) => (
          <li key={c.id} className="flex gap-3 items-start">
            <button
              onClick={() => playProgression(c.chords, 1.2)}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1 shrink-0 mt-1"
            >
              ▸
            </button>
            <span className="mono text-xs bg-stone-900 text-stone-50 px-2 py-1 shrink-0 h-fit">
              {c.code}
            </span>
            <span className="text-base leading-relaxed">
              <em>{t(`data.progressions.cadences.${c.id}.name`)}.</em>{" "}
              {t(`data.progressions.cadences.${c.id}.desc`)}
            </span>
          </li>
        ))}
      </ul>

      <SubHeader>{t("progressoes.phraseTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-8">{t("progressoes.phraseP")}</p>

      <Quiz
        title={t("progressoes.quizTitle")}
        prompt={t("progressoes.quizPrompt")}
        pool={quizPool}
      />

      <PracticalApp>{t("progressoes.practicalApp")}</PracticalApp>
    </section>
  );
}
