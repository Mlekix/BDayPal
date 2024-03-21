import React from "react";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User signed out");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div>
      <button className="m-5 p-1 px-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogOut;
