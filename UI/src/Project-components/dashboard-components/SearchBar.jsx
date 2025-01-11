import searchIcon from "../../assets/dashboard/search.svg";
import dropdownIcon from "../../assets/dashboard/dropdown.svg";
import lineSVG from "../../assets/dashboard/line.svg";
import { useRef, useState } from "react";
import checkIcon from "../../assets/dashboard/check.svg";
import useClickOutside from "../../helpers/useClickOutside";
import '../../css/searchBar.css'
export default function SearchBar() {
  const filterOptions = ["Services", "Infrastructure", "Domains", "Teams"];
  const [isMainFilterOpen, setIsMainFilterOpen] = useState(false);
  const [mainFilterConfiguration, setMainFilterConfiguration] = useState([
    "Domains",
  ]);
  const mainFilterRef = useRef(null);
  useClickOutside(mainFilterRef, () => {
    setIsMainFilterOpen(false);
  });
  return (
    <div className="catalog-searchbar">
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
          All items
        </div>
        <img style={isMainFilterOpen ? {rotate: "180deg"} : {}} id="main-filter" className="dropdown" src={dropdownIcon} />
        {isMainFilterOpen && (
          <div id="dropdown" className="dropdown-list">
            {filterOptions.map((option) => {
              return (
                <div className="filter-option-container">
                  <div
                    style={
                      mainFilterConfiguration.includes(option)
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
      <input placeholder="Search"></input>
    </div>
  );
}
