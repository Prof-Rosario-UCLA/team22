import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import HobbyCard, { type Hobby } from "./HobbyCard";
import axios from "axios";

function Dashboard() {
  const { userId, token } = useAuth();
  const navigate = useNavigate();

  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [isLoadingHobbies, setIsLoadingHobbies] = useState(true);
  const [hobbiesError, setHobbiesError] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  // useEffect to fetch hobbies when the component mounts or token changes
  useEffect(() => {
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
        console.log("Fetched hobbies:", userData.hobbies);
        setHobbies(userData.hobbies || []);
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

    fetchHobbies();
  }, [token]); // Re-fetch hobbies if the token changes

  return (
    <div>
      <h1>Welcome userId: {userId}</h1>
      <p>User token: {token}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
