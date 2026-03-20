import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

const travelFrequencyOptions = [
  { value: "0", label: "I rarely travel (0–1 times)" },
  { value: "1-3", label: "1–3 times" },
  { value: "4-6", label: "4–6 times" },
  { value: "7+", label: "7 or more times" },
];

const destinationTypeOptions = [
  { value: "beach", label: "Beach / Coastal" },
  { value: "mountains", label: "Mountains / Nature" },
  { value: "city", label: "City / Urban" },
  { value: "countryside", label: "Countryside / Rural" },
  { value: "historical", label: "Historical / Cultural" },
  { value: "adventure", label: "Adventure / Outdoors" },
];

const tripFactors = [
  { value: "budget", label: "Budget / Affordability" },
  { value: "safety", label: "Safety" },
  { value: "weather", label: "Weather & Climate" },
  { value: "food", label: "Food & Cuisine" },
  { value: "culture", label: "Culture & History" },
  { value: "activities", label: "Activities & Things to Do" },
  { value: "accessibility", label: "Ease of Getting There" },
  { value: "accommodation", label: "Quality of Accommodation" },
];

export default function Survey() {
  const [, setLocation] = useLocation();
  const [travelFrequency, setTravelFrequency] = useState("");
  const [destinationType, setDestinationType] = useState("");
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [idealVacation, setIdealVacation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleFactor(value: string) {
    setSelectedFactors((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!travelFrequency) {
      setError("Please select how often you travel per year.");
      return;
    }
    if (!destinationType) {
      setError("Please select your preferred destination type.");
      return;
    }
    if (selectedFactors.length === 0) {
      setError("Please select at least one factor that matters to you.");
      return;
    }
    if (!idealVacation.trim()) {
      setError("Please describe your ideal vacation.");
      return;
    }

    setSubmitting(true);

    const { error: supabaseError } = await supabase
      .from("survey_responses")
      .insert([
        {
          travel_frequency: travelFrequency,
          destination_type: destinationType,
          trip_factors: selectedFactors,
          ideal_vacation: idealVacation.trim(),
        },
      ]);

    setSubmitting(false);

    if (supabaseError) {
      setError(`Submission failed: ${supabaseError.message}`);
      return;
    }

    setLocation("/thank-you");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-4">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Travel Preferences Survey</h1>
          <p className="mt-2 text-gray-500 text-base">Help us understand how you like to travel. Takes about 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              1. How often do you travel per year?
            </h2>
            <p className="text-sm text-gray-500 mb-4">Select the option that best describes your typical year.</p>
            <div className="space-y-3">
              {travelFrequencyOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    travelFrequency === opt.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="travel_frequency"
                    value={opt.value}
                    checked={travelFrequency === opt.value}
                    onChange={() => setTravelFrequency(opt.value)}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              2. What type of destination do you prefer?
            </h2>
            <p className="text-sm text-gray-500 mb-4">Choose the destination type that appeals to you most.</p>
            <select
              value={destinationType}
              onChange={(e) => setDestinationType(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Select a destination type...</option>
              {destinationTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              3. What factors matter when choosing a trip?
            </h2>
            <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tripFactors.map((factor) => {
                const checked = selectedFactors.includes(factor.value);
                return (
                  <label
                    key={factor.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      checked
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFactor(factor.value)}
                      className="accent-indigo-600 w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-gray-800">{factor.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              4. Describe your ideal vacation.
            </h2>
            <p className="text-sm text-gray-500 mb-4">Tell us about the perfect trip in your own words.</p>
            <textarea
              value={idealVacation}
              onChange={(e) => setIdealVacation(e.target.value)}
              placeholder="e.g. A week in a coastal town with great food, warm weather, and time to explore local markets..."
              rows={4}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-colors text-base shadow-md shadow-indigo-200"
          >
            {submitting ? "Submitting..." : "Submit Survey"}
          </button>
        </form>
      </div>
    </div>
  );
}
