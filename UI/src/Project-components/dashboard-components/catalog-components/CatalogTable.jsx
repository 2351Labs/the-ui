import { PrimeReactContext, PrimeReactProvider } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../css/catalogTable.css";
import { useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CatalogTable(props) {
  const [selectedProduct, setSelectedProduct] = useState();

  const navigate = useNavigate();

  //   const { catalogData } = props;
  const catalogData = [
    {
      ID: 1,
      name: "Order Service",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/9/25",
      status: "Online",
      description:
        "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    {
      ID: 2,
      name: "Printing Service5",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/14/25",
      status: "Offline",
      description:
        "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    {
      ID: 3,
      name: "Order Service4",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/9/25",
      status: "Online",
      description:
        "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    {
      ID: 4,
      name: "Printing Service3",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/14/25",
      status: "Offline",
      description:
        "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    {
      ID: 5,
      name: "Order Service2",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/9/25",
      status: "Online",
      description:
        "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
    },
    {
      ID: 6,
      name: "Printing Services",
      owner: "OrderCompany",
      type: "Microservice",
      created: "1/14/25",
      status: "Offline",
      description:
        "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
    },
  ];

  return (
    <div className="catalogTable">
      <PrimeReactProvider>
        <DataTable
          selectionMode="single"
          selection={selectedProduct}
          removableSort
          stripedRows
          value={catalogData}
          sortMode="multiple"
          tableStyle={{ minWidth: "100%" }}
          onSelectionChange={(e) => {
            navigate(`${e.value.ID}`, { replace: true });
          }}
        >
          <Column
            onClick={() => {
              "CLICK";
            }}
            field="name"
            header="Name"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="owner"
            header="Owner"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </PrimeReactProvider>
    </div>
  );
}
