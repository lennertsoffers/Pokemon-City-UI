import { Store } from "@reduxjs/toolkit";
import { ADD_ERROR } from "../redux/actions/ErrorActions";

const ErrorHandler = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const showError = (message: string) => {
        store.dispatch(ADD_ERROR(message));
    };

    return {
        initialize,
        showError,
    };
})();

export default ErrorHandler;
