import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Provider } from "react-redux";
import { store } from "./store/types/config";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider theme={{token:{
    colorPrimary:"#f43f7b"
  }}}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
reportWebVitals();
