import axios from "axios";
import { BASE_URL } from "./config";

const AxiosConfig = (() => {
    const configure = () => {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    };

    return {
        configure,
    };
})();

export default AxiosConfig;
