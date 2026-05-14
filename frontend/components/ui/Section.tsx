export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white p-6 rounded-xl border ${className}`}>
      {children}
    </section>
  );
}