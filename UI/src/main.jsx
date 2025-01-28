import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Project-components/LandingPage.jsx";
import NavBar from "./Project-components/NavBar.jsx";
import { Provider } from "./components/ui/provider";
import Dashboard from "./Project-components/dashboard-components/Dashboard.jsx";
import ErrorPage from "./Project-components/ErrorPage.jsx";
import Catalog from "./Project-components/dashboard-components/catalog-components/Catalog.jsx";
import CatalogItemView from "./Project-components/dashboard-components/catalog-components/CatalogItemView.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";

// for dev purposees
const catalogData = {
  1: {
    name: "Order Service",
    owner: "OrderCompany",
    type: "Microservice",
    created: "1/9/25",
    status: "Online",
    description:
      "Automates order handling. It integrates with inventory, payments, and shipping for efficient operations.",
  },
  2: {
    name: "Printing Service",
    owner: "OrderCompany",
    type: "Microservice",
    created: "1/14/25",
    status: "Offline",
    description:
      "Automates order handling, from creation to fulfillment, with real-time updates. It integrates with inventory, payments, and shipping for efficient operations.",
  },
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "catalog",
        element: <Catalog />,

        // loader: async ({ params }) => {
        // },
      },
      {
        path: "/dashboard/catalog/:itemID",
        element: <CatalogItemView />,

        loader: async ({ params }) => {
          return {
            itemDataLoader: catalogData[params.itemID],
            itemID: params.itemID,
          };
        },
        // children: [
        //   {
        //     path: "documentation",
        //     element: <div>DOCs</div>,
        //   },
        //   {
        //     path: "changeHistory",
        //     element: <div>History</div>,
        //   },
        // ],
      },
      {
        path: "reports",
        element: <div>Reports</div>,
      },
      {
        path: "people",
        element: <div>People</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <NavBar /> */}
    {/* <LandingPage /> */}
      <RouterProvider router={router} />
      <Outlet />

    {/* <Dashboard /> */}
  </StrictMode>
);
