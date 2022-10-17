import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import AuthenticationResponse from "../types/interfaces/response/AuthenticationResponse";

const AuthService = (() => {
    const register = async (username: string, password: string) => {
        try {
            const { data }: { data: AuthenticationResponse } = await axios.post("/auth/register", {
                username: username,
                password: password,
            });

            _persistAuthenticationResponse(data);

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

            return true;
        } catch (error) {
            console.log(error);

            return refresh();
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

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const isLoggedIn = () => {
        return localStorage.getItem("access_token") && localStorage.getItem("refresh_token");
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
        register,
        login,
        logout,
        refresh,
        isLoggedIn,
        setHeader,
    };
})();

export default AuthService;
