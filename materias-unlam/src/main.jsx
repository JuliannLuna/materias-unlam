import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Ripples from "./components/Ripples.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Ripples />
    <App />
  </StrictMode>
);
