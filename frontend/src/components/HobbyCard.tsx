import React from "react";
import { type HobbySchema } from "../schemas/hobby.types";

interface HobbyCardProps {
  hobby: HobbySchema;
  children?: React.ReactNode;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-600";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

const getProgressLabel = (progress: number): string => {
  if (progress >= 100) return "Done";
  if (progress >= 66) return "Tried It";
  if (progress >= 33) return "Just Added";
  if (progress == 0) return "Not Added";
  return "Not started";
};

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, children }) => {
  const difficultyColor = getDifficultyColor(hobby.difficulty);
  return (
    <article className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-6 space-y-2">
      <h3 className="text-xl font-bold text-gray-900">{hobby.name}</h3>

      {hobby.category && (
        <p className="text-gray-700 text-sm">Category: {hobby.category}</p>
      )}

      <p className={`text-sm font-medium ${difficultyColor}`}>
        Difficulty: {hobby.difficulty || "N/A"}
      </p>

      {/* Progress Bar */}
      <div className="text-sm text-gray-700">Progress: {hobby.progress}% - {getProgressLabel(hobby.progress)}</div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${hobby.progress}%` }}
        ></div>
      </div>

      {children && <div className="mt-3">{children}</div>}
    </article>
  );
};

export default HobbyCard;
