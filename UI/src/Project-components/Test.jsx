import "../css/test.css";
import StyledCatalogTableMUI from "./dashboard-components/catalog-components/StyledCatalogTableMUI";
import { useState } from "react";
export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  console.log(`Viewport Width: ${viewportWidth}px`);
  console.log(`Viewport Height: ${viewportHeight}px`);
  

  return (
    <div className="test">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={isOpen ? { width: "300px" } : { width: "50px" }}
        className="sidebar1"
      >
        sidebar
      </div>
      <div
        className="right23"
        // style={isOpen ? { width: "calc(100%-300px" } : {}}
        style={isOpen ? { width: `${viewportWidth-270+87}px` } : { width: `${viewportWidth}px` }}
      >
        <StyledCatalogTableMUI />
      </div>
    </div>
  );
}
