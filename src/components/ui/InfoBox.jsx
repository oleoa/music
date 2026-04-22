export default function InfoBox({ label, children, tone = "default" }) {
  const bg = tone === "dark" ? "bg-stone-900 text-stone-50" : "bg-stone-100";
  const labelColor = tone === "dark" ? "text-stone-400" : "text-stone-500";
  return (
    <div className={`border-l-4 border-stone-900 pl-5 py-2 my-6 ${bg}`}>
      {label && (
        <p
          className={`mono text-[10px] uppercase tracking-widest ${labelColor} mb-2`}
        >
          {label}
        </p>
      )}
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}
