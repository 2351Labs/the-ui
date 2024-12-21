import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import connectionsIcon from "./assets/connections.svg";
import infrastructureIcon from "./assets/infrastructure.svg";
import standardizeIcon from "./assets/standardize.svg";
import analyzeIcon from "./assets/analyze.svg";
import backgroundImg from "./assets/universe.jpg";
import standardizeIcon2 from "./assets/standardize2.svg";
function LandingPage({ Component, pageProps }) {
  const [showBackgroundImg, setShowBackgroundImg] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowBackgroundImg(true);
    }, 1000);
  }, []);

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
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <input
              placeholder="Enter your email address"
              className="landing-page--email-input"
            ></input>
            <button className="landing-page--button">Join Now</button>
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
            content="Automatically analyze data for insights and connections."
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        
        <div style={{ textAlign: "center" }}>
          Application in development. Support us by signing up for email updates.
        </div>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="landing-page--button">Interested? Click Here.</button>
        </div>
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
