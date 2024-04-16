import React, { useState } from "react";
import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  // Route after Sign Up
  const navigate = useNavigate();

  // State to hold form submission errors
  const [submissionError, setSubmissionError] = useState(null);

  // Sign Up with Email and Password
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      );

      await updateProfile(userCredential.user, {
        displayName: formik.values.name,
      });

      navigate("/main");
    } catch (err) {
      console.error(err);
      setSubmissionError(err.message); // Set the submission error message
    }
  };

  // Formik Schema for Sign Up
  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(15, "Must be 15 characters or less")
      .required("Please enter a name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter an email"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Please enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: signUp,
  });

  return (
    <div className="auth flex flex-col px-6 py-8 bg-gray-100 rounded-lg shadow-lg">
      <input
        className="p-3 mb-4 bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        id="name"
        name="name"
        type="text"
        placeholder="Your Account Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-red-600 text-sm mb-4">{formik.errors.name}</div>
      ) : null}
      <input
        className="p-3 mb-4 bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        id="email"
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-600 text-sm mb-4">{formik.errors.email}</div>
      ) : null}
      <input
        className="p-3 mb-4 bg-white rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        id="password"
        name="password"
        type="password"
        placeholder="Your Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-600 text-sm mb-4">
          {formik.errors.password}
        </div>
      ) : null}
      {submissionError && (
        <div className="text-red-600 text-sm mb-4">{submissionError}</div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={formik.handleSubmit}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
