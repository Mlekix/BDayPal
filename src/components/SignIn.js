import React from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { showToastError } from "../config/toast-config";

const SignIn = () => {
  // Route after Sign In
  const navigate = useNavigate();

  // Sign In with Email and Password
  const signIn = async () => {
    try {
      if (formik.isValid) {
        await signInWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );
        navigate("/main");
      } else {
        showToastError("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  // Formik Schema for Sign In
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="auth m-5 mt-1">
      <input
        className="min-w-40 mr-5 p-1 border-2 border-gray-300"
        id="email"
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        className="min-w-40 mr-5 p-1 border-2 border-gray-300"
        id="password"
        name="password"
        type="password"
        placeholder="Your Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Return") {
            event.preventDefault();
            signIn();
          }
        }}
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
