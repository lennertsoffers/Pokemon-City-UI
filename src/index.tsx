import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import AxiosConfig from "./config/AxiosConfig";
import "./scss/main.scss";
import CombinedReducer from "./redux/reducers/CombinedReducer";

AxiosConfig.configure();
const store = configureStore({
    reducer: CombinedReducer,
    middleware: [],
});

const rootElem = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElem);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
