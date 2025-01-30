import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import "../../css/dashboard.css";
import { useState } from "react";
import sidebarIcon from "../../assets/dashboard/sidebar.svg";
import Catalog from "./catalog-components/Catalog";
import FilterBar from "./FilterBar";
// for defining sidebar:
import homeIcon from "../../assets/dashboard/home.svg";
import catalogIcon from "../../assets/dashboard/catalog.svg";
import sIcon from "../../assets/dashboard/s.svg";
import settingsIcon from "../../assets/dashboard/settings.svg";
import peopleIcon from "../../assets/dashboard/people.svg";
import userIcon from "../../assets/dashboard/user.svg";
import reportsIcon from "../../assets/dashboard/reports.svg";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  // sidebar selection controls content element displayed:
  const [sidebarSelection, setsidebarSelection] = useState({
    name: "Home",
    element: <div>Home</div>,
  });
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const sidebarOptions = {
    Catalog: { label: "Catalog", element: <Catalog />, img: catalogIcon },
    Reports: { label: "Reports", element: <div>EMPTY</div>, img: reportsIcon },
    People: { label: "People", element: <div>EMPTY</div>, img: peopleIcon },
    // ServiceMaturity: {label:"Service Maturity", element: <div>EMPTY</div>, img: reportsIcon },
  };
  return (
    <div className="dashboard--container">
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
          <img className="user-icon" src={userIcon} />
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
