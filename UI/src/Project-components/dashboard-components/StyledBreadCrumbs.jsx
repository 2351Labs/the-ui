import backIcon from "../../assets/dashboard/catalog-assets/back.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

import capitalizeFirstLetter from "../../helpers/capitilizeFirstLetter";
function BreadCrumbs({ props, className }) {
  // use current URL
  const url = new URL(window.location);
  const paths = url.pathname.split("/").filter((segment) => segment !== "");

  const breadCrumbsExcludingLast = paths.map((path, index) => {
    if (!(index + 1 == paths.length)) {
      // exclude last

      // create link for path item

      function arrayToPath(paths) {
        return "/" + paths.join("/");
      }

      // Example usage:
      const pathsCopy = [...paths];
      const pathArray = pathsCopy.splice(0, index + 1);
      const urlPath = arrayToPath(pathArray);

      return (
        <div key={index} style={{ opacity: ".6", cursor: "default" }}>
          <Link to={urlPath}>
            <div style={{ cursor: "pointer" }} className="bread-crumb">
              {capitalizeFirstLetter(path)}
            </div>
          </Link>

          <div> &nbsp;&nbsp;/&nbsp;&nbsp;</div>
        </div>
      );
    }
  });
  return (
    <div
      className={className}
      style={{ zIndex: "1", cursor: "default" }}
      // className="catalog-bread-crumbs"
    >
      {/* <button
        style={{ opacity: ".6" }}
        onClick={() => {
          // setCatalogItemSelection(null);
          // window.location = "./"
        }}
      >
        <img src={backIcon} />
      </button> */}
      {breadCrumbsExcludingLast}
      <span> &nbsp;{capitalizeFirstLetter(paths[paths.length - 1])}</span>
    </div>
  );
}

const Style = styled(BreadCrumbs)`
  display: flex;
  align-items: center;
  /* opacity: 0.6; */
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: white;
  /* width: fit-content; */
  /* border-radius: 10px; */
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(201, 201, 201);
  display: flex;
  align-items: center;
  div {
    display: flex;
    .bread-crumb:hover {
      text-decoration: underline;
    }
  }

  button {
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
    img {
      height: 8px;
      width: 20px;
      rotate: 90deg;
    }
  }
  #night-mode & {
 
  }
`;

export default function StyledBreadCrumbs(props) {
  return <Style props={props} />;
}
