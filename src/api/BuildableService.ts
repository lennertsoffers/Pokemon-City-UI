import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { DEMOLISH_BUILDING } from "../redux/actions/BuildablePlacementActions";
import { DESELECT_BUILDING } from "../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../redux/actions/ModalActions";
import { LOAD_USER_DATA } from "../redux/actions/UserActions";
import UserService from "./UserService";

const BuildableService = (() => {
    let store: Store;

    const initalize = (storeParam: Store) => {
        store = storeParam;
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
        initalize,
        demolishBuildable,
    };
})();

export default BuildableService;
