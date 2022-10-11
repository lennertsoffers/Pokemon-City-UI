import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { DEMOLISH_BUILDING, LOAD_BUILDINGS } from "../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../redux/actions/ModalActions";
import { LOAD_STATIC_HOUSE_DATA, LOAD_STATIC_COMPANY_DATA, LOAD_STATIC_DECORATION_DATA } from "../redux/actions/StaticDataActions";
import BuildableData from "../types/interfaces/world/BuildableData";
import BuildablePlacementMapper from "../utils/mappers/BuildablePlacementMapper";
import UserService from "./UserService";

const BuildableService = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const loadStaticBuildableData = async () => {
        try {
            const { data } = await axios.get("/api/buildables/data");

            store.dispatch(LOAD_STATIC_HOUSE_DATA(data.houses));
            store.dispatch(LOAD_STATIC_COMPANY_DATA(data.companies));
            store.dispatch(LOAD_STATIC_DECORATION_DATA(data.decorations));
        } catch (error) {
            console.log(error);
        }
    };

    const loadBuildables = async () => {
        try {
            const { data } = await axios.get("/api/buildables");

            const placements = data.map((buildableData: BuildableData) => BuildablePlacementMapper.toBuildablePlacement(buildableData));
            store.dispatch(LOAD_BUILDINGS(placements));
        } catch (error) {
            console.log(error);
        }
    };

    const demolishBuildable = (buildableId: number, citizenIds?: Array<number>) => {
        let data: { buildableId: number; citizenIds?: Array<number> } = {
            buildableId: buildableId,
        };
        if (citizenIds) data.citizenIds = citizenIds;

        axios
            .delete(`/api/buildables/demolish`, { data })
            .then((response) => {
                console.log(response.data);
                store.dispatch(DEMOLISH_BUILDING(buildableId));
                UserService.loadUserData();
            })
            .catch((error) => console.log(error.response.data))
            .finally(() => {
                store.dispatch(DESELECT_BUILDING);
                store.dispatch(CLOSE_MODAL);
            });
    };

    return {
        initialize,
        loadStaticBuildableData,
        loadBuildables,
        demolishBuildable,
    };
})();

export default BuildableService;
