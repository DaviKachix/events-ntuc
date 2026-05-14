"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";

type Stats = {
  total: number;
  events?: number;
  attendance?: number;
};

const features = [
  {
    name: "New",
    icon: "fa-plus",
    href: "/dashboard/events/create",
  },
  {
    name: "My Events",
    icon: "fa-calendar-days",
    href: "/dashboard/events",
  },
  {
    name: "Registered",
    icon: "fa-users",
    href: "/dashboard/registrations",
  },
  {
    name: "Financial",
    icon: "fa-coins",
    href: "/dashboard/financial",
  },
  {
    name: "Verify",
    icon: "fa-shield-check",
    href: "/dashboard/verify",
  },
  {
    name: "Analytics",
    icon: "fa-chart-line",
    href: "/dashboard/analytics",
  },
  {
    name: "Notifications",
    icon: "fa-bell",
    href: "/dashboard/notifications",
  },
  {
    name: "Reports",
    icon: "fa-file-lines",
    href: "/dashboard/reports",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://157.180.17.101:5001/api/v1/dashboard/stats/1"
        );

        const data = await res.json();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-10 fade-in">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-denim">
          Event Control Center
        </h1>
        <p className="text-muted mt-1 text-sm">
          Manage events, registrations, finance, verification, and analytics
        </p>
      </div>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {features.map((f) => (
          <Link
            key={f.name}
            href={f.href}
            className="card p-4 group hover:border-mint transition block"
          >
            <div className="flex items-center gap-3">

              <i
                className={`fa-solid ${f.icon} text-mint group-hover:scale-110 transition`}
              ></i>

              <h3 className="text-sm font-semibold text-denim group-hover:text-mint transition">
                {f.name}
              </h3>

            </div>
          </Link>
        ))}
      </div>

      {/* STATS */}
      <div className="space-y-4">

        <h2 className="text-xs uppercase tracking-wide text-muted">
          System Overview
        </h2>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <StatsCard label="Registrations" value={stats.total} />
            <StatsCard label="Events" value={stats.events ?? 0} />
            <StatsCard
              label="Attendance"
              value={`${stats.attendance ?? 0}%`}
            />

          </div>
        )}

      </div>
    </div>
  );
}