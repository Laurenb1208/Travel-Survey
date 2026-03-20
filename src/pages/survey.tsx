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
    <div className="min-h-screen bg-[#f4faf4] py-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5 shadow-sm">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Travel Preferences Survey</h1>
          <p className="mt-3 text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
            Share your travel preferences in a quick survey
          </p>
          <div className="mt-5 w-12 h-1 rounded-full bg-green-400 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Q1 — Radio */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="mb-5">
              <span className="inline-block text-xs font-semibold tracking-widest text-green-600 uppercase mb-1">Question 1</span>
              <h2 className="text-lg font-semibold text-gray-900">How often do you travel per year?</h2>
              <p className="text-sm text-gray-400 mt-1">Select the option that best describes your typical year.</p>
            </div>
            <div className="space-y-3">
              {travelFrequencyOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                    travelFrequency === opt.value
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="travel_frequency"
                    value={opt.value}
                    checked={travelFrequency === opt.value}
                    onChange={() => setTravelFrequency(opt.value)}
                    className="accent-green-600 w-4 h-4 shrink-0"
                  />
                  <span className={`text-sm font-medium ${travelFrequency === opt.value ? "text-green-800" : "text-gray-700"}`}>
                    {opt.label}
                  </span>
                  {travelFrequency === opt.value && (
                    <svg className="ml-auto w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Q2 — Dropdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="mb-5">
              <span className="inline-block text-xs font-semibold tracking-widest text-green-600 uppercase mb-1">Question 2</span>
              <h2 className="text-lg font-semibold text-gray-900">What type of destination do you prefer?</h2>
              <p className="text-sm text-gray-400 mt-1">Choose the destination type that appeals to you most.</p>
            </div>
            <div className="relative">
              <select
                value={destinationType}
                onChange={(e) => setDestinationType(e.target.value)}
                className={`w-full appearance-none border-2 rounded-xl px-4 py-3.5 text-sm bg-gray-50 focus:outline-none focus:bg-white transition-all duration-150 pr-10 cursor-pointer ${
                  destinationType
                    ? "border-green-400 text-green-900 bg-green-50"
                    : "border-gray-200 text-gray-500 hover:border-green-200"
                }`}
              >
                <option value="">Select a destination type...</option>
                {destinationTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className={`w-4 h-4 ${destinationType ? "text-green-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Q3 — Checkboxes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="mb-5">
              <span className="inline-block text-xs font-semibold tracking-widest text-green-600 uppercase mb-1">Question 3</span>
              <h2 className="text-lg font-semibold text-gray-900">What factors matter when choosing a trip?</h2>
              <p className="text-sm text-gray-400 mt-1">Select all that apply.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tripFactors.map((factor) => {
                const checked = selectedFactors.includes(factor.value);
                return (
                  <label
                    key={factor.value}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                      checked
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFactor(factor.value)}
                      className="accent-green-600 w-4 h-4 rounded shrink-0"
                    />
                    <span className={`text-sm font-medium ${checked ? "text-green-800" : "text-gray-700"}`}>
                      {factor.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Q4 — Textarea */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="mb-5">
              <span className="inline-block text-xs font-semibold tracking-widest text-green-600 uppercase mb-1">Question 4</span>
              <h2 className="text-lg font-semibold text-gray-900">Describe your ideal vacation.</h2>
              <p className="text-sm text-gray-400 mt-1">Tell us about the perfect trip in your own words.</p>
            </div>
            <textarea
              value={idealVacation}
              onChange={(e) => setIdealVacation(e.target.value)}
              placeholder="e.g. A week in a coastal town with great food, warm weather, and time to explore local markets..."
              rows={5}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-400 focus:bg-white hover:border-green-200 transition-all duration-150 resize-none placeholder:text-gray-400"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all duration-150 text-base shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Survey"
            )}
          </button>

          <p className="text-center text-xs text-gray-400 pb-4">Your responses are kept private and secure.</p>
        </form>
      </div>
    </div>
  );
}
