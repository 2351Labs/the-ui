import { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { Provider } from "../components/ui/provider";
import validator from "validator";
import axios from "axios";
import connectionsIcon from "../assets/connections.svg";
import infrastructureIcon from "../assets/infrastructure.svg";
import standardizeIcon from "../assets/standardize.svg";
import analyzeIcon from "../assets/analyze.svg";
import backgroundImg from "../assets/universe.jpg";
import standardizeIcon2 from "../assets/standardize2.svg";

function LandingPage({ Component, pageProps }) {
  const [showBackgroundImg, setShowBackgroundImg] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowBackgroundImg(true);
    }, 1000);
  }, []);

  const emailRef1 = useRef(null);
  const emailRef2 = useRef(null);

  return (
    <div className="landing-page--container">
      <div
        className="landing-page--fold-1"
        style={{
          display: "flex",
          gap: "0px",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="landing-page--header-container"
          style={{
            display: "flex",
            gap: "0px",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <h1 className="landing-page--header">Catalog complex systems</h1>
          {/* and teams? */}
          <div>We make the connections for you.</div>
          <br></br>
          <SignupForm emailRef={emailRef1} />
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* <div className="landing-page-action-button-content">
              Join ___ others by signing up today.
            </div> */}
          </div>
        </div>
        {/* <img className="landing-page--connections-icon" src={connectionsIcon} /> */}
      </div>
      {/* 3 boxes */}

      <div className="landing-page--fold-2">
        <h2
          style={{ textAlign: "center", fontSize: "48px" }}
          // style={
          //   !showFeatureHeader
          //     ? { color: "red", opacity: "0", transition: "1s ease-in-out all" }
          //     : { opacity: "1", transition: "1s ease-in-out all" }
          // }
        >
          Your system management solution
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <FeatureBox
            order={1}
            header="Organize"
            img={standardizeIcon}
            content="Organize complex systems in a readable and discoverable manner using our UI."
          />
          <FeatureBox
            order={2}
            header="Infrastructure"
            img={infrastructureIcon}
            content="View your infrastructure as a whole and see how everything is connected."
          />
          <FeatureBox
            order={3}
            header="Standardize"
            img={standardizeIcon2}
            content=" Standardize documentation and system processes using our ADO plugin
            or web application."
          />
          <FeatureBox
            order={4}
            header="Analyze"
            img={analyzeIcon}
            content="Automatically analyze your catalog for insights and connections."
          />
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div style={{ textAlign: "center" }}>
          Application in development. Support us by signing up for email
          updates.
        </div>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShowSignupPopup((prev) => !prev)}
            className="landing-page--button"
          >
            Interested? Click Here.
          </button>
        </div>
      </div>
      {/* Popups here: */}

      {showSignupPopup && (
        <div
          className="signup-popup"
          id="popup"
          onClick={(e) => {
            if (e.target.id == "popup") {
              setShowSignupPopup(false);
            }
          }}
        >
          <div className="signup-popup-container">
            <h2 style={{ fontSize: "27px" }}>Sign up for updates</h2>
            <SignupForm emailRef={emailRef2} />
            <button
              onClick={() => {
                setShowSignupPopup(false);
              }}
              className="signup-popup-container-exit"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SignupForm(props) {
  const { emailRef } = props;
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [isAcceptedEmail, setIsAcceptedEmail] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    if (emailRef.current.value) {
      setIsAwaitingResponse(true);

      if (validator.isEmail(emailRef.current.value)) {
        axios
          .post("http://localhost:3001/signup", {
            email: emailRef.current.value,
          })
          .then((response) => {
            console.log(response);
            setIsAcceptedEmail(true);
          })
          .catch((err) => {
            console.log(err);
            setIsAcceptedEmail(false);
          });
      } else {
        setIsAcceptedEmail(false);
      }
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"column", position:"relative" }}>
      <form
        style={{ display: "flex", gap: "30px", justifyContent: "center"}}
        onSubmit={handleSubmit}
      >
        <input
          onChange={() => {
            setIsAcceptedEmail(null);
            setIsAwaitingResponse(false);
          }}
          ref={emailRef}
          placeholder="Enter your email address"
          className="landing-page--email-input"
        ></input>
        <button onClick={handleSubmit} className="landing-page--button">
          Join
        </button>
      </form>
      <br></br>
      <div className="landing-page--email-status-box">
        {isAwaitingResponse
          ? isAcceptedEmail == null
            ? ""
            : isAcceptedEmail
            ? "You are now signed up for email updates!"
            : "Uh oh, that email is already in use or invalid."
          : ""}
      </div>
    </div>
  );
}

function FeatureBox(props) {
  const { header, img, content, order } = props;
  const [scroll, setScroll] = useState(false);
  const [isHover, setIsHover] = useState(false);

  setTimeout(() => {
    if (window.scrollY === 0) {
      setScroll(0);
    }
  }, 500 * order);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      style={
        scroll === 0
          ? {
              // background: "grey",
              transition: `${!isHover ? "0.7" : "0.5"}s ease-in-out all`,
              translate: `0px ${!isHover ? "-400px" : "-505px"}`,
            }
          : { transition: ".5s ease-in-out all" }
      }
      className="landing-page--feature-box"
    >
      <div className="landing-page--feature-box--header-container">
        <img src={img} />
        <h3>{header}</h3>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default LandingPage;
