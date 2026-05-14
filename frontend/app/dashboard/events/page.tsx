"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: number;
  title: string;
  description: string;
  slug: string;
  event_type: string;
};

export default function MyEventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/events/me/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load events");

      setEvents(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container fade-in">

      {/* HEADER */}
      <div style={{ marginBottom: "18px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--denim)" }}>
          My Events
        </h1>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Manage and track events you have created
        </p>
      </div>

      {/* ACTION BAR */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/dashboard/events/create")}
        >
          + Create Event
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "12px",
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

      {/* LOADING */}
      {loading && (
        <div className="card" style={{ padding: "20px", textAlign: "center" }}>
          <p className="text-muted">Loading events...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && events.length === 0 && (
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <p className="text-muted">No events found</p>
          <button
            className="btn btn-outline"
            style={{ marginTop: "10px" }}
            onClick={() => router.push("/dashboard/events/create")}
          >
            Create your first event
          </button>
        </div>
      )}

      {/* TABLE */}
      {!loading && events.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Slug</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{event.title}</div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {event.description?.slice(0, 60)}...
                    </div>
                  </td>

                  <td>
                    <span className="text-mint">{event.event_type}</span>
                  </td>

                  <td className="text-subtle">{event.slug}</td>

                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: "6px 10px", fontSize: "12px" }}
                        onClick={() => router.push(`/dashboard/events/${event.slug}`)}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-outline"
                        style={{ padding: "6px 10px", fontSize: "12px" }}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}