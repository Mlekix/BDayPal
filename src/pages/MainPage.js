import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase-config";
import AddBday from "../components/AddBday";
import BdayList from "../components/BdayList";
import LogOut from "../components/LogOut";
import EditBdayForm from "../components/EditBdayForm";
import TodayBdayList from "../components/TodayBdayList";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { showToastInfo } from "../config/toast-config";

function MainPage() {
  const [bdayList, setBdayList] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [editBdayData, setEditBdayData] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [nameFilter, setNameFilter] = useState("");

  // Bday Collection
  const BdayCollectionRef = collection(db, "bdays");

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserName(user.displayName);
        getBdayList();
      } else {
        setCurrentUserName(null);
        setBdayList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Get Bday List
  const getBdayList = async () => {
    try {
      const userBdayQuery = query(
        BdayCollectionRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const data = await getDocs(userBdayQuery);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setBdayList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Bday
  const deleteBday = async (id) => {
    const bdayRef = doc(db, "bdays", id);
    await deleteDoc(bdayRef);
    getBdayList();
    showToastInfo("Birthday deleted successfully!");
  };

  // Edit Bday
  const editBday = async (id, updatedBday) => {
    const bdayRef = doc(db, "bdays", id);
    await updateDoc(bdayRef, updatedBday);
    getBdayList();
  };

  // Sort Bday List
  const sortBdayList = (list) => {
    if (!sortBy) return list;

    const sortedList = [...list].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedList;
  };

  // Handle sort button click
  const handleSort = (sortByField) => {
    if (sortByField === sortBy) {
      // Toggle sort order if sorting by the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and reset sort order to ascending
      setSortBy(sortByField);
      setSortOrder("asc");
    }
  };

  // Filter Bday List by Name
  const filteredBdayList = bdayList.filter((bday) =>
    bday.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 border border-grey-300">
      <LogOut />
      {currentUserName ? (
        <h1 className="text-3xl font-bold mb-4">Hello {currentUserName}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <AddBday getBdayList={getBdayList} />
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleSort("date")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Sort by Date of Birth{" "}
            {sortBy === "date" && sortOrder === "asc" && "▲"}
            {sortBy === "date" && sortOrder === "desc" && "▼"}
          </button>
          <button
            onClick={() => handleSort("partyWhen")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Sort by Party Date{" "}
            {sortBy === "partyWhen" && sortOrder === "asc" && "▲"}
            {sortBy === "partyWhen" && sortOrder === "desc" && "▼"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="">
        <TodayBdayList bdayList={filteredBdayList} />
      </div>
      <br />
      <div className="">
        <div className="">
          <BdayList
            bdayList={sortBdayList(filteredBdayList)}
            deleteBday={deleteBday}
            editBday={(id, data) => {
              setEditBdayData({ id, ...data });
            }}
          />
        </div>
      </div>
      {editBdayData && (
        <EditBdayForm
          bday={editBdayData}
          onCancel={() => setEditBdayData(null)}
          onSave={(updatedBday) => {
            editBday(editBdayData.id, updatedBday);
            setEditBdayData(null);
          }}
        />
      )}
    </div>
  );
}

export default MainPage;
