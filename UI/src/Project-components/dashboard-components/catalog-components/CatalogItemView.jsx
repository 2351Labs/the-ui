import "../../../css/catalogItemView.css";
import { useState, useEffect } from "react";
import CatalogItemName from "./CatalogItemName";
import CatalogNavigationBar from "./CatalogNavigationBar";
import descriptionIcon from "../../../assets/dashboard/catalog-assets/description.svg";
import InfoSVG from "../../../assets/dashboard/catalog-assets/info.svg?react";
import QuestionSVG from "../../../assets/question.svg?react";
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
import Ownership from "./Ownership";
import ExternalLink from "../ExternalLink.jsx";
import collectorSchemaTestData from "../../../../collectorSchemaTestData.js";
import EntityHelp from "./EntityHelp.jsx";
import EditDocumentPopup from "./EditDocumentPopup.jsx";
import Score from "../../Score.jsx";
export default function CatalogItemView() {
  const maxWidth = 1100;
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

  const { entityDataLoaded } = useLoaderData();
  const [entityData, setEntityData] = useState(entityDataLoaded);
  // for edit document context:
  const [editingDocument, setEditingDocument] = useState({
    isEnabled: false,
    document: entityData?.["Internal Documentation"]?.document,
    test:"here"
  });
  const navBarOptions = {
    documentation: {
      label: "Documentation",
      svg: <DocumentSVG />,
      element: (
        <Documentation
          entityData={entityData}
          setEditingDocument={setEditingDocument}
          document={editingDocument?.document}
        />
      ),
    },
    changeHistory: {
      label: "Change History",
      svg: <HistorySVG />,
      element: <ChangeHistory history={entityData?.History} />,
    },
    dependencies: {
      label: "Dependencies",
      svg: <TreeStructureSVG />,
      element: <Dependencies isPastWidth={isPastWidth} />,
    },

    // ownership: {
    //   label: "Ownership",
    //   svg: <KeySVG />,
    //   element: <Ownership />,
    // },
    ownership: {
      label: "Get Help",
      svg: <QuestionSVG className="questionSVG" />,
      element: <EntityHelp entityData={entityData} />,
    },
  };
  //   default selection is first bar option
  const [navBarSelection, setNavBarSelection] = useState(
    Object.keys(navBarOptions)[0]
  );

  function formattedDate(dateStr) {
    // Convert to a JavaScript Date object
    const date = new Date(dateStr);
    // Format the date to a more readable format
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function calculateAverage(metrics) {
    if (metrics) {
      let totalScore = metrics.reduce((sum, metric) => sum + metric.score, 0);
      return (totalScore / metrics.length).toFixed(0);
    }
  }

  return (
    <div className="catalogItemView">
      <StyledBreadCrumbs itemData={entityData} />

      <div className="name-container">
        <div className="catalogItemName-container">
          <CatalogItemName
            serviceName={entityData?.["Service Name"]}
            // itemID={itemID}
            // itemDataState={{ value: itemData, setter: setItemData }}
          />
          {/* <div className="badge">
            <img src={openSourceIcon} />
            <div className="badge-text">Open source</div>
          </div> */}
          {
            <div className="badge">
              {/* <img src={openSourceIcon} /> */}
              <div className="badge-text">{entityData?.["Entity Type"]}</div>
            </div>
          }
        </div>

        <div className="description-container">
          <InfoSVG className={"infoSVG"} />
          <div className="details">{entityData?.Description}</div>
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
          {navBarOptions?.[navBarSelection]?.element}
        </div>
        <div
          style={!isPastWidth ? { width: "100%" } : {}}
          className="right-split"
        >
          <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Product</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <div className="value">{entityData?.Product}</div>
              </div>
            </div>
            <div className="row-container">
              <div className="key">Average Score</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <Score
                  invertForNightMode={true}
                  score={calculateAverage(
                    entityData?.["Service Maturity Score(s)"]
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Owner</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <div className="value">OWNER</div>
              </div>
            </div>
            <div className="row-container">
              <div className="key">Version</div>
              <div className="value-container">
                {/* <img className="link-icon" src={linkIcon} /> */}
                <div className="value">{entityData?.Version}</div>
              </div>
            </div>
          </div>

          <div className="row-container">
            <div className="key">Repository</div>
            <div className="value-container link-container">
              {/* <div className="link">github.com/chakra-ui/chakra-ui</div> */}
              <ExternalLink
                url={entityData?.["Source Repo"]}
                title={`${entityData?.["Source Repo"]}`}
                // description={"Source Repository"}
              />
              {/* <img className="link-icon" src={linkIcon} /> */}
            </div>
          </div>

          <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Last updated</div>
              <div className="value-container">
                <div className="value">
                  {formattedDate(entityData?.["Last Updated"])}
                </div>
              </div>
            </div>
          </div>

          <div className="row-container-wrapper">
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
            <div className="row-container">
              <div className="key">Language</div>
              <div className="value-container">
                <div className="value">
                  {entityData?.["Programming Language"]}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row-container-wrapper">
            <div className="row-container">
              <div className="key">Status</div>
              <div className="value-container">
                <div className="status">Online</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {editingDocument.isEnabled && (
        <EditDocumentPopup
          title={entityData?.["Service Name"]}
          document={editingDocument?.document}
          setEditingDocument={setEditingDocument}
          docId={entityData._id}
        />
      )}
    </div>
  );
}
