import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import sidebarIcon from "../../assets/dashboard/sidebar.svg";
import Catalog from "./catalog-components/Catalog";
import FilterBar from "./FilterBar";
// for defining sidebar:
import homeIcon from "../../assets/dashboard/home.svg";
import sIcon from "../../assets/dashboard/s.svg";
import settingsIcon from "../../assets/dashboard/settings.svg";
import UserSVG from "../../assets/dashboard/user.svg?react";
import { Outlet } from "react-router-dom";
import CatalogSVG from "../../assets/dashboard/catalog.svg?react";
import ReportsSVG from "../../assets/dashboard/reports.svg?react";
import PeopleSVG from "../../assets/dashboard/people.svg?react";
import NightModeSwitch from "./NightModeSwitch";
import LoggedInChecker from "../LoggedInChecker";
import UserButton from "./UserButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  // sidebar selection controls content element displayed:
  const [isValidToken, setIsValidToken] = useState(true)
  // assume token valid while waiting for response for user data from server
  const [sidebarSelection, setsidebarSelection] = useState({
    name: "Home",
    element: <div>Home</div>,
  });
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [userData, setUserData] = useState();
  const sidebarOptions = {
    Catalog: {
      label: "Catalog",
      element: <Catalog />,
      svg: <CatalogSVG />,
    },
    Reports: {
      label: "Reports",
      element: <div>EMPTY</div>,
      svg: <ReportsSVG />,
    },
    People: { label: "People", element: <div>EMPTY</div>, svg: <PeopleSVG /> },
    // ServiceMaturity: {label:"Service Maturity", element: <div>EMPTY</div>, img: reportsIcon },
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/getUser")
      .then((response) => {
        console.log("RESPONSE DATA", response)
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsValidToken(false)
        // navigate("/login")
      });
  }, []);

  return (
    <div
      id={isDarkMode ? "night-mode" : undefined}
      className="dashboard--container"
    >
      <SideBar
        sidebarOptions={sidebarOptions}
        sidebarState={{
          value: sidebarSelection,
          setter: setsidebarSelection,
          isEnabled: toggleSidebar,
          setToggleSidebar: setToggleSidebar,
        }}
      />
      <div className="dashboard--right">
        <div className="top-container">
          <button
            onClick={(e) => {
              setToggleSidebar(!toggleSidebar);
            }}
            className="sidebar-toggle-btn"
          >
            <img className="sidebar-icon" src={sidebarIcon} />
          </button>
          {/* <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          > */}
          <SearchBar />
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {/* <NightModeSwitch
              darkModeState={{ value: isDarkMode, setter: setIsDarkMode }}
            /> */}
            <div style={{marginRight:"5px"}}>
              <UserButton
                darkModeState={{ value: isDarkMode, setter: setIsDarkMode }}
                userData={userData}
              />
            </div>

            {/* <UserSVG className={"user-icon"} /> */}
          </div>

          {/* <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
            }}
          >
            NIGHT MODE
          </button> */}
          {/* </div> */}
        </div>
        {/* CONTENT: */}
        <div className="dashboard--content">
          <div className="content-centered">
            <Outlet />
          </div>
          {/* {sidebarSelection?.element} */}

          {/* react router will insert elements using Outlet according to URL path: */}
        </div>
      </div>

      {/* possible search param-eters:
      type, date, name
      */}
      <LoggedInChecker isValidToken={isValidToken}/>
    </div>
  );
}
