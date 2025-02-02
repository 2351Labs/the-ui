import NightSVG from "../../assets/dashboard/night.svg?react";
import DaySVG from "../../assets/dashboard/day.svg?react";
import styled from "styled-components";
import "../../css/nightModeSwitch.css";
export default function NightModeSwitch(props) {
  const { nightModeState } = props;
  console.log("SWITHCING", nightModeState.value);

  return (
    <div className="NightModeSwitch" style={{ height: "30px", width: "60px" }}>
      <div className={`toggle-switch`}>
        <label>
          <input
            onChange={() => {
              nightModeState.setter(!nightModeState.value);
            }}
            checked={nightModeState.value}
            type="checkbox"
          ></input>
          <span class="slider"></span>
        </label>
      </div>
    </div>
  );
}
