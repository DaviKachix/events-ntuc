"use client";

import { useState } from "react";

export default function MobileDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="md:hidden flex justify-between p-4 bg-white border-b">
        <button onClick={() => setOpen(true)}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r transform transition duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-4 space-y-3">{children}</div>
      </div>
    </>
  );
}