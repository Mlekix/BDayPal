import React from "react";
import { getAuth } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import * as Yup from "yup";
import { useFormik } from "formik";
import { showToastSuccess, showToastError } from "../config/toast-config";

const ResetPassword = () => {
  // Reset Password with auth
  const auth = getAuth();

  const triggerResetEmail = async () => {
    try {
      if (formik.isValid) {
        await sendPasswordResetEmail(auth, formik.values.email);
        showToastSuccess("Password Reset Email Sent");
      } else {
        showToastError(formik.errors.email);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Formik Schema for Reset Password
  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter an email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: triggerResetEmail,
  });

  return (
    <div className="m-5 mt-1">
      <input
        className="min-w-40 p-1.5 mr-2 border border-gray-300 rounded-md"
        id="reset-email"
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Return") {
            event.preventDefault();
            triggerResetEmail();
          }
        }}
      />
      <button
        className="mr-5 p-1 px-2 outline-offset-2 outline-2 border-2 hover:border-blue-600"
        onClick={triggerResetEmail}
      >
        Reset password
      </button>
    </div>
  );
};

export default ResetPassword;
