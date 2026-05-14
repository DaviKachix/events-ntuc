"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const API = "http://157.180.17.101:5001/api/v1";

/* ---------------- IMAGE MAP ---------------- */
const eventImageMap: Record<string, string> = {
  conference: "/globe-bible.jpg",
  "camp-meeting": "/family-group.jpg",
  seminar: "/well-dressed.jpg",
  meeting: "/male-holding-bible.jpg",
  default: "/college-study.jpg",
};

type Event = {
  id: number;
  title: string;
  description: string;
  slug: string;
  event_type: string;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const getImage = (type: string) =>
    eventImageMap[type] || eventImageMap.default;

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    let mounted = true;

    fetch(API + "/events")
      .then((r) => r.json())
      .then((json) => {
        if (mounted && json?.success) {
          setEvents(json.data || []);
        }
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------- FILTER ---------------- */
  const filtered = useMemo(() => {
    return events.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const upcoming = filtered.slice(0, 3);
  const past = filtered.slice(3);

  const slide =
    upcoming.length > 0 ? upcoming[index % upcoming.length] : null;

  useEffect(() => {
    if (!upcoming.length) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % upcoming.length);
    }, 5000);

    return () => clearInterval(t);
  }, [upcoming.length]);

  return (
    <main className="bg-white text-slate-800">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/90 backdrop-blur-xl border rounded-2xl px-4 py-3">

            <div className="flex items-center gap-3">
              <Image src="/SDA.png" alt="SDA" width={38} height={38} />
              <div>
                <h1 className="font-black">NTUC Events</h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  SDA System
                </p>
              </div>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full sm:w-72 px-4 py-2 rounded-full bg-slate-50 border outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[85vh] overflow-hidden -mt-16">

        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url(${
              slide ? getImage(slide.event_type) : eventImageMap.default
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 h-full flex items-center px-6 md:px-16 text-white">
          {slide ? (
            <div className="max-w-2xl">
              <span className="bg-emerald-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                Featured Event
              </span>

              <h1 className="text-4xl md:text-6xl font-black mt-5">
                {slide.title}
              </h1>

              <p className="mt-4 text-white/80">
                {slide.description}
              </p>

              <Link
                href={`/events/${slide.slug}`}
                className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Register Now
              </Link>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {upcoming.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === index ? "bg-emerald-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* UPCOMING */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black">Upcoming Events</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {upcoming.map((e) => (
            <div
              key={e.id}
              className="border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition"
            >

              {/* image */}
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${getImage(e.event_type)})` }}
              />

              {/* content */}
              <div className="p-5">
                <p className="text-xs text-emerald-600 uppercase">
                  {e.event_type}
                </p>

                <h3 className="font-bold mt-1">{e.title}</h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {e.description}
                </p>

                {/* REGISTER BUTTON */}
                <Link
                  href={`/events/${e.slug}`}
                  className="mt-4 inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-semibold transition"
                >
                  Register
                </Link>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* PAST */}
      <section className="bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-black">Past Events</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {past.map((e) => (
              <div
                key={e.id}
                className="bg-white border rounded-2xl p-5"
              >
                <h3 className="font-bold">{e.title}</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Completed program
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}