import React, { useState } from "react";
import EditBdayForm from "./EditBdayForm";

function BdayList({ bdayList, deleteBday, editBday }) {
  // Edit Bday
  const [editBdayId, setEditBdayId] = useState(null);

  const handleEditClick = (id) => {
    setEditBdayId(id);
  };

  const handleCancelEdit = () => {
    setEditBdayId(null);
  };

  return (
    <div>
      <h2 className="mt-4">List of upcoming Birthdays</h2>
      <ul>
        {bdayList.map((bday) => (
          <li className="m-3 border" key={bday.id}>
            <p>Pal: {bday.name}</p>
            <p>Have birtday: {bday.date}</p>
            <button
              className="p-1 text-red-500 border-red-500"
              onClick={() => deleteBday(bday.id)}
            >
              Delete
            </button>
            <button
              className="p-1 ml-2 text-blue-500 border-blue-500"
              onClick={() => handleEditClick(bday.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {editBdayId && (
        <EditBdayForm
          bday={bdayList.find((bday) => bday.id === editBdayId)}
          onCancel={handleCancelEdit}
          onSave={(updatedBday) => {
            editBday(editBdayId, updatedBday);
            handleCancelEdit();
          }}
        />
      )}
    </div>
  );
}

export default BdayList;
