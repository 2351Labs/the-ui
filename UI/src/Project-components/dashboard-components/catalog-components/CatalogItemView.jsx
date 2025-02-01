import "../../../css/catalogItemView.css";
import { useState } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import infoIcon from "../../../assets/dashboard/catalog-assets/info.svg";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ChangeHistory from "./ChangeHistory";
import { Outlet } from "react-router-dom";
import documentIcon from "../../../assets/dashboard/catalog-assets/document.svg";
import historyIcon from "../../../assets/dashboard/catalog-assets/history.svg";
import linkIcon from "../../../assets/dashboard/catalog-assets/link.svg";
import treeStructureIcon from "../../../assets/dashboard/catalog-assets/tree-structure.svg";
import keyIcon from "../../../assets/dashboard/catalog-assets/key.svg";
import Dependencies from "./Dependencies";
import openSourceIcon from "../../../assets/dashboard/catalog-assets/open-source.svg";
import StyledBreadCrumbs from "../StyledBreadCrumbs";
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
      element: <Dependencies />,
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
      <StyledBreadCrumbs itemID={itemID} itemData={itemData} />

      <div className="name-container">
        <div className="catalogItemName-container">
          <CatalogItemName
            itemID={itemID}
            itemDataState={{ value: itemData, setter: setItemData }}
          />
          {/* <div className="badge">
            <img src={openSourceIcon} />
            <div className="badge-text">Open source</div>
          </div> */}
        </div>
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
        <div className="left-split">
          {navBarOptions[navBarSelection].element}
        </div>
        <div className="right-split">
          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value-container">
              <img className="link-icon" src={linkIcon} />
              <div className="link">github.com/chakra-ui/chakra-ui</div>
            </div>
          </div>
          <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Version</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <div className="value">3.2.1</div>
              </div>
            </div>
            <div className="row-container">
              <div className="key">Score</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <div className="score">7.8</div>
              </div>
            </div>
          </div>
          <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Last updated</div>
              <div className="value-container">
                <div className="value">a year ago</div>
              </div>
            </div>
            <div className="row-container">
              <div className="key">Liscense</div>
              <div className="value-container">
                <div className="value">
                  MIT LISCENSE
                  {/* <div className="badge">
                    <img src={openSourceIcon} />
                    <div className="badge-text">Open source</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row-container">
            <div className="key">Status</div>
            <div className="value-container">
              <div className="online">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
