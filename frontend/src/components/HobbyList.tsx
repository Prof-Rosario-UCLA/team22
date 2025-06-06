import React from "react";
import type { HobbySchema } from "../schemas/hobby.types";
import HobbyCard from "./HobbyCard";

interface HobbyListProps {
  title: string;
  hobbies: HobbySchema[];
  onDelete: (hobbyId: string) => void;
}

const HobbyList: React.FC<HobbyListProps> = ({ title, hobbies, onDelete }) => {
  return (
    <div className="flex-1 p-4">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {hobbies.length === 0 ? (
        <p className="text-sm text-gray-500">No hobbies in this category.</p>
      ) : (
        <div className="space-y-4">
          {hobbies.map((hobby) => (
            <HobbyCard key={hobby.id} hobby={hobby}>
              <button
                onClick={() => hobby.id && onDelete(hobby.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </HobbyCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default HobbyList;