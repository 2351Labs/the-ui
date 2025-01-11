import Option from "./Option";
import homeIcon from "../../assets/dashboard/home.svg";
import bookIcon from "../../assets/dashboard/catalog.svg";
import sIcon from "../../assets/dashboard/s.svg";
import settingsIcon from "../../assets/dashboard/settings.svg";
import peopleIcon from "../../assets/dashboard/people.svg";
import reportsIcon from "../../assets/dashboard/reports.svg";
import "../../css/sideBar.css";
import useViewportWidth from "../../helpers/useViewPortWidth";
import useClickOutside from "../../helpers/useClickOutside";
import { useRef } from "react";
import bellIcon from "../../assets/dashboard/bell.svg";
import userIcon from "../../assets/dashboard/user.svg";
export default function SideBar(props) {
  const { sidebarState } = props;
  const sidebarRef = useRef(null);
  const isPast725px = useViewportWidth(725);
  useClickOutside(sidebarRef, () => {
    !isPast725px && sidebarState.setToggleSidebar(false);
  });

  const popupConfig = !(isPast725px && sidebarState.isEnabled)
    ? {
        position: "absolute",
        height:"100%",
        zIndex: "3",
        top: "0px",
        left: "0px",
        borderRadius: "0px",
        borderBottomRightRadius: "10px",
        borderTopRightRadius: "10px",
      }
    : {};
  return (
    <>
      {/* hide sidebar if under 725px and sidebar closed */}
      {(isPast725px || sidebarState.isEnabled) && (
        <div
          ref={sidebarRef}
          style={
            sidebarState.isEnabled
              ? {
                  animation: "growWidth .5s forwards",
                  minWidth: "270px",
                  ...popupConfig,
                }
              : { animation: "shrinkWidth .5s forwards" }
          }
          className="sidebar"
        >
          <div className="top">
            <div className="top--icon-header-container">
              <img className="logo" src={sIcon} />
              <div
                style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}
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
              <Option
                sidebarState={sidebarState}
                img={bookIcon}
                name={"Catalog"}
              />
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
              <Option
                sidebarState={sidebarState}
                img={peopleIcon}
                name={"Service Maturity"}
              />  
          
            </div>
            {/* <Option
              sidebarState={sidebarState}
              img={settingsIcon}
              name={"Settings"}
              style={{
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
            /> */}
            {/* <img className="bell-icon" src={bellIcon} /> */}
            <Option
              sidebarState={sidebarState}
              img={userIcon}
              name={"Jared Stoddard"}
            />
          </div>
          {/* <Option img={homeIcon} name={"Dashboard"}/> */}
        </div>
      )}
    </>
  );
}
