import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import ApiErrorResponse from "../types/interfaces/error/ApiErrorResponse";
import StaticBuildableData from "../types/interfaces/static/StaticBuildableData";
import StaticCompanyData from "../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../types/interfaces/static/StaticHouseData";
import BuildableMoveData from "../types/interfaces/world/BuildableMoveData";
import Position from "../types/interfaces/world/Position";
import StringUtils from "../utils/StringUtils";

const BuildableService = (() => {
    const getStaticBuildableData = async () => {
        try {
            const { data }: { data: { houses: Array<StaticHouseData>; companies: Array<StaticCompanyData>; decorations: Array<StaticDecorationData> } } = await axios.get("/api/buildables/data");
            return data;
        } catch (error) {
            await ErrorHandler.handle(error as ApiErrorResponse, getStaticBuildableData);
        }
    };

    const getBuildables = async () => {
        try {
            const { data } = await axios.get("/api/buildables");
            return data;
        } catch (error) {
            console.log(error);

            return await ErrorHandler.handle(error as ApiErrorResponse, getBuildables);
        }
    };

    const getBuildableById = async (buildableId: number) => {
        try {
            const { data } = await axios.get(`/api/buildables/${buildableId}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const buildBuildable = async (position: Position, buildableData: StaticBuildableData, successCallback: Function) => {
        const body = {
            name: StringUtils.toConstantName(buildableData.name),
            x: position.x,
            y: position.y,
            buildableType: buildableData.type,
        };

        try {
            const { data } = await axios.post("/api/buildables/build", body);
            successCallback(data);
        } catch (error) {
            console.log(error);
        }
    };

    const moveBuildable = async (buildableId: number, position: Position, successCallback: Function) => {
        const body: BuildableMoveData = {
            id: buildableId,
            x: position.x,
            y: position.y,
        };

        try {
            await axios.put(`/api/buildables/move`, body);
            successCallback(body);
        } catch (error) {
            console.log(error);
        }
    };

    const demolishBuildable = async (buildableId: number, successCallback: Function, finalCallback: Function, citizenIds?: Array<number>) => {
        let body: { buildableId: number; citizenIds?: Array<number> } = {
            buildableId: buildableId,
        };
        if (citizenIds) body.citizenIds = citizenIds;

        try {
            await axios.delete(`/api/buildables/demolish`, { data: body });
            successCallback();
        } catch (error) {
            console.log(error);
        } finally {
            finalCallback();
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
