import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./Project-components/LandingPage.jsx";
import NavBar from "./Project-components/NavBar.jsx";
import { Provider } from "./components/ui/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <LandingPage />
  </StrictMode>
);
