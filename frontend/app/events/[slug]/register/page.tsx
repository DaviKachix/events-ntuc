"use client";

import { use, useMemo, useState } from "react";

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

const API = "http://157.180.17.101:5001/api/v1";

const AGE_GROUPS = [
  { label: "Adventurers (6–9)", value: "Adventurers" },
  { label: "Pathfinders (10–15)", value: "Pathfinders" },
  { label: "Ambassadors (16–21)", value: "Ambassadors" },
  { label: "AY (22+)", value: "AY" },
];

const ROLES = [
  "Director",
  "Teacher",
  "Masterguide",
  "Senior Youth Leader",
  "Member",
];

const CONFERENCES = [
  "Tanzania Rift Valley Field",
  "Nyanza Gold Belt Field",
  "South Nyanza Conference",
  "Mara Conference",
  "Western Tanzania Conference",
];

export default function Register({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [type, setType] = useState<"individual" | "team" | null>(null);
  const [sessionUuid, setSessionUuid] = useState<string | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [form, setForm] = useState<Participant>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  // SAFE FLOW STATE
  const canStart = !!sessionUuid && !!type;

  const isReview = useMemo(() => {
    if (!sessionUuid || !type) return false;

    if (type === "individual") return participants.length >= 1;

    if (type === "team") return participants.length > 0;

    return false;
  }, [sessionUuid, type, participants]);

  // CREATE SESSION
  const createSession = async (selectedType: "individual" | "team") => {
    try {
      setLoading(true);
      setType(selectedType);

      const res = await fetch(`${API}/registrations/session/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_slug: slug,
          type: selectedType,
        }),
      });

      const data = await res.json();

      if (!data.session_uuid) throw new Error("Session failed");

      setSessionUuid(data.session_uuid);
      setParticipants([]);
      setForm(EMPTY_FORM);
    } finally {
      setLoading(false);
    }
  };

  // ADD PARTICIPANT
  const addParticipant = async () => {
    if (!sessionUuid || !type) return;

    if (!form.full_name || !form.phone) {
      alert("Name and phone required");
      return;
    }

    if (type === "team" && participants.length >= 5) {
      alert("Max 5 members allowed");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/registrations/session/${sessionUuid}/participant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed");

      setParticipants((prev) => [...prev, form]);
      setForm(EMPTY_FORM);
    } catch {
      alert("Error adding participant");
    } finally {
      setLoading(false);
    }
  };

  const proceedToPayment = () => {
    alert(`Proceeding to payment for session ${sessionUuid}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 flex justify-center p-6">

      <div className="w-full max-w-2xl space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            SDA Event Registration
          </h1>
          <p className="text-sm text-slate-500">
            Event: <span className="font-semibold">{slug}</span>
          </p>
        </div>

        {/* STEP 1: CHOOSE TYPE */}
        {!sessionUuid && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">

            <h2 className="text-center font-semibold">
              Select Registration Type
            </h2>

            <button
              disabled={loading}
              onClick={() => createSession("individual")}
              className="w-full bg-sky-600 text-white py-3 rounded-xl"
            >
              Register Yourself
            </button>

            <button
              disabled={loading}
              onClick={() => createSession("team")}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl"
            >
              Register Your Members
            </button>
          </div>
        )}

        {/* STEP 2: FORM */}
        {canStart && !isReview && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">

            <h2 className="font-semibold">
              Add Participant {type === "team" ? `(${participants.length}/5)` : ""}
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

            <select
              className="input"
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              className="input"
              onChange={(e) => {
                const val = e.target.value;
                setForm({
                  ...form,
                  age_group: val,
                  club: val,
                });
              }}
            >
              <option>Select Age Group</option>
              {AGE_GROUPS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>

            <select
              className="input"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option>Role</option>
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <input
              className="input"
              placeholder="Church"
              onChange={(e) =>
                setForm({ ...form, church: e.target.value })
              }
            />

            <select
              className="input"
              onChange={(e) =>
                setForm({
                  ...form,
                  conference_field: e.target.value,
                })
              }
            >
              <option>Select Conference</option>
              {CONFERENCES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              className="input"
              placeholder="Health / Allergies"
              onChange={(e) =>
                setForm({ ...form, health_notes: e.target.value })
              }
            />

            <button
              onClick={addParticipant}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Add Member
            </button>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {isReview && sessionUuid && type && (
          <div className="bg-white p-6 rounded-2xl shadow text-center space-y-3">

            <h2 className="font-semibold">Review Registration</h2>

            <p>
              Session: <b>{sessionUuid}</b>
            </p>

            <p>
              Type: <b>{type}</b>
            </p>

            <p>
              Total Members: <b>{participants.length}</b>
            </p>

            <button
              onClick={proceedToPayment}
              className="w-full bg-green-600 text-white py-3 rounded-xl"
            >
              Proceed to Payment
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid #bae6fd;
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
}