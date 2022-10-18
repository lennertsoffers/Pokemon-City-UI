import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const RoadService = (() => {
    const getRoads = async () => {
        try {
            const { data } = await axios.get("/api/roads");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        getRoads,
    };
})();

export default RoadService;
