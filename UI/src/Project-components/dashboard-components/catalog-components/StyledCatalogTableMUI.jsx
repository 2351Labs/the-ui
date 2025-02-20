// import * as React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
  { id: 4, col1: "Hello", col2: "World" },
  { id: 5, col1: "DataGridPro", col2: "is Awesome313" },
  { id: 6, col1: "MUI", col2: "is Amazing" },
  { id: 7, col1: "Hello", col2: "World" },
  { id: 8, col1: "DataGridPro", col2: "is Awesome" },
  { id: 9, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

function CatalogTableMUI1({ className, children }) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [popupModeIsEnabled, setIsPopupModeEnabled] = useState(false);
  useEffect(() => {
    const element = document.querySelector(".dashboard--container");

    // Check the initial state of the attribute
    const checkAttribute = () => {
      if (element && element.getAttribute("sidebar-state") === "true") {
        setSidebarIsOpen(true);
      } else {
        setSidebarIsOpen(false);
      }

      console.log(
        "getting attribute",
        element.getAttribute("sidebar-popup-mode") === "true"
      );
      setIsPopupModeEnabled(
        element.getAttribute("sidebar-popup-mode") === "true"
      );
    };

    // Create a mutation observer to detect changes to attributes
    const observer = new MutationObserver(() => {
      checkAttribute(); // Check if the attribute exists after any changes
    });

    // Start observing the element for attribute changes
    if (element) {
      observer.observe(element, { attributes: true });
    }

    // Check the initial state of the attribute when the component mounts
    checkAttribute();

    // Cleanup observer when component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const navigate = useNavigate();
  console.log("POPUP-MODE", popupModeIsEnabled);
  return (
    <div
      style={
        !popupModeIsEnabled
          ? sidebarIsOpen
            ? { width: `${viewportWidth - (500 - 183)}px` }
            : { width: `${viewportWidth - 131}px` }
          : {width: `${viewportWidth-25}px`}
      }
      className={`${className} tableMUI`}
    >
      <DataGrid
        sx={{ border: "none" }}
        // disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        onRowClick={(e) => {
          console.log("CLICKED", e);
          navigate(`${e.id}`, { replace: true });
        }}
        autoPageSize
        pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        rows={rows}
        columns={columns}
        // slots={{ toolbar: GridToolbar }}

        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        // loading
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        // initialState={{
        //   pinnedColumns: {
        //     left: ["desk"],
        //   },
        // }}
      />
    </div>
  );
}

const Style = styled(CatalogTableMUI1)`
  // max-width: 1500px;
  height: 100%;
  width: 100%;
  transition: 1s ease-in-out-all;
  // [sidebar-state="true"] && {
  //   background-color: green !important;
  //   animation: growWidthTable 1s ease-in-out;
  // }
  // [sidebar-state="false"] && {
  //   background-color: green !important;
  //   animation: shrinkWidthTable 1s ease-in-out;
  // }

  .MuiDataGrid-main {
    font-size: 16px;
  }
  .MuiDataGrid-cell {
    outline: none !important;
    border-top: var(--border) !important;
  }

  .css-1ggm5a5-MuiDataGrid-root
    .MuiDataGrid-row--borderBottom
    .MuiDataGrid-columnHeader,
  .css-1ggm5a5-MuiDataGrid-root
    .MuiDataGrid-row--borderBottom
    .MuiDataGrid-filler,
  .css-1ggm5a5-MuiDataGrid-root
    .MuiDataGrid-row--borderBottom
    .MuiDataGrid-scrollbarFiller {
    border-bottom: none !important;
  }
  .css-1ggm5a5-MuiDataGrid-root .MuiDataGrid-container--top [role="row"],
  .css-1ggm5a5-MuiDataGrid-root .MuiDataGrid-container--bottom [role="row"] {
    background-color: transparent;
  }

  .MuiDataGrid-columnHeaderTitle {
    font-weight: bold;
    color: rgb(0, 0, 0);
  }
  .MuiTablePagination-toolbar {
    justify-content: end !important;
  }
  .MuiTablePagination-spacer {
    display: none;
  }
  .even {
    // background-color: rgba(247, 247, 247, 0.76);
    background-color: var(--main-tint-1);
  }
  .MuiTablePagination-actions {
    display: flex;
  }
  .MuiDataGrid-row {
    cursor: pointer;
    transition: 0.15s ease-in-out all;
  }
  .MuiDataGrid-row:hover {
    background-color: var(--main-tint-2) !important;
  }

  #night-mode && {
    .even {
      background-color: var(--inversion-background-tint);
    }
    .MuiDataGrid-virtualScrollerContent {
      // color: white;
    }
    .MuiDataGrid-row {
    }
    .MuiDataGrid-cell {
      outline: none !important;
      border-top: var(--inversion-border) !important;
    }
    .MuiDataGrid-row:hover {
      background-color: var(--inversion-background-tint-2) !important;
    }
  }
`;

export default function StyledCatalogTableMUI() {
  return <Style />;
}
