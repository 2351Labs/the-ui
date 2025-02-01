import { useState, useEffect } from "react";
import "../../../css/Catalog.css";
import filterIcon from "../../../assets/dashboard/filter.svg";
import CatalogItemView from "../catalog-components/CatalogItemView";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import FilterBar from "../FilterBar";
import CatalogTable from "./CatalogTable";
import StyledComponent from "./StyledComponent";
import StyledCatalogTableMUI from "./StyledCatalogTableMUI";
import StyledBreadCrumbs from "../StyledBreadCrumbs";
import { useLocation } from "react-router-dom";
import MultiSelectPrime from "../MultiSelectPrime";
// import dropdownIcon from "../../assets/dashboard/dropdown.svg";
export default function Catalog() {
  const [filterConfiguration, setFilterConfiguration] = useState({});
  const location = useLocation();
  let params = new URLSearchParams(window.location.search);

  useEffect(() => {
    // detect changes to URL and trigger rerender to show updated elements
    // for keeping search query indicator in sync with URL
  }, [location]);

  // const {itemID} = useLoaderData();
  // const [catalogItemSelection, setCatalogItemSelection] = useState(null);
  const [catalogData, setCatalogData] = useState({
    1: {
      name: "Order Service",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/9/25",
      status: "Online",
      description:
        "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    2: {
      name: "Printing Service",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/14/25",
      status: "Offline",
      description:
        "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
    },
  });

  const CatalogKeys = [
    { name: "name", width: "150px" },
    { name: "owner", width: "150px" },
    { name: "type", width: "120px" },
    { name: "created", width: "85px" },
  ];

  const [sortByKeySelection, setSortByKeySelection] = useState();
  //SUB COMPONENT AT BOTTOM OF FILE
  return (
    <div className="catalog">
      <StyledBreadCrumbs />
      {/* <h3>Micro Service</h3> */}
      {/* <StyledComponent/> */}
      <div className="filterBar-container">
        {/* <div className="sort-by">Sort By</div> */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h3 className="search-results-header">
            {params.get("q") ? "15+ results found" : "All Results"}
          </h3>
          {params.get("q") && (
            <div className="search-query">{`"${params.get("q")}"`}</div>
          )}
          {console.log(params)}
        </div>
        <FilterBar
          // toggleSidebar={toggleSidebar}
          filterConfigurationState={{
            value: filterConfiguration,
            setter: setFilterConfiguration,
          }}
        />
      </div>
      <StyledCatalogTableMUI />

      {/* <CatalogTable catalogData={catalogData} /> */}
    </div>
    // <div className="catalog-container">
    //   <div className="catalog">
    //     <div className="catalog--keys-container">
    //       {CatalogKeys.map((key, index) => {
    //         return (
    //           <CatalogKey
    //             key={index}
    //             sortByKeysState={{
    //               value: sortByKeySelection,
    //               setter: setSortByKeySelection,
    //             }}
    //             width={key.width}
    //             name={key.name}
    //           />
    //         );
    //       })}
    //     </div>
    //     <div className="list-container">
    //       {Object.keys(catalogData).map((itemID, index) => {
    //         return (
    //           <Link
    //             to={itemID}
    //             className="row-container"
    //             // onClick={() => {
    //             //   setCatalogItemSelection(itemID);
    //             // }}
    //             key={index}
    //           >
    //             {CatalogKeys.map((keyObj, index) => {
    //               return (
    //                 <div
    //                   className="catalog-table"
    //                   key={index}
    //                   style={{
    //                     width: keyObj.width,
    //                     padding: "15px",
    //                     // color: `${
    //                     //   keyObj.name == "name" ? "var(--primary)" : "black"
    //                     // }`,
    //                   }}
    //                 >
    //                   {catalogData[itemID][keyObj.name]}
    //                 </div>
    //               );
    //             })}
    //           </Link>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
}

function CatalogKey(props) {
  const { sortByKeysState, name, width } = props;
  const isActiveFilter = name == sortByKeysState.value;
  const [toggleFilterMode, setToggleFilterMode] = useState(0);

  function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
              opacity: "1",
              backgroundColor: "var(--dashboard-grey-hover)",
            }
      }
    >
      <div> {capitalizeFirstLetter(name)}</div>
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
