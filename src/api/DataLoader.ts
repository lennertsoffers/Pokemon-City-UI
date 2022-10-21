import { Store } from "@reduxjs/toolkit";
import { DECORATION_SPRITESHEET, HOUSE_SPRITESHEET } from "../config/config";
import { LOAD_BUILDINGS, UPDATE_BUILDING } from "../redux/actions/BuildableDataActions";
import { LOAD_CITIZENS } from "../redux/actions/CitizenActions";
import { LOAD_ROADS } from "../redux/actions/RoadActions";
import { LOAD_STATIC_HOUSE_DATA, LOAD_STATIC_COMPANY_DATA, LOAD_STATIC_DECORATION_DATA } from "../redux/actions/StaticDataActions";
import { LOAD_USER_DATA } from "../redux/actions/UserActions";
import StaticCompanyData from "../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../types/interfaces/static/StaticHouseData";
import BuildableData from "../types/interfaces/world/BuildableData";
import BuildableDataMapper from "../utils/mappers/BuildableDataMapper";
import SpritesheetUtils from "../utils/SpritesheetUtils";
import BuildableService from "./BuildableService";
import CitizenService from "./CitizenService";
import RoadService from "./RoadService";
import UserService from "./UserService";

/** Collects functions to load data fetched from the api into the states */
const DataLoader = (() => {
    let store: Store;

    /**
     * Initializes the module
     * Initialisation is obligated before using any of the functions
     * @param {Store} storeParam - The store which collects the states
     */
    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    /**
     * Loads the static game data into the {@Link StaticDataState}
     */
    const loadStaticBuildableData = async () => {
        const data: { houses: Array<StaticHouseData>; companies: Array<StaticCompanyData>; decorations: Array<StaticDecorationData> } | undefined = await BuildableService.getStaticBuildableData();

        // Loading is unsuccessful if there is a problem fetching the data from the api
        if (!data) return false;

        // Load the house data in the state
        store.dispatch(
            LOAD_STATIC_HOUSE_DATA(
                data.houses.map((staticHouseData: StaticHouseData) => {
                    return {
                        ...staticHouseData,
                        spritesheet: HOUSE_SPRITESHEET,
                    };
                })
            )
        );

        // Load the company data in the state
        store.dispatch(
            LOAD_STATIC_COMPANY_DATA(
                data.companies.map((staticCompanyData: StaticCompanyData) => {
                    return {
                        ...staticCompanyData,
                        spritesheet: SpritesheetUtils.getCorrespondingSpritesheet("COMPANY", staticCompanyData.specialisationType),
                    };
                })
            )
        );

        // Load the decoration data in the state
        store.dispatch(
            LOAD_STATIC_DECORATION_DATA(
                data.decorations.map((staticDecorationData: StaticDecorationData) => {
                    return {
                        ...staticDecorationData,
                        spritesheet: DECORATION_SPRITESHEET,
                    };
                })
            )
        );

        return true;
    };

    const loadBuildables = async () => {
        const data = await BuildableService.getBuildables();
        if (!data) return false;

        const buildableDataList = data.map((buildableData: BuildableData) => BuildableDataMapper.toBuildableData(buildableData));

        store.dispatch(LOAD_BUILDINGS(buildableDataList));
        return true;
    };

    const loadRoads = async () => {
        const roads = await RoadService.getRoads();
        if (!roads) return false;

        store.dispatch(LOAD_ROADS(roads));
        return true;
    };

    const loadCitizens = async () => {
        const citizens = await CitizenService.getCitizens();
        if (!citizens) return false;

        store.dispatch(LOAD_CITIZENS(citizens));
        return true;
    };

    const loadUserData = async () => {
        const data = await UserService.getUserData();
        if (!data) return false;

        store.dispatch(LOAD_USER_DATA(data));
        return true;
    };

    const updateBuildable = async (buildableId: number) => {
        const buildableData: BuildableData = await BuildableService.getBuildableById(buildableId);
        store.dispatch(UPDATE_BUILDING(buildableData));
    };

    return {
        initialize,
        loadStaticBuildableData,
        loadBuildables,
        loadRoads,
        loadCitizens,
        loadUserData,
        updateBuildable,
    };
})();

export default DataLoader;
