import { Store } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";
import { SET_LOGGED_IN } from "../redux/actions/AuthActions";
import { ADD_ERROR } from "../redux/actions/ErrorActions";
import ApiErrorResponse from "../types/interfaces/error/ApiErrorResponse";

const ErrorHandler = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const handle = async (error: ApiErrorResponse, reExecuteCallback: Function) => {
        if (error.response.status === 403) {
            const refeshSucceeded = await AuthService.refresh();

            if (!refeshSucceeded) {
                store.dispatch(SET_LOGGED_IN(false));
            } else {
                return reExecuteCallback();
            }
        }
    };

    const showErrors = (messages: Array<string>) => {
        messages.forEach((message: string) => showError(message));
    };

    const showError = (message: string) => {
        store.dispatch(ADD_ERROR(message));
    };

    return {
        initialize,
        handle,
        showErrors,
        showError,
    };
})();

export default ErrorHandler;
