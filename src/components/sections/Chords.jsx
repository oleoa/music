import { useMemo } from "react";
import { useT } from "../../i18n/I18nContext.jsx";
import { useAudio } from "../../audio/AudioContext.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import SubHeader from "../ui/SubHeader.jsx";
import PracticalApp from "../ui/PracticalApp.jsx";
import Quiz from "../ui/Quiz.jsx";
import {
  TRIADS,
  SIXTH_CHORDS,
  SEVENTH_CHORDS,
  ADD_CHORDS,
  EXTENDED_CHORDS,
  ALTERED_DOMINANTS,
  SLASH_CHORDS,
  POLYCHORDS,
  TRIAD_INVERSIONS,
  TETRAD_INVERSIONS,
} from "../../data/chords.js";

function ChordRow({ chord, name, mood, note, onPlay }) {
  return (
    <div className="border border-stone-300 p-4 flex items-center gap-4 bg-white">
      <button
        onClick={() => onPlay(chord.notes)}
        className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0"
        aria-label={chord.symbol}
      >
        ▸
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          {name && (
            <span className="display text-lg font-bold">{name}</span>
          )}
          <span className="mono text-sm bg-stone-900 text-stone-50 px-2 py-0.5">
            {chord.symbol}
          </span>
          {chord.formula && (
            <span className="mono text-xs text-stone-500">{chord.formula}</span>
          )}
        </div>
        {mood && (
          <p className="text-sm text-stone-600 italic mt-1">{mood}</p>
        )}
        {note && (
          <p className="text-sm text-stone-600 italic mt-1">{note}</p>
        )}
      </div>
    </div>
  );
}

function renderNamedRow(c, bucket, t, playChord) {
  return (
    <ChordRow
      key={c.id}
      chord={c}
      name={t(`data.chords.${bucket}.${c.id}.name`)}
      mood={t(`data.chords.${bucket}.${c.id}.mood`)}
      onPlay={(n) => playChord(n, "2n")}
    />
  );
}

function renderNoteRow(c, bucket, t, playChord) {
  return (
    <ChordRow
      key={c.id}
      chord={c}
      note={t(`data.chords.${bucket}.${c.id}.note`)}
      onPlay={(n) => playChord(n, "2n")}
    />
  );
}

