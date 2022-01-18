import React from "react";
import ReactDOM from "react-dom";

import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
