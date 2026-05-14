import Link from "next/link";

export default function AppLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[#1f3a5f] hover:text-green-500 transition"
    >
      {children}
    </Link>
  );
}