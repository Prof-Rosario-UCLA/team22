import React from "react";
import { type HobbySchema } from "../schemas/hobby.types";

interface HobbyCardProps {
  hobby: HobbySchema;
  onDelete: (id: string) => void;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, onDelete }) => {
  return (
    <article className="relative bg-white shadow-md rounded-lg p-4 m-2 border border-gray-200">
      {/* Delete Button */}
      <button
        onClick={() => {
          if (hobby.id) onDelete(hobby.id);
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
        aria-label="Delete hobby"
        title="Delete hobby"
      >
        x
      </button>

      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        Name: {hobby.name}
      </h3>
      <p className="text-gray-600 text-sm">Category: {hobby.category}</p>
      <p className="text-gray-600 text-sm">Difficulty: {hobby.difficulty}</p>
      <p className="text-gray-600 text-sm">Progress: {hobby.progress}%</p>
      <p className="text-gray-600 text-sm">
        {hobby.completed ? "Completed" : "In Progress"}
      </p>
    </article>
  );
};

export default HobbyCard;
