import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/microsoftAuthCallback.css";
import { useState } from "react";
import SpinnerSVG from '../assets/spinner.svg?react'
const MicrosoftAuthCallback = () => {
  console.log("CALLBACK TIME");
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    // Set timeout to update the message after 3 seconds
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run the effect once when component mounts

  useEffect(() => {
    console.log("RUN")
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    console.log("params", urlParams);
    if (authCode) {
      // Send auth code to backend
      axios
        .post("http://localhost:3000/user/oauth/microsoft", { code: authCode })
        .then((response) => {
          console.log("respnse", response);
          localStorage.setItem("token", response.data.token);
          console.log("MICROSOFT TOKEN", response.data.token);
            navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error exchanging auth code:", error);
        });
    } else {
      console.log("no code, redirecting");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="microsoftAuthCallback">
      <SpinnerSVG className="spinner"/>
      <div
        className={showMessage ? "visible" : "hidden"}
        onClick={() => {
          navigate("/login");
        }}
      >
        Click to return to <strong>Log in</strong> if not automatically redirected.
      </div>
    </div>
  );
};

export default MicrosoftAuthCallback;
