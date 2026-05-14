export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}