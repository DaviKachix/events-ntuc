"use client";

export default function EventCTA({ event }: any) {
  const handleRegister = () => {
    alert("Registration flow coming soon");
  };

  return (
    <section className="bg-[#1f3a5f] text-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="text-lg font-semibold">
          Register for this Event
        </h2>

        <p className="text-sm text-gray-300">
          Secure your participation in {event?.title}
        </p>
      </div>

      <button
        onClick={handleRegister}
        className="bg-green-500 px-5 py-2 rounded-lg hover:opacity-90 transition"
      >
        Register Now
      </button>
    </section>
  );
}