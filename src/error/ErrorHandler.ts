import { Store } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";
import { BASE_URL } from "../config/config";
import { ADD_ERROR } from "../redux/actions/ErrorActions";
import ApiErrorResponse from "../types/interfaces/error/ApiErrorResponse";

const ErrorHandler = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const handle = async (error: ApiErrorResponse, reExecuteCallback: Function) => {
        if (error.response.status === 403 && (error.response.data as { error_message: string }).error_message.startsWith("The Token has expired on ")) {
            const refeshSucceeded = await AuthService.refresh();

            if (!refeshSucceeded) return (window.location.href = BASE_URL + "/login");
            else return reExecuteCallback();
        }
    };

    const showError = (message: string) => {
        store.dispatch(ADD_ERROR(message));
    };

    return {
        initialize,
        handle,
        showError,
    };
})();

export default ErrorHandler;
