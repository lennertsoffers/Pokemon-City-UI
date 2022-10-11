import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_USER_DATA } from "../redux/actions/UserActions";

const UserService = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const loadUserData = async () => {
        try {
            const { data } = await axios.get("/users/me");

            store.dispatch(LOAD_USER_DATA(data));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        initialize,
        loadUserData,
    };
})();

export default UserService;
