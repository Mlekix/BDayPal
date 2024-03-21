import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <button onClick={triggerResetEmail}>Reset password</button>
    </div>
  );
};

export default ResetPassword;
