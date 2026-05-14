export default function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="p-10">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold text-dark">
          Event: {params.slug}
        </h1>

        <p className="text-muted mt-3">
          Event details will be loaded from backend API.
        </p>

        <button className="mt-6 bg-primary text-white px-5 py-2 rounded-lg">
          Register Now
        </button>
      </div>
    </div>
  );
}