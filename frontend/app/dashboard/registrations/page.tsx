export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">

        <div className="absolute inset-0 rounded-full bg-mint/10 blur-xl"></div>

        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>

        <div className="absolute inset-0 rounded-full border-4 border-t-denim border-r-mint border-b-transparent border-l-transparent animate-spin"></div>

        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
          <img
            src="/SDA.png"
            alt="SDA Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
          />
        </div>

      </div>
    </div>
  );
}