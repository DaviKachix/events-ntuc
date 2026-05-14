"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashFooter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FOOTER (desktop only) */}
      <div className="w-full border-t bg-white px-6 py-3 text-center hidden md:block">
        <p className="text-xs text-gray-400">
          <i className="fa-regular fa-copyright mr-1"></i>
          {new Date().getFullYear()} NTUC Events System. All rights reserved.
        </p>
      </div>

      {/* MOBILE FAB */}
      <div className="md:hidden fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

        {/* ACTION MENU */}
        {open && (
          <div className="bg-white shadow-lg rounded-xl p-3 flex flex-col gap-2 w-52 border">

            <Link
              href="/dashboard/events/create"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <i className="fa-solid fa-plus text-primary"></i>
              New Event
            </Link>

            <Link
              href="/dashboard/registrations"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <i className="fa-solid fa-users"></i>
              Registrations
            </Link>

            <Link
              href="/dashboard/analytics"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <i className="fa-solid fa-chart-line"></i>
              Analytics
            </Link>

            <Link
              href="/dashboard/reports"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <i className="fa-solid fa-file-lines"></i>
              Reports
            </Link>
          </div>
        )}

        {/* FAB BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-lg active:scale-95 transition"
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>
    </>
  );
}