import React from "react";
import NavBar from "../components/NavBar";
import SignIn from "../components/SignIn";
import { Link } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

function StartPage() {
  return (
    <div className="w-full">
      <NavBar />
      <h1 className="">Welcome to BDayPal!</h1>
      <h1>*WIP*</h1>
      <h2>Never forgot about Bday of your Pals!</h2>
      <h3>Please sign in or sign up.</h3>
      <SignIn />
      <h3>Forgot a passowrd?</h3>
      <ResetPassword />
      <h3>Don't have account?</h3>
      <Link to="/signup">
        <button className="p-1.5 m-5 mt-1 border-2 border-grey-600">
          SignUp!
        </button>
      </Link>
    </div>
  );
}

export default StartPage;
