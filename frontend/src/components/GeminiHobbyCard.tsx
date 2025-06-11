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

  // Adding a unique progress ID for the <progress> element
  // Allows for accessibility to possible screen readers
  const progressId = `match-progress-${suggestion.name.replace(/\s+/g, "-")}`;

  return (
    <article className="bg-white p-6 rounded-lg shadow-md border border-stone-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      <header>
        <h3 className="text-xl font-bold mb-2 text-stone-800">
          {suggestion.name}
        </h3>
      </header>

      {suggestion.description && (
        <p className="text-stone-600 mb-4 text-sm leading-relaxed">
          {suggestion.description}
        </p>
      )}

      {/* Use <footer> to group the concluding content and actions of the article. */}
      <footer className="mt-auto space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-stone-600 text-sm">{suggestion.category}</span>
          <span
            className={`text-xs font-medium ${difficultyColors.text} ${difficultyColors.bg} px-2 py-1 rounded-full inline-block`}
          >
            {suggestion.difficulty}
          </span>
        </div>

        {/* Use the semantic <progress> element for the match percentage bar. */}
        <div>
          <label
            htmlFor={progressId}
            className="flex items-center justify-end mb-1 text-xs font-medium text-teal-500"
          >
            {suggestion.matchPercentage}% Match
          </label>
          <progress
            id={progressId}
            max="100"
            value={suggestion.matchPercentage}
            className="w-full h-1.5 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-stone-100 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-teal-400 [&::-moz-progress-bar]:bg-teal-400"
          >
            {suggestion.matchPercentage}%
          </progress>
        </div>

        <button
          onClick={handleSaveHobby}
          className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
          aria-label={`Save ${suggestion.name} to My Hobbies`}
        >
          Add to My Hobbies
        </button>
      </footer>
    </article>
  );
};

export default GeminiHobbyCard;
