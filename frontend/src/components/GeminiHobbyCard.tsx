import React from "react";
import { type GeminiHobbySuggestion } from "../hobby.types";

interface GeminiHobbyCardProps {
  suggestion: GeminiHobbySuggestion;
}

const GeminiHobbyCard: React.FC<GeminiHobbyCardProps> = ({ suggestion }) => {
  if (!suggestion) return null; // Or some fallback UI

  return (
    <div className="bg-slate-700 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-slate-100 border border-slate-600">
      <h3 className="text-2xl font-bold mb-3 text-teal-400">
        {suggestion.name}
      </h3>

      {suggestion.description && (
        <p className="text-slate-300 mb-4 text-sm">{suggestion.description}</p>
      )}

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-semibold text-slate-400">Category:</span>
          <span className="ml-2 bg-sky-700 text-sky-200 px-2 py-0.5 rounded-full text-xs">
            {suggestion.category}
          </span>
        </div>
        <div>
          <span className="font-semibold text-slate-400">Difficulty:</span>
          <span className="ml-2 text-slate-200">{suggestion.difficulty}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-400">
            Match Confidence:
          </span>
          <div className="w-full bg-slate-600 rounded-full h-2.5 mt-1">
            <div
              className="bg-teal-500 h-2.5 rounded-full"
              style={{ width: `${suggestion.matchPercentage}%` }}
              title={`${suggestion.matchPercentage}%`}
            ></div>
          </div>
          <span className="text-xs text-teal-300">
            {suggestion.matchPercentage}%
          </span>
        </div>
      </div>
      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
        Add to My Hobbies
      </button>
    </div>
  );
};

export default GeminiHobbyCard;
