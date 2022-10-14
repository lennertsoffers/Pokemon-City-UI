import axios from "axios";
import AuthService from "../api/AuthService";
import { BASE_URL } from "./config";

const AxiosConfig = (() => {
    const configure = () => {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

        if (AuthService.isLoggedIn()) {
            AuthService.setHeader();
        }
    };

    return {
        configure,
    };
})();

export default AxiosConfig;
