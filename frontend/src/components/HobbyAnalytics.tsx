import React, { useState, useEffect } from "react";
import { type HobbySchema } from "../schemas/hobby.types";
import { loadWasmModule } from "../wasm/moduleLoader";

interface HobbyAnalyticsProps {
  hobbies: HobbySchema[];
}

const HobbyAnalytics: React.FC<HobbyAnalyticsProps> = ({ hobbies }) => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const calculateAnalytics = async () => {
      try {
        // Load the WebAssembly module and call the analytics function from WASM
        const module = await loadWasmModule();
        // Create the C++ vector to hold the hobbies.
        const hobbyVector = new module.HobbyVector();

        // Loop through the real 'hobbies' array from the component props.
        hobbies.forEach((hobby) => {
          // 1. Sanitize each hobby object to ensure it has the perfect shape and types.
          const sanitizedHobby = {
            name: hobby.name || "",
            category: hobby.category || "",
            difficulty: hobby.difficulty || "",
            progress: Number(hobby.progress) || 0,
          };

          // 2. Push the clean JavaScript object into the C++ vector.
          hobbyVector.push_back(sanitizedHobby);
        });

        // 3. Call the C++ function with the manually constructed C++ vector.
        const result = module.calculateHobbyAnalytics(hobbyVector);
        setAnalytics(result);
      } catch (err) {
        console.error(
          "Error loading WASM module or calculating analytics:",
          err
        );
        setError("Failed to load analytics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    if (hobbies.length > 0) {
      calculateAnalytics();
    } else {
      setIsLoading(false);
      setError("No hobbies available for analytics.");
    }
  }, [hobbies]);
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!analytics) {
    return (
      <p className="text-center text-gray-500">No analytics data available.</p>
    );
  }

  return (
    <div className="my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Hobby Analytics
      </h2>
      <ul className="space-y-2">
        <li>
          <strong>Total Hobbies:</strong> {analytics.totalHobbies}
        </li>
        <li>
          <strong>Average Progress:</strong>{" "}
          {analytics.averageProgress.toFixed(2)}%
        </li>
        <li>
          <strong>Completed Hobbies:</strong> {analytics.completedHobbies}
        </li>
      </ul>
    </div>
  );
};

export default HobbyAnalytics;
