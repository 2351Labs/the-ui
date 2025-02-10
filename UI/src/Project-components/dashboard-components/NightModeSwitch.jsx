import NightSVG from "../../assets/dashboard/night.svg?react";
import DaySVG from "../../assets/dashboard/day.svg?react";
import styled from "styled-components";
import { useEffect } from "react";
import "../../css/nightModeSwitch.css";
export default function NightModeSwitch(props) {
  const { darkModeState } = props;
  // set night mode based on browser settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      darkModeState.setter(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="NightModeSwitch" style={{ height: "30px", width: "60px" }}>
      <div className={`toggle-switch`}>
        <label>
          <input
            onChange={() => {
              darkModeState.setter(!darkModeState.value);
            }}
            checked={darkModeState.value}
            type="checkbox"
          ></input>
          <span class="slider"></span>
        </label>
      </div>
    </div>
  );
}
