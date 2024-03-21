import { auth } from "../config/firebase-config";
import AddBday from "../components/AddBday";
import BdayList from "../components/BdayList";

import LogOut from "../components/LogOut";

function MainPage() {
  return (
    <div>
      <LogOut />
      <h1>Hello {auth.currentUser.displayName}!</h1>
      <AddBday />
      <BdayList />
    </div>
  );
}

export default MainPage;
