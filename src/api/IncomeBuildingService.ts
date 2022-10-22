import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

/** Collects functions to handle Api requests concerning incomeBuildings */
const IncomeBuildingService = (() => {
    /**
     * Tries to colect the acumulated money of a certain incomeBuilding
     * @param buildableId The id of the incomeBuilding that should be collected
     * @param successCallback The callback that gets executed if the server responds with OK satus
     */
    const collect = async (buildableId: number, successCallback?: Function) => {
        try {
            await axios.get(`/api/incomeBuildings/collectRent/${buildableId}`);

            // If a successCallback is provided, its executed when the server didn't respond with an error
            if (successCallback) successCallback();
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        collect,
    };
})();

export default IncomeBuildingService;
