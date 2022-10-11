import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { LOAD_USER_DATA } from "../redux/actions/UserActions";
import UserData from "../types/interfaces/user/UserData";

const UserService = (() => {
    let store: Store;

    const initialize = (storeParam: Store) => {
        store = storeParam;
    };

    const loadUserData = () => {
        axios
            .get("/users/me")
            .then(({ data }: { data: UserData }) => {
                store.dispatch(LOAD_USER_DATA(data));
            })
            .catch((error) => {
                // TODO - Handle error
                console.log(error);
            });
    };

    return {
        initialize,
        loadUserData,
    };
})();

export default UserService;
