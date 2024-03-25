import { db, auth } from "../config/firebase-config";
import AddBday from "../components/AddBday";
import BdayList from "../components/BdayList";
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";

import LogOut from "../components/LogOut";

function MainPage() {
  const [bdayList, setBdayList] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(null);

  // Bday Collection
  const BdayCollectionRef = collection(db, "bdays");

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

  return (
    <div>
      <LogOut />
      {currentUserName ? (
        <h1>Hello {currentUserName}!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <AddBday getBdayList={getBdayList} />
      <BdayList bdayList={bdayList} />
    </div>
  );
}

export default MainPage;
