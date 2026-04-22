import { useState, useMemo, useCallback } from "react";
import { useT } from "../../i18n/I18nContext.jsx";

function pickRandom(arr, n, exclude) {
  const pool = arr.filter((x) => x !== exclude);
  const out = [];
  const used = new Set();
  while (out.length < n && used.size < pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    if (used.has(i)) continue;
    used.add(i);
    out.push(pool[i]);
  }
  return out;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Quiz — generic ear-training widget.
 *
 * Props:
 *  - title: heading
 *  - prompt: instruction text
 *  - pool: array of { label, play: () => void }   the universe of options
 */
export default function Quiz({ title, prompt, pool }) {
  const { t } = useT();
  const [target, setTarget] = useState(() => pool[Math.floor(Math.random() * pool.length)]);
  const [choices, setChoices] = useState(() => {
    const distractors = pickRandom(pool, 3, target);
    return shuffle([target, ...distractors]);
  });
  const [answered, setAnswered] = useState(null);
  const [streak, setStreak] = useState(0);

  const newQuestion = useCallback(() => {
    const next = pool[Math.floor(Math.random() * pool.length)];
    const distractors = pickRandom(pool, 3, next);
    setTarget(next);
    setChoices(shuffle([next, ...distractors]));
    setAnswered(null);
    next.play();
  }, [pool]);

  const replay = useCallback(() => {
    target.play();
  }, [target]);

  const choose = useCallback(
    (option) => {
      if (answered) return;
      const correct = option.label === target.label;
      setAnswered({ option, correct });
      setStreak((s) => (correct ? s + 1 : 0));
    },
    [answered, target],
  );

  const showAnswer = useCallback(() => {
    setAnswered({ option: target, correct: false, revealed: true });
    setStreak(0);
  }, [target]);

  const layout = useMemo(() => choices, [choices]);

  return (
    <div className="border-2 border-stone-900 p-5 my-8 bg-white">
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <p className="mono text-[10px] uppercase tracking-widest text-stone-500">
          {title ?? t("common.quizTitle")}
        </p>
        <p className="mono text-[10px] uppercase tracking-widest text-stone-500">
          {t("common.streak")}: {streak}
        </p>
      </div>
      <p className="text-base leading-relaxed mb-4">
        {prompt ?? t("common.quizPrompt")}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={replay}
          className="mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50"
        >
          {t("common.replay")}
        </button>
        <button
          onClick={newQuestion}
          className="mono text-xs border border-stone-400 text-stone-600 px-3 py-1.5 hover:border-stone-900 hover:text-stone-900"
        >
          {t("common.nextQuestion")}
        </button>
        <button
          onClick={showAnswer}
          className="mono text-xs border border-stone-400 text-stone-600 px-3 py-1.5 hover:border-stone-900 hover:text-stone-900"
        >
          {t("common.showAnswer")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {layout.map((opt) => {
          const isCorrect = answered && opt.label === target.label;
          const isWrongPick =
            answered && answered.option === opt && !answered.correct;
          const cls = isCorrect
            ? "border-emerald-700 bg-emerald-50"
            : isWrongPick
              ? "border-red-700 bg-red-50"
              : "border-stone-300 hover:border-stone-900";
          return (
            <button
              key={opt.label}
              onClick={() => choose(opt)}
              disabled={Boolean(answered)}
              className={`mono text-sm text-left border-2 ${cls} px-3 py-2 transition-colors`}
            >
              {opt.label}
              {isCorrect && (
                <span className="float-right mono text-[10px] uppercase">
                  ✓ {t("common.correct")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <p className="mono text-xs mt-4 text-stone-600">
          {answered.correct
            ? t("common.correct")
            : answered.revealed
              ? `${target.label}`
              : t("common.incorrect")}
        </p>
      )}
    </div>
  );
}
