import React from "react";
import { type HobbySchema } from "../schemas/hobby.types";

interface HobbyCardProps {
  hobby: HobbySchema;
  children?: React.ReactNode;
  dragHandle?: React.ReactNode;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "text-green-600";
    case "intermediate":
      return "text-yellow-500";
    case "advanced":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

const HobbyCard: React.FC<HobbyCardProps> = ({
  hobby,
  children,
  dragHandle,
}) => {
  const difficultyColor = getDifficultyColor(hobby.difficulty);
  console.log(hobby.difficulty);
  return (
    <article className="bg-white shadow-md rounded-lg p-4 border border-stone-200 mb-6 space-y-2">
      <h3 className="text-xl font-bold text-stone-800">{hobby.name}</h3>
      {dragHandle && (
        <div className="mb-2">
          <div className="w-full h-5 bg-gray-300 rounded cursor-grab flex items-center justify-center text-xs font-medium text-gray-700 hover:bg-gray-400 transition">
            {dragHandle}
          </div>
        </div>
      )}

      {hobby.category && (
        <p className="text-stone-500 text-sm">{hobby.category}</p>
      )}

      <p className={`text-sm font-medium ${difficultyColor}`}>
        {hobby.difficulty || "N/A"}
      </p>

      <div className="w-full bg-stone-200 rounded-full h-3 mb-2">
        <div
          className="bg-emerald-400 h-3 rounded-full"
          style={{ width: `${hobby.progress}%` }}
        ></div>
      </div>

      {children && <div className="mt-3">{children}</div>}
    </article>
  );
};

export default HobbyCard;
