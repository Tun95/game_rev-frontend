import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ContextProvider } from "./context/Context";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <HelmetProvider>
      <GoogleOAuthProvider
        clientId={`408401850346-3g5fg0525hldsrl33m50krq0q34gm31k.apps.googleusercontent.com`}
      >
        <App />
      </GoogleOAuthProvider>
    </HelmetProvider>
  </ContextProvider>
);
