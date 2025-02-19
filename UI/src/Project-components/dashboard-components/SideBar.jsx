import Option from "./Option";
import homeIcon from "../../assets/dashboard/home.svg";
import bookIcon from "../../assets/dashboard/catalog.svg";
import LogoSVG from "../../assets/dashboard/s.svg?react";
import settingsIcon from "../../assets/dashboard/settings.svg";
import peopleIcon from "../../assets/dashboard/people.svg";
import reportsIcon from "../../assets/dashboard/reports.svg";
import "../../css/sideBar.css";
import useViewportWidth from "../../helpers/useViewPortWidth";
import useClickOutside from "../../helpers/useClickOutside";
import { useRef } from "react";
import bellIcon from "../../assets/dashboard/bell.svg";
import UserSVG from "../../assets/dashboard/user.svg?react";
export default function SideBar(props) {
  const { sidebarState, sidebarOptions } = props;
  const sidebarRef = useRef(null);
  const isPastWidth = useViewportWidth(770);
  useClickOutside(sidebarRef, () => {
    !isPastWidth && sidebarState.setToggleSidebar(false);
  });

  const popupConfig = !(isPastWidth && sidebarState.isEnabled)
    ? {
        position: "absolute",
        height: "100%",
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
      {(isPastWidth || sidebarState.isEnabled) && (
        <div
          ref={sidebarRef}
          style={
            sidebarState.isEnabled
              ? {
                  animation: "growWidth .3s ease-in-out",
                  minWidth: "270px",
                  maxWidth: "270px",

                  ...popupConfig,
                }
              : {
                  animation: "shrinkWidth .3s ease-in-out",
                  minWidth: "87px",
                  maxWidth: "87px",
                }
          }
          className="sidebar"
        >
          <div className="top">
            <div className="top--icon-header-container">
              <LogoSVG className={"logo"} />
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
              {Object.keys(sidebarOptions).map((objectKey, index) => {
                return (
                  <Option
                    sidebarOptions={sidebarOptions}
                    key={index}
                    sidebarState={sidebarState}
                    svg={sidebarOptions[objectKey].svg}
                    name={sidebarOptions[objectKey].label}
                    element={sidebarOptions[objectKey].element}
                  />
                );
              })}
            </div>
            {/* seperate: */}
            <Option
              sidebarOptions={sidebarOptions}
              sidebarState={sidebarState}
              svg={<UserSVG/>}
              name={"Jared Stoddard"}
              element={<div>IN DEV</div>}
            />
          </div>
          {/* <Option img={homeIcon} name={"Dashboard"}/> */}
        </div>
      )}
    </>
  );
}
