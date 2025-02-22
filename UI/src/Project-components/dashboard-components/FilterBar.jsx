import "../../css/filterBar.css";
import DropDown from "./DropDown";
import useViewportWidth from "../../helpers/useViewPortWidth";
import { useEffect, useState } from "react";
export default function FilterBar(props) {
  const { filterConfigurationState } = props;
  const [isPastWidthAndSideBarClosed, setIsPastWidthAndSideBarClosed] =
    useState(false);

  useEffect(() => {
    function handleResize() {
      const isSidebarEnabled =
        document
          .querySelector(".dashboard--container")
          .getAttribute("sidebar-state") === "true";

      const isPastWidthAndSideBarClosed =
        window.innerWidth >= 700 && !isSidebarEnabled;

      setIsPastWidthAndSideBarClosed(isPastWidthAndSideBarClosed);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  function optionClickHandler(option, label, e) {
    e.stopPropagation();
    // update main filter configuration state stored at dashboard level
    filterConfigurationState.setter((prev) => {
      return {
        ...prev,
        [label]: {
          ...prev[label],
          [option]: !filterConfigurationState.value[label]?.[option],
        },
      };
    });
  }

  return (
    <div className="FilterBar">
      {isPastWidthAndSideBarClosed ? (
        <>
          <DropDown
            label={"Search By"}
            list={["Name", "Tags", "Ownership"]}
            listState={filterConfigurationState.value}
            optionClickHandler={optionClickHandler}
          />
          <DropDown
            label={"Status"}
            listState={filterConfigurationState.value}
            list={["Active", "Offline"]}
            optionClickHandler={optionClickHandler}
          />
          <DropDown
            label={"Criticality"}
            list={["Active", "Offline"]}
            listState={filterConfigurationState.value}
            optionClickHandler={optionClickHandler}
          />
          <DropDown
            label={"Dependencies"}
            list={["Active", "Offline"]}
            listState={filterConfigurationState.value}
            optionClickHandler={optionClickHandler}
          />
        </>
      ) : (
        <DropDown
          label={"Filter By"}
          list={["Tags", "Status", "Criticality", "Dependencies"]}
          listState={filterConfigurationState.value}
          optionClickHandler={optionClickHandler}
        />
      )}
    </div>
  );
}
