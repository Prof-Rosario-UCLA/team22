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
        const module = await loadWasmModule();
        const hobbyVector = new module.HobbyVector();

        hobbies.forEach((hobby) => {
          const sanitizedHobby = {
            name: hobby.name || "",
            category: hobby.category || "",
            difficulty: hobby.difficulty || "",
            progress: Number(hobby.progress) || 0,
          };

          hobbyVector.push_back(sanitizedHobby);
        });

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
    return <p className="text-center text-stone-500">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!analytics) {
    return (
      <p className="text-center text-stone-500">No analytics data available.</p>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-stone-200">
      <h2 className="text-xl font-semibold text-stone-800 mb-6">
        Your Hobby Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
          <h3 className="text-sm font-medium text-stone-600 mb-2">
            Total Hobbies
          </h3>
          <p className="text-2xl font-bold text-stone-800">
            {analytics.totalHobbies}
          </p>
        </div>
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
          <h3 className="text-sm font-medium text-stone-600 mb-2">
            Average Progress
          </h3>
          <p className="text-2xl font-bold text-stone-800">
            {analytics.averageProgress.toFixed(2)}%
          </p>
        </div>
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
          <h3 className="text-sm font-medium text-stone-600 mb-2">
            Completed Hobbies
          </h3>
          <p className="text-2xl font-bold text-stone-800">
            {analytics.completedHobbies}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HobbyAnalytics;
