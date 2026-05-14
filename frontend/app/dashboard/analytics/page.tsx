"use client";

export default function UnderDevelopment() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white to-slate-50 flex flex-col items-center justify-center px-6 text-center">

      {/* LOADER */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">

        {/* soft glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-200/20 blur-2xl"></div>

        {/* outer ring */}
        <div className="absolute inset-0 rounded-full border border-slate-200"></div>

        {/* animated ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-slate-900 border-b-transparent border-l-transparent animate-spin"></div>

        {/* center logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-md">
          <img
            src="/SDA.png"
            alt="SDA Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          />
        </div>

      </div>

      {/* TEXT CONTENT */}
      <h1 className="text-2xl font-bold text-slate-800">
        Under Development
      </h1>

      <p className="text-sm text-slate-500 mt-2 max-w-md">
        This feature is currently being built and refined for a better experience.
        Please check back soon.
      </p>

      {/* STATUS CARD */}
      <div className="mt-6 bg-white border border-slate-100 shadow-sm rounded-2xl px-6 py-4">
        <p className="text-xs text-slate-500">
          Status: <span className="text-emerald-600 font-semibold">In Progress</span>
        </p>
        <p className="text-xs text-slate-500 mt-1">
          System: Event Registration Module
        </p>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-[11px] text-slate-400 mt-6">
        SDA Digital System • NTUC Platform
      </p>

    </div>
  );
}