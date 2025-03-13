import backIcon from "../../assets/dashboard/catalog-assets/back.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

import capitalizeFirstLetter from "../../helpers/capitilizeFirstLetter";
function BreadCrumbs({ props, className }) {
  const {itemData} = props;
  // use current URL
  const url = new URL(window.location);
  const paths = url.pathname.split("/").filter((segment) => segment !== "");

  const breadCrumbsExcludingLast = paths.map((path, index) => {
    if (!(index + 1 == paths.length) && !(index == 0)) {
      // exclude last and first
      function arrayToPath(paths) {
        return "/" + paths.join("/");
      }

      const pathsCopy = [...paths];
      const pathArray = pathsCopy.splice(0, index + 1);
      const urlPath = arrayToPath(pathArray);

      return (
        <div key={index} style={{ opacity: ".65", cursor: "default" }}>
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
      className={`BreadCrumbs ${className}`}
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
      {console.log("item data", itemData)}
      <span> &nbsp;{capitalizeFirstLetter(itemData?.["Service Name"])}</span>
    </div>
  );
}

const Style = styled(BreadCrumbs)`
  display: flex;
  align-items: center;
  /* opacity: 0.6; */
  font-weight: 600;
  // position: sticky;
  // top: 0;

  // position: fixed;
  // top: 75px;
  width: ;

  // width:100%;
  background-color: var(--main);
  /* width: fit-content; */
  /* border-radius: 10px; */
  padding-bottom: 10px;
  border-bottom: var(--border);
  display: flex;
  box-shadow: var(-night-box-shadow);

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
    background-color: var(--inversion-background);
  }
`;

export default function StyledBreadCrumbs(props) {
  return <Style props={props} />;
}
