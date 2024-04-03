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
      <h3>Never forgot about Bday of your Pals!</h3>
      <p>Please sign in or sign up.</p>
      <SignIn />
      <h3>Forgot a passowrd?</h3>
      <ResetPassword />
      <h3>Dont have account?</h3>
      <Link to="/signup">
        <button>SignUp!</button>
      </Link>
    </div>
  );
}

export default StartPage;
