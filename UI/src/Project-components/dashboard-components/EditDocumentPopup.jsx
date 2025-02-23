import { useContext, useState } from "react";
import { EditDocumentContext } from "../context/dashboardContext";
import "../../css/EditDocumentPopup.css";
export default function EditDocumentPopup(props) {
  const { editingDocument, setEditingDocument } = props;
  console.log("DEBYUG", editingDocument);
  const [textChanges, setTextChanges] = useState(editingDocument.text);

  function handleSave() {
    setEditingDocument((prev) => ({ ...prev, text: textChanges }));
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
        <h1>{editingDocument.title}</h1>
        <textarea
          style={{
            height: "100%",
            fontFamily: `${"DM Sans"}, serif}`,
          }}
          value={textChanges}
          onChange={(e) => setTextChanges(e.target.value)}
        />
        <div className="buttons-container" style={{ marginTop: "10px" }}>
          <button
            onClick={() => handleSave(text)}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
