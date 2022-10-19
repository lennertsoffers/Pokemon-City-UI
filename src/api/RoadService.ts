import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import Position from "../types/interfaces/world/Position";

const RoadService = (() => {
    const getRoads = async () => {
        try {
            const { data } = await axios.get("/api/roads");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    const buildRoad = async (location: Position) => {
        try {
            const { data } = await axios.post("/api/roads/buildRoad", {
                location: location,
            });
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        getRoads,
        buildRoad,
    };
})();

export default RoadService;
