import {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { CatalogItemViewContext } from "../../context/catalogItemViewContext";
import "../../../css/readMoreText.css";

const ReadMoreText = ({ text, title, setEditingDocument }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const paragraphRef = useRef(null);

  const lineLimit = 3;

  useLayoutEffect(() => {
    if (paragraphRef.current) {
      const lineHeight = parseInt(
        getComputedStyle(paragraphRef.current).lineHeight
      );
      const maxHeight = lineHeight * lineLimit;
      setIsOverflowing(paragraphRef.current.scrollHeight > maxHeight);
    }
  }, [text]);

  const paragraphStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: expanded ? "none" : lineLimit,
    transition: "all 0.3s ease",
    marginBottom: "0px",
  };

  return (
    <div className="ReadMoreText" style={{ position: "relative" }}>
      <p ref={paragraphRef} style={paragraphStyle}>
        {text}
      </p>
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {isOverflowing && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                marginTop: "8px",
                cursor: "pointer",
                padding: "0px",
                textDecoration: "underline",
              }}
            >
              {expanded ? "Close" : "Read More"}
            </button>
          )}

          <button
            onClick={() =>
              setEditingDocument((prev) => {
                return {...prev, isEnabled: true };
              })
            }
            style={{
              marginTop: "8px",
              cursor: "pointer",
              padding: "0px",
              textDecoration: "underline",
            }}
          >
            Edit Document
          </button>
        </div>
      </>
    </div>
  );
};

export default ReadMoreText;
