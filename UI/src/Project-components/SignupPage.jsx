import "../css/signupPage.css";
import googleIcon from "../assets/google-logo.svg";
import microsoftIcon from "../assets/microsoft-logo.svg";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validatePassword from "../helpers/validatePassword";
import validateEmail from "../helpers/validateEmail";

// for microsoft OAUTH:
const MICROSOFT_CLIENT_ID = "3063a465-dc3d-4f51-b0eb-c13634cba3b2";
const MICROSOFT_REDIRECT_URI = "http://localhost:5174/auth/microsoftAuthCallback";
const MICROSOFT_AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  MICROSOFT_REDIRECT_URI
)}&scope=openid profile email&response_mode=query`;

export default function SignupPage() {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState();
  const [form, setForm] = useState({ email: null, password: null });
  const [hasError, setHasError] = useState({ email: false, password: false });
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/user/oauth/google",
          {
            // http://localhost:3001/auth/google backend that will exchange the code
            code,
          }
        );
        //recieves JWT token after registering/autheticating user
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/dashboard");
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
    // validate password on frontend to avoid unnecessary requests
    const invalidPasswordResponse = validatePassword(form.password);
    const invalidEmailResponse = validateEmail(form.email);
    if (invalidPasswordResponse) {
      setHasError((prev) => ({ ...prev, password: true }));
      setRequestError(invalidPasswordResponse);
      return;
    }
    if (invalidEmailResponse) {
      setHasError((prev) => ({ ...prev, email: true }));
      setRequestError(invalidEmailResponse);
      return;
    } else {
      // login req sent to backend
      try {
        const response = await axios.post("http://localhost:3000/user/signup", {
          ...form,
        });
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/dashboard");
      } catch (error) {
        if (!error?.response?.data?.error) {
          setRequestError("Could not connect to server. Try again.");
        } else {
          const errorString = error.response.data.error;
          setRequestError(errorString);
        }
      }
    }
  }
  return (
    <div className="SignupPage">
      <h1 className="login-header">Scrollos</h1>
      <div className="login-wrapper">
        <div className="login-container">
          <br></br>
          <h2>Create an Account</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setRequestError();
              setHasError((prev) => {
                const newState = {};
                Object.keys(prev).forEach((key) => {
                  newState[key] = false; // Set each key to false
                });
                return newState;
              });
              submitForm();
            }}
          >
            <div className="input-field-container">
              <label htmlFor="email">Email address</label>
              <input
                onFocus={() =>
                  setHasError((prev) => ({ ...prev, email: false }))
                }
                className={hasError?.email && "error"}
                onChange={(e) => {
                  setForm((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
                id="email"
              ></input>
            </div>
            <div className="input-field-container">
              <label htmlFor="password">Password</label>
              <input
                onFocus={() =>
                  setHasError((prev) => ({ ...prev, password: false }))
                }
                className={hasError.password && "error"}
                onChange={(e) =>
                  setForm((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
                id="password"
              ></input>
            </div>

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
          <div className="divider-container">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
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

            <div className="signup-container">
              Already have an account?
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="sign-up-btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
