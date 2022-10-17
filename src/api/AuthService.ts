import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import { SET_LOGGED_IN } from "../redux/actions/AuthActions";
import AuthenticationResponse from "../types/interfaces/response/AuthenticationResponse";
import CombinedState from "../types/interfaces/states/CombinedState";

const AuthService = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
        localStorage.getItem("access_token") && localStorage.getItem("refresh_token") ? setLoggedIn(true) : setLoggedIn(false);
        setHeader();
    };

    const register = async (username: string, password: string) => {
        try {
            const { data }: { data: AuthenticationResponse } = await axios.post("/auth/register", {
                username: username,
                password: password,
            });

            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error: any) {
            ErrorHandler.handle(error, register);
            return false;
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);

            const { data }: { data: AuthenticationResponse } = await axios.post("/auth/login", formData);

            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.clear();
    };

    const refresh = async () => {
        if (!localStorage.getItem("refresh_token")) return false;

        _setRefreshHeader();

        try {
            const { data }: { data: AuthenticationResponse } = await axios.get("/auth/refreshToken");

            _persistAuthenticationResponse(data);
            setLoggedIn(true);

            return true;
        } catch (error) {
            return false;
        }
    };

    const setLoggedIn = (loggedIn: boolean) => {
        store.dispatch(SET_LOGGED_IN(loggedIn));
    };

    const isLoggedIn = () => {
        return (store.getState() as CombinedState).authState.loggedIn;
    };

    const setHeader = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
    };

    const _setRefreshHeader = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("refresh_token")}`;
    };

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
