import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import { SET_LOGGED_IN } from "../redux/actions/AuthActions";
import AuthenticationResponse from "../types/interfaces/response/AuthenticationResponse";
import CombinedState from "../types/interfaces/states/CombinedState";

/** Collects functions to handle authentication in the application */
const AuthService = (() => {
    let store: Store;

    /**
     * Initializes the module
     * Initialisation is obligated before using any of the functions
     * @param {Store} storeParam - The store which collects the states
     */
    const initialize = (storeParam: Store) => {
        store = storeParam;

        // If there is an access_token and a refresh_token found in the LocalStorage, the usser is already logged in
        localStorage.getItem("access_token") && localStorage.getItem("refresh_token") ? setLoggedIn(true) : setLoggedIn(false);
        // Set the Authorization header to the access_token from the LocalStorage
        setHeader();
    };

    /**
     * Tries to register the user with the username and password by sending a register request
     * If the registration is successful, the tokens in the success response are saved in the LocalStorage and the {@link AuthState} is set to logged in
     * @param username The username to register
     * @param password The password to register
     * @returns True if the user is successfully registered in the server and the tokens are persisted in the LocalStorage
     */
    const register = async (username: string, password: string) => {
        try {
            const { data }: { data: AuthenticationResponse } = await axios.post("/auth/register", {
                username: username,
                password: password,
            });

            // If there was no error in the registration request
            // - The tokens are persisted in the LocalStorage
            // - The Bearer token header is set in axios
            // - The AuthState is set to logged in
            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error: any) {
            ErrorHandler.handle(error, register);
            return false;
        }
    };

    /**
     * Tries to login the user with the username and password by sending a login request
     * If the login is successful, the tokens in the success response are saved in the LocalStorage and the {@link AuthState} is set to logged in
     * @param username The username to login
     * @param password The password to login
     * @returns True if the user is successfully logged in in the server and the tokens are persisted in the LocalStorage
     */
    const login = async (username: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            const { data }: { data: AuthenticationResponse } = await axios.post("/auth/login", formData);

            // If there was no error in the login request
            // - The tokens are persisted in the LocalStorage
            // - The Bearer token header is set in axios
            // - The AuthState is set to logged in
            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error) {
            ErrorHandler.showError("Please use valid credentials");
            return false;
        }
    };

    /**
     * Logs out the user by clearing the tokens from the LocalStorage
     */
    const logout = () => {
        localStorage.clear();
    };

    /**
     * Tries to refresh the access_token by sending a refresh request to the server with the refresh_token as the Authentication header
     * @returns True if the token was successfully refreshed
     */
    const refresh = async () => {
        // The refresh request cannot be sent if there is no refresh_token in the LocalStorage
        if (!localStorage.getItem("refresh_token")) return false;

        // Sets the axios Authentication header with the refresh_token
        _setRefreshHeader();

        try {
            const { data }: { data: AuthenticationResponse } = await axios.get("/auth/refreshToken");

            // If there was no error in the refresh request
            // - The tokens are persisted in the LocalStorage
            // - The Bearer token header is set in axios
            // - The AuthState is set to logged in
            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error) {
            return false;
        }
    };

    /**
     * Dispatches the new {@link AuthState} to the store
     * @param loggedIn If the user is logged in or not
     */
    const setLoggedIn = (loggedIn: boolean) => {
        store.dispatch(SET_LOGGED_IN(loggedIn));
    };

    /**
     * Reads the state of the store to check if the {@link AuthState} is set to logged in or not
     * @returns True if the user is logged in
     */
    const isLoggedIn = () => {
        return (store.getState() as CombinedState).authState.loggedIn;
    };

    /**
     * Sets the axios Authentication header to the access_token stored in the LocalStorage
     */
    const setHeader = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
    };

    /**
     * Sets the axios Authentication header to the refresh_token stored in the LocalStorage
     */
    const _setRefreshHeader = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("refresh_token")}`;
    };

    /**
     * Persists the tokens in the response from the server after logging in, registering or refreshing tokens
     * Also sets the newly generate access_token into the axios Authorization header
     * @param authenticationResponse The response containing the access_token and the refresh_token
     */
    const _persistAuthenticationResponse = (authenticationResponse: AuthenticationResponse) => {
        localStorage.setItem("access_token", authenticationResponse.access_token);
        localStorage.setItem("refresh_token", authenticationResponse.refresh_token);
        setHeader();
    };

    return {
        initialize,
        register,
        login,
        logout,
        refresh,
        isLoggedIn,
        setLoggedIn,
        setHeader,
    };
})();

export default AuthService;
