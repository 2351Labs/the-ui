import searchIcon from "../../assets/dashboard/search.svg";
import DropdownIcon from "../../assets/dashboard/dropdown.svg?react";
import lineSVG from "../../assets/dashboard/line.svg";
import { useRef, useState, useEffect } from "react";
import CheckIcon from "../../assets/dashboard/check.svg?react";
import useClickOutside from "../../helpers/useClickOutside";
import "../../css/searchBar.css";
import { useNavigate } from "react-router-dom";
import useViewportWidth from "../../helpers/useViewPortWidth";

import MultiSelectPrime from "./MultiSelectPrime";
export default function SearchBar() {
  const maxWidth = 480;
  const [isPastWidth, setIsPastWidth] = useState(useViewportWidth(maxWidth));
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= maxWidth) {
        setIsPastWidth(false);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${false}`);
      } else {
        setIsPastWidth(true);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${true}`);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const isPastWidth = true;

  const filterOptions = [
    "Service",
    "Infrastructure",
    "Domain",
    "Team",
    "Library",
    "API",
  ];
  const [isMainFilterOpen, setIsMainFilterOpen] = useState(false);
  const [mainFilterConfiguration, setMainFilterConfiguration] = useState({});
  const mainFilterRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useClickOutside(mainFilterRef, () => {
    setIsMainFilterOpen(false);
  });
  const mainFilterSelection = Object.keys(mainFilterConfiguration).filter(
    (key) => mainFilterConfiguration[key] === true
  );
  const mainFilterSelectionCount = mainFilterSelection.length;

  function filterByTypes() {
    let filterString = "&entityTypes=";
    let isFirst = true; // To track if we're adding the first item

    for (let key in mainFilterConfiguration) {
      if (mainFilterConfiguration[key]) {
        if (!isFirst) {
          filterString += ","; // Add comma if it's not the first item
        }
        filterString += `${key}`;
        isFirst = false; // Mark the first item as added
      }
    }

    console.log("filterString", filterString);
    return filterString;
  }
  return (
    <form
      onClick={(e) => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
        navigate(
          `/dashboard/catalog?q=${inputRef.current.value}${filterByTypes()}`,
          {
            replace: true,
          }
        );
      }}
      className="catalog-searchbar"
    >
      <div
        className="catalog-searchbar-container"
        onClick={(e) => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {isPastWidth && (
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
            // style={
            //   isMainFilterOpen
            //     ? { border: "2px solid var(--primary)" }
            //     : { border: "2px solid transparent" }
            // }
            className={`search-filter-container ${
              isMainFilterOpen && "highlighted"
            }`}
          >
            <div id="main-filter" className="filter-selection">
              {mainFilterSelectionCount == 0
                ? "All Types"
                : `${
                    mainFilterSelectionCount == 1
                      ? `${mainFilterSelection[0]}`
                      : `${mainFilterSelectionCount} Types`
                  }`}
            </div>
            <DropdownIcon
              style={isMainFilterOpen ? { rotate: "180deg" } : {}}
              id="main-filter"
              className="dropdown"
            />
            {isMainFilterOpen && (
              <div id="dropdown" className="dropdown-list">
                {filterOptions.map((option, index) => {
                  return (
                    <div
                      key={index}
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
                      <CheckIcon
                        className={`dropdown-checkbox ${
                          mainFilterConfiguration[option] && "checked"
                        } `}
                      />
                      <div>{option}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {isPastWidth && <img className="splitter" src={lineSVG} />}
        <img className="search-icon" src={searchIcon} />
        <input ref={inputRef} placeholder="Search"></input>
      </div>
    </form>
  );
}
