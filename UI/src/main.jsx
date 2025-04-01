import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./Project-components/LoginPage.jsx";
import LandingPage from "./Project-components/LandingPage.jsx";
import NavBar from "./Project-components/NavBar.jsx";
import Dashboard from "./Project-components/dashboard-components/Dashboard.jsx";
import ErrorPage from "./Project-components/ErrorPage.jsx";
import Catalog from "./Project-components/dashboard-components/catalog-components/Catalog.jsx";
import CatalogItemView from "./Project-components/dashboard-components/catalog-components/CatalogItemView.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MicrosoftAuthCallback from "./Project-components/MicrosoftAuthCallback.jsx";
import SignupPage from "./Project-components/SignupPage.jsx";
import Test from "./Project-components/Test.jsx";
import collectorSchemaTestData from "../collectorSchemaTestData.js";
import CustomCatalogTable from "./Project-components/dashboard-components/catalog-components/CustomCatalogTable.jsx";
import CatalogPaginator from "./Project-components/dashboard-components/catalog-components/CatalogPaginator.jsx";
// for dev purposees
import axiosBackend from "./helpers/axiosBackend.js";
import ComingSoon from "./Project-components/dashboard-components/ComingSoon.jsx";
import Home from "./Project-components/Home.jsx";
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
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "catalog",
        element: <Catalog key="Catalog" />,

        // loader: async ({ params }) => {
        // },
      },
      {
        path: "/dashboard/catalog/:itemID", //If item loaded when viewing in catalog, skip loading when going to view it
        element: <CatalogItemView key="CatalogItemView" />,
        // ?preloaded=true
        loader: async ({ params }) => {
          try {
            const response = await axiosBackend.get(
              `/items/id/${params.itemID}`
            );
            return {
              entityDataLoaded: response.data,
            };
          } catch (error) {
            //if cannot get data, usually means user not logged in so redirect to login
            window.location.href = "/dashboard/catalog"; 
            console.log("ERROR", error);
          }
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
        element: <ComingSoon name={"Reports"} />,
      },
      {
        path: "people",
        element: <ComingSoon name={"People"} />,
      },
    ],
  },
  { path: "/signup", element: <SignupPage />, errorElement: <ErrorPage /> },
  {
    path: "/login",

    // loader: async ({ params }) => {
    // },
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  { path: "/auth/microsoftAuthCallback", element: <MicrosoftAuthCallback /> },
  // {
  //   path: "/test",

  //   // loader: async ({ params }) => {
  //   // },
  //   element: <Test />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/test/table",

  //   // loader: async ({ params }) => {
  //   // },
  //   element: <Test />,
  //   errorElement: (
  //     <div style={{ backgroundColor: "#ffffff", height: "100%" }}>
  //       <CustomCatalogTable key="CustomCatalogTable" />
  //       <CatalogPaginator
  //         pageCount={5}
  //         onPageChange={() => {
  //           console.log("handle");
  //         }}
  //       />
  //     </div>
  //   ),
  // },
]);
const client_id =
  "446172791092-ijgfqcf5v4120o4kr6mkif88m8n4v2t8.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <NavBar /> */}
    {/* <LandingPage /> */}
    <GoogleOAuthProvider clientId={client_id}>
      <RouterProvider router={router} />
      <Outlet />
    </GoogleOAuthProvider>
    {/* <Dashboard /> */}
  </StrictMode>
);
