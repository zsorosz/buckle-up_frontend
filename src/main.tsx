import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SessionContextProvider from "./contexts/SessionContext";
import App from "./App";
import TripContextProvider from "./contexts/TripContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <TripContextProvider>
          <App />
        </TripContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
