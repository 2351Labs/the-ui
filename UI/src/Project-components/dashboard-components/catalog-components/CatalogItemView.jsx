import "../../../css/catalogItemView.css";
import { useState } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import backIcon from "../../../assets/dashboard/catalog-assets/back.svg";
import infoIcon from "../../../assets/dashboard/catalog-assets/info.svg";
export default function CatalogItemView(props) {
  const { setCatalogItemSelection, itemID, catalogDataState } = props;
  const itemObj = catalogDataState.value[itemID];
  return (
    <div className="catalogItemView">
      <div className="catalog-bread-crumbs">
        <button
          style={{ opacity: ".6" }}
          onClick={() => {
            setCatalogItemSelection(null);
          }}
        >
          <img src={backIcon} />
        </button>
        <span
          style={{ cursor: "pointer", opacity: ".6" }}
          onClick={() => {
            setCatalogItemSelection(null);
          }}
        >
          Catalog /
        </span>
        <span> &nbsp;{itemObj.name}</span>
      </div>

      <div className="name-container">
        <CatalogItemName itemID={itemID} catalogDataState={catalogDataState} />
        <div className="description-container">
          <img style={{ rotate: "180deg" }} src={infoIcon} />
          <div>{itemObj.description}</div>
        </div>
        <CatalogNavigationBar />
      </div>
    </div>
  );
}
