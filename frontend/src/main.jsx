import axios from "axios"; 
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
axios.defaults.baseURL = "https://prodmanager-backend.onrender.com"; 
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
