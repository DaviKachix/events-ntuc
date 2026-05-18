"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

type Participant = {
  full_name: string;
  gender: string;
  phone: string;
  age_group: string;
  club: string;
  role: string;
  church: string;
  conference_field: string;
  allergies: string;
  health_notes: string;
};

const EMPTY_FORM: Participant = {
  full_name: "",
  gender: "",
  phone: "",
  age_group: "",
  club: "",
  role: "",
  church: "",
  conference_field: "",
  allergies: "",
  health_notes: "",
};

const API = "https://157.180.17.101:8443/api/v1";

// SAFE FETCH WRAPPER (IMPORTANT FIX)
async function apiFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (err: any) {
    // THIS catches NetworkError (your main issue)
    throw new Error("Network error or server unreachable");
  }
}

export default function Register() {
  const params = useParams();

  const slug = useMemo(() => {
    const s = params?.slug;
    return Array.isArray(s) ? s[0] : s || "";
  }, [params]);

  const [type, setType] = useState<"individual" | "team" | null>(null);
  const [sessionUuid, setSessionUuid] = useState<string | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [form, setForm] = useState<Participant>(EMPTY_FORM);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canAdd = !!sessionUuid && !!type;

  const isReview = useMemo(() => {
    if (!sessionUuid || !type) return false;
    return type === "individual"
      ? participants.length >= 1
      : participants.length > 0;
  }, [sessionUuid, type, participants]);

  // -------------------------
  // CREATE SESSION
  // -------------------------
  const createSession = async (selectedType: "individual" | "team") => {
    if (!slug) {
      setError("Missing event slug");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await apiFetch(
        `${API}/registrations/session/create`,
        {
          method: "POST",
          body: JSON.stringify({
            event_slug: slug,
            type: selectedType,
          }),
        }
      );

      if (!data.session_uuid) {
        throw new Error("Invalid session response");
      }

      setType(selectedType);
      setSessionUuid(data.session_uuid);
      setParticipants([]);
      setForm(EMPTY_FORM);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // ADD PARTICIPANT
  // -------------------------
  const addParticipant = async () => {
    if (!canAdd) return;

    if (!form.full_name || !form.phone) {
      setError("Full name and phone required");
      return;
    }

    if (type === "team" && participants.length >= 5) {
      setError("Max 5 members allowed");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await apiFetch(
        `${API}/registrations/session/${sessionUuid}/participant`,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      setParticipants((prev) => [...prev, form]);
      setForm(EMPTY_FORM);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">

        <div className="text-center">
          <h1 className="text-xl font-bold">Event Registration</h1>
          <p className="text-sm text-slate-500">Slug: {slug || "missing"}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {!sessionUuid && (
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <h2 className="font-semibold text-center">
              Choose Registration Type
            </h2>

            <button
              disabled={loading || !slug}
              onClick={() => createSession("individual")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl disabled:opacity-50"
            >
              {loading && type === "individual"
                ? "Creating..."
                : "Register Yourself"}
            </button>

            <button
              disabled={loading || !slug}
              onClick={() => createSession("team")}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl disabled:opacity-50"
            >
              {loading && type === "team"
                ? "Creating..."
                : "Register Team"}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {canAdd && !isReview && (
          <div className="bg-white p-6 rounded-xl shadow space-y-3">

            <h2 className="font-semibold">
              Add Participant ({participants.length}/5)
            </h2>

            <input
              className="input"
              placeholder="Full Name"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <button
              onClick={addParticipant}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Participant"}
            </button>

          </div>
        )}

        {/* STEP 3 */}
        {isReview && (
          <div className="bg-white p-6 rounded-xl shadow text-center space-y-3">
            <h2 className="font-semibold">Review</h2>

            <p>Session: {sessionUuid}</p>
            <p>Type: {type}</p>
            <p>Total: {participants.length}</p>

            <button className="w-full bg-green-600 text-white py-3 rounded-xl">
              Proceed
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}