import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth m-10">
      <input
        className="mr-5 p-1 border-2 border-gray-300"
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Your Email"
      />
      <input
        className="mr-5 p-1 border-2 border-gray-300"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Your Password"
      />
      <button
        className="mr-5 p-1 px-2 hover:outline outline-offset-2 outline-2 border-2 border-gra"
        onClick={signIn}
      >
        Sign In
      </button>
      <button
        className="mr-5 p-1 px-2 hover:outline outline-offset-2 outline-2 border-2 border-gra"
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
