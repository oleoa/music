export default function SubHeader({ children, className = "" }) {
  return (
    <h3
      className={`display text-2xl font-bold mb-3 mt-10 tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}
