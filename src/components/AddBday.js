import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

function AddBday({ getBdayList }) {
  // New Bday
  const [newBdayName, setNewBdayName] = useState("");
  const [newBdayDate, setNewBdayDate] = useState("");

  // Bday Collection
  const BdayCollectionRef = collection(db, "bdays");

  const newBdayRecord = async () => {
    try {
      await addDoc(BdayCollectionRef, {
        userId: auth.currentUser.uid,
        name: newBdayName,
        date: newBdayDate,
      });
      setNewBdayName("");
      setNewBdayDate("");
      getBdayList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        required
        type="text"
        value={newBdayName}
        onChange={(e) => setNewBdayName(e.target.value)}
        placeholder="Name"
      />
      <input
        required
        type="date"
        value={newBdayDate}
        onChange={(e) => setNewBdayDate(e.target.value)}
      />
      <br />
      <button onClick={newBdayRecord}>Add</button>
    </div>
  );
}

export default AddBday;
