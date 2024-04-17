import React, { useState } from "react";
import ShowMore from "./ShowMore";
import EditBdayForm from "./EditBdayForm";

function BdayList({ bdayList, deleteBday, editBday }) {
  const [editBdayId, setEditBdayId] = useState(null);
  const [showPartyDetails, setShowPartyDetails] = useState(false);
  const [selectedBday, setSelectedBday] = useState(null);

  const handleEditClick = (id) => {
    setEditBdayId(id);
  };

  const handleCancelEdit = () => {
    setEditBdayId(null);
  };

  const handleListItemClick = (bday) => {
    setSelectedBday(bday);
    setShowPartyDetails(true);
  };

  const handleShowMoreClose = () => {
    setShowPartyDetails(false);
  };

  return (
    <div>
      <h2 className="mt-4">List of upcoming Birthdays</h2>
      <ul>
        {bdayList.map((bday) => (
          <li
            className="m-3 border"
            key={bday.id}
            onClick={() => handleListItemClick(bday)}
          >
            <p>Pal: {bday.name}</p>
            <p>Have birthday: {bday.date}</p>
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
      {showPartyDetails && (
        <ShowMore bday={selectedBday} onClose={handleShowMoreClose} />
      )}
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
