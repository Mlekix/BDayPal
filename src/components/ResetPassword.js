import React from "react";
import { getAuth } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import * as Yup from "yup";
import { useFormik } from "formik";

const ResetPassword = () => {
  const auth = getAuth();

  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, formik.values.email);
      console.log("Password reset email sent");
    } catch (err) {
      console.error(err);
    }
  };

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: triggerResetEmail,
  });

  return (
    <div>
      <input
        className="p-1"
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
      <button onClick={triggerResetEmail}>Reset password</button>
    </div>
  );
};

export default ResetPassword;
