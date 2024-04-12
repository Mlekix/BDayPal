import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastError } from "../config/toast-config";

const SignUp = () => {
  // Route after Sign Up
  const navigate = useNavigate();

  // Sign Up with Email and Password
  const signUp = async () => {
    try {
      if (formik.isValid) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );

        await updateProfile(userCredential.user, {
          displayName: formik.values.name,
        });

        navigate("/main");
      } else {
        showToastError(
          formik.errors.name || formik.errors.email || formik.errors.password
        );
      }
    } catch (err) {
      console.error(err);
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
    <div className="auth flex flex-col px-52">
      <input
        className="p-1"
        id="name"
        name="name"
        type="text"
        placeholder="Your Account Name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <input
        className="p-1"
        id="email"
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        className="p-1"
        id="password"
        name="password"
        type="password"
        placeholder="Your Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Return") {
            event.preventDefault();
            formik.handleSubmit();
          }
        }}
      />
      <button className="p-1 px-2" type="submit" onClick={formik.handleSubmit}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
