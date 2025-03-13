import { useState } from "react";
// import { CatalogItemViewContext } from "../../context/CatalogItemViewContext";
import "../../../css/EditDocumentPopup.css";
import axiosBackend from "../../../helpers/axiosBackend";
export default function EditDocumentPopup(props) {
  const { document, docId, setEditingDocument, title } = props;
  const [textChanges, setTextChanges] = useState(document);
  async function handleSave() {
    try {
      const response = await axiosBackend.put(`/items/document/${docId}`, {
        document: `${textChanges}`,
      });
      setEditingDocument((prev) => ({
        ...prev,
        document: textChanges,
        isEnabled: false,
      }));
    } catch (error) {
      console.log("Error while saving", error);
    }
  }

  function handleClose() {
    setEditingDocument((prev) => ({
      ...prev,
      isEnabled: false,
    }));
  }
  return (
    <div
      className="EditDocumentPopup"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        zIndex: 100,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="popup-container">
        <h1>{title}</h1>
        <textarea
          style={{
            height: "100%",
            fontFamily: `DM Sans, serif`,
          }}
          value={textChanges}
          onChange={(e) => setTextChanges(e.target.value)}
        />
        <div className="buttons-container" style={{ marginTop: "10px" }}>
          <button onClick={handleSave} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
