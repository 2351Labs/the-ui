import { useState } from "react";
import "../../../css/CatalogPaginator.css";

import ReactPaginate from "react-paginate";

export default function CatalogPaginator({ pageCount = 0, onPageChange, currentPage }) {
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={"CatalogPaginator"}
      activeClassName={"active"}
      disabledClassName={"disabled"}
      forcePage={currentPage} // set the current page using props
    />
  );
}
