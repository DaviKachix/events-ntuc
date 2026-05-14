export default function EventCard({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
      <h2 className="font-semibold text-lg text-dark">{title}</h2>

      <p className="text-sm text-muted mt-1">{type}</p>

      <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
        View Event
      </button>
    </div>
  );
}