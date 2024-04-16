// Import necessary libraries
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase-config";
import AddBday from "../components/AddBday";
import BdayList from "../components/BdayList";
import LogOut from "../components/LogOut";
import EditBdayForm from "../components/EditBdayForm";
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

  return (
    <div>
      <LogOut />
      {currentUserName ? (
        <h1>Hello {currentUserName}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <AddBday getBdayList={getBdayList} />
      <BdayList
        bdayList={bdayList}
        deleteBday={deleteBday}
        editBday={(id, data) => {
          setEditBdayData({ id, ...data });
        }}
      />
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
