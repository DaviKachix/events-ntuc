"use client";

import { useEffect, useState } from "react";

export default function EventHero({ event }: any) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const image =
    event?.image_url ||
    `https://source.unsplash.com/1600x600/?conference,church,meeting`;

  return (
    <section
      className={`relative overflow-hidden rounded-xl border bg-white transition-all duration-700 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* IMAGE */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={image}
          alt={event?.title}
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a5f]/85 via-[#1f3a5f]/40 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-6 text-white w-full">
        {/* TITLE */}
        <h1 className="text-3xl font-bold">
          {event?.title}
        </h1>

        {/* TYPE */}
        <p className="text-sm text-gray-200 mt-1 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-green-400"></i>
          {event?.event_type} • NTUC Events Platform
        </p>

        {/* TAGS */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">

          {/* UPCOMING */}
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur flex items-center gap-2">
            <i className="fa-regular fa-calendar"></i>
            Upcoming Event
          </span>

          {/* INSTITUTION */}
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur flex items-center gap-2">
            <i className="fa-solid fa-building-columns"></i>
            Institutional
          </span>

          {/* STATUS */}
          {event?.status && (
            <span className="bg-green-500/80 px-3 py-1 rounded-full flex items-center gap-2">
              <i className="fa-solid fa-circle-check"></i>
              {event.status}
            </span>
          )}

        </div>
      </div>
    </section>
  );
}