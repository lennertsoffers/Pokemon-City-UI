import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_CITIZENS } from "../redux/actions/CitizenActions";

const CitizenService = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const loadCitizens = () => {
        axios.get("/api/citizens").then((response) => {
            store.dispatch(LOAD_CITIZENS(response.data));
        });
    };

    const getUnassignedCitizens = async () => {
        try {
            const response = await axios.get("/api/citizens/unassigned");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        initialize,
        loadCitizens,
        getUnassignedCitizens,
    };
})();

export default CitizenService;
