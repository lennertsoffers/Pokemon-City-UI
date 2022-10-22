import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import Position from "../types/interfaces/world/Position";

/** Collects functions to handle Api requests concerning roads */
const RoadService = (() => {
    /**
     * Queries the Api for a list of roads in the current user's city
     * @returns The list of roads in the user's city
     */
    const getRoads = async () => {
        try {
            const { data } = await axios.get("/api/roads");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to build a road on the provided position
     * @param location The position in the world where to build the road
     * @returns The list of roads in the user's city where the orientation of all roads is updated
     */
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
