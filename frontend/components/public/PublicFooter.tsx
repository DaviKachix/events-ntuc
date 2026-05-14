export default function PublicFooter() {
  return (
    <footer className="bg-[#1f3a5f] text-white mt-16">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* ABOUT */}
        <div>
          <h2 className="font-semibold mb-3">NTUC Events</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            A centralized platform for managing conferences, meetings, camp meetings,
            and institutional events across NTUC systems.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/events/upcoming" className="hover:text-white transition">Upcoming Events</a></li>
            <li><a href="/events/past" className="hover:text-white transition">Past Events</a></li>
            <li><a href="/events/categories" className="hover:text-white transition">Categories</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="font-semibold mb-3">Contact</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Email: support@ntuc-events.org<br />
            Phone: +255 000 000 000
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <i className="fa-brands fa-facebook hover:text-white transition"></i>
            <i className="fa-brands fa-x-twitter hover:text-white transition"></i>
            <i className="fa-brands fa-whatsapp hover:text-white transition"></i>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/20" />

      {/* BOTTOM BAR */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-300">

        {/* COPYRIGHT */}
        <div>
          © {new Date().getFullYear()} NTUC Events Management System. All rights reserved.
        </div>

        {/* MADE WITH TAIT */}
        <div className="flex items-center gap-1">
          <span>Made</span>
          <span>
            by{" "}
            <a
              href="https://www.tait.tz"
              target="_blank"
              className="underline hover:text-red-900 transition"
            >
              TAIT
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
}