"use client";

import { useState } from "react";
import DashNav from "@/components/dashboard/DashNav";
import DashSide from "@/components/dashboard/DashSide";
import DashFooter from "@/components/dashboard/DashFooter";
import "./globals.css"; // adjust path

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-[Noto_Sans]">

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          h-full w-64 bg-white border-r
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <DashSide />
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOP NAVBAR */}
        <DashNav onMenuClick={() => setOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <DashFooter />
      </div>
    </div>
  );
}