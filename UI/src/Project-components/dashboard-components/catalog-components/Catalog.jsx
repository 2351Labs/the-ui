import { useState } from "react";
import "../../../css/Catalog.css";
import filterIcon from "../../../assets/dashboard/filter.svg";
import CatalogItemView from "../catalog-components/CatalogItemView";
// import dropdownIcon from "../../assets/dashboard/dropdown.svg";
export default function Catalog() {
  const [catalogItemSelection, setCatalogItemSelection] = useState(null);
  const [catalogData, setCatalogData] = useState({
    1: {
      name: "Order Service",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/9/25",
      description:
        "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    2: {
      name: "Printing Service",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/14/25",
      description:
        "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
    },
  });

  const CatalogKeys = [
    { name: "Name", width: "200px" },
    { name: "Owner", width: "100px" },
    { name: "Type", width: "100px" },
    { name: "Created", width: "100px" },
  ];

  const [sortByKeySelection, setSortByKeySelection] = useState();
  //SUB COMPONENT AT BOTTOM OF FILE
  return (
    <>
      {!catalogItemSelection ? (
        <div className="catalog-container">
          <div className="catalog">
            <div className="catalog--keys-container">
              {CatalogKeys.map((key, index) => {
                return (
                  <CatalogKey
                    key={index}
                    sortByKeysState={{
                      value: sortByKeySelection,
                      setter: setSortByKeySelection,
                    }}
                    width={key.width}
                    name={key.name}
                  ></CatalogKey>
                );
              })}
            </div>
            <div>
              {Object.keys(catalogData).map((itemID, index) => {
                return (
                  <div
                    onClick={() => {
                      setCatalogItemSelection(itemID);
                    }}
                    key={index}
                  >
                    {catalogData[itemID].name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <CatalogItemView
          setCatalogItemSelection={setCatalogItemSelection}
          catalogDataState={{ value: catalogData, setter: setCatalogData }}
          itemID={catalogItemSelection}
        />
      )}
    </>
  );
}

function CatalogKey(props) {
  const { sortByKeysState, name, width } = props;
  const isActiveFilter = name == sortByKeysState.value;
  const [toggleFilterMode, setToggleFilterMode] = useState(0);
  return (
    <div
      onClick={(e) => {
        // if filter is active for selection, toggle modes. Else change to new filter selection
        if (isActiveFilter) {
          if (toggleFilterMode == 2) {
            // reset after passing mode 2
            setToggleFilterMode(0);
            sortByKeysState.setter();
          } else {
            setToggleFilterMode((prev) => {
              return prev + 1;
            });
          }
        } else {
          // on new filter selection, set starting filter mode to 1
          setToggleFilterMode(1);
          sortByKeysState.setter(name);
        }
      }}
      className="catalog--key"
      style={
        !isActiveFilter
          ? { width: `${width}` }
          : {
              width: `${width}`,
              backgroundColor: "var(--dashboard-grey-hover)",
            }
      }
    >
      <div> {name}</div>
      <div className="sort-container">
        <img
          style={
            toggleFilterMode == 1 && isActiveFilter ? {} : { opacity: 0.3 }
          }
          className="sort-icon top-sort"
          src={filterIcon}
        />
        <img
          style={
            toggleFilterMode == 2 && isActiveFilter ? {} : { opacity: 0.3 }
          }
          className="sort-icon bottom-sort"
          src={filterIcon}
        />
      </div>
    </div>
  );
}
