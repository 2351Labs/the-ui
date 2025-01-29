import backIcon from "../../assets/dashboard/catalog-assets/back.svg";
import { Link } from "react-router-dom";
export default function BreadCrumbs(props) {
    const {itemData, itemID} = props
  return (
    <div style={{zIndex:"1"}} className="catalog-bread-crumbs">
      <Link to={`/dashboard/catalog`}>
        <button
          style={{ opacity: ".6" }}
          onClick={() => {
            // setCatalogItemSelection(null);
            // window.location = "./"
          }}
        >
          <img src={backIcon} />
        </button>
        <span
          style={{ cursor: "pointer", opacity: ".6" }}
          onClick={() => {
            // setCatalogItemSelection(null);
            // window.location = "./"
          }}
        >
          Catalog /
        </span>
      </Link>
      <span> &nbsp;{itemData.name}</span>
    </div>
  );
}
