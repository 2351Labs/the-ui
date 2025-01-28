import "../../../css/catalogItemView.css";
import { useState } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import infoIcon from "../../../assets/dashboard/catalog-assets/info.svg";
import { Link, useLoaderData, useParams } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs";
import ChangeHistory from "./ChangeHistory";
import { Outlet } from "react-router-dom";
import documentIcon from "../../../assets/dashboard/catalog-assets/document.svg";
import historyIcon from "../../../assets/dashboard/catalog-assets/history.svg";
import linkIcon from "../../../assets/dashboard/catalog-assets/link.svg";
import treeStructureIcon from "../../../assets/dashboard/catalog-assets/tree-structure.svg";
import keyIcon from "../../../assets/dashboard/catalog-assets/key.svg";

export default function CatalogItemView() {
  const { itemDataLoader, itemID } = useLoaderData();
  const [itemData, setItemData] = useState(itemDataLoader);

  const navBarOptions = {
    documentation: {
      label: "Documentation",
      img: documentIcon,
      element: <div>Documentation</div>,
    },
    changeHistory: {
      label: "Change History",
      img: historyIcon,
      element: <ChangeHistory />,
    },
    dependencies: {
      label: "Dependencies",
      img: treeStructureIcon,
      element: <div>Dependencies</div>,
    },
    ownership: {
      label: "Ownership",
      img: keyIcon,
      element: <div>Ownership</div>,
    },
  };
  //   default selection is first bar option
  const [navBarSelection, setNavBarSelection] = useState(
    Object.keys(navBarOptions)[0]
  );

  return (
    <div className="catalogItemView">
      <BreadCrumbs itemID={itemID} itemData={itemData} />

      <div className="name-container">
        <CatalogItemName
          itemID={itemID}
          itemDataState={{ value: itemData, setter: setItemData }}
        />
        <div className="description-container">
          <img style={{ rotate: "180deg" }} src={infoIcon} />
          <div>{itemData.description}</div>
        </div>
        <CatalogNavigationBar
          navBarOptions={navBarOptions}
          navBarState={{ value: navBarSelection, setter: setNavBarSelection }}
        />
      </div>
      <div className="catalog-item-content">
        <div className="left-split">{navBarOptions[navBarSelection].element}</div>
        <div className="right-split">
          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value">github.com</div>
          </div>
          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value">github.com</div>
          </div>
          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value">github.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
