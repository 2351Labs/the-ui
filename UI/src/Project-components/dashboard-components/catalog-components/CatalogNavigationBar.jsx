// import messageIcon from "../../../assets/message.svg";
import "../../../css/catalogNavigationBar.css";
import documentIcon from "../../../assets/dashboard/catalog-assets/document.svg";
import historyIcon from "../../../assets/dashboard/catalog-assets/history.svg";
import linkIcon from "../../../assets/dashboard/catalog-assets/link.svg";
import treeStructureIcon from "../../../assets/dashboard/catalog-assets/tree-structure.svg";
import keyIcon from "../../../assets/dashboard/catalog-assets/key.svg";

import { useState } from "react";
export default function CatalogNavigationBar() {
  const barOptions = {
    documentation: { label: "Documentation", img: documentIcon },
    changeHistory: { label: "Change History", img: historyIcon },
    dependencies: { label: "Dependencies", img: treeStructureIcon },
    ownership: { label: "Ownership", img: keyIcon },
  };
  //   default selection is first bar option
  const [optionSelection, setOptionSelection] = useState(
    Object.keys(barOptions)[0]
  );

  return (
    <div className="catalogNavigationBar">
      {Object.keys(barOptions).map((optionKey, index) => {
        return (
          <button
            onClick={() => {
              setOptionSelection(optionKey);
            }}
            style={
              optionKey === optionSelection
                ? {
                    color: "var(--primary)",
                    borderBottom: "2px solid var(--primary)",
                    backgroundColor: "#f5f5f5",
                    borderTopRightRadius:"5px",
                    borderTopLeftRadius:"5px",
                    // fontWeight: "600",
                    opacity: 1,
                  }
                : {}
            }
            className="bar-option-btn"
          >
            <img
              style={
                optionKey === optionSelection
                  ? {
                      filter:
                        "brightness(0) saturate(100%) invert(60%) sepia(86%) saturate(382%) hue-rotate(90deg) brightness(93%) contrast(94%)",
                    }
                  : {}
              }
              src={barOptions[optionKey].img}
            />
            <div className="bar-option" key={index}>
              {barOptions[optionKey].label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
