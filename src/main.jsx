import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/variables.css";
import "./styles/globals.css";
import App from "./App.jsx";
import Landingpage from "./pages/Landingpage.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Landingpage />
  </StrictMode>,
);
