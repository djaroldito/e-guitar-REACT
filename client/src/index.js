import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-q3lf6u3rsoxtojfo.us.auth0.com"
        clientId="BRUwphkRYg0pwKaLw89cMDoMM9cAXZZT"
        redirectUri={window.location.origin}
      >
                <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
