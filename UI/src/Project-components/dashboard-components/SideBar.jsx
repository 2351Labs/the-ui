import Option from "./Option";
import homeIcon from "../../assets/dashboard/home.svg";
import bookIcon from "../../assets/dashboard/catalog.svg";
import sIcon from "../../assets/dashboard/s.svg";
import settingsIcon from "../../assets/dashboard/settings.svg";
import peopleIcon from "../../assets/dashboard/people.svg";
import reportsIcon from "../../assets/dashboard/reports.svg";
import "../../css/sideBar.css";
export default function SideBar(props) {
  const { sidebarState } = props;
  return (
    <div
      style={
        sidebarState.isEnabled
          ? { animation: "growWidth .5s forwards" }
          : { animation: "shrinkWidth .5s forwards" }
      }
      className="sidebar"
    >
      <div className="top">
        <div className="top--icon-header-container">
          <img src={sIcon} />
          <div
            style={sidebarState.isEnabled ? { } : {visibility:"hidden"}}
            className="top--header"
          >
            SpecVault
          </div>
        </div>
        <div
          style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}
          className="top-welcome"
        >
          Welcome, Jared!
        </div>
        <div className="border"></div>
      </div>
      {/* <Option img={homeIcon} name={"Dashboard"} id={"selected"}/> */}
      <div className="options-container">
        <div className="options-list">
          {/* <Option img={bookIcon} name={"Analytics"} /> */}
          <Option sidebarState={sidebarState} img={bookIcon} name={"Catalog"} />
          <Option
            sidebarState={sidebarState}
            img={reportsIcon}
            name={"Reports"}
          />
          <Option
            sidebarState={sidebarState}
            img={peopleIcon}
            name={"People"}
          />
        </div>
        <Option
          sidebarState={sidebarState}
          img={settingsIcon}
          name={"Settings"}
          style={{
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        />
      </div>
      {/* <Option img={homeIcon} name={"Dashboard"}/> */}
    </div>
  );
}
