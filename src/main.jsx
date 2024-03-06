import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from "./components/context/provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1011943697226-sa99h6qemiefcmrpatjo19kk4tlsadee.apps.googleusercontent.com">
        <AppProvider>
          <App />
        </AppProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
