import React, { useState } from "react";
import EditBdayForm from "./EditBdayForm";

function BdayList({ bdayList, deleteBday, editBday }) {
  const [editBdayId, setEditBdayId] = useState(null);

  const handleEditClick = (id) => {
    setEditBdayId(id);
  };

  const handleCancelEdit = () => {
    setEditBdayId(null);
  };

  const handleListItemClick = (bdayId) => {
    setEditBdayId(bdayId);
  };

  return (
    <div>
      <h2 className="mt-4">List of upcoming Birthdays</h2>
      <ul>
        {bdayList.map((bday) => (
          <li
            className="m-3 border"
            key={bday.id}
            onClick={() => handleListItemClick(bday.id)}
          >
            <p>Pal: {bday.name}</p>
            <p>Have birthday: {bday.date}</p>
            {bday.hasParty && (
              <p>
                Party: {bday.partyWhere} on {bday.partyWhen}
              </p>
            )}
            <button
              className="p-1 text-red-500 border-red-500"
              onClick={(e) => {
                e.stopPropagation();
                deleteBday(bday.id);
              }}
            >
              Delete
            </button>
            <button
              className="p-1 ml-2 text-blue-500 border-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(bday.id);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {editBdayId !== null && (
        <div className="popup">
          <div className="popup-content">
            <EditBdayForm
              bday={bdayList.find((bday) => bday.id === editBdayId)}
              onCancel={handleCancelEdit}
              onSave={(updatedBday) => {
                editBday(editBdayId, updatedBday);
                handleCancelEdit();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BdayList;
