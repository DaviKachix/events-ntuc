"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    slug: "",
    event_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

 try {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  const res = await fetch(
    "http://157.180.17.101:5001/api/v1/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }
  );

  console.log("STATUS:", res.status);

  const text = await res.text();

  console.log("RAW RESPONSE:", text);

  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(data.message || "Failed to create event");
  }

  router.push("/dashboard/events");

} catch (err: any) {
  setError(err.message);
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      
      <div className="card" style={{ maxWidth: "720px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ padding: "20px", borderBottom: "1px solid var(--border)" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--denim)" }}>
            Create Event
          </h1>
          <p className="text-muted" style={{ fontSize: "13px", marginTop: "4px" }}>
            Fill in event details to publish it to the system
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
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>

          {/* TITLE */}
          <div style={{ marginBottom: "14px" }}>
            <label className="stat-label">Event Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                outline: "none",
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
              placeholder="Event description..."
              rows={4}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* SLUG */}
          <div style={{ marginBottom: "14px" }}>
            <label className="stat-label">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="event-title-slug"
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
                background: "white",
              }}
            >
              <option value="">Select type</option>
              <option value="conference">Conference</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ACTION */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>
      </div>
    </div>
  );
}