export default function Chords() {
  const { t } = useT();
  const { playChord } = useAudio();
  const acordesP1 = t("acordes.p1");
  const inversoesP = t("acordes.inversionsP");
  const acordesApp = t("acordes.practicalApp");
  const tertianTable = t("acordes.tertianTable");
  const tertianHeaders = t("acordes.tertianTableHeaders");

  const quizPool = useMemo(() => {
    const items = [
      { id: "maj", from: TRIADS },
      { id: "min", from: TRIADS },
      { id: "dim", from: TRIADS },
      { id: "aug", from: TRIADS },
      { id: "maj7", from: SEVENTH_CHORDS },
      { id: "dom7", from: SEVENTH_CHORDS },
      { id: "min7", from: SEVENTH_CHORDS },
      { id: "m7b5", from: SEVENTH_CHORDS },
    ];
    return items.map((it) => {
      const c = it.from.find((x) => x.id === it.id);
      return {
        label: t(`data.chords.quizLabels.${it.id}`),
        play: () => playChord(c.notes, "2n"),
      };
    });
  }, [playChord, t]);

  return (
    <section>
      <SectionHeader paragraph={t("acordes.paragraph")}>
        {t("acordes.heading")}
      </SectionHeader>
      <p className="text-lg leading-relaxed mb-6">
        {acordesP1.before}
        <em>{acordesP1.em1}</em>
        {acordesP1.middle}
        <em>{acordesP1.em2}</em>
        {acordesP1.after}
      </p>

      <SubHeader>{t("acordes.tertianTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.tertianP")}</p>
      <div className="overflow-x-auto mb-8">
        <table className="mono text-sm w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-900">
              {tertianHeaders.map((h) => (
                <th key={h} className="text-left p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tertianTable.map((r, i) => (
              <tr key={i} className="border-b border-stone-200">
                <td className="p-2">{r.stack}</td>
                <td className="p-2">{r.chord}</td>
                <td className="p-2">{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SubHeader>{t("acordes.triadesTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.triadesP")}</p>
      <div className="space-y-3 mb-8">
        {TRIADS.map((c) => renderNamedRow(c, "triads", t, playChord))}
      </div>

      <SubHeader>{t("acordes.sixthTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.sixthP")}</p>
      <div className="space-y-3 mb-8">
        {SIXTH_CHORDS.map((c) => renderNamedRow(c, "sixth", t, playChord))}
      </div>

      <SubHeader>{t("acordes.sevenTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.sevenP")}</p>
      <div className="space-y-3 mb-8">
        {SEVENTH_CHORDS.map((c) => renderNamedRow(c, "seventh", t, playChord))}
      </div>

      <SubHeader>{t("acordes.addTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.addP")}</p>
      <div className="space-y-3 mb-8">
        {ADD_CHORDS.map((c) => renderNamedRow(c, "add", t, playChord))}
      </div>

      <SubHeader>{t("acordes.extendedTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.extendedP")}</p>
      <div className="space-y-3 mb-8">
        {EXTENDED_CHORDS.map((c) => renderNamedRow(c, "extended", t, playChord))}
      </div>

      <SubHeader>{t("acordes.alteredTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.alteredP")}</p>
      <div className="space-y-3 mb-8">
        {ALTERED_DOMINANTS.map((c) => renderNoteRow(c, "altered", t, playChord))}
      </div>

      <SubHeader>{t("acordes.slashTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.slashP")}</p>
      <div className="space-y-3 mb-8">
        {SLASH_CHORDS.map((c) => renderNoteRow(c, "slash", t, playChord))}
      </div>

      <SubHeader>{t("acordes.polychordTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">{t("acordes.polychordP")}</p>
      <div className="space-y-3 mb-8">
        {POLYCHORDS.map((c) => {
          const label = t(`data.chords.polychords.${c.id}.label`);
          const note = t(`data.chords.polychords.${c.id}.note`);
          return (
            <div
              key={c.id}
              className="border border-stone-300 p-4 flex items-center gap-4 bg-white"
            >
              <button
                onClick={() => playChord(c.notes, "2n")}
                className="note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0"
              >
                ▸
              </button>
              <div className="flex-1 min-w-0">
                <span className="mono text-sm">{label}</span>
                <p className="text-sm text-stone-600 italic mt-1">{note}</p>
              </div>
            </div>
          );
        })}
      </div>

      <SubHeader>{t("acordes.inversionsTitle")}</SubHeader>
      <p className="text-lg leading-relaxed mb-4">
        {inversoesP.before}
        <em>{inversoesP.em}</em>
        {inversoesP.after}
      </p>

      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {t("acordes.triadInvLabel")}
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {TRIAD_INVERSIONS.map((inv) => (
          <button
            key={inv.id}
            onClick={() => playChord(inv.notes, "2n")}
            className="note-btn border-2 border-stone-900 p-3 text-center"
          >
            <p className="display font-bold">
              {t(`data.chords.triadInversions.${inv.id}.label`)}
            </p>
            <p className="mono text-xs">{inv.short}</p>
          </button>
        ))}
      </div>

      <p className="mono text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {t("acordes.tetradInvLabel")}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {TETRAD_INVERSIONS.map((inv) => (
          <button
            key={inv.id}
            onClick={() => playChord(inv.notes, "2n")}
            className="note-btn border-2 border-stone-900 p-3 text-center"
          >
            <p className="display font-bold text-sm">
              {t(`data.chords.tetradInversions.${inv.id}.label`)}
            </p>
            <p className="mono text-xs">{inv.short}</p>
            <p className="mono text-[10px] text-stone-500 mt-1">{inv.figured}</p>
          </button>
        ))}
      </div>
      <p className="text-xs italic text-stone-600 mb-8">
        {t("acordes.figuredCaption")}
      </p>

      <Quiz
        title={t("acordes.quizTitle")}
        prompt={t("acordes.quizPrompt")}
        pool={quizPool}
      />

      <PracticalApp>
        {acordesApp.before}
        <span className="mono">{acordesApp.scaler}</span>
        {acordesApp.middle1}
        <span className="mono">{acordesApp.chordTrack}</span>
        {acordesApp.middle2}
        <span className="mono">{acordesApp.ableton}</span>
        {acordesApp.after}
      </PracticalApp>
    </section>
  );
}
