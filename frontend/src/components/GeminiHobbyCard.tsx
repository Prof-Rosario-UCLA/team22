import React from "react";
import {
  type GeminiHobbySuggestion,
  type HobbySchema,
} from "../schemas/hobby.types";
import { getDifficultyColor } from "../utilities/difficultyColor";

interface GeminiHobbyCardProps {
  suggestion: GeminiHobbySuggestion;
  saveHobby: (suggestionToSave: HobbySchema) => void;
}

const GeminiHobbyCard: React.FC<GeminiHobbyCardProps> = ({
  suggestion,
  saveHobby,
}) => {
  if (!suggestion) return null;

  // Handle saving the hobby suggestion
  const handleSaveHobby = () => {
    const hobbyToSave: HobbySchema = {
      name: suggestion.name,
      category: suggestion.category,
      difficulty: suggestion.difficulty,
      progress: 33, // Default progress
      completed: false, // Default completed status
      proofUrl: "",
    };

    saveHobby(hobbyToSave);
  };

  const difficultyColors = getDifficultyColor(suggestion.difficulty);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-stone-200 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold mb-2 text-stone-800">
          {suggestion.name}
        </h3>

        {suggestion.description && (
          <p className="text-stone-600 mb-4 text-sm leading-relaxed">
            {suggestion.description}
          </p>
        )}

        <div className="space-y-3 text-sm mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-stone-600 text-sm">
              {suggestion.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium ${difficultyColors.text} ${difficultyColors.bg} px-2 py-1 rounded-full inline-block`}
            >
              {suggestion.difficulty}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-end mb-1">
              <span className="text-xs font-medium text-teal-500">
                {suggestion.matchPercentage}% Match
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-1.5">
              <div
                className="bg-teal-400 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${suggestion.matchPercentage}%` }}
                title={`${suggestion.matchPercentage}%`}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveHobby}
          className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
        >
          Add to My Hobbies
        </button>
      </div>
    </div>
  );
};

export default GeminiHobbyCard;
