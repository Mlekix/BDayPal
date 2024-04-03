import SignUp from "../components/SignUp";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="">
      <Link to={"/"}>
        <button>Start Page</button>
      </Link>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
