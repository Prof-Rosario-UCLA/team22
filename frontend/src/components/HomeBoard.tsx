import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { type HobbySchema } from "../schemas/hobby.types";
import HobbyCard from "./HobbyCard";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";

function HomeBoard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState<HobbySchema[]>([]);
  const [isLoadingHobbies, setIsLoadingHobbies] = useState(true);
  const [hobbiesError, setHobbiesError] = useState<string | null>(null);
  const [cachedGeminiHobbies, setCachedGeminiHobbies] = useState<HobbySchema[]>(
    []
  );

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
      const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
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

  const fetchCachedGeminiHobbies = async () => {
    if (!token) return;

    try {
      const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
      const route = backendUrl + "/user/cached-hobbies";
      const cachedHobbies = await axios.get(route, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCachedGeminiHobbies(cachedHobbies.data || []);
    } catch (err) {
      console.error("Error fetching cached Gemini hobbies:", err);
    }
  };

  const handleSaveHobby = async (newHobby: HobbySchema) => {
    if (!token) {
      console.error("No token found, cannot save hobby.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
      const saveHobbyRoute = backendUrl + "/user/save-Hobby";
      const payload = {
        ...newHobby,
        progress: Number(33),
        proofUrl:
          newHobby.proofUrl?.trim() === "" ? undefined : newHobby.proofUrl,
      };

      await axios.post(saveHobbyRoute, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Refresh both hobby lists
      fetchHobbies();
      fetchCachedGeminiHobbies();
    } catch (err) {
      console.error("Error saving hobby:", err);
    }
  };

  useEffect(() => {
    fetchHobbies();
    fetchCachedGeminiHobbies();
  }, [token]);

  if (isLoadingHobbies) {
    return (
      <div className="flex">
        <SideNav />
        <div className="ml-64 flex-1 p-8">
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-stone-500">Loading hobbies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hobbiesError) {
    return (
      <div className="flex">
        <SideNav />
        <div className="ml-64 flex-1 p-8">
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-xs">{hobbiesError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideNav />
      <div className="ml-64 flex-1 p-8">
        <header className="mb-6">
          <h1 className="font-bold text-2xl text-stone-800">My Hobbies</h1>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Most Recent AI Suggestions
          </h2>
          {cachedGeminiHobbies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-stone-500 mb-4">
                Get personalized hobby recommendations!
              </p>
              <button
                onClick={() => navigate("/hobby/new")}
                className="bg-teal-500 py-2 px-4 rounded-lg text-white hover:bg-teal-600"
              >
                Get AI Hobby Suggestion
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cachedGeminiHobbies.map((hobby) => (
                <HobbyCard key={hobby.id} hobby={hobby}>
                  <button
                    onClick={() => handleSaveHobby(hobby)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label={`Add ${hobby.name} to My Hobbies`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </HobbyCard>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Current Hobbies</h2>
          {hobbies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-stone-500 mb-4">
                Start your hobby journey today!
              </p>
              <button
                onClick={() => navigate("/hobby/new")}
                className="bg-emerald-400 py-2 px-4 rounded-lg text-white hover:bg-emerald-600"
              >
                Add Hobbies
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hobbies.map((hobby) => (
                <HobbyCard key={hobby.id} hobby={hobby} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomeBoard;
