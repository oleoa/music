import { useMemo } from "react";
import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import InfoBox from "../ui/InfoBox.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import Quiz from "../ui/Quiz.jsx";
import {
  SIMPLE_INTERVALS,
  COMPOUND_INTERVALS,
  CONSONANCE_TIERS,
  ENHARMONIC_PAIRS,
} from "../../data/intervals.js";

export default function Intervals() {
  const { t } = useT();
  const { playSequence, playChord, playInterval } = useAudio();
  const intervP1 = t("intervalos.p1");
  const earTrickBody = t("intervalos.earTrickBody");
  const anatomyTable = t("intervalos.anatomyTable");
  const inversionRules = t("intervalos.inversionRules");
  const ratiosTable = t("intervalos.ratiosTable");
  const ratiosHeaders = t("intervalos.ratiosTableHeaders");

  const quizPool = useMemo(
    () =>
      SIMPLE_INTERVALS.map((iv) => {
        const name = t(`data.intervals.simple.${iv.id}.name`);
        return {
          label: `${name} (${iv.short})`,
          play: () => playInterval("C4", iv.target, "asc"),
        };
      }),
    [playInterval, t],
  );

  return (
    <section>
      <SectionHeader paragraph={t("intervalos.paragraph")}>
        {t("intervalos.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">
        {intervP1.before}
        <em>{intervP1.em}</em>
        {intervP1.after}
      </p>

      <SubHeader>{t("intervalos.anatomyTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("intervalos.anatomyP")}</p>
      <div className="overflow-x-auto mb-6">
        <table className="mono text-sm w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-900">
              {anatomyTable.headers.map((h) => (
                <th key={h} className="text-left p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {anatomyTable.rows.map((r, i) => (
              <tr key={i} className="border-b border-stone-200">
                <td className="p-2">{r.q}</td>
                <td className="p-2">{r.s}</td>
                <td className="p-2">{r.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeader>{t("intervalos.listTitle")}</SubHeader>
      <p className="text-base leading-relaxed mb-2">{t("intervalos.listP")}</p>
      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
        {t("intervalos.listLegend")}
      </p>
      <div className="space-y-2 mb-8">
        {SIMPLE_INTERVALS.map((iv) => {
          const name = t(`data.intervals.simple.${iv.id}.name`);
          const asc = t(`data.intervals.simple.${iv.id}.asc`);
          const desc = t(`data.intervals.simple.${iv.id}.desc`);
          const char = t(`data.intervals.simple.${iv.id}.char`);
          return (
            <div key={iv.id} className="border-b border-stone-200 pb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="mono text-[10px] text-stone-400 w-6">
                  {String(iv.semis).padStart(2, "0")}
                </span>
                <button
                  onClick={() => playInterval("C4", iv.target, "asc")}
                  className="note-btn mono text-xs border border-stone-900 px-2 py-1"
                  aria-label={`${name} ${t("common.asc")}`}
                >
                  ▸
                </button>
                <button
                  onClick={() => playInterval("C4", iv.target, "desc")}
                  className="note-btn mono text-[10px] border border-stone-400 px-2 py-1 text-stone-600"
                  aria-label={`${name} ${t("common.desc")}`}
                >
                  ◂
                </button>
                <button
                  onClick={() => playInterval("C4", iv.target, "harmonic")}
                  className="note-btn mono text-[10px] border border-stone-400 px-2 py-1 text-stone-600"
                  aria-label={`${name} ${t("common.harmonic")}`}
                >
                  ▾
                </button>
                <span className="serif font-semibold w-32 shrink-0">{name}</span>
                <span className="mono text-xs bg-stone-200 px-1.5">{iv.short}</span>
                <span className="mono text-xs text-stone-500">{iv.ratio}</span>
              </div>
              <p className="text-sm text-stone-600 italic ml-10 mt-1">
                {char} · {t("common.asc")}: {asc} · {t("common.desc")}: {desc}
              </p>
            </div>
          );
        })}
      </div>

      <SubHeader>{t("intervalos.inversionsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-3">
        {t("intervalos.inversionsP")}
      </p>
      <ul className="space-y-2 mb-6 text-base leading-relaxed list-disc pl-6">
        {inversionRules.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-3">
        {t("intervalos.inversionsListTitle")}
      </p>
      <div className="space-y-2 mb-4">
        {SIMPLE_INTERVALS.filter((iv) => iv.semis > 0 && iv.semis < 12).map((iv) => (
          <div key={iv.id} className="flex items-center gap-3 flex-wrap">
            <button
              onClick={async () => {
                await playInterval("C4", iv.target, "asc");
                setTimeout(
                  () => playInterval("C4", `${iv.target.replace(/\d+$/, "")}3`, "asc"),
                  1000,
                );
              }}
              className="note-btn mono text-xs border border-stone-900 px-2 py-1"
            >
              ▸
            </button>
            <span className="mono text-sm">
              {iv.short} ({iv.semis}) ↔ {iv.inversionShort} ({iv.inversionSemis})
            </span>
          </div>
        ))}
      </div>
      <p className="text-base leading-relaxed italic text-stone-600 mb-8">
        {t("intervalos.inversionsFooter")}
      </p>

      <SubHeader>{t("intervalos.compoundTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("intervalos.compoundP")}</p>
      <div className="space-y-2 mb-8">
        {COMPOUND_INTERVALS.map((iv) => {
          const name = t(`data.intervals.compound.${iv.id}.name`);
          const note = t(`data.intervals.compound.${iv.id}.note`);
          return (
            <div
              key={iv.id}
              className="flex items-center gap-3 flex-wrap border-b border-stone-200 pb-2"
            >
              <span className="mono text-[10px] text-stone-400 w-6">{iv.semis}</span>
              <button
                onClick={() => playInterval("C4", iv.target, "asc")}
                className="note-btn mono text-xs border border-stone-900 px-2 py-1"
              >
                ▸
              </button>
              <span className="serif font-semibold w-28">{name}</span>
              <span className="mono text-xs bg-stone-200 px-1.5">{iv.short}</span>
              <span className="mono text-xs text-stone-500">{iv.simple}</span>
              <span className="text-sm text-stone-600 italic">{note}</span>
            </div>
          );
        })}
      </div>

      <SubHeader>{t("intervalos.consonanceTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("intervalos.consonanceP")}</p>
      <div className="space-y-2 mb-4">
        {CONSONANCE_TIERS.map((tier) => {
          const tierLabel = t(`data.intervals.consonanceTiers.${tier.id}.tier`);
          const tierNote = t(`data.intervals.consonanceTiers.${tier.id}.note`);
          return (
            <div
              key={tier.id}
              className="flex items-start gap-3 border-b border-stone-200 pb-3"
            >
              <button
                onClick={() => playChord(tier.example, "2n")}
                className="note-btn mono text-xs border border-stone-900 px-2 py-1 mt-1 shrink-0"
              >
                ▸
              </button>
              <div>
                <p className="serif font-semibold">{tierLabel}</p>
                <p className="text-sm text-stone-600 italic">{tierNote}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-base italic text-stone-600 mb-8">
        {t("intervalos.consonanceFooter")}
      </p>

      <SubHeader>{t("intervalos.ratiosTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("intervalos.ratiosP")}</p>
      <div className="overflow-x-auto mb-4">
        <table className="mono text-sm w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-900">
              {ratiosHeaders.map((h) => (
                <th key={h} className="text-left p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ratiosTable.map((r, i) => (
              <tr key={i} className="border-b border-stone-200">
                <td className="p-2">{r.interval}</td>
                <td className="p-2">{r.ratio}</td>
                <td className="p-2 text-stone-600 italic">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-base italic text-stone-600 mb-8">
        {t("intervalos.ratiosFooter")}
      </p>

      <SubHeader>{t("intervalos.enharmonicTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("intervalos.enharmonicP")}
      </p>
      <div className="space-y-3 mb-8">
        {ENHARMONIC_PAIRS.map((p) => {
          const aName = t(`data.intervals.enharmonicPairs.${p.id}.a.name`);
          const aFrom = t(`data.intervals.enharmonicPairs.${p.id}.a.from`);
          const bName = t(`data.intervals.enharmonicPairs.${p.id}.b.name`);
          const bFrom = t(`data.intervals.enharmonicPairs.${p.id}.b.from`);
          return (
            <div key={p.id} className="border border-stone-300 p-4 bg-white">
              <p className="mono text-sm mb-2">{p.notes}</p>
              <p className="text-sm">
                <strong>{aName}</strong>
                <span className="text-stone-600 italic"> — {aFrom}</span>
              </p>
              <p className="text-sm">
                <strong>{bName}</strong>
                <span className="text-stone-600 italic"> — {bFrom}</span>
              </p>
            </div>
          );
        })}
      </div>

      <SubHeader>{t("intervalos.melodicHarmonicTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {t("intervalos.melodicHarmonicP")}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => playSequence(["C4", "G4"], 0.5)}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
        >
          ▸ {t("common.melodic")} {t("common.asc")}
        </button>
        <button
          onClick={() => playSequence(["G4", "C4"], 0.5)}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
        >
          ◂ {t("common.melodic")} {t("common.desc")}
        </button>
        <button
          onClick={() => playChord(["C4", "G4"], "2n")}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5"
        >
          ▾ {t("common.harmonic")}
        </button>
      </div>

      <InfoBox label={t("intervalos.earTrickLabel")}>
        {earTrickBody.before}
        <em>{earTrickBody.em}</em>
        {earTrickBody.after}
      </InfoBox>

      <Quiz
        title={t("intervalos.quizTitle")}
        prompt={t("intervalos.quizPrompt")}
        pool={quizPool}
      />

      <PracticalApp>{t("intervalos.practicalApp")}</PracticalApp>
    </section>
  );
}
