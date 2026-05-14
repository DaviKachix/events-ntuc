export default function Title({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <h1 className={`${sizes[size]} font-semibold text-[#1f3a5f]`}>
      {children}
    </h1>
  );
}