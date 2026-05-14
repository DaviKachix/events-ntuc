"use client";

import { useEffect, useState } from "react";

type Registration = {
  id: number;
  event_id: number;
  user_id: number;
  status: string;
  created_at: string;
  title?: string; // joined from events (optional backend join)
};

export default function RegistrationsPage() {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/registrations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to load registrations");

      setData(json.data || json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="container fade-in">

      {/* HEADER */}
      <div style={{ marginBottom: "18px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--denim)" }}>
          Registrations
        </h1>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Manage event participants and approvals
        </p>
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
          <p className="text-muted">Loading registrations...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && data.length === 0 && (
        <div className="card" style={{ padding: "30px", textAlign: "center" }}>
          <p className="text-muted">No registrations yet</p>
        </div>
      )}

      {/* TABLE */}
      {!loading && data.length > 0 && (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>User ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      Event #{reg.event_id}
                    </div>
                    <div className="text-subtle" style={{ fontSize: "12px" }}>
                      {reg.title || "No title joined"}
                    </div>
                  </td>

                  <td className="text-muted">{reg.user_id}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background:
                          reg.status === "approved"
                            ? "rgba(16,185,129,0.1)"
                            : reg.status === "pending"
                            ? "rgba(245,158,11,0.1)"
                            : "rgba(239,68,68,0.1)",
                        color:
                          reg.status === "approved"
                            ? "var(--mint)"
                            : reg.status === "pending"
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {reg.status}
                    </span>
                  </td>

                  <td className="text-subtle" style={{ fontSize: "13px" }}>
                    {new Date(reg.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: "12px" }}>
                      View
                    </button>
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