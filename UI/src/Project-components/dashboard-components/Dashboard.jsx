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
// context for editing document:
import { EditDocumentContext } from "../context/dashboardContext";
import EditDocumentPopup from "./catalog-components/EditDocumentPopup";
export default function Dashboard() {
  // for edit document context:
  const [editingDocument, setEditingDocument] = useState({
    isEnabled: false,
    header: null,
    text: null,
  });

  const navigate = useNavigate();
  // sidebar selection controls content element displayed:
  const [isValidToken, setIsValidToken] = useState(true);
  // assume token valid while waiting for response for user data from server
  const sidebarOptions = {
    catalog: {
      label: "Catalog",
      name: "catalog",
      element: <Catalog />,
      svg: <CatalogSVG />,
    },
    reports: {
      label: "Reports",
      name: "reports",
      element: <div>EMPTY</div>,
      svg: <ReportsSVG />,
    },
    people: { label: "People", element: <div>EMPTY</div>, svg: <PeopleSVG /> },
    // ServiceMaturity: {label:"Service Maturity", element: <div>EMPTY</div>, img: reportsIcon },
  };

  const [sidebarSelection, setsidebarSelection] = useState(
    () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const section = pathSegments[1]?.toLocaleLowerCase() || null; // Get second segment or return null if it doesn't exist

      console.log("section", section);
      if (section) {
        console.log("RETURN 1", sidebarOptions[section]);
        return sidebarOptions[section];
      } else {
        return sidebarOptions.catalog;
      }
    }
    //   {
    //   name: "Catalog",
    //   element:  <Catalog />,
    // }
  );
  console.log("INIT", sidebarSelection);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [userData, setUserData] = useState();

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/getUser")
      .then((response) => {
        // console.log("RESPONSE DATA", response);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsValidToken(false);
        // navigate("/login")
      });
  }, []);

  function handleToggleSidebar() {
    setToggleSidebar(!toggleSidebar);
    document
      .querySelector(".dashboard--container")
      .setAttribute("sidebar-state", `${!toggleSidebar}`);
  }

  const maxWidth = 1100;
  const [isPastWidth, setIsPastWidth] = useState(window.innerWidth <= maxWidth);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= maxWidth) {
        setIsPastWidth(false);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${false}`);
      } else {
        setIsPastWidth(true);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${true}`);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id={isDarkMode ? "night-mode" : undefined}
      className="dashboard--container"
      sidebar-state="false"
    >
      <SideBar
        setToggleSidebar={setToggleSidebar}
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
          <button onClick={handleToggleSidebar} className="sidebar-toggle-btn">
            <img className="sidebar-icon" src={sidebarIcon} />
          </button>

          <SearchBar />
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <div style={{ marginRight: "5px" }}>
              <UserButton
                darkModeState={{ value: isDarkMode, setter: setIsDarkMode }}
                userData={userData}
              />
            </div>
          </div>
        </div>
        {/* CONTENT: */}
        <div className="dashboard--content">
          <div
            style={
              !isPastWidth ? { width: "95%"} : {}
            }
            className="content-centered"
          >
            <EditDocumentContext.Provider
              value={{ editingDocument, setEditingDocument }}
            >
              {/* for edit document state */}
              <Outlet />
              {/* react router will insert elements using Outlet according to URL path: */}
            </EditDocumentContext.Provider>
          </div>
        </div>
      </div>

      {/* possible search param-eters:
      type, date, name
      */}
      {editingDocument.isEnabled && (
        <EditDocumentPopup
          editingDocument={editingDocument}
          setEditingDocument={setEditingDocument}
        />
      )}
      <LoggedInChecker isValidToken={isValidToken} />
    </div>
  );
}
