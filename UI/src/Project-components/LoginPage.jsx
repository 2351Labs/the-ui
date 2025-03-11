import "../css/loginPage.css";
import googleIcon from "../assets/google-logo.svg";
import microsoftIcon from "../assets/microsoft-logo.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBackend from "../helpers/axiosBackend";
// for microsoft OAUTH:
const MICROSOFT_CLIENT_ID = "3063a465-dc3d-4f51-b0eb-c13634cba3b2";
const MICROSOFT_REDIRECT_URI =
  "https://scrollos.netlify.app/auth/microsoftAuthCallback";
const MICROSOFT_AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  MICROSOFT_REDIRECT_URI
)}&scope=openid profile email&response_mode=query`;

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState();
  const [form, setForm] = useState({ email: null, password: null });

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosBackend.post("/user/oauth/google", {
          code,
        });
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/dashboard/catalog");
      } catch (error) {
        if (!error?.response?.data?.error) {
          setRequestError("Could not connect to server. Try again.");
        }
        console.log(error);
      }
    },
    flow: "auth-code",
  });

  async function submitForm() {
    // login req sent to backend
    try {
      const response = await axiosBackend.post("/user/login", {
        ...form,
      });
      localStorage.setItem("token", response.data.token); // Store token

      navigate("/dashboard/catalog");
    } catch (error) {
      if (!error?.response?.data?.error) {
        setRequestError("Could not connect to server. Try again.");
      } else if (
        error.response.data.error == "data and hash arguments required."
      ) {
        setRequestError(
          "Error. Try using Google or Microsoft account to sign in."
        );
      } else {
        console.log("err", error);
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
            <button
              onClick={() => {
                window.location.href = MICROSOFT_AUTH_URL;
              }}
              className="login-option microsoft"
            >
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
