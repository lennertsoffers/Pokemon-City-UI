import { Store } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";
import { SET_LOGGED_IN } from "../redux/actions/AuthActions";
import { ADD_ERROR } from "../redux/actions/ErrorActions";

const ErrorHandler = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const handle = async (error: any, reExecuteCallback?: Function) => {
        if (error.response.status === 403) {
            const refeshSucceeded = await AuthService.refresh();

            if (!refeshSucceeded) {
                store.dispatch(SET_LOGGED_IN(false));
            } else {
                if (reExecuteCallback) return reExecuteCallback();
            }
        } else if (error.response.status === 404) {
            const data = error.response.data;
            showError(data.error + ": '" + data.path + "'");
        } else if (error.response.status === 400) {
            showErrors(error.response.data);
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
