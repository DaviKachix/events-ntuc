"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Event = {
  id: number;
  title: string;
  description: string;
  slug: string;
  event_type: string;
};

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Event>({
    id: 0,
    title: "",
    description: "",
    slug: "",
    event_type: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load event");

      setForm(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          event_type: form.event_type,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      router.push("/dashboard/events");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <p className="text-muted">Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">

      <div className="card" style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ padding: "20px", borderBottom: "1px solid var(--border)" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--denim)" }}>
            Edit Event
          </h1>
          <p className="text-muted" style={{ fontSize: "13px", marginTop: "4px" }}>
            Update event information
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              margin: "16px",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#b91c1c",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleUpdate} style={{ padding: "20px" }}>

          {/* TITLE */}
          <div style={{ marginBottom: "14px" }}>
            <label className="stat-label">Event Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full"
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "14px",
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: "14px" }}>
            <label className="stat-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "14px",
              }}
            />
          </div>

          {/* SLUG (read-only optional) */}
          <div style={{ marginBottom: "14px" }}>
            <label className="stat-label">Slug</label>
            <input
              name="slug"
              value={form.slug}
              disabled
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "14px",
                background: "var(--surface-2)",
                color: "var(--muted)",
              }}
            />
          </div>

          {/* TYPE */}
          <div style={{ marginBottom: "20px" }}>
            <label className="stat-label">Event Type</label>
            <select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "14px",
              }}
            >
              <option value="">Select type</option>
              <option value="conference">Conference</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => router.back()}
              style={{ flex: 1 }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Event"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}