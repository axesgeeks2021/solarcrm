import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <Router>
        <ToastContainer position="top-right" newestOnTop />
          <App />
        </Router>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
