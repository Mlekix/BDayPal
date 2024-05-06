import React from "react";
import { formatDateString } from "./BdayList";

function ShowMore({ bday, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Birthday Details</h2>
        <p>Pal: {bday.name}</p>
        <p>Have birthday: {formatDateString(bday.date)}</p>
        <p>Party Location: {bday.partyWhere}</p>
        <p>Party Date: {formatDateString(bday.partyWhen)}</p>
        <p>Birthday Gift: {bday.gift}</p>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded mt-4"
        >
          Got It!
        </button>
      </div>
    </div>
  );
}

export default ShowMore;
