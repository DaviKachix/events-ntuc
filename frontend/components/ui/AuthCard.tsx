export default function AuthCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#1f3a5f] mb-4">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}