import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css"; // optional if you have Tailwind or global styles
import "./i18n";
import "./Branding.css";
import { Toaster } from "sonner";

// ✅ Create a React root and render the app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      {/* ✅ Global toast notifications */}
      <Toaster
        position="top-center"
        richColors
        expand={true}
        closeButton
      />
    </HelmetProvider>
  </React.StrictMode>
);
