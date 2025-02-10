// import * as React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className={className}>
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
  .MuiDataGrid-main {
    font-size: 16px;
  }
  .MuiDataGrid-cell {
    outline: none !important;
  }

  .css-1ggm5a5-MuiDataGrid-root .MuiDataGrid-container--top [role="row"],
  .css-1ggm5a5-MuiDataGrid-root .MuiDataGrid-container--bottom [role="row"] {
    background-color: transparent;
  }

  .MuiDataGrid-columnHeaderTitle {
    font-weight: bold;
    color: rgb(59, 59, 59);
  }
  .MuiTablePagination-toolbar {
    justify-content: end !important;
  }
  .MuiTablePagination-spacer {
    display: none;
  }
  .even {
    background-color: rgba(247, 247, 247, 0.76);
  }
  .MuiTablePagination-actions {
    display: flex;
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
  }
`;

export default function StyledCatalogTableMUI() {
  return <Style />;
}
