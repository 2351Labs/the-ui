import "../css/LoggedInChecker.css";
import { useNavigate } from "react-router-dom";
export default function LoggedInChecker(props) {
  const {isValidToken} = props
  const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  return (
    <>
    {/* if no token present, prompt user to log in */}
      {!isValidToken && (
        <div className="LoggedInChecker">
          <div className="container">
            <div className="header">Welcome Back</div>
            <div className="message">Log in or sign up to continue.</div>
            <div className="btn-container">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="login"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="signup"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
