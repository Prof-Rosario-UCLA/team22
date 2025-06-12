import React from "react";
import { type HobbySchema } from "../schemas/hobby.types";
import { getDifficultyColor } from "../utilities/difficultyColor";

interface HobbyCardProps {
  hobby: HobbySchema;
  children?: React.ReactNode;
  dragHandle?: React.ReactNode;
}

const HobbyCard: React.FC<HobbyCardProps> = ({
  hobby,
  children,
  dragHandle,
}) => {
  const difficultyColors = getDifficultyColor(hobby.difficulty);
  console.log(hobby.difficulty);
  // Create a unique ID for the progress element to be linked by a label
  const progressId = `hobby-progress-${hobby.id}`;

  return (
    <article className="bg-white shadow-md rounded-lg p-4 border border-stone-200 flex flex-col relative">
      <header>
        <h3 className="text-xl font-bold text-stone-800 mb-2">{hobby.name}</h3>
        {dragHandle && <div className="my-2">{dragHandle}</div>}
      </header>

      {hobby.category && (
        <p className="text-stone-500 text-sm mb-2">{hobby.category}</p>
      )}

      <p
        className={`text-xs font-medium ${difficultyColors.text} ${difficultyColors.bg} px-2 py-1 rounded-full inline-block w-fit mb-2`}
      >
        {hobby.difficulty || "N/A"}
      </p>

      <div>
        <label htmlFor={progressId} className="sr-only">
          Progress
        </label>
        <progress
          id={progressId}
          max="100"
          value={hobby.progress}
          className="w-full h-3 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-stone-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-emerald-400 [&::-moz-progress-bar]:bg-emerald-400"
        >
          {hobby.progress}%
        </progress>
      </div>

      {children}
    </article>
  );
};

export default HobbyCard;
