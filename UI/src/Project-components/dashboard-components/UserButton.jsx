import { useState } from "react";
import "../../css/userButton.css";
import SettingsIcon from "../../assets/dashboard/settingsOutline.svg?react";
import LogoutIcon from "../../assets/dashboard/logout.svg?react";
import useClickOutside from "../../helpers/useClickOutside";
import { useRef } from "react";
import NightModeSwitch from "./NightModeSwitch";
import NightModeSVG from "../../assets/dashboard/nightMode.svg?react";
import { useNavigate } from "react-router-dom";
export default function UserButton(props) {
  const navigate = useNavigate();
  const { userData, darkModeState } = props;
  const [isOpen, setIsOpen] = useState(false);
  const userDropdownRef = useRef(null);
  useClickOutside(userDropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="UserButton">
      {userData && (
        <>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="circle"
          >
            <div className="letter">{userData.profile.firstName.charAt(0)}</div>
          </button>

          {isOpen && (
            <div ref={userDropdownRef} className="drop-down">
              <button className="item-container settings-container">
                <SettingsIcon className={"settings"} />
                <div>Settings</div>
              </button>
              <button
                onClick={() =>
                  darkModeState.setter((prev) => {
                    return !prev;
                  })
                }
                className="item-container"
              >
                <NightModeSVG className={"night-mode"} />
                <div>{!darkModeState.value ? "Dark" : "Light"} Mode</div>
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                }}
                className="item-container"
              >
                <LogoutIcon className={"logout"} />
                <div>Log out</div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
