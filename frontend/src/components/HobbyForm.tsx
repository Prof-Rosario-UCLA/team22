import React, { useState, useEffect } from "react";
import { type HobbySchema } from "../schemas/hobby.types";

interface HobbyFormProps {
  onClose: () => void;
  onSave: (hobby: HobbySchema) => void;
}

const HobbyForm: React.FC<HobbyFormProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<HobbySchema>({
    name: "",
    category: "",
    difficulty: "",
    progress: 33,
    completed: false,
    proofUrl: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, progress: Number(form.progress) });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl transform transition-all duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <h2 className="text-2xl font-bold text-stone-800 mb-6">
          Add New Hobby
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-2 border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:border-emerald-400 focus:outline-none transition-colors"
              placeholder="Enter hobby name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border-2 border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:border-emerald-400 focus:outline-none transition-colors"
              placeholder="e.g., Sports, Arts, Technology"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-stone-700">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full border-2 border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:border-emerald-400 focus:outline-none transition-colors"
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-400 hover:bg-emerald-500 text-stone-50 font-bold px-6 py-2 rounded-lg transition-colors"
            >
              Save Hobby
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HobbyForm;
