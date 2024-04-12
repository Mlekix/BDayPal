import React, { useState } from "react";
import { showToastInfo } from "../config/toast-config";

function EditBdayForm({ bday, onCancel, onSave }) {
  // Edit Bday form
  const [editedBday, setEditedBday] = useState({ ...bday });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBday((prevBday) => ({
      ...prevBday,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedBday);
    showToastInfo("Birthday updated successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Birthday</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={editedBday.name}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date:</label>
            <input
              type="date"
              name="date"
              value={editedBday.date}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBdayForm;
