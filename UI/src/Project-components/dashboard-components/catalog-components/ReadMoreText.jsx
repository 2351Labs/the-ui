import { useState, useContext } from "react";
import { EditDocumentContext } from "../../context/dashboardContext";
import '../../../css/readMoreText.css'
const ReadMoreText = ({ text, title }) => {
  const { setEditingDocument, editingDocument } =
    useContext(EditDocumentContext);

  const [expanded, setExpanded] = useState(false);
  const lineLimit = 3;

  const paragraphStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: expanded ? "none" : lineLimit,
    transition: "all 0.3s ease",
    marginBottom: "0px",
  };

  return (
    <div className="ReadMoreText" style={{ position: "relative", maxWidth: "500px" }}>
      <p style={paragraphStyle}>{text}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "20px",
        }}
      >
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            style={{
              marginTop: "8px",
              // color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "0px",
            }}
          >
            Read More
          </button>
        ) : (
          <button
            onClick={() => setExpanded(false)}
            style={{
              marginTop: "8px",
              // color: "blue",
              cursor: "pointer",
              padding: "0px",
              textDecoration: "underline",
            }}
          >
            Close
          </button>
        )}
        <button
          onClick={() =>
            setEditingDocument({ isEnabled: true, text: text, title: title })
          }
          style={{
            marginTop: "8px",
            // color: "blue",
            cursor: "pointer",
            padding: "0px",
            textDecoration: "underline",
          }}
        >
          Edit Document
        </button>
      </div>
    </div>
  );
};

export default ReadMoreText;
