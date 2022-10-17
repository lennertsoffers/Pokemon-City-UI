import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const IncomeBuildingService = (() => {
    const collect = async (buildableId: number, successCallback?: Function) => {
        try {
            await axios.get(`/api/incomeBuildings/collectRent/${buildableId}`);
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
