import { Store } from "@reduxjs/toolkit";
import AuthService from "../api/AuthService";
import { SET_LOGGED_IN } from "../redux/actions/AuthActions";
import { ADD_ERROR } from "../redux/actions/ErrorActions";

/**
 * Collects functions to handle errors
 */
const ErrorHandler = (() => {
    let store: Store;

    /**
     * Initializes the module
     * Initialisation is obligated before using any of the functions
     * @param {Store} storeParam - The store which collects the states
     */
    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    /**
     * Reads the error and handles it on type
     * @param error The error thrown
     * @param reExecuteCallback The callback function that can be re-run if needed
     */
    const handle = async (error: any, reExecuteCallback?: Function) => {
        // If the error is a FORBIDDEN error
        // This means that the provided access_token didn't grant acces to the Api
        // Try to refresh the token
        // Case 1: Refresh successful
        // -> A new access_token will be saved in the LocalStorage and the function that threw the error is executed again
        // -> This is the reExecuteCallback
        // -> The second execution should succeed since the a new access_token got provided
        // Case 2: Refresh not successful
        // -> This means that the refresh token was also expired, in a wrong format or there was no refresh token
        // -> The logged in state gets set to false
        // -> This will ultimately result in showing the login page
        if (error.response.status === 403) {
            const refeshSucceeded = await AuthService.refresh();

            if (!refeshSucceeded) {
                store.dispatch(SET_LOGGED_IN(false));
            } else {
                if (reExecuteCallback) return reExecuteCallback();
            }
        }

        // If the error is a NOT_FOUND error
        // The error contains the info about the error in the 'data.error' and the path in the 'data.path'
        // This data gets formatted and shown
        else if (error.response.status === 404) {
            const data = error.response.data;
            showError(data.error + ": '" + data.path + "'");
        }

        // If the error is a BAD_REQUEST error
        // This means that the server validation threw an error
        // The 'error.response.data' contains a list of messages of validation errors that failed
        // The list of these messages get separated and shows an error per message
        else if (error.response.status === 400) {
            showErrors(error.response.data);
        }
    };

    /**
     * Breaks up a list of error messages and shows the error message for each of them
     * @param messages List of error messages
     */
    const showErrors = (messages: Array<string>) => {
        messages.forEach((message: string) => showError(message));
    };

    /**
     * Pushes the error message in the {@link ErrorQueue} by dispatching the add error with the message as argument
     * @param message Error message
     */
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
