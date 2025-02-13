import "../css/loginPage.css";
import googleIcon from "../assets/google-logo.svg";
import microsoftIcon from "../assets/microsoft-logo.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState();
  const [form, setForm] = useState({ email: null, password: null });

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await axios.post(
        "http://localhost:3000/user/oauth/google",
        {
          // http://localhost:3001/auth/google backend that will exchange the code
          code,
        }
      );
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/dashboard")
    },
    flow: "auth-code",
  });

  async function submitForm() {
    // login req sent to backend
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        ...form,
      });
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/dashboard")
    } catch (error) {
      if (error.response.data.error == "data and hash arguments required") {
        setRequestError(
          "Error. Try using Google or Microsoft account to sign in."
        );
      } else {
        setRequestError(error.response.data.error);
      }
    }
  }
  return (
    <div className="LoginPage">
      <h1 className="login-header">Scrollos</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <br></br>
          <h2>Log in</h2>
          <div className="login-options-list">
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
                getUserInfo(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
              auto_select
              flow={"auth-code"}
            /> */}
            <button
              onClick={() => {
                // oauthSignIn();
                googleLogin();
              }}
              className="login-option"
            >
              <img className="social-icon" src={googleIcon} alt="Google Icon" />
              <div>Continue with Google</div>
            </button>
            <button className="login-option microsoft">
              <img
                className="social-icon"
                src={microsoftIcon}
                alt="Google Icon"
              />
              <div>Continue with Microsoft</div>
            </button>
            <div className="divider-container">
              <div className="line"></div>
              <div className="or">OR</div>
              <div className="line"></div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRequestError(null);
                submitForm();
              }}
            >
              <label htmlFor="email">Email address</label>
              <input
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
                id="email"
              ></input>
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                id="password"
              ></input>
              <button
                className="login-btn"
                onClick={() => {
                  submitForm();
                }}
              >
                Continue
              </button>
              {requestError && (
                <div className="input-feedback">{requestError}</div>
              )}
            </form>
            <div className="signup-container">
              Don't have an account?
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="sign-up-btn"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
