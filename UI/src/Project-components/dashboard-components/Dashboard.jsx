import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import "../../css/dashboard.css";
import { useState } from "react";
import sidebarIcon from "../../assets/dashboard/sidebar.svg";
import Catalog from "./Catalog";
export default function Dashboard() {
  const [sidebarSelection, setsidebarSelection] = useState("Catalog");
  const [toggleSidebar, setToggleSidebar] = useState(true);
  return (
    <div className="dashboard--container">
      <SideBar
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
          <SearchBar />
        </div>
        {/* CONTENT: */}
        <div className="dashboard--content">
        <Catalog />
        </div>
      </div>

      {/* possible search parameters:
      type, date, name
      */}
    </div>
  );
}
