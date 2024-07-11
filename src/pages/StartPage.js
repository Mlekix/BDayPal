import React from "react";
import NavBar from "../components/NavBar";
import SignIn from "../components/SignIn";
import { Link } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";

function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      <div className="flex flex-col items-center justify-center mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to BDayPal!
        </h1>
        <h2 className="text-xl text-gray-700 mt-2">
          Never forget a birthday of your pals!
        </h2>
        <h3 className="text-lg text-gray-600 mt-4">
          Please sign in or sign up.
        </h3>
        <SignIn />
        <div className="mt-4">
          <h3 className="text-lg text-gray-600">Forgot a password?</h3>
          <ResetPassword />
        </div>
        <div className="mt-4">
          <h3 className="text-lg text-gray-600">Don't have an account?</h3>
          <Link to="/signup">
            <button className="px-4 py-2 mt-2 border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition-all duration-300 rounded">
              Sign Up!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
