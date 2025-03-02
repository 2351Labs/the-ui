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
import CustomCatalogTable from "./CustomCatalogTable";
// import dropdownIcon from "../../assets/dashboard/dropdown.svg";
export default function Catalog() {
  const [filterConfiguration, setFilterConfiguration] = useState({});
  const location = useLocation();
  let params = new URLSearchParams(window.location.search);

  useEffect(() => {
    // detect changes to URL and trigger rerender to show updated elements
    // for keeping search query indicator in sync with URL
  }, [location]);


  //SUB COMPONENT AT BOTTOM OF FILE
  return (
    <div className="catalog">
      {/* <StyledBreadCrumbs /> */}
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
        </div>
        <FilterBar
          filterConfigurationState={{
            value: filterConfiguration,
            setter: setFilterConfiguration,
          }}
        />
      </div>

      {/* <StyledCatalogTableMUI /> */}
      <CustomCatalogTable />
      {/* <CatalogTable catalogData={catalogData} /> */}
    </div>
  );
}
