import searchIcon from "../../assets/dashboard/search.svg";
import dropdownIcon from "../../assets/dashboard/dropdown.svg";
import lineSVG from "../../assets/dashboard/line.svg";
import { useRef, useState } from "react";
import checkIcon from "../../assets/dashboard/check.svg";
import useClickOutside from "../../helpers/useClickOutside";
import "../../css/searchBar.css";
export default function SearchBar() {
  const filterOptions = ["Services", "Infrastructure", "Domains", "Teams"];
  const [isMainFilterOpen, setIsMainFilterOpen] = useState(false);
  const [mainFilterConfiguration, setMainFilterConfiguration] = useState({});
  const mainFilterRef = useRef(null);
  const inputRef = useRef(null);
  useClickOutside(mainFilterRef, () => {
    setIsMainFilterOpen(false);
  });

  const mainFilterSelection = Object.keys(mainFilterConfiguration).filter(
    (key) => mainFilterConfiguration[key] === true
  );
  const mainFilterSelectionCount = mainFilterSelection.length;
  return (
    <div
      onClick={(e) => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      className="catalog-searchbar"
    >
      <div
        id="main-filter"
        ref={mainFilterRef}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.target.id);
          if (e.target.id == "main-filter") {
            setIsMainFilterOpen(!isMainFilterOpen);
          }
        }}
        style={
          isMainFilterOpen
            ? { border: "2px solid var(--primary)" }
            : { border: "2px solid transparent" }
        }
        className="search-filter-container"
      >
        <div id="main-filter" className="filter-selection">
          {mainFilterSelectionCount == 0
            ? "All items"
            : `${
                mainFilterSelectionCount == 1
                  ? `${mainFilterSelection[0]}`
                  : `${mainFilterSelectionCount} items`
              }`}
        </div>
        <img
          style={isMainFilterOpen ? { rotate: "180deg" } : {}}
          id="main-filter"
          className="dropdown"
          src={dropdownIcon}
        />
        {isMainFilterOpen && (
          <div id="dropdown" className="dropdown-list">
            {filterOptions.map((option) => {
              return (
                <div
                  onClick={() => {
                    setMainFilterConfiguration((prev) => {
                      return {
                        ...prev,
                        [option]: !mainFilterConfiguration[option],
                      };
                    });
                  }}
                  className="filter-option-container"
                >
                  <div
                    id="inactive"
                    style={
                      mainFilterConfiguration[option]
                        ? { backgroundColor: "var(--primary)" }
                        : { backgroundColor: "grey" }
                    }
                    className="checkbox-background"
                  >
                    <img src={checkIcon} />
                  </div>
                  <div>{option}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <img className="splitter" src={lineSVG} />
      <img className="search-icon" src={searchIcon} />
      <input ref={inputRef} placeholder="Search"></input>
    </div>
  );
}
