import SignUp from "../components/SignUp";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div>
      <Link to={"/"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded focus:outline-none focus:shadow-outline">
          Back to start page
        </button>
      </Link>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
