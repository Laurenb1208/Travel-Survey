import { useLocation } from "wouter";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h1>
          <p className="text-gray-500 text-base leading-relaxed mb-2">
            Your travel preferences have been saved. We appreciate you taking the time to share your thoughts.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Your response helps us better understand how people explore the world.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setLocation("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Take the Survey Again
            </button>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Your response has been securely stored.
        </p>
      </div>
    </div>
  );
}
