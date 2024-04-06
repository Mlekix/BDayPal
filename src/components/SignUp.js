import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

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
    }
  };

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
      <button className="p-1 px-2" onClick={formik.handleSubmit}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
