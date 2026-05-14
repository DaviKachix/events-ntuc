export default function Button({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "denim" | "ghost";
  className?: string;
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm";

  const styles = {
    primary: "bg-green-500 text-white hover:opacity-90",
    denim: "bg-[#1f3a5f] text-white hover:bg-[#16263d]",
    ghost: "bg-transparent text-[#1f3a5f] hover:bg-gray-100",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}