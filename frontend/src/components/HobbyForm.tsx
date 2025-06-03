import React, { useState } from 'react';
import type HobbySchema from '../schemas/hobbySchema';

interface HobbyFormProps {
  onClose: () => void;
  onSave: (hobby: HobbySchema) => void;
}

const HobbyForm: React.FC<HobbyFormProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<HobbySchema>({
    name: "",
    category: "",
    difficulty: "",
    progress: 0,
    completed: false,
    proofUrl: "",
  });

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Hobby</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Difficulty</label>
            <input
              type="text"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={form.progress}
              onChange={handleChange}
              min={0}
              max={100}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div> 
            <label className="block mb-1 font-medium text-gray-700">Proof URL</label>
            <input
              type="url"
              name="proofUrl"
              value={form.proofUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HobbyForm;
