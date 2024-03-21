import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";

function BdayList({ bdays }) {
  console.log(auth.currentUser.uid);
  // List of Bdays
  const [BdayList, setBdayList] = useState([]);

  // Bday Collection
  const BdayCollectionRef = collection(db, "bdays");

  const getBdayList = async () => {
    try {
      if (!auth.currentUser) return;

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

  useEffect(() => {
    getBdayList();
  }, [auth.currentUser]);

  return (
    <div>
      <h2 className="mt-4">List of Birthdays</h2>
      <ul>
        {BdayList.map((bday) => (
          <li className="m-3" key={bday.id}>
            <p>Name: {bday.name}</p>
            <p>Date: {bday.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BdayList;
