"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://157.180.17.101:5001/api/v1";

type Event = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [type, setType] = useState<"individual" | "team" | null>(null);
  const [message, setMessage] = useState("");

  // 1. LOAD EVENT DETAILS
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/events/${slug}`);
        const json = await res.json();

        setEvent(json.data || json);
      } catch (err) {
        setMessage("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  // 2. CREATE SESSION
  const createSession = async (selectedType: "individual" | "team") => {
    try {
      setCreating(true);
      setType(selectedType);
      setMessage("");

      const res = await fetch(`${API}/registrations/session/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_slug: slug,
          type: selectedType,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create session");
      }

      router.push(
        `/events/${slug}/register?session=${json.session_uuid}&type=${selectedType}`
      );
    } catch (err: any) {
      setMessage(err.message || "Error occurred");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">

      <div className="bg-white border rounded-2xl shadow-sm p-6 w-full max-w-md">

        {/* LOADING STATE */}
        {loading && (
          <p className="text-sm text-slate-500">Loading event...</p>
        )}

        {/* EVENT INFO */}
        {event && (
          <>
            <h1 className="text-xl font-bold">
              {event.title}
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              {event.description}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Date: {new Date(event.date).toDateString()}
            </p>
          </>
        )}

        {/* ERROR */}
        {message && (
          <p className="mt-3 text-sm text-red-500">
            {message}
          </p>
        )}

        {/* ACTIONS */}
        <div className="mt-6 space-y-3">

          <button
            onClick={() => createSession("individual")}
            disabled={creating}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {creating && type === "individual"
              ? "Creating..."
              : "Register as Individual"}
          </button>

          <button
            onClick={() => createSession("team")}
            disabled={creating}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {creating && type === "team"
              ? "Creating..."
              : "Register as Team (Max 5 Members)"}
          </button>

        </div>

        <p className="mt-4 text-xs text-slate-400 text-center">
          You will continue to participant registration after this step.
        </p>

      </div>
    </div>
  );
}