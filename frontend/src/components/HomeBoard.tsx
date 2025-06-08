import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { type HobbySchema } from "../schemas/hobby.types";
import HobbyCard from "./HobbyCard";

function HomeBoard() {
  const { token } = useAuth();
  const [hobbies, setHobbies] = useState<HobbySchema[]>([]);
  const [isLoadingHobbies, setIsLoadingHobbies] = useState(true);
  const [hobbiesError, setHobbiesError] = useState<string | null>(null);

  const fetchHobbies = async () => {
    if (!token) {
      setIsLoadingHobbies(false);
      setHobbiesError("Not authenticated to fetch hobbies. (No token found)");
      setHobbies([]);
      return;
    }

    setIsLoadingHobbies(true);
    setHobbiesError(null);

    try {
      const backendUrl = import.meta.env.VITE_DEV_BACKEND_URL;
      const hobbiesRoute = backendUrl + "/user/hobbies";
      const response = await axios.get(hobbiesRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userData = response.data;
      setHobbies(userData || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const backendError = err.response?.data?.error || err.message;
        setHobbiesError(backendError);
        console.error(
          "Failed to fetch hobbies (Axios error):",
          err.response?.data || err.message
        );
      } else {
        setHobbiesError(
          err instanceof Error ? err.message : "Unknown error occurred"
        );
        console.error("Failed to fetch hobbies (Unknown error):", err);
      }
    } finally {
      setIsLoadingHobbies(false);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, [token]);

  if (isLoadingHobbies) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
        <div className="flex flex-col py-16 px-12 shadow-lg rounded-lg w-96 bg-stone-50">
          <p className="text-stone-500">Loading hobbies...</p>
        </div>
      </div>
    );
  }

  if (hobbiesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
        <div className="flex flex-col py-16 px-12 shadow-lg rounded-lg w-96 bg-stone-50">
          <p className="text-red-500 text-xs">{hobbiesError}</p>
        </div>
      </div>
    );
  }

  if (hobbies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-stone-300">
        <div className="flex flex-col py-16 px-12 shadow-lg rounded-lg w-96 bg-stone-50">
          <h1 className="font-bold mb-4 text-2xl">No Hobbies Yet</h1>
          <p className="text-stone-500 mb-4">Start your hobby journey today!</p>
          <button className="bg-emerald-400 py-2 rounded-lg text-white hover:bg-emerald-600">
            Add Hobbies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="p-4">
        <h1 className="font-bold text-2xl text-stone-800">My Hobbies</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </div>
  );
}

export default HomeBoard;
