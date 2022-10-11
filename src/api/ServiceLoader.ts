import { Store } from "@reduxjs/toolkit";
import BuildableService from "./BuildableService";
import CitizenService from "./CitizenService";
import UserService from "./UserService";

const ServiceLoader = (() => {
    const initialize = (store: Store) => {
        BuildableService.initialize(store);
        CitizenService.initialize(store);
        UserService.initialize(store);
    };

    return { initialize };
})();

export default ServiceLoader;
