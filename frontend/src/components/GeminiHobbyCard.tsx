import React, { useState, useEffect } from "react";
import {
  type GeminiHobbySuggestion,
  type HobbySchema,
} from "../schemas/hobby.types";
import { getDifficultyColor } from "../utilities/difficultyColor";

interface GeminiHobbyCardProps {
  suggestion: GeminiHobbySuggestion;
  saveHobby: (suggestionToSave: HobbySchema) => void;
  onClose: () => void;
}

const GeminiHobbyCard: React.FC<GeminiHobbyCardProps> = ({
  suggestion,
  saveHobby,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
  const progressId = `match-progress-${suggestion.name.replace(/\s+/g, "-")}`;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <dialog
        open={isVisible}
        className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl transform transition-all duration-300 m-4"
        style={{
          opacity: isVisible ? 1 : 0,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: isVisible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)",
        }}
        aria-labelledby="dialog-title"
        aria-modal="true"
      >
        <article className="flex flex-col">
          <header>
            <h2
              id="dialog-title"
              className="text-2xl font-bold mb-2 text-stone-800"
            >
              {suggestion.name}
            </h2>
          </header>

          {suggestion.description && (
            <p className="text-stone-600 mb-4 text-sm leading-relaxed">
              {suggestion.description}
            </p>
          )}

          <footer className="mt-auto space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-stone-600 text-sm">
                {suggestion.category}
              </span>
              <span
                className={`text-xs font-medium ${difficultyColors.text} ${difficultyColors.bg} px-2 py-1 rounded-full inline-block`}
              >
                {suggestion.difficulty}
              </span>
            </div>

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

            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHobby}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                aria-label={`Save ${suggestion.name} to My Hobbies`}
              >
                Add to My Hobbies
              </button>
            </div>
          </footer>
        </article>
      </dialog>
    </div>
  );
};

export default GeminiHobbyCard;
