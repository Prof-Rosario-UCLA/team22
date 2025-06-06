import React from "react";
import { type HobbySchema } from "../schemas/hobby.types";

interface HobbyCardProps {
  hobby: HobbySchema;
  children?: React.ReactNode;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby, children }) => {
  return (
    <article className="relative bg-white shadow-md rounded-lg p-4 m-2 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        Name: {hobby.name}
      </h3>
      <p className="text-gray-600 text-sm">Category: {hobby.category}</p>
      <p className="text-gray-600 text-sm">Difficulty: {hobby.difficulty}</p>
      <p className="text-gray-600 text-sm">Progress: {hobby.progress}%</p>
      <p className="text-gray-600 text-sm">
        {hobby.completed ? "Completed" : "In Progress"}
      </p>
      {children && <div className="mt-3">{children}</div>}
    </article>
  );
};

export default HobbyCard;
