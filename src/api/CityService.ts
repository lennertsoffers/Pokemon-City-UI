import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

/** Collects functions to handle Api requests concerning cities */
const CityService = (() => {
    /**
     * Tries to change the city name to the provided new name
     * @param newName New name of the city
     * @param successCallback The callback that gets executed if the server responds with OK status
     */
    const changeName = async (newName: string, successCallback: Function) => {
        try {
            const { data } = await axios.post("/api/city/changeName", { name: newName });

            // Gets executed if there was no error thrown by executing the request
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
