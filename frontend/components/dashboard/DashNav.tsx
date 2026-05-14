"use client";

import { useState } from "react";

export default function DashNav({ onMenuClick }: any) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-[#1f3a5f] hover:opacity-70 transition"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        {/* BRAND */}
        <div>
          <h1 className="text-base md:text-lg font-semibold text-[#1f3a5f] flex items-center gap-2">
            <i className="fa-solid fa-calendar-check text-primary"></i>
            NTUC Admin
          </h1>
          <p className="text-xs text-muted hidden sm:block">
            Events Management
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATIONS */}
        <button className="relative text-gray-500 hover:text-[#1f3a5f] transition">
          <i className="fa-solid fa-bell text-lg"></i>

          {/* BADGE */}
          <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white px-1 rounded-full">
            3
          </span>
        </button>

        {/* USER MENU */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="text-sm text-muted hidden sm:block">
              Admin
            </span>

            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
              <i className="fa-solid fa-user"></i>
            </div>
          </button>

          {/* DROPDOWN */}
          <div
            className={`
              absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md
              transition-all duration-200
              ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
          >
            <a
              href="/dashboard/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              <i className="fa-solid fa-user mr-2"></i>
              Profile
            </a>

            <a
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              <i className="fa-solid fa-gear mr-2"></i>
              Settings
            </a>

            <div className="border-t"></div>

            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
              }}
            >
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}