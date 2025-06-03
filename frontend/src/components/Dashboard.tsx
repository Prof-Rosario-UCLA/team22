import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import HobbyCard, { type Hobby } from "./HobbyCard";
import HobbyForm from "./HobbyForm";
import axios from "axios";
import type HobbySchema from "../schemas/hobbySchema";

function Dashboard() {
  const { userId, token } = useAuth();
  const navigate = useNavigate();

  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [isLoadingHobbies, setIsLoadingHobbies] = useState(true);
  const [hobbiesError, setHobbiesError] = useState<string | null>(null);
  const [showHobbyForm, setShowHobbyForm] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const fetchHobbies = async () => {
    if (!token) {
      // If no token from AuthContext, don't attempt to fetch
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
      console.log("Fetching hobbies from:", hobbiesRoute);
      const response = await axios.get(hobbiesRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Axios automatically parses the JSON response, data is in response.data
      const userData = response.data;
      console.log("Fetched user data:", userData);
      console.log("Fetched hobbies:", userData);
      console.log(
        "Is userData.hobbies an array?",
        Array.isArray(userData)
      );

      setHobbies(userData || []);
    } catch (err: any) {
      // Axios error handling
      if (axios.isAxiosError(err)) {
        // err.response?.data might contain error details from the backend
        const backendError = err.response?.data?.error || err.message;
        setHobbiesError(backendError);
        console.error(
          "Failed to fetch hobbies (Axios error):",
          err.response?.data || err.message
        );
      } else {
        // For non-Axios errors
        setHobbiesError(err.message);
        console.error("Failed to fetch hobbies (Unknown error):", err);
      }
    } finally {
      setIsLoadingHobbies(false);
    }
  };

  // useEffect to fetch hobbies when the component mounts or token changes
  useEffect(() => {
    fetchHobbies();
  }, [token]); // Re-fetch hobbies if the token changes

  const handleSaveHobby = async (newHobby: HobbySchema) => {
    try {
      const backendUrl = import.meta.env.VITE_DEV_BACKEND_URL;
      const saveHobbyRoute = backendUrl + "/user/save-Hobby";
      const payload = {
        ...newHobby,
        progress: Number(newHobby.progress),
        proofUrl: newHobby.proofUrl?.trim() === "" ? undefined : newHobby.proofUrl,
      };

      await axios.post(saveHobbyRoute, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      fetchHobbies();
    } catch (err: any) {
      console.error("Error saving hobby:", err.message);
    } finally {
      setShowHobbyForm(false);
    }
  }

  return (
    <div className="dashboard-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      <hr className="my-6" />

      <div className="mb-6">
        <button
          onClick={() => setShowHobbyForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Hobby
        </button>
      </div>

      <div className="hobbies-section">
        <h2 className="text-xl font-semibold mb-3">My Hobbies</h2>
        {isLoadingHobbies && <p>Loading hobbies...</p>}
        {hobbiesError && (
          <p style={{ color: "red" }}>Error loading hobbies: {hobbiesError}</p>
        )}
        {!isLoadingHobbies && !hobbiesError && hobbies.length === 0 && (
          <p>No hobbies found. You can add hobbies in your profile!</p>
        )}
        {!isLoadingHobbies && !hobbiesError && hobbies.length > 0 && (
          <div className="hobbies-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hobbies.map((hobby) => (
              <HobbyCard key={hobby.id} hobby={hobby} />
            ))}
          </div>
        )}
      </div>

      {showHobbyForm && (
        <HobbyForm
          onClose={() => setShowHobbyForm(false)}
          onSave={handleSaveHobby}
        />
      )}
    </div>
  );
}

export default Dashboard;
