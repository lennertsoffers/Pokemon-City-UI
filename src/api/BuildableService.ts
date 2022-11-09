import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import StaticBuildableData from "../types/interfaces/static/StaticBuildableData";
import StaticCompanyData from "../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../types/interfaces/static/StaticHouseData";
import BuildableMoveData from "../types/interfaces/world/BuildableMoveData";
import Position from "../types/interfaces/world/Position";
import StringUtils from "../utils/StringUtils";

/** Collects functions to handle Api requests concerning Buildables */
const BuildableService = (() => {
    /**
     * Requests and returns the static buildable data in the server and formats them in an JS object
     * @returns The formatted static data provided by the server
     */
    const getStaticBuildableData = async () => {
        try {
            const { data }: { data: { houses: Array<StaticHouseData>; companies: Array<StaticCompanyData>; decorations: Array<StaticDecorationData> } } = await axios.get("/api/buildables/data");
            return data;
        } catch (error) {
            ErrorHandler.handle(error, getStaticBuildableData);
        }
    };

    /**
     * Requests and returns the buildable data from the current user (determined by the JWT in header)
     * @returns The buildable data from the current user
     */
    const getBuildables = async () => {
        try {
            const { data } = await axios.get("/api/buildables");
            return data;
        } catch (error) {
            ErrorHandler.handle(error, getBuildables);
        }
    };

    /**
     * Gets the dat from a buildable by the id
     * @param buildableId The id of the buildable
     * @returns The data of the buildable
     */
    const getBuildableById = async (buildableId: number) => {
        try {
            const { data } = await axios.get(`/api/buildables/${buildableId}`);
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to build a buildable on the provided coordinates by sending a build request to the server
     * @param position The position where to build the buildable
     * @param buildableData The data of the buildable
     * @param successCallback The callback that gets executed if the server responds with an CREATED response
     */
    const buildBuildable = async (position: Position, buildableData: StaticBuildableData, successCallback: Function) => {
        // Format the data to the format required by the Api
        const body = {
            name: StringUtils.toConstantName(buildableData.name),
            x: position.x,
            y: position.y,
            buildableType: buildableData.type,
        };
        
        try {
            const { data } = await axios.post("/api/buildables/build", body);

            // Gets executed if there was no error thrown by executing the request
            successCallback(data);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to move a buildable to the provided location by sending a move request to the server
     * @param buildableId The id of the buildable that should get moved
     * @param position The position to where the buildable should be moved
     * @param successCallback The callback that gets executed if the server responds with an OK response
     */
    const moveBuildable = async (buildableId: number, position: Position, successCallback: Function) => {
        // Format the data to the format required by the Api
        const body: BuildableMoveData = {
            id: buildableId,
            x: position.x,
            y: position.y,
        };

        try {
            await axios.put(`/api/buildables/move`, body);

            // Gets executed if there was no error thrown by executing the request
            successCallback(body);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to demolish a buildable by sending a demolish request to the server
     * There are to types of demolishment:
     * - Demolishing a house: There should be a list of citizenIds added to the request to indicate which citizens should get removed together with the house
     *   Houses provide a certain amount of citizens to the city, the lenght of the array should be equal to this amount of citizens
     * - Demolishing any other buildable type: No list has to be included in the request, if there is a list of id's, it just gets ignored
     * @param buildableId The id of the buildable that should get demolished
     * @param successCallback The callback that gets executed if the server doesn't respond with an error
     * @param finalCallback This callback gets always executed, no matter of the response of the server
     * @param citizenIds A optional list of citizens that should get removed to (when removing a house)
     */
    const demolishBuildable = async (buildableId: number, successCallback: Function, finalCallback?: Function, citizenIds?: Array<number>) => {
        // Every request body needs the id of the buildable that should be demolished
        let body: { buildableId: number; citizenIds?: Array<number> } = {
            buildableId: buildableId,
        };
        // If there is a list of citizenIds provided as parameter, it's also included in the request
        if (citizenIds) body.citizenIds = citizenIds;

        try {
            await axios.delete(`/api/buildables/demolish`, { data: body });

            // Executed if there is no error thrown by sending the request
            successCallback();
        } catch (error) {
            ErrorHandler.handle(error);
        } finally {
            // If the finalCallback is provided, it's always executed
            if (finalCallback) finalCallback();
        }
    };

    return {
        getStaticBuildableData,
        getBuildables,
        getBuildableById,
        buildBuildable,
        moveBuildable,
        demolishBuildable,
    };
})();

export default BuildableService;
