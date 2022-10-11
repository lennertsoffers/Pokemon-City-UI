import axios from "axios";

const IncomeBuildingService = (() => {
    const collect = async (buildableId: number, successCallback?: Function) => {
        try {
            await axios.get(`/api/incomeBuildings/collectRent/${buildableId}`);
            if (successCallback) successCallback();
        } catch (error) {
            console.log(error);
        }
    };

    return {
        collect,
    };
})();

export default IncomeBuildingService;
