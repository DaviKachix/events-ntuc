"use client";

import { useState } from "react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAV */}
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
        <header
          className="
            w-full max-w-5xl
            bg-white/75
            backdrop-blur-xl
            border border-gray-200
            shadow-md
            rounded-xl
            transition-all duration-300
            animate-fadeIn
          "
        >
          <div className="flex items-center justify-between px-5 py-3">

            {/* BRAND + LOGO */}
            <div className="flex items-center gap-3">

              {/* LOGO PLACEHOLDER */}
              <div className="w-9 h-9 rounded-md bg-gray-100 border flex items-center justify-center overflow-hidden">
                {/* Replace with <img src="/logo.png" /> */}
                <i className="fa-solid fa-building text-[#1f3a5f] text-sm"></i>
              </div>

              {/* TEXT BRAND */}
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#1f3a5f] text-sm">
                  NTUC Events
                </span>
                <span className="text-[10px] text-gray-400">
                  Event Management System
                </span>
              </div>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#1f3a5f] font-medium">
              <a href="/" className="hover:text-green-500 transition">
                Home
              </a>

              <a href="/events/upcoming" className="hover:text-green-500 transition">
                Upcoming
              </a>

              <a href="/events/past" className="hover:text-green-500 transition">
                Past
              </a>

              <a href="/events/categories" className="hover:text-green-500 transition">
                Categories
              </a>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* ADMIN CTA */}
              <a
                href="/auth/login"
                className="
                  hidden md:block
                  bg-[#1f3a5f]
                  text-white
                  px-4 py-2
                  rounded-lg
                  text-sm
                  hover:bg-[#16263d]
                  transition
                "
              >
                Admin
              </a>

              {/* HAMBURGER */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden text-[#1f3a5f]"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white
          z-50
          shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-end p-4 border-b">
          <button onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark text-xl text-[#1f3a5f]"></i>
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="p-5 space-y-4 text-sm font-medium text-[#1f3a5f]">
          <a href="/" className="block hover:text-green-500 transition">
            Home
          </a>

          <a href="/events/upcoming" className="block hover:text-green-500 transition">
            Upcoming Events
          </a>

          <a href="/events/past" className="block hover:text-green-500 transition">
            Past Events
          </a>

          <a href="/events/categories" className="block hover:text-green-500 transition">
            Categories
          </a>

          <div className="border-t my-4"></div>

          <a
            href="/auth/login"
            className="block text-green-600 font-semibold"
          >
            Admin Login
          </a>
        </nav>
      </div>
    </>
  );
}