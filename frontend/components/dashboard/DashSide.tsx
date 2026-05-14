"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [eventsOpen, setEventsOpen] = useState(true);
  const [manageOpen, setManageOpen] = useState(true);

  const active = (path: string) => pathname === path;

  const base =
    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition";

  const link = (path: string) =>
    `${base} ${
      active(path)
        ? "bg-mint/10 text-mint font-semibold border-l-2 border-mint pl-2"
        : "text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">

      {/* HEADER */}
      <div className="p-5 border-b bg-gray-50">
        <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <i className="fa-solid fa-calendar-check text-mint"></i>
          NTUC Events
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Administration System
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-5">

        {/* DASHBOARD BLOCK */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Overview
          </p>

          <Link href="/dashboard" className={link("/dashboard")}>
            <i className="fa-solid fa-gauge"></i>
            Dashboard
          </Link>
        </div>

        {/* EVENTS BLOCK */}
        <div className="border rounded-lg overflow-hidden">

          <button
            onClick={() => setEventsOpen(!eventsOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 text-xs uppercase tracking-wider text-gray-500"
          >
            <span>Events</span>
            <i className={`fa-solid fa-chevron-${eventsOpen ? "down" : "right"}`} />
          </button>

          {eventsOpen && (
            <div className="p-2 space-y-1">

              <Link href="/dashboard/events" className={link("/dashboard/events")}>
                <i className="fa-solid fa-calendar-days text-gray-500"></i>
                My Events
              </Link>

              <Link href="/dashboard/events/create" className={link("/dashboard/events/create")}>
                <i className="fa-solid fa-plus text-gray-500"></i>
                New Event
              </Link>

            </div>
          )}
        </div>

        {/* MANAGEMENT BLOCK */}
        <div className="border rounded-lg overflow-hidden">

          <button
            onClick={() => setManageOpen(!manageOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 text-xs uppercase tracking-wider text-gray-500"
          >
            <span>Management</span>
            <i className={`fa-solid fa-chevron-${manageOpen ? "down" : "right"}`} />
          </button>

          {manageOpen && (
            <div className="p-2 space-y-1">

              <Link href="/dashboard/registrations" className={link("/dashboard/registrations")}>
                <i className="fa-solid fa-clipboard-list"></i>
                Registered
                <span className="ml-auto text-xs text-gray-400">24</span>
              </Link>

              <Link href="/dashboard/financial" className={link("/dashboard/financial")}>
                <i className="fa-solid fa-coins"></i>
                Financial
              </Link>

              <Link href="/dashboard/verify" className={link("/dashboard/verify")}>
                <i className="fa-solid fa-shield"></i>
                Verify
              </Link>

            </div>
          )}
        </div>

        {/* INTELLIGENCE BLOCK */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Intelligence
          </p>

          <div className="space-y-1">

            <Link href="/dashboard/analytics" className={link("/dashboard/analytics")}>
              <i className="fa-solid fa-chart-line"></i>
              Analytics
            </Link>

            <Link href="/dashboard/notifications" className={link("/dashboard/notifications")}>
              <i className="fa-solid fa-bell"></i>
              Notifications
            </Link>

            <Link href="/dashboard/reports" className={link("/dashboard/reports")}>
              <i className="fa-solid fa-file-lines"></i>
              Reports
            </Link>

          </div>
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t text-xs text-gray-500 space-y-2">

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
          }}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          NTUC v1.0 Secure System
        </div>

      </div>
    </aside>
  );
}