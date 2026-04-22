export default function SectionHeader({ paragraph, children }) {
  return (
    <>
      <p className="mono text-xs uppercase tracking-widest text-stone-500 mb-2">
        {paragraph}
      </p>
      <h2 className="display text-5xl md:text-6xl font-black leading-none mb-8 tracking-tight">
        {children}
      </h2>
    </>
  );
}
