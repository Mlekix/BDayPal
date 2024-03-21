import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newEmail,
        newPassword
      );

      await updateProfile(userCredential.user, {
        displayName: newDisplayName,
      });

      navigate("/main");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <input
        className="mr-5 p-1"
        onChange={(e) => setNewDisplayName(e.target.value)}
        type="text"
        placeholder="Your Account Name"
      />
      <input
        className="mr-5 p-1"
        onChange={(e) => setNewEmail(e.target.value)}
        type="text"
        placeholder="Your Email"
      />
      <input
        className="mr-5 p-1"
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        placeholder="Your Password"
      />
      <button className="p-1 px-2" onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
