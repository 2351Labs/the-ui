import "../../../css/catalogItemView.css";
import { useState } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import backIcon from "../../../assets/dashboard/catalog-assets/back.svg";
export default function CatalogItemView(props) {
  const { setCatalogItemSelection, itemID, catalogDataState } = props;
  const itemObj = catalogDataState.value[itemID];
  return (
    <div className="catalogItemView">
      <div className="catalog-bread-crumbs">
        <button
          onClick={() => {
            setCatalogItemSelection(null);
          }}
        >
          <img src={backIcon} />
        </button>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCatalogItemSelection(null);
          }}
        >
          Catalog &nbsp;  
        </span>
        / {itemObj.name}
      </div>

      <div className="name-container">
        <CatalogItemName itemID={itemID} catalogDataState={catalogDataState} />
        <div className="description-container">
          <img src={descriptionIcon} />
          <div>{itemObj.description}</div>
        </div>
        <CatalogNavigationBar />
      </div>
    </div>
  );
}
