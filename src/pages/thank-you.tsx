import { useLocation } from "wouter";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f4faf4] flex items-center justify-center px-4 py-14">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="w-10 h-1 rounded-full bg-green-400 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Thank You!</h1>
          <p className="text-gray-500 text-base leading-relaxed mb-2">
            Your travel preferences have been saved. We appreciate you taking the time to share your thoughts.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            Your response helps us better understand how people explore the world.
          </p>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4">Survey Insights</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Most common travel frequency:</span> 1–3 times
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Most popular destination:</span> Beach
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Top factor:</span> Budget
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setLocation("/")}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-150 text-sm shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Take the Survey Again
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">Your response has been securely stored.</p>
      </div>
    </div>
  );
}
