import { useRef, useState } from "react";
import CheckIcon from "../../assets/dashboard/check.svg?react";
import dropdownIcon from "../../assets/dashboard/dropdown.svg";
import useClickOutside from "../../helpers/useClickOutside";
import "../../css/dropDown.css";
export default function DropDown(props) {
  const { label, list, optionClickHandler, listState } = props;
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
      className={`DropDown ${isDropdown && "highlighted"}`}
      // style={
      //   isDropdown
      //     ? { border: "1px solid var(--primary)" }
      //     : { border: "1px solid rgb(216, 216, 216)" }
      // }
    >
      <span className="dropdown-label" htmlFor="dropdown-btn">
        {label}
      </span>

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
                  optionClickHandler(option, label, e);
                }}
                key={index}
                className="option-btn"
              >
                <label className="option-label" id={`option-btn-${index}`}>
                  {/* <img
                    style={
                      listState[label]?.[option]
                        ? {
                            backgroundColor: "var(--primary)",
                            border: " 1px solid transparent",
                          }
                        : {
                            backgroundColor: "white",
                            border: " 1px solid rgb(207, 207, 207)",
                          }
                    }
                    src={CheckIcon}
                  /> */}
                  <CheckIcon
                    className={`dropdown-checkbox ${listState[label]?.[option] && "checked"} `}
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
