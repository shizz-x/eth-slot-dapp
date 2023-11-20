import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/App.css"
import App from "./App";
import Wallet from "./context/Wallet";
import Toast from "./context/Toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Toast>
    <Wallet>
      <App />
    </Wallet>
  </Toast>);
