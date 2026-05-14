export default function EventDetails({ event }: any) {
  return (
    <section className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-[#1f3a5f] mb-3">
        Event Details
      </h2>

      <p className="text-gray-600 leading-relaxed">
        {event?.description}
      </p>

      {/* EXTRA INFO PLACEHOLDER */}
      <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded">
          <strong>Date:</strong> Coming soon
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <strong>Location:</strong> NTUC Main Hall
        </div>
      </div>
    </section>
  );
}