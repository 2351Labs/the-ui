import { useRef, useState } from "react";
import checkIcon from "../../assets/dashboard/check.svg";
import dropdownIcon from "../../assets/dashboard/dropdown.svg";
import useClickOutside from "../../helpers/useClickOutside";
import "../../css/dropDown.css";
export default function DropDown(props) {
  const { label, list, filterConfigurationState } = props;
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setIsDropdown(false);
  });

  return (
    <button
      ref={dropdownRef}
      onClick={(e) => {
        setIsDropdown(!isDropdown);
      }}
      style={
        isDropdown
          ? { border: "2px solid var(--primary)" }
          : { border: "2px solid var(--dashboard-grey)" }
      }
      className="DropDown"
    >
      <span className="dropdown-label" htmlFor="dropdown-btn">{label}</span>

      <img
        style={isDropdown ? { rotate: "180deg" } : {}}
        //   id="main-filter"
        className="dropdown-icon"
        src={dropdownIcon}
      />
      {isDropdown && (
        <div id="dropdown" className="dropdown-list">
          {list.map((option, index) => {
            return (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // update main filter configuration state stored at dashboard level
                  filterConfigurationState.setter((prev) => {
                    return {
                      ...prev,
                      [label]: {
                        ...prev[label],
                        [option]:
                          !filterConfigurationState.value[label]?.[option],
                      },
                    };
                  });
                }}
                key={index}
                className="option-btn"
              >
                <label className="option-label" id={`option-btn-${index}`}>
                  <img
                    style={
                      filterConfigurationState.value[label]?.[option]
                        ? { backgroundColor: "var(--primary)" }
                        : { backgroundColor: "grey" }
                    }
                    src={checkIcon}
                  />
                  {option}
                </label>
              </button>
            );
          })}
        </div>
      )}
    </button>
  );
}
