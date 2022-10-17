import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const CityService = (() => {
    const changeName = async (newName: string, successCallback: Function) => {
        try {
            const { data } = await axios.post("/api/city/changeName", { name: newName });
            successCallback(data);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        changeName,
    };
})();

export default CityService;
