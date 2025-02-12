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
  const [form, setForm] = useState({ email: null, password: null });
  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */

  const client_id =
    "446172791092-ijgfqcf5v4120o4kr6mkif88m8n4v2t8.apps.googleusercontent.com";
  const redirect_uri = "http://localhost:5174/dashboard";

  // function oauthSignIn() {
  //   // Google's OAuth 2.0 endpoint for requesting an access token
  //   var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  //   // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  //   var form = document.createElement("form");
  //   form.setAttribute("method", "GET"); // Send as a GET request.
  //   form.setAttribute("action", oauth2Endpoint);

  //   // Parameters to pass to OAuth 2.0 endpoint.
  //   var params = {
  //     client_id: client_id,
  //     redirect_uri: redirect_uri,
  //     response_type: "token",
  //     scope:
  //       "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly",
  //     include_granted_scopes: "true",
  //     state: "pass-through value",
  //   };

  //   // Add form parameters as hidden input values.
  //   for (var p in params) {
  //     var input = document.createElement("input");
  //     input.setAttribute("type", "hidden");
  //     input.setAttribute("name", p);
  //     input.setAttribute("value", params[p]);
  //     form.appendChild(input);
  //   }

  //   // Add form to page and submit it to open the OAuth 2.0 endpoint.
  //   document.body.appendChild(form);
  //   form.submit();
  // }

  // async function getUserInfo(token) {
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const userInfo = await response.json();
  //     console.log("User Info:", userInfo);
  //     return userInfo;
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //     return null;
  //   }
  // }

  // // Example usage
  // const accessToken = "YOUR_ACCESS_TOKEN_HERE"; // Replace with a valid OAuth access token
  // getUserInfo(accessToken);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        "http://localhost:3000/user/oauth/google",
        {
          // http://localhost:3001/auth/google backend that will exchange the code
          code,
        }
      );
      // expects response for tokens
      console.log(tokens);
    },
    flow: "auth-code",
  });

  async function submitForm() {
    // login req sent to backend
    const response = await axios.post("http://localhost:3000/user/login", {
      ...form,
    });
    console.log("response", response);

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
            <button className="login-option">
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
            </form>
            <div className="signup-container">
              Don't have an account?
              <button onClick={()=>{
                navigate('/signup')
              }} className="sign-up-btn">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
