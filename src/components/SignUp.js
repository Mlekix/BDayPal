import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
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
    validationSchema: SignUpSchema,
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
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}
      <input
        className="p-1"
        id="email"
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}
      <input
        className="p-1"
        id="password"
        name="password"
        type="password"
        placeholder="Your Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}
      <button className="p-1 px-2" onClick={formik.handleSubmit}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
