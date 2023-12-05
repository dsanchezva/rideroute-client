import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Spiner.css"
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { ThemeWrapper } from "./context/theme.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthWrapper>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </AuthWrapper>
  </BrowserRouter>
);
