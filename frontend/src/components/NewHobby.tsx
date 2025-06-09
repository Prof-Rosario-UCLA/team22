import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  type GeminiHobbySuggestion,
  type HobbySchema,
} from "../schemas/hobby.types";
import GeminiHobbyCard from "./GeminiHobbyCard";
import HobbyForm from "./HobbyForm";

function NewHobby() {
  const { token } = useAuth();
  const navigate = useNavigate();

  // State for hobby form
  const [showHobbyForm, setShowHobbyForm] = useState(false);

  // State for gemini interaction
  const [geminiResponse, setGeminiResponse] =
    useState<GeminiHobbySuggestion | null>(null);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const handleSaveHobby = async (newHobby: HobbySchema) => {
    if (!token) {
      console.error("No token found, cannot save hobby.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_DEV_BACKEND_URL;
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

      // Navigate back to dashboard after successful save
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving hobby:", err);
      setGeminiError("Failed to save hobby. Please try again.");
    } finally {
      setShowHobbyForm(false);
    }
  };

  const handleGeminiRequest = async () => {
    if (!token) {
      setGeminiError("You are not authenticated.");
      return;
    }
    setIsGeminiLoading(true);
    setGeminiResponse(null);
    setGeminiError(null);

    try {
      const backendUrl = import.meta.env.VITE_DEV_BACKEND_URL;
      const geminiRoute = backendUrl + "/user/recommend-Hobby";
      const responseData = await axios.get(geminiRoute, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const rawGeminiString = responseData.data;
      console.log("Raw Gemini response:", rawGeminiString);

      if (typeof rawGeminiString === "string") {
        // Remove Markdown fences and trim whitespace
        let cleanJsonString = rawGeminiString;
        if (cleanJsonString.startsWith("```json")) {
          cleanJsonString = cleanJsonString.substring(7);
        }
        if (cleanJsonString.endsWith("```")) {
          cleanJsonString = cleanJsonString.substring(
            0,
            cleanJsonString.length - 3
          );
        }
        cleanJsonString = cleanJsonString.trim();

        try {
          const parsedHobby = JSON.parse(cleanJsonString);
          setGeminiResponse(parsedHobby as GeminiHobbySuggestion);

          // Cache recommended hobby
          const payload: HobbySchema = {
            id: Date.now().toString(),
            name: parsedHobby.name,
            category: parsedHobby.category,
            difficulty: parsedHobby.difficulty,
            progress: Number(33),
            completed: false,
            proofUrl: "",
          };
          const cacheGeminiRecommendedHobby =
            backendUrl + "/user/cache-recommended-hobby";
          await axios.post(cacheGeminiRecommendedHobby, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        } catch (parseError) {
          console.error("Failed to parse Gemini JSON response:", parseError);
          setGeminiError("Received an invalid format from Gemini suggestion.");
        }
      } else if (responseData) {
        setGeminiResponse(rawGeminiString as GeminiHobbySuggestion);
      } else {
        setGeminiError("Received no valid data from Gemini route.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const backendError = err.response?.data?.error || err.message;
        setGeminiError(backendError);
        console.error(
          "Failed to fetch hobby suggestion:",
          err.response?.data || err.message
        );
      } else {
        setGeminiError(
          err instanceof Error ? err.message : "Unknown error occurred"
        );
        console.error("Failed to fetch hobby suggestion:", err);
      }
    } finally {
      setIsGeminiLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="p-4">
        <h1 className="font-bold text-2xl text-stone-800">Add New Hobby</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 border border-stone-200 space-y-2">
          <h2 className="text-xl font-semibold mb-4">Add Hobby Manually</h2>
          <button
            onClick={() => setShowHobbyForm(true)}
            className="bg-emerald-400 py-2 px-4 rounded-lg font-bold text-stone-50 hover:bg-emerald-600 transition-colors w-full"
          >
            Create New Hobby
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-stone-200 space-y-2">
          <h2 className="text-xl font-semibold mb-4">Get AI Recommendation</h2>
          <button
            onClick={handleGeminiRequest}
            disabled={isGeminiLoading}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 w-full"
          >
            {isGeminiLoading
              ? "Getting Recommendation..."
              : "Get AI Hobby Suggestion"}
          </button>
        </div>

        {geminiResponse && (
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4 border border-stone-200 space-y-2">
            <h3 className="text-lg font-semibold mb-4">AI Recommendation</h3>
            <GeminiHobbyCard
              suggestion={geminiResponse}
              saveHobby={handleSaveHobby}
            />
          </div>
        )}

        {geminiError && (
          <div className="md:col-span-2 bg-red-50 p-4 rounded-lg shadow-md">
            <p className="text-red-600">{geminiError}</p>
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

export default NewHobby;
