import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css"; // optional if you have Tailwind or global styles

// ✅ Create a React root and render the app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
