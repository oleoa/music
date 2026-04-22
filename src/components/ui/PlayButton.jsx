const VARIANTS = {
  small: "mono text-xs border border-stone-900 px-2 py-1",
  default: "note-btn mono text-xs border border-stone-900 px-2 py-1",
  large: "note-btn mono text-sm border-2 border-stone-900 px-3 py-2 shrink-0",
  scaleBig:
    "mono text-xs border-2 border-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-stone-50",
};

export default function PlayButton({
  onClick,
  variant = "default",
  label = "▸",
  className = "",
  disabled = false,
  ariaLabel = "play",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${VARIANTS[variant] ?? VARIANTS.default} note-btn ${className}`}
    >
      {label}
    </button>
  );
}
