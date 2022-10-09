import axios from "axios";
import { BASE_URL, BEARER_TOKEN } from "./config";

const AxiosConfig = (() => {
    const configure = () => {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers["Authorization"] = BEARER_TOKEN;
        axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    };

    return {
        configure,
    };
})();

export default AxiosConfig;
