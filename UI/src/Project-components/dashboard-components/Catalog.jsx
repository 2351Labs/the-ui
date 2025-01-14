import { useState } from "react";
import "../../css/Catalog.css";
import filterIcon from "../../assets/dashboard/filter.svg";
// import dropdownIcon from "../../assets/dashboard/dropdown.svg";
export default function Catalog() {
  // const catalogKeys = ["Name", "Owner", "Type", "Created"]

  const [sortByKeySelection, setSortByKeySelection] = useState();
  //SUB COMPONENT AT BOTTOM OF FILE 
  return (
    <div className="catalog">
      <div className="catalog--keys-container">
        <CatalogKey
          sortByKeysState={{
            value: sortByKeySelection,
            setter: setSortByKeySelection,
          }}
          width={"200px"}
          name={"Name"}
        ></CatalogKey>
        <CatalogKey
          sortByKeysState={{
            value: sortByKeySelection,
            setter: setSortByKeySelection,
          }}
          width={"100px"}
          name={"Owner"}
        ></CatalogKey>
        <CatalogKey
          sortByKeysState={{
            value: sortByKeySelection,
            setter: setSortByKeySelection,
          }}
          width={"100px"}
          name={"Type"}
        ></CatalogKey>
      </div>
      {/* BELOW KEYS */}
      {/* <div>CONTENT</div> */}
    </div>
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
          if(toggleFilterMode==2){
            // reset after passing mode 2
            setToggleFilterMode(0)
            sortByKeysState.setter()
          }else{
            setToggleFilterMode(prev=>{
              return(prev+1);
            })
          }
        } else {
          // on new filter selection, set starting filter mode to 1
          setToggleFilterMode(1)
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
          style={toggleFilterMode == 1 && isActiveFilter ? {} : { opacity: 0.3 }}
          className="sort-icon top-sort"
          src={filterIcon}
        />
        <img
          style={toggleFilterMode == 2 && isActiveFilter ? {} : { opacity: 0.3 }}
          className="sort-icon bottom-sort"
          src={filterIcon}
        />
      </div>
    </div>
  );
}
