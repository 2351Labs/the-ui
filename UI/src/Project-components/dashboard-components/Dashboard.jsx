import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import "../../css/dashboard.css";
import { useState } from "react";
import sidebarIcon from "../../assets/dashboard/sidebar.svg";
export default function Dashboard() {
  const [sidebarSelection, setsidebarSelection] = useState("Catalog");
  const [toggleSidebar, setToggleSidebar] = useState(true)
  return (
    <div className="dashboard--container">
      <SideBar
        sidebarState={{ value: sidebarSelection, setter: setsidebarSelection, isEnabled: toggleSidebar }}
      />
      <div className="dashboard--content">
        <div className="top-container">
          <button onClick={()=>{
            setToggleSidebar(!toggleSidebar)
          }} className="sidebar-toggle-btn" >
            <img className="sidebar-icon" src={sidebarIcon} />
          </button>
          <SearchBar />
        </div>
      </div>

      {/* possible search parameters:
      type, date, name
      */}
    </div>
  );
}
