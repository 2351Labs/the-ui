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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MicrosoftAuthCallback from "./Project-components/MicrosoftAuthCallback.jsx";
import SignupPage from "./Project-components/SignupPage.jsx";
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
    path: "/",
    element: <div>HOME</div>,
    errorElement: <ErrorPage />,
  },
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
  { path: "/signup", element: <SignupPage />, errorElement: <ErrorPage /> },
  {
    path: "/login",

    // loader: async ({ params }) => {
    // },
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  { path: "/auth/microsoftAuthCallback", element: <MicrosoftAuthCallback /> },
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
