import { useAudio } from "../../audio/AudioContext.jsx";

const WHITE_NAMES = ["C", "D", "E", "F", "G", "A", "B"];

const BLACK_DATA = [
  { name: "C#", afterWhite: 0 },
  { name: "D#", afterWhite: 1 },
  { name: "F#", afterWhite: 3 },
  { name: "G#", afterWhite: 4 },
  { name: "A#", afterWhite: 5 },
];

function buildKeys(startOctave, octaves) {
  const whites = [];
  for (let o = 0; o < octaves; o += 1) {
    WHITE_NAMES.forEach((n) =>
      whites.push({ note: `${n}${startOctave + o}`, label: n }),
    );
  }
  whites.push({ note: `C${startOctave + octaves}`, label: "C" });

  const blacks = [];
  for (let o = 0; o < octaves; o += 1) {
    BLACK_DATA.forEach((b) => {
      blacks.push({
        note: `${b.name}${startOctave + o}`,
        whiteIndex: o * 7 + b.afterWhite,
      });
    });
  }
  return { whites, blacks };
}

export default function Piano({
  startOctave = 4,
  octaves = 1,
  highlight = [],
  onKeyClick,
  height = "h-40",
}) {
  const { playNote } = useAudio();
  const { whites, blacks } = buildKeys(startOctave, octaves);
  const whiteCount = whites.length;
  const whiteWidthPct = 100 / whiteCount;

  const handleClick = (note) => {
    if (onKeyClick) onKeyClick(note);
    else playNote(note, "4n");
  };

  const isHighlighted = (note) =>
    highlight.includes(note) || highlight.includes(note.replace(/\d+$/, ""));

  return (
    <div
      className={`relative flex ${height} mb-8 border-2 border-stone-900 select-none`}
    >
      {whites.map((k) => (
        <button
          key={k.note}
          onMouseDown={() => handleClick(k.note)}
          className={`piano-key white flex-1 flex items-end justify-center pb-2 mono text-[10px] font-semibold ${
            isHighlighted(k.note)
              ? "bg-amber-200 text-stone-900"
              : "text-stone-600"
          }`}
          aria-label={k.note}
        >
          {k.note}
        </button>
      ))}
      <div className="absolute inset-0 pointer-events-none">
        {blacks.map((k) => (
          <button
            key={k.note}
            onMouseDown={() => handleClick(k.note)}
            className={`piano-key black absolute top-0 h-[60%] pointer-events-auto ${
              isHighlighted(k.note) ? "bg-amber-500" : ""
            }`}
            style={{
              left: `${(k.whiteIndex + 0.72) * whiteWidthPct}%`,
              width: `${whiteWidthPct * 0.55}%`,
            }}
            aria-label={k.note}
          />
        ))}
      </div>
    </div>
  );
}
