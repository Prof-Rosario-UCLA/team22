import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
  type HobbySchema,
  PROGRESS_BUCKETS,
  type ProgressBucket,
} from "../schemas/hobby.types";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { DroppableColumn } from "./DroppableColumn";
import SideNav from "./SideNav";

function Tracker() {
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

  function getTitle(bucket: string) {
    switch (bucket) {
      case "just-added":
        return "Just Added";
      case "tried-it":
        return "Tried It";
      case "completed":
        return "Completed";
      default:
        return "Hobbies";
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over || over.id === null) return;

    const hobbyId = active.id as string;
    const newProgress = PROGRESS_BUCKETS[over.id as ProgressBucket];

    try {
      const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
      await axios.patch(
        `${backendUrl}/user/update-hobby/${hobbyId}`,
        {
          progress: newProgress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setHobbies((prev) =>
        prev.map((hobby) =>
          hobby.id === hobbyId ? { ...hobby, progress: newProgress } : hobby
        )
      );
    } catch (error) {
      console.error("Failed to update hobby progress:", error);
    }
  };

  const handleDeleteHobby = async (hobbyId: string) => {
    if (!token) {
      console.error("No token found, cannot delete hobby.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
      const deleteUrl = `${backendUrl}/user/delete-hobby/${hobbyId}`;
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setHobbies((prevHobbies) =>
        prevHobbies.filter((hobby) => hobby.id !== hobbyId)
      );
    } catch (error) {
      console.error("Error deleting hobby:", error);
      alert("Failed to delete hobby.");
    }
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
          <h1 className="font-bold text-2xl text-stone-800">Hobby Tracker</h1>
        </header>

        <section>
          {hobbies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-stone-500 mb-4">
                Start tracking your hobbies!
              </p>
            </div>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-col lg:flex-row gap-4 p-2">
                {Object.entries(PROGRESS_BUCKETS).map(([bucket, progress]) => (
                  <DroppableColumn
                    key={bucket}
                    id={bucket}
                    title={getTitle(bucket)}
                    hobbies={hobbies.filter((h) => h.progress === progress)}
                    onDelete={handleDeleteHobby}
                  />
                ))}
              </div>
            </DndContext>
          )}
        </section>
      </div>
    </div>
  );
}

export default Tracker;
