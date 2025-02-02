import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import "../../css/dashboard.css";
import { useState } from "react";
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
export default function Dashboard() {
  // sidebar selection controls content element displayed:
  const [sidebarSelection, setsidebarSelection] = useState({
    name: "Home",
    element: <div>Home</div>,
  });
  const [isNightMode, setIsNightMode] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
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
  return (
    <div id={isNightMode && "night-mode"} className="dashboard--container">
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
          <div style={{ display: "flex", alignItems: "center", gap:"40px" }}>
            <NightModeSwitch
              nightModeState={{ value: isNightMode, setter: setIsNightMode }}
            />
            {/* <UserSVG className={"user-icon"} /> */}
          </div>

          {/* <button
            onClick={() => {
              setIsNightMode(!isNightMode);
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
    </div>
  );
}
