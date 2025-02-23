import "../../../css/catalogItemView.css";
import { useState, useEffect } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import InfoSVG from "../../../assets/dashboard/catalog-assets/info.svg?react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ChangeHistory from "./ChangeHistory";
import { Outlet } from "react-router-dom";
import DocumentSVG from "../../../assets/dashboard/catalog-assets/document.svg?react";
import HistorySVG from "../../../assets/dashboard/catalog-assets/history.svg?react";
import linkIcon from "../../../assets/dashboard/catalog-assets/link.svg";
import TreeStructureSVG from "../../../assets/dashboard/catalog-assets/tree-structure.svg?react";
import KeySVG from "../../../assets/dashboard/catalog-assets/key.svg?react";
import Dependencies from "./Dependencies";
import openSourceIcon from "../../../assets/dashboard/catalog-assets/open-source.svg";
import useViewportWidth from "../../../helpers/useViewPortWidth";
import StyledBreadCrumbs from "../StyledBreadCrumbs";
import Documentation from "./Documentation";
export default function CatalogItemView() {
  const maxWidth = 880;
  const [isPastWidth, setIsPastWidth] = useState(useViewportWidth(maxWidth));
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= maxWidth) {
        setIsPastWidth(false);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${false}`);
      } else {
        setIsPastWidth(true);
        // document
        //   .querySelector(".dashboard--container")
        //   .setAttribute("sidebar-popup-mode", `${true}`);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { itemDataLoader, itemID } = useLoaderData();
  const [itemData, setItemData] = useState(itemDataLoader);

  const navBarOptions = {
    documentation: {
      label: "Documentation",
      svg: <DocumentSVG />,
      element: <Documentation itemData={itemData}/>,
    },
    changeHistory: {
      label: "Change History",
      svg: <HistorySVG />,
      element: <ChangeHistory />,
    },
    dependencies: {
      label: "Dependencies",
      svg: <TreeStructureSVG />,
      element: <Dependencies isPastWidth={isPastWidth} />,
    },

    ownership: {
      label: "Ownership",
      svg: <KeySVG />,
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
          <InfoSVG className={"infoSVG"} />
          <div>{itemData.description}</div>
        </div>
        <CatalogNavigationBar
          isPastWidth={isPastWidth}
          navBarOptions={navBarOptions}
          navBarState={{ value: navBarSelection, setter: setNavBarSelection }}
        />
      </div>
      <div
        style={!isPastWidth ? { flexDirection: "column" } : {}}
        className="catalog-item-content"
      >
        <div className="left-split">
          {navBarOptions[navBarSelection].element}
        </div>
        <div
          style={!isPastWidth ? { width: "100%" } : {}}
          className="right-split"
        >
          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value-container link-container">
              <div className="link">github.com/chakra-ui/chakra-ui</div>
              <img className="link-icon" src={linkIcon} />
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
              <div className="status">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
