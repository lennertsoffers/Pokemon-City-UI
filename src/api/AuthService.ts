import axios from "axios";
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
        } catch (error) {
            console.log(error);
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

            return _refresh();
        }
    };

    const logout = () => {
        localStorage.clear();
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

    const _refresh = () => {
        if (!localStorage.getItem("refresh_token")) return false;

        _setRefreshHeader();

        try {
            axios.get("/auth/refreshToken");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return {
        register,
        login,
        logout,
        isLoggedIn,
        setHeader,
    };
})();

export default AuthService;
