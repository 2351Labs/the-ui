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
import { useEffect, useRef, useState } from "react";
import bellIcon from "../../assets/dashboard/bell.svg";
import UserSVG from "../../assets/dashboard/user.svg?react";
export default function SideBar(props) {
  const { sidebarState, sidebarOptions, setToggleSidebar, userData } = props;
  const maxWidth = 600;
  const [isPastWidth, setIsPastWidth] = useState(useViewportWidth(maxWidth));
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= maxWidth) {
        document
          .querySelector(".dashboard--container")
          .setAttribute("sidebar-popup-mode", `${false}`);
        setIsPastWidth(false);
      } else {
        document
          .querySelector(".dashboard--container")
          .setAttribute("sidebar-popup-mode", `${true}`);
        setIsPastWidth(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, () => {
    document
      .querySelector(".dashboard--container")
      .setAttribute("sidebar-state", `${false}`);
    setToggleSidebar(false);
  });

  const popupConfig = !(isPastWidth && sidebarState.isEnabled)
    ? {
        position: "absolute",
        height: "100%",
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
              {`Welcome${
                userData?.profile?.firstName
                  ? `, ${userData?.profile?.firstName}`
                  : ""
              }!`}
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
                    name={sidebarOptions[objectKey].label.toLowerCase()}
                    element={sidebarOptions[objectKey].element}
                  />
                );
              })}
            </div>
            {/* seperate: */}
            {/* <Option
              sidebarOptions={sidebarOptions}
              sidebarState={sidebarState}
              svg={<UserSVG />}
              name={"Jared Stoddard"}
              element={<div>IN DEV</div>}
            /> */}
          </div>
          {/* <Option img={homeIcon} name={"Dashboard"}/> */}
        </div>
      )}
    </>
  );
}
