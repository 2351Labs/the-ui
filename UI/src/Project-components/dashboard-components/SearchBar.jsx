import searchIcon from "../../assets/dashboard/search.svg";
import DropdownIcon from "../../assets/dashboard/dropdown.svg?react";
import lineSVG from "../../assets/dashboard/line.svg";
import { useRef, useState } from "react";
import CheckIcon from "../../assets/dashboard/check.svg?react";
import useClickOutside from "../../helpers/useClickOutside";
import "../../css/searchBar.css";
import { useNavigate } from "react-router-dom";
import useViewportWidth from "../../helpers/useViewPortWidth";

import MultiSelectPrime from "./MultiSelectPrime";
export default function SearchBar() {
  const isPastWidth = useViewportWidth(480);
  // const isPastWidth = true;

  const filterOptions = [
    "Services",
    "Infrastructure",
    "Domains",
    "Teams",
    "Libraries",
    "APIs",
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
        navigate(`/dashboard/catalog?q=${inputRef.current.value}`, {
          replace: true,
        });
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
                ? "All items"
                : `${
                    mainFilterSelectionCount == 1
                      ? `${mainFilterSelection[0]}`
                      : `${mainFilterSelectionCount} items`
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
                      {/* <div
                      id="inactive"
                      style={
                        mainFilterConfiguration[option]
                          ? {
                              backgroundColor: "var(--primary)",
                              border: " 1px solid transparent",
                            }
                          : {
                              backgroundColor: "white",
                              border: " 1px solid rgb(207, 207, 207)",
                            }
                      }
                      className="checkbox-background"
                    >
                      <img src={checkIcon} />
                    </div> */}
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
