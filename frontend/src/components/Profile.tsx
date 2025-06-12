import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "./SideNav";
import HobbyAnalytics from "./HobbyAnalytics";
import { type HobbySchema } from "../schemas/hobby.types";

function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchHobbies();
  }, [token]);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

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
      <div className="md:ml-64 flex-1 p-8 pb-20 md:pb-8">
        <header className="mb-6">
          <h1 className="font-bold text-2xl text-stone-800">Profile</h1>
        </header>

        <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col justify-center">
          <section className="mb-8">
            <HobbyAnalytics hobbies={hobbies} />
          </section>

          <section className="flex justify-center">
            <button
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-600 py-2 px-4 rounded-lg flex items-center gap-2 transition-colors hover:bg-red-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
