import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AxiosConfig from "./AxiosConfig";
import "./scss/main.scss";

AxiosConfig.configure();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
