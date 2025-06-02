import React from "react";

export interface Hobby {
  id: string;
  name: string;
  description?: string;
}

interface HobbyCardProps {
  hobby: Hobby;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby }) => {
  return (
    <article className="bg-white shadow-md rounded-lg p-4 m-2 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{hobby.name}</h3>
      {hobby.description && (
        <p className="text-gray-600 text-sm">{hobby.description}</p>
      )}
    </article>
  );
};

export default HobbyCard;
