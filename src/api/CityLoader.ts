import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_BUILDINGS } from "../redux/actions/BuildablePlacementActions";
import { LOAD_CITIZENS } from "../redux/actions/CitizenActions";
import { LOAD_STATIC_HOUSE_DATA, LOAD_STATIC_COMPANY_DATA, LOAD_STATIC_DECORATION_DATA } from "../redux/actions/StaticDataActions";
import BuildableData from "../types/interfaces/world/BuildableData";
import BuildablePlacementMapper from "../utils/mappers/BuildablePlacementMapper";

const CityLoader = (() => {
    let store: Store;

    const setup = (storeParam: Store) => {
        store = storeParam;
    };

    const initalize = () => {
        _loadStaticData();
        loadBuildables();
    };

    const loadBuildables = () => {
        axios
            .get("/api/buildables")
            .then((response) => {
                const placements = response.data.map((buildableData: BuildableData) => BuildablePlacementMapper.toBuildablePlacement(buildableData));
                store.dispatch(LOAD_BUILDINGS(placements));
            })
            .catch((error) => console.error(error));
    };

    const loadCitizens = () => {
        axios.get("/api/citizens").then((response) => {
            store.dispatch(LOAD_CITIZENS(response.data));
        });
    };

    const getCompaniesWithEmployees = async () => {
        try {
            const response = await axios.get("/api/companies");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const _loadStaticData = () => {
        axios
            .get("/api/buildables/data")
            .then((response) => {
                store.dispatch(LOAD_STATIC_HOUSE_DATA(response.data.houses));
                store.dispatch(LOAD_STATIC_COMPANY_DATA(response.data.companies));
                store.dispatch(LOAD_STATIC_DECORATION_DATA(response.data.decorations));
            })
            .catch((error) => console.error(error));
    };

    return {
        setup,
        initalize,
        loadBuildables,
        loadCitizens,
        getCompaniesWithEmployees,
    };
})();

export default CityLoader;
